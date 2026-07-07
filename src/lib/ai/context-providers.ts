// Future interfaces for context injection

export interface MedicalContext {
  conditions: string[];
  allergies: string[];
  bloodGroup?: string;
  bmi?: number;
}

export interface AppointmentContext {
  upcomingAppointments: {
    date: string;
    doctorName: string;
    specialty: string;
  }[];
}

export interface PrescriptionContext {
  activePrescriptions: {
    medicineName: string;
    dosage: string;
    frequency: string;
  }[];
}

export interface ProfileContext {
  name: string;
  age: number;
  gender: string;
}

export interface MedicalContextProvider {
  getMedicalContext(userId: string): Promise<MedicalContext | null>;
  getAppointmentContext(userId: string): Promise<AppointmentContext | null>;
  getPrescriptionContext(userId: string): Promise<PrescriptionContext | null>;
  getProfileContext(userId: string): Promise<ProfileContext | null>;
}
