/**
 * FC POLONIA BRUKSELA — SERVER-SIDE DATA FETCHER
 * Cloudflare Worker (darmowy plan, bez builda, jeden plik).
 *
 * Po co: przeglądarka nie może czytać voetbalvlaanderen.be / rbfa.be / ffa.be /
 * foot24.be, bo te serwisy nie wysyłają nagłówków CORS. Ten worker robi to po
 * stronie serwera, dokłada CORS i cache'uje odpowiedź na brzegu sieci — więc
 * strona klubu nigdy nie odpytuje źródła przy każdym wejściu użytkownika.
 *
 * ─── TRASY ───────────────────────────────────────────────────────────────────
 *  GET /                       → info o wersji i trasach
 *  GET /fetch?url=<encoded>    → proxy z allow-listą domen (HTML, .ics, JSON)
 *  GET /fixtures?club=6360     → terminarz jako JSON w formacie Fixture[]
 *  GET /table?club=6360        → klasyfikacja jako JSON w formacie TableRow[]
 *
 * ─── WAŻNE, UCZCIWIE ─────────────────────────────────────────────────────────
 *  RBFA / Voetbal Vlaanderen NIE publikuje udokumentowanego, publicznego API.
 *  Worker nie udaje, że taki endpoint zna: przy /fixtures i /table po kolei
 *  PRÓBUJE listy realnych kandydatów (API_CANDIDATES) i zwraca pierwszy, który
 *  odpowie poprawnym JSON-em. Gdy żaden nie odpowie, oddaje
 *  { ok:false, tried:[…] } — bez wymyślonych danych. Wtedy używasz trasy
 *  /fetch z adresem .ics z profilu klubu (Foot24 albo eksport kalendarza
 *  z Voetbal Vlaanderen) — parser .ics jest już w live-data.js.
 *
 * ─── WDROŻENIE ───────────────────────────────────────────────────────────────
 *  1. dash.cloudflare.com → Workers & Pages → Create → Worker
 *  2. wklej ten plik, Deploy
 *  3. w PANELU DANYCH na podstronie MECZE wpisz:
 *       PROXY:    https://<nazwa>.<konto>.workers.dev/fetch?url={url}
 *       TABELA:   https://<nazwa>.<konto>.workers.dev/table?club=6360
 *     (terminarz: albo /fixtures?club=6360 w polu JSON, albo adres .ics)
 *
 *  Wariant Vercel: zapisz jako api/polonia.js i wyeksportuj
 *  `export default (req, res) => handle(new Request(...))` — logika bez zmian.
 */

const CLUB_ID = '6360';                 // FC Polonia, matricule 09647
const MATRICULE = '09647';
const CACHE_SECONDS = 1800;             // 30 min na brzegu sieci

const ALLOWED_HOSTS = [
  'datalake-prod2018.rbfa.be',
  'voetbalvlaanderen.be', 'www.voetbalvlaanderen.be',
  'rbfa.be', 'www.rbfa.be', 'prod-api.rbfa.be', 'api.rbfa.be',
  'ffa.be', 'www.ffa.be', 'acff.be', 'www.acff.be',
  'foot24.be', 'www.foot24.be',
  'walfoot.be', 'www.walfoot.be',
  'rsssf.org', 'www.rsssf.org',
];

/** Kandydaci na wewnętrzne API RBFA/VV. Sprawdzane po kolei, w czasie żądania.
 *  Nic tu nie jest zmyśloną „prawdą" — to lista prób. Dopisuj własne, gdy
 *  podejrzysz zakładkę Network na voetbalvlaanderen.be/club/6360. */
const API_CANDIDATES = {
  fixtures: (club) => [
    `https://prod-api.rbfa.be/api/vv/clubs/${club}/upcomingmatches`,
    `https://prod-api.rbfa.be/api/v1/clubs/${club}/upcomingmatches`,
    `https://prod-api.rbfa.be/api/vv/clubs/${club}/matches`,
    `https://www.voetbalvlaanderen.be/api/clubs/${club}/upcomingmatches`,
    `https://www.rbfa.be/api/clubs/${club}/matches`,
  ],
  table: (club) => [
    `https://prod-api.rbfa.be/api/vv/clubs/${club}/ranking`,
    `https://prod-api.rbfa.be/api/v1/clubs/${club}/ranking`,
    `https://www.voetbalvlaanderen.be/api/clubs/${club}/ranking`,
  ],
};

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,OPTIONS',
  'access-control-allow-headers': 'content-type',
};

const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': `public, max-age=${CACHE_SECONDS}`, ...CORS },
});

const UA = 'Mozilla/5.0 (compatible; FCPoloniaBrukselaBot/1.0; +https://polonia.aktualnosci.be)';

async function get(url, accept = 'application/json, text/calendar, text/html;q=0.8') {
  const res = await fetch(url, {
    headers: {
      'user-agent': UA,
      accept,
      'accept-language': 'nl,fr,en;q=0.8',
      // wymagane przez Apollo Server RBFA — bez tego odpowiada błędem CSRF
      'x-apollo-operation-name': 'GetTeamCalendar',
      'apollo-require-preflight': 'true',
    },
    cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { text: await res.text(), type: res.headers.get('content-type') || '' };
}

/* ─────────────────────────────────────────────────── NORMALIZACJA WYNIKÓW */

const str = (v) => (v == null ? '' : String(v)).trim();
const int = (v) => { const n = parseInt(str(v).replace(/[^\d-]/g, ''), 10); return Number.isFinite(n) ? n : null; };

/** Wyłuskuje mecze z dowolnego drzewa JSON — szuka obiektów, które mają datę
 *  i dwie nazwy drużyn, niezależnie od nazw pól w danym API. */
function harvestFixtures(node, out = [], depth = 0) {
  if (!node || depth > 8) return out;
  if (Array.isArray(node)) { node.forEach((n) => harvestFixtures(n, out, depth + 1)); return out; }
  if (typeof node !== 'object') return out;

  const pick = (...keys) => { for (const k of keys) if (node[k] != null) return node[k]; return null; };
  const teamName = (v) => (v && typeof v === 'object') ? str(v.name || v.clubName || v.teamName || v.longName || v.shortName) : str(v);

  const date = pick('date', 'dateTime', 'kickOff', 'kickoff', 'startDate', 'matchDate', 'plannedDate');
  const home = teamName(pick('homeTeam', 'home', 'homeClub', 'localTeam'));
  const away = teamName(pick('awayTeam', 'away', 'awayClub', 'visitorTeam'));

  if (date && home && away) {
    const d = new Date(date);
    if (!Number.isNaN(d.getTime())) {
      out.push({
        id: str(pick('id', 'matchId', 'uuid')) || undefined,
        kickoff: d.toISOString(),
        home, away,
        venue: str(pick('venue', 'location', 'field', 'ground', 'stadium')),
        competition: str(pick('competition', 'series', 'seriesName', 'competitionName', 'division')),
        round: int(pick('matchDay', 'round', 'week', 'speeldag', 'journee')) || '',
        scoreHome: int(pick('homeScore', 'goalsHome', 'scoreHome')),
        scoreAway: int(pick('awayScore', 'goalsAway', 'scoreAway')),
        status: str(pick('status', 'matchStatus')) || undefined,
      });
    }
  }
  Object.values(node).forEach((v) => { if (v && typeof v === 'object') harvestFixtures(v, out, depth + 1); });
  return out;
}

/** Analogicznie dla klasyfikacji: obiekt z nazwą drużyny, liczbą meczów i punktami. */
function harvestTable(node, out = [], depth = 0) {
  if (!node || depth > 8) return out;
  if (Array.isArray(node)) { node.forEach((n) => harvestTable(n, out, depth + 1)); return out; }
  if (typeof node !== 'object') return out;

  const pick = (...keys) => { for (const k of keys) if (node[k] != null) return node[k]; return null; };
  const teamRaw = pick('team', 'club', 'teamName', 'clubName', 'name');
  const team = (teamRaw && typeof teamRaw === 'object') ? str(teamRaw.name || teamRaw.clubName) : str(teamRaw);
  const played = int(pick('played', 'matchesPlayed', 'games', 'gamesPlayed', 'gespeeld'));
  const points = int(pick('points', 'pts', 'punten'));

  if (team && played != null && points != null) {
    out.push({
      pos: int(pick('position', 'rank', 'pos', 'plaats')),
      team, played, points,
      won: int(pick('won', 'wins', 'gewonnen')) ?? 0,
      drawn: int(pick('drawn', 'draws', 'gelijk')) ?? 0,
      lost: int(pick('lost', 'losses', 'verloren')) ?? 0,
      gf: int(pick('goalsFor', 'goalsScored', 'doelpuntenVoor')) ?? 0,
      ga: int(pick('goalsAgainst', 'goalsConceded', 'doelpuntenTegen')) ?? 0,
      matricule: str(pick('matricule', 'registrationNumber')) || undefined,
    });
  }
  Object.values(node).forEach((v) => { if (v && typeof v === 'object') harvestTable(v, out, depth + 1); });
  return out;
}

const dedupe = (rows, key) => {
  const seen = new Set();
  return rows.filter((r) => { const k = key(r); if (seen.has(k)) return false; seen.add(k); return true; });
};

/* ─────────────────────────────────────────────────────────── PRÓBY ŹRÓDEŁ */

async function tryCandidates(urls, harvest, minRows) {
  const tried = [];
  for (const url of urls) {
    try {
      const { text } = await get(url);
      const data = JSON.parse(text);
      const rows = harvest(data);
      if (rows.length >= minRows) return { ok: true, source: url, rows };
      tried.push({ url, problem: `rozpoznano ${rows.length} wierszy` });
    } catch (e) {
      tried.push({ url, problem: e.message });
    }
  }
  return { ok: false, tried };
}

/* ──────────────────────────────────────────────────────────────── HANDLER */

async function handle(request) {
  const url = new URL(request.url);
  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

  /* --- info --- */
  if (url.pathname === '/' || url.pathname === '') {
    return json({
      service: 'FC Polonia Bruksela — server-side data fetcher',
      club: { id: CLUB_ID, matricule: MATRICULE, name: 'FC Polonia Bruksela' },
      routes: {
        '/fetch?url=<encoded>': 'proxy CORS z allow-listą domen (HTML / .ics / JSON)',
        '/fixtures?club=6360': 'terminarz jako Fixture[]',
        '/table?club=6360': 'klasyfikacja jako TableRow[]',
      },
      allowedHosts: ALLOWED_HOSTS,
      cacheSeconds: CACHE_SECONDS,
    });
  }

  /* --- proxy --- */
  if (url.pathname === '/fetch') {
    const target = url.searchParams.get('url');
    if (!target) return json({ ok: false, error: 'Brak parametru url' }, 400);
    let t;
    try { t = new URL(target); } catch { return json({ ok: false, error: 'Nieprawidłowy URL' }, 400); }
    if (!ALLOWED_HOSTS.includes(t.hostname)) {
      return json({ ok: false, error: 'Domena poza allow-listą', host: t.hostname, allowed: ALLOWED_HOSTS }, 403);
    }
    try {
      const { text, type } = await get(t.toString(), '*/*');
      return new Response(text, {
        headers: {
          'content-type': type.includes('calendar') ? 'text/calendar; charset=utf-8'
            : type.includes('json') ? 'application/json; charset=utf-8'
            : 'text/plain; charset=utf-8',
          'cache-control': `public, max-age=${CACHE_SECONDS}`,
          ...CORS,
        },
      });
    } catch (e) {
      return json({ ok: false, error: e.message, url: t.toString() }, 502);
    }
  }

  /* --- terminarz --- */
  if (url.pathname === '/fixtures') {
    const club = url.searchParams.get('club') || CLUB_ID;
    const r = await tryCandidates(API_CANDIDATES.fixtures(club), harvestFixtures, 1);
    if (!r.ok) {
      return json({
        ok: false,
        fixtures: [],
        message: 'Żaden kandydat API nie zwrócił poprawnych danych. Użyj trasy /fetch z adresem .ics albo dopisz właściwy endpoint do API_CANDIDATES.',
        tried: r.tried,
      }, 200);
    }
    const fixtures = dedupe(r.rows, (f) => f.kickoff + f.home + f.away)
      .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));
    return json({ ok: true, club, source: r.source, count: fixtures.length, fetchedAt: new Date().toISOString(), fixtures });
  }

  /* --- klasyfikacja --- */
  if (url.pathname === '/table') {
    const club = url.searchParams.get('club') || CLUB_ID;
    const r = await tryCandidates(API_CANDIDATES.table(club), harvestTable, 6);
    if (!r.ok) {
      return json({
        ok: false,
        table: [],
        message: 'Żaden kandydat API nie zwrócił klasyfikacji. Sprawdź zakładkę Network na voetbalvlaanderen.be/club/6360 i dopisz endpoint do API_CANDIDATES.',
        tried: r.tried,
      }, 200);
    }
    const table = dedupe(r.rows, (x) => x.team)
      .sort((a, b) => (a.pos ?? 99) - (b.pos ?? 99) || b.points - a.points)
      .map((x, i) => ({ ...x, pos: x.pos ?? i + 1 }));
    return json({ ok: true, club, source: r.source, count: table.length, fetchedAt: new Date().toISOString(), table });
  }

  return json({ ok: false, error: 'Nieznana trasa' }, 404);
}

export default { fetch: handle };
