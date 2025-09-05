"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./ProfileTab";
import { SecurityTab } from "./SecurityTab";
import { NotificationsTab } from "./NotificationsTab";

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
            <TabsContent value="profile" className="mt-0 h-full">
              <ProfileTab />
            </TabsContent>
            
            <TabsContent value="security" className="mt-0 h-full">
              <SecurityTab />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0 h-full">
              <NotificationsTab />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
