# GERD Diet Guide - Backend Setup

## Prerequisites

1. **PostgreSQL** installed
2. **Node.js** installed

## Setup Steps

### 1. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE gerd_diet_guide;

# Exit psql
\q
```

### 2. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/gerd_diet_guide
```

### 3. Run Schema

```bash
# Run the schema to create tables and seed data
psql -U postgres -d gerd_diet_guide -f schema.sql
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
| GET | /api/foods | Get all foods |
| GET | /api/foods/search?q=banana | Search foods |
| GET | /api/foods/:id | Get food by ID |
| POST | /api/calculate | Calculate daily calories |
| GET | /api/meals/suggestions/:calories | Get meal suggestions |

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
