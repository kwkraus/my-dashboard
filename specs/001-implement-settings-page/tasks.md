# Implementation Tasks: Settings Page with Profile and Notification Management

**Feature Branch**: `001-implement-settings-page`  
**Date**: October 9, 2025  
**Status**: Ready for Implementation

## Overview

This document provides an actionable task list for implementing the Settings page with auto-save functionality. Tasks are organized by user story to enable independent implementation and testing of each feature increment.

## Task Summary

- **Total Tasks**: 28
- **Setup Tasks**: 6 (Phase 1)
- **Foundational Tasks**: 4 (Phase 2)
- **User Story 1 Tasks**: 7 (Phase 3) - Profile Management
- **User Story 2 Tasks**: 4 (Phase 4) - Notification Preferences
- **User Story 3 Tasks**: 3 (Phase 5) - Tab Navigation
- **Polish Tasks**: 4 (Phase 6)
- **Parallel Opportunities**: 15+ tasks can run in parallel within each phase
- **Estimated Total Time**: 6-8 hours

## User Story Mapping

| User Story | Priority | Tasks | Independent Test |
|------------|----------|-------|------------------|
| US1: Profile Management | P1 | T007-T013 | Navigate to Settings > Profile, edit field, verify auto-save persists |
| US2: Notification Preferences | P2 | T014-T017 | Navigate to Notifications tab, toggle switch, verify persists |
| US3: Tab Navigation | P3 | T018-T020 | Click between tabs, verify smooth transitions and validation blocking |

---

## Phase 1: Setup & Infrastructure

**Goal**: Install dependencies and create project structure

### T001: Install Required shadcn/ui Components [P]
**Story**: Setup  
**File**: Command line  
**Description**: Install missing shadcn/ui components needed for the Settings page  
**Acceptance**:
- Run `npx shadcn@latest add tabs` successfully
- Run `npx shadcn@latest add label` successfully
- Run `npx shadcn@latest add switch` successfully
- Verify components exist in `src/components/ui/`
- Verify no TypeScript errors in installed components

**Commands**:
```bash
npx shadcn@latest add tabs
npx shadcn@latest add label
npx shadcn@latest add switch
```

---

### T002: Create Type Definitions [P]
**Story**: Setup  
**File**: `src/types/settings.ts`  
**Description**: Define TypeScript interfaces for Profile, NotificationPreferences, and AutoSaveState  
**Acceptance**:
- `Profile` interface with firstName, lastName, email, mobilePhone (all strings)
- `ProfileField` type as keyof Profile
- `ProfileValidationErrors` interface with optional string fields
- `NotificationPreferences` interface with allUpdates, marketingUpdates (booleans)
- `NotificationField` type as keyof NotificationPreferences
- `AutoSaveStatus` type with 'idle' | 'saving' | 'saved' | 'error'
- All interfaces exported
- No TypeScript errors

**Code Reference**: See `quickstart.md` section 2

---

### T003: Create Validation Utilities [P]
**Story**: Setup  
**File**: `src/lib/validation.ts`  
**Description**: Implement email, phone, and required field validation functions  
**Acceptance**:
- `validateEmail(email: string)`: Returns null if valid, error string if invalid
- `validatePhone(phone: string)`: Returns null if valid, error string if invalid (US format, 10+ digits)
- `validateRequired(value: string, fieldName: string)`: Returns null if non-empty, error if empty
- `validateProfile(profile: Partial<Profile>)`: Returns ProfileValidationErrors object
- Email validation uses regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone validation allows spaces, hyphens, parentheses, requires 10+ digits
- All functions properly handle edge cases (empty strings, whitespace, special chars)
- No TypeScript errors

**Code Reference**: See `quickstart.md` section 3

---

### T004: Create useAutoSave Custom Hook [P]
**Story**: Setup  
**File**: `src/lib/hooks/useAutoSave.ts`  
**Description**: Implement custom hook for auto-save logic with status management  
**Acceptance**:
- Hook accepts `saveFunction` and optional `onError` callback
- Returns `{ save, status }` object
- `save` function sets status to 'saving', calls saveFunction, sets 'saved' on success
- 'saved' status clears to 'idle' after 2 seconds
- Sets status to 'error' on failure and calls onError callback
- Uses `useCallback` for save function to prevent unnecessary re-renders
- TypeScript properly typed with generic `<T>`
- No TypeScript errors

**Code Reference**: See `quickstart.md` section 4

---

### T005: Create Storage Service [P]
**Story**: Setup  
**File**: `src/lib/storage/settings-storage.ts`  
**Description**: Implement localStorage-based storage abstraction for settings data  
**Acceptance**:
- `getProfile()`: Async function returning Profile from localStorage or defaults
- `saveProfile(profile: Partial<Profile>)`: Async function merging and saving to localStorage
- `getNotifications()`: Async function returning NotificationPreferences or defaults
- `saveNotifications(prefs: Partial<NotificationPreferences>)`: Async function saving to localStorage
- Storage keys: 'user-profile' and 'user-notifications'
- Default profile has empty strings for all fields
- Default notifications: allUpdates=true, marketingUpdates=false
- Proper error handling for JSON parse failures
- No TypeScript errors

**Code Reference**: See `quickstart.md` section 5, `data-model.md` Storage Schema

---

### T006: Create AutoSaveIndicator Component [P]
**Story**: Setup  
**File**: `src/components/AutoSaveIndicator.tsx`  
**Description**: Create reusable component to display save status (Saving.../Saved/Error)  
**Acceptance**:
- Accepts `status: AutoSaveStatus` prop
- Displays spinner icon + "Saving..." when status='saving'
- Displays checkmark icon + "Saved" when status='saved'
- Displays error icon + "Error" when status='error'
- Displays nothing when status='idle'
- Uses Lucide React icons (Loader2, Check, AlertCircle)
- Styled with Tailwind CSS, subtle and inline
- Supports theme (light/dark) via CSS variables
- Uses `cn()` utility for conditional classes
- Component wrapped with React.memo for performance
- No TypeScript errors

**Dependencies**: T002 (types)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Goal**: Create base infrastructure that all user stories depend on

### T007: Create Settings Route Page
**Story**: Foundation  
**File**: `src/app/settings/page.tsx`  
**Description**: Create Next.js App Router page for /settings route (server component wrapper)  
**Acceptance**:
- Server component that imports and renders SettingsPage client component
- Sets page metadata (title: "Settings", description)
- Uses LayoutWrapper pattern with AppSidebar + AppHeader
- Handles initial data loading (calls getProfile and getNotifications)
- Passes loaded data as props to SettingsPage
- No "use client" directive (server component)
- No TypeScript errors

**Dependencies**: T005 (storage service)

---

### T008: Update AppSidebar Navigation
**Story**: Foundation  
**File**: `src/components/AppSidebar.tsx`  
**Description**: Add Settings navigation item to sidebar  
**Acceptance**:
- Import Settings icon from lucide-react
- Add navigation item with title="Settings", url="/settings", icon=Settings
- Navigation item appears in correct position (suggest after Dashboard)
- Active state highlighting works when on /settings route
- Icon displays correctly in light and dark themes
- No TypeScript errors

**Dependencies**: None (independent)

---

### T009: Write Unit Tests for Validation Utilities
**Story**: Foundation  
**File**: `__tests__/lib/validation.test.ts`  
**Description**: Test email, phone, and profile validation functions  
**Acceptance**:
- Test `validateEmail` with valid emails (returns null)
- Test `validateEmail` with invalid emails (returns error string)
- Test `validateEmail` with empty string (returns error)
- Test `validatePhone` with valid US formats (returns null)
- Test `validatePhone` with invalid formats (returns error)
- Test `validatePhone` with less than 10 digits (returns error)
- Test `validateRequired` with non-empty values (returns null)
- Test `validateRequired` with empty/whitespace (returns error)
- Test `validateProfile` with valid profile (returns empty errors object)
- Test `validateProfile` with multiple invalid fields (returns errors for each)
- All tests pass
- Test coverage >90% for validation.ts

**Dependencies**: T003 (validation utilities)

---

### T010: Write Unit Tests for useAutoSave Hook
**Story**: Foundation  
**File**: `__tests__/lib/hooks/useAutoSave.test.ts`  
**Description**: Test auto-save hook with success and error scenarios  
**Acceptance**:
- Test initial status is 'idle'
- Test status changes to 'saving' when save called
- Test status changes to 'saved' on successful save
- Test status returns to 'idle' after 2 seconds
- Test status changes to 'error' on save failure
- Test onError callback called on failure
- Test save function properly calls provided saveFunction
- Use React Testing Library's renderHook
- Use fake timers for timeout testing
- All tests pass
- Test coverage >90% for useAutoSave.ts

**Dependencies**: T004 (useAutoSave hook)

---

## Phase 3: User Story 1 - Profile Management (Priority: P1)

**Goal**: Implement profile viewing and editing with auto-save

**Independent Test**: Navigate to Settings > Profile tab, view current info, edit first name field, blur field, verify "Saving..." then "Saved" indicator appears, reload page, verify change persisted.

### T011: Create ProfileForm Component
**Story**: US1 - Profile Management  
**File**: `src/components/ProfileForm.tsx`  
**Description**: Create profile form with auto-save on blur and validation blocking  
**Acceptance**:
- Client component ("use client" directive)
- Accepts initial Profile data as prop
- Four input fields: First Name, Last Name, Email, Mobile Phone
- Uses shadcn Input and Label components
- Each field has AutoSaveIndicator next to it
- onBlur handler validates field, blocks blur if invalid (e.preventDefault + focus)
- onBlur saves valid field changes via useAutoSave hook
- Inline error messages displayed below invalid fields
- Error messages styled with text-red-500 (theme-aware)
- Form state managed with useState
- Validation errors prevent field blur and keep focus
- Auto-save indicator shows per field (saving/saved/error)
- Responsive layout (mobile-first)
- All fields required, validation via validateProfile
- No TypeScript errors

**Dependencies**: T002 (types), T003 (validation), T004 (useAutoSave), T005 (storage), T006 (AutoSaveIndicator)

---

### T012: Implement Validation Blocking Behavior
**Story**: US1 - Profile Management  
**File**: `src/components/ProfileForm.tsx` (enhancement)  
**Description**: Ensure validation errors block field blur and maintain focus  
**Acceptance**:
- When user blurs field with invalid data, e.preventDefault() called
- e.target.focus() called to return focus to invalid field
- Blur event does not trigger auto-save when validation fails
- Error message appears immediately on blur attempt (<500ms)
- Error message includes specific validation issue (e.g., "Invalid email format")
- Error message clears when field becomes valid
- Focus remains on invalid field until corrected
- Visual indicator (red border) on invalid field
- Behavior works for all four profile fields
- No console errors

**Dependencies**: T011 (ProfileForm component)

---

### T013: Write Unit Tests for ProfileForm Component
**Story**: US1 - Profile Management  
**File**: `__tests__/components/ProfileForm.test.tsx`  
**Description**: Test profile form rendering, validation, and auto-save  
**Acceptance**:
- Test component renders with initial profile data
- Test all four input fields display correct values
- Test editing a field updates local state
- Test blurring valid field triggers auto-save
- Test AutoSaveIndicator shows 'saving' then 'saved'
- Test blurring invalid field shows error message
- Test blurring invalid field does NOT trigger auto-save
- Test focus remains on invalid field after blur attempt
- Test correcting invalid field clears error and saves
- Test multiple fields can be edited sequentially
- Use React Testing Library (render, fireEvent, waitFor)
- Mock storage service functions
- All tests pass
- Test coverage >85% for ProfileForm.tsx

**Dependencies**: T011 (ProfileForm), T012 (validation blocking)

---

### T014: Write Integration Tests for Profile Auto-Save Flow
**Story**: US1 - Profile Management  
**File**: `__tests__/integration/profile-auto-save.test.tsx`  
**Description**: Test complete profile edit and auto-save workflow  
**Acceptance**:
- Test loading ProfileForm with data from storage
- Test editing first name, blurring, and verifying save to localStorage
- Test editing email with invalid format, verify error shown and save blocked
- Test correcting invalid email, verify save succeeds
- Test editing multiple fields sequentially, all save independently
- Test auto-save indicators appear and disappear correctly
- Test localStorage contains updated values after saves
- Use real storage service (not mocked)
- Use React Testing Library + localStorage spy
- All tests pass

**Dependencies**: T011 (ProfileForm), T012 (validation blocking), T005 (storage)

---

## Phase 4: User Story 2 - Notification Preferences (Priority: P2)

**Goal**: Implement notification toggle switches with instant auto-save

**Independent Test**: Navigate to Settings > Notifications tab, see toggles with current state, click "All Updates" toggle, verify "Saving..." then "Saved" indicator appears, reload page, verify toggle state persisted.

### T015: Create NotificationsForm Component
**Story**: US2 - Notification Preferences  
**File**: `src/components/NotificationsForm.tsx`  
**Description**: Create notification preferences form with toggle switches and instant save  
**Acceptance**:
- Client component ("use client" directive)
- Accepts initial NotificationPreferences as prop
- Two toggle switches: "All Updates" and "Marketing Updates"
- Uses shadcn Switch component
- Each toggle has Label and AutoSaveIndicator next to it
- onClick handler immediately saves toggle state via useAutoSave
- Auto-save indicator shows per toggle (saving/saved/error)
- Optimistic updates (toggle state changes immediately)
- Error state rolls back toggle on save failure
- Responsive layout (mobile-first)
- Proper labels and descriptions for each toggle
- WCAG accessible (proper labels, keyboard navigation)
- No TypeScript errors

**Dependencies**: T002 (types), T004 (useAutoSave), T005 (storage), T006 (AutoSaveIndicator)

---

### T016: Implement Optimistic Updates for Toggles
**Story**: US2 - Notification Preferences  
**File**: `src/components/NotificationsForm.tsx` (enhancement)  
**Description**: Implement optimistic UI updates with rollback on error  
**Acceptance**:
- Toggle state changes immediately when clicked (before save completes)
- Auto-save triggers immediately on toggle (no debounce needed initially)
- If save fails, toggle state rolls back to previous value
- Error indicator appears if save fails
- User can retry by toggling again
- No UI jank or flickering during save
- Works for both toggles independently
- No console errors

**Dependencies**: T015 (NotificationsForm component)

---

### T017: Write Unit Tests for NotificationsForm Component
**Story**: US2 - Notification Preferences  
**File**: `__tests__/components/NotificationsForm.test.tsx`  
**Description**: Test notification form rendering and instant auto-save  
**Acceptance**:
- Test component renders with initial notification preferences
- Test both toggle switches display correct initial state
- Test clicking toggle immediately updates UI (optimistic)
- Test AutoSaveIndicator shows 'saving' then 'saved'
- Test save failure rolls back toggle state
- Test error indicator appears on save failure
- Test clicking toggle again after error retries save
- Test both toggles work independently
- Use React Testing Library (render, fireEvent, waitFor)
- Mock storage service functions
- All tests pass
- Test coverage >85% for NotificationsForm.tsx

**Dependencies**: T015 (NotificationsForm), T016 (optimistic updates)

---

### T018: Write Integration Tests for Notifications Auto-Save Flow
**Story**: US2 - Notification Preferences  
**File**: `__tests__/integration/notifications-auto-save.test.tsx`  
**Description**: Test complete notification toggle and auto-save workflow  
**Acceptance**:
- Test loading NotificationsForm with data from storage
- Test clicking "All Updates" toggle, verify save to localStorage
- Test clicking "Marketing Updates" toggle, verify save to localStorage
- Test toggling both switches in sequence, both save independently
- Test auto-save indicators appear and disappear correctly
- Test localStorage contains updated values after toggles
- Test rapid toggling (click toggle multiple times quickly)
- Use real storage service (not mocked)
- Use React Testing Library + localStorage spy
- All tests pass

**Dependencies**: T015 (NotificationsForm), T016 (optimistic updates), T005 (storage)

---

## Phase 5: User Story 3 - Tab Navigation (Priority: P3)

**Goal**: Implement horizontal tab navigation with validation-aware switching

**Independent Test**: Navigate to Settings page, verify Profile tab selected by default, click Notifications tab, verify smooth transition and content change, enter invalid email in Profile tab, attempt to switch tabs, verify prevented with message.

### T019: Create SettingsPage Main Container Component
**Story**: US3 - Tab Navigation  
**File**: `src/components/SettingsPage.tsx`  
**Description**: Create main container with horizontal tabs for Profile and Notifications  
**Acceptance**:
- Client component ("use client" directive)
- Accepts initial Profile and NotificationPreferences as props
- Uses shadcn Tabs component with horizontal orientation
- Two tabs: "Profile" (default) and "Notifications"
- Profile tab renders ProfileForm component
- Notifications tab renders NotificationsForm component
- Tab state managed with useState (controlled component)
- onValueChange handler switches active tab
- Visual feedback: active tab highlighted with border/background
- Smooth transitions between tabs (60fps)
- Responsive layout (tabs stack on mobile if needed)
- Proper ARIA labels for accessibility
- No TypeScript errors

**Dependencies**: T011 (ProfileForm), T015 (NotificationsForm)

---

### T020: Implement Tab Switching Validation Check
**Story**: US3 - Tab Navigation  
**File**: `src/components/SettingsPage.tsx` (enhancement)  
**Description**: Prevent tab switching when validation errors exist in active tab  
**Acceptance**:
- Share validation error state between SettingsPage and ProfileForm
- Before allowing tab change, check if any profile validation errors exist
- If errors exist, prevent tab switch (don't call setActiveTab)
- Display toast/alert message: "Please correct validation errors before switching tabs"
- If no errors, allow tab switch normally
- Only block when switching FROM Profile tab (Notifications has no validation)
- Error checking occurs in onValueChange handler
- Works with keyboard navigation (Tab key)
- Message displayed for 3-5 seconds or until dismissed
- No TypeScript errors

**Dependencies**: T019 (SettingsPage), T011 (ProfileForm with validation)

---

### T021: Write Integration Tests for Tab Navigation
**Story**: US3 - Tab Navigation  
**File**: `__tests__/integration/tab-navigation.test.tsx`  
**Description**: Test tab switching with and without validation errors  
**Acceptance**:
- Test SettingsPage renders with Profile tab active by default
- Test clicking Notifications tab switches content
- Test clicking back to Profile tab switches content
- Test smooth transitions (no visual glitches)
- Test entering invalid email in Profile, attempting tab switch, verify prevented
- Test error message displays when tab switch blocked
- Test correcting email, attempting tab switch, verify allowed
- Test switching from Notifications to Profile (always allowed)
- Test keyboard navigation between tabs
- Use React Testing Library (render, fireEvent, screen)
- All tests pass

**Dependencies**: T019 (SettingsPage), T020 (validation check)

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Finalize UI polish, performance optimization, and E2E testing

### T022: Add Theme Support Verification [P]
**Story**: Polish  
**File**: All components  
**Description**: Verify all components support light and dark themes correctly  
**Acceptance**:
- Test all components in light theme (default)
- Test all components in dark theme (toggle via theme switcher)
- All text readable in both themes (contrast ratio ≥4.5:1)
- Form inputs properly styled in both themes
- Validation error messages readable in both themes
- Auto-save indicators visible in both themes
- Tab highlighting visible in both themes
- No hardcoded colors (all use CSS variables)
- Use existing next-themes integration
- No visual regressions

**Dependencies**: T019 (SettingsPage)

---

### T023: Optimize Component Performance [P]
**Story**: Polish  
**File**: All components  
**Description**: Apply performance optimizations to meet <100ms render target  
**Acceptance**:
- Wrap AutoSaveIndicator with React.memo
- Use useCallback for event handlers in ProfileForm and NotificationsForm
- Use useMemo for validation functions if needed
- Measure component render times with React DevTools Profiler
- ProfileForm initial render <80ms
- NotificationsForm initial render <50ms
- SettingsPage initial render <100ms
- Tab switching completes <50ms (60fps = 16.67ms per frame)
- Auto-save operations complete <2s
- No unnecessary re-renders during typing
- No console warnings about re-renders

**Dependencies**: T019 (SettingsPage), T011 (ProfileForm), T015 (NotificationsForm)

---

### T024: Add Accessibility Testing [P]
**Story**: Polish  
**File**: All components  
**Description**: Verify WCAG 2.1 AA compliance for all Settings page components  
**Acceptance**:
- All form inputs have proper labels (visible or aria-label)
- Error messages associated with fields via aria-describedby
- Tab navigation works with keyboard (Tab, Shift+Tab, Arrow keys)
- All interactive elements focusable and have focus indicators
- Focus order logical and predictable
- Screen reader announces validation errors
- Screen reader announces auto-save status changes
- Color contrast ratios ≥4.5:1 for text
- Toggle switches have proper ARIA roles and states
- Run axe-core accessibility tests (0 violations)
- Test with keyboard only (no mouse)
- Test with screen reader (NVDA or JAWS)

**Dependencies**: T019 (SettingsPage)

---

### T025: Write E2E Tests for Complete User Journeys
**Story**: Polish  
**File**: `__tests__/e2e/settings-complete-flow.spec.ts`  
**Description**: End-to-end tests covering all three user stories  
**Acceptance**:
- Test US1: Navigate to Settings, edit profile fields, verify auto-save, reload, verify persistence
- Test US2: Navigate to Notifications tab, toggle switches, verify auto-save, reload, verify persistence
- Test US3: Test tab navigation, test validation blocking tab switch
- Test complete journey: Edit profile → switch to notifications → toggle preference → back to profile
- Test error recovery: Enter invalid data → see error → correct → verify save
- Test with different browsers (Chrome, Firefox if available)
- Use Playwright for E2E tests
- Tests run in CI/CD pipeline
- All tests pass
- E2E tests complete in <2 minutes

**Dependencies**: T019 (SettingsPage), T011 (ProfileForm), T015 (NotificationsForm)

---

### T026: Create Settings Page Documentation [P]
**Story**: Polish  
**File**: `specs/001-implement-settings-page/IMPLEMENTATION.md`  
**Description**: Document implementation details, component architecture, and usage  
**Acceptance**:
- Component architecture diagram showing relationships
- Props documentation for each component
- State management explanation (controlled vs uncontrolled)
- Auto-save flow diagram
- Validation blocking flow diagram
- localStorage schema documentation
- Future API integration notes
- Known limitations and edge cases
- Performance optimization notes
- Accessibility implementation details
- Markdown format with code examples
- Links to related spec/plan/tasks files

**Dependencies**: T019 (SettingsPage) - can start earlier but finalize after implementation

---

## Dependency Graph

```
Setup Phase (Phase 1)
├── T001: Install shadcn components [P]
├── T002: Create type definitions [P]
├── T003: Create validation utilities [P]
├── T004: Create useAutoSave hook [P]
├── T005: Create storage service [P]
└── T006: Create AutoSaveIndicator [P]
    └── Depends on: T002

Foundation Phase (Phase 2)
├── T007: Create settings route page
│   └── Depends on: T005
├── T008: Update AppSidebar navigation
├── T009: Write validation unit tests
│   └── Depends on: T003
└── T010: Write useAutoSave unit tests
    └── Depends on: T004

User Story 1 - Profile (Phase 3)
├── T011: Create ProfileForm component
│   └── Depends on: T002, T003, T004, T005, T006
├── T012: Implement validation blocking
│   └── Depends on: T011
├── T013: Write ProfileForm unit tests
│   └── Depends on: T011, T012
└── T014: Write profile integration tests
    └── Depends on: T011, T012, T005

User Story 2 - Notifications (Phase 4)
├── T015: Create NotificationsForm component
│   └── Depends on: T002, T004, T005, T006
├── T016: Implement optimistic updates
│   └── Depends on: T015
├── T017: Write NotificationsForm unit tests
│   └── Depends on: T015, T016
└── T018: Write notifications integration tests
    └── Depends on: T015, T016, T005

User Story 3 - Tab Navigation (Phase 5)
├── T019: Create SettingsPage container
│   └── Depends on: T011, T015
├── T020: Implement tab validation check
│   └── Depends on: T019, T011
└── T021: Write tab navigation integration tests
    └── Depends on: T019, T020

Polish Phase (Phase 6)
├── T022: Theme support verification [P]
│   └── Depends on: T019
├── T023: Performance optimization [P]
│   └── Depends on: T019, T011, T015
├── T024: Accessibility testing [P]
│   └── Depends on: T019
├── T025: E2E tests
│   └── Depends on: T019, T011, T015
└── T026: Documentation [P]
    └── Depends on: T019
```

## Parallel Execution Opportunities

### Phase 1 (Setup) - All Parallel
- T001, T002, T003, T004, T005 can run simultaneously
- T006 starts after T002 completes
- Estimated time: 30-45 minutes with parallelization

### Phase 2 (Foundation) - Mixed
- T007, T008 can run in parallel
- T009 runs in parallel (depends only on T003)
- T010 runs in parallel (depends only on T004)
- Estimated time: 30-45 minutes

### Phase 3 (US1) - Sequential with Test Parallelization
- T011 must complete first
- T012 enhances T011 (sequential)
- T013, T014 can run in parallel after T012
- Estimated time: 1.5-2 hours

### Phase 4 (US2) - Sequential with Test Parallelization
- T015 must complete first
- T016 enhances T015 (sequential)
- T017, T018 can run in parallel after T016
- Estimated time: 1-1.5 hours

### Phase 5 (US3) - Sequential with Test Parallelization
- T019 depends on T011 + T015 (must wait for Phase 3 & 4)
- T020 enhances T019 (sequential)
- T021 runs after T020
- Estimated time: 1 hour

### Phase 6 (Polish) - Mostly Parallel
- T022, T023, T024, T026 can run in parallel
- T025 (E2E) should run after all components complete
- Estimated time: 1-1.5 hours

## Implementation Strategy

### MVP Scope (User Story 1 Only)
For a minimal viable product, implement only **Phase 1, Phase 2, and Phase 3** (US1):
- Setup infrastructure (T001-T006)
- Foundation (T007-T010)
- Profile management with auto-save (T011-T014)
- Time estimate: 3-4 hours
- Delivers: Working Settings page with profile editing and auto-save

### Incremental Delivery
After MVP, add features incrementally:
1. **Iteration 2**: Add US2 (Phase 4) - Notification toggles (1-1.5 hours)
2. **Iteration 3**: Add US3 (Phase 5) - Tab navigation (1 hour)
3. **Iteration 4**: Polish (Phase 6) - Theme, performance, accessibility, E2E (1-1.5 hours)

### Quality Gates
After each phase, verify:
- [ ] All TypeScript compilation passes (no errors)
- [ ] All unit/integration tests pass
- [ ] ESLint passes with no warnings
- [ ] Manual testing confirms acceptance criteria
- [ ] Performance targets met (Phase 3+)
- [ ] Accessibility standards met (Phase 6)

## Testing Summary

| Test Type | Phase | Files | Purpose |
|-----------|-------|-------|---------|
| Unit Tests | 2, 3, 4 | validation.test.ts, useAutoSave.test.ts, ProfileForm.test.tsx, NotificationsForm.test.tsx | Test individual functions and components in isolation |
| Integration Tests | 3, 4, 5 | profile-auto-save.test.tsx, notifications-auto-save.test.tsx, tab-navigation.test.tsx | Test component interactions with real storage |
| E2E Tests | 6 | settings-complete-flow.spec.ts | Test complete user journeys across all features |
| Accessibility Tests | 6 | Automated (axe-core) + Manual | Verify WCAG 2.1 AA compliance |

**Total Test Files**: 8  
**Expected Test Coverage**: >85% for components, >90% for utilities

---

## Getting Started

**Recommended execution order**:

1. Start with Phase 1 (Setup) - all tasks can run in parallel
2. Complete Phase 2 (Foundation) - enables all user stories
3. Implement Phase 3 (US1) - delivers MVP
4. Add Phase 4 (US2) - extends functionality
5. Add Phase 5 (US3) - completes feature
6. Polish with Phase 6 - production-ready

**Quick start command**:
```bash
# Start with T001
npx shadcn@latest add tabs label switch
```

**Next**: Proceed to T002 (Create Type Definitions)
