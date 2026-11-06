# Hallazgos · práctica con Cursor CLI (vs guía Claude/Codex)

Fecha: 2026-11-06 · Mac · Cursor Agent `2026.11.05-86047df`

## Qué funcionó (equivalente Cursor)
1. **AGENTS.md** raíz + **tests/AGENTS.md** — Cursor los carga (raíz always; tests al abrir paths bajo tests/).
2. **`.cursor/rules/*.mdc`** con `alwaysApply: true` — refuerza las mismas políticas.
3. **Skill** en `.cursor/skills/caso-a-playwright/SKILL.md` (no `.claude/skills`).
4. **Hooks** en `.cursor/hooks.json` (docs: https://cursor.com/docs/hooks):
   - `preToolUse` + `beforeShellExecution` → deny con JSON `{ "permission": "deny", ... }`
   - `afterFileEdit` → post-check
   - Deny real comprobado: agente intentó `test.skip` → **«No saltees tests para conseguir verde.»**
5. Trust del workspace: hace falta aprobación interactiva en Terminal (`[a] Trust`). No usamos `--trust`/`--yolo`/`--force`.

## Diferencias vs la guía actual (Claude Code / Codex)
| Guía (Claude/Codex) | Cursor CLI |
|---|---|
| `.claude/settings.json` hooks PreToolUse/PostToolUse | `.cursor/hooks.json` `preToolUse` / `beforeShellExecution` / `afterFileEdit` |
| Respuesta deny Claude: `hookSpecificOutput.permissionDecision` | Respuesta Cursor: `{ "permission": "deny", "agent_message": "..." }` |
| Scripts anexo `pre-tests.cjs` formato Claude | Hace falta adaptar el JSON de salida (como `scripts/cursor-pre-tests.cjs`) |
| Skill en `.claude/skills` o `.agents/skills` | Skill en `.cursor/skills` |
| `CLAUDE.md` con `@AGENTS.md` | No hace falta; Cursor lee AGENTS.md + `.cursor/rules` |
| Codex approvals/sandbox | Cursor: trust de workspace + approvals/sandbox según `cli-config` + hooks |

## Recomendación para la guía
Sumar un camino **Cursor CLI** en Paso 2/5 (o anexo): dónde van rules/hooks/skills y el formato deny de Cursor. Los pasos de Playwright, casos y MCP valen igual.
