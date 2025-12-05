// Service Worker pour le portfolio de Sasha Lorenc
// Version 1.0.0

const CACHE_NAME = 'portfolio-sasha-lorenc-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/global.css',
  '/css/accueil_css.css',
  '/css/about_css.css',
  '/css/contacts_css.css',
  '/css/projet_css.css',
  '/css/skills_css.css',
  '/css/project_detail.css',
  '/js/common.js',
  '/js/translations.js',
  '/js/page-transitions.js',
  '/js/contact-popup.js',
  '/js/carousel.js',
  '/js/contact.js',
  '/images/sasha.png',
  '/images/favicon.svg',
  '/images/logo.svg',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch(() => {
        // Erreur silencieuse lors de la mise en cache
      })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Stratégie: Cache First, puis Network
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes vers des APIs externes (analytics, etc.)
  // Les analytics Vercel sont gérés automatiquement par Vercel

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourner la réponse du cache si disponible
        if (response) {
          return response;
        }

        // Sinon, faire une requête réseau
        return fetch(event.request).then((response) => {
          // Vérifier si la réponse est valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cloner la réponse pour la mettre en cache
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // En cas d'erreur réseau, retourner une page offline si disponible
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

