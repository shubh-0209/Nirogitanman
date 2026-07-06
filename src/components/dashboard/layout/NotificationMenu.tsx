"use client";

import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/database.types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { markNotificationAsRead } from "@/features/patient/notifications/actions";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

export function NotificationMenu({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();
  const router = useRouter();

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (data) {
      setNotifications(data);
    }

    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_read", false);

    setUnreadCount(count || 0);
  };

  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel('navbar_notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await markNotificationAsRead(notification.id);
      setUnreadCount(prev => Math.max(0, prev - 1));
    }

    if (notification.reference_type === "appointment") {
      router.push(`${ROUTES.DASHBOARD}/appointments`);
    } else if (notification.reference_type === "prescription") {
      router.push(`${ROUTES.DASHBOARD}/prescriptions`);
    } else if (notification.reference_type === "medical_record") {
      router.push(`${ROUTES.DASHBOARD}/medical-records`);
    } else {
      router.push(`${ROUTES.DASHBOARD}/notifications`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hidden sm:flex">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center border-2 border-background">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs font-normal text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notif) => (
                <DropdownMenuItem 
                  key={notif.id} 
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className={`text-sm font-medium line-clamp-1 ${!notif.is_read ? "text-gray-900" : "text-gray-600"}`}>
                      {notif.title}
                    </span>
                    {!notif.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <span className={`text-xs line-clamp-2 ${!notif.is_read ? "text-gray-800" : "text-gray-500"}`}>
                    {notif.message}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {format(new Date(notif.created_at), "MMM d, h:mm a")}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="justify-center text-primary font-medium cursor-pointer"
            onClick={() => router.push(`${ROUTES.DASHBOARD}/notifications`)}
          >
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
