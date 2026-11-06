# Casos de pago · MiniModa checkout

| ID | Entrada | Esperado (confirmado en UI) |
|---|---|---|
| PAGO-01 | Compra con datos sintéticos válidos | Mensaje de compra confirmada + orden |
| PAGO-0X | CVV `12` y enviar | Error de formato de CVV; seguís en checkout |

## Datos sintéticos de referencia (demo)
- Nombre: Ana Pérez
- Dirección: Calle Falsa 123
- Email: ana.perez@example.com
- País de envío: el valor por defecto de la demo (A VERIFICAR si hay select)
- Número de tarjeta: 4111111111111111
- Vencimiento: 12/30
- CVV válido: 123
- CVV inválido (PAGO-0X): 12

## Observado en la demo
- Labels: Nombre, Dirección, Email, País de envío, Número de tarjeta, Vencimiento (MM/AA), CVV
- Botón: Confirmar compra
- Compra OK → mensaje con «Compra confirmada» (A VERIFICAR copy exacto + orden)
- CVV 12 → «El CVV debe tener 3 o 4 dígitos.» (A VERIFICAR)
- Demo: https://minimoda-navy.vercel.app/checkout
