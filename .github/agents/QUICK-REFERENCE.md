# Quick Reference: Custom Agent Selection

Use this guide to quickly choose the right agent for your task.

## Quick Selection Chart

```
┌─────────────────────────────────┬──────────────────────────────────┐
│ I want to...                    │ Use this agent                   │
├─────────────────────────────────┼──────────────────────────────────┤
│ Add a button or card            │ 🎨 UI Component Developer        │
│ Create a new chart              │ 📈 Chart Developer               │
│ Modify sidebar or header        │ 📐 Layout & Responsive Designer  │
│ Add dark mode support           │ 🌗 Theme Customization           │
│ Build a dashboard page          │ 📊 Dashboard Feature Developer   │
│ Fix TypeScript errors           │ 🔧 TypeScript & Next.js Expert   │
│ Make it responsive              │ 📐 Layout & Responsive Designer  │
│ Add a new shadcn component      │ 🎨 UI Component Developer        │
│ Fix chart colors in dark mode   │ 📈 Chart Developer               │
│ Add a new route/page            │ 📐 Layout & Responsive Designer  │
│ Create KPI metrics              │ 📊 Dashboard Feature Developer   │
│ Optimize performance            │ 🔧 TypeScript & Next.js Expert   │
└─────────────────────────────────┴──────────────────────────────────┘
```

## Task Complexity Guide

### Simple Tasks (Single Agent)

**UI Changes**:
- Adding a button → UI Component Developer
- Styling a component → UI Component Developer

**Chart Changes**:
- Modifying a chart → Chart Developer
- Adding a new chart type → Chart Developer

**Theme Changes**:
- Changing colors → Theme Customization
- Fixing dark mode bugs → Theme Customization

### Medium Tasks (2-3 Agents)

**New Dashboard Card**:
1. UI Component Developer (create card)
2. Theme Customization (add theme support)
3. TypeScript Expert (add types)

**Responsive Layout Fix**:
1. Layout & Responsive Designer (fix layout)
2. UI Component Developer (adjust components)

**New Chart in Card**:
1. Chart Developer (create chart)
2. UI Component Developer (create card wrapper)
3. Theme Customization (ensure theming)

### Complex Tasks (Multiple Agents)

**Complete Dashboard Page**:
1. Layout & Responsive Designer (page structure)
2. Dashboard Feature Developer (features & data)
3. Chart Developer (visualizations)
4. UI Component Developer (custom components)
5. Theme Customization (theming)
6. TypeScript Expert (types & optimization)

**New Feature Section**:
1. Dashboard Feature Developer (plan & structure)
2. UI Component Developer (components)
3. Chart Developer (data viz)
4. Layout & Responsive Designer (responsive behavior)

## Common Combinations

### Combination 1: UI + Theme
**When**: Creating theme-aware components
**Agents**: 
- 🎨 UI Component Developer (component structure)
- 🌗 Theme Customization (theme integration)

### Combination 2: Chart + Theme
**When**: Adding charts that support light/dark mode
**Agents**: 
- 📈 Chart Developer (chart creation)
- 🌗 Theme Customization (color variables)

### Combination 3: Layout + Dashboard
**When**: Creating new dashboard pages
**Agents**: 
- 📐 Layout & Responsive Designer (page layout)
- 📊 Dashboard Feature Developer (dashboard features)

### Combination 4: All UI Agents
**When**: Complete feature development
**Agents**: 
- 🎨 UI Component Developer
- 📈 Chart Developer
- 📐 Layout & Responsive Designer
- 🌗 Theme Customization
- 📊 Dashboard Feature Developer

## Agent Specialties at a Glance

### 🎨 UI Component Developer
- shadcn/ui components
- Tailwind CSS styling
- Component composition
- Responsive design basics

### 📈 Chart Developer
- Recharts library
- Data visualizations
- Theme-aware colors
- Chart configurations

### 📐 Layout & Responsive Designer
- App Router layouts
- Sidebar/header patterns
- Mobile-first design
- Grid layouts

### 🌗 Theme Customization
- CSS custom properties
- Dark/light themes
- next-themes integration
- Color systems

### 📊 Dashboard Feature Developer
- Complete features
- KPI cards
- Data presentation
- Mock data

### 🔧 TypeScript & Next.js Expert
- Type definitions
- Next.js configuration
- Performance optimization
- Build setup

## Tips for Agent Selection

1. **Start with the most specific agent** for your primary task
2. **Use multiple agents** for complex features
3. **Check the README** for detailed guidance
4. **Look at the agent files** for code examples
5. **Combine agents** when tasks span multiple domains

## Need More Help?

See the full documentation in:
- `.github/agents/README.md` - Complete guide
- `.github/agents/[agent-name].md` - Individual agent docs
- `.github/copilot-instructions.md` - General project guidelines
