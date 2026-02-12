---
name: add-responsive-layout
description: Add responsive layouts following mobile-first design principles with Tailwind CSS
---

When creating responsive layouts in this Next.js dashboard:

1. **Mobile-first approach** (default):
   - Base styles apply to mobile (smallest screens)
   - Add breakpoint prefixes for larger screens
   - Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

2. **Grid layouts** for card-based designs:
   ```tsx
   // Dashboard cards: 1 column mobile, 2 tablet, 4 desktop
   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
     {cards.map(card => <Card key={card.id} />)}
   </div>
   
   // Charts: 1 column mobile, 3 desktop
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
     {charts.map(chart => <Chart key={chart.id} />)}
   </div>
   ```

3. **Typography scaling**:
   ```tsx
   // Headings
   <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
   
   // Body text
   <p className="text-sm sm:text-base md:text-lg">
   
   // Small text
   <span className="text-xs sm:text-sm">
   ```

4. **Spacing adjustments**:
   ```tsx
   // Padding
   <div className="p-4 md:p-6 lg:p-8">
   
   // Margins
   <div className="mt-4 md:mt-6 lg:mt-8">
   
   // Gap between items
   <div className="gap-4 md:gap-6 lg:gap-8">
   ```

5. **Sidebar and navigation** (handled by LayoutWrapper):
   - Mobile: Sidebar is hidden by default, accessible via menu
   - Desktop: Sidebar is visible and fixed
   - The LayoutWrapper component manages this automatically

6. **Chart responsiveness**:
   ```tsx
   // Charts use ResponsiveContainer from Recharts
   <ResponsiveContainer 
     width="100%" 
     height={250} 
     className="sm:h-[300px]"
   >
     <LineChart data={data}>
       {/* Chart content */}
     </LineChart>
   </ResponsiveContainer>
   ```

7. **Hide/show elements** at different breakpoints:
   ```tsx
   // Hidden on mobile, visible on desktop
   <div className="hidden md:block">Desktop only</div>
   
   // Visible on mobile, hidden on desktop
   <div className="md:hidden">Mobile only</div>
   
   // Visible on tablet and up
   <div className="hidden sm:block">Tablet and desktop</div>
   ```

8. **Flexbox for complex layouts**:
   ```tsx
   // Stack on mobile, row on desktop
   <div className="flex flex-col md:flex-row gap-4">
     <div className="flex-1">Content 1</div>
     <div className="flex-1">Content 2</div>
   </div>
   ```

9. **Container and max-width**:
   ```tsx
   // Contained layout with max width
   <div className="container mx-auto px-4 max-w-7xl">
     Content
   </div>
   ```


## Examples

### Create a responsive stats grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {stats.map((stat, i) => (
    <DashboardStatCard key={i} stat={stat} />
  ))}
</div>

```

### Responsive header with mobile adjustments

```tsx
<header className="space-y-2">
  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
    Dashboard
  </h1>
  <p className="text-sm text-muted-foreground sm:text-base">
    Welcome back! Here's what's happening today.
  </p>
</header>

```

### Responsive card with adjusted padding

```tsx
<Card className="p-4 sm:p-6">
  <CardHeader className="px-0 pt-0">
    <CardTitle className="text-lg sm:text-xl">
      Card Title
    </CardTitle>
  </CardHeader>
  <CardContent className="px-0 pb-0">
    <div className="text-xl sm:text-2xl md:text-3xl font-bold">
      $45,231
    </div>
  </CardContent>
</Card>

```

### Responsive navigation

```tsx
<nav className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
  <Link href="/dashboard" className="text-sm sm:text-base">
    Dashboard
  </Link>
  <Link href="/analytics" className="text-sm sm:text-base">
    Analytics
  </Link>
  <Link href="/settings" className="text-sm sm:text-base">
    Settings
  </Link>
</nav>

```


## Related Files

- `src/components/LayoutWrapper.tsx`
- `src/components/DashboardCharts.tsx`
- `src/components/AppSidebar.tsx`


## Related Skills

- `create-dashboard-page`
- `add-dashboard-card`

