import { ProfileForm } from "@/features/patient/components/ProfileForm";
import { createClient } from "@/lib/supabase/server";

export default async function PatientProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const initialData = {
    fullName: user?.user_metadata?.full_name || "",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileForm initialData={initialData} />
    </div>
  );
}
