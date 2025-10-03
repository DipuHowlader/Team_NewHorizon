import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

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
        summary_list.append(
            ExoplanetSummary(
                id=planet_data["id"],
                name=planet_data["name"],
                distance=planet_data["distance"],
                mass=planet_data["mass"],
                detection_confidence=planet_data["detection_confidence"],
                model_version=planet_data["ai_model_version"],
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
    return planet