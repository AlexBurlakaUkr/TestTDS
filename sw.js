const CACHE_NAME = "unity-webgl-cache-v1";

const urlsToCache = [
  "index.html",
  "Build/WebGl.data.unityweb",
  "Build/WebGl.framework.js.unityweb",
  "Build/WebGl.loader.js",
  "Build/WebGl.wasm.unityweb"
  // якщо треба, додай ще TemplateData/style.css або StreamingAssets
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
