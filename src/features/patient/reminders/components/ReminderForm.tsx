"use client";

import * as React from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createReminder, updateReminder } from "../actions";
import { Database } from "@/lib/supabase/database.types";

type ReminderRow = Database["public"]["Tables"]["medicine_reminders"]["Row"];

const formSchema = z.object({
  medicine_name: z.string().min(1, "Medicine name is required"),
  dosage: z.string().min(1, "Dosage is required (e.g., 500mg)"),
  frequency: z.string().min(1, "Frequency is required (e.g., Twice a day)"),
  reminder_times: z
    .array(
      z.object({
        time: z.string().min(1, "Time is required"),
      })
    )
    .min(1, "At least one reminder time is required"),
  start_date: z.date({
    required_error: "Start date is required",
  }),
  end_date: z.date().optional(),
  instructions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReminderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ReminderRow;
}

export function ReminderForm({ open, onOpenChange, initialData }: ReminderFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicine_name: initialData?.medicine_name || "",
      dosage: initialData?.dosage || "",
      frequency: initialData?.frequency || "",
      reminder_times: initialData?.reminder_times.map((t) => ({ time: t })) || [
        { time: "08:00" },
      ],
      start_date: initialData?.start_date
        ? new Date(initialData.start_date)
        : new Date(),
      end_date: initialData?.end_date ? new Date(initialData.end_date) : undefined,
      instructions: initialData?.instructions || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "reminder_times",
    control: form.control,
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        medicine_name: initialData?.medicine_name || "",
        dosage: initialData?.dosage || "",
        frequency: initialData?.frequency || "",
        reminder_times: initialData?.reminder_times.map((t) => ({ time: t })) || [
          { time: "08:00" },
        ],
        start_date: initialData?.start_date
          ? new Date(initialData.start_date)
          : new Date(),
        end_date: initialData?.end_date ? new Date(initialData.end_date) : undefined,
        instructions: initialData?.instructions || "",
      });
    }
  }, [open, initialData, form]);

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        const payload = {
          ...data,
          reminder_times: data.reminder_times.map((rt) => rt.time),
          start_date: format(data.start_date, "yyyy-MM-dd"),
          end_date: data.end_date ? format(data.end_date, "yyyy-MM-dd") : undefined,
        };

        if (initialData) {
          await updateReminder(initialData.id, payload);
          toast.success("Reminder updated successfully");
        } else {
          await createReminder(payload);
          toast.success("Reminder added successfully");
        }
        onOpenChange(false);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Medicine Reminder" : "Add Medicine Reminder"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="medicine_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicine Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Paracetamol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 500mg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Twice a day" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Reminder Times</FormLabel>
              <div className="space-y-2 mt-2">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`reminder_times.${index}.time`}
                    render={({ field: inputField }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <Input
                            type="time"
                            {...inputField}
                            className="w-full"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => append({ time: "08:00" })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Time
                </Button>
              </div>
              {form.formState.errors.reminder_times && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {form.formState.errors.reminder_times.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger render={
                        <Button
                          type="button"
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      } />
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger render={
                        <Button
                          type="button"
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      } />
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Take after meals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : initialData ? "Save Changes" : "Add Reminder"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
