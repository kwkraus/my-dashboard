# Dashboard AI Coding Instructions

## Project Architecture

This is a **Next.js 15 dashboard application** with App Router, shadcn/ui components, and theme-aware charts. The root page (`/`) automatically redirects to `/dashboard`.

### Key Architectural Patterns

- **Layout Structure**: `LayoutWrapper` → `AppSidebar` + `AppHeader` + `main` content area
- **Theme System**: Uses `next-themes` with CSS variables for consistent theming across components and charts
- **Component Composition**: Dashboard built from `DashboardCards` + `DashboardCharts` components
- **Chart Theming**: Charts use CSS custom properties (`--chart-1`, `--chart-2`, etc.) that automatically adapt to light/dark themes

## Development Workflow

```bash
# Development with Turbopack (faster builds)
npm run dev

# Production build and start
npm run build && npm start

# Linting
npm run lint
```

## Component Patterns

### shadcn/ui Integration
- All UI components follow shadcn/ui "New York" style variant
- Use `cn()` utility from `@/lib/utils` for conditional classes: `cn("base-classes", conditionalClass && "conditional-classes")`
- Import path aliases configured: `@/components`, `@/lib`, `@/components/ui`

### Dashboard Components
- **Cards**: Use `DashboardCard` for basic metrics, `DashboardStatCard` for statistics with trend indicators
- **Charts**: Full-size charts in `DashboardCharts.tsx`, mini charts in `@/lib/charts`
- **Mobile Responsive**: All components handle mobile layout via `LayoutWrapper` state management

### Theme-Aware Charts
```tsx
// Charts automatically use CSS custom properties for theming
const colors = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  // etc.
}
```

## Styling Conventions

- **CSS Variables**: Theme colors defined as CSS custom properties in `globals.css`
- **Responsive Design**: Mobile-first approach with sidebar that collapses on mobile
- **Font System**: Geist Sans (primary) and Geist Mono (monospace) from Google Fonts
- **Component Variants**: Use `class-variance-authority` for component styling variants

## File Organization

- **Pages**: `src/app/` - App Router structure with route groups
- **Components**: `src/components/` - Reusable components with `ui/` subfolder for shadcn components  
- **Utilities**: `src/lib/` - Shared utilities and mini-chart components
- **Types**: TypeScript interfaces defined inline in component files (no separate types folder)

## Adding New Features

1. **New Dashboard Cards**: Extend `DashboardCards.tsx` with new card types
2. **New Charts**: Add to `DashboardCharts.tsx` or create mini versions in `@/lib/charts`
3. **New Routes**: Create page.tsx files under `src/app/` following App Router conventions
4. **New UI Components**: Use `npx shadcn@latest add [component]` to add shadcn components

## Key Dependencies

- **Recharts**: All chart implementations use Recharts with consistent theming
- **Lucide React**: Icon system throughout the application
- **Radix UI**: Underlying primitive components for shadcn/ui
- **Tailwind CSS v4**: Latest version with CSS-based configuration
