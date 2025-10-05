# ExoAI Project Backend Documentation

## Overview
The ExoAI project is a web application designed to provide data on exoplanets, including their characteristics and performance metrics for AI models used in their detection. The backend is built using FastAPI, which allows for efficient handling of API requests.

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)
- Uvicorn (ASGI server)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd exoai-project/backend
   ```

2. Install the required dependencies:
   ```
   pip install fastapi pandas numpy
   ```

## Running the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run the backend application:
   ```
   uvicorn api:app --reload
   ```

The backend will be accessible at `http://127.0.0.1:8000`.

## API Usage

### Endpoints

- **GET /**: Returns a welcome message.
  
- **GET /exoplanets**: Retrieves a list of exoplanets. The response will include synthetic or real data depending on availability.

- **GET /exoplanets/{planet_id}**: Retrieves details of a specific exoplanet by its ID.

- **GET /ai_model**: Returns performance metrics for the specified mission (either "kepler" or "tess").

### Example Requests

- To get the list of exoplanets:
  ```
  GET http://127.0.0.1:8000/exoplanets
  ```

- To get details of a specific exoplanet:
  ```
  GET http://127.0.0.1:8000/exoplanets/synthetic-0
  ```

- To get AI model performance metrics for TESS:
  ```
  GET http://127.0.0.1:8000/ai_model?mission=tess
  ```

## Dependencies
- FastAPI: For building the API.
- Pandas: For data manipulation and analysis.
- NumPy: For numerical operations.

## Conclusion
This documentation provides the necessary steps to set up and run the backend of the ExoAI project. For frontend instructions, please refer to the frontend README file.