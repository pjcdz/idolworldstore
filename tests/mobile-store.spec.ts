import { test, expect } from '@playwright/test';

test.describe('Mobile Store Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
  });

  test('should display mobile layout without sidebar', async ({ page }) => {
    // Verificar que el layout de desktop NO esté visible en mobile
    await expect(page.locator('.lg\\:grid')).not.toBeVisible();
    
    // Verificar que el layout mobile SÍ esté visible
    await expect(page.locator('.lg\\:hidden')).toBeVisible();
  });

  test('should show store header optimized for mobile', async ({ page }) => {
    // Verificar título de la tienda en mobile
    await expect(page.locator('h1:has-text("Idol World Store")')).toBeVisible();
    
    // Verificar que el diseño sea más compacto en mobile
    await expect(page.locator('.text-2xl.font-bold.text-white')).toBeVisible();
    
    // Verificar contador de productos
    await expect(page.locator('text=/\\d+/')).toBeVisible();
  });

  test('should display products in list layout on mobile', async ({ page }) => {
    // Esperar a que los productos carguen
    await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
    
    // Verificar que los productos se muestran en lista vertical
    const productCards = page.locator('.bg-white.rounded-2xl');
    await expect(productCards.first()).toBeVisible();
    
    // En mobile no debería haber grid de 2 columnas
    await expect(page.locator('.xl\\:grid-cols-2')).not.toBeVisible();
  });

  test('should have accessible mobile navigation', async ({ page }) => {
    // Verificar que el header tenga iconos de navegación
    await expect(page.locator('[class*="material-icons"]')).toBeVisible();
    
    // Verificar que se pueda hacer tap en los iconos del header
    const filterIcon = page.locator('[class*="material-icons"]:has-text("filter_list")').first();
    if (await filterIcon.isVisible()) {
      await filterIcon.click();
    }
  });

  test('should handle touch interactions on product cards', async ({ page }) => {
    // Esperar a que los productos carguen
    await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
    
    const firstProduct = page.locator('.bg-white.rounded-2xl').first();
    
    // Verificar que la tarjeta sea touchable
    await expect(firstProduct).toBeVisible();
    
    // Simular tap en la imagen del producto
    const productImage = firstProduct.locator('img').first();
    await productImage.tap();
    
    // Verificar que se abra el modal
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // Cerrar modal con tap en el fondo o botón cerrar
    await page.keyboard.press('Escape');
    await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
  });

  test('should display mobile-optimized contact section', async ({ page }) => {
    // Verificar que la sección de contacto esté presente
    await expect(page.locator('text="¡Contáctanos por WhatsApp!"')).toBeVisible();
    
    // Verificar que el botón de WhatsApp esté visible y sea touchable
    await expect(page.locator('text="Consultar", text="WhatsApp"')).toBeVisible();
  });

  test('should show exchange rate indicator on mobile', async ({ page }) => {
    // Verificar que el indicador de tipo de cambio esté presente en mobile
    await expect(page.locator('text=/USD.*ARS/i')).toBeVisible();
  });

  test('should handle mobile scrolling smoothly', async ({ page }) => {
    // Scroll hacia abajo
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Verificar que la página responda al scroll
    const scrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(scrollPosition).toBeGreaterThan(0);
    
    // Scroll de vuelta arriba
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Verificar que volvió arriba
    const newScrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(newScrollPosition).toBe(0);
  });

  test('should have proper mobile font sizes and spacing', async ({ page }) => {
    // Verificar que los textos sean legibles en mobile
    const title = page.locator('h1:has-text("Idol World Store")');
    await expect(title).toBeVisible();
    
    // Verificar que los precios sean legibles
    await expect(page.locator('text=/\\$\\d+.*USD/')).toBeVisible();
    
    // Verificar que los botones tengan tamaño apropiado para touch
    const whatsappButtons = page.locator('text="Consultar", text="WhatsApp"');
    await expect(whatsappButtons.first()).toBeVisible();
  });

  test('should load quickly on mobile', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    
    // Esperar a que el contenido principal cargue
    await page.waitForSelector('h1:has-text("Idol World Store")', { timeout: 8000 });
    
    const loadTime = Date.now() - startTime;
    
    // Verificar que la página cargue rápido en mobile
    expect(loadTime).toBeLessThan(8000);
  });

  test('should display mobile product stats', async ({ page }) => {
    // Verificar que las estadísticas estén visibles en mobile
    // Buscar por diferentes posibles selectores
    const hasStats = await page.locator('[data-testid="product-stats"]').isVisible() || 
                     await page.locator('text=/\\d+ producto/').isVisible();
    expect(hasStats).toBeTruthy();
  });

  test('should handle mobile orientation changes', async ({ page }) => {
    // Cambiar a orientación landscape
    await page.setViewportSize({ width: 667, height: 375 });
    
    // Verificar que la página siga funcionando
    await expect(page.locator('h1:has-text("Idol World Store")')).toBeVisible();
    
    // Cambiar de vuelta a portrait
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verificar que siga funcionando
    await expect(page.locator('h1:has-text("Idol World Store")')).toBeVisible();
  });

  test('should have mobile-friendly product information layout', async ({ page }) => {
    // Esperar a que los productos carguen
    await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
    
    const firstProduct = page.locator('.bg-white.rounded-2xl').first();
    
    // Verificar elementos del producto en mobile
    await expect(firstProduct.locator('img')).toBeVisible();
    await expect(firstProduct.locator('h2, .text-lg.font-semibold')).toBeVisible();
    await expect(firstProduct.locator('text=/\\$\\d+.*USD/')).toBeVisible();
    
    // Verificar que el botón de WhatsApp sea prominente
    const whatsappButton = firstProduct.locator('button, a').filter({ hasText: /consultar|whatsapp/i });
    await expect(whatsappButton.first()).toBeVisible();
  });
});
