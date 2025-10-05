# ExoAI Project

## Overview
The ExoAI project is a web application that provides an API for generating and retrieving exoplanet data. It utilizes FastAPI for the backend and a JavaScript framework for the frontend. The application allows users to access synthetic and real exoplanet data, as well as performance metrics for AI models used in exoplanet detection.

## Project Structure
```
exoai-project
├── backend
│   ├── api.py  
│   ├── requirements.txt          # FastAPI application for backend services
│   └── README.md       # Documentation for backend setup and usage
├── frontend
|   ├── src/
|   ├── public/
|   └── package.json
│   ├── package.json    # Configuration for frontend application
│   └── README.md       # Documentation for frontend setup and usage
└── README.md           # Main documentation for the entire project
```

## Instructions to Run the Project

### Frontend
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Run the frontend application:
   ```
   npm run dev
   ```

### Backend
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install required Package from package.json
   ```
   npm install
   ```

3. Run the backend application:
   ```
   uvicorn api:app --reload
   ```

## Dependencies
- Ensure you have Node.js and npm installed for the frontend.
- Ensure you have Python and the required libraries installed for the backend, including FastAPI and Uvicorn.

## Usage
- Access the frontend application in your web browser after starting the frontend server (default - 127.0.0.1:8080).
- Use the backend API endpoints to interact with the exoplanet data and AI model performance metrics. Visit `/docs` for API documentation.