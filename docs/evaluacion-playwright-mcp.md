# Evaluación de Playwright MCP para el checkout de demo de MiniModa

- **Fecha:** 2026-11-06
- **Estado:** solo evaluación. No se instaló nada y no se tocó `tests/`.
- **Fuente oficial declarada:** https://github.com/microsoft/playwright-mcp
- **Evidencia leída:** `evidencias/clase4-simulacion/playwright-mcp-readme.md`, el README descargado del repo oficial (1698 líneas, leído completo).
- **Contexto del repo:** `package.json` (`@playwright/test ^1.65.0`), `playwright.config.ts`, `tests/pago.spec.ts`, `.claude/settings.json`, `AGENTS.md`, `tests/AGENTS.md`.

> Las citas indican la línea del README descargado (`README:L<n>`).

---

## 1. Qué hace el servidor

Playwright MCP es un servidor **Model Context Protocol** que le permite a un LLM o agente (Claude Code, VS Code, Cursor, etc.) manejar un navegador real con Playwright (README:L3).

- **Cómo "ve" la página:** usa **snapshots del árbol de accesibilidad** en lugar de capturas de pantalla, así que no necesita un modelo de visión (README:L3, L15-17). Los elementos se identifican por rol y nombre accesible, la misma lógica que `getByRole`/`getByLabel` que exige `tests/AGENTS.md`.
- **Qué expone:** herramientas que el agente llama una por una. Entre ellas:
  - navegar (`browser_navigate`), hacer clic, escribir, completar formularios, elegir opciones (L924-1181);
  - capturar el snapshot (`browser_snapshot`) o una captura de pantalla (L1135-1157);
  - leer la consola y las requests de red (`browser_console_messages`, `browser_network_requests`; L945, L1072-1091);
  - ejecutar JavaScript en la página (`browser_evaluate`; L993) y **ejecutar código Playwright arbitrario en el proceso del servidor** (`browser_run_code_unsafe`, descrito como *"RCE-equivalent"*; L1114-1120).
- **Capacidades opcionales (`--caps`):** red y mocks (`network`), cookies/localStorage (`storage`), grabación/traza/video (`devtools`), coordenadas (`vision`), PDF, y **`testing`**, que agrega `browser_generate_locator` y `browser_verify_*` (L1220-1694).
- **Cómo corre:** el cliente MCP lo lanza por stdio con `npx @playwright/mcp@latest` (L34-45). Para Claude Code: `claude mcp add playwright npx @playwright/mcp@latest` (L101). También puede correr como servidor HTTP con `--port` (L838) o en Docker (L862-891).
- **El README mismo matiza su uso:** para *agentes de código*, recomienda **Playwright CLI + Skills** en lugar de MCP porque gasta menos tokens. Reserva MCP para la automatización exploratoria, los tests que se autorreparan y los flujos autónomos largos (L7-11).

## 2. Qué NO reemplaza del runner de tests (`@playwright/test`)

| Necesidad del repo | Runner (`npx playwright test`) | Playwright MCP |
|---|---|---|
| Suite versionada y repetible (`tests/pago.spec.ts`) | Sí: código en git, mismo resultado en cada corrida | No. Las acciones son llamadas del agente y no quedan como test, salvo que alguien las copie a un `.spec.ts` |
| Assertions con espera automática (`expect(...).toBeVisible()`, `toHaveURL`) | Sí | Solo verificaciones puntuales con `--caps=testing` (`browser_verify_*`, L1654-1692). No hay `expect`, `toHaveCount(0)` ni `toHaveURL` |
| Resultado verde/rojo, reintentos, `forbidOnly`, workers | Sí (`playwright.config.ts`) | No |
| Proyectos y navegadores (`projects: chromium`) | Sí | Un navegador por sesión (`--browser`) |
| Reporte HTML y traza en el reintento (`reporter: 'html'`, `trace: 'on-first-retry'`) | Sí | Hay trazas y video con `--caps=devtools`, pero no reporte de suite |
| CI determinista | Sí | No. Lo dirige un LLM, así que el camino puede cambiar entre corridas |
| Regla del repo "Corré npx playwright test después de cambiar tests" | Es el mecanismo | No la cumple ni la sustituye |

**Conclusión:** MCP sirve como **herramienta de exploración y redacción** (descubrir labels y textos reales, generar locators o un borrador de test). El **oráculo** sigue siendo `npx playwright test`.

## 3. Beneficios para el checkout de demo (3)

1. **Confirma textos y locators sin adivinar.** `tests/AGENTS.md` pide nombres "observados en la UI" y marcar A VERIFICAR lo que falte. El snapshot de accesibilidad (L1135) y `browser_generate_locator` (L1644, `--caps=testing`) devuelven el rol y el nombre real de, por ejemplo, "Número de tarjeta", "CVV" o "Confirmar compra". Eso reemplaza el sondeo manual que hoy queda en `04-probe-ui.log`.
2. **Permite explorar casos negativos rápido.** Probar CVV de 2 dígitos, vencimiento pasado o país distinto e inspeccionar consola y red (`browser_console_messages`, `browser_network_requests`; L945, L1083) ayuda a redactar nuevos casos en `casos/` antes de escribir el `.spec.ts`.
3. **Deja evidencia para la clase.** Las capturas, las trazas y el video (`browser_take_screenshot`, `browser_start_tracing`, `browser_start_video`; L1147, L1482, L1490) se pueden guardar en `evidencias/` con `--output-dir`. `browser_start_recording` convierte una demostración manual en código Playwright (L1474-1506).

## 4. Riesgos para el checkout de demo (3)

1. **Ejecución de código y alcance excesivo de herramientas.** `browser_run_code_unsafe` viene en el set *core*, no detrás de una capacidad opcional, y el README lo califica de *"RCE-equivalent"* (L1114-1116). `browser_evaluate` también ejecuta JS arbitrario (L993). Además, el README dice: *"Playwright MCP is **not** a security boundary"* (L855). El límite del sistema de archivos *"is not a secure boundary"* (L807-810), y `--allowed-origins` *"does not serve as a security boundary and does not affect redirects"* (L410). Con un agente con permisos amplios, una instrucción maliciosa dentro de una página podría terminar ejecutando código en la máquina.
2. **Sesión de navegador persistente y fuga de datos.** Por defecto el perfil es **persistente** en `~/Library/Caches/ms-playwright/mcp-{channel}-{workspace-hash}` (L468-484) y el navegador corre **con interfaz (headed)** (L429). Si se usara `--extension`, se conectaría a pestañas reales ya logueadas (L425, L513-515). Las cookies, localStorage y lo tipeado llegan al contexto del LLM; `secrets` y `redactUrlParams` son *"a convenience and not a security feature"* (L694-706). En el checkout eso incluye la tarjeta de prueba `4111…` y el email. Es dato sintético, pero el riesgo existe si alguien navega fuera de la demo. `AGENTS.md` prohíbe usar producción o datos reales de pago.
3. **Cadena de suministro, no determinismo e inyección desde la página.** La configuración estándar usa `npx @playwright/mcp@latest` (L40), sin versión fija: cada arranque puede bajar código nuevo del registro npm. En Docker se usa `--pull=always` (L867). La herramienta **WebMCP viene habilitada por defecto**: recoge y expone al agente las herramientas que *la página* registre (L441, L683-687), lo que abre la puerta a inyección de instrucciones. Como lo dirige un LLM, dos corridas pueden seguir caminos distintos. Esto no sirve como evidencia de regresión.

## 5. Revisión de superficie

### Permisos (cliente y servidor)
- Herramientas que escriben: casi todas las de *core* tienen `Read-only: false` (L933 y siguientes). Las de solo lectura son snapshot, find, consola, red y captura.
- Escritura en disco: varias herramientas aceptan `filename` *"resolved against the workspace root"* (por ejemplo L951, L1000, L1154). Pueden crear archivos dentro del repo, incluida `tests/`, que **no** debe editarse en esta tarea.
- Archivos fuera del workspace: bloqueados por defecto, salvo `--allow-unrestricted-file-access` (L411). No es un límite de seguridad (L807-810).
- `--grant-permissions` (geolocalización, portapapeles) está apagado por defecto (L428).
- `--no-sandbox` existe y **no** debe usarse fuera de Docker (L438).
- En el cliente: el repo ya tiene hooks `PreToolUse` sobre `Edit|Write|Bash` (`.claude/settings.json`), pero **no cubren las herramientas `mcp__playwright__*`**. Habría que agregar un matcher o una regla de permisos para ellas (**A VERIFICAR** cómo se comportaría).

### Sesión de navegador
- Por defecto: perfil persistente, en disco, por workspace (L468-486), y con interfaz (L429).
- Recomendado para la demo: `--isolated` (perfil en memoria, L436, L491-496) y `--headless`.
- Evitar `--extension`, `--user-data-dir` hacia un perfil real, `--cdp-endpoint` y `--shared-browser-context`.
- Cierre por inactividad: una hora en modo headless y nunca en modo headed (L431).

### Red
- **Navegador:** por defecto *"allow all"* (L410). Se puede restringir con `--allowed-origins "https://minimoda-navy.vercel.app"`, pero no es un límite real y no frena redirecciones (L410, L412).
- **Servidor:** con stdio no abre puertos. Con `--port` escucha en `localhost` por defecto. `--host 0.0.0.0` lo expone a toda la red (L430, L881-884); no usarlo.
- **Descargas:** `npx` baja el paquete de npm en cada arranque con `@latest`, y Playwright puede descargar los binarios del navegador (**A VERIFICAR**: la sección "Browser installation" del README está vacía, L1202-1205).
- `--ignore-https-errors` (L432) no debe activarse.

### Comandos que ejecutaría (ninguno se corrió)
```bash
# Registro en Claude Code (README:L101). Modifica la config del cliente.
claude mcp add playwright npx @playwright/mcp@latest

# Lo que el cliente lanza en cada sesión (README:L34-45)
npx @playwright/mcp@latest

# Variante endurecida que propondría si se aprueba (versión fija = A VERIFICAR)
claude mcp add playwright -- npx @playwright/mcp@<VERSION_FIJA> \
  --isolated --headless --browser chromium \
  --allowed-origins "https://minimoda-navy.vercel.app" \
  --caps testing --no-webmcp \
  --output-dir evidencias/clase4-simulacion/mcp
```
Notas:
- `--no-webmcp` está documentado (L441).
- Que `browser_run_code_unsafe` no se pueda desactivar con un flag es **A VERIFICAR**: el README no muestra ningún flag para excluir herramientas puntuales. Habría que denegarla desde los permisos del cliente.
- Instalar el paquete suma una dependencia nueva, así que según `AGENTS.md` requiere confirmación previa.

## 6. Evidencia faltante: A VERIFICAR

| Punto | Estado | Detalle |
|---|---|---|
| **Autor / mantenedor** | **A VERIFICAR** | El README no declara autor, mantenedor ni licencia. Que sea de Microsoft se infiere solo de la URL `github.com/microsoft/...` y de la imagen `mcr.microsoft.com/playwright/mcp` (L867). Falta confirmar en GitHub (org verificada, LICENSE, SECURITY.md) y en npm (dueño del paquete `@playwright/mcp`, provenance). |
| **Versión** | **A VERIFICAR** | El README solo usa `@latest`. No hay número de versión, changelog ni fecha. Falta saber qué versión se evaluaría y si es compatible con nuestro `@playwright/test ^1.65.0`. |
| **Integridad del README descargado** | **A VERIFICAR** | No consta el commit, la fecha de descarga ni el hash. No se puede asegurar que coincida con el repo actual. |
| **Alcance de herramientas** | **A VERIFICAR** | Las secciones "Browser installation" (L1202-1205) y "Configuration" (`--caps=config`, L1207) están vacías o incompletas. No hay forma documentada de deshabilitar `browser_run_code_unsafe`. Tampoco está claro si `--caps=testing` y `--caps=config` son valores válidos de `--caps`: la tabla de L415 solo lista `vision, pdf, devtools`. |
| **Telemetría** | **A VERIFICAR** | El README no menciona si el servidor envía telemetría. |
| **Descarga de navegadores** | **A VERIFICAR** | No se documenta si reutiliza los navegadores ya instalados por `@playwright/test` o descarga otros. |

## 7. Recomendación

**No instalar por ahora.** Reevaluar con una instalación acotada solo si se cierran los puntos A VERIFICAR.

Justificación:
1. **El repo no lo necesita para su objetivo actual.** Los casos de pago ya se automatizan y verifican con `@playwright/test` (`tests/pago.spec.ts`). MCP no reemplaza al runner (sección 2), y la regla de `AGENTS.md` sigue siendo `npx playwright test`.
2. **La propia fuente oficial sugiere otra opción para nuestro caso.** Trabajamos con un agente de código (Claude Code), y el README recomienda **Playwright CLI + Skills** para ese escenario (README:L7-9). El repo ya usa una skill (`.claude/skills/caso-a-playwright`).
3. **La superficie de riesgo es alta con la configuración por defecto.** `browser_run_code_unsafe` es RCE-equivalente y viene en core (L1116). El servidor *"is not a security boundary"* (L855). El perfil es persistente y el navegador corre con interfaz por defecto (L429, L468). La red permite todo por defecto (L410), WebMCP está activo (L441) y la versión no está fijada (`@latest`, L40).
4. **Falta evidencia de autor, versión e integridad** (sección 6). Además, `AGENTS.md` exige confirmación antes de sumar dependencias.

**Si más adelante se aprueba**, condiciones mínimas:
- versión fija y verificada en npm;
- `--isolated --headless`;
- `--allowed-origins` limitado a la demo;
- `--no-webmcp`;
- `--caps` mínimas;
- regla de permisos del cliente que **deniegue** `browser_run_code_unsafe` y `browser_evaluate`;
- nada de `--extension`, `--host 0.0.0.0` ni `--no-sandbox`;
- usarlo solo para explorar y redactar. Todo test final pasa por `npx playwright test`.

## 8. Fuentes
- Repo oficial (declarado por el pedido): https://github.com/microsoft/playwright-mcp
- README descargado: `evidencias/clase4-simulacion/playwright-mcp-readme.md`. Citas por línea en todo el documento.
- MCP Security Best Practices (enlazado por el README, L855): https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices (no consultado en esta sesión)
- Playwright CLI (enlazado por el README, L7): https://github.com/microsoft/playwright-cli (no consultado en esta sesión)
- Archivos del repo: `package.json`, `playwright.config.ts`, `tests/pago.spec.ts`, `.claude/settings.json`, `AGENTS.md`, `tests/AGENTS.md`.

## 9. Qué se hizo y qué no
- **Se hizo:** se leyeron completos el README descargado y los archivos del repo listados arriba, y se escribió este documento.
- **No se hizo:** no se instaló nada, no se corrió `npx`, `claude mcp add` ni `npx playwright test` (no hubo cambios en `tests/`), no se consultaron GitHub ni npm en vivo y no se editó `tests/`.
- **Bloqueado:** un intento de listar archivos con Bash fue rechazado por el hook del repo (*"Bash del agente bloqueado en este ejemplo"*). Se usaron herramientas de lectura en su lugar.
