// sw.js
const CACHE_NAME = 'lumina-portal-v1';
const urlsToCache = [
  '/Nexus-of-Lumina/',
  '/Nexus-of-Lumina/index.html',
  '/Nexus-of-Lumina/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // فقط برای منابع داخلی کش کن
  if (event.request.url.includes('/Nexus-of-Lumina/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});
