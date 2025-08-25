# Full Stack Software Engineer - Internship

This repository contains:
- **backend-springboot**: Spring Boot (Gradle) REST API with MongoDB
- **frontend-nextjs**: Next.js (TypeScript + Tailwind) client with simple frontend-only auth

## Quick Start

### 1) Run MongoDB
Using Docker:
```bash
docker run -d --name mongo -p 27017:27017 mongo:latest
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
