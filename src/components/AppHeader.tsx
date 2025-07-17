"use client";
import { Bell, Search, Menu, Clock, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
        
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
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
                          <div className="flex-1 space-y-1">
                            <p className="text-sm leading-relaxed">
                              {notification.content}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {notification.timestamp}
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
