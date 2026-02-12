"use client";
import * as React from "react";
import { Bell, Search, Menu, Clock, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchDialog } from "@/components/SearchDialog";

interface AppHeaderProps {
  onMobileMenuClick?: () => void;
}

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    content: "Your dashboard has been successfully updated with new charts",
    timestamp: "2 hours ago",
    type: "success",
    icon: CheckCircle,
  },
  {
    id: 2,
    content: "System maintenance scheduled for tonight at 11 PM EST",
    timestamp: "4 hours ago", 
    type: "info",
    icon: Info,
  },
  {
    id: 3,
    content: "High CPU usage detected on your server",
    timestamp: "1 day ago",
    type: "warning", 
    icon: AlertCircle,
  },
  {
    id: 4,
    content: "Weekly performance report is now available",
    timestamp: "2 days ago",
    type: "info",
    icon: Info,
  },
  {
    id: 5,
    content: "Database backup completed successfully",
    timestamp: "3 days ago",
    type: "success",
    icon: CheckCircle,
  },
];

export function AppHeader({ onMobileMenuClick }: AppHeaderProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        const target = e.target as HTMLElement;
        const tag = target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchOpenChange = React.useCallback((open: boolean) => {
    setSearchOpen(open);
    if (!open) {
      // Return focus to the trigger button
      requestAnimationFrame(() => {
        searchButtonRef.current?.focus();
      });
    }
  }, []);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      {/* Mobile hamburger menu */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden"
        onClick={onMobileMenuClick}
      >
        <Menu className="h-4 w-4 text-muted-foreground" />
      </Button>
      
      <div className="flex-1">
      </div><div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                ref={searchButtonRef}
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search (<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">{isMac ? "⌘K" : "Ctrl+K"}</kbd>)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SearchDialog open={searchOpen} onOpenChange={handleSearchOpenChange} />
        
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4 text-foreground" />
              {mockNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
                  {mockNotifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 max-w-[90vw]">
            <DropdownMenuLabel className="font-medium">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                {mockNotifications.map((notification, index) => {
                  const IconComponent = notification.icon;
                  return (
                    <div key={notification.id}>
                      <DropdownMenuItem className="flex-col items-start gap-2 p-3">
                        <div className="flex w-full items-start gap-2">
                          <IconComponent className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                            notification.type === 'success' ? 'text-green-500' :
                            notification.type === 'warning' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} />
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="text-sm leading-relaxed break-words">
                              {notification.content}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{notification.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      {index < mockNotifications.length - 1 && <DropdownMenuSeparator />}
                    </div>
                  );
                })}
              </div>
            ) : (
              <DropdownMenuItem disabled className="justify-center py-6">
                <div className="text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                </div>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
        <Avatar className="h-8 w-8">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
