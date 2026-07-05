"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { headers } from "next/headers";
import { 
  loginSchema, LoginInput, 
  registerSchema, RegisterInput,
  forgotPasswordSchema, ForgotPasswordInput,
  resetPasswordSchema, ResetPasswordInput
} from "../validation";

export async function loginUser(data: LoginInput) {
  const parsed = loginSchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(ROUTES.LOGIN); // Middleware handles redirection to proper dashboard
}

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const supabase = await createClient();
  const headerList = await headers();
  const origin = headerList.get("origin") || "";
  
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/verify-email");
}

export async function loginWithGoogle() {
  const supabase = await createClient();
  const headerList = await headers();
  const origin = headerList.get("origin") || "";
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }
}

export async function signOutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(ROUTES.HOME);
}

export async function resetPasswordRequest(data: ForgotPasswordInput) {
  const parsed = forgotPasswordSchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const supabase = await createClient();
  const headerList = await headers();
  const origin = headerList.get("origin") || "";

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function updatePassword(data: ResetPasswordInput) {
  const parsed = resetPasswordSchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(ROUTES.LOGIN);
}
