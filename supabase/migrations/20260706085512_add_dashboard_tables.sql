-- Create prescriptions table
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    medication_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    prescribed_by TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for prescriptions
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

-- Prescriptions Policies
CREATE POLICY "Patients can view their own prescriptions"
    ON prescriptions FOR SELECT
    USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own prescriptions"
    ON prescriptions FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own prescriptions"
    ON prescriptions FOR UPDATE
    USING (auth.uid() = patient_id);


-- Create notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g., 'appointment', 'prescription', 'system'
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notifications Policies
CREATE POLICY "Patients can view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own notifications"
    ON notifications FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = patient_id);

-- Indexes for performance
CREATE INDEX idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX idx_notifications_patient_id ON notifications(patient_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
