/**
 * Settings Navigation Component
 * 
 * Renders a vertical navigation menu for switching between different settings tabs.
 * Supports keyboard navigation and provides visual feedback for the active tab.
 * 
 * @param activeTab - The currently active settings tab
 * @param onTabChange - Callback function to handle tab changes
 */

import { User, Shield, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SettingsTabs } from "./types"

interface SettingsNavProps {
  activeTab: SettingsTabs
  onTabChange: (tab: SettingsTabs) => void
}

const navigationItems = [
  {
    id: "profile" as const,
    label: "Profile",
    icon: User,
  },
  {
    id: "security" as const,
    label: "Security",
    icon: Shield,
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "advanced" as const,
    label: "Advanced",
    icon: Settings,
  },
]

export default function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  const handleKeyDown = (event: React.KeyboardEvent, itemId: SettingsTabs) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onTabChange(itemId)
    }
  }

  return (
    <div className="flex flex-col space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-muted-foreground transition-all duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              activeTab === item.id && "bg-muted text-primary shadow-sm"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        )
      })}
    </div>
  )
}