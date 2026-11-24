# Casos de prueba – Checkout de MiniModa

Demo bajo prueba: https://minimoda-navy.vercel.app/checkout

Controles accesibles observados: textboxes `Nombre`, `Dirección`, `Email`, `Número de tarjeta`, `Vencimiento (MM/AA)` y `CVV`; combobox `País de envío`; botón `Confirmar compra`.

## PAGO-01: Compra válida

- **ID:** PAGO-01
- **Objetivo:** Comprobar que el checkout permite confirmar una compra utilizando únicamente datos sintéticos.
- **Precondiciones:** La demo de MiniModa está disponible en la ruta de checkout indicada y el formulario está accesible.
- **Datos de prueba:** Nombre `Prueba MiniModa`; dirección `Calle Ficticia 123`; email `prueba@example.test`; país `Argentina`; número de tarjeta `4111111111111111` (tarjeta de prueba publicada por la demo); vencimiento `12/30`; CVV válido `123`.
- **Pasos:**
  1. Abrir la ruta de checkout de la demo.
  2. Completar `Nombre`, `Dirección`, `Email`, `Número de tarjeta`, `Vencimiento (MM/AA)` y `CVV` con los valores sintéticos indicados. Dejar o seleccionar `Argentina` en `País de envío`.
  3. Activar el botón `Confirmar compra`.
- **Resultado esperado:** Se muestra un elemento con rol `status` que contiene **“Compra confirmada”**. El identificador de orden puede variar y no debe validarse contra un número exacto. En la ejecución observada se mostró: “Compra confirmada. Orden MM-458834. Envío a Argentina: $ 3.500. Te enviamos un email de confirmación (ver Bandeja).” **A VERIFICAR:** si los datos de envío e email permanecen iguales en otras ejecuciones.
- **Evidencia de origen:** Compra completada en la demo indicada usando los datos sintéticos descritos. URL: https://minimoda-navy.vercel.app/checkout.

## PAGO-0X: CVV inválido

- **ID:** PAGO-0X
- **Objetivo:** Comprobar que un CVV de dos dígitos es rechazado.
- **Precondiciones:** La demo de MiniModa está disponible en la ruta de checkout indicada y el formulario está accesible.
- **Datos de prueba:** Nombre `Prueba MiniModa`; dirección `Calle Ficticia 123`; email `prueba@example.test`; país `Argentina`; número de tarjeta `4111111111111111` (tarjeta de prueba publicada por la demo); vencimiento `12/30`; CVV `12` (inválido por tener dos dígitos).
- **Pasos:**
  1. Abrir la ruta de checkout de la demo.
  2. Completar `Nombre`, `Dirección`, `Email`, `Número de tarjeta` y `Vencimiento (MM/AA)` con los valores sintéticos indicados, y dejar o seleccionar `Argentina` en `País de envío`.
  3. Ingresar `12` en el textbox `CVV`.
  4. Activar el botón `Confirmar compra`.
- **Resultado esperado:** El textbox `CVV` queda marcado como inválido y se muestra un elemento con rol `alert` con el mensaje exacto **“El CVV debe tener 3 o 4 dígitos.”** También se muestra el aviso general **“Revisá los campos marcados.”**
- **Evidencia de origen:** Validación observada en la demo indicada con los datos sintéticos descritos. URL: https://minimoda-navy.vercel.app/checkout.

## Observación pendiente de análisis

- Durante la inspección se pudo confirmar la compra con el carrito vacío y subtotal de prendas `$ 0`; el checkout mostró una confirmación.
- **Pendiente:** analizar si permitir confirmar una compra sin prendas es el comportamiento esperado. Esta observación no forma parte de los resultados esperados de PAGO-01 ni PAGO-0X.
