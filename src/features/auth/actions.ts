"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { 
  loginSchema, 
  registerSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema,
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput
} from "./schemas";
import { logAuthEvent } from "./events";
import { ROUTES } from "@/config/routes";
import { headers } from "next/headers";

export async function login(input: LoginInput) {
  const result = loginSchema.safeParse(input);
  if (!result.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  // Check if email is verified
  if (!data.user?.email_confirmed_at) {
    await supabase.auth.signOut();
    return { error: "Please verify your email address before logging in." };
  }

  const headerStore = await headers();
  await logAuthEvent("LOGIN", {
    userId: data.user.id,
    email: data.user.email,
    userAgent: headerStore.get("user-agent") || undefined,
  });

  revalidatePath("/", "layout");
  redirect(ROUTES.HOME); // Middleware will redirect to appropriate dashboard
}

export async function register(input: RegisterInput) {
  const result = registerSchema.safeParse(input);
  if (!result.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  
  // Get origin for email redirect URL
  const headerStore = await headers();
  const origin = headerStore.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.fullName,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    await logAuthEvent("REGISTER", {
      userId: data.user.id,
      email: data.user.email,
      userAgent: headerStore.get("user-agent") || undefined,
    });
  }

  // Redirect to verify-email page
  redirect("/verify-email");
}

export async function logout() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    const headerStore = await headers();
    await logAuthEvent("LOGOUT", {
      userId: user.id,
      email: user.email,
      userAgent: headerStore.get("user-agent") || undefined,
    });
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(ROUTES.LOGIN);
}

export async function resetPasswordForEmail(input: ForgotPasswordInput) {
  const result = forgotPasswordSchema.safeParse(input);
  if (!result.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  
  const headerStore = await headers();
  const origin = headerStore.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  await logAuthEvent("PASSWORD_RESET_REQUEST", {
    email: result.data.email,
    userAgent: headerStore.get("user-agent") || undefined,
  });

  return { success: true };
}

export async function updatePassword(input: ResetPasswordInput) {
  const result = resetPasswordSchema.safeParse(input);
  if (!result.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    password: result.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const headerStore = await headers();
    await logAuthEvent("PASSWORD_RESET_SUCCESS", {
      userId: data.user.id,
      email: data.user.email,
      userAgent: headerStore.get("user-agent") || undefined,
    });
  }

  redirect(ROUTES.LOGIN);
}
