import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { getCachedAuthUser, getCachedProfile } from "@/features/auth/utils";
import { SettingsClient } from "@/features/settings/components/SettingsClient";

export const metadata = {
  title: "Settings | Nirogitanman",
  description: "Manage your account settings and preferences.",
};

export default async function SettingsPage() {
  const user = await getCachedAuthUser();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const profile = await getCachedProfile(user.id);
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const defaultSettings = {
    user_id: user.id,
    dashboard_notifications: true,
    theme_preference: "system",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <SettingsClient
      settings={settings || defaultSettings}
    />
  );
}
