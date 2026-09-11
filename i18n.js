/* ============================================================================
   FC POLONIA BRUKSELA — TŁUMACZENIA (PL / FR / NL / EN)
   ----------------------------------------------------------------------------
   Jak to działa: polski jest językiem źródłowym strony. Po wybraniu innego
   języka warstwa tłumacząca podmienia widoczne teksty w DOM na podstawie
   słownika poniżej. Dzięki temu nie duplikujemy całego szablonu w czterech
   wersjach — jeden układ, jedna treść bazowa, cztery języki.

   Dodanie nowego napisu: dopisz klucz = dokładny polski tekst ze strony,
   a wartości dla fr/nl/en. Teksty, których nie ma w słowniku, pozostają po
   polsku (świadomie — lepszy oryginał niż automatyczny bełkot).

   Bruksela jest dwujęzyczna, dlatego francuski i niderlandzki traktujemy
   równorzędnie, a angielski dokładamy dla kibiców spoza Belgii.
   ========================================================================== */

export const LANGS = [
  { code: 'pl', label: 'PL', name: 'Polski' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'en', label: 'EN', name: 'English' },
];

const KEY = 'fcp.lang.v1';

export function getLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && LANGS.some((l) => l.code === saved)) return saved;
  } catch {}
  // Podpowiedź z przeglądarki — Bruksela bywa francusko- lub niderlandzkojęzyczna
  try {
    const nav = (navigator.language || 'pl').slice(0, 2).toLowerCase();
    if (LANGS.some((l) => l.code === nav)) return nav;
  } catch {}
  return 'pl';
}

export function setLang(code) {
  try { localStorage.setItem(KEY, code); } catch {}
  return code;
}

/* ─────────────────────────────────────────────────────────────── SŁOWNIK ── */
/* Klucz = polski oryginał. Kolejność: [fr, nl, en] */

const T = {
  /* --- nazwa klubu --- */
  /* Herb zostaje nietknięty; tłumaczymy wyłącznie napis obok niego i w hero.
     Po francusku i niderlandzku klub występuje w federacji jako
     FC Polonia Bruxelles / Brussel — używamy form urzędowych. */
  'Bruksela': ['Bruxelles', 'Brussel', 'Brussels'],
  'FC Polonia Bruksela': ['FC Polonia Bruxelles', 'FC Polonia Brussel', 'FC Polonia Brussels'],
  'Polonia Bruksela': ['Polonia Bruxelles', 'Polonia Brussel', 'Polonia Brussels'],
  'BRUKSELA': ['BRUXELLES', 'BRUSSEL', 'BRUSSELS'],
  '© 2026 FC Polonia Bruksela · FC Polonia Bruxelles':
    ['© 2026 FC Polonia Bruxelles', '© 2026 FC Polonia Brussel · FC Polonia Bruxelles', '© 2026 FC Polonia Brussels · FC Polonia Bruxelles'],

  /* --- tytuły i leady wpisów --- */
  '40 lat FC Polonia Bruksela': ['40 ans du FC Polonia Bruxelles', '40 jaar FC Polonia Brussel', '40 years of FC Polonia Brussels'],
  'Rok 2026 zamyka czwartą dekadę istnienia polonijnego klubu z Brukseli. Herb nosi datę 1986 — i to od niej liczy się cała historia.':
    ['2026 marque la quatrième décennie du club de la communauté polonaise de Bruxelles. Le blason porte la date de 1986 — et c’est de là que part toute l’histoire.',
     '2026 sluit het vierde decennium af van de Poolse club uit Brussel. Het clubembleem draagt het jaartal 1986 — daar begint de hele geschiedenis.',
     '2026 closes the fourth decade of the Polish community club from Brussels. The crest bears the date 1986 — and that is where the whole story begins.'],
  'Matricule 09647 — jak Polonia weszła do struktur belgijskiej federacji':
    ['Matricule 09647 — comment Polonia a rejoint la fédération belge',
     'Stamnummer 09647 — hoe Polonia bij de Belgische bond kwam',
     'Matricule 09647 — how Polonia joined the Belgian federation'],
  'W maju 2015 roku klub poinformował o otrzymaniu numeru matricule 09647 w belgijskiej federacji piłkarskiej. Był to pierwszy taki przypadek w historii polonijnej piłki w Belgii.':
    ['En mai 2015, le club a annoncé avoir reçu le matricule 09647 auprès de la fédération belge de football. C’était une première dans l’histoire du football polonais en Belgique.',
     'In mei 2015 maakte de club bekend stamnummer 09647 te hebben gekregen bij de Belgische voetbalbond. Dat was een primeur in de geschiedenis van het Poolse voetbal in België.',
     'In May 2015 the club announced it had received matricule 09647 from the Belgian football federation — a first in the history of Polish football in Belgium.'],

  /* --- nawigacja i chrome --- */
  'Start': ['Accueil', 'Home', 'Home'],
  'Aktualności': ['Actualités', 'Nieuws', 'News'],
  'Mecze': ['Matchs', 'Wedstrijden', 'Fixtures'],
  'Tabela': ['Classement', 'Klassement', 'Table'],
  'Drużyna': ['Équipe', 'Ploeg', 'Squad'],
  'Klub': ['Club', 'Club', 'Club'],
  'Historia': ['Histoire', 'Geschiedenis', 'History'],
  'Archiwum': ['Archives', 'Archief', 'Archive'],
  'Galeria': ['Galerie', 'Galerij', 'Gallery'],
  'Sponsorzy': ['Sponsors', 'Sponsors', 'Sponsors'],
  'Kontakt': ['Contact', 'Contact', 'Contact'],
  'Oficjalny partner medialny': ['Partenaire média officiel', 'Officiële mediapartner', 'Official media partner'],

  /* --- hero i strona główna --- */
  'OD 1986 ROKU': ['DEPUIS 1986', 'SINDS 1986', 'SINCE 1986'],
  'Polonijny klub piłkarski w sercu Brukseli. Od czterdziestu lat łączymy sport, pasję i polską społeczność w Belgii.':
    ['Le club de football de la communauté polonaise au cœur de Bruxelles. Depuis quarante ans, nous réunissons le sport, la passion et la communauté polonaise de Belgique.',
     'De voetbalclub van de Poolse gemeenschap in het hart van Brussel. Al veertig jaar brengen wij sport, passie en de Poolse gemeenschap in België samen.',
     'The Polish community football club in the heart of Brussels. For forty years we have brought together sport, passion and the Polish community in Belgium.'],
  'Terminarz i wyniki': ['Calendrier et résultats', 'Kalender en uitslagen', 'Fixtures and results'],
  '40 lat historii': ['40 ans d\u2019histoire', '40 jaar geschiedenis', '40 years of history'],
  'SEZON': ['SAISON', 'SEIZOEN', 'SEASON'],
  'DANE NA ŻYWO': ['DONNÉES EN DIRECT', 'LIVE GEGEVENS', 'LIVE DATA'],
  'OSTATNIA AKTUALIZACJA:': ['DERNIÈRE MISE À JOUR :', 'LAATSTE UPDATE:', 'LAST UPDATED:'],
  'ŹRÓDŁO:': ['SOURCE :', 'BRON:', 'SOURCE:'],
  'ŹRÓDŁO DANYCH:': ['SOURCE DES DONNÉES :', 'GEGEVENSBRON:', 'DATA SOURCE:'],

  /* --- mecze --- */
  'Najbliższy mecz': ['Prochain match', 'Volgende wedstrijd', 'Next match'],
  'NAJBLIŻSZY MECZ': ['PROCHAIN MATCH', 'VOLGENDE WEDSTRIJD', 'NEXT MATCH'],
  'Ostatni mecz': ['Dernier match', 'Vorige wedstrijd', 'Last match'],
  'Najbliższe mecze': ['Prochains matchs', 'Volgende wedstrijden', 'Upcoming matches'],
  'Mecze i wyniki': ['Matchs et résultats', 'Wedstrijden en uitslagen', 'Fixtures and results'],
  'DOM': ['DOMICILE', 'THUIS', 'HOME'],
  'WYJAZD': ['EXTÉRIEUR', 'UIT', 'AWAY'],
  'WSZYSTKIE': ['TOUS', 'ALLE', 'ALL'],
  'Najbliższe': ['À venir', 'Komende', 'Upcoming'],
  'Wyniki': ['Résultats', 'Uitslagen', 'Results'],
  'Wszystkie': ['Tous', 'Alle', 'All'],
  'DATA': ['DATE', 'DATUM', 'DATE'],
  'GODZINA': ['HEURE', 'UUR', 'TIME'],
  'ROZGRYWKI': ['COMPÉTITION', 'COMPETITIE', 'COMPETITION'],
  'OBIEKT': ['STADE', 'TERREIN', 'VENUE'],
  'TERMIN': ['DATE ET HEURE', 'DATUM EN UUR', 'DATE AND TIME'],
  'KOLEJKA': ['JOURNÉE', 'SPEELDAG', 'MATCHDAY'],
  'STATUS': ['STATUT', 'STATUS', 'STATUS'],
  'GOSPODARZ': ['TERRAIN', 'TERREIN', 'GROUND'],
  'WYNIK POLONII': ['RÉSULTAT POLONIA', 'RESULTAAT POLONIA', 'POLONIA RESULT'],
  'FORMA': ['FORME', 'VORM', 'FORM'],
  'SZCZEGÓŁY': ['DÉTAILS', 'DETAILS', 'DETAILS'],
  'ZWIŃ': ['RÉDUIRE', 'SLUITEN', 'COLLAPSE'],
  'ZAPLANOWANY': ['PROGRAMMÉ', 'GEPLAND', 'SCHEDULED'],
  'ZAKOŃCZONY': ['TERMINÉ', 'GESPEELD', 'PLAYED'],
  'PRZEŁOŻONY': ['REPORTÉ', 'UITGESTELD', 'POSTPONED'],
  'ZWYCIĘSTWO': ['VICTOIRE', 'WINST', 'WIN'],
  'REMIS': ['MATCH NUL', 'GELIJKSPEL', 'DRAW'],
  'PORAŻKA': ['DÉFAITE', 'VERLIES', 'LOSS'],
  'Do potwierdzenia': ['À confirmer', 'Te bevestigen', 'To be confirmed'],
  'Obiekt do potwierdzenia': ['Stade à confirmer', 'Terrein te bevestigen', 'Venue to be confirmed'],
  'OTWÓRZ W MAPACH GOOGLE': ['OUVRIR DANS GOOGLE MAPS', 'OPEN IN GOOGLE MAPS', 'OPEN IN GOOGLE MAPS'],
  'Zawodnik FC Polonia Bruksela z klubowym szalikiem na trybunach stadionu': [
    'Joueur du FC Polonia Bruxelles avec l\u2019écharpe du club dans les tribunes',
    'Speler van FC Polonia Brussel met clubsjaal op de tribune',
    'FC Polonia Brussels player holding the club scarf in the stands',
  ],
  /* --- stopka, adresy, źródła, polityka: druga tura uzupełnień --- */
  'Wsparcie klubu': ['Soutenir le club', 'De club steunen', 'Support the club'],
  'Sezon': ['Saison', 'Seizoen', 'Season'],
  'TERMINARZ': ['CALENDRIER', 'KALENDER', 'FIXTURES'],
  '← WSZYSTKIE ALBUMY': ['← TOUS LES ALBUMS', '← ALLE ALBUMS', '← ALL ALBUMS'],
  'KONTAKT': ['CONTACT', 'CONTACT', 'CONTACT'],

  /* adresy: tłumaczymy wyłącznie nazwę kraju, reszta to adres pocztowy */
  'Chem. du Struykbeken 2, 1200 Woluwé-Saint-Lambert, Belgia': [
    'Chem. du Struykbeken 2, 1200 Woluwe-Saint-Lambert, Belgique',
    'Struykbeken 2, 1200 Sint-Lambrechts-Woluwe, België',
    'Chem. du Struykbeken 2, 1200 Woluwe-Saint-Lambert, Belgium'],
  'Av. Houba de Strooper 156 bte 11, 1020 Bruxelles, Belgia': [
    'Av. Houba de Strooper 156 bte 11, 1020 Bruxelles, Belgique',
    'Houba de Strooperlaan 156 bus 11, 1020 Brussel, België',
    'Av. Houba de Strooper 156 bte 11, 1020 Brussels, Belgium'],
  'Avenue Léopold Wiener 60, 1170 Watermael-Boitsfort, Belgia': [
    'Avenue Léopold Wiener 60, 1170 Watermael-Boitsfort, Belgique',
    'Léopold Wienerlaan 60, 1170 Watermaal-Bosvoorde, België',
    'Avenue Léopold Wiener 60, 1170 Watermael-Boitsfort, Belgium'],
  'Avenue des Sorbiers 120a, 1342 Limelette, Belgia': [
    'Avenue des Sorbiers 120a, 1342 Limelette, Belgique',
    'Avenue des Sorbiers 120a, 1342 Limelette, België',
    'Avenue des Sorbiers 120a, 1342 Limelette, Belgium'],
  'Obiekt historyczny — od 2015': ['Terrain historique — depuis 2015', 'Historisch terrein — sinds 2015', 'Historical ground — since 2015'],
  'Obiekt historyczny — okres Limelette': ['Terrain historique — période de Limelette', 'Historisch terrein — periode Limelette', 'Historical ground — the Limelette years'],
  'Maj 2015: matricule 09647': ['Mai 2015 : matricule 09647', 'Mei 2015: stamnummer 09647', 'May 2015: matricule 09647'],

  /* rodzaje źródeł w archiwum */
  'Federacja': ['Fédération', 'Bond', 'Federation'],
  'Prasa': ['Presse', 'Pers', 'Press'],
  'Agregator': ['Agrégateur', 'Aggregator', 'Aggregator'],
  'Archiwum klubu': ['Archives du club', 'Clubarchief', 'Club archive'],
  'Archiwalna strona klubu — poloniabruksela.futbolowo.pl': [
    'Ancien site du club — poloniabruksela.futbolowo.pl',
    'Vroegere clubwebsite — poloniabruksela.futbolowo.pl',
    'Former club website — poloniabruksela.futbolowo.pl'],
  'Archiwalna strona klubu — fcpolonia.be': [
    'Ancien site du club — fcpolonia.be',
    'Vroegere clubwebsite — fcpolonia.be',
    'Former club website — fcpolonia.be'],
  'RSSSF — tabele belgijskie 2016/17': ['RSSSF — classements belges 2016/17', 'RSSSF — Belgische klassementen 2016/17', 'RSSSF — Belgian tables 2016/17'],
  'RSSSF — tabele belgijskie 2017/18': ['RSSSF — classements belges 2017/18', 'RSSSF — Belgische klassementen 2017/18', 'RSSSF — Belgian tables 2017/18'],
  'RSSSF — tabele belgijskie 2018/19': ['RSSSF — classements belges 2018/19', 'RSSSF — Belgische klassementen 2018/19', 'RSSSF — Belgian tables 2018/19'],
  'RSSSF — tabele belgijskie 2019/20': ['RSSSF — classements belges 2019/20', 'RSSSF — Belgische klassementen 2019/20', 'RSSSF — Belgian tables 2019/20'],

  /* polityka prywatności — nagłówki i etykiety */
  'Administrator danych': ['Responsable du traitement', 'Verwerkingsverantwoordelijke', 'Data controller'],
  'NAZWA': ['NOM', 'NAAM', 'NAME'],
  'FORMA PRAWNA': ['FORME JURIDIQUE', 'RECHTSVORM', 'LEGAL FORM'],
  'NUMER PRZEDSIĘBIORSTWA': ['NUMÉRO D’ENTREPRISE', 'ONDERNEMINGSNUMMER', 'COMPANY NUMBER'],
  'SIEDZIBA': ['SIÈGE', 'ZETEL', 'REGISTERED OFFICE'],
  'ASBL / VZW — stowarzyszenie bez celu zarobkowego': [
    'ASBL — association sans but lucratif',
    'VZW — vereniging zonder winstoogmerk',
    'ASBL / VZW — non-profit association'],
  'Jakie dane zbieramy': ['Quelles données nous collectons', 'Welke gegevens we verzamelen', 'What data we collect'],
  'Formularz kontaktowy': ['Formulaire de contact', 'Contactformulier', 'Contact form'],
  'Pamięć Twojej przeglądarki': ['La mémoire de votre navigateur', 'Het geheugen van je browser', 'Your browser’s storage'],
  'Dane techniczne serwera': ['Données techniques du serveur', 'Technische servergegevens', 'Technical server data'],
  'Cele i podstawy prawne': ['Finalités et bases légales', 'Doeleinden en rechtsgronden', 'Purposes and legal bases'],
  'Odpowiedź na wiadomość z formularza': ['Réponse à un message du formulaire', 'Antwoord op een bericht uit het formulier', 'Replying to a message from the form'],
  'zgoda oraz nasz uzasadniony interes (art. 6 ust. 1 lit. a i f RODO)': [
    'consentement et intérêt légitime (art. 6, § 1, a) et f) du RGPD)',
    'toestemming en gerechtvaardigd belang (art. 6, lid 1, a en f AVG)',
    'consent and legitimate interest (Art. 6(1)(a) and (f) GDPR)'],
  'Zapamiętanie wyboru w oknie cookies': ['Mémoriser votre choix dans la fenêtre cookies', 'Je keuze in het cookievenster onthouden', 'Remembering your choice in the cookie window'],
  'obowiązek prawny — musimy udokumentować Twój wybór': [
    'obligation légale — nous devons documenter votre choix',
    'wettelijke verplichting — we moeten je keuze documenteren',
    'legal obligation — we must document your choice'],
  'Pamięć funkcjonalna (terminarz, zdjęcia)': ['Mémoire fonctionnelle (calendrier, photos)', 'Functioneel geheugen (kalender, foto’s)', 'Functional storage (fixtures, photos)'],
  'Twoja zgoda (art. 6 ust. 1 lit. a RODO)': ['votre consentement (art. 6, § 1, a) du RGPD)', 'jouw toestemming (art. 6, lid 1, a AVG)', 'your consent (Art. 6(1)(a) GDPR)'],
  'Bezpieczeństwo i działanie serwisu': ['Sécurité et fonctionnement du site', 'Veiligheid en werking van de site', 'Security and operation of the site'],
  'uzasadniony interes (art. 6 ust. 1 lit. f RODO)': ['intérêt légitime (art. 6, § 1, f) du RGPD)', 'gerechtvaardigd belang (art. 6, lid 1, f AVG)', 'legitimate interest (Art. 6(1)(f) GDPR)'],
  'Czego używamy': ['Ce que nous utilisons', 'Wat we gebruiken', 'What we use'],
  'Obecnie: brak.': ['Actuellement : aucun.', 'Momenteel: geen.', 'Currently: none.'],
  'Jak długo przechowujemy dane': ['Combien de temps nous conservons les données', 'Hoelang we gegevens bewaren', 'How long we keep data'],
  'Komu przekazujemy dane': ['À qui nous transmettons les données', 'Aan wie we gegevens doorgeven', 'Who we share data with'],
  'Przekazywanie poza Europejski Obszar Gospodarczy': ['Transferts en dehors de l’Espace économique européen', 'Doorgifte buiten de Europese Economische Ruimte', 'Transfers outside the European Economic Area'],
  'Bezpieczeństwo i osoby niepełnoletnie': ['Sécurité et mineurs', 'Veiligheid en minderjarigen', 'Security and minors'],
  'Twoja zgoda': ['Votre consentement', 'Jouw toestemming', 'Your consent'],
  'Twoje prawa': ['Vos droits', 'Jouw rechten', 'Your rights'],
  'Zmiany polityki': ['Modifications de la politique', 'Wijzigingen van het beleid', 'Changes to this policy'],
  'Ostatnia aktualizacja:': ['Dernière mise à jour :', 'Laatst bijgewerkt:', 'Last updated:'],
  'polityka prywatności i cookies': ['politique de confidentialité et cookies', 'privacy- en cookiebeleid', 'privacy and cookie policy'],

  /* --- mapa dojazdu i zgoda na mapy Google --- */
  'MAPA DOJAZDU': ['PLAN D’ACCÈS', 'ROUTEKAART', 'HOW TO GET THERE'],
  'WCZYTAJ MAPĘ': ['CHARGER LA CARTE', 'KAART LADEN', 'LOAD THE MAP'],
  'Mapa pochodzi z serwerów Google, dlatego nie wczytujemy jej bez Twojej zgody. Kliknięcie „Wczytaj mapę" włącza kategorię „Mapy Google" — możesz ją wyłączyć w ustawieniach prywatności w stopce.': [
    'La carte provient des serveurs de Google : nous ne la chargeons donc pas sans votre accord. Cliquer sur « Charger la carte » active la catégorie « Cartes Google » — vous pouvez la désactiver dans les paramètres de confidentialité, en bas de page.',
    'De kaart komt van de servers van Google, daarom laden we ze niet zonder jouw toestemming. Klikken op „Kaart laden" schakelt de categorie „Google Maps" in — je kunt ze uitzetten in de privacy-instellingen onderaan de pagina.',
    'The map comes from Google’s servers, so we do not load it without your consent. Clicking “Load the map” switches on the “Google Maps” category — you can turn it off in the privacy settings in the footer.'],
  'Mapy Google': ['Cartes Google', 'Google Maps', 'Google Maps'],
  'Pozwalają wczytać osadzoną mapę dojazdu na stadion. Mapa pochodzi z serwerów Google, które przy jej pobraniu widzą Twój adres IP i mogą zapisać własne pliki. Bez zgody pokazujemy sam adres obiektu i odnośnik do map — treść pozostaje dostępna.': [
    'Elles permettent de charger la carte d’accès au stade. La carte provient des serveurs de Google, qui voient alors l’adresse IP de votre appareil et peuvent déposer leurs propres fichiers. Sans consentement, nous affichons uniquement l’adresse du stade et un lien vers les cartes — le contenu reste accessible.',
    'Hiermee kan de ingesloten routekaart naar het stadion geladen worden. De kaart komt van de servers van Google, die daarbij je IP-adres zien en eigen bestanden kunnen plaatsen. Zonder toestemming tonen we alleen het adres van het terrein en een link naar de kaarten — de inhoud blijft beschikbaar.',
    'These let the embedded map to the ground load. The map comes from Google’s servers, which then see your IP address and may store their own files. Without consent we show only the venue address and a link to the maps — the content stays available.'],
  'Osadzone mapy Google w szczegółach meczu (wczytywane dopiero po zgodzie).': [
    'Cartes Google intégrées dans le détail des matchs (chargées uniquement après consentement).',
    'Ingesloten Google Maps-kaarten in de wedstrijddetails (pas geladen na toestemming).',
    'Embedded Google Maps in the match details (loaded only after consent).'],

  /* --- kategorie wpisów, nagłówki sekcji, etykiety --- */
  'AKTUALNOŚCI': ['ACTUALITÉS', 'NIEUWS', 'NEWS'],
  '← AKTUALNOŚCI': ['← ACTUALITÉS', '← NIEUWS', '← NEWS'],
  'MECZ': ['MATCH', 'WEDSTRIJD', 'MATCH'],
  'WYNIK': ['RÉSULTAT', 'UITSLAG', 'RESULT'],
  'TRANSFER': ['TRANSFERT', 'TRANSFER', 'TRANSFER'],
  'SPONSORZY': ['SPONSORS', 'SPONSORS', 'SPONSORS'],
  'ARCHIWUM': ['ARCHIVES', 'ARCHIEF', 'ARCHIVE'],
  'HISTORIA': ['HISTOIRE', 'GESCHIEDENIS', 'HISTORY'],
  'KLUB': ['CLUB', 'CLUB', 'CLUB'],
  'NAJBLIŻSZY MECZ ·': ['PROCHAIN MATCH ·', 'VOLGENDE WEDSTRIJD ·', 'NEXT MATCH ·'],
  'PIERWSZY ZESPÓŁ · SEZON': ['ÉQUIPE PREMIÈRE · SAISON', 'EERSTE ELFTAL · SEIZOEN', 'FIRST TEAM · SEASON'],
  'PRZY DRUŻYNIE': ['AUTOUR DE L’ÉQUIPE', 'ROND DE PLOEG', 'AROUND THE TEAM'],
  'KTO PROWADZI KLUB': ['QUI DIRIGE LE CLUB', 'WIE LEIDT DE CLUB', 'WHO RUNS THE CLUB'],
  'KIM JESTEŚMY': ['QUI SOMMES-NOUS', 'WIE WIJ ZIJN', 'WHO WE ARE'],
  'DO WERYFIKACJI ARCHIWALNEJ': ['À VÉRIFIER DANS LES ARCHIVES', 'NOG TE VERIFIËREN IN HET ARCHIEF', 'TO BE VERIFIED IN THE ARCHIVES'],
  'CZEGO JESZCZE NIE POTWIERDZILIŚMY': ['CE QUE NOUS N’AVONS PAS ENCORE CONFIRMÉ', 'WAT WE NOG NIET BEVESTIGD HEBBEN', 'WHAT WE HAVE NOT CONFIRMED YET'],
  'ŹRÓDŁA I ARCHIWA': ['SOURCES ET ARCHIVES', 'BRONNEN EN ARCHIEVEN', 'SOURCES AND ARCHIVES'],
  'NAPISZ DO NAS': ['ÉCRIVEZ-NOUS', 'SCHRIJF ONS', 'WRITE TO US'],
  'Napisz do nas': ['Écrivez-nous', 'Schrijf ons', 'Write to us'],
  'ZOBACZ GALERIĘ →': ['VOIR LA GALERIE →', 'BEKIJK DE GALERIJ →', 'VIEW GALLERY →'],
  'Nr przedsiębiorstwa:': ['N° d’entreprise :', 'Ondernemingsnummer:', 'Company number:'],
  'polityce prywatności': ['la politique de confidentialité', 'het privacybeleid', 'the privacy policy'],
  'Społeczność': ['Communauté', 'Gemeenschap', 'Community'],
  '— uzupełnimy archiwum.': ['— nous compléterons les archives.', '— we vullen het archief aan.', '— we will add it to the archive.'],

  /* --- skróty kolumn tabeli i litery formy --- */
  'Z': ['V', 'W', 'W'],
  'R': ['N', 'G', 'D'],
  'P': ['D', 'V', 'L'],

  /* --- oś czasu na podstronie Historia --- */
  'Klub z potrzeby wspólnoty': ['Un club né du besoin de communauté', 'Een club uit behoefte aan gemeenschap', 'A club born of a need for community'],
  'Lata w federacji amatorskiej': ['Les années en fédération amateur', 'De jaren in de amateurbond', 'The years in the amateur federation'],
  'Boitsfort: pierwsze sezony w federacji': ['Boitsfort : les premières saisons en fédération', 'Boitsfort: de eerste seizoenen in de bond', 'Boitsfort: the first seasons in the federation'],
  'Nie tylko piłka': ['Pas seulement du football', 'Niet alleen voetbal', 'More than football'],
  'Powrót Brukseli do nazwy': ['Le retour de Bruxelles dans le nom', 'Brussel keert terug in de naam', 'Brussels returns to the name'],
  'Czterdzieści lat': ['Quarante ans', 'Veertig jaar', 'Forty years'],

  /* --- krótkie opisy i teksty pomocnicze --- */
  'Polonijny klub piłkarski w Brukseli od 1986 roku.': [
    'Le club de football de la communauté polonaise à Bruxelles depuis 1986.',
    'De voetbalclub van de Poolse gemeenschap in Brussel sinds 1986.',
    'The Polish community football club in Brussels since 1986.'],
  'Polskie wiadomości prosto z Belgii': ['L’actualité polonaise depuis la Belgique', 'Pools nieuws rechtstreeks uit België', 'Polish news straight from Belgium'],
  'Archiwalne fotografie klubu z lat 1986–2015.': [
    'Photographies d’archives du club, 1986–2015.',
    'Archieffoto’s van de club, 1986–2015.',
    'Archive photographs of the club, 1986–2015.'],
  'Album zostanie wkrótce uzupełniony zdjęciami z archiwum klubu.': [
    'Cet album sera bientôt complété par des photos issues des archives du club.',
    'Dit album wordt binnenkort aangevuld met foto’s uit het clubarchief.',
    'This album will soon be filled with photos from the club archive.'],
  'Miejsce meczów domowych po wejściu klubu do rozgrywek federacji.': [
    'Lieu des matchs à domicile après l’entrée du club dans les compétitions de la fédération.',
    'Locatie van de thuiswedstrijden na de toetreding van de club tot de bondscompetities.',
    'Home venue after the club joined the federation’s competitions.'],
  'Boisko syntetyczne. Adres widniejący w rejestrze federacji przy matricule 09647.': [
    'Terrain synthétique. Adresse figurant au registre de la fédération sous le matricule 09647.',
    'Kunstgrasveld. Adres zoals vermeld in het bondsregister bij stamnummer 09647.',
    'Synthetic pitch. The address listed in the federation register under matricule 09647.'],
  'Klub gra dzięki firmom, które go wspierają. Poniżej partnerzy sezonu 2026/2027.': [
    'Le club joue grâce aux entreprises qui le soutiennent. Voici les partenaires de la saison 2026/2027.',
    'De club speelt dankzij de bedrijven die haar steunen. Hieronder de partners van het seizoen 2026/2027.',
    'The club plays thanks to the companies behind it. Here are the partners for the 2026/2027 season.'],
  'Od pierwszych spotkań polskiej emigracji w Brukseli, przez lata w federacji amatorskiej, po matricule 09647.': [
    'Des premiers matchs de l’émigration polonaise à Bruxelles aux années en fédération amateur, jusqu’au matricule 09647.',
    'Van de eerste wedstrijden van de Poolse emigratie in Brussel, via de jaren in de amateurbond, tot stamnummer 09647.',
    'From the first matches of the Polish community in Brussels, through the amateur federation years, to matricule 09647.'],
  'Amatorski klub polonijny utrzymuje się ze składek, wsparcia partnerów i pracy wolontariuszy. Każde wsparcie idzie na treningi, sprzęt, opłaty federacyjne i wyjazdy.': [
    'Ce club amateur de la communauté polonaise vit des cotisations, du soutien de ses partenaires et du travail de bénévoles. Chaque soutien va aux entraînements, au matériel, aux frais de fédération et aux déplacements.',
    'Deze amateurclub van de Poolse gemeenschap draait op lidgelden, de steun van partners en het werk van vrijwilligers. Elke steun gaat naar trainingen, materiaal, bondskosten en verplaatsingen.',
    'This amateur Polish community club runs on membership fees, partner support and volunteer work. Every contribution goes to training, kit, federation fees and away trips.'],
  'Współpraca może obejmować logo na koszulkach i bandach, obecność w grafikach meczowych klubu oraz wspólne wydarzenia dla polskiej społeczności w Brukseli.': [
    'Le partenariat peut comprendre un logo sur les maillots et les panneaux, une présence dans les visuels de match du club et des événements communs pour la communauté polonaise de Bruxelles.',
    'Een samenwerking kan een logo op shirts en boarding omvatten, aanwezigheid in de wedstrijdbeelden van de club en gezamenlijke evenementen voor de Poolse gemeenschap in Brussel.',
    'A partnership can include a logo on shirts and pitch-side boards, a presence in the club’s matchday graphics, and joint events for the Polish community in Brussels.'],
  'Każdy sezon ma własną podstronę. Tam, gdzie nie udało się potwierdzić końcowej tabeli w wiarygodnym źródle, sezon pozostaje oznaczony jako uzupełniany — nie publikujemy fikcyjnych wyników ani szacunków.': [
    'Chaque saison a sa propre page. Lorsque le classement final n’a pas pu être confirmé par une source fiable, la saison reste marquée comme à compléter — nous ne publions ni résultats fictifs ni estimations.',
    'Elk seizoen heeft een eigen pagina. Waar de eindstand niet met een betrouwbare bron bevestigd kon worden, blijft het seizoen aangeduid als aan te vullen — we publiceren geen verzonnen uitslagen of schattingen.',
    'Each season has its own page. Where the final table could not be confirmed against a reliable source, the season stays marked as incomplete — we publish no invented results or estimates.'],
  'FC Polonia Bruksela to polonijny klub piłkarski działający w Brukseli od 1986 roku. Od 2015 roku występuje w rozgrywkach belgijskiej federacji piłkarskiej.': [
    'Le FC Polonia Bruxelles est le club de football de la communauté polonaise actif à Bruxelles depuis 1986. Depuis 2015, il évolue dans les compétitions de la fédération belge de football.',
    'FC Polonia Brussel is de voetbalclub van de Poolse gemeenschap, actief in Brussel sinds 1986. Sinds 2015 speelt de club in de competities van de Belgische voetbalbond.',
    'FC Polonia Brussels is the Polish community football club active in Brussels since 1986. Since 2015 it has played in the Belgian football federation’s competitions.'],

  /* --- opisy alternatywne i podpowiedzi pól --- */
  'Aktualnosci.be — prosto z Belgii': ['Aktualnosci.be — direct de Belgique', 'Aktualnosci.be — rechtstreeks uit België', 'Aktualnosci.be — straight from Belgium'],
  'Zdjęcie zespołowe': ['Photo d’équipe', 'Ploegfoto', 'Team photo'],
  'Zdjęcie': ['Photo', 'Foto', 'Photo'],
  'Zdjęcie zawodnika': ['Photo du joueur', 'Foto van de speler', 'Player photo'],
  'Pierwsza drużyna FC Polonia Bruksela, sezon 2026/2027': [
    'L’équipe première du FC Polonia Bruxelles, saison 2026/2027',
    'Het eerste elftal van FC Polonia Brussel, seizoen 2026/2027',
    'FC Polonia Brussels first team, 2026/2027 season'],
  'Jubileuszowy wieczór klubu — 40 lat FC Polonia Bruksela.': [
    'La soirée anniversaire du club — 40 ans du FC Polonia Bruxelles.',
    'De jubileumavond van de club — 40 jaar FC Polonia Brussel.',
    'The club’s anniversary evening — 40 years of FC Polonia Brussels.'],
  'Herb klubu i numer matricule 09647 nadany przez belgijską federację.': [
    'Le blason du club et le matricule 09647 attribué par la fédération belge.',
    'Het clubembleem en stamnummer 09647, toegekend door de Belgische bond.',
    'The club crest and matricule 09647 granted by the Belgian federation.'],
  'Jeśli chcesz grać — podaj rocznik, pozycję i doświadczenie boiskowe.': [
    'Si vous voulez jouer — indiquez votre année de naissance, votre poste et votre expérience.',
    'Wil je meespelen — vermeld je geboortejaar, je positie en je ervaring.',
    'If you want to play — give your year of birth, position and playing experience.'],

  /* --- pływająca zachęta do Facebooka --- */
  'Obserwuj nas i oglądaj relacje z meczów!': [
    'Suivez-nous et vivez les matchs en direct !',
    'Volg ons en bekijk de verslagen van de wedstrijden!',
    'Follow us and watch the match coverage!'],
  'Obserwuj': ['Suivre', 'Volgen', 'Follow'],
  'NIE TERAZ': ['PAS MAINTENANT', 'NIET NU', 'NOT NOW'],
  'Zamknij': ['Fermer', 'Sluiten', 'Close'],

  /* --- formularz kontaktowy: wysyłka i potwierdzenie --- */
  'Wysyłanie…': ['Envoi en cours…', 'Verzenden…', 'Sending…'],
  'Wiadomość wysłana': ['Message envoyé', 'Bericht verzonden', 'Message sent'],
  'ODPOWIEMY NA ADRES': ['NOUS RÉPONDRONS À', 'WIJ ANTWOORDEN OP', 'WE WILL REPLY TO'],
  'NAPISZ KOLEJNĄ WIADOMOŚĆ': ['ÉCRIRE UN AUTRE MESSAGE', 'NOG EEN BERICHT SCHRIJVEN', 'WRITE ANOTHER MESSAGE'],
  'WRÓĆ NA STRONĘ GŁÓWNĄ': ['RETOUR À L’ACCUEIL', 'TERUG NAAR DE HOMEPAGE', 'BACK TO HOME'],
  'Podaj imię i nazwisko.': ['Indiquez votre nom et prénom.', 'Vul je voor- en achternaam in.', 'Please enter your name.'],
  'Podaj poprawny adres e-mail.': ['Indiquez une adresse e-mail valide.', 'Vul een geldig e-mailadres in.', 'Please enter a valid e-mail address.'],
  'Napisz kilka słów więcej w wiadomości.': ['Écrivez quelques mots de plus.', 'Schrijf nog een paar woorden.', 'Please write a few more words.'],
  'Nie udało się wysłać wiadomości. Sprawdź połączenie albo napisz bezpośrednio na polonia@live.be.': [
    'L’envoi a échoué. Vérifiez votre connexion ou écrivez directement à polonia@live.be.',
    'Verzenden is mislukt. Controleer je verbinding of mail rechtstreeks naar polonia@live.be.',
    'Sending failed. Check your connection or write directly to polonia@live.be.'],
  'Sprawa pilna? Napisz wprost na polonia@live.be albo złap nas na Facebooku.': [
    'C’est urgent ? Écrivez directement à polonia@live.be ou contactez-nous sur Facebook.',
    'Dringend? Mail rechtstreeks naar polonia@live.be of zoek ons op Facebook.',
    'Urgent? Write straight to polonia@live.be or catch us on Facebook.'],
  'Wiadomość wysyłamy prosto ze strony — nie musisz mieć skonfigurowanej poczty. Wolisz napisać bezpośrednio?': [
    'Le message part directement du site — pas besoin de logiciel de messagerie. Vous préférez écrire directement ?',
    'Het bericht wordt rechtstreeks vanaf de site verstuurd — je hebt geen mailprogramma nodig. Liever rechtstreeks schrijven?',
    'The message is sent straight from the site — no mail app needed. Prefer to write directly?'],
  'Dziękujemy za kontakt. Twoja wiadomość trafiła na skrzynkę klubu i czeka już na osobę, która się nią zajmie. Zwykle odpowiadamy w ciągu dwóch, trzech dni — w klubie pracują wolontariusze, więc czasem trwa to dzień dłużej.': [
    'Merci de nous avoir écrit. Votre message est arrivé dans la boîte du club et attend la personne qui s’en occupera. Nous répondons en général sous deux ou trois jours — le club fonctionne grâce à des bénévoles, cela prend donc parfois un jour de plus.',
    'Bedankt voor je bericht. Het is aangekomen in de mailbox van de club en wacht op de persoon die het oppakt. Meestal antwoorden we binnen twee of drie dagen — de club draait op vrijwilligers, dus soms duurt het een dag langer.',
    'Thank you for writing. Your message has reached the club’s mailbox and is waiting for the person who will handle it. We usually reply within two or three days — the club runs on volunteers, so sometimes it takes a day longer.'],
  'ZAPISZ W KALENDARZU': ['AJOUTER AU CALENDRIER', 'IN AGENDA ZETTEN', 'ADD TO CALENDAR'],
  'DODAJ DO KALENDARZA': ['AJOUTER AU CALENDRIER', 'IN AGENDA ZETTEN', 'ADD TO CALENDAR'],
  'Zapisz mecz w kalendarzu telefonu — z przypomnieniem 5 godzin wcześniej': [
    'Enregistrer le match dans le calendrier du téléphone — rappel 5 heures avant',
    'Zet de wedstrijd in de agenda van je telefoon — herinnering 5 uur vooraf',
    'Save the match to your phone calendar — reminder 5 hours before',
  ],
  'ODŚWIEŻ DANE': ['ACTUALISER', 'VERNIEUWEN', 'REFRESH DATA'],
  'SYNCHRONIZACJA…': ['SYNCHRONISATION…', 'SYNCHRONISEREN…', 'SYNCING…'],
  'PANEL DANYCH': ['PANNEAU DE DONNÉES', 'GEGEVENSPANEEL', 'DATA PANEL'],
  'Ładowanie terminarza…': ['Chargement du calendrier…', 'Kalender laden…', 'Loading fixtures…'],

  /* --- tabela --- */
  'DRUŻYNA': ['ÉQUIPE', 'PLOEG', 'TEAM'],
  'BRAMKI': ['BUTS', 'DOELPUNTEN', 'GOALS'],
  'PKT': ['PTS', 'PTN', 'PTS'],
  'AKTUALNA POZYCJA': ['CLASSEMENT ACTUEL', 'HUIDIGE STAND', 'CURRENT POSITION'],
  'miejsce': ['place', 'plaats', 'place'],
  'Pełna tabela': ['Classement complet', 'Volledig klassement', 'Full table'],
  'PEŁNA TABELA': ['CLASSEMENT COMPLET', 'VOLLEDIG KLASSEMENT', 'FULL TABLE'],
  'Zaczynamy od zera — jak wszyscy. Pierwszy gwizdek 6 września, a potem każdy punkt buduje to miejsce. Do zobaczenia na Stade Fallon.':
    ['On repart de zéro — comme tout le monde. Coup d\u2019envoi le 6 septembre, et ensuite chaque point construit cette place. Rendez-vous au Stade Fallon.',
     'We beginnen van nul — net als iedereen. Eerste fluitsignaal op 6 september, daarna bouwt elk punt aan deze plaats. Tot op Stade Fallon.',
     'We start from zero — like everyone else. First whistle on 6 September, and from then on every point builds this position. See you at Stade Fallon.'],

  /* --- drużyna --- */
  'PIERWSZY ZESPÓŁ': ['ÉQUIPE PREMIÈRE', 'EERSTE ELFTAL', 'FIRST TEAM'],
  'BRAMKARZE': ['GARDIENS', 'DOELMANNEN', 'GOALKEEPERS'],
  'OBROŃCY': ['DÉFENSEURS', 'VERDEDIGERS', 'DEFENDERS'],
  'POMOCNICY': ['MILIEUX', 'MIDDENVELDERS', 'MIDFIELDERS'],
  'NAPASTNICY': ['ATTAQUANTS', 'AANVALLERS', 'FORWARDS'],
  'Sztab szkoleniowy': ['Staff technique', 'Technische staf', 'Coaching staff'],
  'Zarząd': ['Comité', 'Bestuur', 'Board'],
  'Trener': ['Entraîneur', 'Trainer', 'Head coach'],
  'Asystent trenera': ['Entraîneur adjoint', 'Assistent-trainer', 'Assistant coach'],
  'Kierownik drużyny': ['Délégué', 'Ploegafgevaardigde', 'Team manager'],
  'Prezes klubu': ['Président du club', 'Clubvoorzitter', 'Club president'],
  'Członek zarządu': ['Membre du comité', 'Bestuurslid', 'Board member'],

  /* --- klub --- */
  'ROK ZAŁOŻENIA': ['ANNÉE DE FONDATION', 'OPRICHTINGSJAAR', 'FOUNDED'],
  'WEJŚCIE DO FEDERACJI': ['ENTRÉE EN FÉDÉRATION', 'TOETREDING TOT DE BOND', 'JOINED THE FEDERATION'],
  'LAT DZIAŁALNOŚCI': ['ANS D\u2019ACTIVITÉ', 'JAAR ACTIEF', 'YEARS ACTIVE'],
  'Nazwa i tożsamość': ['Nom et identité', 'Naam en identiteit', 'Name and identity'],
  'Obiekty': ['Installations', 'Terreinen', 'Grounds'],
  'Gdzie gramy': ['Où nous jouons', 'Waar we spelen', 'Where we play'],
  'Historia klubu': ['Histoire du club', 'Clubgeschiedenis', 'Club history'],
  'Stadion klubu — mecze domowe': ['Stade du club — matchs à domicile', 'Clubterrein — thuiswedstrijden', 'Club ground — home matches'],

  /* --- kontakt --- */
  'Napisz do klubu': ['Écrivez au club', 'Schrijf naar de club', 'Write to the club'],
  'IMIĘ I NAZWISKO': ['NOM ET PRÉNOM', 'NAAM EN VOORNAAM', 'FULL NAME'],
  'TWÓJ E-MAIL': ['VOTRE E-MAIL', 'UW E-MAIL', 'YOUR EMAIL'],
  'TEMAT': ['SUJET', 'ONDERWERP', 'SUBJECT'],
  'WIADOMOŚĆ': ['MESSAGE', 'BERICHT', 'MESSAGE'],
  'Wyślij wiadomość': ['Envoyer le message', 'Bericht versturen', 'Send message'],
  'Chcę grać w Polonii': ['Je veux jouer à Polonia', 'Ik wil bij Polonia spelen', 'I want to play for Polonia'],
  'Współpraca i sponsoring': ['Partenariat et sponsoring', 'Samenwerking en sponsoring', 'Partnership and sponsorship'],
  'Media i wywiady': ['Médias et interviews', 'Media en interviews', 'Media and interviews'],
  'Archiwum i historia klubu': ['Archives et histoire du club', 'Archief en clubgeschiedenis', 'Archive and club history'],
  'Inna sprawa': ['Autre demande', 'Andere vraag', 'Something else'],
  'E-MAIL': ['E-MAIL', 'E-MAIL', 'EMAIL'],
  'FACEBOOK': ['FACEBOOK', 'FACEBOOK', 'FACEBOOK'],
  'WSPARCIE KLUBU': ['SOUTENIR LE CLUB', 'CLUB STEUNEN', 'SUPPORT THE CLUB'],
  'Wiadomość przygotowana': ['Message préparé', 'Bericht klaargezet', 'Message ready'],

  /* --- aktualności --- */
  'Z ŻYCIA KLUBU': ['LA VIE DU CLUB', 'CLUBLEVEN', 'CLUB LIFE'],
  'WSZYSTKIE WPISY →': ['TOUTES LES ACTUALITÉS →', 'ALLE BERICHTEN →', 'ALL NEWS →'],
  'CAŁY TERMINARZ →': ['CALENDRIER COMPLET →', 'VOLLEDIGE KALENDER →', 'FULL FIXTURE LIST →'],
  'WSZYSTKIE ALBUMY →': ['TOUS LES ALBUMS →', 'ALLE ALBUMS →', 'ALL ALBUMS →'],
  'POWIĄZANE ARTYKUŁY': ['ARTICLES LIÉS', 'GERELATEERDE ARTIKELS', 'RELATED ARTICLES'],
  'GALERIA WPISU': ['GALERIE DE L\u2019ARTICLE', 'GALERIJ VAN HET ARTIKEL', 'ARTICLE GALLERY'],
  'Brak wpisów w tej kategorii.': ['Aucun article dans cette catégorie.', 'Geen berichten in deze categorie.', 'No posts in this category.'],

  /* --- archiwum --- */
  'SEZON PO SEZONIE': ['SAISON PAR SAISON', 'SEIZOEN PER SEIZOEN', 'SEASON BY SEASON'],
  'Archiwum sezonów': ['Archives des saisons', 'Seizoensarchief', 'Season archive'],
  'SEZON BIEŻĄCY': ['SAISON EN COURS', 'HUIDIG SEIZOEN', 'CURRENT SEASON'],
  'W UZUPEŁNIANIU': ['EN COURS DE COMPLÉTION', 'WORDT AANGEVULD', 'BEING COMPLETED'],
  'MIEJSCE': ['PLACE', 'PLAATS', 'POSITION'],
  'MECZE': ['MATCHS', 'WEDSTRIJDEN', 'PLAYED'],
  'ZWYCIĘSTWA': ['VICTOIRES', 'OVERWINNINGEN', 'WINS'],
  'REMISY': ['NULS', 'GELIJKE SPELEN', 'DRAWS'],
  'PORAŻKI': ['DÉFAITES', 'NEDERLAGEN', 'LOSSES'],
  'PUNKTY': ['POINTS', 'PUNTEN', 'POINTS'],

  /* --- galeria --- */
  'ARCHIWUM WIZUALNE': ['ARCHIVES PHOTO', 'FOTOARCHIEF', 'PHOTO ARCHIVE'],
  'TRENINGI': ['ENTRAÎNEMENTS', 'TRAININGEN', 'TRAINING'],
  'KULISY': ['COULISSES', 'ACHTER DE SCHERMEN', 'BEHIND THE SCENES'],
  'NOSISZ NASZE BARWY': ['TU PORTES NOS COULEURS', 'JIJ DRAAGT ONZE KLEUREN', 'YOU WEAR OUR COLOURS'],
  'KIBICE': ['SUPPORTERS', 'SUPPORTERS', 'FANS'],
  'WYDARZENIA': ['ÉVÉNEMENTS', 'EVENEMENTEN', 'EVENTS'],
  'HISTORIA': ['HISTOIRE', 'GESCHIEDENIS', 'HISTORY'],
  '40-LECIE': ['40e ANNIVERSAIRE', '40-JARIG BESTAAN', '40th ANNIVERSARY'],

  /* --- sponsorzy --- */
  'RAZEM Z NAMI': ['AVEC NOUS', 'SAMEN MET ONS', 'WITH US'],
  'Sponsorzy i partnerzy': ['Sponsors et partenaires', 'Sponsors en partners', 'Sponsors and partners'],
  'SPONSOR GŁÓWNY': ['SPONSOR PRINCIPAL', 'HOOFDSPONSOR', 'MAIN SPONSOR'],
  'PARTNERZY': ['PARTENAIRES', 'PARTNERS', 'PARTNERS'],
  'PARTNER MEDIALNY': ['PARTENAIRE MÉDIA', 'MEDIAPARTNER', 'MEDIA PARTNER'],
  'Zostań partnerem Polonii': ['Devenez partenaire de Polonia', 'Word partner van Polonia', 'Become a Polonia partner'],
  'Zostań sponsorem': ['Devenir sponsor', 'Word sponsor', 'Become a sponsor'],

  /* --- stopka i prawne --- */
  'KLUB': ['CLUB', 'CLUB', 'CLUB'],
  'SOCIAL MEDIA': ['RÉSEAUX SOCIAUX', 'SOCIALE MEDIA', 'SOCIAL MEDIA'],
  'O klubie': ['À propos du club', 'Over de club', 'About the club'],
  'Mecze i wyniki': ['Matchs et résultats', 'Wedstrijden en uitslagen', 'Fixtures and results'],
  'Panel redakcyjny': ['Panneau de rédaction', 'Redactiepaneel', 'Editorial panel'],
  'INFORMACJE PRAWNE': ['MENTIONS LÉGALES', 'JURIDISCHE INFORMATIE', 'LEGAL INFORMATION'],
  'DANE PODMIOTU': ['IDENTITÉ DE L\u2019ÉDITEUR', 'GEGEVENS VAN DE UITGEVER', 'PUBLISHER DETAILS'],
  'Polityka prywatności': ['Politique de confidentialité', 'Privacybeleid', 'Privacy policy'],
  'Polityka cookies': ['Politique cookies', 'Cookiebeleid', 'Cookie policy'],
  'Regulamin serwisu': ['Conditions d\u2019utilisation', 'Gebruiksvoorwaarden', 'Terms of use'],
  'Ustawienia cookies': ['Paramètres cookies', 'Cookie-instellingen', 'Cookie settings'],
  'Prywatność i cookies': ['Confidentialité et cookies', 'Privacy en cookies', 'Privacy and cookies'],
  'Strona nie korzysta z analityki ani reklam. Pliki nieniezbędne włączamy wyłącznie za Twoją zgodą, którą możesz wycofać w każdej chwili.':
    ['Ce site n\u2019utilise ni outils d\u2019analyse ni publicité. Les fichiers non essentiels ne sont activés qu\u2019avec votre consentement, que vous pouvez retirer à tout moment.',
     'Deze site gebruikt geen analytische tools of reclame. Niet-noodzakelijke bestanden activeren we alleen met uw toestemming, die u altijd kunt intrekken.',
     'This site uses no analytics and no advertising. Non-essential files are enabled only with your consent, which you can withdraw at any time.'],

  /* --- cookies --- */
  'Szanujemy Twoją prywatność': ['Nous respectons votre vie privée', 'Wij respecteren uw privacy', 'We respect your privacy'],
  'Akceptuj wszystkie': ['Tout accepter', 'Alles aanvaarden', 'Accept all'],
  'Odrzuć wszystkie': ['Tout refuser', 'Alles weigeren', 'Reject all'],
  'Ustawienia': ['Paramètres', 'Instellingen', 'Settings'],
  'Zapisz wybór': ['Enregistrer mes choix', 'Keuze opslaan', 'Save choices'],
  'Ustawienia prywatności': ['Paramètres de confidentialité', 'Privacy-instellingen', 'Privacy settings'],
  'Niezbędne': ['Nécessaires', 'Noodzakelijk', 'Necessary'],
  'Funkcjonalne': ['Fonctionnels', 'Functioneel', 'Functional'],
  'Statystyczne': ['Statistiques', 'Statistisch', 'Statistics'],
  'Marketingowe': ['Marketing', 'Marketing', 'Marketing'],
  'ZAWSZE AKTYWNE': ['TOUJOURS ACTIFS', 'ALTIJD ACTIEF', 'ALWAYS ON'],
  'WŁĄCZONE': ['ACTIVÉ', 'AAN', 'ON'],
  'WYŁĄCZONE': ['DÉSACTIVÉ', 'UIT', 'OFF'],
  'POLITYKA PRYWATNOŚCI →': ['POLITIQUE DE CONFIDENTIALITÉ →', 'PRIVACYBELEID →', 'PRIVACY POLICY →'],
  'Zmień ustawienia': ['Modifier les paramètres', 'Instellingen wijzigen', 'Change settings'],
  'Wycofaj zgodę': ['Retirer le consentement', 'Toestemming intrekken', 'Withdraw consent'],

  /* --- zdania dłuższe, wspólne --- */
  'Używamy pamięci przeglądarki, żeby strona działała poprawnie. Pliki nieniezbędne — funkcjonalne, statystyczne i marketingowe — włączamy wyłącznie za Twoją zgodą. Nie mamy analityki ani reklam, a odmowa niczego tu nie blokuje. Szczegóły w polityce prywatności.':
    ['Nous utilisons la mémoire du navigateur pour que le site fonctionne correctement. Les fichiers non essentiels — fonctionnels, statistiques et marketing — ne sont activés qu\u2019avec votre consentement. Nous n\u2019avons ni outils d\u2019analyse ni publicité, et un refus ne bloque rien ici. Détails dans la politique de confidentialité.',
     'We gebruiken het geheugen van uw browser zodat de site correct werkt. Niet-noodzakelijke bestanden — functioneel, statistisch en marketing — activeren we alleen met uw toestemming. We hebben geen analyse-tools of reclame, en weigeren blokkeert hier niets. Details in het privacybeleid.',
     'We use browser storage so the site works properly. Non-essential files — functional, statistics and marketing — are enabled only with your consent. We have no analytics and no advertising, and refusing blocks nothing here. Details in the privacy policy.'],
  'Chcesz trenować z Polonią, wesprzeć klub albo przekazać materiały do archiwum? Wypełnij formularz, a wiadomość pójdzie prosto na skrzynkę klubu.':
    ['Vous voulez vous entraîner avec Polonia, soutenir le club ou nous confier des documents d\u2019archives ? Remplissez le formulaire, votre message arrivera directement dans la boîte du club.',
     'Wilt u met Polonia trainen, de club steunen of archiefmateriaal bezorgen? Vul het formulier in, uw bericht komt rechtstreeks in de mailbox van de club.',
     'Want to train with Polonia, support the club or share archive material? Fill in the form and your message goes straight to the club\u2019s mailbox.'],
  'FC POLONIA BRUKSELA': ['FC POLONIA BRUXELLES', 'FC POLONIA BRUSSEL', 'FC POLONIA BRUSSELS'],
};

/* Budujemy mapy dla każdego języka: oryginał → tłumaczenie. */
const MAPS = { fr: new Map(), nl: new Map(), en: new Map() };
for (const [pl, vals] of Object.entries(T)) {
  MAPS.fr.set(pl, vals[0]);
  MAPS.nl.set(pl, vals[1]);
  MAPS.en.set(pl, vals[2]);
}

/* --- teksty długie (artykuły, polityka, regulamin) ------------------------
   Dopasowywane po początku akapitu (PREFIX_LEN znaków), nie po całej treści.
   Dzięki temu drobna korekta w środku polskiego zdania nie psuje tłumaczenia. */

export const PREFIX_LEN = 45;
const PREFIX_MAPS = { fr: new Map(), nl: new Map(), en: new Map() };

export function registerLongform(entries) {
  for (const [prefix, vals] of Object.entries(entries)) {
    const k = prefix.slice(0, PREFIX_LEN);
    PREFIX_MAPS.fr.set(k, vals[0]);
    PREFIX_MAPS.nl.set(k, vals[1]);
    PREFIX_MAPS.en.set(k, vals[2]);
  }
}

/* Teksty długie ładujemy od razu — osobny plik, żeby słownik UI został czytelny. */
import { LONGFORM } from './i18n-longform.js';
registerLongform(LONGFORM);

/* ────────────────────────────────────────────── WARSTWA TŁUMACZĄCA DOM ── */

let active = 'pl';
let observer = null;

const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];

function translateNode(root, map, pmap) {
  // teksty
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
      return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const hits = [];
  let n;
  while ((n = walker.nextNode())) hits.push(n);
  for (const node of hits) {
    const raw = node.nodeValue;
    const key = raw.trim();
    let hit = map.get(key);
    // długie akapity — dopasowanie po początku tekstu
    if (hit === undefined && key.length >= PREFIX_LEN) {
      hit = pmap.get(key.replace(/\s+/g, ' ').slice(0, PREFIX_LEN));
    }
    if (hit === undefined) continue;
    // zapamiętujemy oryginał, żeby powrót do polskiego był bezstratny
    if (node.__pl === undefined) node.__pl = raw;
    node.nodeValue = key.length >= PREFIX_LEN && !map.has(key) ? hit : raw.replace(key, hit);
  }
  // atrybuty
  const els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label],[alt]') : [];
  for (const el of els) {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v) continue;
      const hit = map.get(v.trim());
      if (hit === undefined) continue;
      if (el.dataset['pl' + a.replace(/-/g, '')] === undefined) el.dataset['pl' + a.replace(/-/g, '')] = v;
      el.setAttribute(a, hit);
    }
  }
}

function restorePolish(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  let n;
  while ((n = walker.nextNode())) if (n.__pl !== undefined) { n.nodeValue = n.__pl; delete n.__pl; }
  const els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label],[alt]') : [];
  for (const el of els) {
    for (const a of ATTRS) {
      const k = 'pl' + a.replace(/-/g, '');
      if (el.dataset[k] !== undefined) { el.setAttribute(a, el.dataset[k]); delete el.dataset[k]; }
    }
  }
}

/** Włącza wybrany język i pilnuje go przy każdej zmianie widoku. */
export function applyLang(code) {
  active = code;
  if (observer) { observer.disconnect(); observer = null; }
  document.documentElement.lang = code;

  // Zawsze wracamy najpierw do oryginału — słownik jest kluczowany polskim,
  // więc przełączenie FR → NL bez tego kroku niczego by nie znalazło.
  restorePolish(document.body);
  if (code === 'pl') return;

  const map = MAPS[code];
  const pmap = PREFIX_MAPS[code];
  if (!map) return;

  // Strona przerysowuje się przy zmianie podstrony i po synchronizacji danych.
  // Zamiast rozłączać obserwatora na czas tłumaczenia (co gubiło zmiany
  // wprowadzone w tym samym momencie), pracujemy z flagą i krótkim debounce.
  let busy = false;
  let timer = 0;
  const run = () => {
    busy = true;
    try { translateNode(document.body, map, pmap); } finally {
      // odblokuj dopiero po zamknięciu bieżącej kolejki mutacji
      setTimeout(() => { busy = false; }, 0);
    }
  };
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(run, 60);
  };

  run();
  observer = new MutationObserver(() => { if (!busy) schedule(); });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  // Zmiana podstrony wymienia całe poddrzewo — tłumaczymy je jeszcze raz.
  if (!applyLang._hashHooked) {
    applyLang._hashHooked = true;
    window.addEventListener('hashchange', () => {
      if (active !== 'pl') setTimeout(() => applyLang(active), 120);
    });
  }
}

export const currentLang = () => active;

/** Tłumaczenie pojedynczego napisu POZA drzewem DOM — potrzebne tam, gdzie
 *  tekst nie trafia na stronę jako węzeł (tytuł karty przeglądarki, atrybuty
 *  składane w kodzie). Gdy nie ma go w słowniku, zwraca oryginał. */
export function translate(text, lang) {
  const code = lang || active;
  const map = MAPS[code];
  if (!map || !text) return text;
  return map.get(String(text).trim()) || text;
}
