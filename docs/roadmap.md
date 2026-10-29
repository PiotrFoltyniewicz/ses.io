# Plan realizacji

## 0. Doprecyzowanie projektu — teraz

- Przygotowany podział katalogów oraz propozycja modelu, ról i widoków.
- Następnie szkice: główny ekran bazy, materiał, zgłoszenie i panel akceptacji.
- Ustalić formaty/limity plików i potwierdzić zakres MVP opisany w `product.md`.

Odbiór: można przejść na szkicach od utworzenia bazy do publikacji materiału.

## 1. Uruchamialny fundament

- Gotowe: wygenerowana aplikacja React/TypeScript/Vite w `apps/web` i solution z czterema projektami w `apps/api`; ekran startowy sprawdza połączenie z API.
- Wybrać i przypiąć wspierane wersje narzędzi na moment implementacji, dodać lockfile.
- Dodać PostgreSQL do lokalnego Compose, EF Core i pierwsze migracje.
- Skonfigurować Identity, sesję, CSRF, potwierdzanie e-mail i reset hasła; lokalny odbiornik poczty.
- Gotowe: OpenAPI, podstawowe ProblemDetails oraz skrypty lint/build frontendu. Do zrobienia: CI i obsługa błędów biznesowych.

Odbiór: świeży checkout uruchamia się według README; rejestracja, logowanie i wylogowanie działają.

## 2. Bazy i uprawnienia

- Tworzenie/lista baz, właściciel i członkostwa.
- Zaproszenia, przyjmowanie zaproszeń, usuwanie członków, role i przekazanie własności.
- Weryfikacja izolacji między bazami na poziomie API.

Odbiór: użytkownik z dwóch baz widzi tylko dozwolone dane, a członek nie może wykonać operacji administratora przez ręczne żądanie HTTP.

## 3. Struktura i materiały

- Drzewo folderów, szablon semestrów, opisy przedmiotów i prowadzący.
- Prywatny upload, walidacja plików i kontrola dostępu przy pobieraniu.
- Model materiału/rewizji oraz lista i szczegóły; bez publicznej ścieżki omijającej akceptację.

Odbiór: administrator organizuje strukturę; oczekujący plik nie jest dostępny innym członkom.

## 4. Propozycje i moderacja

- Szkic, wysłanie, wycofanie, kolejka, porównanie metadanych i decyzja.
- Publikacja nowego materiału, zamiana pliku, edycja opisu, przeniesienie i archiwizacja przez propozycje.
- Historia rewizji, audyt i ochrona przed równoczesną akceptacją nieaktualnych zmian.

Odbiór: członek zgłasza plik, administrator publikuje; odrzucenie nie zmienia materiału. Dwie równoczesne akceptacje nie gubią zmian ani nie duplikują publikacji.

## 5. Domknięcie MVP

- Wyszukiwanie, paginacja i filtry po roku, prowadzącym, typie i aktualności.
- Puste stany, błędy, układ mobilny i obsługa klawiaturą.
- Kopie bazy oraz plików, próba odtworzenia i udokumentowane uruchamianie.

Odbiór: pełny scenariusz dwóch kont od zaproszenia do pobrania zaakceptowanego materiału; testy domeny, integracji i E2E dla krytycznych przepływów.

## Później

Pytania jako osobne rekordy, odpowiedzi i quizy; OCR i wyszukiwanie treści plików; powiadomienia; komentarze; import/eksport bazy; publiczne udostępnianie; bardziej rozbudowane role. Te elementy nie blokują pierwszego MVP.

## Najważniejsze przyszłe testy

- Izolacja baz, także przez identyfikatory plików, folderów i propozycji z innej bazy.
- Odebranie dostępu, rola administratora i zakaz usunięcia właściciela.
- Jednorazowość, wygaśnięcie i adresat zaproszenia.
- Przejścia statusów propozycji, niezmienność wersji i konflikt rewizji.
- Dwie równoczesne decyzje; atomowość publikacji i audytu.
- Cykle folderów, niedozwolone pliki i prywatność oczekujących uploadów.
