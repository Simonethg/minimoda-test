# Práctica clase 01: casos del registro de MiniModa con IA

**Sitio:** https://minimoda-navy.vercel.app/registro

> Así tiene que quedar tu entrega. Reemplazá cada `___tu respuesta aquí___` con lo tuyo.

## 1. Preparación
- Navegador y fecha: Chrome, 15 de noviembre de 2026

## 2. Superficie elegida
- Elegí chat: Porque es la forma más rápida y directa de interactuar con la IA para hacer consultas puntuales sobre los campos y generar las primeras ideas de prueba sin necesidad de herramientas avanzadas.
- Por qué: ___tu respuesta aquí___

## 3. Preguntas a Gemini
| # | Pregunta | Respuesta (resumen) | ¿Acierto o error/invento? |
|---|----------|---------------------|---------------------------|
| 1 | ¿Qué campos pide el formulario de registro de https://minimoda-navy.vercel.app/registro? | Pide nombre, email, contraseña, confirmar contraseña, edad, país y la casilla de términos. | Acierto|
| 2 | ¿Cuál es el largo mínimo de la contraseña y qué edad se permite? | Mínimo 8 caracteres para la contraseña y edad entera entre 13 y 120 años. | Acierto|
| 3 | ¿Qué pasa si no acepto los términos? | Muestra un error en rojo que dice "Debés aceptar los términos". | Acierto |

- Un acierto: Gemini identificó correctamente los campos obligatorios principales y las reglas de validación del formulario de MiniModa.
- Un error o invento: En la prueba previa, la IA asumió de forma general que existía un botón de registro con Google (que no está en esta tienda de práctica).

## 4. Primer modo
- Superficie y modo: Chat
- Prompt de ejemplo:
  ```
  Sos QA. Vamos a probar el registro de https://minimoda-navy.vercel.app/registro
  Campos: nombre, email, contraseña, confirmar contraseña, edad, país y aceptar términos.
  1. Listá las reglas que se ven, los datos válidos e inválidos y los valores límite.
  2. Escribí 6 casos de prueba con: título, precondiciones, pasos con datos concretos,
     resultado esperado, prioridad (high/medium/low) y tipo (functional/negative/boundary).
  No inventes mensajes: si no sabés el texto exacto, marcalo "A VERIFICAR".
  ```
- Qué devolvió:  La IA generó exitosamente los valores límite, las reglas de validación de los campos y 6 casos de prueba detallados (funcionales, negativos y de límites) adaptados al formulario de registro de MiniModa.

## 5. Otra superficie: comparación en 3 líneas
1. Velocidad: El chat responde de forma inmediata y directa a las peticiones puntuales.
2. Calidad de los casos: Ambos generan casos muy acertados, pero cowork o herramientas con contexto de archivos ayudan a precisar mejor los detalles técnicos.
3. Alucinaciones / Cosas inventadas: En el modo chat se inventaron más campos genéricos que no estaban en la tienda, requiriendo mayor revisión humana.

## 6. Mis 3 mejores casos (cargados en Qase, proyecto MiniModa)
Formato del título: `Registro: <qué se prueba>`
Captura de la suite en Qase con tus casos: `evidencias/qase-suite-casos.png`

### Caso 1: alta exitosa con datos válidos
- Precondiciones: El usuario se encuentra en la pantalla de [Registro](https://minimoda-navy.vercel.app/registro) de la tienda [MiniModa](https://minimoda-navy.vercel.app/).
- Pasos: 1. Ingresar "Ana Pérez" en el campo Nombre.
  2. Ingresar `ana.prueba@example.com` en el campo Email.
  3. Ingresar `Password123` en el campo Contraseña y en Confirmar contraseña.
  4. Ingresar `25` en el campo Edad.
  5. Seleccionar "Argentina" en el campo País.
  6. Marcar la casilla "Acepto los términos y condiciones".
  7. Hacer clic en el botón "Crear cuenta".
- Resultado esperado: El sistema procesa el registro correctamente y redirige a la página principal o muestra un mensaje de éxito.
- Evidencia: `evidencias/qase-MM-4-registro-alta-exitosa.png`

### Caso 2: error por contraseña menor a 8 caracteres
- Precondiciones: El usuario se encuentra en la pantalla de [Registro](https://minimoda-navy.vercel.app/registro) de la tienda [MiniModa](https://minimoda-navy.vercel.app/).
- Pasos: 1. Llenar los datos válidos. 2. Poner una contraseña de 7 caracteres. 3. Hacer clic en Crear cuenta.
- Resultado esperado: La aplicación muestra un error indicando que la contraseña debe tener un mínimo de 8 caracteres.
- Evidencia: `evidencias/qase-MM-5-registro-password-7.png`

### Caso 3: error por edad menor a 13
- Precondiciones: El usuario se encuentra en la pantalla de [Registro](https://minimoda-navy.vercel.app/registro) de la tienda [MiniModa](https://minimoda-navy.vercel.app/).
- Pasos: 1. Llenar los datos válidos. 2. Poner una edad de 9 en el campo Edad. 3. Hacer clic en Crear cuenta.
- Resultado esperado: La aplicación muestra un error indicando que la edad debe estar entre 13 y 120.
- Evidencia: `evidencias/qase-MM-6-registro-edad-12.png`

## 7. Mapa del harness
| Pieza | En lo que usé |
|-------|---------------|
| Modelo | `Gemini` |
| App | `Google Chrome` |
| Harness | `Navegador Web` |
| MCP | `No aplica` |
| Skill | `Asistencia general` |

## 8. Entrega
- Link de tu repo (pegalo también en el Telegram): [https://github.com/grethelsandoval/minimoda-test](https://github.com/grethelsandoval/minimoda-test)
