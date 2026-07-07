"use server";

import { createClient } from "@/lib/supabase/server";
import { getCachedAuthUser } from "@/features/auth/utils";

export async function getConversations() {
  const user = await getCachedAuthUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("ai_conversations")
    .select("id, title, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getMessages(conversationId: string) {
  const user = await getCachedAuthUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data: conv } = await supabase
    .from("ai_conversations")
    .select("id")
    .eq("id", conversationId)
    .eq("user_id", user.id)
    .single();

  if (!conv) return [];

  const { data } = await supabase
    .from("ai_messages")
    .select("id, role, content, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  return data || [];
}

export async function deleteConversation(conversationId: string) {
  const user = await getCachedAuthUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  await supabase
    .from("ai_conversations")
    .delete()
    .eq("id", conversationId)
    .eq("user_id", user.id);
}

export async function renameConversation(conversationId: string, title: string) {
  const user = await getCachedAuthUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  await supabase
    .from("ai_conversations")
    .update({ title })
    .eq("id", conversationId)
    .eq("user_id", user.id);
}
