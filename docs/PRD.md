# Product Requirements Document (PRD): Stomach Care Platform for IBS and GERD Patients

## 1. Product Overview

**Product name:** Stomach Care Platform

**Current project name:** GERD Diet Guide / Health Tracker

**Purpose:** Build a patient-friendly web platform that helps people living with stomach conditions such as **IBS (Irritable Bowel Syndrome)** and **GERD (Gastroesophageal Reflux Disease)** understand symptoms, identify food triggers, plan safer meals, track daily habits, and make better diet decisions.

The product should not replace a doctor. It should provide practical guidance, tracking, and education to support patients in daily self-management.

## 2. Problem Statement

Patients with IBS or GERD often struggle with:

- Knowing which foods are safe, risky, or triggering
- Understanding the difference between IBS triggers and GERD triggers
- Planning meals that avoid symptoms
- Tracking symptoms, meals, bowel habits, reflux episodes, and lifestyle patterns
- Remembering what caused flare-ups
- Finding simple, trustworthy information in one place
- Communicating their history clearly to doctors or dietitians

Most health information online is scattered, generic, or difficult for patients to apply to their daily meals.

## 3. Product Vision

Create a simple, mobile-friendly platform where stomach disease patients can:

- Search food safety for IBS and GERD
- Build symptom-safe meal plans
- Track meals, symptoms, triggers, and lifestyle habits
- Learn stomach-friendly diet and behavior tips
- Generate useful reports for personal review or doctor visits

## 4. Target Users

### Primary users

- Patients with GERD
- Patients with IBS
- People with stomach sensitivity, bloating, reflux, constipation, diarrhea, or indigestion
- Patients trying to identify food triggers
- People who need diet guidance for weight maintenance or healthy weight gain while managing symptoms

### Secondary users

- Caregivers helping patients manage meals
- Nutritionists or dietitians reviewing patient food logs
- Doctors who want symptom and diet history from patients

## 5. Goals and Success Metrics

### Product goals

- Help users identify safer foods for IBS and GERD
- Reduce confusion about trigger foods
- Help users plan simple meals based on their condition
- Let users track symptoms and discover personal patterns
- Make the app usable on mobile devices

### Success metrics

- Users can search food safety in under 10 seconds
- Users can generate a basic diet plan in under 1 minute
- Users can log a meal or symptom in under 30 seconds
- At least 80% of common IBS/GERD trigger foods are covered in the food database
- Users can export or view a weekly symptom summary

## 6. Scope

### MVP scope

The first complete version should include:

1. Food Safety Guide for IBS and GERD
2. Diet Plan Generator
3. Meal Calorie Calculator
4. Symptom Tracker
5. Trigger Journal
6. Education/Tips section
7. Basic responsive web design

### Future scope

Future versions may include:

- User accounts and authentication
- Save diet plans and food logs
- Doctor/dietitian report export as PDF
- Personalized trigger prediction
- Medication reminder
- Water intake tracking
- Appointment notes
- Multi-language support
- AI chatbot for stomach-friendly meal suggestions

## 7. Key Features

## 7.1 Food Safety Guide

### Description

Users can search foods and see whether they are generally safe, moderate, or risky for IBS and/or GERD.

### Requirements

- User can search food by name
- Food result should show:
  - Food name
  - Category
  - IBS safety level
  - GERD safety level
  - Calories
  - Portion size
  - Reason/explanation
  - Safer alternative if available
- Safety levels:
  - ✅ Safe
  - ⚠️ Moderate / depends on patient
  - ❌ Avoid / common trigger
- User can filter foods by condition:
  - IBS
  - GERD
  - Both IBS and GERD
- User can browse food categories:
  - Fruits
  - Vegetables
  - Grains
  - Protein
  - Dairy
  - Drinks
  - Spices
  - Fast food
  - Snacks

### Example

Food: Coffee

- GERD: ❌ Avoid — caffeine and acidity can trigger reflux
- IBS: ⚠️ Moderate — may worsen diarrhea or cramps in some patients
- Alternative: Low-acid herbal tea, warm water, or decaf if tolerated

## 7.2 IBS and GERD Diet Plan Generator

### Description

Users enter basic information and select their condition. The system suggests a simple meal plan with calories and stomach-friendly foods.

### User inputs

- Condition:
  - IBS
  - GERD
  - Both
- Weight
- Height
- Age
- Activity level
- Goal:
  - Maintain weight
  - Gain weight
  - Lose weight
- Food preference:
  - Normal diet
  - Vegetarian
  - Low-fat
  - Low-FODMAP preference
- Foods to avoid manually

### System outputs

- Estimated BMR
- Daily calorie target
- Suggested breakfast, lunch, dinner, and snack
- GERD-friendly tips if GERD is selected
- Low-FODMAP/IBS-friendly tips if IBS is selected
- Warning that the plan is general guidance, not medical advice

### Meal plan rules

For GERD:

- Prefer low-fat meals
- Avoid spicy, acidic, fried, caffeine, chocolate, alcohol, mint
- Recommend smaller meals
- Avoid late-night meals

For IBS:

- Support low-FODMAP style options
- Avoid common triggers such as onion, garlic, beans, certain dairy, high-fat foods, and carbonated drinks
- Allow personalization because IBS triggers vary by person

## 7.3 Meal Calorie Calculator

### Description

Users can build a meal by selecting foods and portions. The system calculates total calories.

### Requirements

- User can add food items to a meal
- User can remove food items
- User can see total calories
- User can see warning if selected foods are risky for IBS or GERD
- User can classify meal type:
  - Breakfast
  - Lunch
  - Dinner
  - Snack

### Future enhancement

- Save meal to daily log
- Show nutrition balance such as protein, fat, carbohydrate, and fiber

## 7.4 Symptom Tracker

### Description

Users can record symptoms to identify patterns over time.

### Requirements

User can log:

- Date and time
- Symptom type:
  - Acid reflux
  - Heartburn
  - Bloating
  - Stomach pain
  - Nausea
  - Gas
  - Constipation
  - Diarrhea
  - Cramping
- Severity level from 1 to 10
- Notes
- Possible related meal
- Stress level
- Sleep quality

### Outputs

- Daily symptom list
- Weekly symptom summary
- Most frequent symptoms
- High-severity days

## 7.5 Trigger Journal

### Description

Users can connect symptoms with foods and habits to discover personal triggers.

### Requirements

- User can log a suspected trigger
- Trigger can be:
  - Food
  - Drink
  - Stress
  - Late meal
  - Large meal
  - Lack of sleep
  - Medication missed
- User can mark whether the trigger caused symptoms
- User can view repeated trigger patterns

### Example insight

“You logged reflux 3 times after coffee this week. Coffee may be a trigger for you.”

## 7.6 Education and Tips Section

### Description

The app should include simple educational content for patients.

### Content topics

- What is GERD?
- What is IBS?
- Difference between IBS and GERD
- Common GERD trigger foods
- Common IBS trigger foods
- Low-FODMAP beginner guide
- GERD lifestyle tips
- When to see a doctor
- Emergency warning signs

### Medical safety disclaimer

Every education section should include:

> This app provides general educational information only. It is not a medical diagnosis or treatment plan. Please consult a qualified healthcare professional for personal medical advice.

## 8. User Flows

## 8.1 Food Search Flow

1. User opens home page
2. User selects Food Safety Guide
3. User searches a food name
4. User selects condition: IBS, GERD, or Both
5. System displays safety level, reason, and alternative

## 8.2 Diet Plan Flow

1. User opens Diet Plan Generator
2. User selects condition and goal
3. User enters age, weight, height, and activity level
4. User clicks Generate Plan
5. System displays calorie target and meal suggestions

## 8.3 Symptom Tracking Flow

1. User opens Symptom Tracker
2. User selects symptom type and severity
3. User adds notes and possible trigger
4. User saves entry
5. System shows daily/weekly summary

## 9. Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-1 | User can search food safety by food name | High |
| FR-2 | User can filter food safety by IBS, GERD, or both | High |
| FR-3 | System shows safety level, reason, calories, and portion | High |
| FR-4 | User can generate diet plan from profile inputs | High |
| FR-5 | System calculates BMR and daily calories | High |
| FR-6 | User can build a meal and calculate total calories | High |
| FR-7 | User can log symptoms with severity | High |
| FR-8 | User can log suspected triggers | Medium |
| FR-9 | User can view weekly symptom summary | Medium |
| FR-10 | User can read IBS/GERD education content | Medium |
| FR-11 | User can create account and save history | Future |
| FR-12 | User can export a doctor report | Future |

## 10. Non-Functional Requirements

| Type | Requirement |
| --- | --- |
| Performance | Main pages should load in under 3 seconds on normal mobile internet |
| Usability | Interface should be simple, readable, and mobile-friendly |
| Accessibility | Use clear labels, readable contrast, and keyboard-friendly controls |
| Security | Protect personal health data when accounts are added |
| Privacy | Do not share user health data without consent |
| Reliability | Food search and calculators should work without backend dependency where possible |
| Scalability | Backend should support future user accounts and saved logs |
| Maintainability | Food and symptom data should be easy to update |

## 11. Data Model

## 11.1 Foods

- food_id
- food_name
- category
- calories_per_100g
- portion_default
- ibs_level: safe / moderate / avoid
- gerd_level: safe / moderate / avoid
- ibs_reason
- gerd_reason
- alternative_food
- created_at

## 11.2 Users

- user_id
- name
- email
- password_hash
- created_at

## 11.3 Diet Plans

- plan_id
- user_id
- condition_type: IBS / GERD / Both
- daily_calories
- goal
- generated_plan_json
- created_at

## 11.4 Meals

- meal_id
- user_id
- meal_type
- food_items_json
- total_calories
- condition_warning
- created_at

## 11.5 Symptoms

- symptom_id
- user_id
- symptom_type
- severity
- notes
- related_meal_id
- stress_level
- sleep_quality
- created_at

## 11.6 Triggers

- trigger_id
- user_id
- trigger_type
- trigger_name
- symptom_id
- confidence_level
- notes
- created_at

## 12. Suggested Pages

| Page | Purpose |
| --- | --- |
| Home | Explain app and link to core tools |
| Food Safety Guide | Search IBS/GERD food safety |
| Diet Plan Generator | Generate meal plan and calories |
| Meal Calculator | Build meals and calculate calories |
| Symptom Tracker | Log and review symptoms |
| Trigger Journal | Track possible food/lifestyle triggers |
| Education | Read IBS/GERD guides and tips |
| Profile / Account | Save user data in future version |

## 13. MVP Acceptance Criteria

The MVP is complete when:

- User can open the website on mobile and desktop
- User can search at least 100 foods for IBS/GERD safety
- User can generate a diet plan for GERD, IBS, or both
- User can calculate meal calories
- User can log symptoms locally or through backend
- User can see basic symptom summary
- Website displays medical disclaimer clearly
- README explains how to run the project

## 14. Risks and Considerations

- Medical advice must be general and include disclaimers
- IBS triggers vary significantly by person
- Food safety data should be reviewed and updated carefully
- Personal health data needs strong privacy and security if accounts are added
- Users may misunderstand the app as a diagnosis tool, so wording must be careful

## 15. Roadmap

### Phase 1: Current MVP improvement

- Expand current GERD food database to include IBS safety levels
- Add condition filter: IBS / GERD / Both
- Add symptom tracker page
- Add trigger journal page
- Add education page

### Phase 2: Personalization

- Save meals and symptoms
- Add weekly reports
- Add personal trigger detection
- Add user accounts

### Phase 3: Healthcare support

- Export doctor report
- Add medication reminders
- Add dietitian notes
- Add multi-language support

## 16. Product Decisions

The following open questions have been answered and should guide implementation:

- **Platform focus:** Support **IBS and GERD equally** from the first expanded version.
- **Health log storage:** Save user health logs **locally first** before adding user accounts or cloud sync.
- **Language support:** Support **English first**, then add **Burmese/Myanmar language** support.
- **Medical review:** Food data does **not need doctor or nutritionist review for now**, but the app must keep clear medical disclaimers and avoid presenting content as diagnosis or treatment.
- **Local food database:** Include **Myanmar/local foods** in the food database, with IBS and GERD safety levels where possible.
