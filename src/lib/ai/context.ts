import { createClient } from "@/lib/supabase/server";
import { getCachedAuthUser, getCachedProfile } from "@/features/auth/utils";

export async function getPatientContextString() {
  const user = await getCachedAuthUser();
  if (!user) return null;

  const profile = await getCachedProfile(user.id);
  const supabase = await createClient();

  // Fetch recent active prescriptions
  const { data: prescriptions } = await supabase
    .from("prescriptions")
    .select("*")
    .eq("patient_id", user.id)
    .eq("is_active", true);

  // Fetch upcoming appointments
  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", user.id)
    .gte("appointment_date", new Date().toISOString().split('T')[0])
    .order("appointment_date", { ascending: true })
    .limit(3);

  // Format the context
  let contextString = `### PATIENT CONTEXT ###\n`;
  if (profile) {
    contextString += `Patient Name: ${profile.full_name}\n`;
    if (profile.gender) contextString += `Gender: ${profile.gender}\n`;
    if (profile.date_of_birth) contextString += `DOB: ${profile.date_of_birth}\n`;
    if (profile.blood_group) contextString += `Blood Group: ${profile.blood_group}\n`;
    if (profile.height_cm) contextString += `Height: ${profile.height_cm} cm\n`;
    if (profile.weight_kg) contextString += `Weight: ${profile.weight_kg} kg\n`;
    if (profile.allergies) contextString += `Allergies: ${profile.allergies}\n`;
    if (profile.chronic_conditions) contextString += `Chronic Conditions: ${profile.chronic_conditions}\n`;
  }

  if (prescriptions && prescriptions.length > 0) {
    contextString += `\nActive Prescriptions:\n`;
    prescriptions.forEach(p => {
      contextString += `- ${p.medication_name}: ${p.dosage}, ${p.frequency}\n`;
    });
  }

  if (appointments && appointments.length > 0) {
    contextString += `\nUpcoming Appointments:\n`;
    appointments.forEach(a => {
      contextString += `- ${a.department} on ${a.appointment_date} at ${a.appointment_time}\n`;
    });
  }

  contextString += `\nNote to AI: Use this information solely to personalize explanations. Do NOT assume this is a complete medical history.`;

  return contextString;
}
