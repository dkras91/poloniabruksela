# FC Polonia Bruksela — Design System

Klub piłkarski FC Polonia Bruksela. Ten system obsługuje generator grafik social media klubu — plakaty meczowe, wyniki, ogłoszenia transferowe — w dwóch niezależnych trybach:

1. **Tryb z wyciętym zawodnikiem** (istniejący, poza zakresem tego projektu — nie jest tu odtworzony, bo nie dostarczono jego materiałów).
2. **Tryb Pełne zdjęcie / Full Photo** (`ui_kits/graphic-generator/`) — nowy, zbudowany w tym przebiegu. Zdjęcie z telefonu wypełnia całą grafikę bez wycinania tła; tekst ograniczony do 3 poziomów; szczegóły trafiają do opisu posta.

**Źródła:**
- `uploads/Polonia Bruksela.pdf` — plik wektorowy herbu klubu ("Herb Polonia Bruksela 2024", Illustrator). Zawiera tylko grafikę wektorową bez tekstu i bez rastrowych obrazów.
- `uploads/FC_Polonia_Bruksela_Full_Photo_Kit.pdf` — brief trybu Pełne zdjęcie: zasady tekstu, palety, typografii, kompozycji, eksportu.

## Herb klubu

Oryginalny wektorowy PDF (`uploads/Polonia Bruksela.pdf`) nie udało się wyrenderować w tym środowisku. Prawdziwy herb (tarcza + wieniec laurowy, rok 1986) został jednak wycięty z przykładowych grafik referencyjnych dostarczonych przez użytkownika (`uploads/0*_full_photo_*.png`) i zapisany jako `assets/crest.png` (przezroczyste tło) — generator używa go teraz we wszystkich szablonach. Jeśli dostępny jest osobny plik wektorowy/wysokiej rozdzielczości, warto go podmienić dla lepszej ostrości przy eksporcie.

## Components
Zbiór podstawowych elementów UI panelu edycji (`components/core/`): **Button**, **Input**, **Select**, **Slider**, **Toggle**, **Badge**. Brak dostarczonej biblioteki komponentów/Figmy — zestaw jest standardowy, dopasowany do potrzeb panelu generatora grafik.

## Content fundamentals
- Język: polski, komunikaty w **CAPS LOCK** dla dużego komunikatu ("GOOOL!", "DZIEŃ MECZOWY", "NOWY ZAWODNIK").
- Zasada nadrzędna: **mniej tekstu, więcej zdjęcia** — brief wprost zakazuje leadów, akapitów i drobnego tekstu na grafice. Cała rozbudowana treść (kontekst, CTA, link) trafia do opisu posta.
- Na grafice maksymalnie 3 poziomy informacji: duży komunikat → nazwisko/wynik/rywal → jedna krótka linia danych (data/godzina/stadion lub minuta).
- Ton: krótki, energiczny, kibicowski, bez ozdobników. Brak emoji w dostarczonych materiałach.
- Minimalny rozmiar treści użytkowej: 30px (post 1:1), 40px (relacja 9:16) — nigdy mniej, wyjątek: nazwa klubu przy herbie.

## Visual foundations
- **Kolory**: czerwony `#E2092F` (główny), stare złoto `#B7A85C` (**wyłącznie akcent** — nie tło, nie duże powierzchnie), grafit `#121216`, ciepła biel `#F6F3EC`.
- **Typografia**: nagłówki — Barlow Condensed, waga 900 (Black); informacje — Inter, waga 700 (Bold). Oba dostępne na Google Fonts pod tymi samymi nazwami — link CDN w `tokens/typography.css` (brak potrzeby substytucji).
- **Tła**: zawsze pełnoekranowe zdjęcie użytkownika w `cover`, bez wycinania. Brak ilustracji, brak wzorów/tekstur, brak generowanych teł.
- **Zabezpieczenie czytelności**: duże, pełne panele/gradienty (czarny → przezroczysty) pod tekstem — **nigdy** cienki cień pod tekstem jako jedyne zabezpieczenie.
- **Bezpieczne strefy**: w formacie 9:16 kluczowy tekst musi być poza pasem 220px od góry i od dołu (nakładki UI Stories/Reels).
- **Narożniki/kształty**: herb i awatar rywala w kole; panele tekstowe — proste prostokąty bez zaokrągleń, żadnych „kart z lewym kolorowym paskiem".
- **Animacja**: brak — to statyczne grafiki eksportowane do PNG.
- **Zdjęcia**: naturalne zdjęcia z telefonu (mecz, murawa, świętowanie), bez filtrów kolorystycznych — tylko kontrola jasności i siły gradientu jest dozwolona w edytorze.
- **Herb**: zawsze oryginalny, bez filtrów/deformacji (patrz ostrzeżenie wyżej — obecnie niedostępny jako plik rastrowy/SVG).

## Iconography
Brief i dostarczone pliki nie definiują żadnego systemu ikon (brak sprite'u, fontu ikon czy SVG w materiałach). Panel edycji generatora używa **wyłącznie etykiet tekstowych** (np. „Odbicie poziome", „Obrót") zamiast ikon — zgodnie z zasadą, by nie tworzyć własnych SVG. Emoji nie są używane.

## Index
- `styles.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — tokeny i fonty (Google Fonts CDN).
- `components/core/` — Button, Input, Select, Slider, Toggle, Badge (+ karta `core.card.html`).
- `guidelines/` — karty specimen: kolory, typografia, odstępy, zasady marki.
- `ui_kits/graphic-generator/` — **generator grafik, tryb Pełne zdjęcie** (index.html, GraphicGenerator.jsx, templates.js, drawEngine.js).
- `assets/` — puste; brak dostarczonych plików rastrowych/SVG (patrz ostrzeżenie o herbie).
- `SKILL.md` — wersja tego systemu do użycia jako Claude Code skill.
