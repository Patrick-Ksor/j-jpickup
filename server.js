require('dotenv').config();
const http = require('http');
const fs   = require('fs');
const path = require('path');
const { sendFormEmails } = require('./lib/mailer');

const PORT = process.env.PORT || 3000;

const MIME = {
  '.html':  'text/html; charset=utf-8',
  '.css':   'text/css; charset=utf-8',
  '.js':    'application/javascript; charset=utf-8',
  '.png':   'image/png',
  '.jpg':   'image/jpeg',
  '.jpeg':  'image/jpeg',
  '.gif':   'image/gif',
  '.svg':   'image/svg+xml',
  '.ico':   'image/x-icon',
  '.webp':  'image/webp',
  '.woff':  'font/woff',
  '.woff2': 'font/woff2',
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk.toString(); });
    req.on('end',  () => resolve(Object.fromEntries(new URLSearchParams(raw))));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // ── POST /submit — form handler ─────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/submit') {
    try {
      const d = await parseBody(req);

      // Honeypot — silently drop bot submissions
      if (d['bot-field']) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        return;
      }

      await sendFormEmails({
        name:        d.name              || '(not provided)',
        email:       d.email             || '(not provided)',
        phone:       d.phone             || '(not provided)',
        address:     d.address           || '(not provided)',
        junkDesc:    d['junk-desc']      || '(not provided)',
        service:     d.service           || '',
        loadSize:    d['load-size']      || '',
        preferred:   d['preferred-date'] || '',
        formName:    d['form-name']      || 'quote',
        submittedAt: new Date().toLocaleString('en-US', {
          timeZone: 'America/New_York',
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (err) {
      console.error('Submit error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false }));
    }
    return;
  }

  // ── Static file serving ─────────────────────────────────────────────────
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  // Prevent path traversal attacks
  const filePath = path.normalize(path.join(__dirname, urlPath));
  if (!filePath.startsWith(__dirname + path.sep) && filePath !== __dirname) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  J&J Pickup running at http://localhost:${PORT}\n`);
});
