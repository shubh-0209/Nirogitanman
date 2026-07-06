import { createClient } from "@/lib/supabase/server";
import { ROLES } from "@/config/constants";
import { cache } from "react";
import { Database } from "@/lib/supabase/database.types";

export type Role = typeof ROLES[keyof typeof ROLES];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const getCachedAuthUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
});

export const getCachedProfile = cache(async (userId: string): Promise<Profile | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  
  if (error || !data) return null;
  return data;
});

export async function getUserRole(): Promise<Role | null> {
  const supabase = await createClient();
  const user = await getCachedAuthUser();

  if (!user) {
    console.log("[getUserRole] No authenticated user found");
    return null;
  }

  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  // For MVP, we treat every authenticated user as a PATIENT, even if the query fails or no role is found.
  if (roleError || !roleData) {
    console.log("[getUserRole] Fallback to PATIENT role for user", user.id);
    return ROLES.PATIENT;
  }

  return roleData.role as Role || ROLES.PATIENT;
}

export async function requireRole(allowedRoles: Role[]) {
  const role = await getUserRole();
  if (!role || !allowedRoles.includes(role)) {
    throw new Error("Unauthorized");
  }
  return role;
}
