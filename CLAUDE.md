# Instrukcje projektu — strona FC Polonia Bruksela

Ten plik czytasz automatycznie na starcie każdej sesji. Opisuje, czym jest ten
projekt i czego przy nim NIE wolno zrobić. Rozmowa toczy się po polsku.

## Czym to jest

Oficjalna strona klubu piłkarskiego FC Polonia Bruksela (Belgia, założony 1986).
Strona statyczna: jeden `index.html` z hash-routingiem (18 podstron), skrypty ES
modules, zasoby graficzne. Do tego dwie funkcje Netlify pobierające dane z
federacji RBFA. **Nie ma builda, nie ma frameworka, nie ma `package.json`.**
Nie wprowadzaj żadnego z tych trzech bez wyraźnej prośby właściciela.

Hosting: Netlify, wdrożenie z gałęzi `main` na GitHubie.

## Przepływ pracy — WAŻNE

Właściciel nie jest programistą i nie chce przeklejać plików ani ręcznie
commitować. Oczekuje, że zmiana wprowadzona w rozmowie znajdzie się na
publicznej stronie bez jego udziału. Dlatego:

1. Wprowadź zmianę w plikach.
2. Sprawdź, że nic się nie zepsuło (patrz „Weryfikacja" niżej).
3. `git add` → `git commit` z opisem po polsku → `git push` na `main`.
4. Powiedz właścicielowi jednym zdaniem, co poszło na produkcję i że Netlify
   przebuduje stronę w ok. minutę.

Nie pytaj przed każdym pushem, jeśli zmiana jest tą, o którą właściciel
poprosił. Pytaj, gdy zmiana wykracza poza prośbę albo dotyka reguł poniżej.

## Twarde reguły

- **`.image-slots.state.json` MUSI być wersjonowany.** To sidecar ze zdjęciami
  wgranymi przez panel (hero, kafel drużyny, zdjęcia w artykułach), ~1,3 MB
  base64. Wpisanie go do `.gitignore` = zniknięcie tych zdjęć z produkcji.
  Nigdy tego nie rób, nawet „porządkując" repozytorium.
- **Żadnych wymyślonych danych meczowych.** Gdy RBFA nie odpowie, sekcje
  terminarza i tabeli zostają PUSTE. Nie wstawiaj przykładowych wyników,
  zaślepek ani danych „na razie". To strona klubu, nie makieta.
- **`netlify.toml` zostaje jak jest**: `publish = "."`, `functions =
  "netlify/functions"`, build command puste.
- **Cztery języki.** `i18n.js` tłumaczy interfejs, kluczem jest DOKŁADNY polski
  tekst ze strony. Jeśli zmieniasz albo dodajesz widoczny napis po polsku,
  dopisz od razu wartości `fr`, `nl`, `en` — inaczej napis zostanie po polsku w
  obcojęzycznych wersjach. Bruksela jest dwujęzyczna, więc FR i NL są
  równorzędne, nie opcjonalne. Dłuższe teksty (historia klubu, polityka
  prywatności, regulamin) siedzą w `i18n-longform.js`.
- **Design system** w `_ds/` — tokeny kolorów, typografii i odstępów. Nowe
  sekcje buduj na tokenach, nie na wpisywanych na sztywno hexach i pikselach.

## Mapa plików

| Plik | Zawartość |
|---|---|
| `index.html` | cały układ i wszystkie podstrony (~250 kB) |
| `content.js` | `LEGAL`, `CLUB_INFO`, `NEWS`, `SQUAD`, `STAFF`, `BOARD`, `SPONSORS`, `GALLERIES`, `SEASONS` |
| `live-data.js` | warstwa danych: terminarz, tabela, cache, normalizacja |
| `i18n.js` | tłumaczenia interfejsu PL/FR/NL/EN |
| `i18n-longform.js` | tłumaczenia długich tekstów |
| `admin.js` | panel redakcyjny pod `/#/admin` |
| `image-slot.js` | komponent przeciągnij-i-upuść dla zdjęć |
| `cookies.js` | baner zgód, Consent Mode |
| `support.js` | moduł wsparcia/darowizn |
| `netlify/functions/rbfa-calendar.js` | importer terminarza (tu jest `RBFA_CONFIG`) |
| `netlify/functions/rbfa-standings.js` | importer tabeli ligowej |
| `api/rbfa-proxy.worker.js` | opcjonalne proxy Cloudflare, nieużywane na Netlify |
| `assets/` | herb, zdjęcia kadry i zarządu, herby rywali, logo partnerów |

Treści redakcyjne zmieniaj w `content.js`, nie w `index.html`.

## Dane z RBFA

Źródłem jest GraphQL federacji (`datalake-prod2018.rbfa.be/graphql`), nie
scrapowanie strony. Konfiguracja w jednym miejscu — `RBFA_CONFIG` w
`rbfa-calendar.js`: `clubId 6360`, `teamId 375016`, `matricule 09647`.
Identyfikator ligi NIE jest wpisany na sztywno — wynika z ostatniego meczu,
więc zmiana serii czy sezonu nie wymaga poprawek w kodzie.

Apollo po stronie RBFA odrzuca GET bez nagłówków `x-apollo-operation-name` i
`apollo-require-preflight`. Nie usuwaj ich.

Tabela ligowa NIE wymaga żadnej zmiennej środowiskowej. RBFA nie używa tu
persisted queries — `rbfa-standings.js` wysyła pełną treść zapytania
`GetSeriesRankings` (nazwa w liczbie mnogiej). `RBFA_RANKING_HASH` i
`RBFA_RANKING_OP` są nadal obsługiwane, ale wyłącznie jako opcjonalne
nadpisanie.

Federacja zwraca w jednej odpowiedzi KILKA klasyfikacji: ogólną i osobne dla
każdej „periody". Te nierozegrane mają same zera i wszystkim wpisaną pozycję
1 — dlatego `pickRanking()` wybiera zestaw z największą liczbą rozegranych
meczów, a nie pierwszy z brzegu. Pola nazywają się `matchesWon` /
`matchesDrawn` / `matchesLost`, nie `won` / `drawn` / `lost`.

## Ukrywanie pojedynczych meczów

`HIDDEN_MATCHES` w `live-data.js` to lista identyfikatorów RBFA albo dat
(`RRRR-MM-DD`) spotkań, które nie mają się pokazywać nigdzie na stronie —
w terminarzu, w kafelku ostatniego meczu ani w formie. Filtr działa w dwóch
miejscach: raz na świeżych danych tuż przed zapisem migawki (`sync`) i raz
przy odczycie starszych migawek (`getCache`), więc mecz nie wraca ani z
importera RBFA, ani z iCal, ani z terminarza zapasowego, ani z cache w
przeglądarce odwiedzającego. Obecnie ukryty jest mecz pucharowy z 02.08.2026
(id 7522858). To nie jest sposób na ukrywanie porażek ligowych — służy do
spotkań spoza rozgrywek, których klub nie pokazuje na stronie.

## Kartki i zawieszenia — dlaczego ich nie ma

Strona `rbfa.be/nl/club/6360/kaarten` nie ma odpowiednika w publicznym
GraphQL federacji: dane idą przez persisted query, której hash RBFA zmienia
przy każdym wdrożeniu swojego frontu. Zapytanie z wpisanym na sztywno hashem
przestaje działać po ich najbliższej aktualizacji, a scrapowanie HTML tej
podstrony wymaga JavaScriptu, więc funkcja Netlify go nie odczyta. Właściciel
zdecydował, że na razie kartek nie dodajemy. Gdyby wracać do tematu:
alternatywą jest ręczna tabelka w `content.js` aktualizowana po kolejce albo
zwykły link do strony federacji.

## Weryfikacja przed pushem

- Podgląd lokalny: `python3 -m http.server 8000`, potem `localhost:8000`.
  Funkcje Netlify tak nie działają — do nich potrzebne jest `netlify dev`.
- Po zmianach w `index.html` lub skryptach sprawdź konsolę przeglądarki:
  strona to ES modules, więc literówka w imporcie wywala całą podstronę.
- Po zmianach w `content.js` sprawdź, że sekcje, których dotyczyła zmiana,
  faktycznie się renderują — struktury tablic są w kilku miejscach zakładane
  na sztywno.

## Sprawy otwarte

- Terminarz z importera RBFA NIE zawiera obiektu. Adresy boisk gospodarzy
  trzymamy w `OPPONENT_VENUES` w `live-data.js` i podstawiamy po nazwie
  gospodarza. Przy zmianie rywali (nowy sezon, inna seria) trzeba tam dopisać
  kolejne pozycje, inaczej wróci „Obiekt do potwierdzenia".
- `admin.js`: domyślne hasło panelu leży jawnie w kodzie. Panel działa w
  całości w przeglądarce (`localStorage` + sha256), więc nie jest realnym
  zabezpieczeniem — wystarcza do publikowania treści, nie do ochrony danych.
  Zmiany wprowadzone w panelu widzi tylko przeglądarka, w której je zrobiono;
  trwałe zmiany treści idą przez `content.js` i push.
- Brak identyfikatora GA4 (pomiar startuje wyłącznie po zgodzie „Statystyczne").
- Puste pola na logo Aktualnosci.be w nagłówku i stopce.
- Polityka prywatności i regulamin — również wersje FR i NL — nie były
  sprawdzone przez prawnika.
