# Controles de Codex

## 1. Objetivo de los controles

Registrar los controles de instrucciones y permisos observados durante la práctica de TestingAI con Codex CLI en la demo de MiniModa. El documento distingue las instrucciones del proyecto de los permisos efectivos del entorno y deja señalados los datos que no se comprobaron.

## 2. Configuración verificada

- **Herramienta:** Codex CLI 0.169.0.
- **Directorio de trabajo:** `clase-04`.
- **Permisos indicados en `/status`:** `Workspace (Ask for approval)`.
- **Archivos de instrucciones cargados:** `../AGENTS.md` y `AGENTS.md`.
- Se eligió Codex para la práctica; no se utilizaron hooks de Claude Code ni de Cursor.
- No se desactivaron las protecciones del sandbox.

No se agregan otras opciones de configuración porque no fueron mostradas en `/status`.

## 3. Evidencia observada

- Codex solicitó autorización antes de utilizar `browser_navigate` de Playwright MCP.
- Durante la práctica se observaron restricciones de escritura fuera del directorio autorizado.
- La sesión mostró el modo de permisos `Workspace (Ask for approval)` en `/status`.
- Las instrucciones cargadas corresponden al archivo de acuerdos del proyecto ubicado en el directorio padre y al archivo del propio proyecto.

Estos puntos registran lo observado durante esta sesión; no implican que se haya comprobado cada posible operación o ruta.

## 4. Instrucciones `AGENTS.md` y permisos efectivos

Los archivos `AGENTS.md` contienen instrucciones para el trabajo en el proyecto: por ejemplo, limitar el trabajo a MiniModa, no usar servicios de producción, pedir confirmación antes de instalar dependencias y evitar operaciones destructivas sin confirmación. Son reglas de trabajo que el agente debe seguir.

Los permisos efectivos son los que aplica el entorno de ejecución. En esta sesión, `/status` mostró `Workspace (Ask for approval)`; además, se observaron restricciones de escritura fuera del directorio autorizado y una solicitud de autorización para `browser_navigate` de Playwright MCP. Por lo tanto, la presencia de instrucciones en `AGENTS.md` no demuestra por sí sola qué operaciones permite el sandbox: las instrucciones orientan el comportamiento, mientras que el entorno controla el acceso efectivo.

## 5. Limitaciones y aspectos A VERIFICAR

- **A VERIFICAR:** el alcance exacto de las rutas de escritura permitidas y las rutas que produjeron restricciones; no se documentan rutas concretas porque no están disponibles en la evidencia indicada.
- **A VERIFICAR:** el texto completo y el resultado de la solicitud de autorización para `browser_navigate`.
- **A VERIFICAR:** si `/status` mostraba otros campos o ajustes además del modo de permisos consignado. No se infieren ni enumeran configuraciones adicionales.
- **A VERIFICAR:** si los controles observados se comportan igual para otros comandos, herramientas, sesiones o directorios.

Este registro se limita a los controles comprobados o reportados para la sesión descrita.
