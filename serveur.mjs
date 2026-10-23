// Serveur statique facultatif : node serveur.mjs
// Aucune dépendance externe.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    try {
        const url = new URL(req.url, 'http://localhost');
        const pathname = decodeURIComponent(url.pathname);

        const filePath = pathname === '/' ? '/index.html' : pathname;
        const target = path.resolve(root, '.' + filePath);

        if (
            !target.startsWith(root + path.sep) ||
            !fs.statSync(target).isFile()
        ) {
            res.writeHead(404).end('Not found');
            return;
        }

        const extension = path.extname(target);
        const contentType = types[extension] || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);
        fs.createReadStream(target).pipe(res);
    } catch {
        res.writeHead(404).end('Not found');
    }
});

server.listen(8850, '127.0.0.1', () => {
    console.log(
        'LegalBridge: http://localhost:8850 (Ctrl+C pour arrêter)'
    );
});