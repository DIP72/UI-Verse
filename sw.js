// UI-Verse Service Worker — basic offline-first caching
const CACHE_NAME = 'ui-verse-v1';
const RUNTIME = 'runtime-cache';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/compare.html',
  '/style.css',
  '/css/main.css',
  '/script.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME && k !== RUNTIME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

function cacheFirst(request) {
  return caches.match(request).then(cached => cached || fetch(request).then(resp => {
    return caches.open(RUNTIME).then(cache => { cache.put(request, resp.clone()); return resp; });
  })).catch(() => caches.match('/offline.html'));
}

function staleWhileRevalidate(request) {
  return caches.open(RUNTIME).then(cache =>
    cache.match(request).then(cached => {
      const network = fetch(request).then(resp => { cache.put(request, resp.clone()); return resp; }).catch(() => null);
      return cached || network;
    })
  );
}

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // navigation requests -> cache-first (serve offline page fallback)
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // CSS/JS: stale-while-revalidate
  if (req.destination === 'style' || req.destination === 'script') {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // images: cache-first
  if (req.destination === 'image') {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(resp => { caches.open(RUNTIME).then(c => c.put(req, resp.clone())); return resp; })).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // default: try cache, then network
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
