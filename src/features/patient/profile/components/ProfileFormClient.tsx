"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { patientProfileSchema, PatientProfileInput } from "@/features/patient/profile/schemas";

import { ProfileCard } from "@/features/patient/profile/components/ProfileCard";
import { InfoSection } from "@/features/patient/profile/components/InfoSection";
import { EditableField } from "@/features/patient/profile/components/EditableField";
import { ProfileAvatar } from "@/features/patient/profile/components/ProfileAvatar";
import { AvatarUpload } from "@/features/patient/profile/components/AvatarUpload";
import { VerificationBadge } from "@/features/patient/profile/components/VerificationBadge";
import { ProfileCompletionCard } from "@/features/patient/profile/components/ProfileCompletionCard";
import {
  MedicalInfoCard,
  EmergencyContactCard,
  InsuranceCard,
} from "@/features/patient/profile/components/ProfileCards";
import { createClient } from "@/lib/supabase/client";

interface ProfileFormClientProps {
  initialData: PatientProfileInput & { 
    patientId: string;
    profilePhotoUrl?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    memberSince?: string;
    accountCreated?: string;
    lastLogin?: string;
  };
}

export function ProfileFormClient({ initialData }: ProfileFormClientProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<PatientProfileInput>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: {
      ...initialData,
      // Ensure nulls from DB are converted to undefined or empty string for the form
      dateOfBirth: initialData.dateOfBirth || "",
      gender: initialData.gender as PatientProfileInput["gender"] || undefined,
      bloodGroup: initialData.bloodGroup as PatientProfileInput["bloodGroup"] || undefined,
      phoneNumber: initialData.phoneNumber || "",
      address: initialData.address || "",
      city: initialData.city || "",
      state: initialData.state || "",
      pinCode: initialData.pinCode || "",
      emergencyContactName: initialData.emergencyContactName || "",
      emergencyContactNumber: initialData.emergencyContactNumber || "",
      emergencyContactRelation: initialData.emergencyContactRelation || "",
      allergies: initialData.allergies || "",
      chronicConditions: initialData.chronicConditions || "",
      currentMedications: initialData.currentMedications || "",
      pastSurgeries: initialData.pastSurgeries || "",
      height: initialData.height ? Number(initialData.height) : undefined,
      weight: initialData.weight ? Number(initialData.weight) : undefined,
      bmi: initialData.bmi?.toString() || "",
      organDonor: initialData.organDonor || false,
      insuranceProvider: initialData.insuranceProvider || "",
      policyNumber: initialData.policyNumber || "",
      insuranceExpiry: initialData.insuranceExpiry || "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const heightVal = form.watch("height");
  const weightVal = form.watch("weight");

  React.useEffect(() => {
    if (isEditing && heightVal && weightVal) {
      const heightInMeters = Number(heightVal) / 100;
      const weightInKg = Number(weightVal);
      if (heightInMeters > 0 && weightInKg > 0) {
        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        form.setValue("bmi", bmi);
      }
    }
  }, [heightVal, weightVal, isEditing, form]);

  const onSubmit = (data: PatientProfileInput) => {
    startTransition(async () => {
      try {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: initialData.patientId,
            full_name: data.fullName,
            date_of_birth: data.dateOfBirth || null,
            gender: data.gender || null,
            blood_group: data.bloodGroup || null,
            phone: data.phoneNumber || null,
            address_line1: data.address || null,
            city: data.city || null,
            state: data.state || null,
            postal_code: data.pinCode || null,
            emergency_contact_name: data.emergencyContactName || null,
            emergency_contact_phone: data.emergencyContactNumber || null,
            emergency_contact_relationship: data.emergencyContactRelation || null,
            allergies: data.allergies || null,
            chronic_conditions: data.chronicConditions || null,
            current_medications: data.currentMedications || null,
            height_cm: data.height ? Number(data.height) : null,
            weight_kg: data.weight ? Number(data.weight) : null,
            profile_completed: true,
          });
          
        if (error) throw error;
        
        toast.success("Profile updated successfully");
        setIsEditing(false);
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to update profile");
        }
      }
    });
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  // Dynamic Profile Completion logic
  const calculateCompletion = () => {
    const fieldsToTrack = [
      { key: "fullName", name: "Full Name", value: initialData.fullName },
      { key: "phoneNumber", name: "Mobile Number", value: initialData.phoneNumber },
      { key: "dateOfBirth", name: "Date of Birth", value: initialData.dateOfBirth },
      { key: "gender", name: "Gender", value: initialData.gender },
      { key: "bloodGroup", name: "Blood Group", value: initialData.bloodGroup },
      { key: "address", name: "Address", value: initialData.address },
      { key: "emergencyContactName", name: "Emergency Contact", value: initialData.emergencyContactName },
      { key: "avatar", name: "Profile Picture", value: initialData.profilePhotoUrl }
    ];

    const completedFields = fieldsToTrack.filter(f => f.value && f.value !== "");
    const completionPercentage = Math.round((completedFields.length / fieldsToTrack.length) * 100);
    const missingFields = fieldsToTrack.filter(f => !f.value || f.value === "").map(f => f.name);

    return { completionPercentage, missingFields };
  };

  const { completionPercentage, missingFields } = calculateCompletion();

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal and medical information.</p>
        </div>
        <div className="flex gap-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isPending}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Header / Avatar Card */}
            <div className="lg:col-span-2">
              <ProfileCard className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8">
                {isEditing ? (
                  <AvatarUpload
                    uid={initialData.patientId}
                    url={initialData.profilePhotoUrl}
                    name={form.watch("fullName") || "User"}
                    onUploadComplete={() => router.refresh()}
                  />
                ) : (
                  <ProfileAvatar 
                    name={form.watch("fullName") || "User"} 
                    url={initialData.profilePhotoUrl}
                    size="xl" 
                  />
                )}
                <div className="space-y-3 flex-1">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{form.watch("fullName") || "Not Provided"}</h2>
                    <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                      ID: {initialData.patientId.split("-")[0].toUpperCase()} • Member since {initialData.memberSince}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <VerificationBadge isVerified={initialData.emailVerified} label="Email Verified" />
                    <VerificationBadge isVerified={initialData.phoneVerified} label="Phone Verified" />
                  </div>
                </div>
              </ProfileCard>
            </div>

            {/* Profile Completion */}
            <div className="lg:col-span-1">
              <ProfileCompletionCard 
                completionPercentage={completionPercentage} 
                missingFields={missingFields}
                onCompleteClick={() => setIsEditing(true)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProfileCard title="Personal Information">
              <InfoSection columns={2}>
                <EditableField name="fullName" label="Full Name" isEditing={isEditing} />
                <EditableField name="dateOfBirth" label="Date of Birth" isEditing={isEditing} inputType="date" />
                <EditableField 
                  name="gender" 
                  label="Gender" 
                  isEditing={isEditing} 
                  inputType="select"
                  options={[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                    { label: "Other", value: "OTHER" },
                    { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" }
                  ]}
                />
                <EditableField name="aadhaar" label="Aadhaar Number" isEditing={isEditing} />
              </InfoSection>
            </ProfileCard>

            <ProfileCard title="Contact & Address">
              <InfoSection columns={2}>
                <EditableField name="phoneNumber" label="Mobile Number" isEditing={isEditing} type="tel" />
                <EditableField name="email" label="Email Address" isEditing={isEditing} type="email" />
                <EditableField name="address" label="Address" isEditing={isEditing} />
                <EditableField name="city" label="City" isEditing={isEditing} />
                <EditableField name="state" label="State" isEditing={isEditing} />
                <EditableField name="pinCode" label="PIN Code" isEditing={isEditing} />
              </InfoSection>
            </ProfileCard>
          </div>

          <MedicalInfoCard isEditing={isEditing} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmergencyContactCard isEditing={isEditing} />
            <InsuranceCard isEditing={isEditing} />
          </div>

          <ProfileCard title="Account Information" className="bg-muted/30 border-dashed">
            <InfoSection columns={3}>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">Account Created</p>
                <p className="text-sm font-medium text-foreground">{initialData.accountCreated}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">Last Login</p>
                <p className="text-sm font-medium text-foreground">{initialData.lastLogin}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">Patient ID</p>
                <p className="text-sm font-medium text-foreground">{initialData.patientId}</p>
              </div>
            </InfoSection>
          </ProfileCard>
          
        </form>
      </Form>
    </div>
  );
}
