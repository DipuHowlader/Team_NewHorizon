from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

# Use package-relative imports so this module works when the package is imported
# (for example, when running via `uvicorn app.main:app` inside Docker).
from routers import exoplanets, missions

app = FastAPI(
    title="Exoplanet Discovery API",
    description="An API to serve AI-detected exoplanet data and mission analysis.",
    version="1.0.0",
)

# Allow requests from the frontend dev server (Vite) during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static directory to serve images
# This allows access to /static/images/kepler_roc.png etc.
static_dir = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# Include the routers with prefixes
# All routes in exoplanets.py will be prefixed with /exoplanets
app.include_router(exoplanets.router, prefix="/exoplanets", tags=["Exoplanets"])
app.include_router(missions.router, prefix="/missions", tags=["Missions"])


@app.get("/", tags=["Root"])
async def read_root():
    """A simple root endpoint to confirm the API is running."""
    return {"message": "Welcome to the Exoplanet Discovery API! 🚀 Visit /docs for documentation."}