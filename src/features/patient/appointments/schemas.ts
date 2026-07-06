import { z } from "zod";

export const bookAppointmentSchema = z.object({
  department: z.string().min(2, "Please select a department"),
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
  consultationMode: z.string().min(1, "Consultation mode is required"),
  appointmentType: z.string().min(1, "Visit type is required"),
  reasonForVisit: z.string().min(10, "Please provide more details (at least 10 characters)"),
  notes: z.string().optional(),
});

export type BookAppointmentInput = z.infer<typeof bookAppointmentSchema>;

export const rescheduleAppointmentSchema = z.object({
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
});

export type RescheduleAppointmentInput = z.infer<typeof rescheduleAppointmentSchema>;
