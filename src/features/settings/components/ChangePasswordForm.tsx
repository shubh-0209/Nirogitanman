"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Loader2, Key } from "lucide-react";
import { toast } from "sonner";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = () => {
    startTransition(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Password changed successfully");
      reset();
    });
  };

  return (
    <DashboardCard 
      title="Change Password" 
      description="Update your password to keep your account secure."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" type="password" {...register("currentPassword")} />
          {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" {...register("newPassword")} />
          {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        
        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Key className="h-4 w-4 mr-2" />}
          Update Password
        </Button>
      </form>
    </DashboardCard>
  );
}
