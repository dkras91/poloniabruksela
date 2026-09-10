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
  'Chcesz trenować z Polonią, wesprzeć klub albo przekazać materiały do archiwum? Wypełnij formularz — wiadomość trafi na polonia@live.be.':
    ['Vous voulez vous entraîner avec Polonia, soutenir le club ou nous confier des documents d\u2019archives ? Remplissez le formulaire — votre message arrivera à polonia@live.be.',
     'Wilt u met Polonia trainen, de club steunen of archiefmateriaal bezorgen? Vul het formulier in — uw bericht komt aan op polonia@live.be.',
     'Want to train with Polonia, support the club or share archive material? Fill in the form — your message goes to polonia@live.be.'],
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
