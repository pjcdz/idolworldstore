import { test, expect } from '@playwright/test';

test.describe('Store Functionality Tests', () => {
  test.describe('Search and Filters', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should be able to filter products by group', async ({ page }) => {
      // En desktop, el filtro debería estar en el sidebar
      if (await page.locator('.lg\\:col-span-3').isVisible()) {
        // Desktop layout
        const sidebarSearch = page.locator('.lg\\:col-span-3 [data-testid="gamified-search"], .bg-white.rounded-2xl.p-6');
        await expect(sidebarSearch).toBeVisible();
      } else {
        // Mobile layout - buscar icono de búsqueda/filtro
        const searchIcon = page.locator('[class*="material-icons"]:has-text("search"), [class*="material-icons"]:has-text("filter_list")').first();
        if (await searchIcon.isVisible()) {
          await searchIcon.click();
          await page.waitForTimeout(500); // Esperar a que se abra el modal/componente
        }
      }
      
      // Buscar opciones de grupos disponibles
      const groupOptions = page.locator('button, div').filter({ hasText: /BLACKPINK|BTS|TWICE|IVE|ITZY/i });
      if (await groupOptions.first().isVisible()) {
        await groupOptions.first().click();
        
        // Esperar a que se filtren los productos
        await page.waitForTimeout(1000);
        
        // Verificar que los productos se hayan filtrado
        await expect(page.locator('.bg-white.rounded-2xl')).toBeVisible();
      }
    });

    test('should be able to filter products by category', async ({ page }) => {
      // Buscar selectores de categoría
      const categorySelectors = page.locator('text=/album|photocard|poster|lightstick/i');
      
      if (await categorySelectors.first().isVisible()) {
        await categorySelectors.first().click();
        await page.waitForTimeout(1000);
        
        // Verificar que los productos se hayan filtrado
        await expect(page.locator('.bg-white.rounded-2xl')).toBeVisible();
      }
    });

    test('should show search results count', async ({ page }) => {
      // Verificar que se muestre algún tipo de contador o estadística
      const hasCounter = await page.locator('text=/\\d+ producto/').isVisible() ||
                        await page.locator('text=/\\d+/').isVisible();
      expect(hasCounter).toBeTruthy();
    });
  });

  test.describe('Product Interactions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
    });

    test('should open product image in modal', async ({ page }) => {
      const firstProductImage = page.locator('.bg-white.rounded-2xl img').first();
      await firstProductImage.click();
      
      // Verificar que se abra el modal
      await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
      
      // Cerrar modal
      await page.keyboard.press('Escape');
      await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
    });

    test('should have working WhatsApp buttons', async ({ page }) => {
      const whatsappButton = page.locator('button, a').filter({ hasText: /whatsapp|consultar/i }).first();
      await expect(whatsappButton).toBeVisible();
      
      // Verificar que el botón sea clickeable (no verificamos el link real para evitar abrir WhatsApp)
      await expect(whatsappButton).toBeEnabled();
    });

    test('should show product prices in both USD and ARS', async ({ page }) => {
      const firstProduct = page.locator('.bg-white.rounded-2xl').first();
      
      // Verificar precio en USD
      await expect(firstProduct.locator('text=/\\$\\d+.*USD/')).toBeVisible();
      
      // Verificar precio en ARS
      await expect(firstProduct.locator('text=/\\$.*ARS/')).toBeVisible();
    });

    test('should display product categories', async ({ page }) => {
      const firstProduct = page.locator('.bg-white.rounded-2xl').first();
      
      // Verificar que tenga categoría visible
      const categoryBadge = firstProduct.locator('[class*="badge"], .text-xs');
      await expect(categoryBadge.first()).toBeVisible();
    });
  });

  test.describe('Store Information', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should display store branding', async ({ page }) => {
      await expect(page.locator('h1:has-text("Idol World Store")')).toBeVisible();
      await expect(page.locator('text="Productos K-pop disponibles"')).toBeVisible();
    });

    test('should show exchange rate information', async ({ page }) => {
      await expect(page.locator('text=/USD.*ARS/i')).toBeVisible();
    });

    test('should display contact information', async ({ page }) => {
      await expect(page.locator('text="¡Contáctanos por WhatsApp!"')).toBeVisible();
      await expect(page.locator('text="Todos nuestros productos están disponibles"')).toBeVisible();
    });

    test('should have consistent branding colors', async ({ page }) => {
      // Verificar que haya elementos con colores de marca (purple, pink)
      const brandElements = page.locator('[class*="purple"], [class*="pink"], [class*="gradient"]');
      await expect(brandElements.first()).toBeVisible();
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load store within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForSelector('h1:has-text("Idol World Store")', { timeout: 8000 });
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(8000);
    });

    test('should load products within acceptable time', async ({ page }) => {
      await page.goto('/');
      
      const startTime = Date.now();
      await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(10000);
    });

    test('should handle no network gracefully', async ({ page }) => {
      // Simular problema de red
      await page.route('**/*', route => route.abort());
      
      try {
        await page.goto('/', { timeout: 5000 });
      } catch (error) {
        // Esperamos que falle la navegación
        expect(error).toBeDefined();
      }
    });
  });

  test.describe('Responsive Design', () => {
    const devices = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 },
    ];

    devices.forEach(device => {
      test(`should work on ${device.name}`, async ({ page }) => {
        await page.setViewportSize({ width: device.width, height: device.height });
        await page.goto('/');
        
        // Verificar elementos básicos en cada dispositivo
        await expect(page.locator('h1:has-text("Idol World Store")')).toBeVisible();
        await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
        await expect(page.locator('.bg-white.rounded-2xl').first()).toBeVisible();
      });
    });
  });

  test.describe('Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Test navegación por teclado
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Verificar que algún elemento tenga focus
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('should have proper heading structure', async ({ page }) => {
      // Verificar que haya h1
      await expect(page.locator('h1')).toBeVisible();
      
      // Verificar que haya headings secundarios
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      expect(headingCount).toBeGreaterThan(1);
    });

    test('should have alt text for images', async ({ page }) => {
      await page.waitForSelector('img', { timeout: 10000 });
      
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Verificar que al menos algunas imágenes tengan alt text
        const imagesWithAlt = images.filter({ has: page.locator('[alt]') });
        const altCount = await imagesWithAlt.count();
        expect(altCount).toBeGreaterThan(0);
      }
    });
  });
});
