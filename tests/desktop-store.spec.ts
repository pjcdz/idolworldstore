import { test, expect } from '@playwright/test';

test.describe('Desktop Store Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('should display desktop layout with sidebar', async ({ page }) => {
    // Verificar que el layout de desktop esté visible
    await expect(page.locator('.lg\\:grid')).toBeVisible();
    
    // Verificar que el sidebar de filtros esté presente
    await expect(page.locator('.lg\\:col-span-3')).toBeVisible();
    
    // Verificar que el área de contenido principal esté presente
    await expect(page.locator('.lg\\:col-span-9')).toBeVisible();
  });

  test('should show store header with correct information', async ({ page }) => {
    // Verificar título de la tienda
    await expect(page.locator('h1:has-text("Idol World Store")')).toBeVisible();
    
    // Verificar que muestre el contador de productos
    await expect(page.locator('text=/\\d+ productos/')).toBeVisible();
    
    // Verificar indicador de disponibilidad
    await expect(page.locator('text="Productos K-pop disponibles"')).toBeVisible();
  });

  test('should display products in grid layout', async ({ page }) => {
    // Esperar a que los productos carguen
    await page.waitForSelector('[data-testid="product-card"], .bg-white.rounded-2xl', { timeout: 10000 });
    
    // Verificar que hay productos visibles
    const productCards = page.locator('.bg-white.rounded-2xl');
    await expect(productCards.first()).toBeVisible();
    
    // Verificar que los productos se muestran en grid (más de uno por fila en desktop)
    const gridContainer = page.locator('.grid.grid-cols-1.xl\\:grid-cols-2');
    await expect(gridContainer).toBeVisible();
  });

  test('should have working search filters in sidebar', async ({ page }) => {
    // Verificar que el título de filtros esté presente
    await expect(page.locator('h3:has-text("Filtros")')).toBeVisible();
    
    // Verificar que el componente de búsqueda gamificada esté presente
    await expect(page.locator('.bg-white.rounded-2xl.p-6')).toBeVisible();
  });

  test('should display exchange rate indicator', async ({ page }) => {
    // Verificar que el indicador de tipo de cambio esté presente
    await expect(page.locator('text=/USD.*ARS/i')).toBeVisible();
  });

  test('should show contact information', async ({ page }) => {
    // Verificar botón de WhatsApp en banner principal
    await expect(page.locator('text="¡Contáctanos por WhatsApp!"')).toBeVisible();
    
    // Verificar información de contacto en sidebar
    await expect(page.locator('text="Todos nuestros productos están disponibles para consulta"')).toBeVisible();
  });

  test('should have responsive product cards with all elements', async ({ page }) => {
    // Esperar a que los productos carguen
    await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
    
    const firstProduct = page.locator('.bg-white.rounded-2xl').first();
    
    // Verificar que la tarjeta de producto tenga imagen
    await expect(firstProduct.locator('img')).toBeVisible();
    
    // Verificar que tenga categoría
    await expect(firstProduct.locator('[class*="badge"], .text-xs.text-gray-600')).toBeVisible();
    
    // Verificar que tenga título
    await expect(firstProduct.locator('h2, .text-lg.font-semibold')).toBeVisible();
    
    // Verificar que tenga precio en USD
    await expect(firstProduct.locator('text=/\\$\\d+.*USD/')).toBeVisible();
    
    // Verificar que tenga precio en ARS
    await expect(firstProduct.locator('text=/\\$.*ARS/')).toBeVisible();
    
    // Verificar que tenga botón de WhatsApp
    await expect(firstProduct.locator('text="WhatsApp", text="Consultar"')).toBeVisible();
  });

  test('should handle product image interaction', async ({ page }) => {
    // Esperar a que los productos carguen
    await page.waitForSelector('.bg-white.rounded-2xl img', { timeout: 10000 });
    
    const firstProductImage = page.locator('.bg-white.rounded-2xl img').first();
    
    // Hacer click en la imagen del producto
    await firstProductImage.click();
    
    // Verificar que se abra el modal de imagen
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // Verificar que haya un botón de cerrar
    await expect(page.locator('button:has([class*="close"]), button:has-text("×")')).toBeVisible();
    
    // Cerrar el modal haciendo click en el botón cerrar o presionando Escape
    await page.keyboard.press('Escape');
    
    // Verificar que el modal se cierre
    await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
  });

  test('should have working sticky sidebar on scroll', async ({ page }) => {
    // Verificar que el sidebar tenga clase sticky
    await expect(page.locator('.sticky.top-24')).toBeVisible();
    
    // Scroll hacia abajo para verificar comportamiento sticky
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    // Verificar que el sidebar siga visible
    await expect(page.locator('.lg\\:col-span-3 .sticky')).toBeVisible();
  });

  test('should display product stats', async ({ page }) => {
    // Verificar que las estadísticas de productos estén visibles en el sidebar
    const statsComponent = page.locator('[data-testid="product-stats"], .space-y-6 > div').first();
    await expect(statsComponent).toBeVisible();
  });

  test('should have proper navigation and header', async ({ page }) => {
    // Verificar que el header esté presente
    await expect(page.locator('header, [data-testid="header"]')).toBeVisible();
    
    // Verificar que los iconos del header estén presentes
    await expect(page.locator('[class*="material-icons"]:has-text("filter_list"), [class*="material-icons"]:has-text("search")')).toBeVisible();
  });

  test('should load within performance threshold', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    
    // Esperar a que los productos carguen
    await page.waitForSelector('.bg-white.rounded-2xl', { timeout: 10000 });
    
    const loadTime = Date.now() - startTime;
    
    // Verificar que la página cargue en menos de 10 segundos
    expect(loadTime).toBeLessThan(10000);
  });
});
