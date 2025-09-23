"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, Clock, AlertCircle, Info, CheckCircle } from "lucide-react";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder behavior - no backend connected yet
    console.log('Search submitted:', searchValue);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchValue("");
    }
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
      
      <div className="flex-1">
      </div>
      
      <div className="flex items-center gap-2">
        {/* Search functionality */}
        <div ref={searchContainerRef} className="relative">
          {!searchOpen ? (
            <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
              <Search className="h-4 w-4 text-muted-foreground" />
            </Button>
          ) : (
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative flex items-center animate-in slide-in-from-right-2 fade-in-0 duration-300">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-64 md:w-64 sm:w-48 pr-12 focus:ring-1 focus:ring-ring"
                />
                <div className="absolute right-1 flex items-center">
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
        
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
