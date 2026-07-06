-- Create Medical Records Table
CREATE TABLE IF NOT EXISTS public.medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    record_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    diagnosis TEXT,
    hospital_name TEXT,
    doctor_name TEXT,
    visit_date DATE NOT NULL,
    attachments TEXT[] DEFAULT '{}'::TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON public.medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_record_type ON public.medical_records(record_type);
CREATE INDEX IF NOT EXISTS idx_medical_records_visit_date ON public.medical_records(visit_date);

-- Enable RLS
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Medical Records
-- Patients can view their own medical records
CREATE POLICY "Patients can view their own medical records" 
    ON public.medical_records 
    FOR SELECT 
    USING (auth.uid() = patient_id);

-- Patients can insert their own medical records
CREATE POLICY "Patients can insert their own medical records" 
    ON public.medical_records 
    FOR INSERT 
    WITH CHECK (auth.uid() = patient_id);

-- Patients can update their own medical records
CREATE POLICY "Patients can update their own medical records" 
    ON public.medical_records 
    FOR UPDATE 
    USING (auth.uid() = patient_id);

-- Create updated_at trigger for medical_records
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS handle_medical_records_updated_at ON public.medical_records;
CREATE TRIGGER handle_medical_records_updated_at
    BEFORE UPDATE ON public.medical_records
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Set up Storage for Medical Records
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'medical-records', 
    'medical-records', 
    false, 
    10485760, -- 10MB
    '{"application/pdf","image/jpeg","image/png"}'
)
ON CONFLICT (id) DO UPDATE SET 
    public = false,
    file_size_limit = 10485760,
    allowed_mime_types = '{"application/pdf","image/jpeg","image/png"}';

-- Storage RLS Policies
-- Patients can view their own medical records in storage
CREATE POLICY "Patients can view their own medical record files" 
    ON storage.objects 
    FOR SELECT 
    USING (
        bucket_id = 'medical-records' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Patients can upload their own medical records to storage
CREATE POLICY "Patients can upload their own medical record files" 
    ON storage.objects 
    FOR INSERT 
    WITH CHECK (
        bucket_id = 'medical-records' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Patients can update/overwrite their own medical records in storage
CREATE POLICY "Patients can update their own medical record files" 
    ON storage.objects 
    FOR UPDATE 
    USING (
        bucket_id = 'medical-records' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
