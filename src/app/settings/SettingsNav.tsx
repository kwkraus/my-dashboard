import { cn } from "@/lib/utils";
import { User, Shield, Bell, Settings } from "lucide-react";
import { SettingsTabs } from "./types";
import { useEffect, useState } from "react";

interface SettingsNavProps {
  activeTab: SettingsTabs;
  onTabChange: (tab: SettingsTabs) => void;
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check viewport width on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navItems = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "advanced" as const, label: "Advanced", icon: Settings },
  ];

  const handleTabChange = (tabId: SettingsTabs) => {
    onTabChange(tabId);
    if (isMobileView) {
      setMobileMenuOpen(false);
    }
  };

  // Find the current active tab's label
  // Find the current active tab's label
  const activeTabLabel = navItems.find(item => item.id === activeTab)?.label || "Settings";

  return (
    <div className="w-full">
      {/* Mobile dropdown selector */}
      {isMobileView && (
        <div className="relative mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            <span className="font-medium">{activeTabLabel}</span>
            <svg 
              className={`h-4 w-4 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {mobileMenuOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-background shadow-lg">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm",
                    "cursor-pointer hover:bg-accent",
                    activeTab === item.id && "bg-muted font-semibold"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Desktop navigation */}
      {!isMobileView && (
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleTabChange(item.id)}
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
      )}
    </div>
  );
}
