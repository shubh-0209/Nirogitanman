"use client";

import * as React from "react";
import { Plus, Search, Calendar as CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "@/lib/supabase/database.types";
import { ReminderForm } from "./ReminderForm";
import { MedicineReminderCard } from "./MedicineReminderCard";

type ReminderRow = Database["public"]["Tables"]["medicine_reminders"]["Row"];
type AdherenceRow = Database["public"]["Tables"]["medicine_adherence_logs"]["Row"];

interface MedicineRemindersClientProps {
  reminders: ReminderRow[];
  logs: AdherenceRow[];
}

export function MedicineRemindersClient({
  reminders,
  logs,
}: MedicineRemindersClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingReminder, setEditingReminder] = React.useState<ReminderRow | undefined>();

  const filteredReminders = React.useMemo(() => {
    return reminders.filter((r) =>
      r.medicine_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [reminders, searchQuery]);

  const activeReminders = filteredReminders.filter((r) => r.status === "Active");
  const pausedReminders = filteredReminders.filter((r) => r.status === "Paused");
  const completedReminders = filteredReminders.filter((r) => r.status === "Completed");

  const handleEdit = (reminder: ReminderRow) => {
    setEditingReminder(reminder);
    setIsFormOpen(true);
  };

  const handleOpenForm = () => {
    setEditingReminder(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Medicine Reminders</h1>
        <Button onClick={handleOpenForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Reminder
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="active">Active ({activeReminders.length})</TabsTrigger>
            <TabsTrigger value="paused">Paused ({pausedReminders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedReminders.length})</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="active" className="mt-0">
          {activeReminders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeReminders.map((reminder) => (
                <MedicineReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  logs={logs.filter((l) => l.reminder_id === reminder.id)}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <EmptyState onAdd={handleOpenForm} />
          )}
        </TabsContent>

        <TabsContent value="paused" className="mt-0">
          {pausedReminders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pausedReminders.map((reminder) => (
                <MedicineReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  logs={logs.filter((l) => l.reminder_id === reminder.id)}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <EmptyState onAdd={handleOpenForm} message="No paused reminders." />
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {completedReminders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {completedReminders.map((reminder) => (
                <MedicineReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  logs={logs.filter((l) => l.reminder_id === reminder.id)}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <EmptyState onAdd={handleOpenForm} message="No completed reminders." />
          )}
        </TabsContent>
      </Tabs>

      <ReminderForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={editingReminder}
      />
    </div>
  );
}

function EmptyState({ onAdd, message = "You haven't added any medicine reminders yet." }: { onAdd: () => void, message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl border-dashed bg-muted/20">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <CalendarIcon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">No reminders found</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {message}
      </p>
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" /> Add Medicine Reminder
      </Button>
    </div>
  );
}
