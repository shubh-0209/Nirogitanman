import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { AppointmentsClient } from "@/features/patient/appointments/components/AppointmentsClient";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export const metadata = {
  title: "My Appointments - Nirogitanman",
  description: "Manage your doctor appointments.",
};

export default async function MyAppointmentsPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  // Fetch the user's appointments with joined doctor info
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select(`
      *,
      doctors (
        id,
        full_name,
        specialization,
        clinic_name,
        profile_photo
      )
    `)
    .eq('patient_id', user.id)
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true });

  if (error) {
    console.error("Error fetching appointments:", error);
  }

  return <AppointmentsClient patientId={user.id} initialAppointments={appointments || []} />;
}
