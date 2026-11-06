# Evidencias · Clase 4 · Prompt engineering para testing

Demo MiniModa: https://minimoda-navy.vercel.app/checkout  
Fecha de corrida: 2026-11-06 (America/Buenos_Aires). Solo datos sintéticos.

| Archivo | Qué muestra |
|---------|-------------|
| `log-2-passed.txt` | Salida de `npx playwright test` con **2 passed** (PAGO-01 + PAGO-0X) |
| `terminal-2-passed.png` | Vista de esa misma salida |
| `log-hook-deny.txt` | JSON del PreToolUse con `"permissionDecision":"deny"` ante `test.skip` |
| `hook-deny.png` | Vista del deny |
| `playwright-report.png` | Reporte HTML de Playwright en verde |
| `minimoda-checkout.png` | Formulario de checkout de la demo |
| `compra-confirmada.png` | UI tras PAGO-01 («Compra confirmada») |
| `cvv-error.png` | UI tras PAGO-0X (error de formato de CVV) |

Cómo reproducir:

```bash
npx playwright test
printf '%s' '{"tool_name":"Edit","tool_input":{"file_path":"tests/pago.spec.ts","new_string":"test.skip(\"PAGO-01\")"}}' | node scripts/pre-tests.cjs
```
