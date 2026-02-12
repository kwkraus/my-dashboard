# Custom GitHub Copilot Agents

This directory contains specialized AI agents designed to help with specific development tasks in this Next.js dashboard application.

## Available Agents

### 1. UI Component Developer (`ui-component-developer.md`)
**Specialty**: shadcn/ui component development and styling

Use this agent when you need to:
- Create new UI components following project patterns
- Add shadcn/ui components to the project
- Modify existing dashboard components
- Build card-based layouts
- Implement responsive designs
- Work with icons and styling

**Key expertise**:
- shadcn/ui integration (New York style)
- Tailwind CSS v4 with CSS custom properties
- Component composition patterns
- Mobile-first responsive design

---

### 2. Chart Developer (`chart-developer.md`)
**Specialty**: Recharts data visualizations with theme support

Use this agent when you need to:
- Create new chart visualizations
- Modify existing charts
- Add new chart types (Area, Radar, Scatter, etc.)
- Implement mini charts for dashboard cards
- Fix theme-related chart issues
- Add interactive chart features

**Key expertise**:
- Recharts library (LineChart, BarChart, PieChart, etc.)
- Theme-aware color systems
- Responsive chart containers
- CSS custom properties for theming
- Chart data patterns

---

### 3. Layout & Responsive Design Agent (`layout-responsive-designer.md`)
**Specialty**: Layouts, navigation, and mobile responsiveness

Use this agent when you need to:
- Modify layout structure or composition
- Add new pages or routes
- Implement responsive designs
- Fix mobile layout issues
- Adjust sidebar behavior
- Create new grid layouts
- Work with App Router layouts

**Key expertise**:
- Next.js 15 App Router layout system
- Mobile-first design patterns
- Sidebar navigation (collapsible & overlay)
- Grid layouts for dashboards
- Responsive breakpoints

---

### 4. Theme Customization Agent (`theme-customization.md`)
**Specialty**: Theme systems and dark mode implementation

Use this agent when you need to:
- Add new theme colors or variables
- Fix theme-related styling issues
- Ensure components work in both light/dark modes
- Modify the theme system
- Add theme-aware animations
- Update chart colors for themes

**Key expertise**:
- next-themes integration
- CSS custom properties (CSS variables)
- Light/dark mode implementation
- Theme-aware component styling
- Color contrast and accessibility

---

### 5. Dashboard Feature Developer (`dashboard-feature-developer.md`)
**Specialty**: Complete dashboard features with metrics and visualizations

Use this agent when you need to:
- Create new dashboard pages or sections
- Add new KPI cards or metrics
- Implement new data visualizations
- Organize dashboard layouts
- Generate mock data for prototyping
- Add dashboard features (filters, date ranges)

**Key expertise**:
- Dashboard design patterns
- KPI card implementations
- Data presentation best practices
- Mock data generation
- Feature integration (cards + charts)

---

### 6. TypeScript & Next.js Expert (`typescript-nextjs-expert.md`)
**Specialty**: TypeScript configuration and Next.js best practices

Use this agent when you need to:
- Set up TypeScript types and interfaces
- Work with Next.js App Router features
- Optimize component performance
- Handle routing and navigation
- Implement error boundaries or loading states
- Debug TypeScript errors
- Refactor code for better type safety

**Key expertise**:
- TypeScript advanced patterns
- Next.js 15 App Router
- Server vs Client components
- Performance optimization
- Build configuration

---

## How to Use These Agents

These agent definitions provide context and guidelines for AI assistants working on this project. They contain:

1. **Expertise areas** - What the agent specializes in
2. **Key patterns** - Code patterns and conventions used in this project
3. **Best practices** - Recommended approaches for specific tasks
4. **When to use** - Clear guidelines on when to invoke each agent
5. **Code examples** - Real examples from the codebase

## Agent Selection Guide

| Task | Recommended Agent |
|------|------------------|
| Adding a new button component | UI Component Developer |
| Creating a line chart | Chart Developer |
| Making the sidebar responsive | Layout & Responsive Design |
| Adding dark mode support to a component | Theme Customization |
| Building a new analytics dashboard | Dashboard Feature Developer |
| Fixing TypeScript errors | TypeScript & Next.js Expert |
| Adding a new page route | Layout & Responsive Design |
| Styling a card component | UI Component Developer |
| Implementing a pie chart | Chart Developer |
| Creating KPI metrics | Dashboard Feature Developer |

## Contributing

When adding new agents:

1. Create a new `.md` file in this directory
2. Follow the existing agent template structure:
   - Title and introduction
   - Expertise section
   - Key patterns section
   - Best practices
   - When to use section
3. Include relevant code examples from the codebase
4. Update this README with the new agent information

## Related Files

- `.github/copilot-instructions.md` - General project coding instructions
- `src/components/` - Component implementations referenced by agents
- `src/app/` - App Router pages and layouts

## Notes

- These agents are designed to work together - complex tasks may require multiple agents
- Each agent is focused on a specific domain for better expertise
- Agents contain patterns extracted from the actual codebase
- Keep agents updated as the codebase evolves
