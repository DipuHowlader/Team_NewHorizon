# ExoVerse Explorer — Exoplanet Discovery Showcase

Team: Team_NewHorizon

Tagline: AI-powered discovery and visualization of candidate exoplanets

This repository is a showcase project for AI-detected exoplanets. It includes:

- A FastAPI backend that serves exoplanet data and mission reports (with a pluggable ML generator)
- A React + Vite frontend that visualizes detected candidates and mission metrics
- Docker Compose for convenient local development

This repo is prepared for demonstration and GitHub presentation. Follow the Quick Start below to run locally or with Docker.

## Quick links

- Backend: `exoplanet-api/`
- Frontend: `frontend/`
- Backend API docs (when running): `http://localhost:8000/docs`

## Quick start (recommended)

Prerequisites: Git, Docker (optional), Node.js (for frontend), Python 3.10+ (for local backend runs)

Run both services with Docker Compose (recommended for demos):

```powershell
# From repo root
cd exoplanet-api
docker-compose up --build
```

The backend will be available at http://localhost:8000. Start the frontend separately (see frontend README) or adapt your deployment to serve the built frontend.

## Local development

Backend (Python + uvicorn):

```powershell
cd exoplanet-api
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend (Vite):

```powershell
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `frontend/.env` to point to your backend if it isn't the default `http://127.0.0.1:8000`.

## CI and Showcase

This repository contains a GitHub Actions workflow (CI) that runs backend tests and performs a frontend build to ensure the project is ready for public demo and contribution.

Showcase checklist (recommended for GitHub presentation)

- [ ] Add a license (e.g., MIT) to the repo.
- [ ] Add GitHub Actions badge(s) to this README after your first successful CI run.
- [ ] Add a short GIF or screenshots of the UI in `docs/` and link them here.
- [ ] Add a `README.md` to the `frontend/` and `exoplanet-api/` folders (done).
- [ ] Tag a release for the snapshot you want to showcase.


## Project structure

- `exoplanet-api/` — FastAPI app, models, routers and optional ML generator.
- `frontend/` — React + Vite UI with hooks that call the backend API.

## Contributing

Open issues or PRs, and include a short description of what you'd like to change. For major changes, please open an issue first to discuss the design.

## License

Include your preferred license here (MIT, Apache-2.0, etc.).
