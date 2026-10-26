# Plan de pruebas: MiniModa (ejemplo generado con Codex y revisado a mano)

**Sitio:** https://minimoda-navy.vercel.app
**Ambiente:** Chromium, desktop 1440x900, tema claro

## Alcance
- **Incluye:** registro (`/registro`), carrito (`/tienda`, `/producto/[id]`) y checkout (`/checkout`).
- **No incluye:** API, créditos, bandeja, performance ni accesibilidad en profundidad.

## Riesgos principales
1. Que se pueda comprar sin productos o con datos inválidos.
2. Que el carrito calcule mal cantidades o totales.
3. Que el registro acepte valores fuera de los límites (contraseña, edad).
4. Que un producto sin stock se pueda agregar.

## Estrategia
- Camino feliz, valores límite y casos negativos en cada funcionalidad.
- Para el pago se usan las tarjetas de prueba que muestra el propio checkout.
- Datos inventados (`ana.prueba@example.com`).
- Los casos están en `casos-qase.csv`, las capturas en `evidencias/` y los bugs en `bugs/`.

## Casos
| # | Caso | Prioridad | Tipo | Evidencia |
|---|------|-----------|------|-----------|
| 1 | Tienda: agregar un producto con stock al carrito | high | functional | 01 |
| 2 | Ficha de producto: muestra datos del producto 1 | medium | functional | 02 |
| 3 | Ficha de producto: producto sin stock no se puede agregar | high | negative | 03 |
| 4 | Registro: alta exitosa con datos válidos | high | functional | 04 |
| 5 | Registro: contraseña de 7 caracteres (límite inferior - 1) | high | negative | 05 |
| 6 | Registro: edad 12 (fuera del rango 13-120) | medium | negative | 06 |
| 7 | Checkout: compra aprobada con tarjeta de prueba | high | functional | 07 |
| 8 | Checkout: tarjeta de prueba rechazada | high | negative | 08 |

## Criterio de salida
Se ejecutaron todos los casos high, y cada bug tiene su reporte reproducible con evidencia.
