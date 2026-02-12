---
name: debug-component
description: Debug React components and resolve common issues in Next.js 15
---

When debugging components in this Next.js 15 dashboard:

1. **"use client" vs Server Component issues**:
   - Error: "You're importing a component that needs useState..."
   - Solution: Add `"use client";` at the top of the file
   - Only use for components that need:
     * React hooks (useState, useEffect, useContext, etc.)
     * Browser APIs (window, localStorage, etc.)
     * Event handlers (onClick, onChange, etc.)

2. **Hydration errors**:
   - Error: "Hydration failed because the initial UI does not match..."
   - Common causes:
     * Different content between server and client
     * Using browser APIs in server components
     * Date/time rendering differences
   - Solution:
     ```tsx
     // Use client-only rendering for dynamic content
     const [mounted, setMounted] = useState(false);
     useEffect(() => setMounted(true), []);
     if (!mounted) return null;
     ```

3. **CSS variable issues in charts**:
   - Problem: Colors not showing or showing default colors
   - Check: CSS variables are defined in `globals.css`
   - Solution: Use `useChartColors` hook in chart components
   ```tsx
   const colors = useChartColors();
   // Use colors.chart1, colors.chart2, etc.
   ```

4. **TypeScript errors**:
   - "Property does not exist on type..."
   - Solution: Define proper interfaces
   ```tsx
   interface ComponentProps {
     title: string;
     value: number;
     optional?: string;
   }
   ```
   - Use `as const` for literal types:
   ```tsx
   changeType: "positive" as const
   ```

5. **Import path issues**:
   - Error: "Module not found: Can't resolve '@/components/...'"
   - Check: Path aliases are configured in `tsconfig.json`
   - Use correct aliases:
     * `@/components/...`
     * `@/lib/...`
     * `@/app/...`

6. **Theme not applying**:
   - Check: Component is wrapped in ThemeProvider (in layout.tsx)
   - Check: Using correct CSS variable syntax: `hsl(var(--color-name))`
   - Check: Color is defined in both `:root` and `.dark` selectors

7. **Chart not responsive**:
   - Wrap chart in ResponsiveContainer
   - Set proper width and height
   ```tsx
   <ResponsiveContainer width="100%" height={250}>
     <LineChart data={data}>...</LineChart>
   </ResponsiveContainer>
   ```

8. **Development debugging tools**:
   ```tsx
   // Console logging (remove in production)
   console.log("Debug:", { props, state });
   
   // React DevTools
   // Install React Developer Tools browser extension
   
   // Type checking
   npm run lint
   ```

9. **Common linting errors**:
   - "React Hook useEffect has missing dependencies"
   - Solution: Add all dependencies to dependency array
   ```tsx
   useEffect(() => {
     doSomething(value);
   }, [value]); // Add value to dependencies
   ```

10. **Performance issues**:
    - Use React DevTools Profiler
    - Check for unnecessary re-renders
    - Add React.memo for expensive components
    - Use useMemo for expensive calculations


## Examples

### Fix hydration error with dynamic content

```tsx
"use client";
import { useState, useEffect } from "react";

export default function DynamicComponent() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return <div>{new Date().toLocaleString()}</div>;
}

```

### Fix TypeScript prop errors

```tsx
// Define clear interfaces
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative"; // Union type
  icon: React.ComponentType<{ className?: string }>;
}

export function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  // Component implementation
}

```

### Debug chart color issues

```tsx
"use client";
import { useEffect } from "react";

function ChartComponent() {
  const colors = useChartColors();
  
  // Debug colors
  useEffect(() => {
    console.log("Chart colors:", colors);
  }, [colors]);
  
  return (
    <LineChart data={data}>
      <Line stroke={colors.chart1} />
    </LineChart>
  );
}

```


## Related Files

- `src/app/layout.tsx`
- `src/app/globals.css`
- `tsconfig.json`
- `next.config.ts`


## Related Skills

- `optimize-react-component`
- `add-chart`
- `add-theme-colors`

