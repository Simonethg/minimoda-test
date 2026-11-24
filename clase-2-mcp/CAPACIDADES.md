# Práctica Clase 2: Capacidades del agente con MCP

## 1. Objetivo

El objetivo de esta práctica fue explorar cómo un agente de inteligencia artificial puede utilizar herramientas externas mediante MCP (Model Context Protocol).

Para ello, trabajé con Codex CLI, Playwright MCP y un servidor MCP propio desarrollado en Node.js.

## 2. Herramientas utilizadas

- **Codex CLI:** agente utilizado para ejecutar las tareas y utilizar las herramientas MCP.
- **Playwright MCP:** permitió navegar por MiniModa e interactuar con la tienda desde el navegador.
- **Node.js y npm:** utilizados para ejecutar el servidor MCP propio y administrar sus dependencias.
- **MCP propio (`casos`):** servidor que permite crear y listar casos de prueba en archivos Markdown.
- **Zod:** biblioteca utilizada para validar los datos recibidos por el servidor.

## 3. Capacidades de Playwright MCP

Le solicité a Codex que abriera MiniModa, seleccionara un producto disponible y lo agregara al carrito.

El agente realizó las siguientes acciones:

1. Abrió la tienda MiniModa y exploró la sección de productos destacados.
2. Seleccionó el producto 'Body Manga Larga Estrellitas'.
3. Identificó sus características: color azul, talle 6M, stock de 12 unidades y precio de $8.500.
4. Presionó 'Agregar al carrito'.
5. Comprobó que el indicador del carrito pasó de 0 a 1 producto.
6. Abrió el carrito y verificó que contenía una unidad del producto, con un total de $8.500.

El agente no avanzó al checkout ni realizó ninguna compra.

**Resultado:** la prueba de navegación y agregado al carrito se completó correctamente.

**Tiempo registrado:** 2 minutos y 24 segundos.

## 4. Capacidades del MCP propio

Creé un servidor MCP en Node.js con ayuda de Codex, utilizando `@modelcontextprotocol/sdk` y Zod.

El servidor contiene dos herramientas:

- `crear_caso_prueba`: recibe información de un caso de prueba y genera un archivo Markdown dentro de la carpeta `casos/`.
- `listar_casos`: devuelve los nombres de los casos guardados.

Para comprobar su funcionamiento, solicité generar un caso llamado 'Validación de email de MiniModa', con prioridad alta y pasos para verificar el rechazo de un correo sin `@`.

El servidor creó el archivo y posteriormente `listar_casos` lo encontró correctamente.

**Resultado:** ambas herramientas funcionaron después de actualizar las dependencias.

**Tiempo registrado en la verificación final:** 4 minutos y 13 segundos.

Esta prueba verificó el funcionamiento del MCP, pero no ejecutó el caso de prueba en la página de MiniModa.

## 5. Tiempo ahorrado frente al trabajo manual

La utilización de agentes permitió delegar tareas de navegación, interacción con el navegador y generación de archivos de prueba.

| Actividad | Tiempo con el agente | Comparación con trabajo manual |
|---|---|---|
| Seleccionar un producto y agregarlo al carrito | 2 min 24 s | No se cronometró la ejecución manual equivalente. |
| Crear y listar un caso con MCP | 4 min 13 s | No se cronometró la creación manual equivalente. |
| Generación de capturas de Playwright | 1 min 29 s | No se midió el proceso manual equivalente. |

No puedo establecer un ahorro exacto en minutos porque no realicé una medición manual equivalente bajo las mismas condiciones.

Sin embargo, observé que el agente puede ejecutar y documentar tareas repetitivas mediante instrucciones, lo que podría reducir el trabajo manual cuando estas operaciones se realizan con frecuencia.

También tuve que dedicar tiempo a configurar herramientas, solucionar errores y verificar resultados, por lo que la automatización no implicó un ahorro inmediato en todas las etapas.

## 6. Límites y dificultades encontradas

Durante la práctica identifiqué las siguientes limitaciones:

- **Permisos:** Codex solicitó autorización antes de utilizar herramientas MCP. Elegí permisos limitados a la sesión.
- **Problemas de ejecución:** algunas operaciones de Codex agotaron su tiempo de ejecución.
- **Restricciones del entorno:** Codex no pudo instalar inicialmente las dependencias ni registrar el servidor MCP, por lo que completé esas operaciones desde PowerShell.
- **Seguridad de dependencias:** `npm audit` detectó una vulnerabilidad de severidad alta en Zod. Actualicé la biblioteca a la versión 4.6.7 y repetí la auditoría, que finalmente informó cero vulnerabilidades conocidas.
- **Verificación humana:** fue necesario comprobar que las capturas existieran, revisar los resultados y confirmar que las herramientas funcionaran correctamente.
- **Alcance:** el MCP propio genera casos de prueba, pero no los ejecuta automáticamente en el navegador.

## 7. Conclusión

Esta práctica me permitió comprender cómo un agente de IA puede ampliar sus capacidades mediante MCP.

Con Playwright comprobé que Codex puede interactuar con una aplicación web, mientras que con el servidor propio aprendí a crear herramientas para generar y consultar casos de prueba.

También comprendí que utilizar agentes implica gestionar permisos, dependencias, seguridad y errores de ejecución.

El principal aprendizaje fue que la IA puede automatizar tareas operativas de testing, pero es necesario supervisar sus acciones y validar los resultados antes de considerarlos correctos.

## 8. Evidencias

- Producto seleccionado: `evidencia/01-tienda.png`
- Producto agregado al carrito: `evidencia/02-carrito.png`
- Ejecución del MCP propio: `evidencia/03-mcp.png`

Los archivos de casos de prueba generados por el MCP se encuentran en la carpeta `casos/`.
