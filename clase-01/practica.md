# Práctica clase 01: casos del registro de MiniModa con IA (ejemplo resuelto)

**Sitio:** https://minimoda-navy.vercel.app/registro

> Ejemplo de referencia. Las respuestas de Gemini y de Codex están resumidas a modo ilustrativo: las tuyas van a ser distintas. Lo que importa es el formato y revisar todo contra la página.

## 1. Preparación
- Chromium, desktop 1440x900, tema claro. 26/10/2026.
- Evidencia: `evidencias/00-registro-formulario.png`

## 2. Superficie elegida
- Elegí: **chat de Codex** para arrancar.
- Por qué: el registro es un solo formulario. Para analizar reglas y escribir casos no hace falta que el agente toque archivos, y en el chat veo y corrijo cada respuesta más rápido.

## 3. Preguntas a Gemini
| # | Pregunta | Respuesta (resumen) | ¿Acierto o error/invento? |
|---|----------|---------------------|---------------------------|
| 1 | ¿Qué campos pide el registro de MiniModa? | Nombre, email, contraseña, confirmación, edad, país y términos | Acierto: coincide con la página |
| 2 | ¿Cuál es el largo mínimo de la contraseña? | 8 caracteres | Acierto: la página dice "Mínimo 8 caracteres." |
| 3 | ¿El registro pide número de teléfono? | Sí, con código de área | **Invento:** la página no tiene campo de teléfono |

- Un acierto: el mínimo de 8 caracteres de la contraseña.
- Un error o invento: el campo de teléfono, que no existe.

## 4. Primer modo
- Superficie y modo: chat de Codex.
- Prompt que usé:
  ```
  Sos QA. Analizá el registro de https://minimoda-navy.vercel.app/registro
  (campos: nombre, email, contraseña, confirmar, edad, país, términos).
  Listá reglas, valores límite y escribí 6 casos con título, precondiciones,
  pasos, resultado esperado, prioridad y tipo. Si no sabés algo, marcalo "A VERIFICAR".
  ```
- Qué devolvió: 6 casos, 2 de ellos con mensajes de error marcados "A VERIFICAR", que después comprobé en la página.

## 5. Otra superficie: comparación en 3 líneas
1. **Chat:** respondió más rápido y con casos más genéricos. Tuve que pegarle los campos a mano.
2. **Cowork (Codex en la app de escritorio, con la carpeta del fork):** usó la plantilla `practica.md` y la completó directo en el archivo, más ordenado.
3. Los dos propusieron límites de edad y contraseña, y ninguno sabía los mensajes exactos sin verlos. La revisión contra la página la hice igual a mano.

## 6. Mis 3 mejores casos (cargados en Qase, proyecto MiniModa)
### Caso 1: Registro: alta exitosa con datos válidos
- Precondiciones: navegador en `/registro`.
- Pasos: 1) Nombre "Ana Prueba". 2) Email "ana.prueba@example.com". 3) Contraseña y confirmación "Clave1234". 4) Edad 30. 5) País Argentina. 6) Tildar términos. 7) Click en Crear cuenta.
- Resultado esperado: "¡Registro exitoso! Bienvenido/a a MiniModa, Ana Prueba." con aviso del email de bienvenida en la Bandeja.
- Evidencia: `evidencias/04-caso-registro-exitoso.png`

### Caso 2: Registro: contraseña de 7 caracteres (límite inferior - 1)
- Precondiciones: navegador en `/registro`.
- Pasos: 1) Completar todos los campos válidos. 2) Contraseña y confirmación "Clave12". 3) Click en Crear cuenta.
- Resultado esperado: no crea la cuenta. Muestra "Revisá los campos marcados." y "La contraseña debe tener al menos 8 caracteres."
- Evidencia: `evidencias/05-caso-registro-password-7-caracteres.png`

### Caso 3: Registro: edad 12 (fuera del rango 13-120)
- Precondiciones: navegador en `/registro`.
- Pasos: 1) Completar todos los campos válidos. 2) Edad 12. 3) Click en Crear cuenta.
- Resultado esperado: no crea la cuenta. Bajo Edad aparece "La edad debe estar entre 13 y 120."
- Evidencia: `evidencias/06-caso-registro-edad-12.png`

## 7. Mapa del harness
| Pieza | En lo que usé |
|-------|---------------|
| Modelo | El modelo de OpenAI que trae Codex en el plan gratis, y Gemini para las preguntas |
| App | ChatGPT (web y app de escritorio) y Gemini en el navegador |
| Harness | Codex: el entorno que le da al modelo instrucciones, herramientas, acceso a la carpeta y pedidos de aprobación |
| MCP | No usé. Un ejemplo sería conectar Qase o GitHub para que el agente cargue los casos solo |
| Skill | Mis reglas en el prompt: "no inventes, marcá A VERIFICAR", formato de caso y datos ficticios |
