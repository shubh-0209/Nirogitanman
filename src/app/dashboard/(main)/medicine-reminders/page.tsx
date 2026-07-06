import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MedicineRemindersClient } from "@/features/patient/reminders/components/MedicineRemindersClient";

export const metadata = {
  title: "Medicine Reminders - Patient Portal",
  description: "Manage and track your medicine reminders.",
};

export default async function MedicineRemindersPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Fetch reminders
  const { data: reminders, error: remindersError } = await supabase
    .from("medicine_reminders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (remindersError) {
    console.error("Error fetching reminders:", remindersError);
  }

  // Fetch adherence logs
  const { data: logs, error: logsError } = await supabase
    .from("medicine_adherence_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("scheduled_date", { ascending: false });

  if (logsError) {
    console.error("Error fetching logs:", logsError);
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <MedicineRemindersClient
        reminders={reminders || []}
        logs={logs || []}
      />
    </div>
  );
}
