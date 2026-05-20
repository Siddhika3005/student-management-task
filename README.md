# Task Management System

## Project Overview
A full-stack task management system that focuses on clean backend architecture. It includes JWT authentication, role-based access control, task CRUD APIs, Swagger docs, and a simple React dashboard.

## Tech Stack
### Backend
- Node.js, Express.js
- MongoDB with Mongoose
- JWT authentication, bcryptjs
- express-validator, Helmet, CORS
- Swagger (swagger-ui-express, swagger-jsdoc)
- morgan logging, express-rate-limit

### Frontend
- React.js (Vite)
- React Router DOM
- Axios

## Installation Steps
### Backend
1. Install dependencies:
   - cd backend
   - npm install
2. Create a .env file (see Environment Variables below).
3. Run the API:
   - npm run dev

### Frontend
1. Install dependencies:
   - cd frontend
   - npm install
2. Run the app:
   - npm run dev

## Environment Variables
Create backend/.env with:
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Frontend optional environment:
```
VITE_API_URL=http://localhost:5000/api/v1
```

## API Endpoints
### Auth
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Tasks (Protected)
- POST /api/v1/tasks
- GET /api/v1/tasks
- GET /api/v1/tasks/:id
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id

## Swagger Documentation
Start the backend and open /api-docs.

## Folder Structure
```
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    validators/
    docs/
    utils/
frontend/
  src/
    api/
    components/
    context/
    pages/
```

## Scalability Notes
- Split services into microservices for auth, tasks, and analytics.
- Add Redis caching for hot task lists and session data.
- Containerize with Docker and orchestrate via Kubernetes.
- Introduce load balancers and horizontal autoscaling.
- Use an API gateway for routing, auth, and rate limiting.
- Add background queues for notifications and reports.
- Centralize logging and monitoring with structured logs and metrics.

## Deployment Instructions
### Backend
- Deploy to Render or Railway and set environment variables.

### Frontend
- Deploy to Vercel and point VITE_API_URL to the deployed backend.

## Docker
Build and run all services with docker compose:
- docker compose up --build
