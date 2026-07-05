"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientProfileSchema, PatientProfileInput } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormProps {
  initialData?: Partial<PatientProfileInput>;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<PatientProfileInput>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: initialData || {
      fullName: "",
    },
  });

  const genderValue = watch("gender");
  const bloodGroupValue = watch("bloodGroup");

  const onSubmit = () => {
    startTransition(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader 
        title="My Profile" 
        description="Manage your personal information and medical preferences."
        action={
          <Button type="submit" disabled={!isDirty || isPending}>
            {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard title="Personal Information">
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={genderValue} onValueChange={(val: string | null) => setValue("gender", val as "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY", { shouldDirty: true })}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Contact Information">
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" {...register("phoneNumber")} placeholder="+1 (555) 000-0000" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" {...register("address")} rows={3} placeholder="Enter your full address" />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Emergency Contact">
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Contact Name</Label>
              <Input id="emergencyContactName" {...register("emergencyContactName")} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactNumber">Phone Number</Label>
                <Input id="emergencyContactNumber" type="tel" {...register("emergencyContactNumber")} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelation">Relationship</Label>
                <Input id="emergencyContactRelation" {...register("emergencyContactRelation")} placeholder="e.g. Spouse, Parent" />
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Medical Information">
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select value={bloodGroupValue} onValueChange={(val: string | null) => setValue("bloodGroup", val as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-", { shouldDirty: true })}>
                <SelectTrigger id="bloodGroup">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea id="allergies" {...register("allergies")} rows={2} placeholder="List any known allergies" />
            </div>
          </div>
        </DashboardCard>
      </div>
    </form>
  );
}
