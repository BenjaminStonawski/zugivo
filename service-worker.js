const CACHE_NAME = 'zugivo-v2';
const FILES_TO_CACHE = [
  '/',
  '/zugivo/',
  '/zugivo/index.html',
  '/zugivo/css/style.css',
  '/zugivo/css/bootstrap.min.css',
  '/zugivo/js/index.js',
  '/zugivo/manifest.json',
  '/zugivo/sounds/wm.mp3',
  '/zugivo/sounds/pop1.mp3',
  '/zugivo/sounds/lose.mp3',
  '/zugivo/sounds/buzz.mp3',
  '/zugivo/sounds/button.mp3',
  '/zugivo/sounds/angel.mp3',
  '/zugivo/icons/icon-192.png',
  '/zugivo/icons/icon-512.png',
  '/zugivo/img/apple-icon-180.png',
  '/zugivo/img/apple-splash-1125-2436.jpg',
  '/zugivo/img/apple-splash-1136-640.jpg',
  '/zugivo/img/apple-splash-1170-2532.jpg',
  '/zugivo/img/apple-splash-1179-2556.jpg',
  '/zugivo/img/apple-splash-1206-2622.jpg',
  '/zugivo/img/apple-splash-1242-2208.jpg',
  '/zugivo/img/apple-splash-1242-2688.jpg',
  '/zugivo/img/apple-splash-1284-2778.jpg',
  '/zugivo/img/apple-splash-1290-2796.jpg',
  '/zugivo/img/apple-splash-1320-2868.jpg',
  '/zugivo/img/apple-splash-1334-750.jpg',
  '/zugivo/img/apple-splash-1488-2266.jpg',
  '/zugivo/img/apple-splash-1536-2048.jpg',
  '/zugivo/img/apple-splash-1620-2160.jpg',
  '/zugivo/img/apple-splash-1640-2360.jpg',
  '/zugivo/img/apple-splash-1668-2224.jpg',
  '/zugivo/img/apple-splash-1668-2388.jpg',
  '/zugivo/img/apple-splash-1792-828.jpg',
  '/zugivo/img/apple-splash-2048-1536.jpg',
  '/zugivo/img/apple-splash-2048-2732.jpg',
  '/zugivo/img/apple-splash-2160-1620.jpg',
  '/zugivo/img/apple-splash-2208-1242.jpg',
  '/zugivo/img/apple-splash-2224-1668.jpg',
  '/zugivo/img/apple-splash-2266-1488.jpg',
  '/zugivo/img/apple-splash-2360-1640.jpg',
  '/zugivo/img/apple-splash-2388-1668.jpg',
  '/zugivo/img/apple-splash-2436-1125.jpg',
  '/zugivo/img/apple-splash-2532-1170.jpg',
  '/zugivo/img/apple-splash-2556-1179.jpg',
  '/zugivo/img/apple-splash-2622-1206.jpg',
  '/zugivo/img/apple-splash-2688-1242.jpg',
  '/zugivo/img/apple-splash-2732-2048.jpg',
  '/zugivo/img/apple-splash-2778-1284.jpg',
  '/zugivo/img/apple-splash-2796-1290.jpg',
  '/zugivo/img/apple-splash-2868-1320.jpg',
  '/zugivo/img/apple-splash-640-1136.jpg',
  '/zugivo/img/apple-splash-750-1334.jpg',
  '/zugivo/img/apple-splash-828-1792.jpg',
  '/zugivo/img/csepp.png',
  '/zugivo/img/favicon.png',
  '/zugivo/img/manifest-icon-192.maskable.png',
  '/zugivo/img/manifest-icon-512.maskable.png',
  '/zugivo/img/zscr1.jpg',
  '/zugivo/img/zscr2.jpg'
];

// Telepítéskor cache-elés
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Aktiváláskor régi cache törlése
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch → próbáljuk cache-ből, ha nem megy, hálózatból
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
