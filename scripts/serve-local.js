#!/usr/bin/env node
/**
 * Serve the production build on exactly one port, bound to loopback only.
 *
 * Two rules this enforces, both of which were being broken by hand:
 *
 *   1. One port. If PORT is taken, this fails loudly and names the process
 *      holding it rather than silently picking the next free number. Nine
 *      forgotten dev servers on nine different ports is how that ends.
 *
 *   2. Loopback only. `serve` and CRA's dev server both bind 0.0.0.0 by
 *      default, which publishes the site to every device on the network.
 *      This binds 127.0.0.1, so the only ways in are this machine and the
 *      real deployment.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = Number(process.env.PORT) || 3000;
const HOST = '127.0.0.1';
const ROOT = path.join(__dirname, '..', 'build');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error('\n  No build found. Run `npm run build` first.\n');
  process.exit(1);
}

// Names whatever already holds the port, so the fix is obvious instead of
// being "try another port".
const describeHolder = () => {
  try {
    const out = execSync(`netstat -ano | findstr :${PORT} | findstr LISTENING`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const pid = out.trim().split(/\s+/).pop();
    return pid ? `PID ${pid} — stop it with:  taskkill /F /PID ${pid}` : null;
  } catch {
    return null;
  }
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(ROOT, urlPath);

  // Containment check: a crafted path must not escape the build directory.
  if (!path.resolve(filePath).startsWith(path.resolve(ROOT))) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // SPA fallback — client-side routing owns unknown paths.
    filePath = path.join(ROOT, 'index.html');
  }

  const type = TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  fs.createReadStream(filePath).pipe(res);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const holder = describeHolder();
    console.error(`\n  Port ${PORT} is already in use.`);
    console.error('  This project serves on one port only and will not pick another.');
    if (holder) console.error(`  ${holder}`);
    console.error('');
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, HOST, () => {
  console.log(`\n  Portfolio running at http://${HOST}:${PORT}`);
  console.log('  Bound to loopback only — not reachable from the network.\n');
});

// Release the port on exit rather than leaving it held.
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    server.close(() => process.exit(0));
  });
}
