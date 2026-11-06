import { test, expect } from '@playwright/test';

const BASE = 'https://minimoda-navy.vercel.app';

test('PAGO-01 · completar compra con datos sintéticos válidos', async ({ page }) => {
  await page.goto(`${BASE}/producto/1`);
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();

  await page.goto(`${BASE}/checkout`);
  await page.getByLabel('Nombre').fill('Ana Demo');
  await page.getByLabel('Dirección').fill('Calle Falsa 123');
  await page.getByLabel('Email').fill('ana.demo@minimoda.test');
  await page.getByLabel('Número de tarjeta').fill('4111111111111111');
  await page.getByLabel(/Vencimiento/).fill('12/30');
  await page.getByLabel('CVV', { exact: true }).fill('123');
  await page.getByRole('button', { name: /Confirmar compra/i }).click();

  await expect(page.getByText(/Compra confirmada/i)).toBeVisible();
});

test('PAGO-0X · CVV de dos dígitos muestra error de formato', async ({ page }) => {
  await page.goto(`${BASE}/checkout`);
  await page.getByLabel('Nombre').fill('Ana Demo');
  await page.getByLabel('Dirección').fill('Calle Falsa 123');
  await page.getByLabel('Email').fill('ana.demo@minimoda.test');
  await page.getByLabel('Número de tarjeta').fill('4111111111111111');
  await page.getByLabel(/Vencimiento/).fill('12/30');
  await page.getByLabel('CVV', { exact: true }).fill('12');
  await page.getByRole('button', { name: /Confirmar compra/i }).click();

  await expect(page.getByText(/El CVV debe tener 3 o 4 dígitos/i)).toBeVisible();
});
