import { z } from "zod";

export const uploadMedicalRecordSchema = z.object({
  title: z.string().min(2, "Title is required"),
  recordType: z.string().min(2, "Record type is required"),
  visitDate: z.string().min(1, "Date is required"),
  hospitalName: z.string().optional(),
  doctorName: z.string().optional(),
  diagnosis: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export type UploadMedicalRecordInput = z.infer<typeof uploadMedicalRecordSchema>;
