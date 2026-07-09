"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sendNotification } from "@/features/patient/notifications/actions";

export async function fetchDoctors(searchQuery?: string, filterSpecialization?: string) {
  try {
    const supabase = await createClient();

    let query = supabase.from("doctors").select(`
      *,
      doctor_availability (*)
    `);

    if (searchQuery) {
      query = query.or(`full_name.ilike.%${searchQuery}%,clinic_name.ilike.%${searchQuery}%,specialization.ilike.%${searchQuery}%`);
    }

    if (filterSpecialization && filterSpecialization !== "All") {
      query = query.eq("specialization", filterSpecialization);
    }

    // Always sort by rating or experience
    query = query.order("rating", { ascending: false }).order("experience_years", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch doctors", err);
    return [];
  }
}

export async function bookAppointment(params: {
  doctorId: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  consultationMode: string;
  reasonForVisit: string;
}) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "Unauthorized" };
    }

    // Insert into appointments
    const { data: appointmentData, error: insertError } = await supabase
      .from("appointments")
      .insert({
        patient_id: user.id,
        doctor_id: params.doctorId,
        department: params.department,
        appointment_date: params.appointmentDate,
        appointment_time: params.appointmentTime,
        appointment_type: params.appointmentType,
        consultation_mode: params.consultationMode,
        reason_for_visit: params.reasonForVisit,
        status: "Pending",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to book appointment:", insertError);
      return { success: false, error: "Failed to book appointment. Please try again." };
    }

    if (appointmentData) {
      await sendNotification({
        userId: user.id,
        type: "Appointment",
        title: "Appointment Booked",
        message: `Your appointment with ${params.department} is scheduled for ${params.appointmentDate} at ${params.appointmentTime}.`,
        referenceId: appointmentData.id,
        referenceType: "appointment",
      });
    }

    // Revalidate dashboard routes
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/consult-doctor");

    return { success: true };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
