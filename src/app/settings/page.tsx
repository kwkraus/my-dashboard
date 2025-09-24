/**
 * Settings Page Component
 * 
 * Main settings page that provides a tabbed interface for managing user preferences.
 * Includes Profile, Security, Notifications, and Advanced settings sections.
 * Features responsive design that adapts from two-column layout on desktop
 * to stacked layout on mobile devices.
 */

"use client"

import { useState } from "react"
import SettingsNav from "./SettingsNav"
import ProfileTab from "./ProfileTab"
import SecurityTab from "./SecurityTab"
import NotificationsTab from "./NotificationsTab"
import AdvancedTab from "./AdvancedTab"
import type { SettingsTabs } from "./types"

export default function SettingsPage() {
  // Track the currently active tab, defaulting to profile
  const [activeTab, setActiveTab] = useState<SettingsTabs>("profile")

  /**
   * Renders the content for the currently active tab
   * @returns JSX element for the active tab's content
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />
      case "security":
        return <SecurityTab />
      case "notifications":
        return <NotificationsTab />
      case "advanced":
        return <AdvancedTab />
      default:
        return <div className="p-6">Select a settings tab</div>
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left column - Navigation (25% width with 250px minimum on desktop, full width on mobile) */}
          <div className="w-full md:w-1/4 md:min-w-[250px] p-6 border-b md:border-b-0 md:border-r border-border">
            <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Right column - Tab content (75% width on desktop, full width on mobile) */}
          <div className="flex-1 md:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}