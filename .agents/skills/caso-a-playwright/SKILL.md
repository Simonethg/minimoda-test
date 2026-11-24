---
name: caso-a-playwright
description: Convierte un caso confirmado del checkout MiniModa en un test Playwright.
---

# Caso documentado a test Playwright

## Entrada

Recibí el ID del caso, sus precondiciones, pasos, datos sintéticos y el resultado esperado observado. Ubicá y leé el caso documentado en Markdown indicado por el usuario. Si falta alguno de esos datos o no hay evidencia para confirmar el comportamiento, señalalo como **A VERIFICAR**; no lo completes por inferencia.

## Procedimiento

1. Leé las reglas `AGENTS.md` aplicables y el caso Markdown indicado. Trabajá únicamente con la demo de MiniModa.
2. Separá la información respaldada por el caso de cualquier dato, texto, localizador o comportamiento marcado **A VERIFICAR**. No uses los elementos pendientes como hechos para el test.
3. Proponé el test usando localizadores accesibles como `getByRole` o `getByLabel`, guiados por la interfaz observada. No inventes nombres accesibles ni uses esperas fijas como `waitForTimeout`.
4. Conservá el ID del caso en el nombre del test para que pueda rastrearse hasta la documentación.
5. Incluí assertions que verifiquen resultados reales y observables de la interfaz. No uses `expect(page).toBeTruthy()`.
6. Mostrá el diff propuesto y explicá qué resultado de la interfaz comprueba cada assertion. Antes de editar, distinguí claramente lo confirmado de lo pendiente.
7. Ejecutá `npx playwright test` si los permisos y el entorno lo permiten. Si no se puede ejecutar, informá por qué y no afirmes que la suite pasó. Informá los comandos ejecutados y los resultados que efectivamente se observaron.

## Salida esperada

- Propuesta para `tests/pago.spec.ts` basada únicamente en datos confirmados.
- Diff y explicación de cada assertion.
- Evidencia de ejecución de la suite, o el motivo concreto por el que no se ejecutó.
- Lista de dudas o comportamientos **A VERIFICAR**.

## Restricciones

- Nunca inventes textos, localizadores, datos ni resultados de ejecución.
- No uses `test.skip`, `test.fixme` ni `test.only`.
- No uses `expect(page).toBeTruthy()`.
- Usá solo la demo de MiniModa y datos ficticios; no uses datos reales de pago ni servicios de producción.
- No guardes secretos, tokens, contraseñas ni claves en archivos, logs o commits.
- No borres ni saltees tests para conseguir resultados exitosos.
- Pedí confirmación antes de instalar dependencias nuevas o realizar operaciones destructivas.
