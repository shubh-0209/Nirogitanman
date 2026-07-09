ALTER TABLE appointments 
RENAME COLUMN notes TO patient_notes;

ALTER TABLE appointments
ADD COLUMN doctor_notes TEXT,
ADD COLUMN meeting_link TEXT,
ADD COLUMN prescription_id UUID REFERENCES prescriptions(id);
