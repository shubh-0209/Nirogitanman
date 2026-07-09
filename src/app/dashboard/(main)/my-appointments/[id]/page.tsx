import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { AppointmentDetails } from "@/features/patient/appointments/components/AppointmentDetails";

export const metadata = {
  title: "Appointment Details - Nirogitanman",
  description: "View details of your appointment.",
};

export default async function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const { data: appointment, error } = await supabase
    .from('appointments')
    .select(`
      *,
      doctors (
        id,
        full_name,
        specialization,
        clinic_name,
        profile_photo,
        city,
        languages
      )
    `)
    .eq('id', params.id)
    .eq('patient_id', user.id)
    .single();

  if (error || !appointment) {
    console.error("Error fetching appointment details:", error);
    notFound();
  }
  
  // Optionally fetch lab reports for the patient to simulate attached reports
  const { data: labReports } = await supabase
    .from('lab_reports')
    .select('*')
    .eq('user_id', user.id)
    .order('report_date', { ascending: false })
    .limit(3);

  return <AppointmentDetails appointment={appointment} labReports={labReports || []} />;
}
