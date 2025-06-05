"use client";
import { useState } from "react";
import { ChevronLeft, Home, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <span className="text-xs font-bold">A</span>
          </div>
          {!collapsed && <span className="text-sm font-semibold">Acme Inc</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto h-6 w-6", collapsed && "ml-0")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        <a
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <Home className="h-4 w-4" />
          {!collapsed && <span>Dashboard</span>}
        </a>
        <a
          href="#"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <Settings className="h-4 w-4" />
          {!collapsed && <span>Settings</span>}
        </a>
      </nav>

      {/* User */}
      <div className="border-t p-2">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            collapsed && "justify-center px-2"
          )}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
