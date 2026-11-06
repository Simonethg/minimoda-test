const fs = require('node:fs');
const path = require('node:path');
function deny(reason) {
  process.stdout.write(JSON.stringify({
    permission: 'deny',
    user_message: reason,
    agent_message: reason
  }) + '\n');
}
function allow() {
  process.stdout.write(JSON.stringify({ permission: 'allow' }) + '\n');
}
try {
  const event = JSON.parse(fs.readFileSync(0, 'utf8'));
  const tool = event.tool_name || '';
  const input = event.tool_input || {};
  const root = process.env.CURSOR_PROJECT_DIR || process.cwd();

  // Shell / beforeShellExecution shape
  if (event.command && !tool) {
    const cmd = String(event.command);
    if (/\brm\s+-rf\b|\bgit\s+push\s+.*--force\b|\btest\.skip\b/.test(cmd)) {
      deny('Comando bloqueado por hook Cursor (destructivo o test.skip).');
      process.exit(0);
    }
    allow();
    process.exit(0);
  }

  if (tool === 'Shell') {
    const cmd = String(input.command || '');
    if (/\btest\.skip\b|\btest\.fixme\b/.test(cmd)) {
      deny('No saltees tests para conseguir verde.');
      process.exit(0);
    }
    // didactic: don't let agent run playwright (student runs it) — optional soft note
    allow();
    process.exit(0);
  }

  if (tool === 'Write' || tool === 'Edit' || tool === 'StrReplace' || tool === 'Delete') {
    const file = path.resolve(root, input.path || input.file_path || input.filePath || '.');
    const relative = path.relative(root, file);
    const inTests = relative.startsWith('tests' + path.sep) || relative === 'tests';
    const text = String(input.contents ?? input.new_string ?? input.new_string ?? input.content ?? input.newString ?? '');
    // also inspect edits array
    const editsText = Array.isArray(input.edits)
      ? input.edits.map(e => String(e.new_string || e.newString || '')).join('\n')
      : '';
    const blob = text + '\n' + editsText;
    if (inTests && /test\s*\.\s*(skip|fixme)\b/.test(blob)) {
      deny('No saltees tests para conseguir verde.');
      process.exit(0);
    }
  }
  allow();
} catch (e) {
  deny('Entrada de hook inválida: detené la acción y revisá la configuración.');
}
