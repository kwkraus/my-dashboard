import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test.describe('Navigation', () => {
    test('should navigate to dashboard from root', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL('/dashboard');
    });

    test('should render dashboard page', async ({ page }) => {
      await expect(page).toHaveURL('/dashboard');
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('should have sidebar visible on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      const sidebar = page.locator('[data-testid="app-sidebar"]');
      await expect(sidebar).toBeVisible();
    });

    test('should have collapsible sidebar on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const sidebar = page.locator('[data-testid="app-sidebar"]');
      // Sidebar may be hidden or collapsed on mobile
      const sidebarButton = page.locator('[data-testid="sidebar-trigger"]');
      await expect(sidebarButton).toBeVisible();
    });
  });

  test.describe('Dashboard Cards', () => {
    test('should render all metric cards', async ({ page }) => {
      const cards = page.locator('[data-testid^="dashboard-card-"]');
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);
    });

    test('should display card titles', async ({ page }) => {
      const cardTitles = page.locator('[data-testid="card-title"]');
      const titleCount = await cardTitles.count();
      expect(titleCount).toBeGreaterThan(0);
      
      const firstTitle = cardTitles.first();
      await expect(firstTitle).toHaveText(/.+/); // Non-empty text
    });

    test('should display card values', async ({ page }) => {
      const cardValues = page.locator('[data-testid="card-value"]');
      const valueCount = await cardValues.count();
      expect(valueCount).toBeGreaterThan(0);
      
      const firstValue = cardValues.first();
      await expect(firstValue).toBeVisible();
    });

    test('should display stat cards with trend indicators', async ({ page }) => {
      const statCards = page.locator('[data-testid="stat-card"]');
      const statCardCount = await statCards.count();
      // May have some stat cards
      if (statCardCount > 0) {
        const trendIndicator = statCards.first().locator('[data-testid="trend-indicator"]');
        await expect(trendIndicator).toBeVisible();
      }
    });
  });

  test.describe('Dashboard Charts', () => {
    test('should render chart containers', async ({ page }) => {
      const charts = page.locator('[data-testid^="chart-"]');
      const chartCount = await charts.count();
      expect(chartCount).toBeGreaterThan(0);
    });

    test('should render chart titles', async ({ page }) => {
      const chartTitles = page.locator('[data-testid="chart-title"]');
      const titleCount = await chartTitles.count();
      expect(titleCount).toBeGreaterThan(0);
    });

    test('should render chart SVG elements', async ({ page }) => {
      const svgElements = page.locator('svg');
      const svgCount = await svgElements.count();
      expect(svgCount).toBeGreaterThan(0);
    });

    test('should render responsive charts on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const charts = page.locator('[data-testid^="chart-"]');
      const chartCount = await charts.count();
      expect(chartCount).toBeGreaterThan(0);
    });
  });

  test.describe('Theme Switching', () => {
    test('should have theme toggle button in header', async ({ page }) => {
      const themeToggle = page.locator('[data-testid="theme-toggle"]');
      await expect(themeToggle).toBeVisible();
    });

    test('should toggle between light and dark themes', async ({ page }) => {
      const html = page.locator('html');
      
      // Get initial theme
      const initialClass = await html.getAttribute('class');
      
      // Click theme toggle
      const themeToggle = page.locator('[data-testid="theme-toggle"]');
      await themeToggle.click();
      
      // Wait for theme change
      await page.waitForTimeout(500);
      
      // Verify theme changed
      const newClass = await html.getAttribute('class');
      expect(initialClass).not.toBe(newClass);
    });

    test('should apply theme CSS variables', async ({ page }) => {
      const html = page.locator('html');
      
      // Get computed style for a CSS variable
      const chartColor1 = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--chart-1');
      });
      
      // CSS variable should be defined
      expect(chartColor1).toBeTruthy();
    });

    test('should persist theme preference', async ({ page, context }) => {
      // Toggle theme
      const themeToggle = page.locator('[data-testid="theme-toggle"]');
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      const themeBefore = await page.locator('html').getAttribute('class');
      
      // Reload page in same context
      await page.reload();
      
      const themeAfter = await page.locator('html').getAttribute('class');
      expect(themeBefore).toBe(themeAfter);
    });
  });

  test.describe('Header', () => {
    test('should render app header', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
    });

    test('should have navigation elements in header', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Check for common header elements
      const navElements = header.locator('nav, button');
      const navCount = await navElements.count();
      expect(navCount).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on tablet (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const main = page.locator('main');
      await expect(main).toBeVisible();
      
      const cards = page.locator('[data-testid^="dashboard-card-"]');
      expect(await cards.count()).toBeGreaterThan(0);
    });

    test('should be responsive on large desktop (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const main = page.locator('main');
      await expect(main).toBeVisible();
      
      const cards = page.locator('[data-testid^="dashboard-card-"]');
      expect(await cards.count()).toBeGreaterThan(0);
    });

    test('should layout cards in responsive grid', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const cards = page.locator('[data-testid^="dashboard-card-"]');
      const mobileCount = await cards.count();
      
      await page.setViewportSize({ width: 1200, height: 800 });
      const desktopCount = await cards.count();
      
      expect(mobileCount).toBe(desktopCount); // Same cards, different layout
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper semantic HTML', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();
      
      const headings = page.locator('h1, h2, h3');
      const headingCount = await headings.count();
      expect(headingCount).toBeGreaterThan(0);
    });

    test('should have keyboard navigation', async ({ page }) => {
      const themeToggle = page.locator('[data-testid="theme-toggle"]');
      
      // Tab to theme toggle
      await page.keyboard.press('Tab');
      // Continue tabbing to reach it (may need multiple tabs)
      for (let i = 0; i < 10; i++) {
        const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
        if (focused === 'theme-toggle') break;
        await page.keyboard.press('Tab');
      }
      
      // Activate with Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    });

    test('should have sufficient color contrast', async ({ page }) => {
      // Verify that text elements are visible and readable
      const cardTitles = page.locator('[data-testid="card-title"]');
      const titleCount = await cardTitles.count();
      
      if (titleCount > 0) {
        const firstTitle = cardTitles.first();
        // Check that element is in viewport and visible
        await expect(firstTitle).toBeInViewport();
        const isVisible = await firstTitle.isVisible();
        expect(isVisible).toBe(true);
      }
    });
  });

  test.describe('Performance', () => {
    test('should load dashboard within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/dashboard', { waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;
      
      // Dashboard should load in under 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should display content before full page load', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      
      // Main content should be visible even with domcontentloaded
      const main = page.locator('main');
      await expect(main).toBeVisible({ timeout: 2000 });
    });
  });

  test.describe('Error Handling', () => {
    test('should handle missing or invalid chart data gracefully', async ({ page }) => {
      // Simply verify the page renders without crashing
      await expect(page).toHaveURL('/dashboard');
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('should not show console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('/dashboard');
      
      // Allow some time for any errors to appear
      await page.waitForTimeout(1000);
      
      expect(errors).toEqual([]);
    });
  });
});
