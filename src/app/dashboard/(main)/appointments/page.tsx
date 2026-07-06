import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { AppointmentsClient } from "@/features/patient/appointments/components/AppointmentsClient";

export default async function AppointmentsPage() {
  const supabase = await createClient();
  
  // Get the current user session
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Not authenticated</p>
      </div>
    );
  }

  // Fetch the user's appointments
  // Order by date ascending so upcoming ones show closest first
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('patient_id', user.id)
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true });

  if (error) {
    console.error("Error fetching appointments:", error);
  }

  return <AppointmentsClient patientId={user.id} appointments={appointments || []} />;
}
