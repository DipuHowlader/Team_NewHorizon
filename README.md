# ExoAI Project

## Overview
The ExoAI project is a web application that provides an API for generating and retrieving exoplanet data. It utilizes **FastAPI** for the backend and a **JavaScript framework** (React/Vue) for the frontend. The application allows users to access synthetic and real exoplanet data, as well as performance metrics for AI models used in exoplanet detection.

---

## Project Structure
exoai-project
├── backend
│ ├── api.py
│ ├── requirements.txt # FastAPI application for backend services
│ └── README.md # Documentation for backend setup and usage
├── frontend
│ ├── src/
│ ├── public/
│ └── package.json # Configuration for frontend application
│ └── README.md # Documentation for frontend setup and usage
└── README.md # Main documentation for the entire project

---

## Live Host
- **Frontend:** [Live Site](https://exoai-explorer.onrender.com)  
- **Backend API:** `[api server](https://your-backend-domain.com)

> ⚠️ **Note:** If the host or API is down, please see the **Screenshots** section below to view the project locally or via examples.

---

## Screenshots
Include screenshots of the application to help users if the live host is unavailable:

- **Frontend Home Page:**  
  ![Home Page:](/screenshots/Screenshot%20(60).png)
  ![Home Page-filter:](/screenshots/Screenshot%20(61).png)
  ![Home Page-footer:](/screenshots/Screenshot%20(62).png)
  ![Home Page-exoplanet view:](/screenshots/Screenshot%20(65).png)

   ![Model Performance Page:](/screenshots/Screenshot%20(68).png)
   ![Team Page:](/screenshots/Screenshot%20(69).png)
  
- **API Documentation (/docs):**  
  ![API Docs Screenshot](./screenshots/api-docs.png)

---

## Instructions to Run the Project

### Frontend
1. Navigate to the frontend directory:
   cd frontend
Install dependencies:
   npm install
Run the frontend application:
   npm run dev
Access the app in your browser at http://127.0.0.1:8080 (or the port shown in terminal).
Backend :
Navigate to the backend directory:
   cd backend
Install required Python packages:
   pip install -r requirements.txt
Run the backend API:
   uvicorn api:app --reload
Access API docs in your browser at http://127.0.0.1:8000/docs.

Dependencies
Frontend: Node.js and npm.

Backend: Python 3.x, FastAPI, Uvicorn, and other packages listed in requirements.txt.

Usage
Start both frontend and backend servers locally to use the project fully.

Use the backend API endpoints to interact with exoplanet data and AI model performance metrics.

Visit /docs on the backend server to explore available API endpoints.

Notes
If the live host is unavailable, you can clone the repository and run the project locally using the instructions above.

Screenshots provide a reference for the UI and API functionality when offline or if the live host/API is down.
