# Tasks: Search Dialog Interface

**Input**: Design documents from `/specs/001-implement-a-simple/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Next.js App Router**: `src/components/`, `src/hooks/`, `src/app/` at repository root
- Paths shown below follow the established project structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure validation

- [ ] T001 [P] Verify shadcn/ui dialog component is installed (check `src/components/ui/dialog.tsx`)
- [ ] T002 [P] Verify shadcn/ui input component is installed (check `src/components/ui/input.tsx`)
- [ ] T003 [P] Verify shadcn/ui button component is installed (check `src/components/ui/button.tsx`)
- [ ] T004 [P] Verify shadcn/ui tooltip component is installed (check `src/components/ui/tooltip.tsx`)
- [ ] T005 [P] Create hooks directory `src/hooks/` if it doesn't exist

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create useKeyboardShortcut custom hook in `src/hooks/useKeyboardShortcut.tsx`
- [ ] T007 Add CSS styles for dialog backdrop blur effect in `src/app/globals.css`
- [ ] T008 Add browser fallback styles for backdrop-filter in `src/app/globals.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Open Search Dialog (Priority: P1) 🎯 MVP

**Goal**: Enable users to open a centered search dialog with background blur effect using both click and keyboard shortcuts (Ctrl+K/Cmd+K)

**Independent Test**: Click search icon or press Ctrl+K/Cmd+K and verify dialog opens centered with background muted. Dialog should auto-focus search input and display keyboard shortcut hint.

### Implementation for User Story 1

- [ ] T009 [P] [US1] Create SearchDialog component in `src/components/SearchDialog.tsx`
- [ ] T010 [P] [US1] Create SearchTrigger component in `src/components/SearchTrigger.tsx`
- [ ] T011 [US1] Integrate SearchTrigger into AppHeader component in `src/components/AppHeader.tsx`
- [ ] T012 [US1] Add state management for dialog open/close in `src/components/AppHeader.tsx`
- [ ] T013 [US1] Integrate useKeyboardShortcut hook in `src/components/AppHeader.tsx`
- [ ] T014 [US1] Add SearchDialog to AppHeader with proper state binding in `src/components/AppHeader.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional - users can open search dialog via icon click or Ctrl+K/Cmd+K

---

## Phase 4: User Story 2 - Close Search Dialog (Priority: P2)

**Goal**: Enable users to close the search dialog using multiple methods (click outside, Escape key, close button)

**Independent Test**: Open dialog via any method, then verify it closes properly using click outside, Escape key, or close button. Background should return to normal state.

### Implementation for User Story 2

- [ ] T015 [US2] Add close button (X) to SearchDialog component in `src/components/SearchDialog.tsx`
- [ ] T016 [US2] Implement click-outside-to-close functionality in SearchDialog (handled by Radix UI)
- [ ] T017 [US2] Implement Escape key handling in SearchDialog (handled by Radix UI)
- [ ] T018 [US2] Add proper focus restoration when dialog closes in `src/components/SearchDialog.tsx`
- [ ] T019 [US2] Verify background blur effect removal on close in `src/components/SearchDialog.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - complete open/close cycle functional

---

## Phase 5: User Story 3 - Interact with Search Input (Priority: P3)

**Goal**: Enable users to type in the search input field with proper placeholder text and responsive input handling

**Independent Test**: Open dialog, verify search input is auto-focused, type text and verify it appears correctly, clear text and verify input responds appropriately.

### Implementation for User Story 3

- [ ] T020 [US3] Add search input field with proper placeholder "Type to search" in `src/components/SearchDialog.tsx`
- [ ] T021 [US3] Implement controlled input with state management in `src/components/SearchDialog.tsx`
- [ ] T022 [US3] Add auto-focus functionality to search input in `src/components/SearchDialog.tsx`
- [ ] T023 [US3] Add search query state management in `src/components/AppHeader.tsx`
- [ ] T024 [US3] Connect search query state between AppHeader and SearchDialog components
- [ ] T025 [US3] Add search input clear functionality when dialog closes in `src/components/AppHeader.tsx`

**Checkpoint**: All user stories should now be independently functional - complete search dialog experience ready

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and enhance overall experience

- [ ] T026 [P] Add proper TypeScript interfaces for all component props in respective component files
- [ ] T027 [P] Add accessibility attributes (ARIA labels, roles) to SearchDialog in `src/components/SearchDialog.tsx`
- [ ] T028 [P] Add accessibility attributes to SearchTrigger in `src/components/SearchTrigger.tsx`
- [ ] T029 [P] Verify responsive design works on mobile (320px+ width) across all components
- [ ] T030 [P] Verify dialog max-width constraint (500px) works correctly in `src/components/SearchDialog.tsx`
- [ ] T031 [P] Add keyboard shortcut display in both dialog and tooltip in respective components
- [ ] T032 [P] Test and verify theme compatibility (light/dark modes) across all components
- [ ] T033 [P] Verify CSS animations meet performance requirements (<100ms) in `src/app/globals.css`
- [ ] T034 Run quickstart.md validation to ensure implementation matches specification

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 dialog component but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US1 components but independently testable

### Within Each User Story

- Components can be built in parallel when marked [P]
- SearchDialog and SearchTrigger components can be built simultaneously
- Integration tasks must happen after component creation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create SearchDialog component in src/components/SearchDialog.tsx"
Task: "Create SearchTrigger component in src/components/SearchTrigger.tsx"

# Then proceed with integration:
Task: "Integrate SearchTrigger into AppHeader component"
Task: "Add state management for dialog open/close"
Task: "Integrate useKeyboardShortcut hook"
Task: "Add SearchDialog to AppHeader with proper state binding"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - users can open search dialog with keyboard shortcuts

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP - open dialog functionality)
3. Add User Story 2 → Test independently → Deploy/Demo (Complete open/close cycle)
4. Add User Story 3 → Test independently → Deploy/Demo (Full search input interaction)
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Dialog opening functionality)
   - Developer B: User Story 2 (Dialog closing functionality)
   - Developer C: User Story 3 (Search input interaction)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Components use existing shadcn/ui primitives (no custom modal implementation needed)
- Radix UI Dialog handles most accessibility and modal behavior automatically
- CSS backdrop-filter includes graceful degradation for older browsers
- No backend integration required - this is UI-only for demonstration
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- TypeScript interfaces should be defined inline per project conventions