# Zakres i reguły produktu

## Podstawowe pojęcia

**Baza** to prywatna przestrzeń materiałów (np. „Informatyka — studia dzienne”), a nie osobna instancja PostgreSQL. Użytkownik może należeć do wielu baz, mając w każdej inną rolę. Dostęp do jednej bazy nie daje dostępu do pozostałych.

**Folder** organizuje zawartość. Przy tworzeniu bazy użytkownik wybiera pustą strukturę albo szablon semestrów. Foldery mogą być zagnieżdżane, przenoszone i nazywane dowolnie. Typ folderu (`general`, `semester`, `subject`) udostępnia odpowiednie pola opisowe; nie narzuca sztywnej głębokości drzewa.

Przykład:

```text
Informatyka
├── Semestr 1
│   ├── Analiza matematyczna
│   │   ├── Egzaminy
│   │   ├── Kolokwia
│   │   └── Opracowania
│   └── Podstawy programowania
└── Semestr 2
```

**Materiał** ma tytuł, opis, folder, tagi i kolejne wersje z załącznikiem. W MVP jeden materiał ma jeden plik na wersję; zestaw plików można zgłosić jako kilka materiałów. Edytowalne pytania, odpowiedzi i rozwiązywanie quizów to późniejszy etap.

## Role w obrębie bazy

| Czynność | Członek | Administrator | Właściciel |
| --- | --- | --- | --- |
| Przeglądanie i pobieranie opublikowanych materiałów | Tak | Tak | Tak |
| Zgłoszenie materiału, wersji lub poprawki | Tak | Tak | Tak |
| Podgląd własnych propozycji i ich wycofanie przed decyzją | Tak | Tak | Tak |
| Przegląd kolejki i akceptacja/odrzucenie propozycji | Nie | Tak | Tak |
| Zarządzanie folderami i opisami przedmiotów | Nie | Tak | Tak |
| Zapraszanie/usuwanie zwykłych członków | Nie | Tak | Tak |
| Nadawanie i odbieranie roli administratora | Nie | Nie | Tak |
| Zmiana nazwy/opisu bazy | Nie | Tak | Tak |
| Przekazanie własności, archiwizacja bazy | Nie | Nie | Tak |

Twórca zostaje właścicielem. Baza ma dokładnie jednego właściciela; nie może on odejść bez przekazania własności. Administrator nie może usunąć właściciela ani zmieniać ról innych administratorów. Role są sprawdzane przez API przy każdej operacji.

## Dołączanie do bazy

Propozycja dla MVP: zaproszenie na adres e-mail, wygasający jednorazowy token i świadoma akceptacja po zalogowaniu na konto ze zweryfikowanym adresem. Samo wpisanie adresu nie dodaje automatycznie użytkownika. Zaproszenia nadają rolę członka; właściciel może później awansować członka. Publiczne linki dołączania poza MVP.

## Propozycje zmian

Typy: dodanie materiału, nowa wersja pliku, zmiana metadanych, przeniesienie i archiwizacja materiału. Członek podaje uzasadnienie; przy nowej wersji również opis zmian.

```text
draft → pending → approved
                → rejected
                → withdrawn (autor)
```

- Szkic może edytować tylko autor. Po wysłaniu treść propozycji jest zamrożona.
- Odrzucenie wymaga komentarza. Autor może utworzyć nowy szkic na podstawie odrzuconej propozycji.
- Propozycja zawiera numer rewizji materiału, na której bazuje. Jeśli materiał zmieniono w międzyczasie, zatwierdzenie zwraca konflikt; potrzebny jest nowy szkic uwzględniający aktualny stan.
- Akceptacja atomowo zapisuje nową opublikowaną rewizję, decyzję i zdarzenie audytu. Ponowna decyzja dla rozpatrzonego zgłoszenia nie publikuje go drugi raz.
- Administrator może zatwierdzić własną propozycję (założenie MVP umożliwiające obsługę jednoosobowej bazy); ta czynność jest widoczna w historii.
- Propozycje są dostępne autorowi oraz osobom administrującym. Pozostali członkowie widzą wersje opublikowane.
- Zarządzanie samą strukturą folderów jest bezpośrednią operacją administratora, zapisywaną w audycie. Członkowie w MVP proponują zmiany materiałów, nie reorganizację całego drzewa.

## Opisy i aktualność

Folder przedmiotu: nazwa, opis, opcjonalny kod przedmiotu, prowadzący (lista nazw), numer semestru dla folderu semestru. Baza: opcjonalnie uczelnia, kierunek, stopień studiów, rocznik rozpoczęcia.

Materiał: tytuł, opis, typ (`exam`, `quiz`, `notes`, `solutions`, `other`), tagi, rok akademicki (np. `2026/2027`), opcjonalny rocznik rozpoczęcia studiów, prowadzący związani z materiałem, opcjonalna data egzaminu i źródło.

Aktualność: `unknown` (niezweryfikowany), `current` (aktualny), `outdated` (nieaktualny). Osobno przechowujemy datę i osobę weryfikującą. Akceptacja pliku nie oznacza automatycznie potwierdzenia aktualności. Członek może zgłosić nieaktualność przez propozycję zmiany metadanych. Stare materiały pozostają wyszukiwalne z czytelnym oznaczeniem.

## Do dopracowania podczas szkicowania

- Czy potrzebne są materiały publiczne? Domyślnie wszystkie bazy są prywatne.
- Czy w przyszłości wymagamy drugiego administratora do zatwierdzenia własnych zgłoszeń?
- Jakie formaty i limity plików udostępnić? Punkt startowy: PDF, PNG, JPEG, maksymalnie 25 MB; ostateczny wybór przed implementacją uploadu.
- Czy pytania mają być osobnymi rekordami z odpowiedziami, czy wystarczą pliki w pierwszej wersji? MVP zakłada pliki.
- Czy prowadzący mają być wspólnym słownikiem? MVP używa nazw tekstowych w obrębie bazy.
