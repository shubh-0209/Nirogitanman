import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Nirogitanman",
  description: "Create a new password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
