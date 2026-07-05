import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { ChangePasswordForm } from "@/features/settings/components/ChangePasswordForm";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { InfoRow } from "@/components/dashboard/InfoRow";
import { createClient } from "@/lib/supabase/server";

export default async function PatientSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader 
        title="Settings" 
        description="Manage your account settings and preferences."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <ChangePasswordForm />
        </div>
        
        <div className="space-y-6">
          <DashboardCard title="Session Information" description="Details about your current session.">
            <div className="pt-4">
              <InfoRow label="Email Address" value={user?.email} />
              <InfoRow label="Account ID" value={user?.id} />
              <InfoRow label="Last Sign In" value={user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Unknown"} className="border-0" />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
