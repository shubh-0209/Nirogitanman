"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "@/lib/supabase/database.types";
import { UserIcon, Bell, Palette } from "lucide-react";
import { AccountTab } from "./AccountTab";
import { NotificationsForm } from "./NotificationsForm";

type UserSettings = Database['public']['Tables']['user_settings']['Row'];

interface SettingsClientProps {
  settings: UserSettings;
}

export function SettingsClient({ settings }: SettingsClientProps) {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="bg-white border w-full flex flex-wrap h-auto p-1 rounded-xl">
          <TabsTrigger value="account" className="flex-1 min-w-[120px] rounded-lg px-4 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <UserIcon className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 min-w-[120px] rounded-lg px-4 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>

        </TabsList>

        <TabsContent value="account" className="outline-none space-y-6">
          <AccountTab />
        </TabsContent>

        <TabsContent value="notifications" className="outline-none space-y-6">
          <NotificationsForm initialSettings={settings} />
        </TabsContent>

      </Tabs>
    </div>
  );
}
