var STATIC_CACHE_NAME = 'restaurant-cache-v';
//Rundom Number for CacheId
var randomNumberBetween0and19999 = Math.floor(Math.random() * 20000);
var cache_id = randomNumberBetween0and19999;
STATIC_CACHE_NAME += cache_id;

var urlsToCache = [
 '/',
 'index.html',
 'restaurant.html',
 '/css/styles.css',
 '/data/restaurants.json',
 '/img/1.jpg',
 '/img/2.jpg',
 '/img/3.jpg',
 '/img/4.jpg',
 '/img/5.jpg',
 '/img/6.jpg',
 '/img/7.jpg',
 '/img/8.jpg',
 '/img/9.jpg',
 '/img/10.jpg',
 '/js/dbhelper.js',
 '/js/main.js',
 '/js/restaurant_info.js',
 '/js/sw_registration.js'
];

/* Install a service worker */
self.addEventListener('install', function(event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(function(cache) {
        console.log('WORKER: Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('WORKER: install completed');
      })
  );
});

/* Activate a service worker */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('restaurant-') && STATIC_CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


/* Fetch for offline content */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
