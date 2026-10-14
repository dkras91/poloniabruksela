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
  /* --- Backstage Polonia: podstrona wideo --- */
  'Backstage': ['Backstage', 'Backstage', 'Backstage'],
  'KANAŁ WIDEO KLUBU': ['LA CHAÎNE VIDÉO DU CLUB', 'HET VIDEOKANAAL VAN DE CLUB', 'THE CLUB VIDEO CHANNEL'],
  'Zajrzyj za kulisy FC Polonia Bruksela.': [
    'Passez dans les coulisses du FC Polonia Bruxelles.',
    'Kijk achter de schermen bij FC Polonia Brussel.',
    'Step behind the scenes at FC Polonia Brussels.'],
  'Backstage Polonia to mecze, emocje, szatnia, kibice i wszystko to, czego nie zobaczysz w samym wyniku spotkania. Pokazujemy Polonię od środka — przed meczem, podczas spotkania i po ostatnim gwizdku.': [
    'Backstage Polonia, ce sont les matchs, les émotions, le vestiaire, les supporters et tout ce que le score ne montre pas. Nous montrons Polonia de l’intérieur — avant le match, pendant la rencontre et après le coup de sifflet final.',
    'Backstage Polonia, dat zijn de wedstrijden, de emoties, de kleedkamer, de supporters en alles wat je niet ziet in de uitslag. We tonen Polonia van binnenuit — voor de match, tijdens de wedstrijd en na het laatste fluitsignaal.',
    'Backstage Polonia is the matches, the emotions, the dressing room, the supporters and everything the scoreline never shows. We show Polonia from the inside — before the match, during the game and after the final whistle.'],
  'Oglądaj na YouTube': ['Regarder sur YouTube', 'Bekijk op YouTube', 'Watch on YouTube'],
  'Backstage Polonia — logo serii wideo FC Polonia Bruksela': [
    'Backstage Polonia — logo de la série vidéo du FC Polonia Bruxelles',
    'Backstage Polonia — logo van de videoreeks van FC Polonia Brussel',
    'Backstage Polonia — logo of the FC Polonia Brussels video series'],
  'Najnowszy odcinek': ['Dernier épisode', 'Nieuwste aflevering', 'Latest episode'],
  'Wszystkie odcinki': ['Tous les épisodes', 'Alle afleveringen', 'All episodes'],
  /* --- okienko z najbliższym meczem --- */
  'RYWAL W TABELI': ['L’ADVERSAIRE AU CLASSEMENT', 'DE TEGENSTANDER IN HET KLASSEMENT', 'THE OPPONENT IN THE TABLE'],
  'KIEDY': ['QUAND', 'WANNEER', 'WHEN'],
  'GDZIE': ['OÙ', 'WAAR', 'WHERE'],
  'Szczegóły meczu': ['Détails du match', 'Matchdetails', 'Match details'],
  'ZAMKNIJ': ['FERMER', 'SLUITEN', 'CLOSE'],

  'NAJNOWSZY ODCINEK': ['DERNIER ÉPISODE', 'NIEUWSTE AFLEVERING', 'LATEST EPISODE'],
  'Kanał wideo klubu. Szatnia, trybuny i to, czego nie widać w samym wyniku — Polonia od środka.': [
    'La chaîne vidéo du club. Le vestiaire, les tribunes et tout ce que le score ne montre pas — Polonia de l’intérieur.',
    'Het videokanaal van de club. De kleedkamer, de tribunes en alles wat de uitslag niet toont — Polonia van binnenuit.',
    'The club’s video channel. The dressing room, the stands and everything the scoreline hides — Polonia from the inside.'],
  'Za kulisami meczu': ['Dans les coulisses du match', 'Achter de schermen van de match', 'Behind the scenes of the match'],
  'Skróty i bramki': ['Résumés et buts', 'Samenvattingen en doelpunten', 'Highlights and goals'],
  'Z życia klubu': ['La vie du club', 'Uit het clubleven', 'Club life'],
  'ZA KULISAMI': ['DANS LES COULISSES', 'ACHTER DE SCHERMEN', 'BEHIND THE SCENES'],
  'SKRÓT MECZU': ['RÉSUMÉ DU MATCH', 'MATCHSAMENVATTING', 'MATCH HIGHLIGHTS'],
  /* 'Z ŻYCIA KLUBU' jest już w słowniku niżej (kategoria wpisów) — ta sama
     etykieta służy tu kafelkom Backstage, więc nie dublujemy klucza. */
  'OGLĄDAJ': ['REGARDER', 'BEKIJKEN', 'WATCH'],
  'Odtwórz odcinek': ['Lire l’épisode', 'Aflevering afspelen', 'Play episode'],
  'ODTWARZACZ YOUTUBE': ['LECTEUR YOUTUBE', 'YOUTUBE-SPELER', 'YOUTUBE PLAYER'],
  'Odtwarzacz pochodzi z serwerów YouTube, dlatego nie wczytujemy go bez Twojej zgody. Kliknięcie włącza kategorię „Filmy YouTube" — możesz ją wyłączyć w ustawieniach prywatności w stopce.': [
    'Le lecteur provient des serveurs de YouTube, nous ne le chargeons donc pas sans votre accord. Un clic active la catégorie « Vidéos YouTube » — vous pouvez la désactiver dans les paramètres de confidentialité en bas de page.',
    'De speler komt van de servers van YouTube, daarom laden we hem niet zonder jouw toestemming. Eén klik schakelt de categorie „YouTube-video’s" in — je kunt die uitzetten in de privacy-instellingen onderaan de pagina.',
    'The player comes from YouTube’s servers, so we do not load it without your consent. One click enables the “YouTube videos” category — you can switch it off in the privacy settings in the footer.'],
  'Odtwarzacz pochodzi z serwerów YouTube. Włączyć go i odtworzyć odcinek?': [
    'Le lecteur provient des serveurs de YouTube. L’activer et lancer l’épisode ?',
    'De speler komt van de servers van YouTube. Inschakelen en de aflevering afspelen?',
    'The player comes from YouTube’s servers. Enable it and play the episode?'],
  'Włącz i odtwórz': ['Activer et lire', 'Inschakelen en afspelen', 'Enable and play'],
  'OBEJRZYJ NA YOUTUBE': ['VOIR SUR YOUTUBE', 'BEKIJK OP YOUTUBE', 'WATCH ON YOUTUBE'],
  'Czym jest Backstage Polonia?': [
    'Qu’est-ce que Backstage Polonia ?',
    'Wat is Backstage Polonia?',
    'What is Backstage Polonia?'],
  'Backstage Polonia zabiera Was tam, gdzie podczas meczu zazwyczaj nie docierają kibice. Kamera jest z drużyną przed spotkaniem, przy murawie, na trybunach i po ostatnim gwizdku.': [
    'Backstage Polonia vous emmène là où les supporters n’ont généralement pas accès pendant un match. La caméra suit l’équipe avant la rencontre, au bord du terrain, dans les tribunes et après le coup de sifflet final.',
    'Backstage Polonia neemt je mee naar plekken waar supporters tijdens een wedstrijd meestal niet komen. De camera is bij de ploeg voor de match, langs het veld, op de tribune en na het laatste fluitsignaal.',
    'Backstage Polonia takes you where supporters usually cannot go on a matchday. The camera is with the team before kick-off, on the touchline, in the stands and after the final whistle.'],
  'Znajdziecie tutaj relacje z meczów FC Polonia Bruksela, najważniejsze akcje i bramki, reakcje zawodników i trenerów, rozmowy z kibicami, materiały zza kulis oraz wyjątkowe momenty z życia klubu.': [
    'Vous y trouverez les comptes rendus des matchs du FC Polonia Bruxelles, les actions et les buts les plus marquants, les réactions des joueurs et des entraîneurs, des échanges avec les supporters, des images des coulisses et des moments à part dans la vie du club.',
    'Je vindt er verslagen van de wedstrijden van FC Polonia Brussel, de belangrijkste acties en doelpunten, reacties van spelers en trainers, gesprekken met supporters, beelden van achter de schermen en bijzondere momenten uit het clubleven.',
    'You will find reports from FC Polonia Brussels matches, the key moments and goals, reactions from players and coaches, conversations with supporters, behind-the-scenes footage and special moments from the life of the club.'],
  'Nie przegap kolejnego odcinka': [
    'Ne manquez pas le prochain épisode',
    'Mis de volgende aflevering niet',
    'Do not miss the next episode'],
  'Nowe mecze. Nowe emocje. Nowe historie. Subskrybuj kanał FC Polonia Bruksela na YouTube i bądź z nami także poza boiskiem.': [
    'De nouveaux matchs. De nouvelles émotions. De nouvelles histoires. Abonnez-vous à la chaîne YouTube du FC Polonia Bruxelles et suivez-nous aussi en dehors du terrain.',
    'Nieuwe wedstrijden. Nieuwe emoties. Nieuwe verhalen. Abonneer je op het YouTube-kanaal van FC Polonia Brussel en blijf ook naast het veld bij ons.',
    'New matches. New emotions. New stories. Subscribe to the FC Polonia Brussels channel on YouTube and stay with us off the pitch too.'],
  'Subskrybuj na YouTube': ['S’abonner sur YouTube', 'Abonneer je op YouTube', 'Subscribe on YouTube'],
  'Pierwsze odcinki pojawią się wkrótce. Do tego czasu zajrzyj na nasz kanał na YouTube.': [
    'Les premiers épisodes arrivent bientôt. En attendant, rendez-vous sur notre chaîne YouTube.',
    'De eerste afleveringen komen binnenkort. Kijk tot dan op ons YouTube-kanaal.',
    'The first episodes are coming soon. Until then, have a look at our YouTube channel.'],

  /* --- Backstage Polonia: tytuły i opisy odcinków --- */
  'Gol dla ukochanej. Zwycięstwo uciekło w 91. minucie': [
    'Un but pour sa bien-aimée. La victoire s’est envolée à la 91e minute',
    'Een goal voor zijn geliefde. De zege glipte weg in de 91e minuut',
    'A goal for his girlfriend. The win slipped away in the 91st minute'],
  'Pierwszy gol Michała Niewińskiego w sezonie i cieszynka dedykowana dziewczynie. Po bezbramkowej połowie gospodarze wyszli na prowadzenie, Polonia odwróciła wynik w pięć minut, a remis przypieczętowała 91. minuta.': [
    'Le premier but de la saison de Michał Niewiński et une célébration dédiée à sa compagne. Après une première période sans but, les locaux ont ouvert le score, Polonia a renversé la rencontre en cinq minutes, et la 91e minute a scellé le partage.',
    'Het eerste seizoensdoelpunt van Michał Niewiński en een viering opgedragen aan zijn vriendin. Na een doelpuntloze eerste helft kwamen de gastheren op voorsprong, Polonia draaide de wedstrijd om in vijf minuten, en de 91e minuut bezegelde het gelijkspel.',
    'Michał Niewiński’s first goal of the season and a celebration dedicated to his girlfriend. After a goalless first half the hosts went ahead, Polonia turned the game around in five minutes, and the 91st minute sealed the draw.'],
  'Rodzina Polonii rośnie. Wspólny grill, kibice i świetna atmosfera': [
    'La famille de Polonia s’agrandit. Barbecue, supporters et belle ambiance',
    'De familie van Polonia groeit. Samen barbecueën, supporters en een prima sfeer',
    'The Polonia family is growing. A shared barbecue, supporters and a great atmosphere'],
  'Przy okazji meczu oldbojów klub zaprosił zawodników, rodziny i kibiców na wspólnego grilla. Tego dnia wynik był najmniej ważny — liczyły się rozmowy, dzieci i czas spędzony razem.': [
    'À l’occasion du match des vétérans, le club a invité joueurs, familles et supporters à un barbecue. Ce jour-là, le score comptait le moins : ce qui importait, c’étaient les discussions, les enfants et le temps passé ensemble.',
    'Bij de wedstrijd van de oldtimers nodigde de club spelers, families en supporters uit voor een barbecue. Die dag deed de uitslag er het minst toe: het ging om de gesprekken, de kinderen en de tijd samen.',
    'At the veterans’ match the club invited players, families and supporters to a barbecue. That day the score mattered least — what counted were the conversations, the children and the time spent together.'],
  'Połamany palec i walka do końca. Wygrywamy 2:1': [
    'Un doigt cassé et la lutte jusqu’au bout. Nous gagnons 2:1',
    'Een gebroken vinger en knokken tot het einde. We winnen met 2:1',
    'A broken finger and a fight to the end. We win 2:1'],
  'Piąta kolejka od środka: bramka Fryderyka Borowego w 9. minucie, wyrównanie rywali tuż przed przerwą i walka do ostatniego gwizdka.': [
    'La cinquième journée de l’intérieur : le but de Fryderyk Borowy à la 9e minute, l’égalisation adverse juste avant la pause et la lutte jusqu’au coup de sifflet final.',
    'De vijfde speeldag van binnenuit: het doelpunt van Fryderyk Borowy in de 9e minuut, de gelijkmaker van de tegenstander vlak voor rust en knokken tot het laatste fluitsignaal.',
    'Matchday five from the inside: Fryderyk Borowy’s goal in the 9th minute, the opponents’ equaliser just before the break and a fight to the final whistle.'],
  'Patryk Węgliński już w Brukseli. Dołącza do FC Polonia': [
    'Patryk Węgliński est à Bruxelles. Il rejoint le FC Polonia',
    'Patryk Węgliński is in Brussel. Hij komt bij FC Polonia',
    'Patryk Węgliński is in Brussels. He joins FC Polonia'],
  'Transfer sfinalizowany jeszcze w oknie transferowym, a na początku października Patryk przeprowadził się do Brukseli. Pierwsze dni nowego zawodnika w klubie.': [
    'Le transfert a été finalisé pendant le mercato et, début octobre, Patryk s’est installé à Bruxelles. Les premiers jours du nouveau joueur au club.',
    'De transfer werd nog tijdens de transferperiode afgerond en begin oktober verhuisde Patryk naar Brussel. De eerste dagen van de nieuwe speler bij de club.',
    'The transfer was completed during the window, and in early October Patryk moved to Brussels. The new player’s first days at the club.'],
  'FC Polonia Bruksela 2:1 RU Auderghem B — wszystkie bramki': [
    'FC Polonia Bruxelles 2:1 RU Auderghem B — tous les buts',
    'FC Polonia Brussel 2:1 RU Auderghem B — alle doelpunten',
    'FC Polonia Brussels 2:1 RU Auderghem B — all the goals'],
  'Skrót spotkania i wszystkie trzy bramki. Dla Polonii trafili Fryderyk Borowy i Artur Ciborowski.': [
    'Le résumé de la rencontre et les trois buts. Pour Polonia, Fryderyk Borowy et Artur Ciborowski ont marqué.',
    'De samenvatting van de wedstrijd en alle drie de doelpunten. Voor Polonia scoorden Fryderyk Borowy en Artur Ciborowski.',
    'Match highlights and all three goals. Fryderyk Borowy and Artur Ciborowski scored for Polonia.'],
  'Miało być 3:1, skończyło się 4:0': [
    'On annonçait 3:1, cela s’est terminé 4:0',
    'Het zou 3:1 worden, het werd 4:0',
    'It was meant to be 3:1, it ended 4:0'],
  'Czwarta kolejka za kulisami: szatnia przed pierwszym gwizdkiem, cztery bramki i rozmowy po meczu wygranym do zera.': [
    'La quatrième journée dans les coulisses : le vestiaire avant le coup d’envoi, quatre buts et les réactions après une victoire sans encaisser.',
    'De vierde speeldag achter de schermen: de kleedkamer voor het eerste fluitsignaal, vier doelpunten en gesprekken na een zege zonder tegendoelpunt.',
    'Matchday four behind the scenes: the dressing room before kick-off, four goals and the talk after a clean-sheet win.'],
  'A gdyby Polonia zagrała w Lidze Mistrzów?': [
    'Et si Polonia jouait la Ligue des champions ?',
    'En als Polonia in de Champions League speelde?',
    'What if Polonia played in the Champions League?'],
  'Wyjście na murawę z dziecięcą eskortą, przywitanie z sędziami i rywalem — zwykły mecz w niezwykłym, wielkim klimacie.': [
    'L’entrée sur la pelouse avec une escorte d’enfants, le salut aux arbitres et à l’adversaire — un match ordinaire dans une ambiance de grand soir.',
    'De opkomst op het veld met een kinderescorte, de begroeting van de scheidsrechters en de tegenstander — een gewone wedstrijd in een buitengewone sfeer.',
    'Walking out with a children’s escort, greeting the referees and the opponents — an ordinary match with the feel of a big occasion.'],
  '7 awansów do Jupiler Pro League? Gdzie gra FC Polonia Bruksela': [
    '7 montées jusqu’à la Jupiler Pro League ? Où joue le FC Polonia Bruxelles',
    '7 promoties tot de Jupiler Pro League? Waar speelt FC Polonia Brussel',
    '7 promotions to the Jupiler Pro League? Where FC Polonia Brussels plays'],
  'Ósmy poziom rozgrywek w Belgii, trzynaście drużyn, dwadzieścia cztery mecze i aż siedem szczebli dzielących Polonię od ekstraklasy.': [
    'Le huitième niveau du football belge, treize équipes, vingt-quatre matchs et sept échelons entre Polonia et l’élite.',
    'Het achtste niveau van het Belgische voetbal, dertien ploegen, vierentwintig wedstrijden en zeven treden tussen Polonia en de hoogste klasse.',
    'The eighth tier of Belgian football, thirteen teams, twenty-four matches and seven steps between Polonia and the top flight.'],
  'Belgijska piramida piłkarska wytłumaczona prosto — i miejsce, które zajmuje w niej nasz klub.': [
    'La pyramide du football belge expliquée simplement — et la place qu’y occupe notre club.',
    'De Belgische voetbalpiramide eenvoudig uitgelegd — en de plaats die onze club erin inneemt.',
    'The Belgian football pyramid explained simply — and where our club sits in it.'],
  'Kazik na podsłuchu. Rozgrzewka przed 3. kolejką': [
    'Kazik sur écoute. L’échauffement avant la 3e journée',
    'Kazik afgeluisterd. De opwarming voor de 3e speeldag',
    'Kazik miked up. The warm-up before matchday 3'],
  'Kazimierz Zieliński, asystent trenera, z mikrofonem podczas rozgrzewki. Przygotowania do meczu słyszane od środka.': [
    'Kazimierz Zieliński, entraîneur adjoint, micro ouvert pendant l’échauffement. La préparation du match entendue de l’intérieur.',
    'Kazimierz Zieliński, assistent-trainer, met een microfoon tijdens de opwarming. De voorbereiding op de match van binnenuit gehoord.',
    'Assistant coach Kazimierz Zieliński wearing a microphone during the warm-up. Match preparation heard from the inside.'],
  'Rusza Backstage Polonia Bruksela': [
    'Backstage Polonia Bruxelles démarre',
    'Backstage Polonia Brussel gaat van start',
    'Backstage Polonia Brussels is starting'],
  'Zapowiedź kanału i tego, co będziemy pokazywać przez cały sezon.': [
    'La présentation de la chaîne et de ce que nous montrerons tout au long de la saison.',
    'De aankondiging van het kanaal en van wat we het hele seizoen zullen tonen.',
    'An introduction to the channel and what we will be showing all season.'],

  /* --- sklep internetowy --- */
  'Sklep': ['Boutique', 'Shop', 'Shop'],
  'Sklep internetowy': ['Boutique en ligne', 'Webshop', 'Online shop'],
  'W BUDOWIE': ['EN CONSTRUCTION', 'IN OPBOUW', 'UNDER CONSTRUCTION'],
  'SKLEP RUSZY W SEZONIE 2026/2027': [
    'LA BOUTIQUE OUVRIRA DURANT LA SAISON 2026/2027',
    'DE WEBSHOP OPENT IN HET SEIZOEN 2026/2027',
    'THE SHOP OPENS DURING THE 2026/2027 SEASON'],
  'Pracujemy nad klubowym sklepem. Znajdą się w nim koszulki, szaliki i gadżety z herbem Polonii — te same, w których chodzą zawodnicy, sztab i kibice na trybunach.': [
    'Nous préparons la boutique du club. On y trouvera les maillots, les écharpes et les accessoires au blason de Polonia — les mêmes que portent les joueurs, le staff et les supporters dans les tribunes.',
    'We werken aan de clubshop. Je vindt er shirts, sjaals en gadgets met het embleem van Polonia — dezelfde die spelers, staf en supporters op de tribune dragen.',
    'We are building the club shop. It will carry the shirts, scarves and accessories with the Polonia crest — the same ones worn by the players, the staff and the supporters in the stands.'],
  'Zanim sklep ruszy, po koszulkę albo szalik można zgłosić się wprost do klubu. Napisz do nas albo złap nas na Facebooku — powiemy, co jest akurat dostępne i w jakich rozmiarach.': [
    'En attendant l’ouverture, pour un maillot ou une écharpe, adressez-vous directement au club. Écrivez-nous ou contactez-nous sur Facebook — nous vous dirons ce qui est disponible et dans quelles tailles.',
    'Tot de shop opent, kun je voor een shirt of sjaal rechtstreeks bij de club terecht. Schrijf ons of zoek ons op Facebook — we zeggen je wat er is en in welke maten.',
    'Until the shop opens, ask the club directly for a shirt or a scarf. Write to us or catch us on Facebook — we will tell you what is in stock and in which sizes.'],
  'Napisz do klubu': ['Écrire au club', 'Schrijf naar de club', 'Write to the club'],
  'Napisz na Facebooku': ['Nous écrire sur Facebook', 'Schrijf ons op Facebook', 'Message us on Facebook'],

  /* --- sklep: siatka produktów --- */
  'Koszulki, bluzy i szaliki z herbem Polonii — te same, w których chodzą zawodnicy, sztab i kibice na trybunach. Wybierz produkt, a zamówienie złóż formularzem na dole strony.': [
    'T-shirts, sweats et écharpes au blason de Polonia — les mêmes que portent les joueurs, le staff et les supporters dans les tribunes. Choisissez un article et passez commande avec le formulaire en bas de page.',
    'Shirts, sweaters en sjaals met het embleem van Polonia — dezelfde die spelers, staf en supporters op de tribune dragen. Kies een artikel en bestel via het formulier onderaan de pagina.',
    'Shirts, hoodies and scarves with the Polonia crest — the same ones worn by the players, the staff and the supporters in the stands. Pick an item and order through the form at the bottom of the page.'],
  'Zamów': ['Commander', 'Bestellen', 'Order'],
  'Chwilowo niedostępne': ['Momentanément indisponible', 'Tijdelijk niet beschikbaar', 'Temporarily unavailable'],
  'Cena do ustalenia': ['Prix à confirmer', 'Prijs nog te bepalen', 'Price to be confirmed'],
  'KOLORY': ['COULEURS', 'KLEUREN', 'COLOURS'],
  'czarna': ['noir', 'zwart', 'black'],
  'biała': ['blanc', 'wit', 'white'],

  /* --- sklep: produkty --- */
  'Szalik 40 lat tradycji': ['Écharpe 40 ans de tradition', 'Sjaal 40 jaar traditie', '40 years of tradition scarf'],
  'Dziany szalik na czterdziestolecie klubu, z herbem na obu końcach i napisem POLONIA RAZEM!': [
    'Écharpe tricotée pour les quarante ans du club, avec le blason aux deux extrémités et l’inscription POLONIA RAZEM!',
    'Gebreide sjaal voor de veertigste verjaardag van de club, met het embleem aan beide uiteinden en het opschrift POLONIA RAZEM!',
    'Knitted scarf for the club’s fortieth anniversary, with the crest at both ends and the POLONIA RAZEM! lettering.'],
  'Bluza z kapturem': ['Sweat à capuche', 'Hoodie', 'Hooded sweatshirt'],
  'Czarna bluza z szarymi rękawami i biało-czerwoną opaską, z nadrukiem WE ARE POLONIA na plecach.': [
    'Sweat noir à manches grises et brassard blanc-rouge, avec l’impression WE ARE POLONIA dans le dos.',
    'Zwarte hoodie met grijze mouwen en wit-rode armband, met de opdruk WE ARE POLONIA op de rug.',
    'Black hoodie with grey sleeves and a white-and-red armband, with a WE ARE POLONIA print on the back.'],
  'Koszulka polo z herbem': ['Polo au blason', 'Polo met embleem', 'Polo shirt with crest'],
  'Czerwone polo z białą lamówką i haftowanym herbem klubu na piersi.': [
    'Polo rouge à liseré blanc et blason du club brodé sur la poitrine.',
    'Rode polo met witte bies en geborduurd clubembleem op de borst.',
    'Red polo shirt with white piping and the club crest embroidered on the chest.'],
  'Koszulka POLONIA RAZEM!': ['T-shirt POLONIA RAZEM!', 'Shirt POLONIA RAZEM!', 'POLONIA RAZEM! T-shirt'],
  'Herb w wieńcu i hasło klubu w czerni i złocie. Do wyboru wersja czarna albo biała.': [
    'Le blason dans sa couronne et la devise du club en noir et or. Au choix en noir ou en blanc.',
    'Het embleem in de lauwerkrans en de clubleuze in zwart en goud. Te kiezen in zwart of wit.',
    'The crest in its wreath and the club motto in black and gold. Available in black or white.'],
  'Koszulka Powstanie Warszawskie': ['T-shirt Insurrection de Varsovie', 'Shirt Opstand van Warschau', 'Warsaw Uprising T-shirt'],
  'Nadruk pamiątkowy z powstańcem i herbem klubu, z dopiskiem CZEŚĆ I CHWAŁA BOHATEROM.': [
    'Impression commémorative représentant un insurgé et le blason du club, avec la mention CZEŚĆ I CHWAŁA BOHATEROM — honneur et gloire aux héros.',
    'Herdenkingsopdruk met een opstandeling en het clubembleem, met het opschrift CZEŚĆ I CHWAŁA BOHATEROM — eer en glorie aan de helden.',
    'Commemorative print of an insurgent and the club crest, with the words CZEŚĆ I CHWAŁA BOHATEROM — honour and glory to the heroes.'],
  'Koszulka Polonia': ['T-shirt Polonia', 'Shirt Polonia', 'Polonia T-shirt'],
  'Czarna koszulka z czerwonym napisem Polonia w stylu baseballowym i herbem w wieńcu.': [
    'T-shirt noir avec l’inscription Polonia en rouge, façon baseball, et le blason dans sa couronne.',
    'Zwart shirt met het rode opschrift Polonia in baseballstijl en het embleem in de lauwerkrans.',
    'Black T-shirt with the Polonia lettering in red, baseball style, and the crest in its wreath.'],
  'Koszulka z pasami': ['T-shirt à bandes', 'Shirt met strepen', 'Striped T-shirt'],
  'Czarna koszulka z biało-czerwonymi pasami, herbem na środku i polską flagą na rękawie.': [
    'T-shirt noir à bandes blanches et rouges, blason au centre et drapeau polonais sur la manche.',
    'Zwart shirt met wit-rode strepen, embleem in het midden en de Poolse vlag op de mouw.',
    'Black T-shirt with white and red stripes, the crest in the centre and the Polish flag on the sleeve.'],
  'Koszulka Extreme Life': ['T-shirt Extreme Life', 'Shirt Extreme Life', 'Extreme Life T-shirt'],
  'Czarna koszulka z godłem Polski obok herbu klubu i napisem Extreme Life.': [
    'T-shirt noir avec les armoiries de la Pologne à côté du blason du club et l’inscription Extreme Life.',
    'Zwart shirt met het Poolse wapen naast het clubembleem en het opschrift Extreme Life.',
    'Black T-shirt with the Polish coat of arms beside the club crest and the Extreme Life lettering.'],
  'Koszulka TC Fanace': ['T-shirt TC Fanace', 'Shirt TC Fanace', 'TC Fanace T-shirt'],
  'Czarna koszulka z kibicowskim nadrukiem i napisem Polonia Bruksela.': [
    'T-shirt noir avec une impression de supporters et l’inscription Polonia Bruxelles.',
    'Zwart shirt met een supportersopdruk en het opschrift Polonia Brussel.',
    'Black T-shirt with a supporters’ print and the Polonia Brussels lettering.'],

  /* --- sklep: formularz zamówienia --- */
  'Złóż zamówienie': ['Passer commande', 'Bestelling plaatsen', 'Place an order'],
  'Formularz nie jest płatnością. Po wysłaniu odezwiemy się mailem, żeby potwierdzić dostępność rozmiaru, kwotę i sposób odbioru.': [
    'Ce formulaire n’est pas un paiement. Après l’envoi, nous vous écrirons par e-mail pour confirmer la disponibilité de la taille, le montant et le mode de retrait.',
    'Dit formulier is geen betaling. Na verzending mailen we je om de beschikbaarheid van de maat, het bedrag en de manier van afhalen te bevestigen.',
    'This form is not a payment. After you send it we will e-mail you to confirm the size, the amount and how to collect the item.'],
  'PRODUKT': ['ARTICLE', 'ARTIKEL', 'ITEM'],
  'ROZMIAR': ['TAILLE', 'MAAT', 'SIZE'],
  'KOLOR': ['COULEUR', 'KLEUR', 'COLOUR'],
  'ILOŚĆ': ['QUANTITÉ', 'AANTAL', 'QUANTITY'],
  'TELEFON — NIEOBOWIĄZKOWO': ['TÉLÉPHONE — FACULTATIF', 'TELEFOON — OPTIONEEL', 'PHONE — OPTIONAL'],
  'UWAGI — NIEOBOWIĄZKOWO': ['REMARQUES — FACULTATIF', 'OPMERKINGEN — OPTIONEEL', 'NOTES — OPTIONAL'],
  'Wybierz produkt': ['Choisissez un article', 'Kies een artikel', 'Choose an item'],
  'Np. odbiór na meczu, inny rozmiar, kilka sztuk w różnych rozmiarach.': [
    'Par ex. retrait au match, autre taille, plusieurs pièces en tailles différentes.',
    'Bijv. afhalen op de wedstrijd, een andere maat, meerdere stuks in verschillende maten.',
    'E.g. collection at a match, a different size, several items in different sizes.'],
  'Wyślij zamówienie': ['Envoyer la commande', 'Bestelling versturen', 'Send the order'],
  'Wybierz produkt z listy.': ['Choisissez un article dans la liste.', 'Kies een artikel uit de lijst.', 'Please choose an item from the list.'],
  'Nie udało się wysłać zamówienia. Sprawdź połączenie albo napisz bezpośrednio na polonia@live.be.': [
    'L’envoi de la commande a échoué. Vérifiez votre connexion ou écrivez directement à polonia@live.be.',
    'De bestelling kon niet worden verzonden. Controleer je verbinding of schrijf rechtstreeks naar polonia@live.be.',
    'The order could not be sent. Check your connection or write directly to polonia@live.be.'],
  'Zamówienie wysyłamy prosto ze strony — nie musisz mieć skonfigurowanej poczty. Wolisz napisać bezpośrednio?': [
    'La commande part directement du site — pas besoin d’une messagerie configurée. Vous préférez écrire directement ?',
    'De bestelling vertrekt rechtstreeks vanaf de site — je hebt geen ingestelde mailclient nodig. Liever rechtstreeks schrijven?',
    'The order is sent straight from the site — you do not need a mail client set up. Prefer to write directly?'],
  'Zamówienie przyjęte': ['Commande reçue', 'Bestelling ontvangen', 'Order received'],
  'Dziękujemy. Twoje zamówienie trafiło na skrzynkę klubu. Odezwiemy się mailem, żeby potwierdzić dostępność, kwotę i sposób odbioru. Zamówienia obsługują wolontariusze, więc odpowiedź może zająć dzień albo dwa.': [
    'Merci. Votre commande est arrivée dans la boîte du club. Nous vous écrirons par e-mail pour confirmer la disponibilité, le montant et le mode de retrait. Ce sont des bénévoles qui s’en occupent, la réponse peut donc prendre un jour ou deux.',
    'Bedankt. Je bestelling is in de mailbox van de club aangekomen. We mailen je om de beschikbaarheid, het bedrag en de manier van afhalen te bevestigen. Vrijwilligers doen dit werk, dus een antwoord kan een dag of twee duren.',
    'Thank you. Your order has reached the club’s inbox. We will e-mail you to confirm availability, the amount and how to collect the item. Volunteers handle the orders, so a reply may take a day or two.'],
  'ZAMÓWIONY PRODUKT': ['ARTICLE COMMANDÉ', 'BESTELD ARTIKEL', 'ITEM ORDERED'],
  'ZAMÓW COŚ JESZCZE': ['COMMANDER AUTRE CHOSE', 'NOG IETS BESTELLEN', 'ORDER SOMETHING ELSE'],
  'Zawodnicy FC Polonia Bruksela w koszulkach POLONIA RAZEM! na trybunach stadionu': [
    'Des joueurs du FC Polonia Bruxelles en maillots POLONIA RAZEM! dans les tribunes du stade',
    'Spelers van FC Polonia Brussel in POLONIA RAZEM!-shirts op de tribune van het stadion',
    'FC Polonia Brussels players in POLONIA RAZEM! shirts in the stadium stands'],

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
  'Obserwuj relacje z meczu na naszym Facebooku': [
    'Suivez les matchs en direct sur notre Facebook',
    'Volg de wedstrijdverslagen op onze Facebook',
    'Follow our match coverage on Facebook'],
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
  'Nie udało się wysłać wiadomości. Sprawdź połączenie albo napisz bezpośrednio na damian.kras@dkte.be.': [
    'L’envoi a échoué. Vérifiez votre connexion ou écrivez directement à damian.kras@dkte.be.',
    'Verzenden is mislukt. Controleer je verbinding of mail rechtstreeks naar damian.kras@dkte.be.',
    'Sending failed. Check your connection or write directly to damian.kras@dkte.be.'],
  'Sprawa pilna? Napisz wprost na damian.kras@dkte.be albo złap nas na Facebooku.': [
    'C’est urgent ? Écrivez directement à damian.kras@dkte.be ou contactez-nous sur Facebook.',
    'Dringend? Mail rechtstreeks naar damian.kras@dkte.be of zoek ons op Facebook.',
    'Urgent? Write straight to damian.kras@dkte.be or catch us on Facebook.'],
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
