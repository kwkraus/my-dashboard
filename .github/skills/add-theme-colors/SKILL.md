---
name: add-theme-colors
description: Add or customize theme colors in the CSS custom properties system
---

When adding or customizing theme colors in this Next.js dashboard:

1. **Locate the theme definitions** in `src/app/globals.css`:
   - Light theme: `:root` selector
   - Dark theme: `.dark` selector
   - Chart colors are defined in both themes

2. **Color format**: Use HSL values without the `hsl()` wrapper:
   ```css
   --color-name: 220 10% 50%;
   ```
   This allows using `hsl(var(--color-name))` in components.

3. **Available color categories**:
   - **Layout**: background, foreground, card, popover, border
   - **Elements**: primary, secondary, muted, accent, destructive
   - **Text**: foreground, muted-foreground, popover-foreground
   - **Charts**: chart-1 through chart-5

4. **Adding a new theme color**:
   ```css
   :root {
     --new-color: 210 100% 50%; /* Light mode */
   }
   
   .dark {
     --new-color: 210 50% 40%; /* Dark mode */
   }
   ```

5. **Using the color in components**:
   ```tsx
   // In Tailwind classes (if configured)
   className="text-new-color"
   
   // In inline styles or charts
   color: "hsl(var(--new-color))"
   backgroundColor: "hsl(var(--new-color))"
   ```

6. **Chart colors** (predefined: chart-1 through chart-5):
   - Used automatically by the `useChartColors` hook
   - Ensure both light and dark modes have distinct, accessible colors
   - Test visibility in both themes

7. **Best practices**:
   - Maintain color harmony across themes
   - Ensure sufficient contrast for accessibility (WCAG AA)
   - Test colors in both light and dark modes
   - Document custom colors if they serve specific purposes

8. **Color palette consistency**:
   - Light theme: Use higher lightness values (50-90%)
   - Dark theme: Use lower lightness values (10-40%)
   - Keep saturation similar for color harmony


## Examples

### Add a success color

```tsx
/* In src/app/globals.css */
:root {
  --success: 142 76% 36%; /* Green for light mode */
  --success-foreground: 0 0% 100%;
}

.dark {
  --success: 142 69% 58%; /* Lighter green for dark mode */
  --success-foreground: 0 0% 0%;
}

/* Usage in component */
<div className="bg-success text-success-foreground">
  Success message
</div>

```

### Add a new chart color

```tsx
/* In src/app/globals.css */
:root {
  --chart-6: 280 80% 60%; /* Purple for light mode */
}

.dark {
  --chart-6: 280 70% 50%; /* Adjusted purple for dark mode */
}

/* The useChartColors hook can be extended to use it */
const colors = {
  ...useChartColors(),
  chart6: "hsl(var(--chart-6))"
};

```


## Tips

- Use an HSL color picker for easy value adjustment
- Test accessibility with tools like WebAIM Contrast Checker
- Keep the HSL format consistent (no hsl() wrapper in CSS)
- Chart colors should be visually distinct from each other
- Theme colors automatically apply to shadcn/ui components


## Related Files

- `src/app/globals.css`
- `src/components/DashboardCharts.tsx`


## Related Skills

- `add-chart`
- `add-shadcn-component`

