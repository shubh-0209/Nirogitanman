import { z } from "zod";

export const bookAppointmentSchema = z.object({
  department: z.string().min(2, "Please select a department"),
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
  consultationMode: z.enum(["In-person", "Video"]),
  reasonForVisit: z.string().min(5, "Please briefly describe the reason for your visit"),
});

export type BookAppointmentInput = z.infer<typeof bookAppointmentSchema>;

export const rescheduleAppointmentSchema = z.object({
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
});

export type RescheduleAppointmentInput = z.infer<typeof rescheduleAppointmentSchema>;
