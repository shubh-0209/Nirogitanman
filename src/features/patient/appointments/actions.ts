"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/routes";
import { BookAppointmentInput } from "./schemas";
import { getCachedAuthUser } from "@/features/auth/utils";
import { sendNotification } from "@/features/patient/notifications/actions";

export async function bookAppointment(data: BookAppointmentInput) {
  try {
    const user = await getCachedAuthUser();
    if (!user) {
      return { error: "You must be logged in to book an appointment." };
    }

    const supabase = await createClient();

    const appointmentData = {
      patient_id: user.id,
      department: data.department,
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
      consultation_mode: data.consultationMode,
      reason_for_visit: data.reasonForVisit,
      status: "Scheduled",
    };

    const { data: dbData, error } = await supabase.from("appointments").insert(appointmentData).select("id").single();

    if (error) {
      console.error("Error booking appointment:", error);
      return { error: "Failed to book appointment. Please try again." };
    }

    const appointment = dbData;

    if (appointment) {
      await sendNotification({
        userId: user.id,
        type: "Appointment",
        title: "Appointment Booked",
        message: `Your appointment with ${appointmentData.department} is scheduled for ${appointmentData.appointment_date} at ${appointmentData.appointment_time}.`,
        referenceId: appointment.id,
        referenceType: "appointment",
      });
    }

    // Revalidate dashboard and appointments paths
    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath("/dashboard/my-appointments");

    return { success: true };
  } catch (err) {
    console.error("Unexpected error booking appointment:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function cancelAppointment(appointmentId: string) {
  try {
    const user = await getCachedAuthUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("appointments")
      .update({ status: "Cancelled", updated_at: new Date().toISOString() })
      .eq("id", appointmentId)
      .eq("patient_id", user.id); // ensure ownership

    if (error) {
      console.error("Error cancelling appointment:", error);
      return { error: "Failed to cancel appointment." };
    }

    await sendNotification({
      userId: user.id,
      type: "Appointment",
      title: "Appointment Cancelled",
      message: `Your appointment has been successfully cancelled.`,
      referenceId: appointmentId,
      referenceType: "appointment",
    });

    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath("/dashboard/my-appointments");

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function updateAppointment(appointmentId: string, data: { appointmentDate: string; appointmentTime: string; reasonForVisit?: string }) {
  try {
    const user = await getCachedAuthUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    const updateData: Record<string, unknown> = {
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
      updated_at: new Date().toISOString(),
    };
    
    if (data.reasonForVisit) {
        updateData.reason_for_visit = data.reasonForVisit;
    }

    const { error } = await supabase
      .from("appointments")
      .update(updateData)
      .eq("id", appointmentId)
      .eq("patient_id", user.id)
      .in("status", ["Pending", "Scheduled", "Confirmed"]); // only allow editing if not completed/cancelled

    if (error) {
      console.error("Error updating appointment:", error);
      return { error: "Failed to update appointment." };
    }

    await sendNotification({
      userId: user.id,
      type: "Appointment",
      title: "Appointment Rescheduled",
      message: `Your appointment has been rescheduled to ${data.appointmentDate} at ${data.appointmentTime}.`,
      referenceId: appointmentId,
      referenceType: "appointment",
    });

    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath("/dashboard/my-appointments");

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
}

// ==========================================
// MOCK DOCTOR ACTIONS for Testing Workflow
// ==========================================

export async function mockDoctorConfirm(appointmentId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "Confirmed", updated_at: new Date().toISOString() })
      .eq("id", appointmentId)
      .select("patient_id")
      .single();

    if (error || !data) throw error;

    await sendNotification({
      userId: data.patient_id,
      type: "Appointment",
      title: "Appointment Confirmed",
      message: "The doctor has confirmed your appointment.",
      referenceId: appointmentId,
      referenceType: "appointment",
    });

    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath("/dashboard/my-appointments");
    return { success: true };
  } catch (e) {
    return { error: "Failed to confirm" };
  }
}

export async function mockStartConsultation(appointmentId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "In Progress", updated_at: new Date().toISOString() })
      .eq("id", appointmentId)
      .select("patient_id")
      .single();

    if (error || !data) throw error;

    await sendNotification({
      userId: data.patient_id,
      type: "Appointment",
      title: "Consultation Started",
      message: "Your doctor has started the consultation.",
      referenceId: appointmentId,
      referenceType: "appointment",
    });

    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath("/dashboard/my-appointments");
    return { success: true };
  } catch (e) {
    return { error: "Failed to start" };
  }
}

export async function mockCompleteConsultation(appointmentId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "Completed", updated_at: new Date().toISOString() })
      .eq("id", appointmentId)
      .select("patient_id")
      .single();

    if (error || !data) throw error;

    await sendNotification({
      userId: data.patient_id,
      type: "Appointment",
      title: "Consultation Completed",
      message: "Your consultation has been marked as completed.",
      referenceId: appointmentId,
      referenceType: "appointment",
    });

    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath("/dashboard/my-appointments");
    return { success: true };
  } catch (e) {
    return { error: "Failed to complete" };
  }
}

export async function mockRejectAppointment(appointmentId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: "Rejected", updated_at: new Date().toISOString() })
      .eq("id", appointmentId)
      .select("patient_id")
      .single();

    if (error || !data) throw error;

    await sendNotification({
      userId: data.patient_id,
      type: "Appointment",
      title: "Appointment Rejected",
      message: "The doctor is unable to take your appointment at this time.",
      referenceId: appointmentId,
      referenceType: "appointment",
    });

    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath("/dashboard/my-appointments");
    return { success: true };
  } catch (e) {
    return { error: "Failed to reject" };
  }
}
