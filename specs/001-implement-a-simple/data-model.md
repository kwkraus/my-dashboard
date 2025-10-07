# Data Model: Search Dialog Interface

**Feature**: Search Dialog Interface  
**Date**: October 7, 2025  
**Phase**: Phase 1 - Data Model Design

## Component State Models

### SearchDialog State
```typescript
interface SearchDialogState {
  isOpen: boolean;          // Dialog open/closed state
  searchQuery: string;      // Current search input value
  isLoading?: boolean;      // Future: loading state for search results
}
```

**Validation Rules**:
- `isOpen`: Boolean, default false
- `searchQuery`: String, no length restrictions (handled by UI constraints)
- `isLoading`: Boolean, optional, default false

**State Transitions**:
- `closed` → `open`: User clicks search icon or presses Ctrl+K/Cmd+K
- `open` → `closed`: User clicks outside, presses Escape, or clicks close button
- `searchQuery` updates: Real-time as user types (controlled input)

### SearchTrigger State
```typescript
interface SearchTriggerState {
  isHovered: boolean;       // Show keyboard hint on hover
  isPressed: boolean;       // Visual feedback during click
}
```

**Validation Rules**:
- `isHovered`: Boolean, default false
- `isPressed`: Boolean, default false

**State Transitions**:
- `hover` states: Mouse enter/leave events
- `pressed` states: Mouse down/up events

## Component Props Interfaces

### SearchDialog Props
```typescript
interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  children?: React.ReactNode;     // Future: search results content
}
```

### SearchTrigger Props
```typescript
interface SearchTriggerProps {
  onClick: () => void;
  className?: string;
  'aria-label'?: string;
}
```

### useKeyboardShortcut Hook
```typescript
interface UseKeyboardShortcutProps {
  key: string;              // 'k' for Ctrl+K/Cmd+K
  ctrlKey?: boolean;        // true for Ctrl+K
  metaKey?: boolean;        // true for Cmd+K
  callback: () => void;     // Function to execute
  enabled?: boolean;        // Enable/disable shortcut
}

interface UseKeyboardShortcutReturn {
  // No return value - side effect only hook
}
```

## Event Models

### Keyboard Events
```typescript
interface KeyboardShortcutEvent {
  key: string;              // Key pressed ('k')
  ctrlKey: boolean;         // Ctrl modifier state
  metaKey: boolean;         // Cmd modifier state (Mac)
  altKey: boolean;          // Alt modifier state
  shiftKey: boolean;        // Shift modifier state
  target: EventTarget;      // Event target element
}
```

### Dialog Events
```typescript
interface DialogOpenEvent {
  trigger: 'keyboard' | 'click';    // How dialog was opened
  timestamp: number;                // When dialog was opened
}

interface DialogCloseEvent {
  method: 'escape' | 'clickOutside' | 'closeButton';  // How dialog was closed
  timestamp: number;                                   // When dialog was closed
  searchQuery: string;                                 // Search query when closed
}
```

## CSS Custom Properties Model

### Theme-Aware Dialog Styles
```css
:root {
  /* Dialog backdrop styles */
  --dialog-backdrop-blur: 8px;
  --dialog-backdrop-opacity: 0.8;
  
  /* Dialog container styles */
  --dialog-max-width: 500px;
  --dialog-border-radius: 8px;
  --dialog-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Animation durations */
  --dialog-enter-duration: 200ms;
  --dialog-exit-duration: 150ms;
}

[data-theme="dark"] {
  --dialog-backdrop-opacity: 0.9;
  --dialog-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

## Component Relationships

```
AppHeader
└── SearchTrigger
    └── [triggers] SearchDialog
        ├── Dialog (Radix UI)
        ├── DialogContent
        │   ├── SearchInput
        │   ├── CloseButton
        │   └── KeyboardHint
        └── DialogOverlay (backdrop)

useKeyboardShortcut (hook)
└── [triggers] SearchDialog.open()
```

## Future Extension Points

### Search Results (Phase 2)
```typescript
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url?: string;
  type: 'page' | 'component' | 'action';
  category?: string;
}

interface SearchDialogState {
  // ... existing fields
  results: SearchResult[];
  selectedIndex: number;    // Keyboard navigation
  hasSearched: boolean;     // Show results vs empty state
}
```

### Search History (Future)
```typescript
interface SearchHistory {
  queries: string[];
  maxItems: number;         // Default 10
  timestamp: number[];      // When each query was searched
}
```

### Search Analytics (Future)
```typescript
interface SearchAnalytics {
  searchPerformed: (query: string) => void;
  dialogOpened: (trigger: 'keyboard' | 'click') => void;
  dialogClosed: (method: string, timeOpen: number) => void;
}
```

## Validation and Constraints

### Input Validation
- Search query: No validation required (demo mode)
- Maximum input length: Browser default (usually ~524,288 characters)
- Special characters: All allowed

### UI Constraints
- Dialog max width: 500px
- Dialog min width: 320px (mobile breakpoint)
- Backdrop blur: 8px with graceful degradation
- Animation duration: 200ms enter, 150ms exit
- z-index: Managed by Radix UI Portal (typically 9999+)

### Performance Constraints
- Dialog open time: <100ms
- Input responsiveness: <16ms (60fps)
- Memory usage: Minimal (no result caching in demo mode)
- Event listener cleanup: Required on component unmount