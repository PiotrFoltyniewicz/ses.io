# Backend

Solution `Sesio.sln` zawiera cztery projekty .NET 9 z referencjami zgodnymi z architekturą. Z tego katalogu: `dotnet restore Sesio.sln`, następnie `dotnet run --project src/Sesio.Api --launch-profile http`.

API nasłuchuje na http://localhost:5080. `GET /api/v1/health` zwraca `{ "status": "ok", "service": "ses.io API" }`. Specyfikacja OpenAPI jest pod `/openapi/v1.json` tylko w Development. Przykładowe żądania zapisano w `src/Sesio.Api/Sesio.Api.http`.

Warstwy Application, Domain i Infrastructure są pustymi, kompilowalnymi bibliotekami. Baza danych, Identity i migracje nie są jeszcze podłączone. Katalogi testów są przygotowane, ale nie zawierają projektów testowych. Lokalny profil HTTP nie wymaga certyfikatu; wdrożenie powinno zapewnić HTTPS.

- `src/Sesio.Api`: endpointy HTTP, middleware, konfiguracja i rejestracja zależności.
- `src/Sesio.Application`: przypadki użycia, walidacja, polityki dostępu, interfejsy persystencji i magazynu plików.
- `src/Sesio.Domain`: model i reguły biznesowe niezależne od ASP.NET/EF Core.
- `src/Sesio.Infrastructure`: Identity, EF Core/PostgreSQL, migracje, magazyn plików, poczta.
- `tests/Sesio.Domain.Tests`: testy reguł i przejść stanów.
- `tests/Sesio.IntegrationTests`: API z rzeczywistym testowym PostgreSQL, kontrola uprawnień i transakcji.

Wewnątrz projektów wydzielaj moduły opisane w [architekturze](../../docs/architecture.md) dopiero wraz z implementacją. Unikaj pustych warstw abstrakcji bez konkretnego zastosowania.
