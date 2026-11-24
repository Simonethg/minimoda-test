# MiniModa – Convenciones de tests

- Utilizá getByRole o getByLabel con nombres realmente observados en la interfaz.
- No utilices waitForTimeout ni esperas fijas.
- Incluí el identificador del caso de prueba en el nombre de cada test (por ejemplo PAGO-01).
- Comprobá el resultado esperado mediante assertions de la interfaz.
- No utilices expect(page).toBeTruthy() ni assertions que siempre pasan.
- Si falta un texto, selector o comportamiento comprobado, indicá A VERIFICAR.
- No utilices test.skip, test.fixme ni test.only.
- Ejecutá los tests después de modificarlos.
- La única demo permitida para estos tests es https://minimoda-navy.vercel.app/checkout.
- Utilizá exclusivamente datos ficticios para las pruebas de pago.
