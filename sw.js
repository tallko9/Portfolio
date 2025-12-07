// Service Worker pour le portfolio de Sasha Lorenc
// Version 1.0.0

const CACHE_NAME = 'portfolio-sasha-lorenc-v3';

// Installation du Service Worker
self.addEventListener('install', (event) => {
  // Ne plus mettre en cache les fichiers CSS/JS car ils ont des versions dynamiques
  // Le cache sera géré dynamiquement lors des requêtes
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Supprimer les anciens caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Réclamer immédiatement tous les clients
      self.clients.claim()
    ])
  );
});

// Stratégie: Network First pour les fichiers avec versions, Cache First pour le reste
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  const hasVersion = url.searchParams.has('v');
  const isStaticAsset = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/i);

  // Pour les fichiers CSS/JS avec paramètre de version, utiliser Network First
  // Cela garantit que les nouvelles versions sont toujours téléchargées
  if (hasVersion && isStaticAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Si la requête réseau réussit, mettre à jour le cache
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // En cas d'erreur réseau, utiliser le cache en fallback
          return caches.match(event.request);
        })
    );
    return;
  }

  // Pour les autres fichiers (images, HTML, etc.), utiliser Cache First
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

