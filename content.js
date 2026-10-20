/* ============================================================================
   FC POLONIA BRUKSELA — CONTENT (dane redakcyjne)
   ----------------------------------------------------------------------------
   Tu edytujesz treści. Dane zmienne (tabela/terminarz/wyniki) są w live-data.js
   i NIE należy ich tutaj wpisywać.

   Zasada projektu: nie umieszczamy tu nazwisk, wyników ani faktów bez
   potwierdzenia w źródle. Puste listy = "do uzupełnienia przez administratora".
   ========================================================================== */

/* -------------------------------------------------------------------- KLUB */

/* ------------------------------------------------------- DANE PODMIOTU --- */
/* UWAGA: dane poniżej są TYMCZASOWE (placeholder) — wstawione, żeby strona
   miała komplet informacji wymaganych prawem. Przed publikacją podmień je na
   rzeczywiste dane stowarzyszenia: nazwę prawną, numer przedsiębiorstwa
   (BCE/KBO), adres siedziby i kontakt w sprawie danych osobowych. */

export const LEGAL = {
  placeholder: false,
  legalName: 'FC Polonia ASBL',
  legalForm: 'ASBL / VZW — stowarzyszenie bez celu zarobkowego',
  enterpriseNumber: 'BE 0552.829.526',
  registeredOffice: 'Av. Houba de Strooper 156 bte 11, 1020 Bruxelles, Belgia',
  email: 'polonia@live.be',
  matricule: '09647',
  supervisor: {
    name: 'Autorité de protection des données / Gegevensbeschermingsautoriteit',
    address: 'Rue de la Presse 35, 1000 Bruxelles',
    url: 'https://www.autoriteprotectiondonnees.be/',
  },
  updated: '09.09.2026',
};

export const CLUB_INFO = {
  name: 'FC Polonia Bruksela',
  nameFr: 'FC Polonia Bruxelles',
  founded: 1986,
  matricule: '09647',
  rbfaClub: '6360',
  email: 'polonia@live.be',
  facebook: 'https://www.facebook.com/fcpolonia.bruksela/',
  tiktok: 'https://www.tiktok.com/@poloniabruksela',
  support: 'https://polonia.aktualnosci.be/',
  venues: [
    {
      label: 'Stadion klubu — mecze domowe',
      name: 'Stade Fallon',
      address: 'Chem. du Struykbeken 2, 1200 Woluwé-Saint-Lambert, Belgia',
      note: 'Aktualny obiekt FC Polonia Bruksela.',
    },
    {
      label: 'Obiekt historyczny — okres Limelette',
      name: 'Pôle Sportif de Limelette',
      address: 'Avenue des Sorbiers 120a, 1342 Limelette (Ottignies-Louvain-la-Neuve)',
      note: 'Boisko syntetyczne. Adres widniejący w rejestrze federacji przy matricule 09647.',
    },
    {
      label: 'Obiekt historyczny — od 2015',
      name: 'Parc Sportif des Trois Tilleuls',
      address: 'Avenue Léopold Wiener 60, 1170 Bruxelles (Watermael-Boitsfort)',
      note: 'Miejsce meczów domowych po wejściu klubu do rozgrywek federacji.',
    },
  ],
  // Adres administracyjny podawany na archiwalnej stronie klubu.
  adminAddress: 'Avenue des Nymphes 1A, 1170 Bruxelles',
};

/* --------------------------------------------------------------- AKTUALNOŚCI */
/* Kategorie: AKTUALNOŚCI, MECZ, WYNIK, TRANSFER, KLUB, HISTORIA, SPONSORZY, KIBICE
   Nowy wpis: dopisz obiekt na początku tablicy. Zdjęcie główne = id slotu
   (obraz wgrywa administrator przeciągając plik w miejsce zdjęcia).        */

export const NEWS_CATEGORIES = ['WSZYSTKIE', 'AKTUALNOŚCI', 'MECZ', 'WYNIK', 'TRANSFER', 'KLUB', 'HISTORIA', 'SPONSORZY', 'KIBICE'];

export const NEWS = [
  {
    slug: '40-lat-polonii',
    category: 'HISTORIA',
    date: '2026-07-01',
    title: '40 lat FC Polonia Bruksela',
    lead: 'Rok 2026 zamyka czwartą dekadę istnienia polonijnego klubu z Brukseli. Herb nosi datę 1986 — i to od niej liczy się cała historia.',
    photoId: 'news-40lat',
    photoCaption: 'Jubileuszowy wieczór klubu — 40 lat FC Polonia Bruksela.',
    heroPhoto: 'assets/news/40-lat-hero.jpg',
    // Galeria wpisu: prawdziwe pliki, nie sidecar z panelu. Kolejność = g1, g2, g3.
    gallery: ['assets/news/40-lat-polonii.jpg'],
    body: [
      'Czterdzieści lat to w amatorskiej piłce dłużej niż większość klubów wytrzymuje. FC Polonia Bruksela powstała w 1986 roku jako klub polskiej emigracji w Belgii i przez cztery dekady pozostała tym samym: miejscem spotkania, a nie tylko drużyną.',
      'Jubileusz 1986–2026 jest okazją do zebrania archiwum — zdjęć, składów, wyników i relacji. Materiały z prywatnych zbiorów kibiców i byłych zawodników są dla klubu równie ważne jak dokumenty federacji.',
      'Pełną, chronologiczną historię klubu — od Saint-Gilles i lat w federacji amatorskiej, przez matricule 09647, po powrót do nazwy FC Polonia Bruksela — publikujemy w dziale HISTORIA.',
    ],
    related: ['matricule-09647'],
  },
  {
    slug: 'matricule-09647',
    category: 'KLUB',
    date: '2026-06-15',
    title: 'Matricule 09647 — jak Polonia weszła do struktur belgijskiej federacji',
    lead: 'W maju 2015 roku klub poinformował o otrzymaniu numeru matricule 09647 w belgijskiej federacji piłkarskiej. Był to pierwszy taki przypadek w historii polonijnej piłki w Belgii.',
    photoId: 'news-matricule',
    photoCaption: 'Herb klubu i numer matricule 09647 nadany przez belgijską federację.',
    // Grafika kwadratowa — dlatego wpis podaje własne proporcje kadru.
    heroPhoto: 'assets/news/matricule-09647.jpg',
    cardPhoto: 'assets/news/matricule-09647-card.jpg',
    heroRatio: '1/1',
    heroMaxW: '560px',
    body: [
      'Do 2015 roku Polonia grała w rozgrywkach federacji amatorskiej. Komunikat klubu z maja 2015 roku zapowiadał zmianę: przejście do URBSFA — oficjalnej belgijskiej federacji piłkarskiej — i przyznanie numeru matricule 09647.',
      'Wraz z wejściem do struktur federacji zmieniła się oficjalna nazwa: klub został zarejestrowany jako FC Polonia Boitsfort. W herbie miejsce Brukseli zajął Boitsfort. Mecze domowe zaplanowano na niedziele, w okolicach godziny piętnastej, na Parc Sportif des Trois Tilleuls przy Avenue Léopold Wiener 60 w Brukseli.',
      'Numer matricule jest w Belgii trwałym identyfikatorem klubu — nie zmienia się wraz z nazwą ani z miejscem rozgrywek. Dlatego 09647 pozostaje najpewniejszym sposobem odróżnienia FC Polonia Bruksela od innych drużyn o podobnej nazwie, a strona klubu wykorzystuje go do rozpoznawania właściwego wiersza w tabeli.',
    ],
    related: ['40-lat-polonii'],
  },
];

/* ------------------------------------------------------------------ DRUŻYNA */
/* Świadomie puste. Nazwiska zawodników wprowadza administrator.
   Format: { number, first, last, position: 'GK'|'DF'|'MF'|'FW',
             since, photoId, note }                                         */

/* Zdjęcia: photo = poza statyczna, photoAction = zdjęcie w ruchu (hover).
   Oba wykadrowane identycznie (3:4, ten sam prostokąt dla pary).
   NAZWISKA I NUMERY uzupełnia klub — nie są zmyślane. */
export const SQUAD = [
  { number: '12', first: 'Sebastian', last: 'Steckiewicz', position: 'GK', photo: 'assets/kadra/gk-2-still.jpg', photoAction: 'assets/kadra/gk-2-action.jpg' },
  { number: '', first: 'Maxime', last: 'Kapczuk', position: 'GK', photo: 'assets/kadra/gk-3-still.jpg', photoAction: 'assets/kadra/gk-3-action.jpg' },
  { number: '', first: 'Marek', last: 'Truchel', position: 'GK', photo: 'assets/kadra/gk-1-still.jpg', photoAction: 'assets/kadra/gk-1-action.jpg' },
  // Sylwetka zastępcza do czasu sesji zdjęciowej — ten sam plik posłuży każdemu nowemu zawodnikowi.
  { number: '1', first: 'Sebastian', last: 'Popławski', position: 'GK', photo: 'assets/kadra/brak-zdjecia.jpg' },
  { number: '25', first: 'Karol', last: 'Maj', position: 'DF', photo: 'assets/kadra/df-maj-still.jpg', photoAction: 'assets/kadra/df-maj-action.jpg' },
  { number: '4', first: 'Adrian', last: 'Trusiak', position: 'DF', photo: 'assets/kadra/df-trusiak-still.jpg', photoAction: 'assets/kadra/df-trusiak-action.jpg' },
  { number: '77', first: 'Julian', last: 'Baworski', position: 'DF', photo: 'assets/kadra/df-baworski-action.jpg', photoAction: 'assets/kadra/df-baworski-still.jpg' },
  { number: '', first: 'Daniel', last: 'Gołębiewski', position: 'DF', photo: 'assets/kadra/df-golebiewski-still.jpg', photoAction: 'assets/kadra/df-golebiewski-action.jpg' },
  { number: '6', first: 'Mateusz', last: 'Maksimiuk', position: 'DF', photo: 'assets/kadra/df-maksimiuk-still.jpg', photoAction: 'assets/kadra/df-maksimiuk-action.jpg' },
  { number: '28', first: 'Alex', last: 'Kapczuk', position: 'DF', photo: 'assets/kadra/df-akapczuk-still.jpg', photoAction: 'assets/kadra/df-akapczuk-action.jpg' },
  { number: '2', first: 'Jakub', last: 'Wiszowaty', position: 'DF', photo: 'assets/kadra/df-wiszowaty-still.jpg', photoAction: 'assets/kadra/df-wiszowaty-action.jpg' },
  { number: '8', first: 'Jakub', last: 'Wiśniewski', position: 'DF', photo: 'assets/kadra/df-jwisniewski-still.jpg', photoAction: 'assets/kadra/df-jwisniewski-action.jpg' },
  { number: '21', first: 'Emil', last: 'Strapczuk', position: 'DF', photo: 'assets/kadra/df-strapczuk-still.jpg', photoAction: 'assets/kadra/df-strapczuk-action.jpg' },
  { number: '5', first: 'Sebastian', last: 'Żeruń', position: 'DF', photo: 'assets/kadra/df-zerun-action.jpg', photoAction: 'assets/kadra/df-zerun-still.jpg' },
  { number: '15', first: 'Mateusz', last: 'Puchalski', position: 'DF', photo: 'assets/kadra/mf-puchalski-action.jpg', photoAction: 'assets/kadra/mf-puchalski-still.jpg' },
  { number: '3', first: 'Karol', last: 'Kosk', position: 'DF', photo: 'assets/kadra/brak-zdjecia.jpg' },
  { number: '20', first: 'Filip', last: 'Fornalski', position: 'DF', photo: 'assets/kadra/brak-zdjecia.jpg' },
  { number: '', first: 'Patryk', last: 'Węgliński', position: 'DF', photo: 'assets/kadra/brak-zdjecia.jpg' },
  { number: '16', first: 'Patryk', last: 'Czajka', position: 'MF', photo: 'assets/kadra/mf-czajka-still.jpg', photoAction: 'assets/kadra/mf-czajka-action.jpg' },
  { number: '', first: 'Dominik', last: 'Zieliński', position: 'MF', photo: 'assets/kadra/mf-zielinski-still.jpg', photoAction: 'assets/kadra/mf-zielinski-action.jpg' },
  { number: '', first: 'Aleksander', last: 'Piechowski', position: 'MF', photo: 'assets/kadra/mf-piechowski-still.jpg', photoAction: 'assets/kadra/mf-piechowski-action.jpg' },
  { number: '13', first: 'Rafał', last: 'Wiśniewski', position: 'MF', photo: 'assets/kadra/mf-rwisniewski-still.jpg', photoAction: 'assets/kadra/mf-rwisniewski-action.jpg' },
  { number: '30', first: 'Damian', last: 'Jarząbek', position: 'MF', photo: 'assets/kadra/mf-jarzabek-still.jpg', photoAction: 'assets/kadra/mf-jarzabek-action.jpg' },
  { number: '23', first: 'Artur', last: 'Radziszewski', position: 'MF', photo: 'assets/kadra/mf-radziszewski-still.jpg', photoAction: 'assets/kadra/mf-radziszewski-action.jpg' },
  { number: '17', first: 'Artur', last: 'Książek', position: 'MF', photo: 'assets/kadra/brak-zdjecia.jpg' },
  { number: '', first: 'Dominik', last: 'Iwańczuk', position: 'MF', photo: 'assets/kadra/brak-zdjecia.jpg' },
  { number: '10', first: 'Artur', last: 'Ciborowski', position: 'FW', photo: 'assets/kadra/fw-ciborowski-still.jpg', photoAction: 'assets/kadra/fw-ciborowski-action.jpg' },
  { number: '19', first: 'Michał', last: 'Niewiński', position: 'FW', photo: 'assets/kadra/fw-niewinski-still.jpg', photoAction: 'assets/kadra/fw-niewinski-action.jpg' },
  { number: '9', first: 'Mateusz', last: 'Rusiniak', position: 'FW', photo: 'assets/kadra/fw-rusiniak-still.jpg', photoAction: 'assets/kadra/fw-rusiniak-action.jpg' },
  { number: '11', first: 'Hubert', last: 'Karwacki', position: 'FW', photo: 'assets/kadra/fw-karwacki-still.jpg', photoAction: 'assets/kadra/fw-karwacki-action.jpg' },
  { number: '27', first: 'Fryderyk', last: 'Borowy', position: 'FW', photo: 'assets/kadra/fw-borowy-still.jpg', photoAction: 'assets/kadra/fw-borowy-action.jpg' },
  { number: '', first: 'Andrei', last: 'Krechak', position: 'FW', photo: 'assets/kadra/brak-zdjecia.jpg' },
];

export const POSITION_GROUPS = [
  { key: 'GK', label: 'BRAMKARZE' },
  { key: 'DF', label: 'OBROŃCY' },
  { key: 'MF', label: 'POMOCNICY' },
  { key: 'FW', label: 'NAPASTNICY' },
];

/* Sztab i zarząd — wyłącznie dane wprowadzone przez administratora. */
export const STAFF = [
  {
    role: 'Trener',
    first: 'Michał',
    last: 'Łukasiuk',
    photo: 'assets/board/lukasik-still.jpg',
    photoAction: 'assets/board/lukasik-action.jpg',
  },
  {
    role: 'Asystent trenera',
    first: 'Kazimierz',
    last: 'Zieliński',
    photo: 'assets/board/zielinski-action.jpg',
    photoAction: 'assets/board/zielinski-still.jpg',
  },
  {
    role: 'Kierownik drużyny',
    first: 'Krzysztof',
    last: 'Średnicki',
    photo: 'assets/board/ks-still.jpg',
    photoAction: 'assets/board/ks-action.jpg',
  },
];
/* Zarząd — wyłącznie osoby zgłoszone przez klub.
   photo = poza spokojna, photoAction = zdjęcie w ruchu (hover). */
export const BOARD = [
  {
    role: 'Prezes klubu',
    first: 'Piotr',
    last: 'Siedlecki',
    photo: 'assets/board/prezes-action.jpg',
    photoAction: 'assets/board/prezes-still.jpg',
  },
  {
    role: 'Członek zarządu',
    first: 'Kazimierz',
    last: 'Zieliński',
    photo: 'assets/board/zielinski-action.jpg',
    photoAction: 'assets/board/zielinski-herb.jpg',
  },
  {
    role: 'Członek zarządu',
    first: 'Paweł',
    last: 'Sidorczuk',
    photo: 'assets/board/sidorczuk-action.jpg',
    photoAction: 'assets/board/sidorczuk-still.jpg',
  },
];

/* ---------------------------------------------------------------- SPONSORZY */
/* Kategorie: SPONSOR GŁÓWNY, SPONSORZY, PARTNERZY, PARTNER MEDIALNY.
   Format: { name, tier, url, logo }                                        */

export const SPONSORS = [
  {
    name: 'Aktualnosci.be',
    tier: 'PARTNER MEDIALNY',
    url: 'https://aktualnosci.be/',
    // Logo wgrywane przez administratora w slocie o tym id (wersja niebieska
    // na jasnym tle). Pliki źródłowe mają w nazwie nawiasy, których nie da się
    // wczytać automatycznie — po zmianie nazwy można podać ścieżkę wprost.
    logo: 'assets/partners/aktualnosci-be-niebieski-kadr.png',
    note: 'Oficjalny partner medialny klubu. Polskie wiadomości prosto z Belgii.',
  },
  {
    name: 'Rénovation Brachole SRL',
    tier: 'SPONSORZY',
    // Firma nie podała adresu strony — kafelek prowadzi na numer z logotypu.
    url: 'tel:+32473526665',
    logo: 'assets/partners/brachole-srl.jpg',
    note: 'Entreprise générale — renowacje i prace ogólnobudowlane.',
  },
  {
    name: 'AGPOL SRL Toiture',
    tier: 'SPONSORZY',
    url: '',
    logo: 'assets/partners/agpol-srl-toiture.png',
    note: 'Dekarstwo i pokrycia dachowe.',
  },
];

export const SPONSOR_TIERS = ['SPONSOR GŁÓWNY', 'SPONSORZY', 'PARTNERZY', 'PARTNER MEDIALNY'];

/* -------------------------------------------------------------------- SKLEP */

/* Wyłącznik sklepu. `false` = podstrona `#/sklep` pokazuje zapowiedź „w
   budowie", dokładnie jak przed uruchomieniem sprzedaży. `true` = pokazuje
   siatkę produktów z SHOP i formularz zamówienia.

   NIE przestawiaj na `true`, dopóki każdy produkt nie ma ceny (`price`) i
   zdjęcia w `assets/sklep/`. Sklep bez cen albo z pustymi ramkami wygląda
   gorzej niż uczciwa zapowiedź. */
export const SHOP_OPEN = false;

/* Asortyment sklepu klubowego.

   Pola jednego produktu:
     id      — krótki, unikalny klucz; nie pokazuje się kibicowi
     name    — nazwa na karcie i na liście w formularzu zamówienia
     price   — liczba w euro, bez waluty; 0 = karta pokaże „Cena do ustalenia"
     sizes   — lista rozmiarów; [] przy produkcie bez rozmiarów (szalik)
     colors  — lista kolorów; [] gdy produkt jest w jednym kolorze
     photo   — ścieżka do zdjęcia w assets/sklep/; '' = kafelek zastępczy
     note    — jedno zdanie o produkcie (dopisz tłumaczenia w i18n.js)
     badge   — plakietka na zdjęciu, np. 'NOWOŚĆ'; '' = brak
     soldOut — true oznacza produkt jako niedostępny i chowa przycisk

   Ceny są celowo puste (0) — wpisz rzeczywiste, zanim ustawisz SHOP_OPEN. */
export const SHOP = [
  {
    id: 'szalik-40-lat',
    name: 'Szalik 40 lat tradycji',
    price: 0,
    sizes: [],
    colors: [],
    photo: 'assets/sklep/szalik-40-lat.jpg',
    note: 'Dziany szalik na czterdziestolecie klubu, z herbem na obu końcach i napisem POLONIA RAZEM!',
    badge: '',
    soldOut: false,
  },
  {
    id: 'bluza-z-kapturem',
    name: 'Bluza z kapturem',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    photo: 'assets/sklep/bluza-z-kapturem.jpg',
    note: 'Czarna bluza z szarymi rękawami i biało-czerwoną opaską, z nadrukiem WE ARE POLONIA na plecach.',
    badge: '',
    soldOut: false,
  },
  {
    id: 'polo-czerwone',
    name: 'Koszulka polo z herbem',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    photo: 'assets/sklep/polo-czerwone.jpg',
    note: 'Czerwone polo z białą lamówką i haftowanym herbem klubu na piersi.',
    badge: '',
    soldOut: false,
  },
  {
    id: 'koszulka-polonia-razem',
    name: 'Koszulka POLONIA RAZEM!',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['czarna', 'biała'],
    photo: 'assets/sklep/koszulka-polonia-razem.jpg',
    note: 'Herb w wieńcu i hasło klubu w czerni i złocie. Do wyboru wersja czarna albo biała.',
    badge: '',
    soldOut: false,
  },
  {
    id: 'koszulka-powstanie',
    name: 'Koszulka Powstanie Warszawskie',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['czarna', 'biała'],
    photo: 'assets/sklep/koszulka-powstanie-warszawskie.jpg',
    note: 'Nadruk pamiątkowy z powstańcem i herbem klubu, z dopiskiem CZEŚĆ I CHWAŁA BOHATEROM.',
    badge: '',
    soldOut: false,
  },
  {
    id: 'koszulka-polonia-script',
    name: 'Koszulka Polonia',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    photo: 'assets/sklep/koszulka-polonia-script.jpg',
    note: 'Czarna koszulka z czerwonym napisem Polonia w stylu baseballowym i herbem w wieńcu.',
    badge: '',
    soldOut: false,
  },
  {
    id: 'koszulka-trzy-paski',
    name: 'Koszulka z pasami',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    photo: 'assets/sklep/koszulka-trzy-paski.jpg',
    note: 'Czarna koszulka z biało-czerwonymi pasami, herbem na środku i polską flagą na rękawie.',
    badge: '',
    soldOut: false,
  },
  {
    id: 'koszulka-extreme-life',
    name: 'Koszulka Extreme Life',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    photo: 'assets/sklep/koszulka-extreme-life.jpg',
    note: 'Czarna koszulka z godłem Polski obok herbu klubu i napisem Extreme Life.',
    badge: '',
    soldOut: false,
  },
  {
    id: 'koszulka-tc-fanace',
    name: 'Koszulka TC Fanace',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    photo: 'assets/sklep/koszulka-tc-fanace.jpg',
    note: 'Czarna koszulka z kibicowskim nadrukiem i napisem Polonia Bruksela.',
    badge: '',
    soldOut: false,
  },
];

/* -------------------------------------------------------- BACKSTAGE POLONIA */

/* Kanał wideo klubu. Adres używany w przyciskach „Oglądaj na YouTube"
   i „Subskrybuj". */
export const BACKSTAGE_CHANNEL = 'https://www.youtube.com/channel/UCpIJHhaDBMHfVxDackTLD1A';

/* Odcinki Backstage Polonia — podstrona `#/backstage`.
   Pierwszy wpis na liście jest tym, który pokazuje się jako NAJNOWSZY
   ODCINEK na górze podstrony, więc nowe materiały dopisuj NA POCZĄTKU.

   Jak dodać odcinek — trzy kroki:
     1. weź identyfikator filmu z adresu YouTube
        (youtube.com/watch?v=TO_JEST_ID),
     2. pobierz miniaturę i zapisz ją jako assets/backstage/<ID>.jpg
        (źródło: https://i.ytimg.com/vi/<ID>/maxresdefault.jpg; przeskaluj
        do ok. 854 px szerokości, żeby podstrona nie puchła),
     3. dopisz wpis poniżej.

   Miniatury trzymamy U SIEBIE, nie linkujemy ich z serwerów Google. Dzięki
   temu podstrona nie wysyła nic do Google, dopóki gość sam nie kliknie
   odtwarzania — dopiero wtedy, po zgodzie, wczytuje się odtwarzacz.

   Pola:
     id       — identyfikator filmu na YouTube
     title    — tytuł odcinka (dopisz tłumaczenia w i18n.js)
     date     — data publikacji, RRRR-MM-DD
     kind     — 'mecz' | 'skrot' | 'klub'; steruje tylko etykietą na kafelku
     round    — numer kolejki albo null, gdy materiał nie dotyczy meczu
     opponent — nazwa rywala albo ''
     score    — wynik z perspektywy Polonii, np. '2:1', albo ''
     outcome  — 'W' zwycięstwo | 'R' remis | 'P' porażka | '' gdy nie dotyczy
     lead     — jedno-dwa zdania opisu (dopisz tłumaczenia w i18n.js)

   Wyniki i rywale poniżej pochodzą z terminarza RBFA (data/rbfa.json),
   nie z samych tytułów filmów. */
export const BACKSTAGE = [
  {
    id: '_i0ehlfDtVY',
    title: 'Gol dla ukochanej. Zwycięstwo uciekło w 91. minucie',
    date: '2026-10-14',
    kind: 'mecz',
    round: 6,
    opponent: 'ROFC Stockel B',
    score: '2:2',
    outcome: 'R',
    lead: 'Pierwszy gol Michała Niewińskiego w sezonie i cieszynka dedykowana dziewczynie. Po bezbramkowej połowie gospodarze wyszli na prowadzenie, Polonia odwróciła wynik w pięć minut, a remis przypieczętowała 91. minuta.',
  },
  {
    id: 'uGnKAQW9Rk4',
    title: 'Rodzina Polonii rośnie. Wspólny grill, kibice i świetna atmosfera',
    date: '2026-10-12',
    kind: 'klub',
    round: null,
    opponent: '',
    score: '',
    outcome: '',
    lead: 'Przy okazji meczu oldbojów klub zaprosił zawodników, rodziny i kibiców na wspólnego grilla. Tego dnia wynik był najmniej ważny — liczyły się rozmowy, dzieci i czas spędzony razem.',
  },
  {
    id: 'zrvy4gjmE24',
    title: 'Połamany palec i walka do końca. Wygrywamy 2:1',
    date: '2026-10-09',
    kind: 'mecz',
    round: 5,
    opponent: 'RU Auderghem B',
    score: '2:1',
    outcome: 'W',
    lead: 'Piąta kolejka od środka: bramka Fryderyka Borowego w 9. minucie, wyrównanie rywali tuż przed przerwą i walka do ostatniego gwizdka.',
  },
  {
    id: 'gXkDM7Nb4Lw',
    title: 'Patryk Węgliński już w Brukseli. Dołącza do FC Polonia',
    date: '2026-10-08',
    kind: 'klub',
    round: null,
    opponent: '',
    score: '',
    outcome: '',
    lead: 'Transfer sfinalizowany jeszcze w oknie transferowym, a na początku października Patryk przeprowadził się do Brukseli. Pierwsze dni nowego zawodnika w klubie.',
  },
  {
    id: 'zdm78l7stzM',
    title: 'FC Polonia Bruksela 2:1 RU Auderghem B — wszystkie bramki',
    date: '2026-10-04',
    kind: 'skrot',
    round: 5,
    opponent: 'RU Auderghem B',
    score: '2:1',
    outcome: 'W',
    lead: 'Skrót spotkania i wszystkie trzy bramki. Dla Polonii trafili Fryderyk Borowy i Artur Ciborowski.',
  },
  {
    id: 'bxi8i1PWuV0',
    title: 'Miało być 3:1, skończyło się 4:0',
    date: '2026-09-30',
    kind: 'mecz',
    round: 4,
    opponent: 'Black Star NOH FC B',
    score: '4:0',
    outcome: 'W',
    lead: 'Czwarta kolejka za kulisami: szatnia przed pierwszym gwizdkiem, cztery bramki i rozmowy po meczu wygranym do zera.',
  },
  {
    id: '7xlps1UBzZU',
    title: 'A gdyby Polonia zagrała w Lidze Mistrzów?',
    date: '2026-09-28',
    kind: 'klub',
    round: null,
    opponent: '',
    score: '',
    outcome: '',
    lead: 'Wyjście na murawę z dziecięcą eskortą, przywitanie z sędziami i rywalem — zwykły mecz w niezwykłym, wielkim klimacie.',
  },
  {
    id: 'GJqsZoyZSYc',
    title: '7 awansów do Jupiler Pro League? Gdzie gra FC Polonia Bruksela',
    date: '2026-09-26',
    kind: 'klub',
    round: null,
    opponent: '',
    score: '',
    outcome: '',
    lead: 'Ósmy poziom rozgrywek w Belgii, trzynaście drużyn, dwadzieścia cztery mecze i aż siedem szczebli dzielących Polonię od ekstraklasy.',
  },
  {
    id: 'ewnE3gfn1Y4',
    title: '7 awansów do Jupiler Pro League? Gdzie gra FC Polonia Bruksela',
    date: '2026-09-26',
    kind: 'klub',
    round: null,
    opponent: '',
    score: '',
    outcome: '',
    lead: 'Belgijska piramida piłkarska wytłumaczona prosto — i miejsce, które zajmuje w niej nasz klub.',
  },
  {
    id: 'lRoh5bTlgnE',
    title: 'Kazik na podsłuchu. Rozgrzewka przed 3. kolejką',
    date: '2026-09-23',
    kind: 'mecz',
    round: 3,
    opponent: 'FC Anderlecht Sport Milan A',
    score: '1:3',
    outcome: 'P',
    lead: 'Kazimierz Zieliński, asystent trenera, z mikrofonem podczas rozgrzewki. Przygotowania do meczu słyszane od środka.',
  },
  {
    id: '1hUhP8I1Exs',
    title: 'Rusza Backstage Polonia Bruksela',
    date: '2026-09-23',
    kind: 'klub',
    round: null,
    opponent: '',
    score: '',
    outcome: '',
    lead: 'Zapowiedź kanału i tego, co będziemy pokazywać przez cały sezon.',
  },
];

/* ------------------------------------------------------------------ GALERIA */

export const GALLERIES = [
  { key: 'barwy', label: 'NOSISZ NASZE BARWY', count: 3, tilePos: 'center 8%', photos: [
    'assets/gallery/barwy/barwy-01.jpg',
    'assets/gallery/barwy/barwy-03.jpg',
    'assets/gallery/barwy/barwy-04.jpg',
    'assets/gallery/barwy/barwy-05.jpg',
    'assets/gallery/barwy/barwy-06.jpg',
    'assets/gallery/barwy/barwy-07.jpg',
    'assets/gallery/barwy/barwy-08.jpg',
    'assets/gallery/barwy/barwy-09.jpg',
    'assets/gallery/barwy/barwy-10.jpg',
    'assets/gallery/barwy/barwy-11.jpg',
    'assets/gallery/barwy/barwy-12.jpg',
    'assets/gallery/barwy/barwy-13.jpg',
    'assets/gallery/barwy/barwy-14.jpg',
    'assets/gallery/barwy/barwy-15.jpg',
    'assets/gallery/barwy/barwy-16.jpg',
    'assets/gallery/barwy/barwy-17.jpg',
    'assets/gallery/barwy/barwy-18.jpg',
    'assets/gallery/barwy/barwy-19.jpg',
    'assets/gallery/barwy/barwy-20.jpg',
    'assets/gallery/barwy/barwy-21.jpg',
    'assets/gallery/barwy/barwy-22.jpg',
    'assets/gallery/barwy/barwy-23.jpg',
    'assets/gallery/barwy/barwy-24.jpg',
    'assets/gallery/barwy/barwy-25.jpg',
    'assets/gallery/barwy/barwy-26.jpg',
    'assets/gallery/barwy/barwy-27.jpg',
    'assets/gallery/barwy/barwy-28.jpg',
    'assets/gallery/barwy/barwy-29.jpg',
    'assets/gallery/barwy/barwy-30.jpg',
  ] },
  { key: 'mecze', label: 'MECZE', count: 4, photos: [
    'assets/gallery/mecze/mecze-01.jpg',
    'assets/gallery/mecze/mecze-02.jpg',
    'assets/gallery/mecze/mecze-03.jpg',
    'assets/gallery/mecze/mecze-04.jpg',
    'assets/gallery/mecze/mecze-05.jpg',
    'assets/gallery/mecze/mecze-06.jpg',
    'assets/gallery/mecze/mecze-07.jpg',
    'assets/gallery/mecze/mecze-08.jpg',
    'assets/gallery/mecze/mecze-09.jpg',
    'assets/gallery/mecze/mecze-10.jpg',
    'assets/gallery/mecze/mecze-11.jpg',
    'assets/gallery/mecze/mecze-12.jpg',
    'assets/gallery/mecze/mecze-13.jpg',
    'assets/gallery/mecze/mecze-14.jpg',
    'assets/gallery/mecze/mecze-15.jpg',
  ] },
  { key: 'treningi', label: 'TRENINGI', count: 3 },
  { key: 'kulisy', label: 'KULISY', count: 3, photos: [
    'assets/gallery/kulisy/469.jpg',
    'assets/gallery/kulisy/473.jpg',
    'assets/gallery/kulisy/450.jpg',
    'assets/gallery/kulisy/475.jpg',
    'assets/gallery/kulisy/452.jpg',
    'assets/gallery/kulisy/453.jpg',
    'assets/gallery/kulisy/454.jpg',
    'assets/gallery/kulisy/455.jpg',
    'assets/gallery/kulisy/457.jpg',
    'assets/gallery/kulisy/458.jpg',
    'assets/gallery/kulisy/459.jpg',
    'assets/gallery/kulisy/460.jpg',
    'assets/gallery/kulisy/461.jpg',
    'assets/gallery/kulisy/465.jpg',
    'assets/gallery/kulisy/472.jpg',
    'assets/gallery/kulisy/474.jpg',
  ] },
  { key: 'kibice', label: 'KIBICE', count: 3, photos: [
    'assets/gallery/kibice/kibice-01.jpg',
    'assets/gallery/kibice/kibice-02.jpg',
    'assets/gallery/kibice/kibice-03.jpg',
    'assets/gallery/kibice/kibice-04.jpg',
    'assets/gallery/kibice/kibice-05.jpg',
    'assets/gallery/kibice/kibice-06.jpg',
    'assets/gallery/kibice/kibice-07.jpg',
    'assets/gallery/kibice/kibice-08.jpg',
    'assets/gallery/kibice/kibice-09.jpg',
    'assets/gallery/kibice/kibice-10.jpg',
    'assets/gallery/kibice/kibice-11.jpg',
  ] },
  { key: 'wydarzenia', label: 'WYDARZENIA', count: 3 },
  { key: 'historia', label: 'HISTORIA', count: 3 },
  { key: '40-lecie', label: '40-LECIE', count: 3 },
];

/* ------------------------------------------------------------------ ARCHIWUM */
/* status: 'pending'  — brak zweryfikowanej tabeli końcowej (nie wymyślamy jej)
   status: 'live'     — sezon bieżący, dane z warstwy live
   note                — wyłącznie fakty potwierdzone w źródłach            */

export const SEASONS = [
  { season: '2026/27', name: 'FC Polonia Bruksela', status: 'live', note: 'Sezon bieżący. Rozgrywki, terminarz i klasyfikacja pobierane są automatycznie.' },
  { season: '2025/26', name: 'FC Polonia Bruxelles', status: 'pending', note: 'Serwis Foot24 prowadzi kalendarze klubu dla sezonu 2025-2026 pod nazwą FC POLONIA BRUXELLES.' },
  { season: '2024/25', name: 'FC Polonia Limelette', status: 'pending', note: '' },
  { season: '2023/24', name: 'FC Polonia Limelette', status: 'pending', note: 'Klub występuje w podziałach serii Brabancji Walońskiej pod nazwą Polonia Limelette.' },
  { season: '2022/23', name: 'FC Polonia Limelette', status: 'pending', note: 'Prasa regionalna (L\u2019Avenir, marzec 2023) opisuje mecze Polonii Limelette w P3C, w walce o miejsce w środku tabeli.' },
  { season: '2021/22', name: 'FC Polonia Boitsfort', status: 'pending', note: 'Zmiana nazwy klubu na FC Polonia Limelette wchodzi w życie z dniem 1 lipca 2022 (lista zmian nazw RBFA).' },
  { season: '2020/21', name: 'FC Polonia Boitsfort', status: 'pending', note: 'Sezon rozgrywany w okresie pandemii COVID-19 — rozgrywki amatorskie w Belgii zostały przerwane.' },
  { season: '2019/20', name: 'FC Polonia Boitsfort', status: 'pending', note: 'Sezon przerwany w marcu 2020 z powodu pandemii COVID-19.' },
  { season: '2018/19', name: 'FC Polonia Boitsfort', status: 'pending', note: '' },
  { season: '2017/18', name: 'FC Polonia Boitsfort', status: 'pending', note: '' },
  { season: '2016/17', name: 'FC Polonia Boitsfort', status: 'pending', note: 'Ostatni sezon przed podziałem prowincji Brabancji na skrzydła językowe (od 1 lipca 2017).' },
  { season: '2015/16', name: 'FC Polonia Boitsfort', status: 'pending', note: 'Pierwszy sezon w rozgrywkach federacji po przyznaniu matricule 09647. Mecze domowe na Parc Sportif des Trois Tilleuls.' },
];

/* -------------------------------------------------------- ŹRÓDŁA I ARCHIWA */

export const SOURCES_LIST = [
  { label: 'Le Vif — „Les héros du blason”', url: 'https://www.levif.be/sport/autres-sports/les-heros-du-blason/', kind: 'Prasa' },
  { label: 'Kurier Podlaski — „Piłka nożna w Brukseli — FC Polonia”', url: 'https://kurierpodlaski.pl/artykul/pika-nona-w-brukseli--fc-polonia-n399873', kind: 'Prasa' },
  { label: 'RBFA — profil klubu (matricule 09647)', url: 'https://www.rbfa.be/fr/club/6360/infos', kind: 'Federacja' },
  { label: 'RBFA — lista zmian nazw klubów, 1.07.2022', url: 'https://drupal2018.assets.rbfa.be/s3fs-public/reports/2022-06/Changement%20de%CC%81nomination%20Clubs01072022.pdf', kind: 'Federacja' },
  { label: 'FFA — Football Francophone Amateur', url: 'https://www.ffa.be/', kind: 'Federacja' },
  { label: 'Foot24.be — profil i kalendarze klubu', url: 'https://www.foot24.be/fr/clubs/fc-polonia-limelette', kind: 'Agregator' },
  { label: 'RSSSF — tabele belgijskie 2016/17', url: 'https://www.rsssf.org/tablesb/belg2017.html', kind: 'Archiwum' },
  { label: 'RSSSF — tabele belgijskie 2017/18', url: 'https://www.rsssf.org/tablesb/belg2018.html', kind: 'Archiwum' },
  { label: 'RSSSF — tabele belgijskie 2018/19', url: 'https://www.rsssf.org/tablesb/belg2019.html', kind: 'Archiwum' },
  { label: 'RSSSF — tabele belgijskie 2019/20', url: 'https://www.rsssf.org/tablesb/belg2020.html', kind: 'Archiwum' },
  { label: 'Walfoot.be', url: 'https://www.walfoot.be/', kind: 'Archiwum' },
  { label: 'Archiwalna strona klubu — poloniabruksela.futbolowo.pl', url: 'https://poloniabruksela.futbolowo.pl/o-klubie', kind: 'Archiwum klubu' },
  { label: 'Archiwalna strona klubu — fcpolonia.be', url: 'https://www.fcpolonia.be/', kind: 'Archiwum klubu' },
];
