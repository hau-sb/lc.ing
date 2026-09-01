import { test, expect } from '@playwright/test';

test.describe('LCIng Homepage QA', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LCIng/);
  });

  test('should have all major sections', async ({ page }) => {
    await page.goto('/');

    // Header
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=LCIng')).toBeVisible();

    // Hero
    await expect(page.locator('text=Asesoría en homologación de ingenierías')).toBeVisible();

    // About
    await expect(page.locator('text=Quiénes somos')).toBeVisible();

    // Services
    await expect(page.locator('text=El Proceso')).toBeVisible();

    // Testimonials
    await expect(page.locator('text=Lo que dicen nuestros clientes')).toBeVisible();

    // Contact
    await expect(page.locator('text=¿Tienes preguntas?')).toBeVisible();

    // Footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation links should work', async ({ page }) => {
    await page.goto('/');

    // Click on "Sobre mí" link
    await page.click('a[href="#about"]');
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('contact form should be visible', async ({ page }) => {
    await page.goto('/');

    const form = page.locator('form[name="contact"]');
    await expect(form).toBeVisible();

    const inputs = form.locator('input, textarea, select');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(0);
  });

  test('contact info should be in footer', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('text=homologacionesau@gmail.com')).toBeVisible();
    await expect(page.locator('text=+57 317 071 7870')).toBeVisible();
  });

  test('testimonials carousel should be visible', async ({ page }) => {
    await page.goto('/');

    const carousel = page.locator('.testimonials-carousel');
    await expect(carousel).toBeVisible();

    const testimonialCards = page.locator('.testimonial-card');
    const count = await testimonialCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('services process should display 6 steps', async ({ page }) => {
    await page.goto('/');

    const serviceItems = page.locator('.service-item');
    const count = await serviceItems.count();
    expect(count).toBe(6);

    // Check each step has title and description
    for (let i = 0; i < count; i++) {
      const item = serviceItems.nth(i);
      const h3 = item.locator('h3');
      const p = item.locator('p');

      await expect(h3).toBeVisible();
      await expect(p).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // All sections should still be visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
  });

  test('CTA buttons should be clickable', async ({ page }) => {
    await page.goto('/');

    const ctaButtons = page.locator('a.cta-button, button[type="submit"]');
    const count = await ctaButtons.count();
    expect(count).toBeGreaterThan(0);

    // Verify at least one CTA is visible
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('page should have good performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });
});
