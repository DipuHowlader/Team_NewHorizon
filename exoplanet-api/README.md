# Exoplanet Discovery API

Team: Team_NewHorizon

A small FastAPI project that serves a mock database of AI-detected exoplanets and mission analysis reports. This repository is designed as a lightweight example backend for experimenting with model outputs, API design, and simple front-end integrations (ROC)

NASA App Challenge blurb: Part of Team_NewHorizon’s submission to the 2025 NASA International Space Apps Challenge — ExoVerse Explorer demonstrates an end-to-end ML-assisted exoplanet discovery and visualization workflow.

## Table of contents
- Project overview
- Repository structure
- Quick start (Docker)
- Quick start (local / virtualenv)
- API endpoints and example requests
- Data model and mock DB
- Development notes (imports & static files)
- Running the test suite
- Troubleshooting
- Next steps & ideas

## Project overview
This API exposes two primary resources:

- Exoplanets: summarized and detailed records of candidate exoplanets detected by AI models.
- Missions: mission-level reports (classification metrics and an ROC plot link for Kepler/TESS).

The project uses FastAPI for the HTTP layer and Pydantic models for request/response validation. The data is stored in a mock JSON database at `app/data/mock_db.json` which contains both `exoplanets` and `missions` entries for examples and tests.

This repo is intentionally minimal to make it easy to understand, run, and extend.

## Repository structure

- `app/` - main application package
  - `main.py` - FastAPI app, mounts static files and includes routers
  - `routers/` - API routers (exoplanets, missions)
  - `models/` - Pydantic models for API responses
  - `data/` - mock JSON database used by the routers
  - `static/` - static assets (images used by mission endpoints)
- `tests/` - pytest test(s) that exercise the API
- `Dockerfile`, `docker-compose.yml` - optional Docker development/runtime
- `requirements.txt` - Python dependencies

## Quick start (Docker)
This project includes a `docker-compose.yml` for running the API with hot-reload in development.

1. Build and run the services:

```powershell
# From repository root on Windows PowerShell
docker-compose up --build
```

2. Open your browser:
- Swagger UI / OpenAPI docs: http://localhost:8000/docs
- Health / root: http://localhost:8000/

Notes:
- The Docker setup runs Uvicorn inside the container. The app package path inside the container is the repository root (so package imports must be package-relative or the container must run the app with the package in PYTHONPATH). The code uses package-relative imports and mounts the static directory using a path relative to the package file to avoid ModuleNotFoundError and missing static directory errors.

## Quick start (local / virtualenv)
1. Create and activate a virtualenv (example using venv):

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the app with Uvicorn (from repository root):

```powershell
python -m uvicorn app.main:app --reload --port 8000
```

3. Visit http://localhost:8000/docs for the interactive API docs.

## API endpoints

All endpoints are mounted under their respective routers. Example requests below assume the server runs at `http://localhost:8000`.

- GET /
  - Returns a simple welcome message and confirms the API is running.

- GET /exoplanets/
  - Returns a list of exoplanet summaries (Pydantic model `ExoplanetSummary`).
  - Query parameters (optional): `limit`, `mission` (implemented in the frontend/clients if needed).

- GET /exoplanets/{exoplanet_id}
  - Returns detailed information for the requested exoplanet (Pydantic model `ExoplanetDetail`).

- GET /missions/{mission_name}
  - Returns a mission analysis report (Pydantic model `MissionReport`). Example mission names: `kepler`, `tess`.
  - Mission responses include a link to an ROC image under `/static/images/{mission}_roc.png`.

Example curl (PowerShell-friendly):

```powershell
curl "http://localhost:8000/exoplanets/"
curl "http://localhost:8000/exoplanets/kepler-452b"
curl "http://localhost:8000/missions/kepler"
```

## Data model & mock DB
The Pydantic models live in `app/models/exoplanet.py`. They define the shapes for `ExoplanetSummary`, `ExoplanetDetail`, and `MissionReport` used by the routers. The data itself comes from `app/data/mock_db.json` which is read at router import time to keep the example simple.

If you extend this project, consider replacing the JSON mock DB with a real database and lazy-loading, caching, or dependency-injecting the DB access instead of reading at import time.

ML model note:

The project includes an optional ML generator that can produce exoplanet candidates at startup. If you have a trained joblib model for TESS, place it at `app/models/tess.joblib`. The generator falls back to a synthetic dataset when network access or the model file is not available.

For full repository-level instructions and showcase info, see the root `README.md`.

## Development notes (imports & static files)
Two issues you may encounter when running inside Docker or when starting the app from different working directories:

1. ModuleNotFoundError: No module named 'app'
   - Cause: Running the module without Python's package path configured (absolute imports like `from app.models...`) while the working directory or PYTHONPATH doesn't include the repository root.
   - Fix: Use package-relative imports inside the package (for example, `from .models.exoplanet import ExoplanetSummary` in routers, and `from app.routers import exoplanets` only when using `python -m app` or a configured PYTHONPATH). This repository is already updated to use package-relative imports in routers and `app/main.py`.

2. RuntimeError: Directory 'app/static' does not exist
   - Cause: `fastapi.staticfiles.StaticFiles` is given a path that's invalid relative to the process working directory (for example `directory='app/static'`). When the container or the app runs with a different working directory, that path may not exist.
   - Fix: Mount the static directory using a path relative to the package file, e.g.:

```python
from pathlib import Path
static_path = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=static_path), name="static")
```

This ensures the static folder is found regardless of the process working directory. The repo's `app/main.py` was updated to compute the static path from `__file__` to avoid the error.

## Running tests
This repo contains a simple pytest test `tests/test_api.py` that exercises the API endpoints.

Run tests locally:

```powershell
# activate venv first (see earlier)
pytest -q
```

In Docker you can either run pytest inside the container or add a test service in `docker-compose.yml` to run tests.

## Troubleshooting
- If you still see `ModuleNotFoundError: No module named 'app'` inside Docker, ensure:
  - The container's working directory includes the repository root, or
  - You're starting Uvicorn with `--app-dir` or `python -m uvicorn app.main:app`, or
  - Use package-relative imports as shown above.

- If StaticFiles still fails, check that `app/static` exists in the image. If you build the image and copy only certain files, ensure the `static` folder is included in the Dockerfile `COPY` commands.

## Next steps & ideas
- Replace the mock JSON DB with a proper database (Postgres + SQLAlchemy).
- Add authentication (OAuth2 / JWT) and per-user data.
- Add background tasks to run ML model inference and cache results.
- Add CI with GitHub Actions to run linting, tests, and security scans.

---

If you want, I can also:
- Add example Dockerfile fixes or a test service in `docker-compose.yml`.
- Create a `Makefile` or PowerShell script to standardize common commands.
- Add a simple frontend example that loads the mission ROC image and plots metrics.