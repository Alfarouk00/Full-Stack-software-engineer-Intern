
## Endpoints
- `POST /api/items` — create a new item (JSON body: `{ "name": "string", "description": "string (optional)" }`)
- `GET /api/items` — list all items

## Validation & Errors
- `name` is required and must be non-blank. Validation errors return **400** with details.
- General errors return **500** with a message.

## Run locally

1. **Start MongoDB** (Docker):
   ```bash
   docker run -d --name mongo -p 27017:27017 mongo:latest
   ```

2. **Run the API**
   ```bash
   # from this folder
   gradlew bootRun        
   ```
   Or use a system Gradle:
   ```bash
   gradle bootRun
   ```

   Environment variables:
   - `SPRING_DATA_MONGODB_URI` (default `mongodb://localhost:27017/thedb`)
   - `PORT` (default `8080`)


## CORS
CORS allows `http://localhost:3000` (Next.js dev). Adjust in `ItemController`.
