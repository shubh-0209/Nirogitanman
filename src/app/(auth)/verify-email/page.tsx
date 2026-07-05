import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center space-y-6">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-blue-500" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Verify your email</h2>
        <p className="text-slate-600">
          We&apos;ve sent a verification link to your email address. Please click the link to activate your account and access the dashboard.
        </p>
      </div>
      <div className="pt-4">
        <Link href={ROUTES.LOGIN} className="block">
          <Button variant="outline" className="w-full h-11">
            Back to login
          </Button>
        </Link>
      </div>
    </div>
  );
}
