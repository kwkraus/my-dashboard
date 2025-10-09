/**
 * useAutoSave Hook
 * Manages auto-save logic with status tracking (idle/saving/saved/error)
 */

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AutoSaveStatus } from '@/types/settings';

interface UseAutoSaveOptions<T> {
  saveFunction: (data: T) => Promise<void>;
  onError?: (error: Error) => void;
}

interface UseAutoSaveReturn<T> {
  save: (data: T) => Promise<void>;
  status: AutoSaveStatus;
}

/**
 * Custom hook for managing auto-save operations with status tracking
 * @param saveFunction - Async function to save data
 * @param onError - Optional error callback
 * @returns Object with save function and current status
 */
export function useAutoSave<T>({
  saveFunction,
  onError,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn<T> {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const save = useCallback(
    async (data: T) => {
      try {
        // Set status to saving
        setStatus('saving');

        // Call the save function
        await saveFunction(data);

        // Set status to saved
        setStatus('saved');

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Reset to idle after 2 seconds
        timeoutRef.current = setTimeout(() => {
          setStatus('idle');
        }, 2000);
      } catch (error) {
        // Set status to error
        setStatus('error');

        // Call error callback if provided
        if (onError && error instanceof Error) {
          onError(error);
        }
      }
    },
    [saveFunction, onError]
  );

  return { save, status };
}
