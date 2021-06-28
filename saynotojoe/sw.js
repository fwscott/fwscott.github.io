const cacheName = 'saynotojoe-v1';
const appShellFiles = [
  '/saynotojoe/',
  '/saynotojoe/index.html',
  '/saynotojoe/nowayjoe.m4a',
  '/saynotojoe/joe.jpg',
  '/saynotojoe/favicon.ico',
  '/saynotojoe/icons/icon-256.png',
  '/saynotojoe/icons/icon-512.png'
];

const contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener('install', (e) => {
 
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    cache.put(e.request, response.clone());
    return response;
  })());
});