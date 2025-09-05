"use client";

import { useState } from "react";
import { SettingsNav } from "./SettingsNav";
import { SettingsTabs } from "./types";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <div>Profile content will go here</div>;
      case "security":
        return <div>Security content will go here</div>;
      case "notifications":
        return <div>Notifications content will go here</div>;
      case "advanced":
        return <div>Advanced content will go here</div>;
      default:
        return <div>Profile content will go here</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
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
