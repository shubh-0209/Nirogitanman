import { z } from "zod";

export const patientProfileSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]).optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  
  // Contact Information
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  aadhaar: z.string().optional(),
  
  // Address
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pinCode: z.string().optional(),
  
  // Emergency Contact
  emergencyContactName: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  
  // Medical Information
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  currentMedications: z.string().optional(),
  pastSurgeries: z.string().optional(),
  height: z.coerce.number().optional(), // cm
  weight: z.coerce.number().optional(), // kg
  bmi: z.string().optional(), // Calculated
  organDonor: z.boolean().default(false).optional(),
  
  // Insurance
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  insuranceExpiry: z.string().optional(), // date string
});

export type PatientProfileInput = z.infer<typeof patientProfileSchema>;

export interface PatientProfileData extends PatientProfileInput {
  patientId: string;
  memberSince: string;
  profileCompletion: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLogin: string;
  accountCreated: string;
  profilePhotoUrl?: string;
}
