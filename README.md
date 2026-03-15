# GERD Diet Guide

A web application to help GERD patients identify safe foods, avoid trigger foods, and follow a healthy meal plan to maintain or gain weight without worsening symptoms.

## Product Vision

Help GERD patients easily identify safe foods, avoid trigger foods, and follow a healthy meal plan to maintain or gain weight without worsening symptoms.

## Problem Statement

Many GERD patients do not know:
- Which foods trigger acid reflux
- How to build a safe diet plan
- How to gain weight without triggering reflux

Most information online is scattered and not personalized.

## Product Goal

Provide a simple web tool that:
- Suggests GERD-safe foods
- Generates diet plans for weight gain
- Calculates daily calories
- Helps users choose safe meals

## Target Users

- GERD patients
- People who want to gain weight safely with GERD

## Key Features

### 1️⃣ Food Safety Guide
Users can check if a food is safe for GERD.

| Food | Status |
|------|--------|
| Banana | ✅ Safe |
| Coffee | ❌ Avoid |
| Oatmeal | ✅ Safe |
| Fried chicken | ⚠️ Risky |

Food levels: ✅ Safe | ⚠️ Moderate | ❌ Avoid

### 2️⃣ GERD Diet Plan Generator
User inputs:
- Weight
- Height
- Age
- Activity level
- Goal (Maintain / Gain Weight)

System outputs:
- Recommended daily calories
- Suggested meal plan

### 3️⃣ Meal Calorie Calculator
Users can:
- Select foods
- Add portion size
- System calculates total calories and nutrition balance

### 4️⃣ Optional User Account
User can:
- Save diet plans
- Track meals
- View history

Guest users can still use basic tools.

## User Flow

```
Home Page
    ↓
Select Tool
    ↓
Option A: Check Food Safety
Option B: Generate Diet Plan
Option C: Calculate Meal Calories
    ↓
Optional: Login to Save Data
```

## Core Pages

### 1. Home Page
- Search food safety
- Diet plan generator
- Calorie calculator

### 2. Food Safety Page
- Search bar: Search food (e.g., "Tomato")
- Output: Status, Reason, Suggestion

### 3. Diet Plan Generator
- Input form: Age, Weight, Height, Goal
- Output: Daily calorie recommendation, Meal plan

### 4. Meal Calorie Calculator
- User selects foods and portions
- System calculates total calories

## Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-1 | Food Search - User can search food items. System returns safety level and explanation. |
| FR-2 | Diet Plan Generator - System calculates calorie needs and suggests meals. |
| FR-3 | Meal Builder - Users can build meals and see calorie totals. |
| FR-4 | Account System (Optional) - Users can save diet plans and meals. |

## Non-Functional Requirements

| Type | Requirement |
|------|-------------|
| Performance | Response < 2 seconds |
| Usability | Mobile friendly |
| Security | User data protected |
| Scalability | Support 10k users |

## Database Structure

### Users
- user_id
- name
- email
- password
- created_at

### Foods
- food_id
- food_name
- category
- gerd_level
- calories
- description

### Diet Plans
- plan_id
- user_id
- daily_calories
- goal
- created_at

### Meals
- meal_id
- user_id
- food_id
- portion
- calories

## MVP (Minimum Viable Product)

First version should include only:
- ✅ Food safety guide
- ✅ Diet plan generator
- ✅ Calorie calculator

## Tech Stack

- **Frontend:** Next.js
- **Backend:** Node.js / Express
- **Database:** PostgreSQL
- **Hosting:** Vercel

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Pan-Ei-Khaing/Health_tracker.git

# Install dependencies
npm install

# Run development server
npm run dev
```

## License

MIT
