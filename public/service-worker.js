self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        "/css/bootstrap.css",
        "/css/styles.css",
        "/dist/build.js",
        "/dist/dart.svg",
      ]);
    })
  );
});
