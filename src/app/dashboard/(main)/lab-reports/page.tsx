import { redirect } from "next/navigation";
import { getCachedAuthUser } from "@/features/auth/utils";
import { createClient } from "@/lib/supabase/server";
import { LabReportsClient } from "@/features/patient/lab-reports/components/LabReportsClient";

export const metadata = {
  title: "Lab Reports | Nirogitanman",
  description: "View and manage your medical laboratory reports.",
};

export default async function LabReportsPage() {
  const user = await getCachedAuthUser();
  
  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: reports, error } = await supabase
    .from("lab_reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching lab reports:", error);
  }

  return (
    <LabReportsClient 
      initialReports={reports || []} 
      userId={user.id} 
    />
  );
}
