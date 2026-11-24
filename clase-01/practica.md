# Práctica clase 01: casos del registro de MiniModa con IA

**Sitio:** https://minimoda-navy.vercel.app/registro

> Práctica de diseño y revisión de casos de prueba para el registro de MiniModa utilizando herramientas de inteligencia artificial.

## 1. Preparación
- Navegador y fecha: Google Chrome, 10/11/2026. 

Exploré manualmente los formularios de registro e inicio de sesión de MiniModa para conocer su funcionamiento y comprobar las validaciones. Verifiqué que el email requiere un formato válido, la contraseña debe tener al menos 8 caracteres, las contraseñas deben coincidir, la edad permitida es de 13 a 120 años y es obligatorio seleccionar un país y aceptar los términos. También observé que el campo Nombre acepta números, aunque no existe una restricción visible que permita determinar si esto es un defecto. En el inicio de sesión comprobé que se puede ingresar sin una cuenta previamente registrada, pero la página aclara que se trata de una simulación, por lo que no lo considero un error confirmado.

## 2. Superficie elegida
- Elegí (chat o cowork): ChatGPT en modo Chat.
- Por qué: Elegí Chat porque me permite generar y revisar casos de prueba de forma rápida y sencilla, sin utilizar comandos ni modificar archivos directamente. Además, puedo analizar las respuestas y corregirlas según las validaciones que observé en la página.

## 3. Preguntas a Gemini
| # | Pregunta | Respuesta (resumen) | ¿Acierto o error/invento? |
|---|----------|---------------------|---------------------------|
| 1 | ¿Qué campos pide el formulario de registro de https://minimoda-navy.vercel.app/registro? | Identificó nombre, email, contraseña, confirmación de contraseña, edad, país y aceptación de términos. También mencionó los países disponibles. | Acierto. Comprobé que los campos y países mencionados aparecen en el formulario. |
| 2 | ¿Cuál es el largo mínimo de la contraseña y qué edad se permite? | Indicó un mínimo de 8 caracteres para la contraseña y edades entre 13 y 120 años inclusive. | Acierto. Probé las edades 12, 13, 120 y 121. El formulario aceptó 13 y 120 y rechazó las edades fuera del rango. |
| 3 | ¿Qué pasa si no acepto los términos? | Explicó que la aceptación es obligatoria y que el sistema muestra un error cuando no se marca la casilla. | Acierto. Comprobé que aparece el mensaje «Debés aceptar los términos.». |

- Un acierto: Gemini identificó correctamente las validaciones del formulario, especialmente las restricciones de edad y contraseña. También proporcionó información correcta sobre los campos y países disponibles.
- Un error o invento: No identifiqué información inventada en las tres respuestas. Gemini no reprodujo literalmente el mensaje de error de los términos y condiciones, pero explicó correctamente el comportamiento. Esto me permitió comprobar que, aunque la IA responda correctamente, siempre es importante contrastar sus respuestas con la aplicación.

## 4. Primer modo
- Superficie y modo: ChatGPT en modo Chat, utilizando un prompt con el contexto del formulario, las validaciones observadas y las restricciones para generar seis casos de prueba.
- Prompt de ejemplo:
  ```
  Sos QA. Vamos a probar el registro de https://minimoda-navy.vercel.app/registro
  Campos: nombre, email, contraseña, confirmar contraseña, edad, país y aceptar términos.
  1. Listá las reglas que se ven, los datos válidos e inválidos y los valores límite.
  2. Escribí 6 casos de prueba con: título, precondiciones, pasos con datos concretos,
     resultado esperado, prioridad (high/medium/low) y tipo (functional/negative/boundary).
  No inventes mensajes: si no sabés el texto exacto, marcalo "A VERIFICAR".
  ```
- Qué devolvió: ChatGPT generó seis casos de prueba: registro con datos válidos, contraseña inferior al mínimo, valores límite de edad, correo electrónico inválido, contraseñas que no coinciden y campos obligatorios sin completar.

  Los casos estaban organizados e incluían precondiciones, pasos, datos ficticios, resultados esperados, prioridad y tipo de prueba. En general, la respuesta fue útil, aunque encontré algunos aspectos para mejorar. Por ejemplo, ciertos datos de prueba eran poco específicos y el último caso agrupaba dos validaciones independientes: selección de país y aceptación de términos.

  También marcó como «A VERIFICAR» algunos mensajes que yo ya había comprobado durante la exploración manual. Por eso, revisé los casos antes de utilizarlos en Qase.

## 5. Otra superficie: comparación en 3 líneas
1. **Velocidad:** ChatGPT Chat tardó 14 segundos en generar los seis casos, mientras que ChatGPT Work tardó 12 segundos en la ejecución medida.
2. **Calidad:** ambas herramientas generaron casos útiles. Work separó mejor las validaciones independientes e incluyó más pruebas de valores límite, mientras que Chat incorporó un escenario completo de registro exitoso.
3. **Información inventada:** no identifiqué comportamientos falsos confirmados, pero ambas herramientas incorporaron precondiciones no verificadas, como la necesidad de usar correos no registrados. Work también sugirió cerrar sesión entre ejecuciones, algo que no había comprobado como necesario en MiniModa.

## 6. Mis 3 mejores casos (cargados en Qase, proyecto MiniModa)
Formato del título: `Registro: <qué se prueba>`

Captura de la suite en Qase con tus casos: `evidencias/qase-suite-casos.jpeg`


### Caso 1: MM-1 – Registro: alta con datos válidos
- Precondiciones: El formulario de registro de MiniModa está disponible y los campos se encuentran vacíos.
- Pasos:
  1. Abrir https://minimoda-navy.vercel.app/registro.
  2. Ingresar `Sofía Martínez` en Nombre y `sofia.qa01@example.com` en Email.
  3. Ingresar `Prueba123` en Contraseña y Confirmar contraseña.
  4. Ingresar `25` en Edad.
  5. Seleccionar Argentina en País y aceptar los términos y condiciones.
  6. Presionar el botón Crear cuenta.
- Resultado esperado: El formulario debe permitir completar el registro cuando todos los datos cumplen las validaciones y mostrar el mensaje '¡Registro exitoso! Bienvenido/a a MiniModa, Sofía Martínez. Te enviamos un email de bienvenida (ver Bandeja).'.
- Resultado observado: Realicé una prueba manual con datos válidos utilizando el nombre `jose`, el email `jose@ramon.com` y la edad `23`. El registro se completó correctamente y apareció el mensaje '¡Registro exitoso! Bienvenido/a a MiniModa, jose. Te enviamos un email de bienvenida (ver Bandeja).'. Esto confirma el comportamiento esperado del formulario, aunque la ejecución se realizó con datos diferentes a los definidos en el caso de Qase.
- Evidencia: `evidencias/qase-MM-1-registro-alta-exitosa.jpeg`

### Caso 2: MM-2 – Registro: contraseña inferior a 8 caracteres
- Precondiciones: El formulario de registro está disponible y los campos se encuentran vacíos.
- Pasos:
  1. Abrir https://minimoda-navy.vercel.app/registro.
  2. Ingresar nombre `Sofía Martínez`, email `sofia.qa02@example.com` y edad `25`.
  3. Seleccionar Argentina y aceptar los términos y condiciones.
  4. Ingresar `Prueba1` en Contraseña y Confirmar contraseña.
  5. Presionar Crear cuenta.
- Resultado esperado: El sistema debe impedir el registro porque la contraseña contiene solamente 7 caracteres y mostrar el mensaje 'La contraseña debe tener al menos 8 caracteres.'.
- Resultado observado: Durante la exploración manual comprobé que el sistema detecta contraseñas inferiores a 8 caracteres y muestra el mensaje de validación correspondiente, impidiendo completar el registro.
- Evidencia: `evidencias/qase-MM-2-registro-password-7.jpeg`

### Caso 3: MM-3 – Registro: validación de valores límite de edad
- Precondiciones: El formulario de registro está disponible y los demás campos se pueden completar con datos válidos.
- Pasos:
  1. Abrir el formulario y completar los datos válidos, excepto la edad.
  2. Ingresar la edad `12` e intentar registrarse.
  3. Repetir el escenario con la edad `13`.
  4. Repetir el escenario con la edad `120`.
  5. Repetir el escenario con la edad `121`.
- Resultado esperado: El sistema debe aceptar las edades 13 y 120 y rechazar las edades 12 y 121. Cuando se ingresa una edad fuera del rango permitido, debe mostrar el mensaje 'La edad debe estar entre 13 y 120.'.
- Resultado observado: Comprobé manualmente los cuatro valores límite. Las edades 13 y 120 fueron aceptadas, mientras que 12 y 121 fueron rechazadas. El formulario mostró el mensaje de error correspondiente para las edades fuera del rango.
- Evidencia: `evidencias/qase-MM-3-registro-edad-limites.jpeg`


## 7. Mapa del harness
| Pieza | En lo que usé |
|-------|---------------|
| Modelo | Utilicé modelos de inteligencia artificial a través de ChatGPT y Gemini. No registré las versiones exactas seleccionadas durante las pruebas. |
| App | ChatGPT Chat, ChatGPT Work y Gemini. También utilicé Google Chrome para explorar MiniModa y Qase para documentar los casos de prueba. |
| Harness | Los entornos de ChatGPT Chat y Work, que proporcionan la interfaz, el contexto, las herramientas y las capacidades disponibles para utilizar los modelos. No configuré un harness propio. |
| MCP | No utilicé ni configuré servidores MCP en esta práctica. |
| Skill | No utilicé una skill específica. Trabajé con instrucciones en los prompts para definir las validaciones, utilizar datos ficticios, estructurar los casos y evitar información inventada. |

## 8. Entrega
- Link de tu repo (pegalo también en el Telegram): https://github.com/natharisa/minimoda-test
