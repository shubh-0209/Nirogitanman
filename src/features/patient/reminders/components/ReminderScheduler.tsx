"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface ReminderSchedulerProps {
  userId: string;
}

export function ReminderScheduler({ userId }: ReminderSchedulerProps) {
  const supabase = createClient();
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Request notification permission once
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const checkReminders = async () => {
      try {
        // Fetch active reminders
        const { data: reminders, error } = await supabase
          .from("medicine_reminders")
          .select("*")
          .eq("user_id", userId)
          .eq("status", "Active");

        if (error || !reminders) return;

        const now = new Date();
        const currentDateStr = format(now, "yyyy-MM-dd");
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Convert current time to a comparable minutes-since-midnight value
        const currentTotalMinutes = currentHour * 60 + currentMinute;

        // Retrieve already notified list for TODAY
        const storageKey = `notified_reminders_${currentDateStr}_${userId}`;
        const notifiedStorage = localStorage.getItem(storageKey);
        const notifiedSet = new Set<string>(notifiedStorage ? JSON.parse(notifiedStorage) : []);

        let hasNewNotifications = false;

        for (const reminder of reminders) {
          // Check date bounds
          if (reminder.start_date && new Date(reminder.start_date) > now) continue;
          // Set end date boundary check (include entire last day)
          if (reminder.end_date) {
            const endDate = new Date(reminder.end_date);
            endDate.setHours(23, 59, 59, 999);
            if (endDate < now) continue;
          }

          const times = reminder.reminder_times as string[] | null;
          if (!times) continue;

          for (const timeStr of times) {
            // timeStr is usually "HH:mm" or "HH:mm:ss"
            const [hourStr, minuteStr] = timeStr.split(":");
            const rHour = parseInt(hourStr, 10);
            const rMinute = parseInt(minuteStr, 10);
            const rTotalMinutes = rHour * 60 + rMinute;

            // Trigger if current time is >= reminder time AND we haven't notified for this specific reminder+time combo today.
            const notificationId = `${reminder.id}_${timeStr}`;

            if (currentTotalMinutes >= rTotalMinutes && !notifiedSet.has(notificationId)) {
              const title = "Medicine Reminder";
              const message = `Time to take ${reminder.medicine_name} (${reminder.dosage})`;

              // 1. Browser Notification
              if ("Notification" in window && Notification.permission === "granted") {
                new Notification(title, {
                  body: message,
                  // Fallback to favicon since logo path isn't strictly known
                  icon: "/favicon.ico", 
                });
              }

              // 2. In-app Toast
              toast(title, {
                description: message,
                duration: 10000,
              });

              // 3. Save into notifications table
              await supabase.from("notifications").insert({
                user_id: userId,
                type: "Reminder",
                title: title,
                message: message,
                reference_id: reminder.id,
                reference_type: "medicine_reminders",
                is_read: false,
              });
              
              // Increment dashboard notification badge is handled automatically by the DB subscription in NotificationMenu.tsx

              // Mark as notified locally
              notifiedSet.add(notificationId);
              hasNewNotifications = true;
            }
          }
        }

        // Save updated notifications set to local storage
        if (hasNewNotifications) {
          localStorage.setItem(storageKey, JSON.stringify(Array.from(notifiedSet)));
        }

      } catch (err) {
        console.error("Error in reminder scheduler:", err);
      }
    };

    // Run once immediately
    checkReminders();

    // Poll every 30 seconds
    pollingIntervalRef.current = setInterval(checkReminders, 30000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [userId, supabase]);

  return null; // This is a headless component
}
