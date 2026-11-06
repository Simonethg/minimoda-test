const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
try {
  const event = JSON.parse(fs.readFileSync(0, 'utf8'));
  const root = process.env.CURSOR_PROJECT_DIR || process.cwd();
  const file = path.resolve(root, event.file_path || event.tool_input?.path || event.tool_input?.file_path || '.');
  const relative = path.relative(root, file);
  if (!relative.startsWith('tests' + path.sep)) {
    process.stdout.write('{}\n');
    process.exit(0);
  }
  const result = spawnSync('npx', ['playwright', 'test', 'tests/pago.spec.ts'], {
    cwd: root, stdio: 'inherit'
  });
  if (result.error || result.status !== 0) {
    console.error('La suite no terminó en verde. Revisá el reporte y el diff.');
    process.exit(2);
  }
  process.stdout.write('{}\n');
} catch {
  console.error('No se pudo validar afterFileEdit.');
  process.exit(2);
}
