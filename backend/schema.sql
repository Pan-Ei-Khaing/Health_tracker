-- GERD Diet Guide Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== TABLES ====================

-- Foods table (main food database)
CREATE TABLE IF NOT EXISTS foods (
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    gerd_level VARCHAR(20) NOT NULL CHECK (gerd_level IN ('safe', 'moderate', 'avoid')),
    calories_per_100g INTEGER,
    portion_default VARCHAR(50),
    description TEXT,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table (optional - for future use)
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Diet Plans table
CREATE TABLE IF NOT EXISTS diet_plans (
    plan_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    daily_calories INTEGER,
    goal VARCHAR(20) CHECK (goal IN ('maintain', 'gain', 'lose')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meals table
CREATE TABLE IF NOT EXISTS meals (
    meal_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    food_id INTEGER REFERENCES foods(food_id),
    portion VARCHAR(50),
    calories INTEGER,
    meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== SEED DATA ====================

-- Insert sample foods (GERD-safe database)
INSERT INTO foods (food_name, category, gerd_level, calories_per_100g, portion_default, description, reason) VALUES
-- SAFE FOODS
('Banana', 'Fruit', 'safe', 89, '1 medium', 'Low acidity fruit', 'Low acidity, easy to digest'),
('Oatmeal', 'Grains', 'safe', 68, '1 cup cooked', 'Whole grain cereal', 'Whole grain, low fat'),
('Chicken Breast', 'Protein', 'safe', 165, '100g', 'Lean poultry', 'Lean protein, low fat when grilled'),
('Brown Rice', 'Grains', 'safe', 111, '1 cup cooked', 'Whole grain rice', 'Easy to digest, low acidity'),
('White Rice', 'Grains', 'safe', 130, '1 cup cooked', 'Plain rice', 'Easy to digest, low acidity'),
('Green Vegetables', 'Vegetables', 'safe', 50, '1 cup', 'Broccoli, spinach, etc.', 'Low fat, high fiber'),
('Ginger', 'Spices', 'safe', 80, '1 tsp', 'Natural spice', 'Natural anti-inflammatory'),
('Salmon', 'Protein', 'safe', 208, '100g', 'Fatty fish', 'Omega-3, low fat when baked'),
('Sweet Potato', 'Vegetables', 'safe', 86, '1 medium', 'Root vegetable', 'Easy to digest, low acidity'),
('Egg White', 'Protein', 'safe', 52, '2 large', 'Low cholesterol', 'Low fat protein'),
('Turkey Breast', 'Protein', 'safe', 135, '100g', 'Lean poultry', 'Low fat protein'),
('Cod', 'Protein', 'safe', 82, '100g', 'White fish', 'Very lean, easy to digest'),
('Tilapia', 'Protein', 'safe', 96, '100g', 'White fish', 'Lean fish, low fat'),
('Quinoa', 'Grains', 'safe', 120, '1 cup cooked', 'Ancient grain', 'Complete protein, easy to digest'),
('Pasta', 'Grains', 'safe', 131, '1 cup cooked', 'Plain pasta', 'Low fat when plain'),
('Bread (White)', 'Grains', 'safe', 79, '1 slice', 'Plain bread', 'Low fat option'),
('Milk (Skim)', 'Dairy', 'safe', 34, '1 cup', 'Non-fat milk', 'Low fat dairy'),
('Yogurt (Plain)', 'Dairy', 'safe', 59, '1 cup', 'Plain yogurt', 'Probiotics help digestion'),
('Apple', 'Fruit', 'safe', 52, '1 medium', 'Low acidity variety', 'Low acidity when peeled'),
('Papaya', 'Fruit', 'safe', 43, '1 cup', 'Tropical fruit', 'Contains digestive enzymes'),
('Watermelon', 'Fruit', 'safe', 30, '1 cup', 'Low acidity fruit', 'High water content, low acidity'),
('Cantaloupe', 'Fruit', 'safe', 34, '1 cup', 'Low acidity fruit', 'Low acidity melon'),
('Honeydew', 'Fruit', 'safe', 36, '1 cup', 'Low acidity fruit', 'Low acidity melon'),
('Cucumber', 'Vegetables', 'safe', 15, '1 cup', 'Cooling vegetable', 'High water, low acidity'),
('Zucchini', 'Vegetables', 'safe', 17, '1 cup', 'Summer squash', 'Easy to digest'),
('Carrot', 'Vegetables', 'safe', 41, '1 medium', 'Root vegetable', 'Low acidity, high fiber'),
('Green Beans', 'Vegetables', 'safe', 31, '1 cup', 'Legume', 'Low fat, high fiber'),
('Asparagus', 'Vegetables', 'safe', 20, '6 spears', 'Low acidity vegetable', 'Gentle on stomach'),
('Potato', 'Vegetables', 'safe', 77, '1 medium', 'Root vegetable', 'Easy to digest'),
('Pumpkin', 'Vegetables', 'safe', 26, '1 cup', 'Winter squash', 'Easy to digest'),

-- MODERATE FOODS
('Garlic', 'Spices', 'moderate', 149, '1 clove', 'Flavoring', 'Can trigger reflux in some people'),
('Onion', 'Vegetables', 'moderate', 40, '1/2 cup', 'Vegetable', 'Can trigger reflux in some people'),
('Cheese (Cheddar)', 'Dairy', 'moderate', 113, '30g', 'Hard cheese', 'Moderate fat content'),
('Cheese (Mozzarella)', 'Dairy', 'moderate', 85, '30g', 'Soft cheese', 'Lower fat option'),
('Butter', 'Dairy', 'moderate', 102, '1 tbsp', 'Dairy fat', 'Use in moderation'),
('Peanut Butter', 'Protein', 'moderate', 588, '2 tbsp', 'Nut butter', 'Can trigger reflux in some'),
('Almonds', 'Nuts', 'moderate', 579, '30g', 'Tree nuts', 'Healthy fats, small portions'),
('Walnuts', 'Nuts', 'moderate', 654, '30g', 'Tree nuts', 'Healthy fats, small portions'),
('Tofu', 'Protein', 'moderate', 76, '100g', 'Plant protein', 'Good protein source'),
('Tempeh', 'Protein', 'moderate', 192, '100g', 'Fermented soy', 'Probiotic benefits'),
('Coconut Milk', 'Dairy Alternative', 'moderate', 230, '1 cup', 'Plant milk', 'Use in moderation'),
('Olive Oil', 'Fats', 'moderate', 884, '1 tbsp', 'Healthy fat', 'Use in small amounts'),
('Avocado', 'Fruit', 'moderate', 160, '1/2 fruit', 'Creamy fruit', 'Healthy fats, small portions'),
('Tomato (Cooked)', 'Vegetables', 'moderate', 32, '1/2 cup', 'Cooked tomato', 'Less acidic than raw'),

-- AVOID FOODS
('Coffee', 'Beverages', 'avoid', 2, '1 cup', 'Caffeinated drink', 'High acidity, relaxes LES'),
('Tea (Black)', 'Beverages', 'avoid', 1, '1 cup', 'Caffeinated tea', 'High tannins'),
('Tea (Peppermint)', 'Beverages', 'avoid', 1, '1 cup', 'Herbal tea', 'Relaxes LES muscles'),
('Soda', 'Beverages', 'avoid', 39, '1 can', 'Carbonated drink', 'Carbonation increases pressure'),
('Chocolate', 'Desserts', 'avoid', 546, '30g', 'Cocoa product', 'High fat, contains caffeine'),
('Fried Chicken', 'Protein', 'avoid', 307, '100g', 'Fried poultry', 'High fat, hard to digest'),
('Pizza', 'Fast Food', 'avoid', 266, '1 slice', 'High fat, cheese', 'High fat, acidic tomato'),
('Burger', 'Fast Food', 'avoid', 295, '1 burger', 'High fat meat', 'High fat, triggers reflux'),
('French Fries', 'Fast Food', 'avoid', 312, 'medium', 'Fried potatoes', 'High fat, salty'),
('Ice Cream', 'Desserts', 'avoid', 207, '1/2 cup', 'Frozen dairy', 'High fat, cold triggers'),
('Chips', 'Snacks', 'avoid', 536, '30g', 'Salty snacks', 'High fat, salty'),
('Citrus Fruit', 'Fruit', 'avoid', 35, '1 medium', 'Oranges, lemons', 'High acidity'),
('Lemon', 'Fruit', 'avoid', 29, '1 fruit', 'Sour fruit', 'Very high acidity'),
('Orange', 'Fruit', 'avoid', 47, '1 medium', 'Citrus fruit', 'High acidity'),
('Grapefruit', 'Fruit', 'avoid', 42, '1/2 medium', 'Citrus fruit', 'Very high acidity'),
('Tomato (Raw)', 'Vegetables', 'avoid', 18, '1 medium', 'Raw tomato', 'High acidity'),
('Ketchup', 'Condiments', 'avoid', 101, '2 tbsp', 'Tomato sauce', 'High acidity'),
('Mustard', 'Condiments', 'avoid', 66, '1 tbsp', 'Condiment', 'Can trigger reflux'),
('Vinegar', 'Condiments', 'avoid', 18, '1 tbsp', 'Acidic condiment', 'High acidity'),
('Soy Sauce', 'Condiments', 'avoid', 53, '1 tbsp', 'Asian condiment', 'High sodium'),
('Spicy Food', 'Various', 'avoid', 0, 'varies', 'Hot peppers, curry', 'Can irritate stomach'),
('Chips (Tortilla)', 'Snacks', 'avoid', 479, '30g', 'Corn chips', 'High fat, acidic'),
('Alcohol', 'Beverages', 'avoid', 0, '1 drink', 'Beer, wine, liquor', 'Relaxes LES, irritates stomach'),
('Wine', 'Beverages', 'avoid', 83, '1 glass', 'Red or white', 'High acidity, alcohol'),
('Beer', 'Beverages', 'avoid', 43, '1 bottle', 'Carbonated alcohol', 'Carbonation + alcohol'),
('Energy Drinks', 'Beverages', 'avoid', 45, '1 can', 'Caffeine drinks', 'High caffeine, acidic'),
('Caffeine', 'Beverages', 'avoid', 0, '100mg', 'Stimulant', 'Triggers acid production'),
('Mint', 'Herbs', 'avoid', 0, '1 tsp', 'Peppermint/spearmint', 'Relaxes LES muscles'),
('Garlic Powder', 'Spices', 'avoid', 331, '1 tsp', 'Dried garlic', 'Can trigger reflux'),
('Onion Powder', 'Spices', 'avoid', 341, '1 tsp', 'Dried onion', 'Can trigger reflux'),
('Bacon', 'Protein', 'avoid', 541, '3 slices', 'Cured meat', 'High fat, nitrates'),
('Sausage', 'Protein', 'avoid', 301, '2 links', 'Processed meat', 'High fat, processed'),
('Ham', 'Protein', 'avoid', 145, '100g', 'Cured pork', 'High sodium, fat'),
('Gravy', 'Sauces', 'avoid', 82, '1/4 cup', 'Meat sauce', 'High fat'),
('Cream Sauce', 'Sauces', 'avoid', 200, '1/4 cup', 'White sauce', 'High fat dairy'),
('Mayonnaise', 'Condiments', 'avoid', 680, '1 tbsp', 'Egg-based', 'High fat'),
('Sour Cream', 'Dairy', 'avoid', 193, '2 tbsp', 'Dairy product', 'High fat'),
('Cream Cheese', 'Dairy', 'avoid', 342, '2 tbsp', 'Soft cheese', 'High fat'),
('Whole Milk', 'Dairy', 'avoid', 61, '1 cup', 'Full fat dairy', 'High fat'),
('Cheddar Cheese', 'Dairy', 'avoid', 403, '30g', 'Aged cheese', 'High fat, aged'),
('Parmesan', 'Dairy', 'avoid', 431, '30g', 'Hard cheese', 'High fat, aged'),
(' Processed Cheese', 'Dairy', 'avoid', 307, '1 slice', 'American cheese', 'Highly processed');

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_foods_name ON foods(food_name);
CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);
CREATE INDEX IF NOT EXISTS idx_foods_gerd_level ON foods(gerd_level);

-- ==================== COMMENTS ====================
COMMENT ON TABLE foods IS 'Main food database with GERD safety levels';
COMMENT ON TABLE users IS 'User accounts (optional feature)';
COMMENT ON TABLE diet_plans IS 'User diet plans with calorie goals';
COMMENT ON TABLE meals IS 'User meals with food items';
