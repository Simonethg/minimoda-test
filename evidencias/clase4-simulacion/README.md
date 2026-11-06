# Evidencias · simulación alumno Mac · Clase 4 TestingAI

Fecha (America/Buenos_Aires): 2026-11-06
Máquina: Mac de Simoneth · carpeta `~/TestingAI-Clase4-Simulacion-20261106/minimoda-test`
Rama: `practica/simulacion-alumno-mac` (no toca `practica/checkout-playwright` ni PR #2)
Guía seguida: `practica-clase4-v5.md` + anexo

## Resultados por paso
1. Playwright init + example: OK (2 passed)
2. Claude Code solo lectura: OK
3. AGENTS.md raíz + tests/: OK (Claude listó fuentes)
4. Skill + `tests/pago.spec.ts` PAGO-01 + PAGO-0X: OK (`2 passed`)
5. Hooks Pre/Post + deny real de `test.skip` por Claude: OK
6. Evaluación MCP (sin instalar): OK → decisión **no instalar**
7. Suite completa: OK (`4 passed` = example + pago)

## Archivos clave de evidencia
- `01-*.log` Playwright init
- `02-claude-readonly.log`
- `03-claude-rules.log`
- `04-probe-ui.log` textos reales de la demo
- `04-claude-generate-pago.log` / `04-claude-pago-0x.log` / `04-playwright-pago.log`
- `05-hook-deny-sim.log` simulación del Pre
- `05-claude-hook-deny-real.log` deny real: `PreToolUse:Edit hook error: No saltees tests para conseguir verde.`
- `06-claude-mcp-eval.log`
- `07-suite.log`
- `playwright-report/` copia del reporte HTML

## Controles
- Claude Code hooks en `.claude/settings.json`
- Scripts: `scripts/pre-tests.cjs`, `scripts/post-tests.cjs`
