const C='carmon-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==location.origin)return;
 const key=u.pathname.endsWith('/data.bin')?'data.bin':(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html'))?'index.html':null;
 if(!key)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(key,c))}return r})
  .catch(()=>caches.open(C).then(x=>x.match(key)).then(r=>{if(!r)return Response.error();
   const h=new Headers(r.headers);h.set('x-carmon-offline','1');return r.blob().then(b=>new Response(b,{status:200,headers:h}))})))});
