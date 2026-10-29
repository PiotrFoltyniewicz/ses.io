# ses.io

Aplikacja do tworzenia i współdzielenia kierunkowych baz pytań oraz materiałów na egzaminy i kolokwia. Każda baza ma własną nazwę, strukturę, członków i administratorów. Członkowie zgłaszają materiały i zmiany, a administratorzy decydują o ich publikacji.

**Stos:** React + TypeScript + Vite, ASP.NET Core, PostgreSQL.

**Stan repozytorium:** działający starter React + TypeScript + Vite oraz ASP.NET Core z endpointem sprawdzającym połączenie. Logowanie, PostgreSQL, migracje, materiały i moderacja są zaplanowane, ale jeszcze niezaimplementowane.

## Uruchomienie lokalne

Wymagania: Node.js 20.15+ z npm oraz SDK .NET 9 (co najmniej 9.0.201). Wersje startera dopasowano do lokalnego środowiska: Vite 6 i .NET 9. Przed dalszym rozwojem zalecana aktualizacja do aktualnego Node LTS i .NET 10 LTS, wraz z aktualizacją Vite, `global.json` i pakietów. Najnowszy Vite wymaga nowszego Node niż lokalne 20.15: [wymagania Vite](https://vite.dev/guide/).

Uruchom dwa terminale z głównego folderu repozytorium.

**Terminal 1 — backend:**

```powershell
dotnet restore apps/api/Sesio.sln
dotnet run --project apps/api/src/Sesio.Api --launch-profile http
```

**Terminal 2 — frontend:**

```powershell
cd apps/web
npm ci
npm run dev
```

Otwórz **http://localhost:5173**. Ekran startowy pokazuje rzeczywisty stan połączenia z backendem i umożliwia ponowienie sprawdzenia.

- API: `http://localhost:5080/api/v1/health`.
- OpenAPI JSON w środowisku Development: `http://localhost:5080/openapi/v1.json`.
- Vite przekazuje `/api` do `http://localhost:5080`, więc lokalnie nie trzeba konfigurować CORS.
- PostgreSQL nie jest jeszcze potrzebny do uruchomienia startera. Health sprawdza wyłącznie dostępność API.
- Zatrzymanie procesów: `Ctrl+C` w każdym terminalu.

## Sprawdzenie kompilacji

Z głównego folderu:

```powershell
dotnet build apps/api/Sesio.sln
npm --prefix apps/web run build
```

Frontend ma też `npm --prefix apps/web run lint`. Build frontendu trafia do `apps/web/dist`. Proxy z `vite.config.ts` działa tylko w trybie developerskim; wdrożenie wymaga kierowania `/api` do backendu przez serwer/reverse proxy. `npm run preview` służy do podglądu statycznego buildu i nie uruchamia backendu ani proxy developerskiego.

Starter wygenerowano przez `create-vite` (szablon `react-ts`) oraz `dotnet new webapi`, `dotnet new classlib` i `dotnet new sln`. Nie uruchamiaj generatorów ponownie w istniejących katalogach.

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
