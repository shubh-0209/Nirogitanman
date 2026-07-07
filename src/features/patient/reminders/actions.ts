"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sendNotification } from "@/features/patient/notifications/actions";

export async function createReminder(data: {
  medicine_name: string;
  dosage: string;
  frequency: string;
  reminder_times: string[];
  start_date: string;
  end_date?: string;
  instructions?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase.from("medicine_reminders").insert({
    user_id: user.id,
    medicine_name: data.medicine_name,
    dosage: data.dosage,
    frequency: data.frequency,
    reminder_times: data.reminder_times,
    start_date: data.start_date,
    end_date: data.end_date || null,
    instructions: data.instructions || null,
    status: "Active",
  });

  if (error) {
    console.error("Error creating reminder:", error);
    throw new Error("Failed to create reminder");
  }

  await sendNotification({
    userId: user.id,
    type: "Medicine Reminder",
    title: "New Medicine Reminder",
    message: `Reminder scheduled for ${data.medicine_name}.`,
  });

  revalidatePath("/dashboard/medicine-reminders");
  revalidatePath("/dashboard");
}

export async function updateReminder(
  id: string,
  data: {
    medicine_name: string;
    dosage: string;
    frequency: string;
    reminder_times: string[];
    start_date: string;
    end_date?: string;
    instructions?: string;
  }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("medicine_reminders")
    .update({
      medicine_name: data.medicine_name,
      dosage: data.dosage,
      frequency: data.frequency,
      reminder_times: data.reminder_times,
      start_date: data.start_date,
      end_date: data.end_date || null,
      instructions: data.instructions || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating reminder:", error);
    throw new Error("Failed to update reminder");
  }

  revalidatePath("/dashboard/medicine-reminders");
  revalidatePath("/dashboard");
}

export async function deleteReminder(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("medicine_reminders")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting reminder:", error);
    throw new Error("Failed to delete reminder");
  }

  revalidatePath("/dashboard/medicine-reminders");
  revalidatePath("/dashboard");
}

export async function updateReminderStatus(
  id: string,
  status: "Active" | "Paused" | "Completed"
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("medicine_reminders")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating reminder status:", error);
    throw new Error("Failed to update reminder status");
  }

  revalidatePath("/dashboard/medicine-reminders");
  revalidatePath("/dashboard");
}

export async function recordAdherence(
  reminder_id: string,
  scheduled_date: string,
  scheduled_time: string,
  status: "Taken" | "Skipped" | "Missed"
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if a record already exists for this reminder + date + time
  const { data: existing } = await supabase
    .from("medicine_adherence_logs")
    .select("id")
    .eq("reminder_id", reminder_id)
    .eq("scheduled_date", scheduled_date)
    .eq("scheduled_time", scheduled_time)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    // Update
    const { error } = await supabase
      .from("medicine_adherence_logs")
      .update({ status, recorded_at: new Date().toISOString() })
      .eq("id", existing.id);

    if (error) throw new Error("Failed to update adherence log");
  } else {
    // Insert
    const { error } = await supabase.from("medicine_adherence_logs").insert({
      reminder_id,
      user_id: user.id,
      scheduled_date,
      scheduled_time,
      status,
      recorded_at: new Date().toISOString(),
    });

    if (error) throw new Error("Failed to create adherence log");
  }

  await sendNotification({
    userId: user.id,
    type: "Medicine Reminder",
    title: "Adherence Logged",
    message: `You marked your medicine as ${status}.`,
  });

  revalidatePath("/dashboard/medicine-reminders");
  revalidatePath("/dashboard");
}
