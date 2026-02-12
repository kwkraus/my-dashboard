# Implementation Plan: Settings Page with Profile and Notification Management

**Branch**: `001-implement-settings-page` | **Date**: October 9, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-implement-settings-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a Settings page with horizontal tab navigation for Profile and Notification management. Profile section includes auto-save form fields (First Name, Last Name, Email, Mobile Phone) with inline validation. Notifications section includes two toggle switches (All Updates, Marketing Updates) with instant save. Auto-save triggers on field blur for profile fields and immediately on toggle for notifications. Validation errors block field blur and tab navigation until corrected. All changes display subtle inline "Saving..."/"Saved" indicators.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 15 (App Router)  
**Primary Dependencies**: React 19, shadcn/ui (Radix UI primitives), next-themes, Tailwind CSS v4, Lucide React (icons)  
**Storage**: Mock data initially (localStorage for client-side persistence), future backend API endpoints for profile/notifications  
**Testing**: React Testing Library, Jest (component unit tests), Playwright (E2E for auto-save flows)  
**Target Platform**: Web (modern browsers), responsive mobile-first design  
**Project Type**: Web application (Next.js App Router with server/client components)  
**Performance Goals**: <100ms component render, <2s auto-save operations, 60fps tab transitions, maintain Lighthouse >90  
**Constraints**: Must block field blur on validation errors, <500ms validation feedback, auto-save within 2 seconds, no explicit save buttons  
**Scale/Scope**: Single settings page with 2 tabs, 4 form fields, 2 toggles, ~300-400 lines of component code

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Code Quality**: TypeScript strict mode, explicit interfaces for form state, validation logic, and API contracts
- [x] **Testing Standards**: Unit tests for validation logic, integration tests for auto-save flows, E2E tests for tab navigation with validation errors
- [x] **UX Consistency**: next-themes support, shadcn/ui Tabs and Form components, responsive design with LayoutWrapper
- [x] **Performance**: <100ms render, <2s auto-save, 60fps tab transitions, <500ms validation feedback
- [x] **Architecture**: Uses LayoutWrapper → AppSidebar + AppHeader pattern, shadcn/ui New York components, @/lib utilities for validation

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
src/
├── app/
│   ├── settings/
│   │   └── page.tsx              # Settings page (server component wrapper)
│   └── layout.tsx                # Existing root layout
├── components/
│   ├── SettingsPage.tsx          # Main settings component (client)
│   ├── ProfileForm.tsx           # Profile form with auto-save (client)
│   ├── NotificationsForm.tsx     # Notifications toggles with auto-save (client)
│   ├── AutoSaveIndicator.tsx     # Reusable "Saving..."/"Saved" indicator
│   ├── LayoutWrapper.tsx         # Existing layout wrapper
│   ├── AppSidebar.tsx            # Existing sidebar (updated with Settings nav)
│   └── ui/
│       ├── tabs.tsx              # shadcn Tabs component (add if missing)
│       ├── input.tsx             # shadcn Input component (existing)
│       ├── label.tsx             # shadcn Label component (add if missing)
│       └── switch.tsx            # shadcn Switch component (add if missing)
├── lib/
│   ├── validation.ts             # Email and phone validation utilities
│   ├── hooks/
│   │   ├── useAutoSave.ts        # Custom hook for auto-save logic
│   │   └── useFormValidation.ts  # Custom hook for form validation
│   └── utils.ts                  # Existing cn() utility
└── types/
    └── settings.ts               # TypeScript interfaces for Profile and Notifications

__tests__/
├── components/
│   ├── ProfileForm.test.tsx      # Unit tests for profile form
│   ├── NotificationsForm.test.tsx # Unit tests for notifications
│   └── AutoSaveIndicator.test.tsx # Unit tests for indicator
├── lib/
│   ├── validation.test.ts        # Unit tests for validation logic
│   └── hooks/
│       ├── useAutoSave.test.ts   # Unit tests for auto-save hook
│       └── useFormValidation.test.ts # Unit tests for validation hook
└── e2e/
    └── settings-auto-save.spec.ts # E2E tests for auto-save flows
```

**Structure Decision**: Next.js 15 App Router structure with `/settings` route. Client components for interactive forms, server component wrapper for initial data loading. Custom hooks encapsulate auto-save and validation logic. shadcn/ui components from `@/components/ui/` for consistent styling. Validation utilities in `@/lib/` for reusability.

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

No violations - all constitution requirements satisfied.

## Phase 0: Research & Discovery

**Status**: ✅ Complete

**Artifacts Generated**:
- `research.md` - All technical decisions documented with rationale

**Key Decisions**:
1. Auto-save pattern: Controlled components with onBlur handlers and custom hooks
2. Validation blocking: Prevent blur with e.preventDefault() + e.target.focus()
3. Tab navigation: Check validation state before allowing tab change
4. Components: shadcn/ui Tabs, Input, Label, Switch
5. Storage: localStorage initially with abstraction for future API integration
6. Validation: Custom regex patterns for email/phone in centralized utilities

**No open questions** - All NEEDS CLARIFICATION items resolved.

## Phase 1: Design & Contracts

**Status**: ✅ Complete

**Artifacts Generated**:
- `data-model.md` - Complete entity definitions with validation rules and state machines
- `contracts/settings-api.yaml` - OpenAPI 3.0 specification for future backend integration
- `quickstart.md` - Step-by-step implementation guide with timelines
- `.github/copilot-instructions.md` - Updated with TypeScript 5.x, React 19, localStorage context

**Entities Defined**:
1. Profile (firstName, lastName, email, mobilePhone)
2. NotificationPreferences (allUpdates, marketingUpdates)
3. AutoSaveState (idle, saving, saved, error)
4. SettingsFormState (complete form state management)

**API Endpoints**:
- GET /user/profile
- PATCH /user/profile
- GET /user/notifications
- PATCH /user/notifications

**Project Structure**: Next.js App Router with `/settings` route, client components for forms, custom hooks for auto-save and validation.

## Phase 2: Task Breakdown

**Status**: ⏭️ Ready for `/speckit.tasks`

Phase 2 is completed by the `/speckit.tasks` command, which will generate detailed implementation tasks based on this plan.

---

## Implementation Summary

### Core Components (7 files)
1. **SettingsPage.tsx** - Main container with tab navigation
2. **ProfileForm.tsx** - Auto-save profile form with validation blocking
3. **NotificationsForm.tsx** - Toggle switches with instant save
4. **AutoSaveIndicator.tsx** - Reusable save status indicator
5. **app/settings/page.tsx** - Next.js route wrapper
6. **types/settings.ts** - TypeScript interfaces
7. **lib/validation.ts** - Validation utilities

### Custom Hooks (2 files)
1. **useAutoSave.ts** - Auto-save logic with status management
2. **useFormValidation.ts** - Validation state management

### Storage Layer (1 file)
1. **lib/storage/settings-storage.ts** - localStorage abstraction (swappable for API)

### Testing (5 files)
1. Unit tests for validation logic
2. Unit tests for custom hooks
3. Integration tests for ProfileForm
4. Integration tests for NotificationsForm
5. E2E tests for complete auto-save flows

### Estimated Timeline
- **Setup & Utilities**: 1 hour
- **Core Components**: 2.5 hours
- **Testing**: 2.5 hours
- **QA & Refinement**: 0.5 hours
- **Total**: 6-8 hours

### Key Technical Decisions
✅ Auto-save on blur for profile fields  
✅ Instant save on toggle for notifications  
✅ Validation blocks blur to ensure data integrity  
✅ Tab navigation blocked when validation errors exist  
✅ Subtle inline indicators for save status  
✅ localStorage with future API abstraction  
✅ TypeScript strict mode with explicit interfaces  
✅ shadcn/ui components for consistent styling  

### Next Command
```
/speckit.tasks
```

This will generate the detailed task list with acceptance criteria for implementation.
