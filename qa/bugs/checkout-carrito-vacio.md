# Bug: Checkout confirma la compra con el carrito vacío

- **Ambiente:** Chromium, desktop 1440x900, https://minimoda-navy.vercel.app/checkout
- **Precondiciones:** carrito vacío
- **Pasos para reproducir:**
  1. Entrar directo a `/checkout` sin agregar productos.
  2. Completar nombre, dirección, un email válido y país Argentina.
  3. Tarjeta 4111 1111 1111 1111, vencimiento 12/29, CVV 123.
  4. Click en **Confirmar compra**.
- **Resultado esperado:** no permite confirmar y avisa que el carrito está vacío.
- **Resultado actual:** muestra "Compra confirmada. Orden MM-XXXXXX" con envío de $ 3.500, aunque el resumen dice "Todavía no hay prendas en el carrito".
- **Severidad:** major
- **Prioridad:** high
- **Evidencia:** `qa/evidencias/11-bug-checkout-confirma-con-carrito-vacio.png`
