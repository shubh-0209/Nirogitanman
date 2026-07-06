"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { ExternalLink, LogOut } from "lucide-react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AccountTab() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success("Successfully logged out.");
      router.push("/");
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg bg-slate-50">
            <div>
              <p className="font-medium text-foreground">View and Edit Profile</p>
              <p className="text-sm text-muted-foreground mt-1">
                Update your name, contact information, and medical details in the unified profile view.
              </p>
            </div>
            <Link href={`${ROUTES.DASHBOARD}/profile`} className="shrink-0">
              <Button variant="outline" type="button">
                Go to Profile <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordForm />

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Session Management</CardTitle>
          <CardDescription>Manage your active session securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-100 bg-red-50/50 rounded-lg">
            <div>
              <h4 className="font-semibold text-foreground">Sign Out</h4>
              <p className="text-sm text-muted-foreground">
                Log out of your account on this device.
              </p>
            </div>
            <Button variant="destructive" onClick={handleLogout} className="shrink-0">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
