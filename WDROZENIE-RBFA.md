# Wdrożenie danych z RBFA (droga nr 1)

Po wykonaniu tych kroków strona sama pobiera z RBFA **tabelę, ostatni i najbliższy mecz** — bez mojego udziału i bez ręcznego wpisywania.

## Co jest w paczce

- `netlify/functions/rbfa-calendar.js` — terminarz i wyniki drużyny 375016 (GraphQL RBFA).
- `netlify/functions/rbfa-standings.js` — klasyfikacja serii; identyfikator serii bierze z terminarza, więc po zmianie ligi nic nie trzeba poprawiać.
- `netlify.toml` — mówi Netlify, gdzie są funkcje.
- `live-data.js` — już wskazuje na oba adresy (`/.netlify/functions/…`).

## Wariant A — przez GitHub (zalecany, wdraża się sam)

Repozytorium: **dkras91/polonia**, gałąź **main**.

1. Rozpakuj paczkę i wgraj jej zawartość do repozytorium — przez stronę GitHuba (*Add file* → *Upload files*, przeciągnij wszystko) albo z terminala:
   ```
   git clone https://github.com/dkras91/polonia.git
   # skopiuj do środka zawartość paczki
   git add . && git commit -m "Strona klubu + importery RBFA" && git push
   ```
2. W Netlify: *Add new site* → **Import from Git** → wybierz `dkras91/polonia`.
   - Branch: `main`
   - Build command: **puste**
   - Publish directory: `.`
   - Functions directory: `netlify/functions` (ustawia to już `netlify.toml`)
3. Od tej pory każda zmiana wypchnięta do `main` wdraża się automatycznie.

## Wariant B — ręczne wrzucenie katalogu

1. Wejdź na **app.netlify.com** → *Add new site* → *Deploy manually*.
2. Przeciągnij **cały katalog** strony (ten, w którym leży `index.html`, `netlify.toml` i folder `netlify/`). Nie pakuj samego `index.html`.
3. Po wdrożeniu otwórz w przeglądarce:
   - `https://TWOJA-DOMENA/.netlify/functions/rbfa-calendar`
   - `https://TWOJA-DOMENA/.netlify/functions/rbfa-standings`
   Pierwszy powinien zwrócić `"ok": true` i listę meczów, drugi `"ok": true` i tabelę.
4. Wejdź na stronę główną — sekcje „Najbliższy mecz", „Tabela" i „Terminarz" wypełnią się same (dane odświeżają się co 5 min w przeglądarce, co 15 min na CDN).

## Jeśli tabela zwróci `ok: false`

RBFA zmienia czasem identyfikator zapytania o klasyfikację. Wtedy:

1. Otwórz stronę drużyny na rbfa.be, włącz narzędzia deweloperskie → **Network** → filtr `graphql`.
2. Znajdź żądanie z operacją rankingu, skopiuj z niego `sha256Hash` oraz `operationName`.
3. W Netlify: *Site configuration* → *Environment variables* → dodaj
   - `RBFA_RANKING_HASH` = skopiowany hash
   - `RBFA_RANKING_OP` = nazwa operacji (tylko jeśli inna niż `GetSeriesRanking`)
4. *Deploys* → *Trigger deploy*. Terminarz działa niezależnie od tego kroku.

## Uwaga o danych

Gdy źródło nie odpowie, strona pokazuje sekcje **puste** — nigdy danych zastępczych ani wymyślonych.
