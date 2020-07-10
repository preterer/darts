self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("darts-cache").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/bootstrap.css",
        "/css/styles.css",
        "/img/dart.svg",
        "/dist/build.js",
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
