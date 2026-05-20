# Backend API

## Overview
Node.js + Express REST API for authentication and task management. Uses JWT for auth, role-based access control, and MongoDB via Mongoose.

## Setup
1. Install dependencies:
   - npm install
2. Add environment variables in .env
3. Start the API:
   - npm run dev

## Swagger
Open http://localhost:5000/api-docs once the server is running.

## Notes
- Protected routes require a Bearer token in the Authorization header.
- Use /api/v1/auth/register and /api/v1/auth/login to obtain a token.
