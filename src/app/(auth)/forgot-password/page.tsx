import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Nirogitanman",
  description: "Reset your Nirogitanman account password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
