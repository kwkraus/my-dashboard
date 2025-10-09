# Data Model: Settings Page

**Feature**: Settings Page with Profile and Notification Management  
**Date**: October 9, 2025  
**Status**: Complete

## Overview

This document defines the data structures for user profile information and notification preferences, along with validation rules and state management patterns.

## Entities

### 1. Profile

Represents a user's personal information.

**Fields**:

| Field | Type | Required | Validation | Default |
|-------|------|----------|------------|---------|
| firstName | string | Yes | Non-empty, max 100 chars | '' |
| lastName | string | Yes | Non-empty, max 100 chars | '' |
| email | string | Yes | RFC 5322 email format | '' |
| mobilePhone | string | Yes | US phone format, min 10 digits | '' |

**Validation Rules**:
- `firstName`: Must not be empty after trim, max 100 characters
- `lastName`: Must not be empty after trim, max 100 characters
- `email`: Must match email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `mobilePhone`: Must contain at least 10 digits, allows spaces, hyphens, parentheses

**TypeScript Interface**:
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
```

**Example**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobilePhone": "(555) 123-4567"
}
```

---

### 2. NotificationPreferences

Represents a user's notification opt-in preferences.

**Fields**:

| Field | Type | Required | Validation | Default |
|-------|------|----------|------------|---------|
| allUpdates | boolean | Yes | Boolean value | true |
| marketingUpdates | boolean | Yes | Boolean value | false |

**Validation Rules**:
- Both fields must be boolean values
- No additional validation required (toggle switches ensure boolean type)

**TypeScript Interface**:
```typescript
export interface NotificationPreferences {
  allUpdates: boolean;
  marketingUpdates: boolean;
}

export type NotificationField = keyof NotificationPreferences;
```

**Example**:
```json
{
  "allUpdates": true,
  "marketingUpdates": false
}
```

---

### 3. AutoSaveState

Represents the state of an auto-save operation for UI feedback.

**States**:

| State | Description | UI Display |
|-------|-------------|------------|
| idle | No save operation in progress | No indicator |
| saving | Save operation in progress | "Saving..." spinner |
| saved | Save completed successfully | "Saved" checkmark (2s) |
| error | Save operation failed | "Error" icon with retry |

**TypeScript Interface**:
```typescript
export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface AutoSaveState {
  status: AutoSaveStatus;
  error?: string;
  field?: ProfileField | NotificationField;
}
```

---

### 4. SettingsFormState

Represents the complete state of the settings forms.

**TypeScript Interface**:
```typescript
export interface SettingsFormState {
  profile: Profile;
  notifications: NotificationPreferences;
  profileErrors: ProfileValidationErrors;
  profileSaveStates: Record<ProfileField, AutoSaveStatus>;
  notificationSaveStates: Record<NotificationField, AutoSaveStatus>;
  activeTab: 'profile' | 'notifications';
}
```

**Initial State**:
```typescript
export const INITIAL_SETTINGS_STATE: SettingsFormState = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
  },
  notifications: {
    allUpdates: true,
    marketingUpdates: false,
  },
  profileErrors: {},
  profileSaveStates: {
    firstName: 'idle',
    lastName: 'idle',
    email: 'idle',
    mobilePhone: 'idle',
  },
  notificationSaveStates: {
    allUpdates: 'idle',
    marketingUpdates: 'idle',
  },
  activeTab: 'profile',
};
```

## State Transitions

### Profile Field State Machine

```
Initial State: idle

idle → saving
  Trigger: User blurs field with valid data
  Action: Call save API, show "Saving..." indicator

saving → saved
  Trigger: Save API succeeds
  Action: Show "Saved" checkmark for 2 seconds

saving → error
  Trigger: Save API fails
  Action: Show error indicator, allow retry

saved → idle
  Trigger: 2 seconds elapsed
  Action: Clear indicator

error → saving
  Trigger: User retries (re-blurs field or clicks retry)
  Action: Attempt save again

idle → idle (validation error)
  Trigger: User blurs field with invalid data
  Action: Prevent blur, show validation error, keep focus
  Note: No state transition, save not attempted
```

### Notification Toggle State Machine

```
Initial State: idle

idle → saving
  Trigger: User clicks toggle
  Action: Optimistically update UI, call save API immediately

saving → saved
  Trigger: Save API succeeds
  Action: Show "Saved" checkmark for 2 seconds

saving → error
  Trigger: Save API fails
  Action: Rollback UI state, show error indicator

saved → idle
  Trigger: 2 seconds elapsed
  Action: Clear indicator

error → saving
  Trigger: User clicks toggle again (retry)
  Action: Attempt save again
```

## Relationships

```
User (1) ─── has ───> (1) Profile
User (1) ─── has ───> (1) NotificationPreferences

SettingsFormState (1) ─── contains ───> (1) Profile
SettingsFormState (1) ─── contains ───> (1) NotificationPreferences
SettingsFormState (1) ─── contains ───> (N) AutoSaveState (per field)
```

## Storage Schema

### localStorage Keys

For initial implementation using localStorage:

| Key | Type | Description |
|-----|------|-------------|
| `user-profile` | JSON string | Serialized Profile object |
| `user-notifications` | JSON string | Serialized NotificationPreferences object |

### Future API Schema

For future backend integration, see `contracts/settings-api.yaml`.

## Validation Functions

All validation functions are centralized in `src/lib/validation.ts`:

```typescript
// Validation function signatures
export function validateEmail(email: string): string | null;
export function validatePhone(phone: string): string | null;
export function validateRequired(value: string, fieldName: string): string | null;
export function validateProfile(profile: Partial<Profile>): ProfileValidationErrors;
```

**Returns**:
- `null` if validation passes
- `string` error message if validation fails

## Performance Considerations

- Profile object is small (~200 bytes), no pagination needed
- NotificationPreferences is tiny (~50 bytes)
- Auto-save debouncing not needed for blur-based saves (single event)
- Toggle debouncing: 300ms to handle rapid clicks
- localStorage operations are synchronous but fast for small data
- Future API calls should use optimistic updates to maintain <2s target

## Migration Strategy

When transitioning from localStorage to API:

1. **Phase 1** (Current): localStorage implementation
   - Data stored in browser localStorage
   - Synchronous operations wrapped in Promise for consistency
   - Keys: `user-profile`, `user-notifications`

2. **Phase 2** (Future): Backend API integration
   - Replace storage implementation in `useAutoSave` hook
   - Keep same interface: `save(data)` returns Promise
   - Add authentication headers
   - Handle network errors gracefully
   - No changes to component code required

**Backward compatibility**: Export storage interface to allow swapping implementations without changing consuming code.

```typescript
// Storage abstraction
export interface SettingsStorage {
  getProfile(): Promise<Profile>;
  saveProfile(profile: Partial<Profile>): Promise<void>;
  getNotifications(): Promise<NotificationPreferences>;
  saveNotifications(prefs: Partial<NotificationPreferences>): Promise<void>;
}
```
