"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Bell,
  Search,
  CheckCircle2,
  Trash2,
  Calendar,
  Pill,
  FileText,
  Activity,
  Check,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Database } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "../actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface NotificationsClientProps {
  initialNotifications: Notification[];
  userId: string;
}

export function NotificationsClient({ initialNotifications, userId }: NotificationsClientProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  useEffect(() => {
    const channel = supabase
      .channel('notifications_page')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, userId]);

  const handleMarkAsRead = async (id: string) => {
    const res = await markNotificationAsRead(id);
    if (res.error) {
      toast.error(res.error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const res = await markAllNotificationsAsRead();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("All notifications marked as read");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteNotification(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Notification deleted");
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await handleMarkAsRead(notification.id);
    }

    if (notification.reference_type === "appointment") {
      router.push(`${ROUTES.DASHBOARD}/appointments`);
    } else if (notification.reference_type === "prescription") {
      router.push(`${ROUTES.DASHBOARD}/prescriptions`);
    } else if (notification.reference_type === "medical_record") {
      router.push(`${ROUTES.DASHBOARD}/medical-records`);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (activeFilter) {
      case "Unread": return !notification.is_read;
      case "Read": return notification.is_read;
      case "Appointments": return notification.type === "Appointment";
      case "Prescriptions": return notification.type === "Prescription";
      case "Medical Records": return notification.type === "Medical Record";
      case "System": return notification.type === "System";
      default: return true;
    }
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "Appointment": return <Calendar className="w-5 h-5" />;
      case "Prescription": return <Pill className="w-5 h-5" />;
      case "Medical Record": return <FileText className="w-5 h-5" />;
      case "Medicine Reminder": return <Activity className="w-5 h-5" />;
      case "AI Assistant": return <Bot className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const filterOptions = ["All", "Unread", "Read", "Appointments", "Prescriptions", "Medical Records", "System"];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Notifications</h1>
          <p className="text-gray-500 font-medium">Stay updated with your healthcare journey.</p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead} className="shadow-sm">
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search notifications..." 
            className="pl-9 w-full bg-gray-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {filterOptions.map(option => (
            <Badge
              key={option}
              variant={activeFilter === option ? "default" : "secondary"}
              className={cn(
                "cursor-pointer whitespace-nowrap text-sm px-3 py-1 font-medium transition-colors hover:bg-gray-200",
                activeFilter === option ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-100 text-gray-700"
              )}
              onClick={() => setActiveFilter(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={cn(
                "group relative bg-white p-5 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-start gap-4",
                !notification.is_read ? "border-primary/30 shadow-md bg-teal-50/20" : "border-gray-200 shadow-sm hover:border-gray-300"
              )}
            >
              <div 
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer",
                  !notification.is_read ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 transition-colors"
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleNotificationClick(notification)}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <h3 className={cn("font-semibold text-base truncate pr-8", !notification.is_read ? "text-gray-900" : "text-gray-700")}>
                    {notification.title}
                  </h3>
                  <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                    {format(new Date(notification.created_at), "MMM d, h:mm a")}
                  </span>
                </div>
                <p className={cn("text-sm", !notification.is_read ? "text-gray-800" : "text-gray-500")}>
                  {notification.message}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:absolute sm:top-5 sm:right-5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity mt-4 sm:mt-0 justify-end">
                {!notification.is_read && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                    onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notification.id); }}
                    title="Mark as read"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={(e) => { e.stopPropagation(); handleDelete(notification.id); }}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState 
            icon={Bell} 
            title="No notifications found"
            description={
              searchQuery || activeFilter !== "All" 
                ? "Try adjusting your search or filters." 
                : "You don't have any notifications right now. We'll let you know when there's an update."
            }
          />
        )}
      </div>
    </div>
  );
}
