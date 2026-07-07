"use server";

import { createClient } from "@/lib/supabase/server";
import { getCachedAuthUser } from "@/features/auth/utils";
import { revalidatePath } from "next/cache";

export async function getConversations() {
  const user = await getCachedAuthUser();
  if (!user) return { error: "Unauthorized" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ai_conversations")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) return { error: error.message };
  return { data };
}

export async function getMessages(conversationId: string) {
  const user = await getCachedAuthUser();
  if (!user) return { error: "Unauthorized" };

  const supabase = await createClient();
  
  const { data: conv } = await supabase
    .from("ai_conversations")
    .select("id")
    .eq("id", conversationId)
    .eq("user_id", user.id)
    .single();
    
  if (!conv) return { error: "Conversation not found" };

  const { data, error } = await supabase
    .from("ai_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) return { error: error.message };
  return { data };
}

export async function deleteConversation(conversationId: string) {
  const user = await getCachedAuthUser();
  if (!user) return { error: "Unauthorized" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("ai_conversations")
    .delete()
    .eq("id", conversationId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/dashboard/ai-assistant");
  return { success: true };
}

export async function renameConversation(conversationId: string, title: string) {
  const user = await getCachedAuthUser();
  if (!user) return { error: "Unauthorized" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("ai_conversations")
    .update({ title })
    .eq("id", conversationId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/dashboard/ai-assistant");
  return { success: true };
}
