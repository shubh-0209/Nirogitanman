import { createClient } from "@/lib/supabase/server";
import { getCachedAuthUser } from "@/features/auth/utils";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { NotificationsClient } from "@/features/patient/notifications/components/NotificationsClient";

export const metadata = {
  title: "Notifications | Nirogitanman",
  description: "View and manage your notifications.",
};

export default async function NotificationsPage() {
  const user = await getCachedAuthUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const supabase = await createClient();

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error);
  }

  return (
    <div className="p-4 md:p-8 pt-6">
      <NotificationsClient 
        initialNotifications={notifications || []} 
        userId={user.id} 
      />
    </div>
  );
}
