import { useEffect, useCallback } from 'react'

interface UseKeyboardShortcutProps {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  callback: () => void
}

/**
 * Custom hook for handling global keyboard shortcuts
 * Automatically detects platform for Mac vs Windows/Linux modifier keys
 * Provides proper event listener lifecycle management
 */
export function useKeyboardShortcut({ 
  key, 
  ctrlKey = false, 
  metaKey = false, 
  callback 
}: UseKeyboardShortcutProps) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Prevent triggering in input elements unless it's our specific shortcut
    const isInputElement = (event.target as HTMLElement)?.tagName === 'INPUT' ||
                          (event.target as HTMLElement)?.tagName === 'TEXTAREA' ||
                          (event.target as HTMLElement)?.contentEditable === 'true'
    
    // For global shortcuts like Ctrl+K, we want to trigger even in input elements
    const isGlobalShortcut = (ctrlKey || metaKey) && key.toLowerCase() === 'k'
    
    if (isInputElement && !isGlobalShortcut) {
      return
    }

    const keyMatches = event.key.toLowerCase() === key.toLowerCase()
    
    // Check if it's the intended combination
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const correctModifier = isMac ? event.metaKey : event.ctrlKey
    
    if (keyMatches && (ctrlKey || metaKey) && correctModifier) {
      event.preventDefault()
      event.stopPropagation()
      callback()
    } else if (keyMatches && !ctrlKey && !metaKey && !event.ctrlKey && !event.metaKey && !event.altKey) {
      // Handle simple key presses without modifiers
      event.preventDefault()
      callback()
    }
  }, [key, ctrlKey, metaKey, callback])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  // Utility function to get the correct key display for the current platform
  const getKeyDisplay = useCallback(() => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    if (ctrlKey || metaKey) {
      return isMac ? `⌘${key.toUpperCase()}` : `Ctrl+${key.toUpperCase()}`
    }
    return key.toUpperCase()
  }, [key, ctrlKey, metaKey])

  return { getKeyDisplay }
}