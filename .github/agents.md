# Custom GitHub Copilot Agents

This project uses specialized AI agents to help with specific development tasks. Each agent is an expert in a particular domain of the dashboard application.

## Available Agents

The agents are defined in `.github/agents/` directory:

### 1. **UI Component Developer** (`ui-component-developer.agent.md`)
**Specialty**: shadcn/ui component development and styling

**Use for**:
- Creating new UI components following project patterns
- Adding shadcn/ui components (`npx shadcn@latest add [component]`)
- Modifying dashboard components
- Building card-based layouts
- Implementing responsive designs

**Key expertise**: shadcn/ui (New York style), Tailwind CSS v4, component composition, mobile-first design

---

### 2. **Chart Developer** (`chart-developer.agent.md`)
**Specialty**: Recharts data visualizations with theme support

**Use for**:
- Creating new chart visualizations
- Modifying existing charts
- Adding new chart types (Area, Radar, Scatter, etc.)
- Implementing mini charts for dashboard cards
- Fixing theme-related chart issues

**Key expertise**: Recharts library, theme-aware colors, responsive containers, CSS custom properties

---

### 3. **Layout & Responsive Design** (`layout-responsive-designer.agent.md`)
**Specialty**: Layouts, navigation, and mobile responsiveness

**Use for**:
- Modifying layout structure or composition
- Adding new pages or routes
- Implementing responsive designs
- Adjusting sidebar behavior
- Creating grid layouts

**Key expertise**: Next.js 15 App Router, mobile-first patterns, sidebar navigation, responsive breakpoints

---

### 4. **Theme Customization** (`theme-customization.agent.md`)
**Specialty**: Theme systems and dark mode implementation

**Use for**:
- Adding new theme colors or variables
- Fixing theme-related styling issues
- Ensuring components work in both light/dark modes
- Modifying the theme system
- Updating chart colors for themes

**Key expertise**: next-themes, CSS custom properties, light/dark mode, theme-aware styling

---

### 5. **Dashboard Feature Developer** (`dashboard-feature-developer.agent.md`)
**Specialty**: Complete dashboard features with metrics and visualizations

**Use for**:
- Creating new dashboard pages or sections
- Adding new KPI cards or metrics
- Implementing data visualizations
- Organizing dashboard layouts
- Generating mock data for prototyping

**Key expertise**: Dashboard design patterns, KPI cards, data presentation, mock data, feature integration

---

### 6. **TypeScript & Next.js Expert** (`typescript-nextjs-expert.agent.md`)
**Specialty**: TypeScript configuration and Next.js best practices

**Use for**:
- Setting up TypeScript types and interfaces
- Working with Next.js App Router features
- Optimizing component performance
- Handling routing and navigation
- Debugging TypeScript errors
- Refactoring code for better type safety

**Key expertise**: TypeScript patterns, Next.js 15 App Router, Server vs Client components, performance optimization

---

## Quick Agent Selection

| Task | Recommended Agent |
|------|------------------|
| Add a button or card | UI Component Developer |
| Create a chart | Chart Developer |
| Modify sidebar or header | Layout & Responsive Designer |
| Add dark mode support | Theme Customization |
| Build a dashboard page | Dashboard Feature Developer |
| Fix TypeScript errors | TypeScript & Next.js Expert |
| Make something responsive | Layout & Responsive Designer |
| Add a shadcn component | UI Component Developer |
| Fix chart colors in dark mode | Chart Developer |
| Add a new route/page | Layout & Responsive Designer |
| Create KPI metrics | Dashboard Feature Developer |
| Optimize performance | TypeScript & Next.js Expert |

## Multi-Agent Tasks

Complex tasks often require multiple agents working together:

**New Dashboard Page**:
1. Layout & Responsive Designer (page structure)
2. Dashboard Feature Developer (features & data)
3. Chart Developer (visualizations)
4. TypeScript Expert (types & optimization)

**New Chart Card with Dark Mode**:
1. Chart Developer (create chart)
2. UI Component Developer (card wrapper)
3. Theme Customization (ensure theming)

**Responsive Component with State**:
1. UI Component Developer (component structure)
2. Layout & Responsive Designer (responsive behavior)
3. TypeScript Expert (type definitions)

## How Agents Work

Each agent definition contains:
- **Expertise areas** - What the agent specializes in
- **Key patterns** - Code patterns and conventions from this project
- **Best practices** - Recommended approaches for specific tasks
- **Code examples** - Real examples from the codebase
- **When to use** - Clear guidelines on when to invoke each agent

## Tips for Using Agents

1. Start with the most specific agent for your primary task
2. Use multiple agents for complex features
3. Agents contain patterns extracted from the actual codebase
4. Each agent is focused on a specific domain for better expertise
5. Agents are designed to work together

## Related Documentation

- `.github/copilot-instructions.md` - General project coding instructions and architecture
- `.github/agents/` - Individual agent definition files
- `src/components/` - Component implementations referenced by agents
- `src/app/` - App Router pages and layouts
