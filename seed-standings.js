/* ============================================================================
   TABELA ZAPASOWA — 3e Provinciale B (Brabant Wallon / Bruxelles), 2026/2027
   ----------------------------------------------------------------------------
   Źródło: klasyfikacja na rbfa.be
   https://www.rbfa.be/nl/club/6360/ploeg/375016/overzicht
   Odczyt: 09.09.2026, po 1. kolejce. NIE są to dane demonstracyjne.

   Rola: poziom 4 hierarchii źródeł, dokładnie jak seed-fixtures.js. Gdy
   importer RBFA (netlify/functions/rbfa-standings.js) odpowie, warstwa live
   NADPISUJE ten zestaw w całości.

   DLACZEGO TO ISTNIEJE: klasyfikacji NIE wolno wyliczać z terminarza drużyny.
   Terminarz zawiera wyłącznie mecze Polonii, więc spotkania rywali między sobą
   są w nim niewidoczne — wyliczona z niego tabela pokazywałaby rywalom zera
   i stawiała Polonię na czele bez pokrycia w rzeczywistości.

   Nazwy zespołów celowo zapisane tak jak w kalendarzu federacji, a nie tak jak
   w samej tabeli na rbfa.be — dzięki temu zgadzają się klucze herbów
   (OPPONENT_CRESTS w live-data.js) i nazwy w terminarzu.

   AKTUALIZACJA: dopóki importer nie działa, po każdej kolejce trzeba tu wpisać
   nowe liczby. Pozycje ex aequo zapisujemy tak jak federacja (kilka zespołów
   z tym samym numerem).
   ========================================================================== */

export const SEED_TABLE = {
  "season": "2026/2027",
  "competition": "3e Provinciale B",
  "source": "RBFA / Voetbal Vlaanderen",
  "updatedAt": "2026-09-09",
  "matchday": 1,
  "rows": [
    { "pos": 1, "team": "Black Star NOH FC B",          "played": 1, "won": 1, "drawn": 0, "lost": 0, "gf": 10, "ga": 0,  "points": 3 },
    { "pos": 1, "team": "FC.Anderlecht Sport Milan A",  "played": 1, "won": 1, "drawn": 0, "lost": 0, "gf": 3,  "ga": 1,  "points": 3 },
    { "pos": 1, "team": "RRC.Boitsfort B",              "played": 1, "won": 1, "drawn": 0, "lost": 0, "gf": 4,  "ga": 3,  "points": 3 },
    { "pos": 1, "team": "FC.Polonia Bruxelles",         "played": 1, "won": 1, "drawn": 0, "lost": 0, "gf": 3,  "ga": 2,  "points": 3 },
    { "pos": 5, "team": "BX.Brussels B",                "played": 1, "won": 0, "drawn": 1, "lost": 0, "gf": 2,  "ga": 2,  "points": 1 },
    { "pos": 5, "team": "OLYMPIC WOLVES BRUSSELS",      "played": 1, "won": 0, "drawn": 1, "lost": 0, "gf": 2,  "ga": 2,  "points": 1 },
    { "pos": 5, "team": "FC.M.Uccle B",                 "played": 1, "won": 0, "drawn": 1, "lost": 0, "gf": 1,  "ga": 1,  "points": 1 },
    { "pos": 5, "team": "ROFC.Stockel B",               "played": 1, "won": 0, "drawn": 1, "lost": 0, "gf": 1,  "ga": 1,  "points": 1 },
    { "pos": 9, "team": "RU.Auderghem B",               "played": 0, "won": 0, "drawn": 0, "lost": 0, "gf": 0,  "ga": 0,  "points": 0 },
    { "pos": 9, "team": "F.E.F.Anderlecht",             "played": 1, "won": 0, "drawn": 0, "lost": 1, "gf": 3,  "ga": 4,  "points": 0 },
    { "pos": 9, "team": "Ol. Anderlecht",               "played": 1, "won": 0, "drawn": 0, "lost": 1, "gf": 2,  "ga": 3,  "points": 0 },
    { "pos": 9, "team": "Olympique Club Forestois B",   "played": 1, "won": 0, "drawn": 0, "lost": 1, "gf": 1,  "ga": 3,  "points": 0 },
    { "pos": 9, "team": "Racing Anderlecht",            "played": 1, "won": 0, "drawn": 0, "lost": 1, "gf": 0,  "ga": 10, "points": 0 }
  ]
};

export default SEED_TABLE;
