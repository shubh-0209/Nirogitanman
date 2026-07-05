import { createClient } from "@/lib/supabase/server";
import { ROLES } from "@/config/constants";

export type Role = typeof ROLES[keyof typeof ROLES];

export async function getUserRole(): Promise<Role | null> {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleError) return null;

  return roleData.role as Role;
}

export async function requireRole(allowedRoles: Role[]) {
  const role = await getUserRole();
  if (!role || !allowedRoles.includes(role)) {
    throw new Error("Unauthorized");
  }
  return role;
}
