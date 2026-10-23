/*
 * Polonia Razem! — service worker wersji w przeglądarce (https://poloniabxl.be/app/, prywatne/WERSJA-WEB.md).
 * Kopiuje go scripts/release/web-export.mjs do /app/sw.js (zakres /app/). Rejestruje go src/lib/notifications.web.ts.
 *
 * Robi TYLKO powiadomienia Web Push (push-dispatch → usługa push przeglądarki → tu):
 *  - „push”: pokazuje powiadomienie (tytuł, treść; tag = mecz — nowy wynik zastępuje poprzedni),
 *  - „notificationclick”: otwiera aplikację na meczu / newsie (otwarta karta dostaje wiadomość, zamknięta
 *    startuje z adresem /app/?pt_push=…).
 * Celowo BEZ obsługi „fetch” i bez pamięci podręcznej: nic nie trzyma starej wersji aplikacji — po publikacji
 * nowej wersji kibice dostają ją przy najbliższym otwarciu.
 */
const BASE = new URL(self.registration.scope).pathname.replace(/\/$/, '');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let msg = {};
  try {
    msg = event.data ? event.data.json() : {};
  } catch {
    msg = { body: event.data ? event.data.text() : '' };
  }
  const title = msg.title || 'Polonia Razem!';
  const options = {
    body: msg.body || '',
    data: msg.data || {},
    icon: `${BASE}/pwa/icon-192.png`,
    badge: `${BASE}/pwa/badge-96.png`,
    lang: 'pl',
  };
  if (msg.tag) {
    options.tag = msg.tag;
    options.renotify = true;
  }
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const d = event.notification.data || {};
  const data = { type: d.type, event_id: d.event_id, news_id: d.news_id, notification_id: d.notification_id };
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const open = windows.find((c) => new URL(c.url).pathname.startsWith(`${BASE}/`));
    if (open) {
      await open.focus();
      open.postMessage({ type: 'pt-push-open', data });
      return;
    }
    await self.clients.openWindow(`${BASE}/?pt_push=${encodeURIComponent(JSON.stringify(data))}`);
  })());
});
