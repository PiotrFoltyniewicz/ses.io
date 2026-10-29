# Backend

Miejsce na solution ASP.NET Core. Katalogi nie zawierają jeszcze `.csproj`, kodu ani migracji.

- `src/Sesio.Api`: endpointy HTTP, middleware, konfiguracja i rejestracja zależności.
- `src/Sesio.Application`: przypadki użycia, walidacja, polityki dostępu, interfejsy persystencji i magazynu plików.
- `src/Sesio.Domain`: model i reguły biznesowe niezależne od ASP.NET/EF Core.
- `src/Sesio.Infrastructure`: Identity, EF Core/PostgreSQL, migracje, magazyn plików, poczta.
- `tests/Sesio.Domain.Tests`: testy reguł i przejść stanów.
- `tests/Sesio.IntegrationTests`: API z rzeczywistym testowym PostgreSQL, kontrola uprawnień i transakcji.

Wewnątrz projektów wydzielaj moduły opisane w [architekturze](../../docs/architecture.md) dopiero wraz z implementacją. Unikaj pustych warstw abstrakcji bez konkretnego zastosowania.
