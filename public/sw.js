const CACHE_NAME = 'Mokuteck_cache';
const urlsToCache = [
    '/',
    'inc/css/styleLogin.css',
    '../main.js'
]

self.addEventListener('install', ev=>{
    ev.waitUntil(
       caches.open('v1')
       .then(cache=>{
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
       }) 
    );
});


self.addEventListener('active', ev=>{
    ev.waitUntil(self.clients.claim())
})


self.addEventListener('fetch', ev=>{
    ev.respondWith(
        caches.match(ev.request).then(response =>{
            return response || fetch(ev.request)
        })
    )
})