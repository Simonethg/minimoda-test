# minimoda-test

Ejemplos de las prácticas de testing del curso TestingAI sobre MiniModa, una tienda online ficticia ([sitio](https://minimoda-navy.vercel.app/)). No incluye el código de la app.

| Carpeta / rama | Práctica | Qué muestra |
|---------|----------|-------------|
| [clase-01/](clase-01/README.md) | Clase 1: casos del registro con IA | Plantilla de entrega (`practica.md`) y capturas de ejemplo de los casos cargados en Qase |
| [auditoria-agente-minimoda/](auditoria-agente-minimoda/) | Clase 3: hackear una IA sin escribir código | Auditoría resuelta del Asistente MiniModa: 6 hallazgos, casos de prueba y evidencias |
| rama `practica/checkout-playwright` | Clase 4: prompt engineering para testing | Checkout E2E con Playwright, `AGENTS.md`, hooks Pre/Post y evidencias en `evidencias/clase4/` |

## Clase 4 · cómo correr el ejemplo

```bash
npm ci
npx playwright install chromium
npx playwright test
```

Demo permitida: https://minimoda-navy.vercel.app/checkout  
Solo datos sintéticos. Sin secretos ni tarjetas reales.

Cada alumno arma su propio fork; este repo sirve de referencia.
