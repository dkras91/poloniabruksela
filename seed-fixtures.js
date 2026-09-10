/* ============================================================================
   TERMINARZ ZAPASOWY — FC POLONIA BRUKSELA, SEZON 2026/2027
   ----------------------------------------------------------------------------
   Źródło: oficjalny kalendarz drużyny na rbfa.be
   https://www.rbfa.be/nl/club/6360/ploeg/375016/kalender
   (club 6360, team 375016). Odczyt: 09.09.2026.
   NIE są to dane demonstracyjne.

   Rola: poziom 4 hierarchii źródeł (dane ręczne administratora). Gdy importer
   RBFA odpowie, warstwa live NADPISUJE ten zestaw w całości.

   Godziny lokalne (Europe/Brussels), trzymane jako tekst — bez strefy, żeby
   przeglądarka nie przesunęła 20:00 na 22:00.

   Zestaw jest KOMPLETNY: 24 kolejki 3e Provinciale B (12 rywali, mecz i rewanż)
   plus spotkanie pucharowe. Wyniki dopisujemy wyłącznie za federacją — pola
   scoreHome / scoreAway zostawiamy puste, dopóki mecz się nie odbędzie.

   Pole `venue` przy wyjazdach: obiekt gospodarza ze szczegółów meczu na
   rbfa.be (/nl/wedstrijd/<id>) — nazwa boiska tak jak na miejscu, ulica,
   kod pocztowy, gmina. Mecze u siebie zostawiamy bez `venue`; adres Stade
   Fallon wstawia HOME_VENUE z live-data.js, żeby był w jednym miejscu.
   ========================================================================== */

export const SEED = {
  "season": "2026/2027",
  "competition": "3e Provinciale B",
  "source": "RBFA / Voetbal Vlaanderen (kalendarz drużyny)",
  "complete": true,
  "updatedAt": "2026-09-09",
  "matches": [
    {
      "date": "2026-08-02",
      "time": "16:00",
      "competition": "Coupe Hommes BW-BXL",
      "home": "FC.Polonia Bruxelles",
      "away": "OTTIGNIES-LIMELETTE FC",
      "scoreHome": 0,
      "scoreAway": 5,
      "note": "Forfait"
    },
    {
      "date": "2026-09-06",
      "time": "15:00",
      "home": "Ol. Anderlecht",
      "away": "FC.Polonia Bruxelles",
      "venue": "Stade J. Rousseau / Terrein 1, Avenue d'Itterbeek 580, 1070 Anderlecht",
      "scoreHome": 2,
      "scoreAway": 3
    },
    {
      "date": "2026-09-13",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "Olympique Club Forestois B"
    },
    {
      "date": "2026-09-19",
      "time": "20:00",
      "home": "FC.Anderlecht Sport Milan A",
      "away": "FC.Polonia Bruxelles",
      "venue": "St.-Niklaasinstituut / Terrein 1, Bergensesteenweg 1421, 1070 Anderlecht"
    },
    {
      "date": "2026-09-27",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "Black Star NOH FC B"
    },
    {
      "date": "2026-10-04",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "RU.Auderghem B"
    },
    {
      "date": "2026-10-10",
      "time": "20:00",
      "home": "ROFC.Stockel B",
      "away": "FC.Polonia Bruxelles",
      "venue": "Club House / Terrein 1, Chaussée de Stockel 376, 1150 Woluwe-Saint-Pierre"
    },
    {
      "date": "2026-10-18",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "RRC.Boitsfort B"
    },
    {
      "date": "2026-10-25",
      "time": "15:00",
      "home": "BX.Brussels B",
      "away": "FC.Polonia Bruxelles",
      "venue": "La Roue / Terrein 1, Rue Pierre Schlosser 31, 1070 Anderlecht"
    },
    {
      "date": "2026-11-01",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "Racing Anderlecht"
    },
    {
      "date": "2026-11-08",
      "time": "15:00",
      "home": "OLYMPIC WOLVES BRUSSELS",
      "away": "FC.Polonia Bruxelles",
      "venue": "St.-Niklaasinstituut / Terrein 1, Bergensesteenweg 1421, 1070 Anderlecht"
    },
    {
      "date": "2026-11-15",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "F.E.F.Anderlecht"
    },
    {
      "date": "2026-11-21",
      "time": "18:30",
      "home": "FC.M.Uccle B",
      "away": "FC.Polonia Bruxelles",
      "venue": "C.Sp. A. Deridder / Terrein 1, Rue des Griottes 26, 1180 Uccle"
    },
    {
      "date": "2026-12-06",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "FC.M.Uccle B"
    },
    {
      "date": "2026-12-20",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "Ol. Anderlecht"
    },
    {
      "date": "2027-01-16",
      "time": "20:00",
      "home": "Olympique Club Forestois B",
      "away": "FC.Polonia Bruxelles",
      "venue": "C.Sp. Bempt / Terrein 4, Bld. 2ème Armée Britannique 600, 1190 Forest"
    },
    {
      "date": "2027-01-24",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "FC.Anderlecht Sport Milan A"
    },
    {
      "date": "2027-01-30",
      "time": "20:00",
      "home": "Black Star NOH FC B",
      "away": "FC.Polonia Bruxelles",
      "venue": "Croix De Guerre / Terrein 1, Av. des Croix de Guerre 3, 1120 Neder-Over-Heembeek"
    },
    {
      "date": "2027-02-14",
      "time": "15:00",
      "home": "RU.Auderghem B",
      "away": "FC.Polonia Bruxelles",
      "venue": "St. Communal Auderghem / Terrein 2, Chaussée de Wavre 1854, 1160 Auderghem"
    },
    {
      "date": "2027-02-21",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "ROFC.Stockel B"
    },
    {
      "date": "2027-02-28",
      "time": "15:00",
      "home": "RRC.Boitsfort B",
      "away": "FC.Polonia Bruxelles",
      "venue": "Stade Trois Tilleuls / Terrein 2, Avenue des Nymphes 1a, 1170 Watermael-Boitsfort"
    },
    {
      "date": "2027-03-14",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "BX.Brussels B"
    },
    {
      "date": "2027-03-21",
      "time": "15:00",
      "home": "Racing Anderlecht",
      "away": "FC.Polonia Bruxelles",
      "venue": "Vogelenzang / Terrein 1, Rue du Chant d'Oiseaux 130, 1070 Anderlecht"
    },
    {
      "date": "2027-04-04",
      "time": "15:00",
      "home": "FC.Polonia Bruxelles",
      "away": "OLYMPIC WOLVES BRUSSELS"
    },
    {
      "date": "2027-04-11",
      "time": "15:00",
      "home": "F.E.F.Anderlecht",
      "away": "FC.Polonia Bruxelles",
      "venue": "Vogelenzang / Terrein 2, Rue du Chant d'Oiseaux 130, 1070 Anderlecht"
    }
  ]
};

export default SEED;
