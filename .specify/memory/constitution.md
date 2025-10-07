# Dashboard Project Constitution

## 1. Code Quality Principles

### 1.1 TypeScript Standards
- All code MUST be fully typed with TypeScript; avoid `any` types except when interfacing with untyped libraries
- Use strict TypeScript configuration as defined in `tsconfig.json`
- Define interfaces inline within component files unless reused across multiple modules
- Leverage type inference where it enhances readability without sacrificing type safety

### 1.2 Component Architecture
- Follow the established pattern: `LayoutWrapper` → `AppSidebar` + `AppHeader` + `main` content
- All UI components MUST follow shadcn/ui "New York" style variant conventions
- Use `cn()` utility from `@/lib/utils` for all conditional class combinations
- Maintain clear component composition: break complex components into smaller, focused units

### 1.3 Code Organization
- Follow file organization conventions:
  - Pages: `src/app/` with App Router structure
  - Components: `src/components/` with `ui/` subfolder for shadcn components
  - Utilities: `src/lib/` for shared utilities and mini-chart components
  - Types: Define inline unless shared across 3+ files
- Use path aliases (`@/components`, `@/lib`, `@/components/ui`) consistently
- One primary export per file; group related utilities in dedicated modules

### 1.4 Code Style
- Use ESLint configuration without modifications; address all linting errors before commit
- Follow Next.js 15 App Router conventions and best practices
- Prefer functional components with hooks over class components
- Use modern JavaScript/TypeScript features (async/await, optional chaining, nullish coalescing)
- Write self-documenting code; add comments only for complex business logic

## 2. Testing Standards

### 2.1 Test Coverage Requirements
- All new features MUST include corresponding tests
- Critical business logic requires 80%+ test coverage
- UI components require snapshot tests and interaction tests for key user flows
- Chart components require data transformation and rendering tests

### 2.2 Testing Strategy
- Unit tests for utilities, hooks, and isolated functions
- Component tests for UI components using React Testing Library
- Integration tests for page-level components and user workflows
- Visual regression tests for theme-aware components and charts

### 2.3 Test Organization
- Co-locate test files with source files using `.test.ts` or `.test.tsx` extension
- Use descriptive test names following pattern: "should [expected behavior] when [condition]"
- Group related tests using `describe` blocks
- Keep tests focused and independent; avoid test interdependencies

### 2.4 Mocking Standards
- Mock external dependencies (APIs, services) in unit tests
- Use minimal mocking in integration tests to test realistic scenarios
- Never commit commented-out or disabled tests; fix or remove them

## 3. User Experience Consistency

### 3.1 Design System Adherence
- ALL UI components MUST use shadcn/ui components as the foundation
- Maintain consistent spacing using Tailwind CSS spacing scale
- Follow the established color system using CSS custom properties
- Use Lucide React icons exclusively; no mixing of icon libraries

### 3.2 Theme System
- All components MUST support light and dark themes via `next-themes`
- Use CSS custom properties (`--chart-1`, `--chart-2`, etc.) for theme-aware styling
- Charts MUST automatically adapt colors to active theme
- Test all new UI in both light and dark modes before completion

### 3.3 Responsive Design
- Follow mobile-first approach for all layouts and components
- All components MUST be fully responsive across mobile, tablet, and desktop
- Sidebar MUST collapse appropriately on mobile devices
- Touch targets MUST be minimum 44x44px for interactive elements
- Test on multiple viewport sizes before considering feature complete

### 3.4 Accessibility Standards
- All interactive elements MUST be keyboard accessible
- Maintain logical tab order and focus management
- Use semantic HTML elements appropriately
- Provide appropriate ARIA labels for complex components
- Ensure color contrast meets WCAG AA standards (4.5:1 for normal text)
- Support screen readers with meaningful labels and descriptions

### 3.5 Loading States and Feedback
- Provide loading indicators for asynchronous operations taking >200ms
- Use skeleton screens for initial page loads
- Display clear error messages with actionable guidance
- Implement optimistic UI updates where appropriate
- Maintain visual consistency during state transitions

## 4. Performance Requirements

### 4.1 Build and Bundle Size
- Total bundle size MUST stay below 250KB gzipped for initial load
- Use dynamic imports for large components not needed on initial render
- Optimize images: use Next.js Image component with appropriate sizing
- Leverage Turbopack in development for faster builds (`npm run dev`)
- Tree-shake unused dependencies; audit bundle regularly

### 4.2 Runtime Performance
- First Contentful Paint (FCP) MUST be under 1.5 seconds
- Largest Contentful Paint (LCP) MUST be under 2.5 seconds
- Time to Interactive (TTI) MUST be under 3.5 seconds
- Cumulative Layout Shift (CLS) MUST be under 0.1
- Maintain 60fps for animations and scrolling

### 4.3 React Performance
- Use React.memo() for expensive components that re-render frequently
- Leverage useMemo() and useCallback() to prevent unnecessary recalculations
- Avoid inline function definitions in JSX props for frequently rendered components
- Use virtualization for lists with 50+ items
- Implement code splitting at route level using Next.js conventions

### 4.4 Chart Performance
- Limit data points in charts to maximum 100 points; aggregate if necessary
- Use Recharts performance optimization props (isAnimationActive, etc.)
- Debounce chart updates triggered by user interactions
- Lazy load chart components that are below the fold

### 4.5 Data Fetching
- Use Server Components for data fetching when possible
- Implement proper caching strategies with Next.js cache directives
- Use streaming and Suspense boundaries for improved perceived performance
- Minimize client-side data fetching; prefer server-side when feasible
- Implement pagination for large datasets

## 5. Development Workflow

### 5.1 Git Practices
- Work on feature branches; never commit directly to main/master
- Use descriptive commit messages following conventional commits format
- Keep commits focused and atomic
- Rebase feature branches before merging to maintain clean history

### 5.2 Code Review Standards
- All code changes require review before merging
- Reviewers must verify: code quality, test coverage, performance, accessibility
- Address all review comments before merging
- Use GitHub Copilot suggestions as starting point, but always review and customize

### 5.3 Documentation
- Update README.md when adding new features or changing architecture
- Document complex algorithms and business logic inline
- Maintain up-to-date component usage examples
- Keep dependency documentation current

### 5.4 Dependency Management
- Review and approve all new dependencies before adding
- Prefer well-maintained libraries with active communities
- Keep dependencies updated; review security advisories regularly
- Remove unused dependencies promptly

## 6. Component-Specific Standards

### 6.1 Dashboard Components
- Dashboard cards use `DashboardCard` for basic metrics
- Statistics use `DashboardStatCard` with trend indicators
- Full-size charts belong in `DashboardCharts.tsx`
- Mini charts belong in `@/lib/charts`
- All dashboard components MUST handle mobile layout via `LayoutWrapper` state

### 6.2 Chart Components
- All charts use Recharts library exclusively
- Charts automatically use CSS custom properties for theming
- Define color palettes using `hsl(var(--chart-N))` format
- Include responsive width/height handling
- Provide meaningful tooltips and labels

### 6.3 Form Components
- Use controlled components for all form inputs
- Implement proper validation with clear error messages
- Provide real-time feedback for user input
- Use shadcn/ui form components as base
- Handle loading and error states explicitly

## 7. Security and Privacy

### 7.1 Data Handling
- Never commit sensitive data (API keys, tokens, credentials)
- Use environment variables for configuration
- Validate and sanitize all user inputs
- Implement proper error handling without exposing sensitive details

### 7.2 Dependencies
- Regular security audits via `npm audit`
- Address high and critical vulnerabilities immediately
- Review dependency licenses for compatibility

## 8. Continuous Improvement

### 8.1 Monitoring
- Track Core Web Vitals in production
- Monitor bundle size changes in each PR
- Review performance metrics regularly

### 8.2 Refactoring
- Refactor when adding similar code for the third time (Rule of Three)
- Address technical debt in small, incremental improvements
- Update patterns and conventions as project evolves

### 8.3 Learning
- Document lessons learned from production issues
- Share knowledge through code comments and documentation
- Stay current with Next.js, React, and ecosystem updates

---

This constitution serves as the foundation for maintaining high standards across code quality, testing, user experience, and performance. All team members and AI assistants must adhere to these principles when contributing to the project.
