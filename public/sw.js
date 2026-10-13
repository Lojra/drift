const CACHE_NAME = 'drift-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './drift-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Let external music API and audio stream requests pass through
  if (
    event.request.url.includes('musicbrainz.org') ||
    event.request.url.includes('apple.com') ||
    event.request.url.includes('coverartarchive.org') ||
    event.request.url.includes('googleapis.com')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
