/* Cache offline de Labyrinthe Aventure V2.0 */
const CACHE='elc-labyrinthe-v2-0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg',
'./assets/avatars-sheet.webp',
'./assets/avatars/boy.webp',
'./assets/avatars/girl.webp',
'./assets/avatars/dragon.webp',
'./assets/avatars/unicorn.webp',
'./assets/avatars/fox.webp',
'./assets/avatars/robot.webp',
'./assets/avatars/cat.webp',
'./assets/avatars/panda.webp',
'./assets/worlds/forest.webp',
'./assets/worlds/ruins.webp',
'./assets/worlds/island.webp',
'./assets/worlds/ice.webp',
'./assets/worlds/cloud.webp',
'./assets/worlds/stars.webp',
'./assets/worlds/forest-splash.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('elc-labyrinthe-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;let u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){let copy=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,copy))}return r}))) });