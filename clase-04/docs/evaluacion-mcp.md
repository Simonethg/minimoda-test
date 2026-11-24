# Evaluación de Playwright MCP

## 1. Herramienta evaluada y referencia oficial

Se evaluó **Playwright MCP**, servidor del Model Context Protocol que expone automatización de navegador mediante Playwright.

- **Referencia oficial:** [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp).
- **Comprobado en la práctica:** el servidor ya estaba instalado y conectado a Codex.
- Según el repositorio oficial, el servidor permite que un agente interactúe con páginas web usando Playwright y snapshots estructurados del árbol de accesibilidad. La documentación también presenta el MCP como apropiado para exploración con estado persistente e inspección iterativa de páginas.

## 2. Funcionalidad y utilidad para QA

Playwright MCP permitió conducir una sesión de navegador desde Codex: abrir el checkout público de MiniModa, inspeccionar los nombres accesibles de campos y botones, completar datos sintéticos y observar respuestas de la interfaz.

En QA exploratorio, estas capacidades ayudan a recorrer flujos, encontrar controles disponibles para tecnologías de asistencia y observar validaciones sin tener que escribir primero una prueba automatizada. La confirmación de la compra simulada y la observación del mensaje de validación del CVV sirvieron para revisar el comportamiento del checkout.

Playwright MCP no reemplaza al runner de Playwright Test. La práctica comprobó uso interactivo mediante MCP; no comprobó que esta sesión fuera una ejecución automatizada del conjunto de pruebas del proyecto.

## 3. Permisos y accesos que requiere

Para la práctica, Playwright MCP necesitó acceso al navegador y al sitio público de MiniModa para navegar e interactuar con el checkout. Codex solicitó autorización antes de ejecutar `browser_navigate`.

La referencia oficial describe opciones de configuración de hosts, orígenes, acceso a archivos, perfil del navegador, permisos de contexto y sandbox, entre otras. Esas opciones documentan capacidades configurables del servidor; no prueban cuáles estaban activas en nuestra instalación. Durante la práctica se usaron datos sintéticos.

- **Comprobado:** autorización solicitada antes de `browser_navigate`; navegación e interacción con el checkout público.
- **A VERIFICAR:** configuración efectiva del servidor, alcance de los sitios permitidos, permisos del navegador, uso de perfil persistente o aislado y tratamiento de datos de sesión.

## 4. Riesgos y limitaciones

- Las acciones del navegador pueden cambiar el estado de una página, por ejemplo, al completar y enviar un formulario. Conviene limitar la exploración a sitios autorizados y a datos sintéticos, como se hizo en esta práctica.
- El servidor tiene opciones relacionadas con perfiles persistentes, permisos del navegador y acceso a archivos. El repositorio oficial advierte que un perfil persistente puede conservar información de inicio de sesión; **A VERIFICAR** si nuestra instancia usa uno y qué información conserva.
- Un recorrido exploratorio no equivale a una prueba repetible, mantenible y ejecutada por el runner de Playwright Test.
- **A VERIFICAR:** el alcance concreto de las restricciones configuradas en nuestra instalación y si las acciones de compra de la demo siempre permanecen simuladas.

## 5. Beneficios observados en nuestra práctica

- Permitió navegar al checkout público de MiniModa.
- Permitió inspeccionar los nombres accesibles de campos y botones.
- Permitió completar datos sintéticos.
- Permitió confirmar una compra simulada.
- Permitió comprobar el mensaje de validación del CVV.
- Solicitó autorización antes de ejecutar `browser_navigate`.

Estos resultados corresponden a lo observado durante la práctica; no demuestran cobertura de otros flujos, navegadores o configuraciones.

## 6. Decisión

**Mantener Playwright MCP para exploración controlada, sin instalar herramientas adicionales.**

## 7. Justificación de la decisión

La herramienta ya estaba instalada y conectada, y aportó valor concreto para explorar el checkout, identificar controles accesibles y observar validaciones usando datos sintéticos. La autorización solicitada antes de navegar fue parte del flujo observado. Mantenerla para exploración controlada aprovecha esa utilidad sin sumar instalaciones; las pruebas automatizadas del proyecto siguen correspondiendo al runner de Playwright Test.

La decisión se basa en esta práctica y en la documentación oficial enlazada. La configuración efectiva de permisos y perfiles, así como el comportamiento en otros flujos, queda **A VERIFICAR**.
