#!/usr/bin/env node
/**
 * Report any stray dev servers this project may have left listening.
 *
 * `npm run ports` — lists them. `npm run ports -- --kill` — stops them.
 *
 * Exists because a backgrounded server that is never stopped keeps its port,
 * so the next run picks a different one, and the machine quietly accumulates
 * servers on 3000, 4173, 4174 … each serving a different old build. Anything
 * bound to 0.0.0.0 is also reachable from the local network, which is flagged
 * separately below.
 */

const { execSync } = require('child_process');

const ALLOWED = 3000;
// Ports commonly grabbed by dev tooling: CRA/Next, Vite, and `serve`.
const WATCHED = [3000, 3001, 3002, 4173, 4174, 4175, 4176, 4177, 4178, 4179,
  4180, 4181, 4182, 4183, 4184, 4185, 4186, 4187, 4188, 5000, 5173, 8080];

const kill = process.argv.includes('--kill');

const listeners = () => {
  let out = '';
  try {
    out = execSync('netstat -ano', { encoding: 'utf8' });
  } catch {
    return [];
  }

  const found = new Map();
  for (const line of out.split('\n')) {
    if (!line.includes('LISTENING')) continue;
    const parts = line.trim().split(/\s+/);
    const local = parts[1] || '';
    const pid = parts[parts.length - 1];
    const port = Number(local.split(':').pop());
    if (!WATCHED.includes(port)) continue;

    // Same PID can appear twice (IPv4 + IPv6); keep one row per port+pid and
    // remember whether any binding was on a public interface.
    const key = port + ':' + pid;
    const wide = local.startsWith('0.0.0.0') || local.startsWith('[::]');
    if (found.has(key)) {
      if (wide) found.get(key).wide = true;
    } else {
      found.set(key, { port, pid, wide });
    }
  }
  return [...found.values()].sort((a, b) => a.port - b.port);
};

const rows = listeners();

if (rows.length === 0) {
  console.log('\n  No dev servers listening on watched ports.\n');
  process.exit(0);
}

console.log('');
for (const r of rows) {
  const tag = r.port === ALLOWED ? 'allowed' : 'STRAY';
  const net = r.wide ? '  [reachable from your network]' : '';
  console.log(`  ${String(r.port).padEnd(6)} PID ${String(r.pid).padEnd(8)} ${tag}${net}`);
}

const strays = rows.filter((r) => r.port !== ALLOWED);

if (!kill) {
  console.log(
    strays.length
      ? `\n  ${strays.length} stray server(s). Stop them with:  npm run ports -- --kill\n`
      : '\n  Nothing stray.\n'
  );
  process.exit(0);
}

for (const r of strays) {
  try {
    execSync(`taskkill /F /PID ${r.pid}`, { stdio: 'ignore' });
    console.log(`  stopped ${r.port} (PID ${r.pid})`);
  } catch {
    console.log(`  could not stop ${r.port} (PID ${r.pid})`);
  }
}
console.log('');
