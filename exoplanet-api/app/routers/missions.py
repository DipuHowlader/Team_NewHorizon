import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

# Import our Pydantic model (use package-relative imports)
from models.exoplanet import MissionReport

router = APIRouter()

# Load the mock database
DB_PATH = Path(__file__).parent.parent / "data" / "mock_db.json"
with open(DB_PATH, "r") as f:
    db = json.load(f)

MISSIONS = db["missions"]


@router.get(
    "/{mission_name}",
    response_model=MissionReport,
    summary="Get analysis report for a mission",
)
async def get_mission_report(mission_name: str):
    """
    Retrieves analysis data, including a classification report and a link
    to an ROC curve image for a specific mission (kepler or tess).
    """
    mission = MISSIONS.get(mission_name.lower())
    if not mission:
        raise HTTPException(
            status_code=404,
            detail="Mission not found. Available missions are 'kepler' and 'tess'.",
        )
    return mission