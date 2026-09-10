/**
 * FC POLONIA BRUKSELA — IMPORTER TABELI LIGOWEJ Z RBFA
 * ---------------------------------------------------------------------------
 * Server-side. URL po wdrożeniu: /.netlify/functions/rbfa-standings
 *
 *   RBFA (GraphQL lub strona serii) → ta funkcja → JSON → live-data.js → strona
 *
 * Identyfikator serii NIE jest wpisany na sztywno — bierzemy go z terminarza
 * (rbfa-calendar.js), więc po zmianie ligi/sezonu nic nie trzeba poprawiać.
 *
 * Kolejność prób:
 *   1. GraphQL persisted query — tylko gdy w zmiennych środowiskowych jest
 *      RBFA_RANKING_HASH (hash operacji rankingu; RBFA zmienia go przy
 *      wdrożeniach, dlatego nie zapisujemy go w kodzie).
 *   2. Strona serii/drużyny na rbfa.be — wyciągamy wbudowany JSON
 *      (__NEXT_DATA__ / stan Apollo) i szukamy w nim tablicy klasyfikacji.
 *
 * Gdy oba źródła zawiodą, zwracamy ok:false i PUSTĄ tabelę. Strona pokazuje
 * wtedy sekcję bez danych — nigdy danych wymyślonych.
 */

import { RBFA_CONFIG, buildCalendarPayload } from './rbfa-calendar.js';

const UA = 'FC-Polonia-Bruksela-Website/1.0';
const CACHE_HEADER = `public, max-age=${RBFA_CONFIG.cache.browserSeconds}, s-maxage=${RBFA_CONFIG.cache.edgeSeconds}, stale-while-revalidate=${RBFA_CONFIG.cache.staleSeconds}`;

const s = (v) => (v == null ? '' : String(v)).trim();
const n = (v) => {
  if (v == null || v === '') return null;
  const x = Number(String(v).replace(/[^\d-]/g, ''));
  return Number.isFinite(x) ? x : null;
};

/* ─────────────────────────────────────────────── seria z terminarza ────── */

async function resolveSeries() {
  const cal = await buildCalendarPayload();
  const withSeries = cal.matches.filter((m) => m.competition && m.competition.id);
  // preferujemy serię ostatniego rozegranego meczu, potem najbliższego
  const played = withSeries.filter((m) => m.status === 'played').pop();
  const next = withSeries.find((m) => m.status === 'scheduled');
  const pick = played || next || withSeries[0];
  return {
    seriesId: pick ? pick.competition.id : null,
    seriesName: pick ? pick.competition.name : null,
    calendar: cal,
  };
}

/* ─────────────────────────────────────────────────────── GraphQL ───────── */

async function fetchRankingGraphql(seriesId) {
  const hash = process.env.RBFA_RANKING_HASH;
  if (!hash || !seriesId) return null;
  const opName = process.env.RBFA_RANKING_OP || 'GetSeriesRanking';
  const params = new URLSearchParams({
    operationName: opName,
    variables: JSON.stringify({ seriesId, language: RBFA_CONFIG.language }),
    extensions: JSON.stringify({ persistedQuery: { version: 1, sha256Hash: hash } }),
  });
  const res = await fetch(`${RBFA_CONFIG.endpoint}?${params}`, {
    headers: {
      accept: 'application/json',
      'x-apollo-operation-name': opName,
      'apollo-require-preflight': 'true',
      'user-agent': UA,
    },
  });
  if (!res.ok) throw new Error(`RBFA ranking HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join(' · '));
  return findRankingArray(json.data);
}

/* ──────────────────────────────────────────── strona rbfa.be jako źródło ── */

async function fetchRankingFromPage(seriesId) {
  const urls = [
    seriesId ? `https://www.rbfa.be/${RBFA_CONFIG.language}/competition/${seriesId}/klassement` : null,
    seriesId ? `https://www.rbfa.be/${RBFA_CONFIG.language}/competition/${seriesId}` : null,
    `https://www.rbfa.be/${RBFA_CONFIG.language}/club/${RBFA_CONFIG.clubId}/ploeg/${RBFA_CONFIG.teamId}/overzicht`,
  ].filter(Boolean);

  for (const url of urls) {
    let html = '';
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html' } });
      if (!res.ok) continue;
      html = await res.text();
    } catch { continue; }

    for (const blob of embeddedJson(html)) {
      const rows = findRankingArray(blob);
      if (rows) return rows;
    }
  }
  return null;
}

/** Wyciąga kandydatów na JSON wbudowany w stronę (Next.js, Apollo, Nuxt). */
function* embeddedJson(html) {
  const patterns = [
    /<script[^>]+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i,
    /<script[^>]+id="__APOLLO_STATE__"[^>]*>([\s\S]*?)<\/script>/i,
    /window\.__APOLLO_STATE__\s*=\s*([\s\S]*?);?\s*<\/script>/i,
    /window\.__NUXT__\s*=\s*([\s\S]*?);?\s*<\/script>/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (!m) continue;
    try { yield JSON.parse(m[1].trim()); } catch { /* nie JSON — pomijamy */ }
  }
  // dodatkowo: każdy <script type="application/json">
  const re = /<script[^>]+type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try { yield JSON.parse(m[1].trim()); } catch { /* pomijamy */ }
  }
}

/* ─────────────────────────── tolerancyjne szukanie klasyfikacji ────────── */

const KEY = {
  points: /^(points|punten|pts|point)$/i,
  played: /^(played|matchesplayed|gamesplayed|gespeeld|matches)$/i,
  won: /^(won|wins|gewonnen)$/i,
  drawn: /^(drawn|draws|gelijk|gelijkspel)$/i,
  lost: /^(lost|losses|verloren)$/i,
  gf: /^(goalsfor|goalsscored|doelpuntenvoor|scored)$/i,
  ga: /^(goalsagainst|goalsconceded|doelpuntentegen|conceded)$/i,
  pos: /^(position|rank|ranking|place|plaats)$/i,
};

const pick = (obj, re) => {
  for (const k of Object.keys(obj)) if (re.test(k)) return obj[k];
  return null;
};

const teamName = (row) => {
  const cand = row.team || row.club || row.homeTeam || row;
  if (cand && typeof cand === 'object') {
    return s(cand.name || cand.longName || cand.shortName || cand.clubName || cand.title);
  }
  return s(cand);
};

/** Szuka w dowolnym JSON-ie tablicy, której elementy mają nazwę drużyny
 *  i punkty — to wystarcza, by uznać ją za klasyfikację. */
function findRankingArray(root) {
  const stack = [root];
  const seen = new Set();
  while (stack.length) {
    const node = stack.pop();
    if (!node || typeof node !== 'object' || seen.has(node)) continue;
    seen.add(node);

    if (Array.isArray(node)) {
      const looksLikeTable = node.length >= 4 && node.every((r) => {
        if (!r || typeof r !== 'object') return false;
        return Boolean(teamName(r)) && pick(r, KEY.points) != null;
      });
      if (looksLikeTable) return node;
      node.forEach((x) => stack.push(x));
      continue;
    }
    Object.values(node).forEach((v) => { if (v && typeof v === 'object') stack.push(v); });
  }
  return null;
}

function normalizeRows(rows) {
  return rows.map((r, i) => {
    const gf = n(pick(r, KEY.gf));
    const ga = n(pick(r, KEY.ga));
    return {
      pos: n(pick(r, KEY.pos)) ?? i + 1,
      team: teamName(r),
      played: n(pick(r, KEY.played)),
      won: n(pick(r, KEY.won)),
      drawn: n(pick(r, KEY.drawn)),
      lost: n(pick(r, KEY.lost)),
      gf: gf,
      ga: ga,
      gd: gf != null && ga != null ? gf - ga : null,
      points: n(pick(r, KEY.points)),
      isPolonia: /polonia/i.test(teamName(r)),
    };
  }).filter((r) => r.team);
}

/* ═════════════════════════════════════════════════════════════ PAYLOAD ══ */

export async function buildStandingsPayload() {
  const { seriesId, seriesName } = await resolveSeries();
  let rows = null;
  let via = null;
  const notes = [];

  try {
    rows = await fetchRankingGraphql(seriesId);
    if (rows) via = 'graphql';
  } catch (e) { notes.push('graphql: ' + e.message); }

  if (!rows) {
    try {
      rows = await fetchRankingFromPage(seriesId);
      if (rows) via = 'page';
    } catch (e) { notes.push('page: ' + e.message); }
  }

  if (!rows) {
    return {
      ok: false,
      error: 'Nie udało się odczytać klasyfikacji z RBFA.',
      hint: 'Ustaw zmienną RBFA_RANKING_HASH (hash operacji rankingu z zakładki Network na rbfa.be), jeśli struktura strony się zmieniła.',
      notes,
      seriesId, seriesName,
      updatedAt: new Date().toISOString(),
      table: [],
    };
  }

  return {
    ok: true,
    source: 'RBFA / Voetbal Vlaanderen',
    via,
    seriesId,
    seriesName,
    updatedAt: new Date().toISOString(),
    table: normalizeRows(rows),
  };
}

/* ═══════════════════════════════════════════════ NETLIFY FUNCTION HANDLER ══ */

export const handler = async () => {
  try {
    const payload = await buildStandingsPayload();
    return {
      statusCode: payload.ok ? 200 : 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': payload.ok ? CACHE_HEADER : 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload),
    };
  } catch (error) {
    console.error('RBFA standings import failed:', error);
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ ok: false, error: 'Nie udało się pobrać tabeli.', details: error.message, table: [] }),
    };
  }
};

/* ═══════════════════════════════════════════ CLOUDFLARE WORKER (ten sam kod) ══ */

export default {
  async fetch() {
    const cors = { 'access-control-allow-origin': '*', 'content-type': 'application/json; charset=utf-8' };
    try {
      const payload = await buildStandingsPayload();
      return new Response(JSON.stringify(payload), {
        status: payload.ok ? 200 : 502,
        headers: { ...cors, 'cache-control': payload.ok ? CACHE_HEADER : 'no-store' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, error: 'Nie udało się pobrać tabeli.', details: error.message, table: [] }), { status: 502, headers: cors });
    }
  },
};
