# GitHub Copilot Skills

This directory contains reusable skills for common development tasks in this Next.js 15 dashboard application. Skills follow the official GitHub Copilot documentation to provide consistent, best-practice guidance.

## What are Skills?

Skills are directories containing a `SKILL.md` file with YAML frontmatter and Markdown instructions. They help GitHub Copilot provide more consistent, context-aware assistance specific to this codebase.

## Available Skills

### Dashboard Components
- **[add-dashboard-card/](./add-dashboard-card/)** - Add metric cards with proper styling and components
  - DashboardCard, DashboardStatCard, DashboardChartCard patterns
  - Responsive grid layouts
  - TypeScript interfaces

- **[add-chart/](./add-chart/)** - Add Recharts visualizations with theme-aware styling
  - LineChart, BarChart, PieChart implementations
  - useChartColors hook for theme support
  - ResponsiveContainer usage

### UI & Styling
- **[add-shadcn-component/](./add-shadcn-component/)** - Add shadcn/ui components (New York style)
  - CLI usage: `npx shadcn@latest add [component]`
  - Component customization patterns
  - cn() utility usage

- **[add-icon/](./add-icon/)** - Add Lucide React icons
  - Icon sizing conventions (h-4 w-4, h-5 w-5, h-6 w-6)
  - Color patterns with CSS custom properties
  - Accessibility considerations

- **[add-theme-colors/](./add-theme-colors/)** - Extend theme color system
  - CSS custom property format (HSL values)
  - Light and dark mode definitions
  - Chart color management

- **[add-responsive-layout/](./add-responsive-layout/)** - Create responsive layouts
  - Mobile-first design principles
  - Tailwind breakpoints (sm, md, lg, xl, 2xl)
  - Grid and flexbox patterns

### Pages & Routing
- **[create-dashboard-page/](./create-dashboard-page/)** - Create new pages with App Router
  - Page structure and conventions
  - Server vs Client Components
  - Metadata and SEO

### State & Performance
- **[manage-component-state/](./manage-component-state/)** - Manage component state and data flow
  - useState, useReducer, Context API patterns
  - Custom hooks for data fetching
  - State optimization techniques

- **[optimize-react-component/](./optimize-react-component/)** - Optimize component performance
  - Server vs Client Component decisions
  - React.memo, useMemo, useCallback
  - Dynamic imports and code splitting

### Debugging
- **[debug-component/](./debug-component/)** - Debug common issues
  - Hydration errors
  - TypeScript errors
  - Theme and chart issues
  - Linting problems

## How to Use Skills

Skills are automatically available to GitHub Copilot when working in this repository. You can:

1. **Ask Copilot directly**: "Add a new chart following the add-chart skill"
2. **Reference skills in prompts**: "Create a responsive dashboard card using our standard patterns"
3. **Use as documentation**: Browse the skill directories to understand project conventions

## Skill Structure

Each skill is stored in its own directory under `.github/skills/[skill-name]/` and contains a `SKILL.md` file with:

- **YAML frontmatter**: Defines the skill's name and description
- **Markdown body**: Contains detailed instructions, examples, and guidelines

Example structure:
```
.github/skills/
├── add-chart/
│   └── SKILL.md
├── add-dashboard-card/
│   └── SKILL.md
└── ...
```

### Example `SKILL.md` format:

```markdown
---
name: skill-name
description: Brief description of what the skill does and when to use it
---

# Detailed instructions in Markdown format

1. Step-by-step guidance...
2. Code examples...
3. Best practices...

## Examples

### Example Title
` ``tsx
// Example code here
` ``
```

## Skill Categories

Skills are organized by development task type:

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

## Adding New Skills

To create a new skill:

1. Create a subdirectory under `.github/skills/` with a descriptive name (lowercase, hyphens for spaces)
2. Create a `SKILL.md` file in that directory
3. Add YAML frontmatter with `name` and `description` fields
4. Write detailed instructions in Markdown format
5. Include examples, tips, and related information
6. Update this README to list the new skill

Example:
```bash
mkdir .github/skills/my-new-skill
cat > .github/skills/my-new-skill/SKILL.md << 'EOF'
---
name: my-new-skill
description: Description of when to use this skill
---

Instructions go here...
EOF
```

## Skill Maintenance

Skills are living documents that should be:
- Updated when project patterns change
- Reviewed for accuracy regularly
- Extended with new examples as needed
- Kept in sync with project dependencies

## Related Resources

- [GitHub Copilot Skills Documentation](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) - Official documentation
- [Project README](../../../README.md) - Project overview and setup
- [Copilot Instructions](../copilot-instructions.md) - General coding guidelines
- [Custom Agents](../agents/) - Specialized AI agents for specific tasks
- [Components](../../../src/components/) - Existing component examples

---

**Format**: GitHub Copilot Skills (SKILL.md with YAML frontmatter)  
**Last Updated**: February 2026  
**Total Skills**: 10
