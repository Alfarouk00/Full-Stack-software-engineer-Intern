# Spring Boot Items API (Gradle + MongoDB)

A minimal REST API with Spring Boot 3, Gradle, and MongoDB.

## Endpoints
- `POST /api/items` — create a new item (JSON body: `{ "name": "string", "description": "string (optional)" }`)
- `GET /api/items` — list all items

## Validation & Errors
- `name` is required and must be non-blank. Validation errors return **400** with details.
- General errors return **500** with a message.

## Run locally

1. **Start MongoDB** (Docker):
   ```bash
   docker run -d --name mongo -p 27017:27017 mongo:7
   ```

2. **Run the API**
   ```bash
   # from this folder
   gradlew bootRun         # Windows
   ./gradlew bootRun       # macOS/Linux
   ```
   Or use a system Gradle:
   ```bash
   gradle bootRun
   ```

   Environment variables:
   - `SPRING_DATA_MONGODB_URI` (default `mongodb://localhost:27017/itemsdb`)
   - `PORT` (default `8080`)

## Build a jar
```bash
gradle clean bootJar
java -jar build/libs/items-api-0.0.1-SNAPSHOT.jar
```

## Docker (optional)
Build image and run with MongoDB:
```bash
docker build -t items-api .
docker run --rm -p 8080:8080 --link mongo -e SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/itemsdb items-api
```

## CORS
CORS allows `http://localhost:3000` (Next.js dev). Adjust in `ItemController` if needed.
