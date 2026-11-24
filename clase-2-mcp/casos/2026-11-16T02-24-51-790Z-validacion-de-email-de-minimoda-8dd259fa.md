# Validación de email de MiniModa

- **Requisito:** El correo electrónico debe tener un formato válido
- **Prioridad:** alta

## Pasos
1. Abrir el formulario de registro de MiniModa.
2. Ingresar cliente.minimoda.com en el campo de correo electrónico.
3. Completar los demás campos obligatorios con datos ficticios.
4. Enviar el formulario.
5. Comprobar que el formulario rechace el email y muestre un mensaje de formato inválido.

## Datos
Email de prueba inválido: cliente.minimoda.com (sin @).

## Resultado esperado
El sistema rechaza el email sin @, no completa el registro y solicita ingresar una dirección de correo válida.
