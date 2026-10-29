# ses.io

Aplikacja do tworzenia i współdzielenia kierunkowych baz pytań oraz materiałów na egzaminy i kolokwia. Każda baza ma własną nazwę, strukturę, członków i administratorów. Członkowie zgłaszają materiały i zmiany, a administratorzy decydują o ich publikacji.

**Stos:** React + TypeScript + Vite, ASP.NET Core, PostgreSQL.

**Stan repozytorium:** szkielet katalogów i plan projektu. Aplikacja, projekty .NET, konfiguracja Vite, migracje i testy nie są jeszcze wygenerowane; nie ma obecnie komendy uruchomienia.

## Założenia

- Rejestracja, logowanie i konto użytkownika.
- Użytkownik może tworzyć wiele niezależnych baz i nadawać im nazwy.
- Właściciel zaprasza członków oraz wyznacza administratorów danej bazy.
- Domyślna organizacja: semestr → przedmiot → materiały. Strukturę można dostosować.
- Przedmioty i materiały mają opisy, prowadzących, rok akademicki oraz informacje o aktualności.
- Nowe pliki, nowe wersje i zmiany opisów przechodzą akceptację administratora.
- Opublikowane materiały mają historię wersji; oczekujące propozycje nie zmieniają treści widocznych dla członków.

## Struktura repozytorium

```text
ses.io/
├── apps/
│   ├── web/                      # React + TypeScript: interfejs
│   │   └── src/
│   │       ├── app/              # routing, providery, układ aplikacji
│   │       ├── features/         # moduły funkcjonalne
│   │       └── shared/           # UI, klient HTTP, narzędzia
│   └── api/                      # ASP.NET Core: modularny monolit
│       ├── src/
│       │   ├── Sesio.Api/        # endpointy, uwierzytelnianie, konfiguracja
│       │   ├── Sesio.Application/# przypadki użycia i autoryzacja
│       │   ├── Sesio.Domain/     # encje i reguły biznesowe
│       │   └── Sesio.Infrastructure/ # EF Core, pliki, poczta
│       └── tests/               # testy domeny i integracji
├── docs/                        # wymagania, model, widoki, plan
├── infra/                       # przyszłe środowisko lokalne i wdrożenie
└── tests/e2e/                   # przyszłe scenariusze przeglądarkowe
```

## Dokumentacja i dalsza praca

1. [Zakres, role i zasady działania](docs/product.md).
2. [Architektura i proponowany model danych](docs/architecture.md).
3. [Mapa widoków i miejsce na szkice](docs/screens.md).
4. [Etapy realizacji i kryteria odbioru](docs/roadmap.md).

Zacznij od szkicu wnętrza bazy i szczegółów materiału w `docs/sketches/`. Decyzje wymagające doprecyzowania są zapisane w dokumentacji; przyjęte rozwiązania stanowią punkt startowy do projektu.
