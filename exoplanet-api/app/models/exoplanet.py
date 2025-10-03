from pydantic import BaseModel
from typing import List

# --- Exoplanet Models ---

class ExoplanetSummary(BaseModel):
    """A summary model for the list of all exoplanets."""
    id: str
    name: str
    distance: float
    mass: float
    detection_confidence: float
    model_version: str

class GraphDataPoint(BaseModel):
    """A single data point for the transit graph."""
    time: float
    brightness: float

class ExoplanetDetail(BaseModel):
    """The full detailed model for a single exoplanet."""
    id: str
    name: str
    discovery_method: str
    discovery_year: int
    radius: float
    radius_confidence: float
    mass: float
    mass_confidence: float
    distance: float
    distance_confidence: float
    orbital_period: float
    temperature: int
    host_star: str
    description: str
    graph_data: List[GraphDataPoint]
    ai_model_version: str
    detection_confidence: float
    last_updated: str

# --- Mission Models ---

class MissionReport(BaseModel):
    """Model for returning mission analysis data."""
    name: str
    classification_report: str
    roc_curve_url: str