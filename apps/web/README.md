# Frontend

Miejsce na aplikację React + TypeScript + Vite. Katalogi są szkieletem; brak jeszcze `package.json` i konfiguracji uruchomieniowej.

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
