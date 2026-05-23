# Stomach Care Platform

A web application to help patients with stomach conditions such as **IBS** and **GERD** identify safer foods, avoid personal triggers, plan stomach-friendly meals, calculate calories, and track symptoms.

> Full product requirements are documented in [`docs/PRD.md`](docs/PRD.md).

## Product Vision

Help IBS and GERD patients easily understand food safety, identify triggers, follow a healthy meal plan, and track symptoms without replacing professional medical advice.

## Problem Statement

Many stomach disease patients do not know:
- Which foods trigger acid reflux, bloating, diarrhea, constipation, cramps, or stomach pain
- How IBS trigger foods can differ from GERD trigger foods
- How to build a safe diet plan for their condition
- How to track meals and symptoms to find personal patterns
- How to prepare useful history for doctors or dietitians

Most information online is scattered, generic, and not personalized.

## Product Goal

Provide a simple web platform that:
- Suggests IBS-safe and GERD-safe foods
- Generates diet plans for weight maintenance, weight gain, or weight loss
- Calculates daily calories and meal calories
- Helps users choose safer meals
- Helps users track symptoms and possible triggers
- Provides patient-friendly education about IBS and GERD

## Target Users

- GERD patients
- IBS patients
- People with bloating, reflux, stomach pain, constipation, diarrhea, or indigestion
- People who want to gain or maintain weight safely while managing stomach symptoms
- Caregivers, dietitians, or doctors who need food/symptom history

## Current MVP Features

These features are already implemented or partially implemented in this repository:

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

## Planned Platform Features

These features are defined in the PRD for the IBS/GERD patient platform:
- IBS and GERD food safety comparison
- Condition filter: IBS, GERD, or both
- Symptom tracker
- Trigger journal
- Weekly symptom summary
- Education section for IBS, GERD, low-FODMAP guidance, lifestyle tips, and doctor warning signs
- Optional user account to save meals, symptoms, and diet plans
- Doctor/dietitian report export

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

Current MVP includes:
- ✅ Food safety guide
- ✅ Diet plan generator
- ✅ Calorie calculator

Next MVP improvements from the PRD:
- ✅ Add IBS food safety levels
- ✅ Add symptom tracker
- ✅ Add trigger journal
- ✅ Add education section

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
