# Quickstart: Settings Page Implementation

**Feature**: Settings Page with Profile and Notification Management  
**Date**: October 9, 2025  
**Estimated Time**: 6-8 hours for core implementation

## Prerequisites

- Next.js 15 project with App Router (already set up)
- shadcn/ui installed with "New York" style (already configured)
- TypeScript strict mode enabled (already configured)
- Existing components: LayoutWrapper, AppSidebar, AppHeader

## Setup Steps

### 1. Install Required shadcn/ui Components (5 minutes)

```bash
# Install missing shadcn components if not present
npx shadcn@latest add tabs
npx shadcn@latest add label
npx shadcn@latest add switch

# Verify existing components
# - input (should already exist)
# - button (should already exist)
# - card (should already exist)
```

### 2. Create Type Definitions (10 minutes)

Create `src/types/settings.ts`:

```typescript
export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
}

export type ProfileField = keyof Profile;

export interface ProfileValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobilePhone?: string;
}

export interface NotificationPreferences {
  allUpdates: boolean;
  marketingUpdates: boolean;
}

export type NotificationField = keyof NotificationPreferences;

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';
```

### 3. Create Validation Utilities (20 minutes)

Create `src/lib/validation.ts`:

```typescript
import { Profile, ProfileValidationErrors } from '@/types/settings';

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePhone = (phone: string): string | null => {
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

export const validateProfile = (profile: Partial<Profile>): ProfileValidationErrors => {
  const errors: ProfileValidationErrors = {};
  
  if (profile.firstName !== undefined) {
    const error = validateRequired(profile.firstName, 'First name');
    if (error) errors.firstName = error;
  }
  
  if (profile.lastName !== undefined) {
    const error = validateRequired(profile.lastName, 'Last name');
    if (error) errors.lastName = error;
  }
  
  if (profile.email !== undefined) {
    const error = validateEmail(profile.email);
    if (error) errors.email = error;
  }
  
  if (profile.mobilePhone !== undefined) {
    const error = validatePhone(profile.mobilePhone);
    if (error) errors.mobilePhone = error;
  }
  
  return errors;
};
```

### 4. Create Custom Hooks (30 minutes)

Create `src/lib/hooks/useAutoSave.ts`:

```typescript
import { useState, useCallback } from 'react';
import type { AutoSaveStatus } from '@/types/settings';

export const useAutoSave = <T>(
  saveFunction: (data: T) => Promise<void>,
  onError?: (error: Error) => void
) => {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');

  const save = useCallback(async (data: T) => {
    setStatus('saving');
    try {
      await saveFunction(data);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      setStatus('error');
      if (onError) {
        onError(error instanceof Error ? error : new Error('Save failed'));
      }
    }
  }, [saveFunction, onError]);

  return { save, status };
};
```

### 5. Create Storage Service (20 minutes)

Create `src/lib/storage/settings-storage.ts`:

```typescript
import type { Profile, NotificationPreferences } from '@/types/settings';

const STORAGE_KEYS = {
  PROFILE: 'user-profile',
  NOTIFICATIONS: 'user-notifications',
} as const;

const DEFAULT_PROFILE: Profile = {
  firstName: '',
  lastName: '',
  email: '',
  mobilePhone: '',
};

const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  allUpdates: true,
  marketingUpdates: false,
};

export const getProfile = async (): Promise<Profile> => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : DEFAULT_PROFILE;
};

export const saveProfile = async (profile: Partial<Profile>): Promise<void> => {
  const current = await getProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
};

export const getNotifications = async (): Promise<NotificationPreferences> => {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return data ? JSON.parse(data) : DEFAULT_NOTIFICATIONS;
};

export const saveNotifications = async (prefs: Partial<NotificationPreferences>): Promise<void> => {
  const current = await getNotifications();
  const updated = { ...current, ...prefs };
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
};
```

### 6. Create Components (2-3 hours)

**Order of implementation**:

1. **AutoSaveIndicator.tsx** (30 min)
2. **ProfileForm.tsx** (60 min)
3. **NotificationsForm.tsx** (30 min)
4. **SettingsPage.tsx** (45 min)
5. **app/settings/page.tsx** (15 min)

See `data-model.md` and `research.md` for detailed component patterns.

### 7. Update Navigation (15 minutes)

Update `src/components/AppSidebar.tsx` to include Settings link:

```typescript
// Add to navigation items
{
  title: "Settings",
  url: "/settings",
  icon: Settings, // Import from lucide-react
}
```

### 8. Testing (2-3 hours)

Create tests in this order:

1. **validation.test.ts** (30 min)
2. **useAutoSave.test.ts** (30 min)
3. **ProfileForm.test.tsx** (45 min)
4. **NotificationsForm.test.tsx** (30 min)
5. **settings-auto-save.spec.ts (E2E)** (60 min)

## Development Workflow

### Day 1 (4 hours)
- Setup: Install components and create utilities (1 hour)
- Create hooks and storage service (1 hour)
- Build AutoSaveIndicator and ProfileForm (1.5 hours)
- Basic testing for validation (30 min)

### Day 2 (4 hours)
- Build NotificationsForm and SettingsPage (1.5 hours)
- Update navigation (15 min)
- Create comprehensive tests (2 hours)
- Manual QA and refinements (15 min)

## Testing Checklist

### Manual Testing

- [ ] Navigate to /settings from dashboard
- [ ] Profile tab is selected by default
- [ ] All profile fields display correctly
- [ ] Edit first name, blur field → see "Saving..." then "Saved"
- [ ] Enter invalid email → blur blocked, error shown, focus retained
- [ ] Correct invalid email → blur allowed, auto-saves
- [ ] Try to switch tabs with invalid data → prevented with message
- [ ] Switch to Notifications tab → toggles display correctly
- [ ] Click toggle → see "Saving..." then "Saved"
- [ ] Reload page → all changes persisted
- [ ] Test in light and dark themes
- [ ] Test on mobile (responsive layout)
- [ ] Test keyboard navigation (Tab, Enter, Arrow keys)

### Automated Testing

Run tests:

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Linting
npm run lint
```

## Performance Targets

- [ ] Component render < 100ms
- [ ] Auto-save operations < 2s
- [ ] Tab transitions 60fps
- [ ] Validation feedback < 500ms
- [ ] Lighthouse score > 90

## Troubleshooting

### Issue: Blur event not preventing
**Solution**: Ensure `e.preventDefault()` called before `e.target.focus()`

### Issue: Auto-save indicator not clearing
**Solution**: Check timeout cleanup in useAutoSave hook

### Issue: Validation errors not showing
**Solution**: Verify error state management and conditional rendering

### Issue: Tab navigation not blocked
**Solution**: Check validation error state in handleTabChange

## Next Steps After Implementation

1. **Backend Integration**: Replace localStorage with API calls
2. **Error Logging**: Add analytics for auto-save failures
3. **Advanced Features**: Email/phone verification workflows
4. **Performance Monitoring**: Add metrics for auto-save timing

## Resources

- **Spec**: [spec.md](./spec.md)
- **Research**: [research.md](./research.md)
- **Data Model**: [data-model.md](./data-model.md)
- **API Contract**: [contracts/settings-api.yaml](./contracts/settings-api.yaml)
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Next.js 15 Docs**: https://nextjs.org/docs
