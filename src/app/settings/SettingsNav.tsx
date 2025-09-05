import { cn } from "@/lib/utils";
import { User, Shield, Bell, Settings } from "lucide-react";
import { SettingsTabs } from "./types";

interface SettingsNavProps {
  activeTab: SettingsTabs;
  onTabChange: (tab: SettingsTabs) => void;
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  const navItems = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "advanced" as const, label: "Advanced", icon: Settings },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <div
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer",
              "transition-all duration-300 ease-in-out",
              "hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-muted font-semibold"
            )}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9'; // slate-100
              if (document.documentElement.classList.contains('dark')) {
                e.currentTarget.style.backgroundColor = '#1e293b'; // slate-800
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
