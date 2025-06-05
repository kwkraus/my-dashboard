import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-neutral-200 bg-white/80 backdrop-blur z-10 sticky top-0">
      <div className="flex-1" />
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Settings"
              className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
            >
              <GearIcon width={22} height={22} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
}
