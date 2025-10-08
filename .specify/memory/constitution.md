<!--
Sync Impact Report:
Version change: Initial → 1.0.0
Modified principles: All new (initial constitution)
Added sections: Core Principles, Performance Standards, User Experience Standards, Governance
Removed sections: None (initial version)
Templates requiring updates:
  ✅ Updated .specify/templates/plan-template.md - Constitution Check section aligns with new principles
  ✅ Updated .specify/templates/spec-template.md - User scenarios align with UX consistency principles
  ✅ Updated .specify/templates/tasks-template.md - Task categorization includes code quality and performance validation
Follow-up TODOs: None
-->

# My Dashboard Constitution

## Core Principles

### I. Code Quality First (NON-NEGOTIABLE)
All code MUST follow TypeScript strict mode and pass ESLint without warnings. Components MUST use shadcn/ui "New York" style variant with proper `cn()` utility usage. Every component MUST be properly typed with explicit interfaces. Code MUST follow the established architectural patterns: `LayoutWrapper` → `AppSidebar` + `AppHeader` + main content area.

**Rationale**: Maintains consistency with copilot-instructions.md guidelines and ensures maintainable, predictable codebase.

### II. Testing Standards (NON-NEGOTIABLE)
Every component MUST have unit tests covering core functionality. Integration tests MUST verify theme switching, responsive behavior, and chart data rendering. Component tests MUST validate prop interfaces and error states. Performance tests MUST verify render times under 100ms for dashboard cards.

**Rationale**: Ensures reliability and prevents regressions in the interactive dashboard experience.

### III. User Experience Consistency
All components MUST support both light and dark themes using `next-themes` with CSS custom properties. Responsive design MUST follow mobile-first approach with proper sidebar collapse on mobile. Charts MUST use consistent theming with `--chart-1`, `--chart-2` CSS variables. Typography MUST use Geist Sans and Geist Mono fonts consistently.

**Rationale**: Delivers consistent, professional user experience across all devices and themes.

### IV. Performance Requirements
Dashboard cards MUST render within 100ms. Chart animations MUST maintain 60fps. Bundle size increases MUST be justified and documented. Images MUST be optimized and use Next.js Image component. Lighthouse performance score MUST remain above 90.

**Rationale**: Ensures responsive, professional dashboard experience expected by users.

### V. Component Architecture Standards
All components MUST be self-contained with clear prop interfaces. Shared logic MUST be extracted to `@/lib/` utilities. UI components MUST use shadcn/ui base components from `@/components/ui/`. Chart components MUST use Recharts with consistent theming patterns. File organization MUST follow established patterns: pages in `src/app/`, components in `src/components/`, utilities in `src/lib/`.

**Rationale**: Maintains scalable, maintainable component architecture aligned with Next.js 15 App Router best practices.

## Performance Standards

### Rendering Performance
- Dashboard cards: <100ms initial render
- Chart animations: 60fps maintained
- Theme switching: <50ms transition
- Sidebar toggle: <30ms animation

### Bundle Performance
- Core bundle: <500KB gzipped
- Chart bundle: <200KB gzipped
- Font loading: FOUT minimized with font-display: swap
- Code splitting: Route-based with dynamic imports for charts

### Accessibility Standards
- WCAG 2.1 AA compliance MUST be maintained
- Keyboard navigation MUST work for all interactive elements
- Screen reader compatibility MUST be verified for dashboard content
- Color contrast MUST pass 4.5:1 ratio in both themes

## User Experience Standards

### Responsive Design
- Mobile breakpoint: <768px with sidebar collapse
- Tablet breakpoint: 768px-1024px with adapted chart layouts
- Desktop breakpoint: >1024px with full sidebar
- Touch targets: Minimum 44px on mobile devices

### Theme System
- Theme persistence across sessions using next-themes
- Smooth transitions between light/dark modes
- Chart colors MUST adapt automatically to theme
- No flash of incorrect theme on page load

### Interactive Elements
- Loading states for all async operations
- Error boundaries for chart rendering failures
- Tooltip consistency using Radix UI components
- Button states: idle, hover, active, disabled

## Governance

All pull requests MUST pass constitution compliance checks before merge. Code reviews MUST verify adherence to architectural patterns defined in `.github/copilot-instructions.md`. Performance regressions MUST be identified and addressed before deployment. Breaking changes to component interfaces MUST be documented and approved.

New features MUST follow the established development workflow: specification → planning → implementation → testing → review. All new components MUST integrate with the existing theme system and responsive design patterns.

Use `.github/copilot-instructions.md` for runtime development guidance and architectural decisions.

**Version**: 1.0.0 | **Ratified**: 2025-10-08 | **Last Amended**: 2025-10-08