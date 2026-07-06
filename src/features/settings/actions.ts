"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/routes";
import { getCachedAuthUser } from "@/features/auth/utils";
import { Database } from "@/lib/supabase/database.types";

type UserSettingsInsert = Database['public']['Tables']['user_settings']['Insert'];

export async function upsertUserSettings(data: Partial<UserSettingsInsert>) {
  try {
    const user = await getCachedAuthUser();
    if (!user) {
      return { error: "You must be logged in to update settings." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("user_settings").upsert({
      ...data,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id'
    });

    if (error) {
      console.error("Error updating settings:", error);
      return { error: "Failed to update settings. Please try again." };
    }

    revalidatePath("/dashboard/settings");

    return { success: true };
  } catch (err) {
    console.error("Unexpected error updating settings:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteAccount() {
  try {
    const user = await getCachedAuthUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    // Call Supabase admin to delete user, or handle via RPC if standard client can't.
    // For this demonstration, we'll return an error if we can't do it via client,
    // as typical Supabase client cannot delete users without a specific Edge Function or Admin token.
    return { error: "Account deletion must be performed by contacting support or via an admin API." };
    
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
}
