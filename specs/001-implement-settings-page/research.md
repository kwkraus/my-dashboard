# Research: Settings Page Auto-Save Implementation

**Feature**: Settings Page with Profile and Notification Management  
**Date**: October 9, 2025  
**Status**: Complete

## Research Questions

### 1. Auto-Save Implementation Pattern for React Forms

**Decision**: Use controlled components with `onBlur` handlers and debounced auto-save with React hooks

**Rationale**:
- Next.js 15 with React 19 requires client components for interactive forms
- `onBlur` event provides clear trigger point for auto-save on field blur
- Custom `useAutoSave` hook encapsulates save logic with loading states
- Controlled inputs maintain single source of truth in React state
- Optimistic updates provide immediate feedback while async save completes

**Alternatives considered**:
- **Form libraries (React Hook Form, Formik)**: Rejected due to complexity overhead for simple 4-field form; auto-save pattern better handled with custom hooks
- **Uncontrolled forms with refs**: Rejected as it conflicts with validation blocking blur requirement
- **Server Actions only**: Rejected as real-time validation feedback requires client-side logic

**Implementation approach**:
```typescript
// Custom hook pattern
const useAutoSave = (saveFunction, delay = 300) => {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  const save = async (data) => {
    setStatus('saving');
    try {
      await saveFunction(data);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      setStatus('error');
    }
  };
  
  return { save, status };
};
```

### 2. Validation Blocking Pattern

**Decision**: Prevent default blur behavior using `e.preventDefault()` in onBlur handler when validation fails

**Rationale**:
- Spec requires blocking field blur until validation passes
- `e.preventDefault()` + `e.target.focus()` keeps focus on invalid field
- Inline error messages displayed via state, positioned near field
- Pattern aligns with WCAG 2.1 AA accessibility (immediate feedback, clear errors)

**Alternatives considered**:
- **Allow blur, show error after**: Rejected as spec explicitly requires blocking blur
- **Modal dialog for errors**: Rejected as spec requires subtle inline indicators
- **Validation on submit only**: Rejected as no submit button exists (auto-save design)

**Implementation approach**:
```typescript
const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const error = validateField(name, value);
  
  if (error) {
    e.preventDefault();
    setErrors(prev => ({ ...prev, [name]: error }));
    e.target.focus(); // Keep focus on invalid field
    return;
  }
  
  // Clear error and trigger auto-save
  setErrors(prev => ({ ...prev, [name]: '' }));
  await save({ [name]: value });
};
```

### 3. Tab Navigation with Validation State

**Decision**: Check validation state in tab click handler, prevent navigation if errors exist

**Rationale**:
- shadcn/ui Tabs component supports controlled `value` prop
- Check for validation errors before allowing `onValueChange`
- Display toast/alert message when tab change blocked
- Maintains form integrity as specified in FR-017

**Alternatives considered**:
- **Allow navigation, preserve invalid state**: Rejected per spec requirement
- **Auto-correct invalid data**: Rejected as it may cause unexpected data changes
- **Clear invalid data on navigation**: Rejected as user loses unsaved work

**Implementation approach**:
```typescript
const handleTabChange = (newTab: string) => {
  // Check if any validation errors exist
  if (Object.values(errors).some(error => error !== '')) {
    toast.error('Please correct validation errors before switching tabs');
    return;
  }
  setActiveTab(newTab);
};
```

### 4. shadcn/ui Components Required

**Decision**: Use Tabs, Input, Label, Switch, and add if not present

**Rationale**:
- shadcn/ui provides accessible, theme-aware components
- Tabs component supports horizontal orientation required by spec
- Switch component ideal for notification toggles
- All components follow "New York" style variant per project standards
- Radix UI primitives ensure WCAG compliance

**Components to add** (if missing):
```bash
npx shadcn@latest add tabs
npx shadcn@latest add label  
npx shadcn@latest add switch
```

**Alternatives considered**:
- **Custom tab component**: Rejected due to accessibility complexity
- **Headless UI**: Rejected as shadcn/ui already established in project
- **Checkbox instead of Switch**: Rejected as Switch better represents on/off states

### 5. Data Storage Strategy

**Decision**: Initial implementation uses localStorage, with API contract defined for future backend

**Rationale**:
- Spec allows mocking initially ("will be mocked for initial implementation")
- localStorage provides persistence for demo/testing without backend dependency
- Clear API contracts defined in Phase 1 enable easy backend integration later
- Optimistic updates work identically with localStorage or API calls

**Alternatives considered**:
- **In-memory only**: Rejected as changes wouldn't persist across page reloads
- **Require backend first**: Rejected as spec allows mocking, delays development
- **Session storage**: Rejected as data should persist across sessions

**Implementation approach**:
```typescript
// Storage abstraction for easy swap
interface SettingsStorage {
  getProfile(): Promise<Profile>;
  saveProfile(profile: Partial<Profile>): Promise<void>;
  getNotifications(): Promise<NotificationPreferences>;
  saveNotifications(prefs: NotificationPreferences): Promise<void>;
}

// Initial localStorage implementation
class LocalStorageSettings implements SettingsStorage {
  async getProfile() {
    const data = localStorage.getItem('user-profile');
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  }
  
  async saveProfile(profile: Partial<Profile>) {
    const current = await this.getProfile();
    localStorage.setItem('user-profile', JSON.stringify({ ...current, ...profile }));
  }
  
  // Similar for notifications...
}
```

### 6. Email and Phone Validation

**Decision**: Use standard regex patterns with TypeScript validation utilities

**Rationale**:
- Email: RFC 5322 simplified regex (standard web pattern)
- Phone: US format with flexible formatting (parentheses, hyphens, spaces allowed)
- Centralized in `@/lib/validation.ts` for reusability
- Type-safe error messages returned

**Validation patterns**:
```typescript
// lib/validation.ts
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  // Allow digits, spaces, parentheses, hyphens
  const phoneRegex = /^[\d\s\(\)\-]{10,}$/;
  if (!phone.trim()) return 'Phone number is required';
  if (!phoneRegex.test(phone)) return 'Invalid phone format';
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) return 'Phone must have at least 10 digits';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
};
```

**Alternatives considered**:
- **Validator.js library**: Rejected as overkill for 2 validation types
- **International phone validation**: Deferred per spec assumption (US format)
- **Real-time validation (onChange)**: Rejected as spec requires validation on blur

## Best Practices Summary

### Next.js 15 + React 19 Patterns
- Use "use client" directive for interactive components
- Server components for initial data loading wrapper
- Client components for forms with state management
- Leverage React 19 features: useOptimistic for optimistic updates

### Auto-Save UX Patterns
- Debounce rapid changes (not needed for blur-based, but good for toggles)
- Clear visual feedback (inline indicators)
- Graceful error handling with retry options
- Optimistic updates for perceived performance

### Form Validation Best Practices
- Validate on blur, not on change (reduces noise)
- Block blur when validation fails (ensures data integrity)
- Clear, actionable error messages
- Accessible error announcements for screen readers

### Performance Optimization
- Memoize validation functions with useCallback
- Debounce auto-save for toggle rapid clicks
- Use React.memo for AutoSaveIndicator to prevent unnecessary rerenders
- Code split settings page (already isolated by route)

### Testing Strategy
- Unit tests: validation logic, custom hooks (useAutoSave, useFormValidation)
- Integration tests: form interactions, auto-save flows, error states
- E2E tests: complete user journeys with validation, tab switching, persistence
- Accessibility tests: keyboard navigation, screen reader support

## Open Questions

None - all technical decisions resolved through research phase.
