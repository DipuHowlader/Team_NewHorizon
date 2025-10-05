import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
import math
import numbers

# Import our Pydantic models
from models.exoplanet import ExoplanetSummary, ExoplanetDetail

# Import the ML generator
from ml.exoplanet_generator import generate_exoplanets

router = APIRouter()

# Generate data at startup using the ML generator. This keeps the example
# fast while replacing the static JSON file with generated data.
try:
    generated = generate_exoplanets("tess")
    EXOPLANETS = generated.get("exoplanets", {})
except Exception:
    EXOPLANETS = {}


def _sanitize(obj):
    """Recursively sanitize objects for JSON encoding.

    - Replace NaN/Inf with 0.0 for numeric values.
    - Preserve strings and other types.
    """
    # Dict
    if isinstance(obj, dict):
        return {k: _sanitize(v) for k, v in obj.items()}

    # List / tuple
    if isinstance(obj, (list, tuple)):
        return [_sanitize(v) for v in obj]

    # Numbers (including numpy scalars) -> ensure finite float
    if isinstance(obj, numbers.Number):
        try:
            f = float(obj)
            if math.isfinite(f):
                return f
            else:
                return 0.0
        except Exception:
            return 0.0

    # Fallback: try casting to float for numpy-like types
    try:
        f = float(obj)
        if math.isfinite(f):
            return f
    except Exception:
        pass

    return obj


@router.get(
    "/",
    response_model=list[ExoplanetSummary],
    summary="Get a list of all detected exoplanets",
)
async def get_all_exoplanets():
    """
    Retrieves a summarized list of all exoplanets from the database.
    """
    summary_list = []
    for planet_id, planet_data in EXOPLANETS.items():
            data = _sanitize(planet_data)
            summary_list.append(
                ExoplanetSummary(
                    id=data.get("id"),
                    name=data.get("name"),
                    distance=data.get("distance", 0.0),
                    mass=data.get("mass", 0.0),
                    detection_confidence=data.get("detection_confidence", 0.0),
                    model_version=data.get("ai_model_version", "unknown"),
                )
            )
    return summary_list


@router.get(
    "/{exoplanet_id}",
    response_model=ExoplanetDetail,
    summary="Get detailed information for a single exoplanet",
)
async def get_exoplanet_by_id(exoplanet_id: str):
    """
    Retrieves detailed information for a specific exoplanet by its ID.
    If the exoplanet is not found, it returns a 404 error.
    """
    planet = EXOPLANETS.get(exoplanet_id)
    if not planet:
        raise HTTPException(status_code=404, detail="Exoplanet not found.")
        # Sanitize nested numeric values before returning
        return _sanitize(planet)