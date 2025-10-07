"use client"

import { forwardRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  keyboardHint?: string
}

export const SearchDialog = forwardRef<HTMLDivElement, SearchDialogProps>(
  ({ open, onOpenChange, searchQuery, onSearchChange, keyboardHint }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay className="search-dialog-overlay" />
          <DialogContent 
            ref={ref}
            className={cn(
              "search-dialog-content",
              "p-0 overflow-hidden",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            aria-label="Search dialog"
          >
            <DialogTitle className="sr-only">Search</DialogTitle>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={cn(
                  "flex h-11 w-full border-0 bg-transparent py-3 text-sm",
                  "placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-0 focus-visible:ring-0",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
            
            {/* Search content area - for future search results */}
            <div className="max-h-[300px] overflow-y-auto p-4">
              <div className="text-center text-sm text-muted-foreground">
                Start typing to search...
              </div>
            </div>
            
            {/* Keyboard hint footer */}
            {keyboardHint && (
              <div className="flex items-center justify-between border-t px-3 py-2">
                <div className="text-xs text-muted-foreground">
                  Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    {keyboardHint}
                  </kbd> to open
                </div>
                <div className="text-xs text-muted-foreground">
                  Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    Esc
                  </kbd> to close
                </div>
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  }
)

SearchDialog.displayName = "SearchDialog"