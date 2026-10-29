# Mapa widoków do szkicowania

## Nawigacja

```text
Logowanie / Rejestracja / Reset hasła
└── Moje bazy
    ├── Utwórz bazę
    ├── Przyjmij zaproszenie
    └── Baza
        ├── Materiały (drzewo folderów + lista)
        │   └── Szczegóły materiału + historia wersji
        ├── Dodaj propozycję
        ├── Moje zgłoszenia
        ├── Do akceptacji (administrator / właściciel)
        │   └── Szczegóły propozycji i porównanie zmian
        ├── Członkowie
        └── Ustawienia bazy (według uprawnień)
```

## Główny ekran bazy

Górny pasek: nazwa bazy, przełącznik bazy, wyszukiwanie i konto. Lewy panel: drzewo semestrów/przedmiotów oraz linki do zgłoszeń. Główna część: okruszki nawigacji, opis aktualnego folderu/przedmiotu, prowadzący, filtry i lista materiałów. Przycisk „Zaproponuj materiał” dostępny dla każdego członka; zarządzanie folderami dla administracji.

Wiersz materiału: tytuł, typ, rok akademicki, status aktualności, data ostatniej publikacji. Dodatkowe informacje w szczegółach, żeby lista pozostała czytelna. Na telefonie drzewo otwierane jako osobny panel.

## Ekrany i najważniejsze elementy

| Widok | Zawartość i akcje |
| --- | --- |
| Moje bazy | Karty baz z nazwą, opisem i moją rolą; utworzenie nowej bazy |
| Tworzenie bazy | Nazwa, opis, opcjonalne dane kierunku; pusty układ lub szablon z liczbą semestrów |
| Szczegóły przedmiotu | Opis, prowadzący, podfoldery i materiały |
| Szczegóły materiału | Opis, aktualność i data weryfikacji, rok, prowadzący, pobranie, historia, „Zaproponuj zmianę” |
| Formularz propozycji | Folder docelowy, typ operacji, metadane, załącznik, uzasadnienie, zapis szkicu i wysłanie |
| Moje zgłoszenia | Status, data, komentarz administratora, wycofanie lub ponowne przygotowanie poprawionego szkicu |
| Kolejka akceptacji | Filtry po statusie/autorze/typie; liczba oczekujących |
| Ocena propozycji | Autor, uzasadnienie, poprzednie i nowe wartości, plik; akceptacja lub odrzucenie z komentarzem |
| Członkowie | Lista osób i ról; zaproszenia i działania zależne od uprawnień |
| Ustawienia | Nazwa/opis; właściciel dodatkowo przekazanie własności i archiwizacja |

## Stany, które trzeba uwzględnić na szkicach

- Pusta lista baz, pusty folder, brak wyników filtrowania.
- Ładowanie, błąd pobierania, utrata dostępu do bazy.
- Upload: postęp, zły format, przekroczony limit, oczekiwanie na weryfikację pliku.
- Materiał niezweryfikowany lub nieaktualny; oznaczenie tekstowe, nie tylko kolor.
- Propozycja oczekująca, odrzucona z uzasadnieniem i konflikt z nowszą rewizją.
- Wygasłe zaproszenie, inny adres konta niż adres zaproszenia.
- Potwierdzenie usunięcia członka, archiwizacji i przekazania własności.

## Miejsce na własne szkice

Pliki umieszczaj w `docs/sketches/`, np. `01-moje-bazy.png`, `02-baza.png`, `03-material.png`, `04-akceptacja.png`. Najpierw ustal widok bazy i materiału, następnie formularz propozycji i ocenę przez administratora. Szkice mogą zmienić układ interfejsu bez zmiany zasad uprawnień i publikacji.
