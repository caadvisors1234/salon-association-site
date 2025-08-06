import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test('should navigate to the about page from the header', async ({ page }) => {
    // Start from the index page (the baseURL is set in the config)
    await page.goto('/');
    
    // Find the link within the header (banner role) and click it.
    await page.getByRole('banner').getByRole('link', { name: '協会概要' }).click();
    
    // The new URL should be "/about"
    await expect(page).toHaveURL('/about');
    
    // The new page should contain an h1 with "協会概要"
    await expect(page.getByRole('heading', { name: '協会概要' })).toBeVisible();
  });
});
