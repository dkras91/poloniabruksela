/**
 * FC POLONIA BRUKSELA — IMPORTER TERMINARZA Z RBFA / VOETBAL VLAANDEREN
 * ---------------------------------------------------------------------------
 * Server-side. Frontend NIGDY nie odpytuje datalake-prod2018.rbfa.be
 * bezpośrednio — czyta wyłącznie tę funkcję.
 *
 *   RBFA GraphQL → ta funkcja → JSON → live-data.js → strona
 *
 * ── WDROŻENIE (Netlify) ────────────────────────────────────────────────────
 *   Plik: netlify/functions/rbfa-calendar.js
 *   URL:  /.netlify/functions/rbfa-calendar
 *   Nie wymaga zależności ani builda (Node 18+ ma globalny fetch).
 *
 * ── WDROŻENIE (Cloudflare Workers) ─────────────────────────────────────────
 *   Ten sam plik eksportuje na końcu `default { fetch }` — wklej go jako
 *   Worker i użyj adresu workers.dev jako fixturesUrl.
 *
 * ── ODKRYCIE, KTÓREGO NIE MA W DOKUMENTACJI ────────────────────────────────
 *   Apollo Server po stronie RBFA odrzuca żądania GET bez nagłówka
 *   zapobiegającego CSRF. Bez niego odpowiedź to:
 *     "This operation has been blocked as a potential Cross-Site Request
 *      Forgery (CSRF)…"
 *   Dlatego wysyłamy `x-apollo-operation-name` oraz `apollo-require-preflight`.
 *   Potwierdzone testem na żywo 29.08.2026.
 */

/* ═══════════════════════════════════════ JEDNO MIEJSCE KONFIGURACJI RBFA ══ */
export const RBFA_CONFIG = {
  clubId: '6360',
  teamId: '375016',                 // pierwsza drużyna FC Polonia Bruksela
  matricule: '09647',
  teamName: 'FC Polonia Bruksela',
  language: 'nl',
  endpoint: 'https://datalake-prod2018.rbfa.be/graphql',
  operations: {
    calendar: {
      name: 'GetTeamCalendar',
      hash: '3f0441e6723b9852b4f0cff2c872f4aa674c5de2d23589efc70c7a4ffb7f6383',
    },
  },
  cache: { browserSeconds: 300, edgeSeconds: 900, staleSeconds: 3600 },
};

/* ═══════════════════════════════════════════════════════════════ POBRANIE ══ */

async function callRbfa(operation, variables) {
  const params = new URLSearchParams({
    operationName: operation.name,
    variables: JSON.stringify(variables),
    extensions: JSON.stringify({
      persistedQuery: { version: 1, sha256Hash: operation.hash },
    }),
  });

  const res = await fetch(`${RBFA_CONFIG.endpoint}?${params}`, {
    headers: {
      accept: 'application/json',
      // ↓ oba nagłówki obchodzą ochronę CSRF Apollo Servera. Bez nich: błąd.
      'x-apollo-operation-name': operation.name,
      'apollo-require-preflight': 'true',
      'user-agent': 'FC-Polonia-Bruksela-Website/1.0',
    },
  });

  if (!res.ok) throw new Error(`RBFA zwróciło HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join(' · '));
  return json.data;
}

/* ════════════════════════════════════════════════════════ NORMALIZACJA ══ */

const s = (v) => (v == null ? '' : String(v)).trim();
const n = (v) => (v == null || v === '' ? null : (Number.isFinite(+v) ? +v : null));

const team = (t) => ({
  id: t?.id != null ? String(t.id) : null,
  name: s(t?.name || t?.longName || t?.shortName || t?.clubName),
  logo: s(t?.logo || t?.logoUrl || t?.crest) || null,
});

/** RBFA podaje startTime bez strefy ("2026-09-05T20:00:00").
 *  Przekazujemy ten ciąg dalej BEZ konwersji — 20:00 to 20:00 w Belgii.
 *  Frontend rozdziela go na datę i godzinę, nie tworząc Date w UTC. */
const splitStart = (startTime) => {
  const str = s(startTime);
  if (!str) return { startTime: null, date: null, time: null };
  const [datePart, rest = ''] = str.split('T');
  const time = rest.slice(0, 5) || null;
  return { startTime: str, date: datePart || null, time };
};

function normalizeMatch(m) {
  const home = team(m?.homeTeam);
  const away = team(m?.awayTeam);
  const { startTime, date, time } = splitStart(m?.startTime ?? m?.date ?? m?.kickOff);
  if (!home.name || !away.name || !startTime) return null;

  const o = m?.outcome || {};
  const gh = n(o.homeTeamGoals ?? m?.homeScore);
  const ga = n(o.awayTeamGoals ?? m?.awayScore);
  const played = gh !== null && ga !== null;
  const isHome = home.id === RBFA_CONFIG.teamId;

  return {
    id: s(m?.id) || `${date}-${home.name}-${away.name}`,
    startTime, date, time,
    competition: {
      id: m?.series?.id != null ? String(m.series.id) : null,
      name: s(m?.series?.name || m?.competition?.name) || null,
    },
    round: n(m?.matchDay ?? m?.round ?? m?.week),
    homeTeam: home,
    awayTeam: away,
    result: played ? {
      home: gh, away: ga,
      homePenalties: n(o.homeTeamPenaltiesScored),
      awayPenalties: n(o.awayTeamPenaltiesScored),
    } : null,
    status: played ? 'played' : 'scheduled',
    venue: s(m?.venue?.name || m?.venue || m?.location) || null,
    isPoloniaHome: isHome,
    isPoloniaAway: away.id === RBFA_CONFIG.teamId,
    side: isHome ? 'home' : away.id === RBFA_CONFIG.teamId ? 'away' : null,
    channel: m?.channel ?? null,
  };
}

/** teamCalendar może przyjść jako tablica albo jako obiekt z zagnieżdżoną
 *  tablicą (RBFA zmieniało tę strukturę). Szukamy tolerancyjnie. */
function extractMatches(data) {
  const direct = data?.teamCalendar;
  if (Array.isArray(direct)) return direct;
  const nested = direct?.matches || direct?.items || direct?.calendar;
  if (Array.isArray(nested)) return nested;
  // ostatnia próba: pierwsza tablica obiektów z homeTeam/awayTeam
  const stack = [data];
  while (stack.length) {
    const node = stack.pop();
    if (!node || typeof node !== 'object') continue;
    if (Array.isArray(node)) {
      if (node.some((x) => x && typeof x === 'object' && (x.homeTeam || x.awayTeam))) return node;
      node.forEach((x) => stack.push(x));
      continue;
    }
    Object.values(node).forEach((v) => { if (v && typeof v === 'object') stack.push(v); });
  }
  return null;
}

/* ════════════════════════════════════════════════════════════ PAYLOAD ══ */

export async function buildCalendarPayload() {
  const data = await callRbfa(RBFA_CONFIG.operations.calendar, {
    teamId: RBFA_CONFIG.teamId,
    language: RBFA_CONFIG.language,
  });

  const raw = extractMatches(data);
  if (!Array.isArray(raw)) throw new Error('Nieprawidłowa odpowiedź RBFA: brak teamCalendar');

  const matches = raw
    .map(normalizeMatch)
    .filter(Boolean)
    .sort((a, b) => String(a.startTime).localeCompare(String(b.startTime)));

  return {
    ok: true,
    clubId: RBFA_CONFIG.clubId,
    teamId: RBFA_CONFIG.teamId,
    teamName: RBFA_CONFIG.teamName,
    matricule: RBFA_CONFIG.matricule,
    source: 'RBFA / Voetbal Vlaanderen',
    updatedAt: new Date().toISOString(),
    count: matches.length,
    matches,
  };
}

const CACHE_HEADER = `public, max-age=${RBFA_CONFIG.cache.browserSeconds}, s-maxage=${RBFA_CONFIG.cache.edgeSeconds}, stale-while-revalidate=${RBFA_CONFIG.cache.staleSeconds}`;

/* ═══════════════════════════════════════════════ NETLIFY FUNCTION HANDLER ══ */

export const handler = async () => {
  try {
    const payload = await buildCalendarPayload();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': CACHE_HEADER,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload),
    };
  } catch (error) {
    console.error('RBFA calendar import failed:', error);
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        ok: false,
        error: 'Nie udało się pobrać terminarza.',
        details: error.message,
        teamId: RBFA_CONFIG.teamId,
        matches: [],
      }),
    };
  }
};

/* ═══════════════════════════════════════════ CLOUDFLARE WORKER (ten sam kod) ══ */

export default {
  async fetch() {
    const cors = { 'access-control-allow-origin': '*', 'content-type': 'application/json; charset=utf-8' };
    try {
      const payload = await buildCalendarPayload();
      return new Response(JSON.stringify(payload), { headers: { ...cors, 'cache-control': CACHE_HEADER } });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, error: 'Nie udało się pobrać terminarza.', details: error.message, matches: [] }), { status: 502, headers: cors });
    }
  },
};
