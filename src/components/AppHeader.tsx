"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, Clock, AlertCircle, Info, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus the input when search opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchTerm(""); // Clear search term when opening
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for future search functionality
    console.log("Search term:", searchTerm);
    // Could show a toast or handle search results here in the future
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };
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
      
      {/* Search Interface or Spacer */}
      <div className="flex-1">
        {isSearchOpen && (
          <div ref={searchRef} className="flex items-center gap-2 max-w-md">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 flex-1"
                aria-label="Search input"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="h-8 px-3"
                disabled={!searchTerm.trim()}
              >
                Search
              </Button>
              <Button 
                type="button"
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={handleSearchClose}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
        
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
