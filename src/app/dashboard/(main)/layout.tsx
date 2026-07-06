import { getUserRole, getCachedAuthUser, getCachedProfile } from "@/features/auth/utils";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCachedAuthUser();

  if (!user) {
    redirect("/login");
  }

  const role = await getUserRole();
  const profile = await getCachedProfile(user.id);

  // All authenticated users are currently defaulted to Patient in MVP.
  console.log("PatientDashboardLayout rendered. User:", user.email);

  return (
    <DashboardShell
      userRole={role || "PATIENT"}
      userEmail={user.email || ""}
      userName={profile?.full_name || "Complete your profile"}
      userId={user.id}
    >
      {children}
    </DashboardShell>
  );
}
