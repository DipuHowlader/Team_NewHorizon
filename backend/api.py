# filepath: c:\Users\user\Documents\temp\ExoAi team new horizon\Backend Api\api.py
import logging
from typing import Dict, Any, List
import numpy as np
import pandas as pd

LOG = logging.getLogger(__name__)

# Define a strict limit for the number of exoplanets to process and return
MAX_EXOPLANETS = 20
status = 0

# ---------------- Synthetic sample fallback ----------------
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

# ---------------- Exoplanet generation ----------------
def generate_exoplanets(model_name: str = "tess") -> List[Dict[str, Any]]:
    """
    Generate exoplanet detection data using synthetic fallback, ensuring
    the final dataset does not exceed MAX_EXOPLANETS.
    """
    try:
        # For simplicity: try downloading real TOI catalog only if model_name=="tess"
        df = None
        if model_name.lower() == "tess":
            try:
                # Attempt to download the real data
                df = pd.read_csv(
                    "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+toi&format=csv",
                    low_memory=True,
                )
                status = 1
            except Exception as e:
                LOG.warning("Could not download TOI catalog: %s — using synthetic", e)
                df = _synthetic_sample(MAX_EXOPLANETS)  # Use max limit for synthetic too
        else:
            df = _synthetic_sample(MAX_EXOPLANETS)

        # --- FIX FOR LARGE DATA: Enforce a hard cap for the maximum response size ---
        if len(df) > MAX_EXOPLANETS:
            # Taking the first N rows is the fastest way to cap the data size.
            df = df.head(MAX_EXOPLANETS)
        # --------------------------------------------------------------------------

        # Ensure required columns exist
        required_cols = {"tid", "pl_rade", "st_dist", "st_pmra"}
        if not required_cols.issubset(set(df.columns)):
            df = _synthetic_sample(10)

        # Build exoplanet dict
        exo_map = {}
        for i, row in df.reset_index().iterrows():
            tid = str(row.get("tid") or f"planet-{i}")
            exo_map[tid] = {
                "id": tid,
                "name": tid,
                "mission": "tess",
                "discovery_method": "Transit",
                "discovery_year": 2025,
                "radius": float(row.get("pl_rade", 1.0)),
                "radius_confidence": 0.6,
                "mass": float(row.get("st_pmra", 1.0)),
                "mass_confidence": 0.6,
                "distance": float(row.get("st_dist", 100.0)),
                "distance_confidence": 0.6,
                "orbital_period": 365.0,
                "temperature": 250,
                "host_star": "Synthetic Star",
                "description": "Automatically generated synthetic exoplanet.",
                "graph_data": [{"time": 0, "brightness": 1.0}],
                "ai_model_version": "1.0.0",
                "detection_confidence": 0.5,
                "last_updated": "2025-10-05T00:00:00Z",
            }
        return list(exo_map.values())

    except Exception as e:
        LOG.exception("Error generating exoplanets: %s", e)
        # Fallback to a single-planet list if all else fails
        return [{
            "id": "example exoplanets",
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
            "last_updated": "2025-10-05T00:00:00Z",
        }]


exoplanets = generate_exoplanets("tess")

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from datetime import datetime

app = FastAPI()

# Allow React frontend to call FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Endpoints ----------------

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Exoplanet Discovery API! Visit /docs for API docs."}

@app.get("/exoplanets")
def list_exoplanets():
    return exoplanets

@app.get("/exoplanets/{planet_id}")
def get_exoplanet(planet_id: str):
    for p in exoplanets:
        if p["id"] == planet_id:
            return p
    return {"error": "Not found"}

# ---- NEW ENDPOINT ----
@app.get("/ai_model")
def get_model_performance(mission: str = Query(..., regex="^(kepler|tess)$")) -> Dict:
    # Mocked sample performance data (replace with real ML results later)
    if mission == "kepler":
        return {
            "mission": "kepler",
            "precision": 0.92,
            "recall": 0.88,
            "f1score": 0.90,
            "performance": 0.91,
            "roc": [
                {"fpr": 0.0, "tpr": 0.0},
                {"fpr": 0.1, "tpr": 0.75},
                {"fpr": 0.2, "tpr": 0.85},
                {"fpr": 0.3, "tpr": 0.92},
                {"fpr": 1.0, "tpr": 1.0},
            ],
            "pr": [
                {"recall": 0.0, "precision": 1.0},
                {"recall": 0.5, "precision": 0.85},
                {"recall": 0.7, "precision": 0.80},
                {"recall": 0.9, "precision": 0.70},
                {"recall": 1.0, "precision": 0.50},
            ],
        }
    else:  # mission == "tess"
        return {
            "mission": "tess",
            "precision": 0.87,
            "recall": 0.90,
            "f1score": 0.88,
            "performance": 0.89,
            "roc": [
                {"fpr": 0.0, "tpr": 0.0},
                {"fpr": 0.1, "tpr": 0.70},
                {"fpr": 0.2, "tpr": 0.82},
                {"fpr": 0.3, "tpr": 0.90},
                {"fpr": 1.0, "tpr": 1.0},
            ],
            "pr": [
                {"recall": 0.0, "precision": 1.0},
                {"recall": 0.4, "precision": 0.80},
                {"recall": 0.6, "precision": 0.75},
                {"recall": 0.8, "precision": 0.65},
                {"recall": 1.0, "precision": 0.55},
            ],
        }