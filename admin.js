/* ============================================================================
   FC POLONIA BRUKSELA — PANEL ADMINISTRATORA (dodawanie wpisów)
   ----------------------------------------------------------------------------
   UCZCIWE OSTRZEŻENIE O BEZPIECZEŃSTWIE
   Strona jest statyczna — nie ma serwera, który mógłby sprawdzić hasło.
   To logowanie chroni panel przed przypadkowym otwarciem, ale NIE jest
   zabezpieczeniem kryptograficznym: ktoś, kto zna się na rzeczy, obejdzie je
   czytając kod strony. Nie trzymaj tu niczego poufnego.

   Prawdziwe logowanie wymaga serwera (np. funkcji Netlify sprawdzającej hasło
   po stronie serwera + Netlify Identity). Gdy strona trafi na hosting, mogę
   to podmienić — panel i edytor zostaną te same.

   Wpisy zapisują się w przeglądarce (localStorage) i pojawiają się na stronie
   od razu. Eksport do pliku pozwala przenieść je do content.js na stałe.
   ========================================================================== */

const KEY_POSTS = 'fcp.admin.posts.v1';
const KEY_SESSION = 'fcp.admin.session.v1';
const KEY_PASS = 'fcp.admin.pass.v1';

/* Hasło startowe. Administrator powinien je zmienić w panelu przy pierwszym
   logowaniu — po zmianie liczy się wyłącznie hash zapisany w przeglądarce. */
export const DEFAULT_PASSWORD = 'polonia1986';

const SESSION_HOURS = 12;

/* --------------------------------------------------------------- POMOCNICZE */

async function sha256(text) {
  const buf = new TextEncoder().encode(String(text));
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const read = (k, fb) => {
  try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? fb : v; }
  catch { return fb; }
};
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

/* ----------------------------------------------------------------- SESJA */

export async function login(password) {
  const stored = read(KEY_PASS, null);
  const expected = stored || await sha256(DEFAULT_PASSWORD);
  const given = await sha256(password);
  if (given !== expected) return { ok: false, error: 'Nieprawidłowe hasło.' };
  write(KEY_SESSION, { until: Date.now() + SESSION_HOURS * 3600e3 });
  return { ok: true, usingDefault: !stored };
}

export function logout() { try { localStorage.removeItem(KEY_SESSION); } catch {} }

export function isLoggedIn() {
  const s = read(KEY_SESSION, null);
  if (!s || !s.until || Date.now() > s.until) { logout(); return false; }
  return true;
}

export async function changePassword(current, next) {
  const check = await login(current);
  if (!check.ok) return { ok: false, error: 'Obecne hasło jest nieprawidłowe.' };
  if (!next || String(next).length < 8) return { ok: false, error: 'Nowe hasło musi mieć co najmniej 8 znaków.' };
  write(KEY_PASS, await sha256(next));
  return { ok: true };
}

/** Czy wciąż działa hasło fabryczne — panel o tym przypomina. */
export const usingDefaultPassword = () => read(KEY_PASS, null) === null;

/* ------------------------------------------------------------------ WPISY */

const slugify = (s = '') => String(s)
  .toLowerCase()
  .replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l')
  .replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

export const getPosts = () => read(KEY_POSTS, []);

/** Zapisuje wpis. body przyjmuje zwykły tekst — puste linie dzielą akapity. */
export function savePost(draft) {
  if (!isLoggedIn()) return { ok: false, error: 'Sesja wygasła — zaloguj się ponownie.' };
  const title = String(draft.title || '').trim();
  if (!title) return { ok: false, error: 'Tytuł jest wymagany.' };
  const lead = String(draft.lead || '').trim();
  if (!lead) return { ok: false, error: 'Lead jest wymagany.' };

  const body = String(draft.body || '')
    .split(/\n\s*\n/).map((p) => p.trim().replace(/\s*\n\s*/g, ' ')).filter(Boolean);
  if (!body.length) return { ok: false, error: 'Treść jest wymagana.' };

  const posts = getPosts();
  const slug = draft.slug || slugify(title) || 'wpis-' + Date.now();
  const date = draft.date || new Date().toISOString().slice(0, 10);
  const post = {
    slug, title, lead, body, date,
    category: draft.category || 'AKTUALNOŚCI',
    photoId: draft.photoId || 'news-' + slug,
    photoCaption: draft.photoCaption || 'Zdjęcie do uzupełnienia.',
    related: [],
    _admin: true,
  };
  const i = posts.findIndex((p) => p.slug === slug);
  if (i >= 0) posts[i] = post; else posts.unshift(post);
  write(KEY_POSTS, posts);
  return { ok: true, post, edited: i >= 0 };
}

export function deletePost(slug) {
  if (!isLoggedIn()) return { ok: false, error: 'Sesja wygasła.' };
  write(KEY_POSTS, getPosts().filter((p) => p.slug !== slug));
  return { ok: true };
}

/** Łączy wpisy administratora z wpisami z content.js (najnowsze u góry). */
export function mergeNews(baseNews = []) {
  const admin = getPosts();
  const slugs = new Set(admin.map((p) => p.slug));
  return [...admin, ...baseNews.filter((n) => !slugs.has(n.slug))]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

/* -------------------------------------------------------------- SPONSORZY */
/* Logo NIE jest tu przechowywane. Każdy sponsor dostaje własne pole
   <image-slot id="sponsor-…">, które działa tak samo jak zdjęcia w reszcie
   strony: przeciągasz plik, obraz zapisuje się w składnicy obrazów projektu
   i widzą go wszyscy. Dzięki temu nie duplikujemy drugiego systemu zdjęć. */

const KEY_SPONSORS = 'fcp.admin.sponsors.v1';

export const getSponsors = () => read(KEY_SPONSORS, []);

export function saveSponsor(draft) {
  if (!isLoggedIn()) return { ok: false, error: 'Sesja wygasła — zaloguj się ponownie.' };
  const name = String(draft.name || '').trim();
  if (!name) return { ok: false, error: 'Nazwa partnera jest wymagana.' };
  const list = getSponsors();
  const id = draft.id || slugify(name) || 'partner-' + Date.now();
  const entry = {
    id, name,
    tier: draft.tier || 'SPONSORZY',
    url: String(draft.url || '').trim(),
    logoSlotId: 'sponsor-' + id,
  };
  const i = list.findIndex((x) => x.id === id);
  if (i >= 0) list[i] = entry; else list.push(entry);
  write(KEY_SPONSORS, list);
  return { ok: true, sponsor: entry, edited: i >= 0 };
}

export function deleteSponsor(id) {
  if (!isLoggedIn()) return { ok: false, error: 'Sesja wygasła.' };
  write(KEY_SPONSORS, getSponsors().filter((x) => x.id !== id));
  return { ok: true };
}

/** Łączy partnerów z content.js z tymi dodanymi w panelu. */
export function mergeSponsors(base = []) {
  const admin = getSponsors();
  const ids = new Set(admin.map((x) => x.id));
  return [...base.filter((x) => !ids.has(slugify(x.name || ''))), ...admin];
}

/** Eksport do wklejenia w content.js — wpisy przestają wtedy zależeć od
 *  przeglądarki i widzą je wszyscy odwiedzający. */
export function exportPostsAsCode() {
  const posts = getPosts();
  if (!posts.length) return '// Brak wpisów do eksportu.';
  const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return posts.map((p) => `  {
    slug: '${esc(p.slug)}',
    category: '${esc(p.category)}',
    date: '${esc(p.date)}',
    title: '${esc(p.title)}',
    lead: '${esc(p.lead)}',
    photoId: '${esc(p.photoId)}',
    photoCaption: '${esc(p.photoCaption)}',
    body: [
${p.body.map((b) => `      '${esc(b)}',`).join('\n')}
    ],
    related: [],
  },`).join('\n');
}
