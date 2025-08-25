# Full Stack Software Engineer - Internship | Interview Challenge

This repository contains:
- **backend-springboot**: Spring Boot (Gradle) REST API with MongoDB
- **frontend-nextjs**: Next.js (TypeScript + Tailwind) client with simple frontend-only auth

## Quick Start

### 1) Run MongoDB
Using Docker:
```bash
docker run -d --name mongo -p 27017:27017 mongo:7
```

### 2) Start Backend
```bash
cd backend-springboot
gradle bootRun           # or ./gradlew bootRun if you have wrapper
```
API listens on **http://localhost:8080**.

### 3) Start Frontend
```bash
cd ../frontend-nextjs
cp .env.example .env.local   # adjust API URL if needed
npm install
npm run dev
```
Open **http://localhost:3000**. Login with `admin` / `password`.

## Testing the API (curl)
```bash
curl -X POST http://localhost:8080/api/items -H "Content-Type: application/json" -d '{"name":"Sample","description":"Hello"}'
curl http://localhost:8080/api/items
```

## Notes
- Validation via `@Valid` and `@NotBlank`.
- Errors handled by `@RestControllerAdvice`.
- CORS allows `http://localhost:3000` by default.
- Frontend stores session in `localStorage` (no backend auth).

## Bonus
- Frontend uses **TypeScript** and **env variable** `NEXT_PUBLIC_API_BASE`.
- Dockerfile for backend provided.
