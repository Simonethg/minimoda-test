import { test, expect, type Page } from '@playwright/test';

// Casos: casos/pago.md · Demo: https://minimoda-navy.vercel.app/checkout
// Datos sintéticos de la demo (sin datos reales de pago).
// Textos confirmados en evidencias/clase4-simulacion/04-probe-ui.log
const CHECKOUT_URL = 'https://minimoda-navy.vercel.app/checkout';

async function completarCheckout(page: Page, cvv: string) {
  await page.goto(CHECKOUT_URL);

  // 1. Datos y envío
  await page.getByLabel('Nombre').fill('Ana Pérez');
  await page.getByLabel('Dirección').fill('Calle Falsa 123');
  await page.getByLabel('Email').fill('ana.perez@example.com');
  // País de envío: valor por defecto de la demo (Argentina).
  await expect(page.getByLabel('País de envío')).toHaveValue('AR');

  // 2. Pago (tarjeta de prueba de la demo)
  await page.getByLabel('Número de tarjeta').fill('4111111111111111');
  await page.getByLabel('Vencimiento (MM/AA)').fill('12/30');
  await page.getByLabel('CVV').fill(cvv);

  // 3. Confirmación
  await page.getByRole('button', { name: 'Confirmar compra' }).click();
}

test('PAGO-01 · compra con datos sintéticos válidos muestra «Compra confirmada»', async ({ page }) => {
  await completarCheckout(page, '123');

  // Observado: «✅ Compra confirmada. Orden MM-797652. Envío a Argentina: …»
  await expect(page.getByText(/Compra confirmada/)).toBeVisible();
  await expect(page.getByText(/Orden MM-\d+/)).toBeVisible();
});

test('PAGO-0X · CVV de 2 dígitos muestra error de formato y seguís en checkout', async ({ page }) => {
  await completarCheckout(page, '12');

  await expect(page.getByText('El CVV debe tener 3 o 4 dígitos.', { exact: true })).toBeVisible();
  // Seguís en checkout: el botón sigue visible, la URL no cambia y no hay confirmación.
  await expect(page.getByRole('button', { name: 'Confirmar compra' })).toBeVisible();
  await expect(page).toHaveURL(CHECKOUT_URL);
  await expect(page.getByText(/Compra confirmada/)).toHaveCount(0);
});
