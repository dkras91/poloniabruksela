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

**Strona NIE pobiera już danych sama.** Od października 2026 federacja trzyma
swoje API za ochroną Akamai, która odrzuca wszystkich klientów nieprzeglądarkowych:
`curl`, `node fetch`, funkcje Netlify, Cloudflare Workers, GitHub Actions.
Blokada idzie po odcisku połączenia TLS, nie po adresie IP — sprawdzone:
przeglądarka i `curl` z tego samego adresu, przeglądarka przechodzi, `curl` nie.
Żadna zmiana nagłówków tego nie obejdzie. Nie próbuj „naprawiać" importerów
dokładaniem nagłówków; to było testowane i nie działa.

Co gorsza, Akamai oddaje stronę „Access Denied" **z kodem HTTP 200**, więc samo
sprawdzenie `res.ok` jej nie wykryje. Zawsze sprawdzaj też `content-type`.

Nie ma źródła zapasowego: ACFF/FFA (`ffa.be`) chodzi po tym samym API, a Foot24
porzucił piłkę amatorską. Sprawdzone w październiku 2026.

### Jak dane trafiają na stronę teraz

```
Chrome na komputerze klubu → RBFA GraphQL → data/rbfa.json → commit → Netlify
```

Narzędzie `C:\Users\damia\polonia-rbfa-sync\` (POZA repozytorium, bo tu nie wolno
package.json) uruchamia zwykły Chrome przez protokół CDP i wykonuje zapytanie
z kontekstu strony `www.rbfa.be`. Niczego nie udaje: to prawdziwa przeglądarka
z własnym User-Agentem. **Trybu headless użyć się nie da** — zdradza się w
User-Agencie i Akamai go odrzuca.

Z przeglądarki obowiązuje ODWROTNA zasada niż dawniej po stronie serwera:
wysyłamy `POST` z `content-type: application/json`, a nagłówków
`x-apollo-operation-name` i `apollo-require-preflight` **nie wysyłamy** —
wymuszają preflight CORS, którego RBFA nie przepuszcza. Bez `content-type`
Apollo odrzuca zapytanie jako CSRF.

`data/rbfa.json` to JEDEN plik z polami `matches` i `table` naraz. Oba adresy
w `DEFAULT_CONFIG` (`fixturesUrl`, `tableUrl`) wskazują na niego: `sync()`
rozpoznaje terminarz po `matches`, a tabelę czyta z `table`. Dzięki temu jedno
pobranie to jeden commit i jedna przebudowa, nie dwie.

Normalizacja ma jedno źródło prawdy: `normalizeCalendar()` w `rbfa-calendar.js`
oraz `pickSeriesFromMatches()` i `normalizeStandings()` w `rbfa-standings.js`.
Narzędzie importuje je wprost z repozytorium — nie kopiuj tej logiki na drugą
stronę, bo pola się rozjadą.

`getConfig()` odrzuca zapisane w `localStorage` adresy `/.netlify/functions/rbfa-`.
Bez tego odwiedzający ze starym wpisem z panelu dostawałby 404, strona po cichu
zjechałaby na dane zapasowe i wyglądała poprawnie, pokazując wyniki sprzed
miesięcy. Nie usuwaj tego filtra.

Funkcje w `netlify/functions/` zostają na dysku, ale **są martwe** — nic ich nie
woła. Trzymamy je dla normalizacji i na wypadek, gdyby federacja kiedyś odblokowała
dostęp serwerowy.

### Konfiguracja klubu

`RBFA_CONFIG` w `rbfa-calendar.js`: `clubId 6360`, `teamId 375016`,
`matricule 09647`. Identyfikator serii NIE jest wpisany na sztywno — wynika
z ostatniego rozegranego meczu (`pickSeriesFromMatches`), więc zmiana ligi czy
sezonu nie wymaga poprawek w kodzie. Sezon 2026/2027: `CHP_131936`, 3 Prov. B.

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

## Formularz kontaktowy

Wysyłka idzie przez **formularze Netlify** — bez zewnętrznego serwisu, bez
klucza API, bez otwierania poczty użytkownika. Działa to tak:

- W `index.html`, tuż po `<body>`, siedzi ukryty statyczny formularz
  `name="kontakt"` z atrybutem `data-netlify="true"`. Netlify wykrywa
  formularze, czytając HTML przy wdrożeniu, a nasz formularz rysuje React
  dopiero w przeglądarce — bez tej kopii Netlify nigdy by go nie zobaczył.
  **Nie usuwaj go.** Dodajesz pole w formularzu na stronie kontaktu? Dopisz
  je również tam, inaczej wartość nie dojdzie.
- `onCtSend` w `index.html` wysyła `POST /` z nagłówkiem
  `application/x-www-form-urlencoded` i polem `form-name=kontakt`. Pole
  `lang` niesie język, w którym gość przeglądał stronę — po to, żeby klub
  wiedział, w jakim języku odpisać.
- `bot-field` to pułapka na roboty (honeypot). Zostaje pusta.
- Po udanej wysyłce pokazujemy ekran potwierdzenia; jego napisy są w
  `i18n.js`, więc gość widzi go w swoim języku. Gdy wysyłka padnie,
  pokazujemy błąd z adresem `polonia@live.be`, żeby wiadomość nie przepadła.

**Krok do wykonania raz, w panelu Netlify** (bez tego zgłoszenia nigdzie nie
pójdą): Site configuration → Forms → włączyć wykrywanie formularzy, potem
Forms → kontakt → Settings → Form notifications → Email notification na adres
klubu. Netlify w darmowym planie przyjmuje 100 zgłoszeń miesięcznie.

Nadawca NIE dostaje maila zwrotnego — formularze Netlify tego nie potrafią.
Gdyby klub tego chciał, trzeba dołożyć funkcję Netlify z zewnętrznym nadawcą
(np. Resend) i klucz w zmiennych środowiskowych.

## Animacja pojawiania się sekcji

Sekcje kadry (bramkarze, obrońcy, pomocnicy, napastnicy) oraz sztab i zarząd
wjeżdżają przy przewijaniu. Mechanizm: `_setupReveal()` w `index.html` szuka
elementów z atrybutem `data-reveal`, chowa je z poziomu JavaScriptu i pokazuje
przez `IntersectionObserver`; karty w środku (`data-reveal-item`) wchodzą
kaskadą. Kolejność jest odwrotna niż zwykle w takich rozwiązaniach i to jest
celowe: **treść jest w HTML-u widoczna, chowa ją dopiero skrypt**. Dzięki temu
przy wyłączonym JS, w wyszukiwarce i przy systemowym ustawieniu „ogranicz
animacje" strona wygląda normalnie, zamiast pokazywać pustą stronę.

## Nawigacja: próg hamburgera liczony, nie zgadywany

W wierszu nawigacji siedzi niewidoczna miarka (`data-nav-probe`) z tymi samymi
pozycjami i tą samą typografią co pasek linków. Po każdym renderze
`_measureNav()` porównuje jej szerokość z miejscem obok logo i decyduje:
pasek albo hamburger (`navFits` w stanie). Powód: pełne menu potrzebuje ok.
940–980 px zależnie od języka (najdłuższy jest niderlandzki), a wcześniejszy
próg 1024 px pokazywał pasek, który się nie mieścił — `overflow-x:auto`
i wyrównanie do prawej ucinały wtedy „Start" i „Aktualności" na każdej
szerokości. Zmieniasz pozycje menu albo typografię linków? Zmień to samo w
miarce, inaczej pomiar skłamie.

## Sklep internetowy

`#/sklep` ma dwa stany i przełącza je sam, na podstawie `content.js`:

- `SHOP_OPEN = false` (stan obecny) — zapowiedź „w budowie", zdjęcie w
  koszulkach POLONIA RAZEM! i dwa odnośniki kontaktowe.
- `SHOP_OPEN = true` przy niepustej tablicy `SHOP` — siatka produktów
  (zdjęcie, nazwa, opis, cena, rozmiary, kolory) i formularz zamówienia.

Asortyment siedzi w `SHOP` w `content.js`: dziewięć pozycji (szalik, bluza,
polo, sześć koszulek). **Ceny są zerowe, a zdjęć jeszcze nie ma** — dlatego
wyłącznik stoi na `false`. Zanim go przestawisz: wpisz rzeczywiste `price`
i wgraj pliki do `assets/sklep/` pod nazwami z pola `photo`. Produkt z ceną 0
pokazuje „Cena do ustalenia", a produkt bez zdjęcia — kafelek z herbem;
oba stany są awaryjne, nie docelowe.

Zamówienia idą **drugim formularzem Netlify**, `name="zamowienie"`, obok
kontaktowego. Obowiązuje ta sama zasada co przy kontakcie: ukryta kopia
formularza siedzi tuż po `<body>` i dokładasz do niej każde nowe pole,
inaczej wartość nie dojdzie do klubu. Pola: `product`, `size`, `color`,
`qty`, `name`, `email`, `phone`, `note`, `lang`, `bot-field`.

**Krok do wykonania raz, w panelu Netlify**: Forms → zamowienie → Settings →
Form notifications → powiadomienie na adres klubu. Limit darmowego planu to
100 zgłoszeń miesięcznie **łącznie** z formularzem kontaktowym — przy żywym
sklepie to jest realne ograniczenie, nie formalność.

Formularz nie przyjmuje płatności i nigdzie tego nie obiecuje: kibic wysyła
zgłoszenie, klub odpisuje mailem i dogaduje kwotę oraz odbiór. Wprowadzenie
płatności online wymaga backendu i konta płatniczego — to nie jest zmiana
w tym pliku.

## Backstage Polonia — podstrona wideo

`#/backstage` to klubowe centrum wideo: hero z logo serii, najnowszy odcinek,
siatka pozostałych, sekcja „Czym jest Backstage Polonia?" i zachęta do
subskrypcji. Kanał: `BACKSTAGE_CHANNEL` w `content.js`.

**Odcinki żyją w tablicy `BACKSTAGE` w `content.js`**, od najnowszego. Pierwszy
wpis pokazuje się na górze jako najnowszy odcinek, reszta trafia do siatki.
Dodanie materiału to trzy kroki, wszystkie poza `index.html`:

1. identyfikator filmu z adresu YouTube,
2. miniatura zapisana jako `assets/backstage/<ID>.jpg` (źródło
   `https://i.ytimg.com/vi/<ID>/maxresdefault.jpg`, przeskalowana do ok. 854 px
   szerokości — inaczej podstrona puchnie),
3. wpis w tablicy + tłumaczenia tytułu i opisu w `i18n.js`.

**Miniatury trzymamy u siebie, nie linkujemy ich z `i.ytimg.com`.** To nie jest
drobiazg: gdyby ładowały się z serwerów Google, podstrona wysyłałaby tam adres
IP każdego odwiedzającego, zanim ten cokolwiek kliknie.

**Odtwarzacz wymaga zgody — tak samo jak mapy.** `cookies.js` ma osobną
kategorię `video` („Filmy YouTube"). Kafelek ma trzy stany: miniatura
z przyciskiem, pytanie o zgodę, odtwarzacz. Dopiero kliknięcie „Włącz
i odtwórz" zapisuje zgodę i wczytuje ramkę z `youtube-nocookie.com`.
`onAllowVideo` zachowuje pozostałe wybory gościa i od razu uruchamia ten
odcinek, o który poprosił. **Nie wstawiaj `<iframe>` z YouTube poza tym
mechanizmem** — obowiązuje ta sama reguła co przy mapach.

Numer kolejki (`roundLabel`) składa się z liczby, więc słownik `i18n.js` go nie
dopasuje — jest budowany przez `this._t()` od razu w czterech językach.

Pole `kind` steruje wyłącznie etykietą na kafelku: `mecz` → ZA KULISAMI,
`skrot` → SKRÓT MECZU, `klub` → Z ŻYCIA KLUBU. Wyniki i rywale w tablicy
pochodzą z terminarza RBFA (`data/rbfa.json`), nie z samych tytułów filmów —
przy dopisywaniu odcinka sprawdź je tam, nie zgaduj.

### Wykrywanie nowych odcinków

`C:\Users\damia\polonia-rbfa-sync\backstage.mjs` (poza repozytorium, obok
narzędzia RBFA) czyta kanał YouTube przez RSS i wyłapuje filmy, których nie ma
w `BACKSTAGE`. Dla każdego pobiera i przeskalowuje miniaturę oraz zapisuje
gotowy szkic wpisu do `nowe-odcinki.txt`: datę, zgadnięty `kind`, a przy
odcinkach meczowych numer kolejki, rywala i wynik zestawione z `data/rbfa.json`.
Chodzi w tym samym zadaniu harmonogramu co synchronizacja RBFA; gdy coś
znajdzie, `STAN.txt` mówi o tym wprost.

**Narzędzie niczego nie publikuje i nie dotyka `content.js`.** Tytuły na
YouTubie są pisane pod YouTube (emoji, hashtagi, „#KOLEJKA 5"), a strona
potrzebuje redakcyjnego tytułu, leadu i tłumaczeń na trzy języki — tego nie da
się wygenerować automatycznie bez spadku jakości, a reguła czterech języków
jest twarda. Wpis zatwierdza człowiek.

Kanał RSS jest zwykłym plikiem XML i nie ma nic wspólnego z blokadą Akamai na
API federacji — `curl` pobiera go bez przeszkód.

Film, który świadomie NIE ma być na stronie, wpisz do `pominiete.txt` w
katalogu narzędzia. Bez tego wykrywacz zgłaszałby go jako nowy przy każdym
uruchomieniu — tak było z drugim filmem wprowadzającym po jego usunięciu.

Rodzaj materiału rozpoznajemy po znaczniku „KOLEJKA N" w tytule, a nie po samej
nazwie serii: „Backstage Polonia" pojawia się także w filmach wizerunkowych,
przez co zapowiedź kanału dostawała etykietę meczu i przyklejoną kolejkę.
Z tego samego powodu dopasowanie po dacie publikacji stosujemy wyłącznie do
skrótów meczowych.

## Podgląd przy udostępnianiu linku (Open Graph)

Grafika i teksty, które pokazują się, gdy ktoś wrzuci link do strony na
Facebooka, WhatsAppa, Messengera, LinkedIna albo X. Znaczniki siedzą
w `<head>` w `index.html`.

**Adresy muszą być pełne.** Ścieżka względna typu `assets/crest.png` jest przez
te serwisy po cichu ignorowana i karta zostaje bez grafiki — tak właśnie było
wcześniej.

**Którego adresu używać — stan na październik 2026.** Klub ma trzy adresy
i tylko jeden nadaje się pod znaczniki:

| Adres | Stan | Nadaje się? |
|---|---|---|
| `polonia.aktualnosci.be` | **martwy**, Cloudflare Error 1000 | nie |
| `poloniabxl.be` | przekierowanie, ale **tylko korzeń** — `/assets/…` daje 404 | nie na pliki |
| `poloniabruksela.netlify.app` | działa w całości | tak, obecnie używany |

Dlatego `og:url`, `og:image` i `<link rel="canonical">` wskazują na adres
Netlify: robot musi dostać plik, a nie 404. Na samej grafice widnieje
`poloniabxl.be`, bo to adres, który klub promuje.

**Docelowo**: dodać `poloniabxl.be` jako domenę własną w panelu Netlify
(Domain management). Wtedy przestanie być przekierowaniem, podścieżki zaczną
działać i wszystkie trzy znaczniki można przestawić na ten adres. Do tego
czasu nie wpisuj tam `poloniabxl.be` — karta straci grafikę.

Grafika to `assets/og-share.jpg`, 1200×630. Nie rysuj jej ręcznie: składa ją
prawdziwy Chrome z szablonu `.claude/og-card.html` poleceniem

```
node .claude/zrob-og.mjs
```

(wymaga uruchomionego podglądu na porcie 8000, bo szablon wczytuje herb
i zdjęcie z `assets/`). Dzięki temu karta ma te same fonty i kolory co strona.
Zmieniasz napisy na grafice? Popraw szablon i wygeneruj plik ponownie.
Katalog `.claude/` jest w `.gitignore`, więc szablon i skrypt nie wchodzą na
produkcję — na produkcję idzie sam gotowy plik JPEG.

**Jedna karta dla całej strony.** Routing idzie po `#` (`#/mecze`,
`#/backstage`), a ta część adresu nie dociera do serwera — robot social media
nigdy jej nie widzi. Każdy udostępniony link pokaże więc ten sam podgląd.
Osobne karty dla podstron wymagałyby prawdziwych ścieżek i prerenderingu, czyli
przebudowy routingu; nie rób tego bez wyraźnej prośby właściciela.

Po zmianie znaczników Facebook trzyma stary podgląd w pamięci. Odświeża się go
w Sharing Debugger (`developers.facebook.com/tools/debug`) przyciskiem
„Scrape Again".

## Mapy Google tylko po zgodzie

`cookies.js` ma osobną kategorię `maps`. Osadzona mapa w szczegółach meczu
wczytuje się dopiero, gdy gość ją włączy — bez zgody pokazujemy adres obiektu,
przycisk „Wczytaj mapę" i zwykły odnośnik do map. Przycisk zapisuje zgodę jak
każdą inną (z datą i zakresem), a wycofanie jej w ustawieniach natychmiast
chowa mapę. Nie wstawiaj `<iframe>` z Google poza tym mechanizmem.

## Tytuły podstron

`_pageTitle()` w `index.html` buduje tytuł karty przeglądarki z podstrony i
języka; artykuł, album i sezon biorą własną nazwę (tłumaczoną przez
`I.translate`). Dodajesz podstronę? Dopisz ją do mapy w tej metodzie.

## Animacja wejścia sekcji

`_setupReveal()` chowa nagłówki sekcji (`data-reveal-head`) i karty
(`data-reveal-item`), a `IntersectionObserver` pokazuje je falami: elementy,
które weszły w kadr razem, są sortowane po pozycji (rzędami, w rzędzie od
lewej) i dostają narastające opóźnienie 80 ms; karta wjeżdża 22 px w górę w
560 ms. Trzy zabezpieczenia, których nie wolno usuwać: (1) treść jest w HTML-u
widoczna, chowa ją dopiero skrypt; (2) przy `prefers-reduced-motion` nic się
nie chowa; (3) „dosprzątanie" po przewijaniu pokazuje elementy, które
przeleciały nad kadrem, a po 1,4 s także te, które zostały w kadrze — pusta
karta jest gorsza niż brak animacji.

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
