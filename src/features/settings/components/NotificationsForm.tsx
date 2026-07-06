"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/database.types";
import { upsertUserSettings } from "@/features/settings/actions";

type UserSettings = Database['public']['Tables']['user_settings']['Row'];

const notificationsSchema = z.object({
  dashboard_notifications: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsSchema>;

export function NotificationsForm({ initialSettings }: { initialSettings: UserSettings }) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      dashboard_notifications: initialSettings.dashboard_notifications ?? true,
    },
  });

  function onSubmit(data: NotificationsFormValues) {
    startTransition(async () => {
      const result = await upsertUserSettings(data);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Notification preferences updated.");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <FormField
              control={form.control}
              name="dashboard_notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Dashboard Notifications</FormLabel>
                    <FormDescription>
                      Show unread notifications directly in the dashboard overview.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit" disabled={isPending || !form.formState.isDirty}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
