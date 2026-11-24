import { test, expect } from '@playwright/test';

const checkoutUrl = 'https://minimoda-navy.vercel.app/checkout';

test('PAGO-01 confirma una compra válida', async ({ page }) => {
  await page.goto(checkoutUrl);

  const nombre = page.getByRole('textbox', { name: 'Nombre' });
  await nombre.fill('Prueba MiniModa');
  await expect(nombre).toHaveValue('Prueba MiniModa');
  await page.getByRole('textbox', { name: 'Dirección' }).fill('Calle Ficticia 123');
  await expect(nombre).toHaveValue('Prueba MiniModa');
  await page.getByRole('textbox', { name: 'Email' }).fill('prueba@example.test');
  await expect(nombre).toHaveValue('Prueba MiniModa');
  await page.getByRole('combobox', { name: 'País de envío' }).selectOption({ label: 'Argentina' });
  await expect(nombre).toHaveValue('Prueba MiniModa');
  await page.getByRole('textbox', { name: 'Número de tarjeta' }).fill('4111111111111111');
  await expect(nombre).toHaveValue('Prueba MiniModa');
  await page.getByRole('textbox', { name: 'Vencimiento (MM/AA)' }).fill('12/30');
  await expect(nombre).toHaveValue('Prueba MiniModa');
  await page.getByRole('textbox', { name: 'CVV' }).fill('123');
  await expect(nombre).toHaveValue('Prueba MiniModa');
  await expect(nombre).toHaveValue('Prueba MiniModa');

  await page.getByRole('button', { name: 'Confirmar compra' }).click();
  await expect(nombre).toHaveValue('Prueba MiniModa');

  await expect(page.getByRole('status')).toContainText('Compra confirmada');
});

test('PAGO-0X rechaza un CVV de dos dígitos', async ({ page }) => {
  await page.goto(checkoutUrl);

  await page.getByRole('textbox', { name: 'Nombre' }).fill('Prueba MiniModa');
  await page.getByRole('textbox', { name: 'Dirección' }).fill('Calle Ficticia 123');
  await page.getByRole('textbox', { name: 'Email' }).fill('prueba@example.test');
  await page.getByRole('combobox', { name: 'País de envío' }).selectOption({ label: 'Argentina' });
  await page.getByRole('textbox', { name: 'Número de tarjeta' }).fill('4111111111111111');
  await page.getByRole('textbox', { name: 'Vencimiento (MM/AA)' }).fill('12/30');
  await page.getByRole('textbox', { name: 'CVV' }).fill('12');

  await page.getByRole('button', { name: 'Confirmar compra' }).click();

  const cvvError = page.getByRole('alert').filter({
    hasText: /^El CVV debe tener 3 o 4 dígitos\.$/,
  });
  await expect(cvvError).toHaveText('El CVV debe tener 3 o 4 dígitos.');
  await expect(page.getByRole('status')).toHaveCount(0);
});
