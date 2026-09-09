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
  placeholder: true,
  legalName: 'FC Polonia Bruxelles ASBL',
  legalForm: 'ASBL / VZW — stowarzyszenie bez celu zarobkowego',
  enterpriseNumber: 'BE 0700.000.000',
  registeredOffice: 'Chem. du Struykbeken 2, 1200 Woluwé-Saint-Lambert, Belgia',
  email: 'polonia@live.be',
  matricule: '09647',
  supervisor: {
    name: 'Autorité de protection des données / Gegevensbeschermingsautoriteit',
    address: 'Rue de la Presse 35, 1000 Bruxelles',
    url: 'https://www.autoriteprotectiondonnees.be/',
  },
  updated: '31.08.2026',
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
      address: 'Chem. du Struykbeken, 1200 Woluwé-Saint-Lambert, Belgia',
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
    photoCaption: 'Zdjęcie do uzupełnienia z archiwum klubu.',
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
    photoCaption: 'Zdjęcie do uzupełnienia z archiwum klubu.',
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
  { number: '', first: 'Sebastian', last: 'Steckiewicz', position: 'GK', photo: 'assets/squad/gk-2-still.jpg', photoAction: 'assets/squad/gk-2-action.jpg' },
  { number: '', first: 'Maxime', last: 'Kapczuk', position: 'GK', photo: 'assets/squad/gk-3-still.jpg', photoAction: 'assets/squad/gk-3-action.jpg' },
  { number: '', first: 'Marek', last: 'Truchel', position: 'GK', photo: 'assets/squad/gk-1-still.jpg', photoAction: 'assets/squad/gk-1-action.jpg' },
  { number: '', first: 'Karol', last: 'Maj', position: 'DF', photo: 'assets/squad/df-maj-still.jpg', photoAction: 'assets/squad/df-maj-action.jpg' },
  { number: '', first: 'Adrian', last: 'Trusiak', position: 'DF', photo: 'assets/squad/df-trusiak-still.jpg', photoAction: 'assets/squad/df-trusiak-action.jpg' },
  { number: '', first: 'Julian', last: 'Baworski', position: 'DF', photo: 'assets/squad/df-baworski-action.jpg', photoAction: 'assets/squad/df-baworski-still.jpg' },
  { number: '', first: 'Daniel', last: 'Gołębiewski', position: 'DF', photo: 'assets/squad/df-golebiewski-still.jpg', photoAction: 'assets/squad/df-golebiewski-action.jpg' },
  { number: '', first: 'Mateusz', last: 'Maksimiuk', position: 'DF', photo: 'assets/squad/df-maksimiuk-still.jpg', photoAction: 'assets/squad/df-maksimiuk-action.jpg' },
  { number: '', first: 'Alex', last: 'Kapczuk', position: 'DF', photo: 'assets/squad/df-akapczuk-still.jpg', photoAction: 'assets/squad/df-akapczuk-action.jpg' },
  { number: '', first: 'Jakub', last: 'Wiszowaty', position: 'DF', photo: 'assets/squad/df-wiszowaty-still.jpg', photoAction: 'assets/squad/df-wiszowaty-action.jpg' },
  { number: '', first: 'Jakub', last: 'Wiśniewski', position: 'DF', photo: 'assets/squad/df-jwisniewski-still.jpg', photoAction: 'assets/squad/df-jwisniewski-action.jpg' },
  { number: '', first: 'Emil', last: 'Strapczuk', position: 'DF', photo: 'assets/squad/df-strapczuk-still.jpg', photoAction: 'assets/squad/df-strapczuk-action.jpg' },
  { number: '', first: 'Sebastian', last: 'Żeruń', position: 'DF', photo: 'assets/squad/df-zerun-action.jpg', photoAction: 'assets/squad/df-zerun-still.jpg' },
  { number: '', first: 'Patryk', last: 'Czajka', position: 'MF', photo: 'assets/squad/mf-czajka-still.jpg', photoAction: 'assets/squad/mf-czajka-action.jpg' },
  { number: '', first: 'Dominik', last: 'Zieliński', position: 'MF', photo: 'assets/squad/mf-zielinski-still.jpg', photoAction: 'assets/squad/mf-zielinski-action.jpg' },
  { number: '', first: 'Mateusz', last: 'Puchalski', position: 'MF', photo: 'assets/squad/mf-puchalski-action.jpg', photoAction: 'assets/squad/mf-puchalski-still.jpg' },
  { number: '', first: 'Aleksander', last: 'Piechowski', position: 'MF', photo: 'assets/squad/mf-piechowski-still.jpg', photoAction: 'assets/squad/mf-piechowski-action.jpg' },
  { number: '', first: 'Rafał', last: 'Wiśniewski', position: 'MF', photo: 'assets/squad/mf-rwisniewski-still.jpg', photoAction: 'assets/squad/mf-rwisniewski-action.jpg' },
  { number: '', first: 'Damian', last: 'Jarząbek', position: 'MF', photo: 'assets/squad/mf-jarzabek-still.jpg', photoAction: 'assets/squad/mf-jarzabek-action.jpg' },
  { number: '', first: 'Artur', last: 'Radziszewski', position: 'MF', photo: 'assets/squad/mf-radziszewski-still.jpg', photoAction: 'assets/squad/mf-radziszewski-action.jpg' },
  { number: '', first: 'Artur', last: 'Ciborowski', position: 'FW', photo: 'assets/squad/fw-ciborowski-still.jpg', photoAction: 'assets/squad/fw-ciborowski-action.jpg' },
  { number: '', first: 'Michał', last: 'Niewiński', position: 'FW', photo: 'assets/squad/fw-niewinski-still.jpg', photoAction: 'assets/squad/fw-niewinski-action.jpg' },
  { number: '', first: 'Mateusz', last: 'Rusiniak', position: 'FW', photo: 'assets/squad/fw-rusiniak-still.jpg', photoAction: 'assets/squad/fw-rusiniak-action.jpg' },
  { number: '', first: 'Hubert', last: 'Karwacki', position: 'FW', photo: 'assets/squad/fw-karwacki-still.jpg', photoAction: 'assets/squad/fw-karwacki-action.jpg' },
  { number: '', first: 'Fryderyk', last: 'Borowy', position: 'FW', photo: 'assets/squad/fw-borowy-still.jpg', photoAction: 'assets/squad/fw-borowy-action.jpg' },
  { number: '', first: 'Artur', last: 'Pitula', position: 'FW', photo: 'assets/squad/df-pitula-action.jpg', photoAction: 'assets/squad/df-pitula-still.jpg' },
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
    last: 'Łukasik',
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
    name: 'Aktualności.be',
    tier: 'PARTNER MEDIALNY',
    url: 'https://aktualnosci.be/',
    // Logo wgrywane przez administratora w slocie o tym id (wersja niebieska
    // na jasnym tle). Pliki źródłowe mają w nazwie nawiasy, których nie da się
    // wczytać automatycznie — po zmianie nazwy można podać ścieżkę wprost.
    logo: 'assets/partners/aktualnosci-be-niebieski.png',
    note: 'Oficjalny partner medialny klubu. Polskie wiadomości prosto z Belgii.',
  },
];

export const SPONSOR_TIERS = ['SPONSOR GŁÓWNY', 'SPONSORZY', 'PARTNERZY', 'PARTNER MEDIALNY'];

/* ------------------------------------------------------------------ GALERIA */

export const GALLERIES = [
  { key: 'mecze', label: 'MECZE', count: 4 },
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
  { key: 'kibice', label: 'KIBICE', count: 3 },
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
