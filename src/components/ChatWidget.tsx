"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  /** Copilot Studio bot embed URL */
  botUrl?: string;
  /** Position of the chat widget */
  position?: "bottom-right" | "bottom-left";
  /** Initial open state */
  defaultOpen?: boolean;
  /** Widget title shown in header */
  title?: string;
}

export function ChatWidget({
  botUrl,
  position = "bottom-right",
  defaultOpen = false,
  title = "FAQ Assistant",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isConfigured, setIsConfigured] = useState(false);
  const [effectiveBotUrl, setEffectiveBotUrl] = useState<string | null>(null);

  useEffect(() => {
    // Priority: prop > env variable
    const url = botUrl || process.env.NEXT_PUBLIC_COPILOT_STUDIO_URL;
    if (url) {
      setEffectiveBotUrl(url);
      setIsConfigured(true);
    }
  }, [botUrl]);

  const positionClasses = {
    "bottom-right": "right-4",
    "bottom-left": "left-4",
  };

  const chatPositionClasses = {
    "bottom-right": "right-4",
    "bottom-left": "left-4",
  };

  if (!isConfigured) {
    return (
      <div
        className={cn(
          "fixed bottom-4 z-50",
          positionClasses[position]
        )}
      >
        <Button
          variant="outline"
          className="h-14 w-14 rounded-full shadow-lg"
          size="icon"
          title="Chatbot not configured"
          disabled
        >
          <Settings2 className="h-6 w-6 text-muted-foreground" />
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 z-50 h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105",
          positionClasses[position]
        )}
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat panel */}
      {isOpen && effectiveBotUrl && (
        <div
          className={cn(
            "fixed bottom-20 z-50 flex h-[500px] w-96 flex-col overflow-hidden rounded-lg border bg-background shadow-xl",
            chatPositionClasses[position]
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
              <span className="font-medium text-primary-foreground">
                {title}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat iframe */}
          <iframe
            src={effectiveBotUrl}
            className="h-full w-full border-0"
            title={title}
            allow="microphone"
          />
        </div>
      )}
    </>
  );
}
