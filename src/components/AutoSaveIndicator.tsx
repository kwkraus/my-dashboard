/**
 * AutoSaveIndicator Component
 * Displays inline save status (Saving.../Saved/Error)
 */

'use client';

import React from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AutoSaveStatus } from '@/types/settings';

interface AutoSaveIndicatorProps {
  status: AutoSaveStatus;
  className?: string;
}

/**
 * Displays auto-save status with appropriate icon and text
 * @param status - Current save status (idle/saving/saved/error)
 * @param className - Optional additional CSS classes
 */
export const AutoSaveIndicator = React.memo(
  ({ status, className }: AutoSaveIndicatorProps) => {
    // Don't render anything when idle
    if (status === 'idle') {
      return null;
    }

    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 text-sm transition-opacity',
          className
        )}
        role="status"
        aria-live="polite"
      >
        {status === 'saving' && (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">Saving...</span>
          </>
        )}
        
        {status === 'saved' && (
          <>
            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500" />
            <span className="text-green-600 dark:text-green-500">Saved</span>
          </>
        )}
        
        {status === 'error' && (
          <>
            <AlertCircle className="h-3.5 w-3.5 text-red-600 dark:text-red-500" />
            <span className="text-red-600 dark:text-red-500">Error</span>
          </>
        )}
      </div>
    );
  }
);

AutoSaveIndicator.displayName = 'AutoSaveIndicator';
