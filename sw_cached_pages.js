const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/styles.css',
    '/js/main.js'
];


// Call Install Event
self.addEventListener('install', (event) => {
console.log('Service Worker: Installed')

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files')
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    caches.keys()
    .then(cacheNames => {
        return Promise.all(
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                    console.log('Service Worker clearing old cache');
                    return caches.delete(cache);
                }
            })
        )
    })
});

// Call Fetch Event
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching data');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
})