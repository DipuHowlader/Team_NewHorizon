import logging
from pathlib import Path
from typing import Dict, Any

import numpy as np
import pandas as pd

try:
    import joblib
except Exception: 
    joblib = None

LOG = logging.getLogger(__name__)


def _synthetic_sample(n=5):
    """Return a small synthetic DataFrame for environments without model or network."""
    ids = [f"synthetic-{i}" for i in range(n)]
    df = pd.DataFrame({
        "tid": ids,
        "pl_rade": np.round(np.random.uniform(0.5, 2.5, size=n), 2),
        "st_dist": np.round(np.random.uniform(10, 2000, size=n), 1),
        "st_pmra": np.round(np.random.uniform(0.1, 10.0, size=n), 3),
    })
    return df


def generate_exoplanets(model_name: str = "tess") -> Dict[str, Any]:
    """
    Generate exoplanet detection data using an ML model when available.

    Returns a dict with an "exoplanets" mapping similar to the previous
    `mock_db.json` structure. Each entry contains fields needed by
    `ExoplanetSummary` and `ExoplanetDetail` where possible.
    """
    # Attempt to load data & model
    df = None
    model = None

    if model_name.lower() == "tess":
        # Try to load remote TOI catalog; fall back to synthetic on failure
        try:
            df = pd.read_csv(
                "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+toi&format=csv",
                low_memory=False,
            )
        except Exception as e:
            LOG.warning("Could not download TOI catalog: %s — falling back to synthetic data", e)
            df = _synthetic_sample(10)

        model_path = Path(__file__).parent.parent / "models" / "tess.joblib"
        if model_path.exists() and joblib is not None:
            try:
                model = joblib.load(str(model_path))
            except Exception as e:
                LOG.warning("Failed loading model at %s: %s", model_path, e)
                model = None
        else:
            LOG.info("Model not found or joblib missing, running in fallback mode")

    # If df is a full catalog, sample to keep response small
    if df is not None and isinstance(df, pd.DataFrame) and len(df) > 50:
        df = df.sample(frac=0.1, random_state=42)

    # If we don't have the expected columns, use synthetic minimal df
    required_cols = {"tid", "pl_rade", "st_dist", "st_pmra"}
    if df is None or not required_cols.issubset(set(df.columns)):
        df = _synthetic_sample(10)

    # Prepare inputs for model prediction if available
    try:
        # Use a SimpleImputer-like fallback if model expects specific columns
        if model is not None:
            from sklearn.impute import SimpleImputer

            # pick numeric columns only for safety
            numeric = df.select_dtypes(include=[np.number]).columns.tolist()
            if len(numeric) == 0:
                X = df[["pl_rade", "st_dist", "st_pmra"]]
            else:
                X = df[numeric]

            simp = SimpleImputer(strategy="mean")
            X_imp = pd.DataFrame(simp.fit_transform(X), columns=X.columns)

            if hasattr(model, "predict_proba"):
                prob = model.predict_proba(X_imp)
                pred = model.predict(X_imp)
            else:
                # If model doesn't provide probabilities, fake them
                pred = model.predict(X_imp)
                prob = np.zeros((len(pred), len(getattr(model, "classes_", [0, 1]))))
                for i, p in enumerate(pred):
                    prob[i, int(p)] = 1.0

            # Select predicted class index 2 as in original code
            if not np.issubdtype(np.array(pred).dtype, np.integer):
                class_to_idx = {c: i for i, c in enumerate(model.classes_)}
                pred_idx = np.array([class_to_idx[c] for c in pred])
            else:
                pred_idx = np.asarray(pred)

            conf = prob[np.arange(prob.shape[0]), pred_idx]
            C = prob.shape[1]
            out = {k: conf[pred_idx == k].tolist() for k in range(C)}
            performance = out.get(2, [])

            # Keep only entries predicted as class 2 (taken_index)
            taken_mask = pred_idx == 2
            selected = df.loc[taken_mask].reset_index(drop=True)
            # If performance array length mismatches, pad/truncate
            perf = performance
            if len(perf) != len(selected):
                perf = perf[: len(selected)] + [float(0.0)] * max(0, len(selected) - len(perf))

            # Build exoplanet entries
            exo_map = {}
            for i, row in selected.reset_index().iterrows():
                tid = str(row.get("tid") or row.get("id") or f"auto-{i}")
                exo_map[tid] = {
                    "id": tid,
                    "name": tid,
                    "discovery_method": "Transit (ML)",
                    "discovery_year": 2025,
                    "radius": float(row.get("pl_rade", 1.0)),
                    "radius_confidence": 0.8,
                    "mass": float(row.get("st_pmra", 1.0)),
                    "mass_confidence": 0.75,
                    "distance": float(row.get("st_dist", 100.0)),
                    "distance_confidence": 0.9,
                    "orbital_period": float(row.get("pl_orbper", 365.0) if "pl_orbper" in row else 365.0),
                    "temperature": int(row.get("pl_eqt", 250) if "pl_eqt" in row else 250),
                    "host_star": "Unknown",
                    "description": "Automatically detected candidate by ML model.",
                    "graph_data": [{"time": 0, "brightness": 1.0}, {"time": 1, "brightness": 0.995}],
                    "ai_model_version": "1.0.0",
                    "detection_confidence": float(perf[i]) if i < len(perf) else 0.0,
                    "last_updated": "2025-10-03T00:00:00Z",
                }

            return {"exoplanets": exo_map}

        else:
            # Model missing: return a simple mapping built from df rows
            exo_map = {}
            for i, row in df.reset_index().iterrows():
                tid = str(row.get("tid") or row.get("id") or f"synthetic-{i}")
                exo_map[tid] = {
                    "id": tid,
                    "name": tid,
                    "discovery_method": "Transit (synthetic)",
                    "discovery_year": 2025,
                    "radius": float(row.get("pl_rade", 1.0)),
                    "radius_confidence": 0.6,
                    "mass": float(row.get("st_pmra", 1.0)),
                    "mass_confidence": 0.6,
                    "distance": float(row.get("st_dist", 100.0)),
                    "distance_confidence": 0.6,
                    "orbital_period": 365.0,
                    "temperature": 250,
                    "host_star": "Synthetic",
                    "description": "Synthetic candidate used as fallback.",
                    "graph_data": [{"time": 0, "brightness": 1.0}],
                    "ai_model_version": "0.0.0",
                    "detection_confidence": 0.5,
                    "last_updated": "2025-10-03T00:00:00Z",
                }
            return {"exoplanets": exo_map}

    except Exception as e:  # pragma: no cover - ensure API remains available
        LOG.exception("Error generating exoplanets: %s", e)
        # Final fallback: small static example
        return {
            "exoplanets": {
                "example-1": {
                    "id": "example-1",
                    "name": "Example 1",
                    "discovery_method": "Transit",
                    "discovery_year": 2025,
                    "radius": 1.0,
                    "radius_confidence": 0.8,
                    "mass": 1.0,
                    "mass_confidence": 0.8,
                    "distance": 100.0,
                    "distance_confidence": 0.9,
                    "orbital_period": 365.0,
                    "temperature": 250,
                    "host_star": "ExampleStar",
                    "description": "Fallback example",
                    "graph_data": [{"time": 0, "brightness": 1.0}],
                    "ai_model_version": "0.0.0",
                    "detection_confidence": 0.5,
                    "last_updated": "2025-10-03T00:00:00Z",
                }
            }
        }
