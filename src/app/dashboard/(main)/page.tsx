import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { DashboardContentWrapper } from "@/features/patient/dashboard/components/DashboardContentWrapper";
import { getCachedAuthUser, getCachedProfile } from "@/features/auth/utils";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Dashboard Overview | Nirogitanman",
  description: "Your personalized patient dashboard overview.",
};

function DashboardSkeleton() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-primary/50 mb-4" />
      <p className="text-gray-500 text-sm animate-pulse">Loading your dashboard...</p>
    </div>
  );
}

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

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContentWrapper 
        userId={user.id} 
        profile={profile} 
        showNotifications={showNotifications} 
      />
    </Suspense>
  );
}
