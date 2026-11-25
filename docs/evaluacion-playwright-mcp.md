# Evaluación Playwright MCP (sin instalar)

- **Fuente:** https://github.com/microsoft/playwright-mcp (oficial Microsoft)
- **Autor:** Microsoft / Playwright team
- **Versión observada (2026-11-06):** npm `@playwright/mcp` **v0.0.84** (A VERIFICAR al instalar: `@latest` es móvil)
- **Qué hace:** expone tools de navegador al agente (snapshot a11y, click, fill, red) vía MCP
- **Qué NO reemplaza:** el runner `npx playwright test` ni las assertions versionadas en `tests/`
- **Nota oficial:** el README indica que Playwright MCP **no es un security boundary**

## Herramientas / alcance
- Controla un navegador real; toca red hacia la demo y potencialmente otros orígenes
- Perfil persistente por defecto en disco (cookies/DOM pueden llegar al modelo)
- Core incluye evaluate / run_code potencialmente peligrosos

## 3 beneficios
1. Explorar la UI de checkout antes de fijar locators
2. Validar copy visible con el agente sin escribir test todavía
3. Acelerar el mapeo de getByRole/getByLabel observados

## 3 riesgos
1. Red abierta por defecto (`--allowed-origins` no es boundary; redirects fuera de demo)
2. Sesión/cookies del navegador del MCP pueden filtrar datos al modelo
3. Los hooks del repo cubren Shell/Write, no tools MCP; marketplace ≠ auditoría

## Mitigaciones
- Evaluar primero; si se instalara: versión pineada, `--isolated`, allowlist de origen, sin datos reales
- Seguir hooks/rules del repo

## Decisión
**No instalar** en esta práctica. El runner de Playwright alcanza para PAGO-01/PAGO-0X y mantiene los tests en Git.
