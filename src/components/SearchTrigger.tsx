"use client"

import { forwardRef } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface SearchTriggerProps {
  onClick: () => void
  keyboardHint?: string
  className?: string
}

export const SearchTrigger = forwardRef<HTMLButtonElement, SearchTriggerProps>(
  ({ onClick, keyboardHint, className }, ref) => {
    // Get platform-specific keyboard hint
    const getKeyboardHint = () => {
      if (typeof window === 'undefined') return 'Ctrl+K'
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      return isMac ? '⌘K' : 'Ctrl+K'
    }

    const displayHint = keyboardHint || getKeyboardHint()

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              variant="ghost"
              size="icon"
              onClick={onClick}
              className={cn(
                "h-9 w-9",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                className
              )}
              aria-label={`Search (${displayHint})`}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search ({displayHint})</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

SearchTrigger.displayName = "SearchTrigger"