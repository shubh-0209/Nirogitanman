import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { MedicalRecordsClient } from "@/features/patient/medical-records/components/MedicalRecordsClient";

export const metadata = {
  title: "Medical Records | Nirogitanman",
  description: "View and manage your medical records securely.",
};

export default async function MedicalRecordsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  // Fetch initial records for the user
  const { data: records, error } = await supabase
    .from("medical_records")
    .select("*")
    .eq("patient_id", user.id)
    .order("visit_date", { ascending: false });

  if (error) {
    console.error("Error fetching medical records:", error);
  }

  return (
    <MedicalRecordsClient 
      patientId={user.id} 
      initialRecords={records || []} 
    />
  );
}
