"use client";

import * as React from "react";
import { format } from "date-fns";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/database.types";
import { recordAdherence } from "../actions";
import { cn } from "@/lib/utils";

type ReminderRow = Database["public"]["Tables"]["medicine_reminders"]["Row"];
type AdherenceRow = Database["public"]["Tables"]["medicine_adherence_logs"]["Row"];

interface AdherenceTrackerProps {
  reminder: ReminderRow;
  logs: AdherenceRow[];
}

export function AdherenceTracker({ reminder, logs }: AdherenceTrackerProps) {
  const [isPending, startTransition] = React.useTransition();
  const today = format(new Date(), "yyyy-MM-dd");

  const handleMarkDose = (time: string, status: "Taken" | "Skipped" | "Missed") => {
    startTransition(async () => {
      try {
        await recordAdherence(reminder.id, today, time, status);
        toast.success(`Dose marked as ${status}`);
      } catch (error) {
        toast.error("Failed to record adherence");
      }
    });
  };

  return (
    <div className="w-full">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3">
        Today's Schedule
      </h4>
      <div className="flex flex-col gap-3">
        {reminder.reminder_times.map((time) => {
          const logForTime = logs.find(
            (log) => log.scheduled_date === today && log.scheduled_time.startsWith(time)
          );
          const isTaken = logForTime?.status === "Taken";
          const isSkipped = logForTime?.status === "Skipped";
          const isMissed = logForTime?.status === "Missed";

          return (
            <div key={time} className="flex items-center justify-between text-sm">
              <span className="font-medium w-12">{time}</span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-7 text-xs px-2",
                    isTaken && "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700 border-green-200"
                  )}
                  onClick={() => handleMarkDose(time, "Taken")}
                  disabled={isPending || isTaken}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Taken
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-7 text-xs px-2",
                    isSkipped && "bg-orange-100 text-orange-700 hover:bg-orange-100 hover:text-orange-700 border-orange-200"
                  )}
                  onClick={() => handleMarkDose(time, "Skipped")}
                  disabled={isPending || isSkipped}
                >
                  <AlertCircle className="h-3.5 w-3.5 mr-1" /> Skip
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-7 text-xs px-2",
                    isMissed && "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700 border-red-200"
                  )}
                  onClick={() => handleMarkDose(time, "Missed")}
                  disabled={isPending || isMissed}
                >
                  <XCircle className="h-3.5 w-3.5 mr-1" /> Missed
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
