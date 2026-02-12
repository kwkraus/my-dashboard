# GitHub Copilot Skills

This directory contains reusable skills for common development tasks in this Next.js 15 dashboard application. Skills follow the agentskills.io specification to provide consistent, best-practice guidance for GitHub Copilot.

## What are Skills?

Skills are structured YAML files that define reusable prompts and patterns for common development tasks. They help GitHub Copilot provide more consistent, context-aware assistance specific to this codebase.

## Available Skills

### Dashboard Components
- **[add-dashboard-card.yml](./add-dashboard-card.yml)** - Add metric cards with proper styling and components
  - DashboardCard, DashboardStatCard, DashboardChartCard patterns
  - Responsive grid layouts
  - TypeScript interfaces

- **[add-chart.yml](./add-chart.yml)** - Add Recharts visualizations with theme-aware styling
  - LineChart, BarChart, PieChart implementations
  - useChartColors hook for theme support
  - ResponsiveContainer usage

### UI & Styling
- **[add-shadcn-component.yml](./add-shadcn-component.yml)** - Add shadcn/ui components (New York style)
  - CLI usage: `npx shadcn@latest add [component]`
  - Component customization patterns
  - cn() utility usage

- **[add-icon.yml](./add-icon.yml)** - Add Lucide React icons
  - Icon sizing conventions (h-4 w-4, h-5 w-5, h-6 w-6)
  - Color patterns with CSS custom properties
  - Accessibility considerations

- **[add-theme-colors.yml](./add-theme-colors.yml)** - Extend theme color system
  - CSS custom property format (HSL values)
  - Light and dark mode definitions
  - Chart color management

- **[add-responsive-layout.yml](./add-responsive-layout.yml)** - Create responsive layouts
  - Mobile-first design principles
  - Tailwind breakpoints (sm, md, lg, xl, 2xl)
  - Grid and flexbox patterns

### Pages & Routing
- **[create-dashboard-page.yml](./create-dashboard-page.yml)** - Create new pages with App Router
  - Page structure and conventions
  - Server vs Client Components
  - Metadata and SEO

### State & Performance
- **[manage-component-state.yml](./manage-component-state.yml)** - Manage component state and data flow
  - useState, useReducer, Context API patterns
  - Custom hooks for data fetching
  - State optimization techniques

- **[optimize-react-component.yml](./optimize-react-component.yml)** - Optimize component performance
  - Server vs Client Component decisions
  - React.memo, useMemo, useCallback
  - Dynamic imports and code splitting

### Debugging
- **[debug-component.yml](./debug-component.yml)** - Debug common issues
  - Hydration errors
  - TypeScript errors
  - Theme and chart issues
  - Linting problems

## How to Use Skills

Skills are automatically available to GitHub Copilot when working in this repository. You can:

1. **Ask Copilot directly**: "Add a new chart following the add-chart skill"
2. **Reference skills in prompts**: "Create a responsive dashboard card using our standard patterns"
3. **Use as documentation**: Read skills to understand project conventions

## Skill Structure

Each skill follows this YAML format:

```yaml
skill:
  name: skill-name
  description: Brief description
  version: 1.0.0
  category: category-name
  instructions: |
    Step-by-step instructions...
  examples:
    - title: Example title
      code: |
        Example code...
  related_files:
    - path/to/file.tsx
  related_skills:
    - other-skill-name
  tips:
    - Helpful tip...
```

## Skill Categories

- **dashboard**: Dashboard-specific components and patterns
- **visualization**: Charts and data visualization
- **ui-components**: UI component development
- **theming**: Theme and styling system
- **routing**: Page creation and navigation
- **layout**: Responsive design and layouts
- **state-management**: State and data management
- **performance**: Performance optimization
- **debugging**: Debugging and troubleshooting

## Related Resources

- [Project README](../../../README.md) - Project overview and setup
- [Copilot Instructions](../copilot-instructions.md) - General coding guidelines
- [Custom Agents](../agents/) - Specialized AI agents for specific tasks
- [Components](../../../src/components/) - Existing component examples

## Contributing

When adding new skills:

1. Follow the YAML format structure
2. Include clear, actionable instructions
3. Provide practical examples
4. Reference related files and skills
5. Test instructions with GitHub Copilot
6. Update this README with the new skill

## Skill Maintenance

Skills are living documents that should be:
- Updated when project patterns change
- Reviewed for accuracy regularly
- Extended with new examples as needed
- Kept in sync with project dependencies

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Specification**: Based on agentskills.io
