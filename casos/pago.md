# Casos de pago · MiniModa demo

| ID | Entrada / recorrido | Esperado confirmado |
|---|---|---|
| PAGO-01 | Completar compra con datos sintéticos válidos | Mensaje «Compra confirmada» y número de orden en UI |
| PAGO-0X | En el paso Pago, ingresar CVV `12` y enviar | «El CVV debe tener 3 o 4 dígitos.» y se permanece en checkout |
