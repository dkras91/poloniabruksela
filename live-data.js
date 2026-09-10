/* ============================================================================
   FC POLONIA BRUKSELA — LIVE DATA LAYER
   ----------------------------------------------------------------------------
   Ten plik obsługuje WYŁĄCZNIE dane zmienne (tabela, terminarz, wyniki).
   Treści redakcyjne (historia, newsy, kadra, sponsorzy) są w content.js.

   Architektura:
     EXTERNAL SOURCE -> FETCHER -> NORMALIZATION -> VALIDATION -> CACHE
                     -> WEBSITE API (getState/sync) -> FRONTEND

   Frontend nigdy nie wie, skąd pochodzą dane. Zawsze pyta getState().
   ========================================================================== */

/* ---------------------------------------------------------------- TOŻSAMOŚĆ */

export const CLUB = {
  displayName: 'FC Polonia Bruksela',
  shortName: 'Polonia',
  matricule: '09647',
  rbfaClubId: '6360',
  rbfaTeamId: '375016',   // pierwsza drużyna — identyfikacja pewniejsza niż nazwa
  founded: 1986,
  // Wszystkie warianty nazwy występujące w źródłach federacji i agregatorów.
  // Rozpoznanie wiersza Polonii w tabeli odbywa się PO NAZWIE + MATRICULE,
  // nigdy po numerze pozycji.
  nameVariants: [
    'fc polonia bruksela',
    'fc polonia bruxelles',
    'fc polonia brussel',
    'polonia bruxelles',
    'polonia bruksela',
    'fc polonia limelette',
    'polonia limelette',
    'fc polonia boitsfort',
    'polonia boitsfort',
    'fc polonia',
  ],
};

/* ------------------------------------------------------------------ ŹRÓDŁA */
/* Kolejność = hierarchia wiarygodności z briefu:
   1. FFA / RBFA (oficjalna federacja)  2. Foot24  3. cache  4. ręcznie      */

export const SOURCES = [
  {
    id: 'ffa',
    priority: 1,
    label: 'FFA / RBFA (federacja)',
    kind: 'html',
    club: 'https://www.rbfa.be/fr/club/6360/infos',
    note:
      'Oficjalne źródło. Klasyfikacja i terminarz publikowane są na stronach ' +
      'rozgrywek RBFA/FFA jako HTML renderowany po stronie klienta — wymaga ' +
      'server-side fetchera (endpoint w configu: tableUrl / fixturesUrl).',
  },
  {
    id: 'foot24',
    priority: 2,
    label: 'Foot24.be',
    kind: 'ical',
    club: 'https://www.foot24.be/fr/clubs/fc-polonia-limelette',
    note:
      'Foot24 prowadzi profil klubu pod historycznym URL "fc-polonia-limelette", ' +
      'ale identyfikuje go jako FC POLONIA BRUXELLES. Serwis udostępnia ' +
      'automatyczną synchronizację kalendarza (iCal/.ics) — to preferowany ' +
      'mechanizm importu terminarza (bez parsowania HTML).',
  },
];

/* ------------------------------------------------------------- KONFIGURACJA */
/* Wypełniane przez administratora w panelu na podstronie MECZE.
   Przeglądarka nie może czytać ffa.be / foot24.be bezpośrednio (CORS),
   dlatego zawsze potrzebny jest albo endpoint serwerowy (proxy), albo
   bezpośredni URL do pliku .ics/.json udostępnionego z nagłówkiem CORS.   */

const CFG_KEY = 'fcp.livedata.config.v1';
const CACHE_KEY = 'fcp.livedata.cache.v1';
const OVR_KEY = 'fcp.livedata.overrides.v1';

export const DEFAULT_CONFIG = {
  proxy: '',        // np. https://twoj-serwer/api/fetch?url={url}
  icalUrl: '',      // .ics terminarza (Foot24 lub federacja)
  // Tabela ligowa — nasz importer RBFA (netlify/functions/rbfa-standings.js).
  tableUrl: '/.netlify/functions/rbfa-standings',
  // Domyślnie: nasz importer RBFA (netlify/functions/rbfa-calendar.js).
  // Po wdrożeniu na Netlify działa bez żadnej konfiguracji.
  fixturesUrl: '/.netlify/functions/rbfa-calendar',
  ttlMinutes: 45,   // nie odpytuj źródeł częściej niż co N minut
  season: '2026/2027',
};

const read = (k, fb) => {
  try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v || fb; }
  catch { return fb; }
};
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export const getConfig = () => ({ ...DEFAULT_CONFIG, ...read(CFG_KEY, {}) });
export const setConfig = (patch) => { write(CFG_KEY, { ...getConfig(), ...patch }); return getConfig(); };

/* --------------------------------------------------------- MANUAL OVERRIDE */
/* Administrator koryguje pojedyncze pola bez dotykania parsera.            */

export const getOverrides = () => read(OVR_KEY, {
  venue: {},            // { "<fixtureId>": "Pôle Sportif de Limelette" }
  teamDisplayName: {},   // { "<slug rywala>": "Poprawna nazwa" }
  teamLogo: {},          // { "<slug rywala>": "https://…/herb.png" }
  matchNote: {},         // { "<fixtureId>": "Mecz przełożony" }
});
export const setOverrides = (patch) => { write(OVR_KEY, { ...getOverrides(), ...patch }); return getOverrides(); };

/* ------------------------------------------------------------ NORMALIZACJA */

export const slug = (s = '') => String(s)
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

export const isPolonia = (name = '', matricule = '', teamId = '') => {
  if (teamId && String(teamId) === CLUB.rbfaTeamId) return true;
  if (matricule && String(matricule).replace(/\D/g, '').padStart(5, '0') === CLUB.matricule) return true;
  const s = slug(name);
  return CLUB.nameVariants.some((v) => s === slug(v) || (s.includes('polonia') && (
    s.includes('bruksela') || s.includes('bruxelles') || s.includes('brussel') ||
    s.includes('limelette') || s.includes('boitsfort'))));
};

/** Nazwa wyświetlana: Polonia zawsze jako "FC Polonia Bruksela".
 *  Nazwy rywali pozostają w oryginale z federacji (dozwolony override). */
export const displayTeam = (name) => {
  if (isPolonia(name)) return CLUB.displayName;
  const o = getOverrides().teamDisplayName[slug(name)];
  return o || name;
};

/** Adres stadionu domowego — jedno miejsce dla całej strony. */
export const HOME_VENUE = 'Chem. du Struykbeken 2, 1200 Woluwé-Saint-Lambert';

/* ------------------------------------------------------- HERBY RYWALI --- */
/* Pliki herbów przekazane przez klub, leżące w assets/crests/.
   Każdy zapisany jako PNG z przezroczystym tłem (bez białego prostokąta).
   Klucz = slug nazwy z federacji. Dopisuj kolejne pary po wrzuceniu pliku.
   Kolejność źródeł herbu: override administratora → ten plik → herb z API. */

export const OPPONENT_CRESTS = {
  'ol anderlecht': 'assets/crests/ol-anderlecht.png',
  'olympique club forestois b': 'assets/crests/olympique-club-forestois.png',
  'fc anderlecht sport milan a': 'assets/crests/anderlecht-sport-milan.png',
  'black star noh fc b': 'assets/crests/black-star-noh.png',
  // UWAGA: plik źródłowy był kadrem z bannera — tarcza jest ucięta u góry i u
  // dołu. Do podmiany, gdy klub udostępni pełny herb.
  'racing anderlecht': 'assets/crests/racing-anderlecht.png',
  'olympic wolves brussels': 'assets/crests/olympic-wolves-brussels.png',
  'f e f anderlecht': 'assets/crests/fef-anderlecht.png',
};

/* ----------------------------------------------------- OBIEKTY RYWALI --- */
/* Adresy boisk gospodarzy ze szczegółów meczów na rbfa.be (/nl/wedstrijd/<id>),
   odczyt 09.09.2026. Importer terminarza RBFA NIE podaje obiektu — pole wraca
   puste i strona pokazywała „Obiekt do potwierdzenia". Dlatego adres bierzemy
   stąd, po nazwie gospodarza, niezależnie od tego, skąd przyszedł terminarz.
   Klucz = slug nazwy z federacji. Dopisuj kolejne przy zmianie rywali. */

export const OPPONENT_VENUES = {
  'ol anderlecht': "Stade J. Rousseau / Terrein 1, Avenue d'Itterbeek 580, 1070 Anderlecht",
  'fc anderlecht sport milan a': 'St.-Niklaasinstituut / Terrein 1, Bergensesteenweg 1421, 1070 Anderlecht',
  'rofc stockel b': 'Club House / Terrein 1, Chaussée de Stockel 376, 1150 Woluwe-Saint-Pierre',
  'bx brussels b': 'La Roue / Terrein 1, Rue Pierre Schlosser 31, 1070 Anderlecht',
  'olympic wolves brussels': 'St.-Niklaasinstituut / Terrein 1, Bergensesteenweg 1421, 1070 Anderlecht',
  'fc m uccle b': 'C.Sp. A. Deridder / Terrein 1, Rue des Griottes 26, 1180 Uccle',
  'olympique club forestois b': "C.Sp. Bempt / Terrein 4, Bld. 2ème Armée Britannique 600, 1190 Forest",
  'black star noh fc b': 'Croix De Guerre / Terrein 1, Av. des Croix de Guerre 3, 1120 Neder-Over-Heembeek',
  'ru auderghem b': 'St. Communal Auderghem / Terrein 2, Chaussée de Wavre 1854, 1160 Auderghem',
  'rrc boitsfort b': 'Stade Trois Tilleuls / Terrein 2, Avenue des Nymphes 1a, 1170 Watermael-Boitsfort',
  'racing anderlecht': "Vogelenzang / Terrein 1, Rue du Chant d'Oiseaux 130, 1070 Anderlecht",
  'f e f anderlecht': "Vogelenzang / Terrein 2, Rue du Chant d'Oiseaux 130, 1070 Anderlecht",
};

/** Obiekt meczu: nasz stadion u siebie, boisko gospodarza na wyjeździe. */
export const venueFor = (home, away) =>
  (isPolonia(home) ? 'Stade Fallon, ' + HOME_VENUE : (OPPONENT_VENUES[slug(home)] || ''));

export const teamLogo = (name, url) => {
  if (isPolonia(name)) return 'assets/crest.png';
  const key = slug(name);
  const ovr = getOverrides().teamLogo[key];
  if (ovr) return ovr;
  if (OPPONENT_CRESTS[key]) return OPPONENT_CRESTS[key];
  return url || null;
};

export const initials = (name = '') => slug(name).split(' ')
  .filter((w) => w.length > 1 && !['fc', 'rc', 'as', 'us', 'sc', 'kv', 'rf'].includes(w))
  .slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '?';

/* ------------------------------------------------------- MODEL WEWNĘTRZNY */
/*  Fixture   { id, kickoff(ISO), home, away, venue, competition, round,
 *              status: 'scheduled'|'played'|'postponed', score:{h,a}|null,
 *              isHome, note }
 *  TableRow  { pos, team, played, won, drawn, lost, gf, ga, gd, points,
 *              isPolonia }
 *  Snapshot  { fetchedAt, sourceId, sourceLabel, season, competition,
 *              table[], fixtures[] }                                       */

const num = (v) => { const n = parseInt(String(v).replace(/[^\d-]/g, ''), 10); return Number.isFinite(n) ? n : null; };

export function normalizeFixture(raw, i = 0) {
  const home = String(raw.home || '').trim();
  const away = String(raw.away || '').trim();
  if (!home || !away || !raw.kickoff) return null;
  const d = new Date(raw.kickoff);
  if (Number.isNaN(d.getTime())) return null;
  const id = raw.id || `${d.toISOString().slice(0, 10)}-${slug(home)}-${slug(away)}`;
  const ovr = getOverrides();
  const sh = num(raw.scoreHome), sa = num(raw.scoreAway);
  const played = sh !== null && sa !== null;
  return {
    id,
    kickoff: d.toISOString(),
    // Godzina podana przez federację BEZ strefy — zapisujemy dosłownie, żeby
    // przeglądarka nie przesunęła 20:00 na 22:00. Formattery wolą te pola.
    localDate: raw.localDate || null,
    localTime: raw.localTime || null,
    homeLogoUrl: raw.homeLogoUrl || null,
    awayLogoUrl: raw.awayLogoUrl || null,
    home, away,
    isHome: isPolonia(home, '', raw.homeTeamId),
    venue: ovr.venue[id] || raw.venue || venueFor(home, away),
    competition: raw.competition || '',
    round: raw.round || '',
    status: raw.status || (played ? 'played' : 'scheduled'),
    score: played ? { h: sh, a: sa } : null,
    note: ovr.matchNote[id] || raw.note || '',
  };
}

export function normalizeTable(rows = []) {
  const out = rows.map((r, i) => {
    const team = String(r.team || '').trim();
    if (!team) return null;
    const gf = num(r.gf), ga = num(r.ga);
    return {
      pos: num(r.pos) ?? i + 1,
      team,
      played: num(r.played) ?? 0,
      won: num(r.won) ?? 0,
      drawn: num(r.drawn) ?? 0,
      lost: num(r.lost) ?? 0,
      gf: gf ?? 0,
      ga: ga ?? 0,
      gd: num(r.gd) ?? ((gf ?? 0) - (ga ?? 0)),
      points: num(r.points) ?? 0,
      isPolonia: isPolonia(team, r.matricule),
    };
  }).filter(Boolean);
  out.sort((a, b) => a.pos - b.pos);
  return out;
}

/* ------------------------------------------------- ADAPTER RBFA / VV ------ */
/* Wejście: payload z netlify/functions/rbfa-calendar.js (pole `matches`).
   Wyjście: nasz wewnętrzny Fixture[]. Frontend nie wie, skąd dane pochodzą. */

export function fromRbfaPayload(payload) {
  const list = Array.isArray(payload?.matches) ? payload.matches : [];
  return list.map((m) => {
    const h = m.homeTeam || {}, a = m.awayTeam || {};
    // kickoff budujemy z części lokalnych, bez konwersji UTC
    let kickoff = m.startTime;
    if (m.date && m.time) {
      const [y, mo, d] = m.date.split('-').map(Number);
      const [hh, mi] = m.time.split(':').map(Number);
      const dt = new Date(y, (mo || 1) - 1, d || 1, hh || 0, mi || 0);
      if (!Number.isNaN(dt.getTime())) kickoff = dt.toISOString();
    }
    return normalizeFixture({
      id: m.id,
      kickoff,
      localDate: m.date || null,
      localTime: m.time || null,
      home: h.name, away: a.name,
      homeTeamId: h.id, awayTeamId: a.id,
      homeLogoUrl: h.logo || null, awayLogoUrl: a.logo || null,
      venue: m.venue || '',
      competition: m.competition?.name || '',
      round: m.round || '',
      scoreHome: m.result ? m.result.home : null,
      scoreAway: m.result ? m.result.away : null,
      status: m.status,
    });
  }).filter(Boolean);
}

/* ----------------------------------------------------- RBFA / VV GRAPHQL */
/* Ten sam kontrakt co netlify/functions/rbfa-calendar.js — używany, gdy
   własny endpoint nie jest wdrożony, a skonfigurowano proxy.
   Test na żywo 30.08.2026: RBFA odpowiada z CORS, ale odrzuca żądanie bez
   nagłówka x-apollo-operation-name — a ten nagłówek wymusza preflight,
   którego RBFA nie obsługuje. Dlatego z przeglądarki potrzebny jest proxy. */

export const RBFA = {
  endpoint: 'https://datalake-prod2018.rbfa.be/graphql',
  teamId: '375016',
  language: 'nl',
  calendarHash: '3f0441e6723b9852b4f0cff2c872f4aa674c5de2d23589efc70c7a4ffb7f6383',
};

export function rbfaCalendarUrl() {
  const p = new URLSearchParams({
    operationName: 'GetTeamCalendar',
    variables: JSON.stringify({ teamId: RBFA.teamId, language: RBFA.language }),
    extensions: JSON.stringify({ persistedQuery: { version: 1, sha256Hash: RBFA.calendarHash } }),
  });
  return `${RBFA.endpoint}?${p}`;
}

/** Surowa odpowiedź GraphQL → nasz Fixture[]. Mapowanie tolerancyjne, bo
 *  RBFA nie dokumentuje schematu. */
export function fromRbfaGraphql(json) {
  const s = (v) => (v == null ? '' : String(v)).trim();
  const t = (x) => ({
    id: x?.id != null ? String(x.id) : null,
    name: s(x?.name || x?.longName || x?.shortName || x?.clubName),
    logo: s(x?.logo || x?.logoUrl || x?.crest) || null,
  });

  // znajdź tablicę meczów gdziekolwiek w drzewie
  let raw = json?.data?.teamCalendar;
  if (!Array.isArray(raw)) {
    raw = raw?.matches || raw?.items || raw?.calendar;
    if (!Array.isArray(raw)) {
      const stack = [json?.data];
      raw = null;
      while (stack.length && !raw) {
        const node = stack.pop();
        if (!node || typeof node !== 'object') continue;
        if (Array.isArray(node)) {
          if (node.some((x) => x && typeof x === 'object' && (x.homeTeam || x.awayTeam))) { raw = node; break; }
          node.forEach((x) => stack.push(x));
        } else Object.values(node).forEach((v) => { if (v && typeof v === 'object') stack.push(v); });
      }
    }
  }
  if (!Array.isArray(raw)) return [];

  return raw.map((m) => {
    const h = t(m?.homeTeam), a = t(m?.awayTeam);
    const start = s(m?.startTime || m?.date || m?.kickOff);
    if (!h.name || !a.name || !start) return null;
    const [datePart, rest = ''] = start.split('T');
    const timePart = rest.slice(0, 5) || null;
    let kickoff = start;
    if (datePart) {
      const [y, mo, d] = datePart.split('-').map(Number);
      const [hh, mi] = (timePart || '15:00').split(':').map(Number);
      const dt = new Date(y, (mo || 1) - 1, d || 1, hh || 0, mi || 0);
      if (!Number.isNaN(dt.getTime())) kickoff = dt.toISOString();
    }
    const o = m?.outcome || {};
    return normalizeFixture({
      id: s(m?.id) || undefined,
      kickoff, localDate: datePart || null, localTime: timePart,
      home: h.name, away: a.name,
      homeTeamId: h.id, awayTeamId: a.id,
      homeLogoUrl: h.logo, awayLogoUrl: a.logo,
      venue: s(m?.venue?.name || m?.venue || m?.location),
      competition: s(m?.series?.name || m?.competition?.name),
      round: m?.matchDay ?? m?.round ?? '',
      scoreHome: o.homeTeamGoals ?? m?.homeScore ?? null,
      scoreAway: o.awayTeamGoals ?? m?.awayScore ?? null,
    });
  }).filter(Boolean);
}

/* ------------------------------------------------- TERMINARZ ZAPASOWY --- */
/* seed-fixtures.json — realny terminarz przekazany przez administrację klubu.
   Poziom 4 hierarchii źródeł: używany, gdy żadne źródło live nie odpowiada.
   Warstwa live nadpisuje go w całości. */

export async function loadSeedFixtures() {
  // moduł JS, a nie .json — statyczne pliki danych nie zawsze są serwowane
  const mod = await import('./seed-fixtures.js');
  const j = mod.SEED || mod.default || {};
  const list = (j.matches || []).map((m) => {
    const [y, mo, d] = String(m.date).split('-').map(Number);
    const [hh, mi] = String(m.time || '15:00').split(':').map(Number);
    const dt = new Date(y, (mo || 1) - 1, d || 1, hh || 0, mi || 0);
    if (Number.isNaN(dt.getTime())) return null;
    const isHome = isPolonia(m.home);
    return normalizeFixture({
      kickoff: dt.toISOString(),
      localDate: m.date, localTime: m.time || null,
      home: m.home, away: m.away,
      venue: m.venue || (isHome ? 'Stade Fallon, ' + HOME_VENUE : ''),
      competition: m.competition || j.competition || '',
      round: m.round || '',
      scoreHome: m.scoreHome ?? null, scoreAway: m.scoreAway ?? null,
    });
  }).filter(Boolean);
  return { fixtures: list.sort(sortByDate), meta: j };
}

/* ------------------------------------------------- TABELA ZAPASOWA ------ */
/* Klasyfikacja przepisana ręcznie z rbfa.be — poziom 4, tak samo jak
   seed-fixtures.js. Używana tylko wtedy, gdy importer nie odpowie. */

export async function loadSeedStandings() {
  const mod = await import('./seed-standings.js');
  const j = mod.SEED_TABLE || mod.default || {};
  return { table: normalizeTable(j.rows || []), meta: j };
}

/* --------------------------------------------- TABELA LICZONA Z MECZÓW --- */
/* Gdy federacja nie udostępnia klasyfikacji, wyliczamy ją z kompletu spotkań.
   Liczone są WYŁĄCZNIE mecze z wynikiem — przed pierwszą kolejką tabela ma
   więc zera, a nie wymyślone punkty. Zestaw drużyn bierzemy z terminarza. */

export function tableFromFixtures(fixtures = []) {
  const teams = new Map();
  const touch = (name) => {
    const k = slug(name);
    if (!teams.has(k)) teams.set(k, { team: name, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 });
    return teams.get(k);
  };

  for (const f of fixtures) {
    const h = touch(f.home), a = touch(f.away);
    if (!f.score || f.status !== 'played') continue;
    const gh = f.score.h, ga = f.score.a;
    h.played++; a.played++;
    h.gf += gh; h.ga += ga;
    a.gf += ga; a.ga += gh;
    if (gh > ga) { h.won++; h.points += 3; a.lost++; }
    else if (gh < ga) { a.won++; a.points += 3; h.lost++; }
    else { h.drawn++; a.drawn++; h.points++; a.points++; }
  }

  const rows = [...teams.values()]
    .map((r) => ({ ...r, gd: r.gf - r.ga }))
    // Kolejność: punkty → różnica bramek → bramki zdobyte. Przy pełnym remisie
    // wszystkich wskaźników (czyli przed pierwszą kolejką, gdy każdy ma zera)
    // kolejność jest umowna — stawiamy wtedy Polonię na czele, a resztę
    // alfabetycznie. Po pierwszych wynikach decydują już wyłącznie liczby.
    .sort((x, y) => y.points - x.points || y.gd - x.gd || y.gf - x.gf
      || (isPolonia(y.team) - isPolonia(x.team))
      || x.team.localeCompare(y.team, 'pl'))
    .map((r, i) => ({ ...r, pos: i + 1 }));

  return normalizeTable(rows);
}

/* ------------------------------------------------------------- WALIDACJA */

export function validateSnapshot(s) {
  const errors = [];
  if (!s || typeof s !== 'object') return { ok: false, errors: ['Brak danych'] };
  const table = Array.isArray(s.table) ? s.table : [];
  const fixtures = Array.isArray(s.fixtures) ? s.fixtures : [];
  if (!table.length && !fixtures.length) errors.push('Pusty zestaw danych');
  if (table.length && table.length < 6) errors.push('Tabela ma podejrzanie mało zespołów');
  if (table.length) {
    const bad = table.filter((r) => r.played === 0 && r.points > 0);
    if (bad.length) errors.push('Niespójne wiersze tabeli (punkty bez meczów)');
    if (!table.some((r) => r.isPolonia)) errors.push('Nie znaleziono FC Polonia w tabeli — sprawdź źródło/serię');
  }
  if (fixtures.length) {
    const noPolonia = fixtures.filter((f) => !isPolonia(f.home) && !isPolonia(f.away));
    if (noPolonia.length === fixtures.length) errors.push('Terminarz nie zawiera meczów Polonii');
  }
  return { ok: errors.length === 0, errors };
}

/* --------------------------------------------------------------- PARSER ICS */

export function parseICS(text = '') {
  // rozwiń złamane linie (RFC 5545 folding)
  const lines = String(text).replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '').split(/\r?\n/);
  const events = [];
  let cur = null;
  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) { cur = {}; continue; }
    if (line.startsWith('END:VEVENT')) { if (cur) events.push(cur); cur = null; continue; }
    if (!cur) continue;
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).split(';')[0].toUpperCase();
    const val = line.slice(i + 1).replace(/\\,/g, ',').replace(/\\n/g, '\n').replace(/\\;/g, ';');
    if (key === 'DTSTART') cur.dtstart = line.slice(i + 1);
    else if (key === 'SUMMARY') cur.summary = val;
    else if (key === 'LOCATION') cur.location = val;
    else if (key === 'DESCRIPTION') cur.description = val;
    else if (key === 'UID') cur.uid = val;
  }
  return events;
}

const icsDate = (v = '') => {
  const m = String(v).match(/(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?/);
  if (!m) return null;
  const [, y, mo, d, h = '00', mi = '00', s = '00', z] = m;
  const iso = `${y}-${mo}-${d}T${h}:${mi}:${s}${z ? 'Z' : ''}`;
  const dt = new Date(iso);
  return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
};

/** SUMMARY z Foot24/kalendarzy federacji: "Home - Away", "Home vs Away",
 *  "Home 2-1 Away", "P3C: Home - Away". */
export function icsEventToFixture(ev) {
  const kickoff = icsDate(ev.dtstart);
  if (!kickoff) return null;
  let s = String(ev.summary || '').trim();
  let competition = '';
  const comp = s.match(/^([^:]{2,24}):\s*(.+)$/);
  if (comp) { competition = comp[1].trim(); s = comp[2].trim(); }
  let scoreHome = null, scoreAway = null;
  const withScore = s.match(/^(.+?)\s+(\d{1,2})\s*[-:]\s*(\d{1,2})\s+(.+)$/);
  let home, away;
  if (withScore) {
    home = withScore[1]; scoreHome = withScore[2]; scoreAway = withScore[3]; away = withScore[4];
  } else {
    const split = s.split(/\s+(?:-|–|vs\.?|VS)\s+/);
    if (split.length < 2) return null;
    home = split[0]; away = split.slice(1).join(' - ');
  }
  const desc = String(ev.description || '');
  const round = (desc.match(/(?:journ[ée]e|speeldag|kolejka|matchday)\s*:?\s*(\d{1,2})/i) || [])[1] || '';
  return normalizeFixture({
    id: ev.uid || undefined,
    kickoff, home: home.trim(), away: away.trim(),
    venue: ev.location || '',
    competition, round, scoreHome, scoreAway,
  });
}

/* ------------------------------------------------------------ HTML PARSER */
/* Zapasowy parser klasyfikacji z HTML (kolejność kolumn jak w FFA/RBFA:
   poz | klub | M | Z | R | P | bramki | +/- | pkt). Uruchamiany tylko gdy
   endpoint zwraca HTML, a nie JSON. Zawsze przez validateSnapshot().      */

export function parseTableHTML(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const best = [...doc.querySelectorAll('table')]
    .map((t) => ({ t, n: t.querySelectorAll('tr').length }))
    .sort((a, b) => b.n - a.n)[0];
  if (!best || best.n < 6) return [];
  const rows = [];
  for (const tr of best.t.querySelectorAll('tr')) {
    const cells = [...tr.querySelectorAll('td')].map((td) => td.textContent.trim());
    if (cells.length < 7) continue;
    const team = cells.find((c) => /[a-zA-ZÀ-ž]{3}/.test(c));
    if (!team) continue;
    const nums = cells.map(num).filter((n) => n !== null);
    if (nums.length < 5) continue;
    const goals = cells.find((c) => /^\d{1,3}\s*[-:]\s*\d{1,3}$/.test(c));
    const [gf, ga] = goals ? goals.split(/[-:]/).map(num) : [null, null];
    rows.push({
      pos: nums[0], team,
      played: nums[1], won: nums[2], drawn: nums[3], lost: nums[4],
      gf, ga, points: nums[nums.length - 1],
    });
  }
  return normalizeTable(rows);
}

/* ----------------------------------------------------------------- FETCHER */

async function fetchText(url) {
  const { proxy } = getConfig();
  const targets = [];
  if (proxy) targets.push(proxy.includes('{url}') ? proxy.replace('{url}', encodeURIComponent(url)) : proxy + encodeURIComponent(url));
  targets.push(url); // bezpośrednio — działa tylko jeśli źródło wysyła CORS
  let lastErr;
  for (const t of targets) {
    try {
      const ctl = new AbortController();
      const to = setTimeout(() => ctl.abort(), 12000);
      const res = await fetch(t, { signal: ctl.signal, credentials: 'omit' });
      clearTimeout(to);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const txt = await res.text();
      if (txt && txt.length > 32) return txt;
      throw new Error('Pusta odpowiedź');
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('Brak odpowiedzi');
}

/* --------------------------------------------------------------- CACHE API */

/* ------------------------------------------------- MECZE UKRYTE --------- */
/* Spotkania, których właściciel nie chce na stronie. Filtrujemy przy ODCZYCIE
   (getCache), więc reguła działa też dla zestawów już zapisanych w pamięci
   przeglądarki — nie trzeba czekać, aż wygasną.

   7522858 / 2026-08-02 — Puchar BW-BXL z OTTIGNIES-LIMELETTE FC, przegrany
   walkowerem 0:5. Mecz pucharowy, nie ligowy; psuł też kafelek FORMA.

   UWAGA: to lista pojedynczych meczów, a NIE reguła „ukryj wszystkie puchary".
   Kolejne spotkania pucharowe pojawią się normalnie. */

export const HIDDEN_MATCHES = [
  '7522858',
  '2026-08-02',
];

const isHidden = (f) => !!f && HIDDEN_MATCHES.some((k) =>
  String(f.id) === k || f.localDate === k || String(f.kickoff).slice(0, 10) === k);

export const getCache = () => {
  const c = read(CACHE_KEY, null);
  if (!c || !Array.isArray(c.fixtures)) return c;
  // Snapshot w pamięci przeglądarki trzyma mecze JUŻ znormalizowane, więc
  // poprawki w normalizacji nie docierały do nikogo, kto ma świeży cache —
  // czekały, aż wygaśnie. Obiekt uzupełniamy przy odczycie: to jedyne pole
  // wyliczane u nas, a nie pochodzące ze źródła.
  return { ...c, fixtures: c.fixtures.filter((f) => !isHidden(f)).map((f) => (
    f && !f.venue ? { ...f, venue: venueFor(f.home, f.away) } : f
  )) };
};

function saveSnapshot(snap) {
  const v = validateSnapshot(snap);
  if (!v.ok) return { ok: false, errors: v.errors };
  write(CACHE_KEY, { ...snap, fetchedAt: new Date().toISOString() });
  return { ok: true, snapshot: getCache() };
}

/** Publiczne API dla frontendu — nigdy nie rzuca wyjątkiem. */
export function getState() {
  const c = getCache();
  const cfg = getConfig();
  if (!c) {
    return {
      status: 'empty', season: cfg.season, table: [], fixtures: [],
      fetchedAt: null, sourceId: null, sourceLabel: null, stale: false,
      configured: Boolean(cfg.icalUrl || cfg.tableUrl || cfg.fixturesUrl || cfg.proxy),
    };
  }
  const ageMin = (Date.now() - new Date(c.fetchedAt).getTime()) / 60000;
  return {
    status: 'ok', ...c,
    table: c.table || [], fixtures: c.fixtures || [],
    stale: ageMin > (cfg.ttlMinutes * 4),
    ageMinutes: Math.round(ageMin),
    configured: true,
  };
}

/** Synchronizacja. Nie odpytuje źródeł częściej niż ttlMinutes.
 *  Awaria źródła NIGDY nie usuwa poprzednich danych. */
export async function sync({ force = false } = {}) {
  const cfg = getConfig();
  const cached = getCache();
  if (!force && cached) {
    const ageMin = (Date.now() - new Date(cached.fetchedAt).getTime()) / 60000;
    // dane zapasowe/wyliczone nie blokują próby pobrania źródła live
    if (ageMin < cfg.ttlMinutes && cached.sourceId !== 'seed') {
      return { ok: true, skipped: true, state: getState() };
    }
  }
  const problems = [];
  let table = cached?.table || [];
  let fixtures = cached?.fixtures || [];
  let sourceId = cached?.sourceId || null;
  let sourceLabel = cached?.sourceLabel || null;
  let got = false;

  // 1. Tabela — endpoint serwerowy (preferowany JSON, fallback HTML)
  if (cfg.tableUrl) {
    try {
      const txt = await fetchText(cfg.tableUrl);
      let rows = [];
      try { const j = JSON.parse(txt); rows = normalizeTable(j.table || j.rows || j); }
      catch { rows = parseTableHTML(txt); }
      if (rows.length >= 6) { table = rows; sourceId = 'ffa'; sourceLabel = 'FFA / RBFA'; got = true; }
      else problems.push('Tabela: nie rozpoznano klasyfikacji');
    } catch (e) { problems.push('Tabela: ' + e.message); }
  }

  // 2. Terminarz — JSON (RBFA/VV albo własny format), w przeciwnym razie iCal
  if (cfg.fixturesUrl) {
    try {
      const j = JSON.parse(await fetchText(cfg.fixturesUrl));
      // payload naszego importera RBFA rozpoznajemy po polu `matches`
      const list = Array.isArray(j.matches)
        ? fromRbfaPayload(j)
        : (j.fixtures || j).map(normalizeFixture).filter(Boolean);
      if (list.length) {
        fixtures = list;
        sourceId = 'rbfa';
        sourceLabel = j.source || 'RBFA / Voetbal Vlaanderen';
        got = true;
      } else if (j.ok === false) {
        problems.push('RBFA: ' + (j.details || j.error || 'brak danych'));
      } else {
        problems.push('Terminarz: nie rozpoznano żadnego spotkania');
      }
    } catch (e) { problems.push('Terminarz: ' + e.message); }
  }
  if (!fixtures.length && cfg.proxy) {
    // Własny endpoint niedostępny (np. strona nie stoi jeszcze na Netlify),
    // ale jest proxy — pobieramy RBFA GraphQL przez nie.
    try {
      const json = JSON.parse(await fetchText(rbfaCalendarUrl()));
      if (json.errors) throw new Error(json.errors.map((e) => e.message).join(' · '));
      const list = fromRbfaGraphql(json);
      if (list.length) {
        fixtures = list;
        sourceId = 'rbfa';
        sourceLabel = 'RBFA / Voetbal Vlaanderen';
        got = true;
      } else problems.push('RBFA przez proxy: nie rozpoznano spotkań');
    } catch (e) { problems.push('RBFA przez proxy: ' + e.message); }
  }
  if (!fixtures.length && cfg.icalUrl) {
    try {
      const list = parseICS(await fetchText(cfg.icalUrl)).map(icsEventToFixture).filter(Boolean);
      if (list.length) { fixtures = list; sourceId = sourceId || 'foot24'; sourceLabel = sourceLabel || 'Foot24.be (iCal)'; got = true; }
      else problems.push('iCal: brak rozpoznanych spotkań');
    } catch (e) { problems.push('iCal: ' + e.message); }
  }

  // 4. Terminarz zapasowy — realne dane od administracji klubu
  let seedMeta = null;
  if (!fixtures.length) {
    try {
      const seed = await loadSeedFixtures();
      if (seed.fixtures.length) {
        fixtures = seed.fixtures;
        seedMeta = seed.meta;
        sourceId = 'seed';
        sourceLabel = seed.meta.source || 'Terminarz klubu (wpis administratora)';
        got = true;
      }
    } catch (e) { problems.push('Terminarz zapasowy: ' + e.message); }
  }

  // Tabela: gdy importer nie podał klasyfikacji, sięgamy po tabelę zapasową
  // przepisaną z rbfa.be. NIE wyliczamy jej z terminarza — terminarz zawiera
  // wyłącznie mecze Polonii, więc taka tabela pokazywałaby rywalom zera.
  let tableDerived = false;
  let tableMeta = null;
  if (!table.length) {
    try {
      const seedT = await loadSeedStandings();
      if (seedT.table.length >= 6) {
        table = seedT.table;
        tableMeta = seedT.meta;
        got = true;
      }
    } catch (e) { problems.push('Tabela zapasowa: ' + e.message); }
  }

  if (!got) return { ok: false, problems, state: getState() };
  // Mecze z HIDDEN_MATCHES odsiewamy raz, tuż przed zapisem migawki — dzięki
  // temu nie wracają ani z importera RBFA, ani z iCal, ani z terminarza
  // zapasowego. getCache() robi to samo dla migawek zapisanych wcześniej.
  fixtures = fixtures.filter((f) => !isHidden(f));
  const saved = saveSnapshot({
    table, fixtures, sourceId, sourceLabel,
    tableDerived,
    competition: seedMeta?.competition || tableMeta?.competition || cached?.competition || '',
    seedComplete: seedMeta ? seedMeta.complete !== false : undefined,
    season: seedMeta?.season || tableMeta?.season || cfg.season,
  });
  if (!saved.ok) return { ok: false, problems: problems.concat(saved.errors), state: getState() };
  return { ok: true, problems, state: getState() };
}

/* --------------------------------------------------- IMPORT RĘCZNY (admin) */

export function importICSText(text) {
  const list = parseICS(text).map(icsEventToFixture).filter(Boolean);
  if (!list.length) return { ok: false, errors: ['Nie rozpoznano żadnego spotkania w pliku .ics'] };
  const c = getCache();
  return saveSnapshot({
    table: c?.table || [], fixtures: list,
    sourceId: 'manual', sourceLabel: 'Import ręczny (.ics)', season: getConfig().season,
  });
}

export function importTableJSON(text) {
  let parsed;
  try { parsed = JSON.parse(text); } catch { return { ok: false, errors: ['Nieprawidłowy JSON'] }; }
  const rows = normalizeTable(parsed.table || parsed.rows || parsed);
  if (rows.length < 6) return { ok: false, errors: ['Zbyt mało wierszy klasyfikacji'] };
  const c = getCache();
  return saveSnapshot({
    table: rows, fixtures: c?.fixtures || [],
    sourceId: 'manual', sourceLabel: 'Import ręczny (tabela)', season: getConfig().season,
  });
}

/** Import z wklejonego tekstu (np. skopiowany terminarz z Voetbal Vlaanderen,
 *  RBFA, FFA lub Walfoot). Parser tolerancyjny: szuka daty, opcjonalnej
 *  godziny i dwóch nazw drużyn. Każdy rozpoznany mecz przechodzi walidację;
 *  linie nierozpoznane są pomijane i raportowane. */
export function importFreeText(text) {
  const lines = String(text).split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const out = [];
  const skipped = [];
  let year = new Date().getFullYear();
  let pendingDate = null;

  const MONTHS = {
    jan: 0, januari: 0, janvier: 0, stycznia: 0, sty: 0,
    feb: 1, februari: 1, fevrier: 1, 'février': 1, lutego: 1, lut: 1,
    mrt: 2, maart: 2, mars: 2, marca: 2, mar: 2,
    apr: 3, april: 3, avril: 3, kwietnia: 3, kwi: 3,
    mei: 4, mai: 4, maja: 4, may: 4,
    jun: 5, juni: 5, juin: 5, czerwca: 5, cze: 5,
    jul: 6, juli: 6, juillet: 6, lipca: 6, lip: 6,
    aug: 7, augustus: 7, aout: 7, 'août': 7, sierpnia: 7, sie: 7,
    sep: 8, september: 8, septembre: 8, 'września': 8, wrz: 8,
    okt: 9, oktober: 9, oct: 9, octobre: 9, 'października': 9, paz: 9,
    nov: 10, november: 10, novembre: 10, listopada: 10, lis: 10,
    dec: 11, december: 11, 'décembre': 11, decembre: 11, grudnia: 11, gru: 11,
  };

  const readDate = (l) => {
    // 05/09/2026, 05-09-2026, 5.9.2026
    let m = l.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/);
    if (m) {
      const y = m[3].length === 2 ? 2000 + +m[3] : +m[3];
      return { y, mo: +m[2] - 1, d: +m[1] };
    }
    // 5 september 2026 / 5 września / za 12 sep
    m = l.match(/(\d{1,2})\s+([A-Za-zÀ-ž]{3,12})\.?\s*(\d{4})?/);
    if (m) {
      const mo = MONTHS[m[2].toLowerCase()];
      if (mo != null) return { y: m[3] ? +m[3] : year, mo, d: +m[1] };
    }
    return null;
  };

  const readTime = (l) => {
    const m = l.match(/\b([01]?\d|2[0-3])[:.]([0-5]\d)\b/);
    return m ? { h: +m[1], mi: +m[2] } : null;
  };

  const readTeams = (l) => {
    // usuń datę, godzinę i typowe prefiksy przed szukaniem drużyn
    let s = l
      .replace(/(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/g, ' ')
      .replace(/\b([01]?\d|2[0-3])[:.]([0-5]\d)\b/g, ' ')
      .replace(/^\s*(za|ma|di|wo|do|vr|zo|lu|me|je|ve|sa|di|pon|wt|śr|czw|pt|sob|nd)[a-ząćęłńóśźż]*\.?\s+/i, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    // wynik w środku: "Home 2 - 1 Away"
    let m = s.match(/^(.{3,48}?)\s+(\d{1,2})\s*[-:]\s*(\d{1,2})\s+(.{3,48})$/);
    if (m) return { home: m[1], away: m[4], scoreHome: m[2], scoreAway: m[3] };
    m = s.split(/\s+(?:-|–|—|vs\.?|VS|tegen|contre)\s+/);
    if (m.length >= 2 && m[0].length >= 3 && m[1].length >= 3) {
      return { home: m[0].trim(), away: m.slice(1).join(' - ').trim() };
    }
    return null;
  };

  for (const line of lines) {
    const d = readDate(line);
    const teams = readTeams(line);
    if (d && !teams) { pendingDate = d; continue; }   // wiersz z samą datą — nagłówek dnia
    if (!teams) { skipped.push(line); continue; }
    const dd = d || pendingDate;
    if (!dd) { skipped.push(line); continue; }
    const t = readTime(line) || { h: 15, mi: 0 };
    const kickoff = new Date(dd.y, dd.mo, dd.d, t.h, t.mi);
    if (Number.isNaN(kickoff.getTime())) { skipped.push(line); continue; }
    const f = normalizeFixture({ ...teams, kickoff: kickoff.toISOString() });
    if (f) out.push(f); else skipped.push(line);
  }

  const mine = out.filter((f) => isPolonia(f.home) || isPolonia(f.away));
  if (!mine.length) {
    return {
      ok: false,
      errors: [out.length
        ? `Rozpoznano ${out.length} spotkań, ale żadne nie dotyczy FC Polonia — sprawdź, czy wklejony fragment pochodzi z profilu klubu.`
        : 'Nie rozpoznano żadnego spotkania. Wklej wiersze zawierające datę i dwie nazwy drużyn.'],
      skipped: skipped.slice(0, 6),
    };
  }
  const c = getCache();
  const saved = saveSnapshot({
    table: c?.table || [], fixtures: mine.sort(sortByDate),
    sourceId: 'manual', sourceLabel: 'Import ręczny (wklejony terminarz)', season: getConfig().season,
  });
  return { ...saved, imported: mine.length, skipped: skipped.length };
}

export function clearCache() { try { localStorage.removeItem(CACHE_KEY); } catch {} }

/* ----------------------------------------------------------- SELEKTORY API */

export const sortByDate = (a, b) => new Date(a.kickoff) - new Date(b.kickoff);

export const poloniaFixtures = (fixtures = []) =>
  fixtures.filter((f) => isPolonia(f.home) || isPolonia(f.away)).sort(sortByDate);

/** Pierwszy nierozegrany przyszły mecz. */
export function nextMatch(fixtures = []) {
  const now = Date.now();
  return poloniaFixtures(fixtures)
    .find((f) => f.status !== 'played' && new Date(f.kickoff).getTime() > now - 2 * 3600e3) || null;
}

/** Ostatni zakończony mecz. */
export function lastMatch(fixtures = []) {
  const played = poloniaFixtures(fixtures).filter((f) => f.status === 'played' && f.score);
  return played.length ? played[played.length - 1] : null;
}

export const poloniaRow = (table = []) => table.find((r) => r.isPolonia) || null;

/** Inteligentny wycinek tabeli: 2 nad + Polonia + 2 pod; TOP5 dla lidera,
 *  ostatnie 5 dla ostatniego miejsca. */
export function tableWindow(table = [], span = 2) {
  if (!table.length) return [];
  const i = table.findIndex((r) => r.isPolonia);
  if (i < 0) return table.slice(0, 5);
  // Pozycje ex aequo: o czubku tabeli decyduje numer miejsca, nie indeks
  // wiersza — przy czterech zespołach na miejscu 1. Polonia ma być w TOP5.
  if (i <= span || (table[i].pos || i + 1) <= span + 1) return table.slice(0, 5);
  if (i >= table.length - span - 1) return table.slice(-5);
  return table.slice(i - span, i + span + 1);
}

export const form = (fixtures = [], n = 5) => poloniaFixtures(fixtures)
  .filter((f) => f.status === 'played' && f.score).slice(-n)
  .map((f) => {
    const home = isPolonia(f.home);
    const us = home ? f.score.h : f.score.a;
    const them = home ? f.score.a : f.score.h;
    return us > them ? 'Z' : us === them ? 'R' : 'P';
  });

/* -------------------------------------------------------------- FORMATTERY */

const DNI = ['NIEDZIELA', 'PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA'];
const MIES = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

export const fmtDate = (iso) => { const d = new Date(iso); return `${d.getDate()} ${MIES[d.getMonth()]} ${d.getFullYear()}`; };
export const fmtShort = (iso) => { const d = new Date(iso); return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`; };
export const fmtDay = (iso) => DNI[new Date(iso).getDay()];
export const fmtTime = (iso) => { const d = new Date(iso); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
export const fmtStamp = (iso) => iso ? `${fmtShort(iso)}, ${fmtTime(iso)}` : '—';

/* Warianty preferujące godzinę podaną przez federację bez strefy — używane
   dla danych z RBFA, gdzie "2026-09-05T20:00:00" znaczy 20:00 w Belgii. */
export const fixtureDate = (f) => {
  if (f.localDate) { const [y, m, d] = f.localDate.split('-').map(Number); return `${d} ${MIES[m - 1]} ${y}`; }
  return fmtDate(f.kickoff);
};
export const fixtureShort = (f) => {
  if (f.localDate) { const [y, m, d] = f.localDate.split('-').map(Number); return `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`; }
  return fmtShort(f.kickoff);
};
export const fixtureTime = (f) => f.localTime || fmtTime(f.kickoff);
export const fixtureDay = (f) => {
  if (f.localDate) { const [y, m, d] = f.localDate.split('-').map(Number); return DNI[new Date(y, m - 1, d).getDay()]; }
  return fmtDay(f.kickoff);
};

/** Autostart: jedna próba synchronizacji po wejściu (respektuje TTL)
 *  + odświeżanie w tle co ttlMinutes, gdy karta pozostaje otwarta. */
export function startAutoSync(onChange) {
  const tick = async () => { const r = await sync(); onChange?.(getState(), r); };
  tick();
  const cfg = getConfig();
  const id = setInterval(tick, Math.max(15, cfg.ttlMinutes) * 60000);
  return () => clearInterval(id);
}
