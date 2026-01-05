// My Website Brand - Service Worker (Sharp Edges)
const CACHE_NAME = 'my-website-brand-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/contact.html',
  '/blog.html',
  '/style.css',
  '/script.js',
  '/images/hero-placeholder.jpg',
  '/images/about-placeholder.jpg',
  '/images/service1.jpg',
  '/images/service2.jpg',
  '/images/service3.jpg',
  '/images/map-placeholder.jpg',
  '/images/blog1.jpg',
  '/images/blog2.jpg',
  '/images/panel1.jpg',
  '/images/panel2.jpg',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        });
      }).catch(() => {
        if (event.request.destination === 'image') {
          return caches.match('/images/hero-placeholder.jpg');
        }
      });
    })
  );
});
