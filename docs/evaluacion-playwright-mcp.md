# Evaluación · Playwright MCP (sin instalar)

**Fecha:** 2026-11-06 (America/Buenos_Aires)  
**Fuente oficial:** https://github.com/microsoft/playwright-mcp  
**Autor:** Microsoft (org `microsoft` en GitHub)  
**Versión revisada:** la del README del repo en esa fecha — **A VERIFICAR** al momento de instalar.

## Qué hace y qué no reemplaza

- El servidor MCP le da al agente **herramientas** para navegar, clickear, tipiar y leer el DOM vía Playwright.
- **No reemplaza** el runner `npx playwright test` ni tus specs versionados (`tests/*.spec.ts`).
- Runner = ejecuta y reporta tus tests. MCP = amplía lo que el agente puede hacer en una sesión.

## Herramientas / alcance (según README oficial)

- Navegación y acciones de UI (goto, click, type, snapshot, etc.).
- Puede abrir un navegador y tocar la red hacia la URL que le indiques.
- **A VERIFICAR** en tu versión exacta: lista completa de tools, flags de sandbox y si reutiliza sesión.

## 3 beneficios para el checkout de demo MiniModa

1. Explorar el formulario de checkout con snapshots accesibles antes de escribir locators.
2. Contrastar copy real («Compra confirmada», error de CVV) sin inventar texto.
3. Acelerar el paso caso → skill → spec cuando el agente puede ver la UI.

## 3 riesgos

1. **Sesión de navegador:** el agente podría navegar fuera de la demo permitida si no hay allowlist.
2. **Red / datos:** tools de red o formularios podrían enviar datos si se apuntan a otros hosts.
3. **Alcance de archivos:** un MCP mal configurado o combinado con otras tools puede tocar más del repo.

## Mitigaciones

- Evaluar **antes** de instalar; no instalar desde un marketplace sin revisar la fuente.
- Limitar la demo a `https://minimoda-navy.vercel.app/` (como en `tests/AGENTS.md`).
- Mantener hooks/approvals y no desactivar protecciones «para que pase».
- Preferir el runner oficial para la evidencia de regresión versionada.

## Decisión

**No instalar Playwright MCP en este ejemplo resuelto.**  
Alcanza con el runner oficial `@playwright/test`, las reglas en `AGENTS.md` y los hooks Pre/Post documentados. Si más adelante se instala, repetir esta ficha con versión pinneada y evidencia de permisos.
