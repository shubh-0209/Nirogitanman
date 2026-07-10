import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";

interface DashboardContentWrapperProps {
  userId: string;
  profile: any;
  showNotifications: boolean;
}

export async function DashboardContentWrapper({ userId, profile, showNotifications }: DashboardContentWrapperProps) {
  const supabase = await createClient();

  // Fetch all dashboard data in parallel
  const [
    { count: upcomingCount, data: nextAppointment },
    { count: prescriptionsCount, data: prescriptions },
    { count: labReportsCount, data: recentLabReports },
    notificationsResponse,
    { data: activeReminders },
    { data: todayLogs },
    { data: recentConsultationData }
  ] = await Promise.all([
    supabase.from("appointments")
      .select("*, doctors(id, full_name, specialization, clinic_name, profile_photo)", { count: "exact" })
      .eq("patient_id", userId)
      .in("status", ["Scheduled", "Rescheduled", "Pending Confirmation", "Pending", "Confirmed", "In Progress"])
      .gte("appointment_date", new Date().toISOString().split('T')[0])
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true }),
      
    supabase.from("prescriptions")
      .select("*", { count: "exact" })
      .eq("patient_id", userId)
      .eq("is_active", true)
      .order("start_date", { ascending: false }),

    supabase.from("lab_reports")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),

    showNotifications ? supabase.from("notifications")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .eq("is_read", false)
      .order("created_at", { ascending: false })
    : Promise.resolve({ count: 0, data: [] }),

    supabase.from("medicine_reminders")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "Active"),

    supabase.from("medicine_adherence_logs")
      .select("*")
      .eq("user_id", userId)
      .eq("scheduled_date", new Date().toISOString().split('T')[0]),
      
    supabase.from("appointments")
      .select("*, doctors(id, full_name, specialization, clinic_name, profile_photo)")
      .eq("patient_id", userId)
      .eq("status", "Completed")
      .order("appointment_date", { ascending: false })
      .limit(1)
  ]);

  return (
    <DashboardClient 
      patientId={userId}
      profile={profile}
      counts={{
        appointments: upcomingCount || 0,
        prescriptions: prescriptionsCount || 0,
        labReports: labReportsCount || 0,
        notifications: notificationsResponse.count || 0
      }}
      nextAppointment={nextAppointment?.[0] || null}
      recentLabReports={recentLabReports || []}
      prescriptions={prescriptions || []}
      notifications={notificationsResponse.data || []}
      activeReminders={activeReminders || []}
      todayLogs={todayLogs || []}
      recentConsultation={recentConsultationData?.[0] || null}
    />
  );
}
