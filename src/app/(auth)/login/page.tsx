import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Nirogitanman",
  description: "Sign in to your Nirogitanman account",
};

export default function LoginPage() {
  return <LoginForm />;
}
