const cacheName = 'v2';


// Call Install Event
self.addEventListener('install', (event) => {
console.log('Service Worker: Installed')
   
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
        fetch(event.request)
        .then(response => {
            // Make a clone of the response
            const clonedObj = response.clone();
            // Open a cache 
            caches.open(cacheName)
            .then(cache => {
                // Add response to cache
                cache.put(event.request, clonedObj);
            })
            return response;
        }).catch(err => {
            caches
            .match(event.request)
            .then(response => response);
        })
    )
})