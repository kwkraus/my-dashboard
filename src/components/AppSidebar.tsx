"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Home, Settings, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileToggle?: () => void;
}

export function AppSidebar({ mobileOpen = false, onMobileToggle }: AppSidebarProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      
      // On desktop, auto-expand; on mobile, start collapsed
      if (!mobile) {
        setCollapsed(false);
      }
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      // On mobile, use the parent's toggle function for mobile overlay
      onMobileToggle?.();
    } else {
      // On desktop, toggle between collapsed and expanded
      setCollapsed(!collapsed);
    }
  };

  // On mobile, use mobileOpen prop; on desktop, use local collapsed state
  const isOpen = isMobile ? mobileOpen : !collapsed;
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={onMobileToggle}
        />
      )}
      
      <div
        className={cn(
          "relative flex h-full flex-col border-r bg-background transition-all duration-300",
          // Desktop behavior
          !isMobile && (collapsed ? "w-16" : "w-64"),
          // Mobile behavior - fixed positioning when expanded
          isMobile && (isOpen ? "fixed left-0 top-0 z-50 w-64" : "w-0 overflow-hidden")
        )}
      >      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <span className="text-xs font-bold">A</span>
          </div>
          {isOpen && <span className="text-sm font-semibold">Acme Inc</span>}
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto h-6 w-6", collapsed && "ml-0")}
            onClick={handleToggle}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        )}
      </div>      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        <div
          onClick={() => router.push('/dashboard')}
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-lg hover:scale-[1.02] hover:bg-slate-100 dark:hover:bg-slate-800",
            "active:scale-[0.98]",
            "hover:border-l-4 hover:border-l-blue-500 hover:pl-2",
            !isOpen && "justify-center px-2 hover:px-2"
          )}
        >
          <Home className="h-4 w-4 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110" />
          {isOpen && <span className="transition-all duration-300 group-hover:font-semibold group-hover:text-slate-900 dark:group-hover:text-slate-100">Dashboard</span>}
        </div>
        <div
          onClick={() => router.push('/revenue')}
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-lg hover:scale-[1.02] hover:bg-slate-100 dark:hover:bg-slate-800",
            "active:scale-[0.98]",
            "hover:border-l-4 hover:border-l-green-500 hover:pl-2",
            !isOpen && "justify-center px-2 hover:px-2"
          )}
        >
          <DollarSign className="h-4 w-4 transition-all duration-300 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:scale-110" />
          {isOpen && <span className="transition-all duration-300 group-hover:font-semibold group-hover:text-slate-900 dark:group-hover:text-slate-100">Revenue</span>}
        </div>
        <div
          onClick={() => console.log('Settings clicked')}
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-lg hover:scale-[1.02] hover:bg-slate-100 dark:hover:bg-slate-800",
            "active:scale-[0.98]",
            "hover:border-l-4 hover:border-l-emerald-500 hover:pl-2",
            !isOpen && "justify-center px-2 hover:px-2"
          )}
        >
          <Settings className="h-4 w-4 transition-all duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:rotate-90" />
          {isOpen && <span className="transition-all duration-300 group-hover:font-semibold group-hover:text-slate-900 dark:group-hover:text-slate-100">Settings</span>}
        </div>
      </nav>{/* User */}
      <div className="border-t p-2">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            !isOpen && "justify-center px-2"
          )}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-xs font-medium">Jane Doe</span>
              <span className="text-xs text-muted-foreground">jane@example.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
