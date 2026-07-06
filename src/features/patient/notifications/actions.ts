"use server";

import { createClient } from "@/lib/supabase/server";
import { getCachedAuthUser } from "@/features/auth/utils";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/routes";
import { Database } from "@/lib/supabase/database.types";

type InsertNotification = Database["public"]["Tables"]["notifications"]["Insert"];

interface SendNotificationParams {
  userId: string;
  type: string;
  title: string;
  message: string;
  referenceId?: string;
  referenceType?: string;
}

export async function sendNotification(params: SendNotificationParams) {
  try {
    const supabase = await createClient();

    const notification: InsertNotification = {
      user_id: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      reference_id: params.referenceId || null,
      reference_type: params.referenceType || null,
      is_read: false,
    };

    const { error } = await supabase.from("notifications").insert(notification);

    if (error) {
      console.error("Error inserting notification:", error);
      return { error: "Failed to create notification" };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in sendNotification:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const user = await getCachedAuthUser();
    if (!user) return { error: "Unauthorized" };

    const supabase = await createClient();

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq("id", notificationId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error marking notification as read:", error);
      return { error: "Failed to mark as read" };
    }

    revalidatePath(ROUTES.DASHBOARD);
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const user = await getCachedAuthUser();
    if (!user) return { error: "Unauthorized" };

    const supabase = await createClient();

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (error) {
      console.error("Error marking all notifications as read:", error);
      return { error: "Failed to mark all as read" };
    }

    revalidatePath(ROUTES.DASHBOARD);
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const user = await getCachedAuthUser();
    if (!user) return { error: "Unauthorized" };

    const supabase = await createClient();

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting notification:", error);
      return { error: "Failed to delete notification" };
    }

    revalidatePath(ROUTES.DASHBOARD);
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}
