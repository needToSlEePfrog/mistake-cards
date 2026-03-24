const CACHE = 'mcards-v4';
const SHELL = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // /data/*.json — always network-first, no cache
  if (url.pathname.startsWith('/data/') && url.pathname.endsWith('.json')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() =>
        caches.match(e.request)
      )
    );
    return;
  }

  // KaTeX fonts — cache-first (immutable)
  if (url.href.includes('katex') && (url.href.includes('.woff') || url.href.includes('.ttf'))) {
    e.respondWith(
      caches.open('katex-fonts').then(c =>
        c.match(e.request).then(hit => hit || fetch(e.request).then(r => {
          c.put(e.request, r.clone()); return r;
        }))
      )
    );
    return;
  }

  // App shell — cache-first
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(e.request).then(hit => hit || fetch(e.request).then(r => {
          c.put(e.request, r.clone()); return r;
        }))
      )
    );
    return;
  }
});
