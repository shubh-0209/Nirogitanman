import { getUserRole } from "@/features/auth/utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { NAVIGATION } from "@/config/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getUserRole();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!role || !user) {
    redirect("/login");
  }

  let sidebarLinks = NAVIGATION.PATIENT_SIDEBAR;
  if (role === "DOCTOR") sidebarLinks = NAVIGATION.DOCTOR_SIDEBAR;
  if (role === "ADMIN") sidebarLinks = NAVIGATION.ADMIN_SIDEBAR;

  return (
    <DashboardShell
      userRole={role}
      userEmail={user.email || ""}
      userName={user.user_metadata?.full_name || "User"}
      sidebarLinks={sidebarLinks}
    >
      {children}
    </DashboardShell>
  );
}
