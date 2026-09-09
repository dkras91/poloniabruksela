/* ============================================================================
   FC POLONIA BRUKSELA — ZGODA NA COOKIES (RODO + ePrivacy, praktyka belgijska)
   ----------------------------------------------------------------------------
   Wymogi, które ten moduł realizuje — zgodnie z wytycznymi belgijskiego organu
   ochrony danych (APD/GBA, „Cookie Checklist") oraz RODO:

   1. Zgoda PRZED zapisaniem czegokolwiek poza plikami niezbędnymi.
   2. Odmowa równie łatwa jak zgoda — „Odrzuć wszystkie" ma tę samą wagę
      wizualną co „Akceptuj wszystkie" (brak ciemnych wzorców).
   3. Brak domyślnie zaznaczonych zgód — wszystkie kategorie startują wyłączone.
   4. Zgoda granularna — osobno dla każdej kategorii.
   5. Wycofanie zgody w każdej chwili, tak samo prosto jak jej udzielenie.
   6. Brak cookie walla — odmowa nie blokuje dostępu do treści.
   7. Dowód zgody — zapisujemy wersję, znacznik czasu i zakres wyboru.
   8. Ponowne pytanie po 12 miesiącach (praktyka zalecana przez APD).
   9. Informacja o administratorze danych i celach — na stronie polityki.

   STAN FAKTYCZNY TEJ STRONY: nie ma tu analityki ani reklam. Używamy wyłącznie
   pamięci niezbędnej i funkcjonalnej (sesja panelu, zapis terminarza, zdjęcia).
   Kategorie „statystyka" i „marketing" są przygotowane na przyszłość i dopóki
   nic ich nie używa, pozostają puste — nie udajemy, że zbieramy więcej.
   ========================================================================== */

const KEY = 'fcp.cookie.consent.v1';
const VERSION = 1;
const REASK_DAYS = 365;

export const CATEGORIES = [
  {
    id: 'necessary',
    label: 'Niezbędne',
    required: true,
    desc: 'Konieczne do działania strony: zapamiętanie Twojego wyboru w tym oknie oraz sesja logowania w panelu redakcyjnym. Bez nich strona nie działa poprawnie.',
    used: 'Pamięć przeglądarki: zgoda na cookies, sesja administratora.',
  },
  {
    id: 'functional',
    label: 'Funkcjonalne',
    required: false,
    desc: 'Zapamiętują pobrany terminarz i tabelę oraz zdjęcia dodane przez klub, żeby strona ładowała się szybciej i działała przy chwilowym braku połączenia ze źródłem danych.',
    used: 'Pamięć przeglądarki: kopia terminarza i klasyfikacji, ustawienia źródeł danych.',
  },
  {
    id: 'analytics',
    label: 'Statystyczne',
    required: false,
    desc: 'Pozwoliłyby liczyć odwiedziny i sprawdzać, które podstrony są czytane. Obecnie nieużywane — nie mamy zainstalowanej żadnej analityki.',
    used: 'Obecnie: brak.',
  },
  {
    id: 'marketing',
    label: 'Marketingowe',
    required: false,
    desc: 'Służyłyby do personalizacji reklam lub śledzenia między stronami. Obecnie nieużywane i nieplanowane.',
    used: 'Obecnie: brak.',
  },
];

const EMPTY = { necessary: true, functional: false, analytics: false, marketing: false };

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
};

/** Zapis zgody wraz z dowodem: wersja, czas, zakres. */
function store(choices, mode) {
  const record = {
    v: VERSION,
    at: new Date().toISOString(),
    mode,                       // 'all' | 'none' | 'custom'
    choices: { ...EMPTY, ...choices, necessary: true },
  };
  try { localStorage.setItem(KEY, JSON.stringify(record)); } catch {}
  cleanup(record.choices);
  return record;
}

/** Po cofnięciu zgody usuwamy dane należące do wyłączonych kategorii. */
function cleanup(choices) {
  if (choices.functional) return;
  for (const k of ['fcp.livedata.cache.v1', 'fcp.livedata.config.v1', 'fcp.livedata.overrides.v1']) {
    try { localStorage.removeItem(k); } catch {}
  }
}

export function getConsent() {
  const r = read();
  if (!r || r.v !== VERSION) return null;
  const ageDays = (Date.now() - new Date(r.at).getTime()) / 86400e3;
  if (ageDays > REASK_DAYS) return null;   // zgoda wygasła — pytamy ponownie
  return r;
}

export const hasDecided = () => getConsent() !== null;
export const allowed = (cat) => {
  const c = getConsent();
  return cat === 'necessary' ? true : Boolean(c && c.choices[cat]);
};

export const acceptAll = () => store({ functional: true, analytics: true, marketing: true }, 'all');
export const rejectAll = () => store({ functional: false, analytics: false, marketing: false }, 'none');
export const saveChoices = (choices) => store(choices, 'custom');
export function withdraw() {
  try { localStorage.removeItem(KEY); } catch {}
  cleanup(EMPTY);
}

/** Data i zakres udzielonej zgody — pokazywane w ustawieniach jako dowód. */
export function consentSummary() {
  const c = getConsent();
  if (!c) return null;
  const on = CATEGORIES.filter((k) => c.choices[k.id]).map((k) => k.label);
  const d = new Date(c.at);
  const pad = (n) => String(n).padStart(2, '0');
  return {
    date: `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`,
    scope: on.join(', '),
  };
}
