# API Integration Guide

## FastAPI Backend Setup

Your ExoAI project is now configured to work with a FastAPI backend. Here's how to set it up:

### Backend Requirements

Your FastAPI backend should have the following endpoints:

```
GET /exoplanets
- Returns: List of exoplanet objects
- Response: ExoplanetData[]

GET /exoplanets/{id}
- Returns: Single exoplanet object
- Response: ExoplanetData

GET /exoplanets?search={query} (optional)
- Returns: Filtered list of exoplanets
- Response: ExoplanetData[]
```
Get /Ai_performance?mission={mission name}

 table 3 { prcision, recall, F1 score}
 accuracy (numer %)
 curve2 (roc-),...


### Expected Data Structure

The API should return exoplanet data in this format:

```typescript
interface ExoplanetData {
  id: string;
  name: string;
  radius: number;
  mass: number;
  discovery_method: string;
  discovery_year: number;
  distance: number;
  orbital_period: number;
  temperature: number;
  host_star: string;
  description: string;
  graph_data: Array<{
    time: number;
    brightness?: number;
    velocity?: number;
  }>;
}
```

### Environment Configuration

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Running the Application

1. Start your FastAPI backend:
   ```bash
   # In your backend directory
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

2. Start the frontend:
   ```bash
   # In your frontend directory
   npm run dev
   ```

### Error Handling

The application includes comprehensive error handling:

- **Network errors**: Shows retry button
- **API errors**: Displays user-friendly error messages
- **Loading states**: Animated loading indicators
- **Empty states**: Helpful messages when no data is found

### Development Tips

1. **CORS**: Ensure your FastAPI backend has CORS enabled for `http://localhost:5173`
2. **Data validation**: The frontend expects specific data structure
3. **Error responses**: Use consistent error response format
4. **Rate limiting**: Consider implementing rate limiting for production

### Testing the Integration

1. Start both backend and frontend
2. Open `http://localhost:5173`
3. Check browser console for any API errors
4. Test the retry functionality if backend is down
