"use client";

import * as React from "react";
import { format } from "date-fns";
import { Check, Clock, MoreVertical, Pause, Play, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/lib/supabase/database.types";
import { deleteReminder, updateReminderStatus } from "../actions";
import { toast } from "sonner";
import { AdherenceTracker } from "./AdherenceTracker";

type ReminderRow = Database["public"]["Tables"]["medicine_reminders"]["Row"];
type AdherenceRow = Database["public"]["Tables"]["medicine_adherence_logs"]["Row"];

interface MedicineReminderCardProps {
  reminder: ReminderRow;
  logs: AdherenceRow[];
  onEdit: (reminder: ReminderRow) => void;
}

export function MedicineReminderCard({
  reminder,
  logs,
  onEdit,
}: MedicineReminderCardProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleStatusChange = (status: "Active" | "Paused" | "Completed") => {
    startTransition(async () => {
      try {
        await updateReminderStatus(reminder.id, status);
        toast.success(`Reminder marked as ${status}`);
      } catch (error) {
        toast.error("Failed to update status");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteReminder(reminder.id);
        toast.success("Reminder deleted");
      } catch (error) {
        toast.error("Failed to delete reminder");
      }
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Paused":
        return "secondary";
      case "Completed":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-primary">{reminder.medicine_name}</CardTitle>
            <CardDescription className="mt-1">
              {reminder.dosage} • {reminder.frequency}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onEdit(reminder)} disabled={isPending}>
                  Edit Reminder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {reminder.status === "Active" && (
                  <DropdownMenuItem onClick={() => handleStatusChange("Paused")} disabled={isPending}>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </DropdownMenuItem>
                )}
                {reminder.status === "Paused" && (
                  <DropdownMenuItem onClick={() => handleStatusChange("Active")} disabled={isPending}>
                    <Play className="mr-2 h-4 w-4" /> Resume
                  </DropdownMenuItem>
                )}
                {reminder.status !== "Completed" && (
                  <DropdownMenuItem onClick={() => handleStatusChange("Completed")} disabled={isPending}>
                    <Check className="mr-2 h-4 w-4" /> Mark Completed
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center">
              <Clock className="mr-1.5 h-4 w-4" /> Schedule
            </span>
            <div className="flex flex-wrap gap-1 justify-end">
              {reminder.reminder_times.map((time, idx) => (
                <Badge key={idx} variant="secondary" className="font-normal">
                  {time}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span>
              {format(new Date(reminder.start_date), "MMM d, yyyy")} -{" "}
              {reminder.end_date ? format(new Date(reminder.end_date), "MMM d, yyyy") : "Ongoing"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={getStatusBadgeVariant(reminder.status) as any}>
              {reminder.status}
            </Badge>
          </div>
          {reminder.instructions && (
            <div className="pt-2">
              <span className="text-muted-foreground block mb-1">Instructions</span>
              <p className="bg-muted p-2 rounded-md text-xs">{reminder.instructions}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 pt-4 rounded-b-xl border-t">
        <AdherenceTracker reminder={reminder} logs={logs} />
      </CardFooter>
    </Card>
  );
}
