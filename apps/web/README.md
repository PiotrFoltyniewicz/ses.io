# Frontend

Aplikacja React + TypeScript + Vite 6. Start: `npm ci`, następnie `npm run dev` w tym katalogu. Adres: http://localhost:5173. Backend uruchom zgodnie z [głównym README](../../README.md).

`npm run build` sprawdza TypeScript i tworzy `dist/`; `npm run lint` uruchamia ESLint. Punkt wejścia: `src/main.tsx`; ekran startowy: `src/app/App.tsx`; style: `src/index.css`. Ekran wywołuje rzeczywisty `/api/v1/health`, z obsługą błędu, limitu czasu i ponowienia.

Moduły funkcjonalne poniżej pozostają miejscem na dalszą implementację:

- `src/app`: router, providery, layout i globalne style.
- `src/features/auth`: logowanie, rejestracja, obsługa konta.
- `src/features/banks`: lista i tworzenie baz, przełącznik bazy.
- `src/features/memberships`: członkowie, role, zaproszenia.
- `src/features/folders`: drzewo, nawigacja, edycja struktury.
- `src/features/materials`: lista, filtry, szczegóły, historia wersji.
- `src/features/proposals`: formularze zgłoszeń, moje zgłoszenia, moderacja.
- `src/shared/ui`: współdzielone elementy interfejsu.
- `src/shared/api`: klient HTTP i przyszłe kontrakty generowane z OpenAPI.
- `src/shared/lib`: wspólne funkcje pomocnicze.

Komponenty, zapytania i typy specyficzne dla funkcji trzymaj przy danym module. Kontrola ról w UI służy prezentacji; uprawnienia zawsze egzekwuje API.
