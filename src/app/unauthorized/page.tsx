import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { getUserRole } from "@/features/auth/utils";

export default async function UnauthorizedPage() {
  const role = await getUserRole();
  
  let backLink: string = ROUTES.HOME;
  let backText = "Return Home";

  if (role === "PATIENT") {
    backLink = ROUTES.DASHBOARD.PATIENT;
    backText = "Back to Dashboard";
  } else if (role === "DOCTOR") {
    backLink = ROUTES.DASHBOARD.DOCTOR;
    backText = "Back to Dashboard";
  } else if (role === "ADMIN") {
    backLink = ROUTES.DASHBOARD.ADMIN;
    backText = "Back to Dashboard";
  } else if (!role) {
    backLink = ROUTES.LOGIN;
    backText = "Sign In";
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
          <p className="text-slate-600">
            You do not have permission to view this page. If you believe this is an error, please contact support.
          </p>
        </div>
        <div className="pt-4">
          <Link href={backLink} className="block">
            <Button className="w-full h-11">
              {backText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
