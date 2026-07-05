import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Nirogitanman",
  description: "Start your wellness journey today",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
