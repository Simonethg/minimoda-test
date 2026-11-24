# Incidencia PAGO-01 — WebKit

## 1. Resumen del problema

Durante la ejecución del caso **PAGO-01 (compra válida)** en **WebKit**, el valor ingresado en el campo Nombre deja de estar presente después de completar el campo Dirección. La comprobación `toHaveValue('Prueba MiniModa')` falla. El comportamiento también se reprodujo con el test ejecutado usando `--headed`.

Este registro documenta resultados observados; **no confirma que exista un defecto de la aplicación ni determina una causa raíz**.

## 2. Pasos de reproducción

1. Ejecutar PAGO-01 en WebKit con los datos sintéticos:
   - Nombre: `Prueba MiniModa`
   - Dirección: `Calle Ficticia 123`
2. Inmediatamente después de `fill()` en Nombre, comprobar que el campo contiene `Prueba MiniModa`.
3. Completar Dirección.
4. Comprobar nuevamente el valor de Nombre mediante `toHaveValue('Prueba MiniModa')`.
5. Repetir la ejecución con `--headed`.

## 3. Resultado esperado

El campo Nombre conserva `Prueba MiniModa` después de completar Dirección y la assertion `toHaveValue('Prueba MiniModa')` pasa. Al confirmar una compra válida, se espera que el flujo pueda continuar hasta la confirmación de compra.

## 4. Resultado observado

- Nombre contiene `Prueba MiniModa` inmediatamente después de `fill()`.
- Después de completar Dirección, Nombre aparece vacío.
- La assertion `toHaveValue('Prueba MiniModa')` falla.
- El fallo también se reprodujo al ejecutar el test con `--headed`.
- En una ejecución anterior, al intentar confirmar, apareció el mensaje `El nombre es obligatorio.` y no hubo confirmación de compra.

## 5. Evidencia disponible

- Observación del valor de Nombre inmediatamente después de `fill()`.
- Observación de Nombre vacío después de completar Dirección.
- Fallo de la assertion `toHaveValue('Prueba MiniModa')`.
- Reproducción del fallo con `--headed`.
- Mensaje observado en una ejecución anterior: `El nombre es obligatorio.`; no se obtuvo confirmación de compra.
- Antecedentes de ejecución: PAGO-01 pasó en Chromium y Firefox; PAGO-0X pasó en los tres navegadores.

No se adjuntan capturas, trazas ni logs en este informe. **A VERIFICAR** si están disponibles y pueden vincularse al caso.

## 6. Impacto potencial

Si el comportamiento afecta el flujo real de compra y se reproduce fuera de esta ejecución, podría impedir completar una compra válida en WebKit al dejar el nombre ausente para la validación o confirmación. El alcance y la incidencia en usuarios reales están **A VERIFICAR**; la evidencia registrada corresponde al caso de prueba y a datos sintéticos.

## 7. Hipótesis pendientes de verificar

Estas son líneas de investigación, no causas confirmadas:

- **A VERIFICAR:** si completar Dirección está relacionado con que el valor de Nombre deje de mostrarse o conservarse.
- **A VERIFICAR:** si el resultado depende de WebKit, de su configuración/versión o de las condiciones de ejecución del test.
- **A VERIFICAR:** si una repetición controlada con evidencia adicional permite determinar en qué momento se pierde el valor y si ocurre también fuera del test.

## 8. Estado

**Abierto. Causa raíz: A VERIFICAR.**
