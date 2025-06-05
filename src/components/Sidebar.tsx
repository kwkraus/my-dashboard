"use client";
import { useState, useEffect } from "react";
import { DashboardIcon } from "@radix-ui/react-icons";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  // Collapse sidebar on small screens, restore on large screens
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <aside
      className={cn(
        "h-full bg-white text-neutral-900 flex flex-col border-r border-neutral-200 transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
      style={{ transitionProperty: "width, background-color" }}
    >      <div className="flex items-center h-16 px-4 border-b border-neutral-200">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "transition-transform duration-300 bg-white/80 hover:bg-neutral-200 text-neutral-900 shadow-none border-0 outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 active:border-0",
            collapsed ? "mx-3" : "mr-2"
          )}
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />}
        </Button>
        <span
          className={cn(
            "font-bold text-lg transition-all duration-300 origin-left whitespace-nowrap overflow-hidden",
            collapsed ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-xs ml-2"
          )}
        >
          My Dashboard
        </span>
      </div>
      <nav className="flex-1 flex flex-col gap-2 mt-4">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <a
                href="/dashboard"
                className={cn(
                  "flex items-center transition-all duration-300 hover:bg-neutral-100 group text-neutral-900 font-medium overflow-hidden rounded-md",
                  collapsed ? "justify-center h-10 w-10 mx-3" : "gap-3 py-2 px-4"
                )}
                tabIndex={0}
              >
                <span
                  className={cn(
                    "transition-all duration-300 origin-left flex-shrink-0 flex items-center justify-center",
                    collapsed ? "w-5 h-5" : "w-6 h-6"
                  )}
                >
                  <DashboardIcon className="w-5 h-5" />
                </span>
                <span
                  className={cn(
                    "transition-all duration-300 origin-left whitespace-nowrap overflow-hidden",
                    collapsed ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-xs ml-2"
                  )}
                >
                  Dashboard
                </span>
              </a>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Dashboard</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </nav>
      <div className="mt-auto p-4 border-t border-neutral-200">
        <div className="flex items-center gap-2 transition-all duration-300 text-neutral-900">
          <Avatar>
            <AvatarFallback className="bg-neutral-200 text-neutral-900">N</AvatarFallback>
          </Avatar>
          {!collapsed && <span className="text-sm transition-opacity duration-300">User</span>}
        </div>      </div>
    </aside>
  );
}
