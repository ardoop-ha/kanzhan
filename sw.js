// 看展誌 PWA：開啟時先抓最新版（有網路就更新），沒網路時用上次的快取
const V='kanzhan-20261026a';const CORE=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kanzhan-')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html')));return;}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r)));});
