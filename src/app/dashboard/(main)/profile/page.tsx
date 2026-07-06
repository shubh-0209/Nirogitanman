import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { ProfileFormClient } from "@/features/patient/profile/components/ProfileFormClient";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  // Get the current user session
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Not authenticated</p>
      </div>
    );
  }

  // Fetch the user's profile from the newly created profiles table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching profile:", error);
  }

  // Generate signed URL if avatar path exists
  let avatarUrl = "";
  if (profile?.avatar_url) {
    const { data: signedUrlData } = await supabase.storage
      .from('avatars')
      .createSignedUrl(profile.avatar_url, 3600); // 1 hour expiry
    
    if (signedUrlData?.signedUrl) {
      avatarUrl = signedUrlData.signedUrl;
    }
  }

  // Map database row to component initialData
  const initialData = {
    patientId: user.id,
    fullName: profile?.full_name || "",
    dateOfBirth: profile?.date_of_birth || "",
    gender: profile?.gender || "",
    bloodGroup: profile?.blood_group || "",
    phoneNumber: profile?.phone || "",
    email: profile?.email || user.email || "",
    address: profile?.address_line1 || "",
    city: profile?.city || "",
    state: profile?.state || "",
    pinCode: profile?.postal_code || "",
    emergencyContactName: profile?.emergency_contact_name || "",
    emergencyContactNumber: profile?.emergency_contact_phone || "",
    emergencyContactRelation: profile?.emergency_contact_relationship || "",
    allergies: profile?.allergies || "",
    chronicConditions: profile?.chronic_conditions || "",
    currentMedications: profile?.current_medications || "",
    pastSurgeries: "", // Assuming no DB column for past surgeries yet
    height: profile?.height_cm?.toString() || "",
    weight: profile?.weight_kg?.toString() || "",
    bmi: "", // calculated dynamically on the client
    organDonor: false,
    insuranceProvider: "",
    policyNumber: "",
    insuranceExpiry: "",
    
    // Additional view-only data
    profilePhotoUrl: avatarUrl,
    emailVerified: user.email_confirmed_at ? true : false,
    phoneVerified: user.phone_confirmed_at ? true : false,
    memberSince: new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    accountCreated: new Date(user.created_at).toLocaleDateString(),
    lastLogin: user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "Never",
  };

  return <ProfileFormClient initialData={initialData} />;
}
