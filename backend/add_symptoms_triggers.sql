-- Add symptom tracker and trigger journal tables

CREATE TABLE IF NOT EXISTS symptom_logs (
    symptom_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    symptom VARCHAR(100) NOT NULL,
    severity INTEGER NOT NULL CHECK (severity BETWEEN 1 AND 10),
    related_meal TEXT,
    stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),
    sleep_quality VARCHAR(20) CHECK (sleep_quality IN ('Good', 'Okay', 'Poor')),
    notes TEXT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trigger_logs (
    trigger_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    trigger_type VARCHAR(50) NOT NULL,
    trigger_name VARCHAR(150) NOT NULL,
    caused_symptoms VARCHAR(20) NOT NULL CHECK (caused_symptoms IN ('Yes', 'No', 'Not sure')),
    related_symptom VARCHAR(100),
    notes TEXT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_symptom_logs_user_id ON symptom_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_logged_at ON symptom_logs(logged_at);
CREATE INDEX IF NOT EXISTS idx_trigger_logs_user_id ON trigger_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_trigger_logs_name ON trigger_logs(trigger_name);
CREATE INDEX IF NOT EXISTS idx_trigger_logs_logged_at ON trigger_logs(logged_at);

COMMENT ON TABLE symptom_logs IS 'Patient symptom tracker logs';
COMMENT ON TABLE trigger_logs IS 'Patient suspected trigger journal logs';
