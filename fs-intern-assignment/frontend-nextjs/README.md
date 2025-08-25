# Next.js Items Frontend

Simple Next.js (App Router + TypeScript + Tailwind) client for the Spring Boot Items API.

## Credentials
- **Username:** `admin`
- **Password:** `password`
(Frontend-only auth; session stored in `localStorage`)

## Configure API base URL
Copy `.env.example` to `.env.local` and set:
```
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

## Run
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Pages
- `/login` — login form
- `/items` — list & add items (protected on client; redirects to login if not authenticated)

## Error handling
- Displays validation errors from API (e.g. missing name).
- Shows generic error if the API is unreachable or returns an error.
