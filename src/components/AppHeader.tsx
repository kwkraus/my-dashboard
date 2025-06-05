"use client";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>        <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4 text-muted-foreground" />
        </Button>
        <ModeToggle />
        <Avatar className="h-8 w-8">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
