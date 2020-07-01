self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("darts-cache").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/bootstrap.css",
        "/css/styles.css",
        "/dist/build.js",
        "/dist/dart.svg",
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
