"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Tabs 
        defaultValue="profile" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <TabsList className="flex md:flex-col h-full bg-muted p-1 w-full md:w-48 md:h-auto">
            <TabsTrigger 
              value="profile" 
              className="flex justify-start w-full data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex justify-start w-full data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex justify-start w-full data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="profile" className="mt-0 border rounded-lg p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <p className="text-muted-foreground">
                Manage your profile information.
              </p>
              {/* Profile content will go here */}
            </TabsContent>
            
            <TabsContent value="security" className="mt-0 border rounded-lg p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <p className="text-muted-foreground">
                Manage your password and security settings.
              </p>
              {/* Security content will go here */}
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0 border rounded-lg p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <p className="text-muted-foreground">
                Manage your notification settings.
              </p>
              {/* Notifications content will go here */}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
