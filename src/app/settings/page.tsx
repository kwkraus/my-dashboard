"use client";

import { useState, useEffect } from "react";
import { SettingsNav } from "./SettingsNav";
import { SettingsTabs } from "./types";
import { ProfileTab } from "./ProfileTab";
import { SecurityTab } from "./SecurityTab";
import { NotificationsTab } from "./NotificationsTab";
import { AdvancedTab } from "./AdvancedTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("profile");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "security":
        return <SecurityTab />;
      case "notifications":
        return <NotificationsTab />;
      case "advanced":
        return <AdvancedTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
        {isMobile && (
          <p className="mt-2 text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-blue-700 dark:text-blue-300">
            Tip: Select a tab from the dropdown to navigate settings
          </p>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 md:min-w-[250px]">
          <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="w-full md:w-3/4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
