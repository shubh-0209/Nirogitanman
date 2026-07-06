import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { DashboardClient } from "@/features/patient/dashboard/components/DashboardClient";
import { getCachedAuthUser, getCachedProfile } from "@/features/auth/utils";

export const metadata = {
  title: "Dashboard Overview | Nirogitanman",
  description: "Your personalized patient dashboard overview.",
};

export default async function DashboardPage() {
  const user = await getCachedAuthUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const profile = await getCachedProfile(user.id);
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("user_settings")
    .select("dashboard_notifications")
    .eq("user_id", user.id)
    .single();

  const showNotifications = settings?.dashboard_notifications ?? true;

  // Fetch all dashboard data in parallel
  const [
    { count: upcomingCount, data: nextAppointment },
    { count: prescriptionsCount, data: prescriptions },
    { count: recordsCount, data: recentRecords },
    notificationsResponse,
    { data: activeReminders },
    { data: todayLogs }
  ] = await Promise.all([

    // Upcoming appointments count & nearest appointment
    supabase.from("appointments")
      .select("*", { count: "exact" })
      .eq("patient_id", user.id)
      .gte("appointment_date", new Date().toISOString().split('T')[0])
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true }),
      
    // Active prescriptions
    supabase.from("prescriptions")
      .select("*", { count: "exact" })
      .eq("patient_id", user.id)
      .eq("is_active", true)
      .order("start_date", { ascending: false }),

    // Medical records (recent 5)
    supabase.from("medical_records")
      .select("*", { count: "exact" })
      .eq("patient_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),

    // Unread notifications (only if enabled)
    showNotifications ? supabase.from("notifications")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .eq("is_read", false)
      .order("created_at", { ascending: false })
    : Promise.resolve({ count: 0, data: [] }),

    // Active Medicine Reminders
    supabase.from("medicine_reminders")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "Active"),

    // Today's Adherence Logs
    supabase.from("medicine_adherence_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("scheduled_date", new Date().toISOString().split('T')[0])
  ]);

  return (
    <DashboardClient 
      patientId={user.id}
      profile={profile}
      counts={{
        appointments: upcomingCount || 0,
        prescriptions: prescriptionsCount || 0,
        records: recordsCount || 0,
        notifications: notificationsResponse.count || 0
      }}
      nextAppointment={nextAppointment?.[0] || null}
      recentRecords={recentRecords || []}
      prescriptions={prescriptions || []}
      notifications={notificationsResponse.data || []}
      activeReminders={activeReminders || []}
      todayLogs={todayLogs || []}
    />
  );
}
