# GERD Diet Guide - Backend Setup

## Prerequisites

1. **PostgreSQL 17** installed
2. **Node.js** installed

## Setup Steps

### 1. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE health_clinic;

# Exit psql
\q
```

### 2. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your database credentials, Google OAuth Client ID, and JWT secret
# DATABASE_URL=postgresql://postgres:***@localhost:5432/health_clinic
# GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
# JWT_SECRET=change-this-to-a-long-random-secret
```

### 3. Run Schema

```bash
# Run the schema to create tables and seed data
psql -U postgres -d health_clinic -f schema.sql
```

### 4. Install Dependencies & Start Server

```bash
# Install dependencies
npm install

# Start the server
npm run dev
```

Server will run on http://localhost:3001

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| POST | /api/users | Create/register local user profile |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update user profile |
| DELETE | /api/users/:id | Delete user |
| POST | /api/auth/google | Register/login with Google credential, returns user + JWT token + /dashboard redirect |
| GET | /api/foods | Get all foods |
| GET | /api/foods/search?q=banana | Search foods |
| GET | /api/foods/:id | Get food by ID |
| POST | /api/calculate | Calculate daily calories |
| GET | /api/meals/suggestions/:calories | Get meal suggestions |
| GET/POST/DELETE | /api/symptoms | Manage symptom logs |
| GET/POST/DELETE | /api/triggers | Manage trigger logs |

## Running Both Frontend and Backend

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd ..
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:3001
