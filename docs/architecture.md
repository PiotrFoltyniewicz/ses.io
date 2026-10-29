# Architektura

## Podział odpowiedzialności

Monorepo, pojedyncze API jako modularny monolit, pojedyncza baza PostgreSQL. React obsługuje widoki i komunikację HTTP. ASP.NET Core egzekwuje uprawnienia, waliduje propozycje i publikuje zmiany. EF Core odpowiada za persystencję. Pliki są w prywatnym magazynie plików/obiektów, a PostgreSQL zawiera metadane i klucze dostępu do obiektów.

Zależności projektów: `Domain` nie zależy od pozostałych; `Application → Domain`; `Infrastructure → Application + Domain`; `Api → Application + Infrastructure` (rejestracja zależności). Kontrakty HTTP powstają w API i są opisane przez OpenAPI; frontend nie kopiuje encji EF Core.

Moduły: `Identity`, `Banks`, `Memberships`, `Folders`, `Materials`, `Proposals`, `Audit`. Na początku katalogi/moduły w tych samych projektach, bez mikroserwisów i osobnych baz danych dla każdej przestrzeni.

## Proponowany model relacyjny

| Encja | Najważniejsze pola / relacje |
| --- | --- |
| User | ASP.NET Core Identity, e-mail, nazwa wyświetlana |
| Bank | id, name, description, ownerUserId, university, fieldOfStudy, studyLevel, entryYear, archivedAt |
| Membership | bankId, userId, role (`admin` / `member`), joinedAt; unikalna para bankId + userId |
| Invitation | bankId, email, tokenHash, expiresAt, acceptedAt, revokedAt, invitedBy |
| Folder | id, bankId, parentId?, kind, name, description, semesterNumber?, subjectCode?, lecturers, sortOrder |
| Material | id, bankId, currentRevisionId, revisionNumber, archivedAt? |
| MaterialRevision | id, bankId, materialId, number, folderId, title, description, type, tags, academicYear?, entryYear?, lecturers, examDate?, source?, freshness, verifiedAt?, verifiedBy?, fileAssetId, createdBy, createdAt, proposalId |
| FileAsset | id, bankId, storageKey, originalName, detectedMimeType, size, checksum, uploadedBy, uploadedAt, scanStatus |
| Proposal | id, bankId, authorId, type, materialId?, baseRevisionNumber?, status, payload, submittedAt?, reviewedBy?, reviewedAt?, reviewComment? |
| AuditEvent | id, bankId, actorId, action, entityType, entityId, timestamp, szczegóły zmiany |

Właściciel wynika z `Bank.ownerUserId`, nie z drugiego pola roli; ma również rekord członkostwa. Efektywne uprawnienia właściciela mają pierwszeństwo przed rolą członkowską. Przekazanie własności odbywa się w transakcji do istniejącego członka; poprzedni właściciel zostaje administratorem.

`MaterialRevision` jest niezmiennym snapshotem metadanych i odwołania do pliku. Zmiana opisu tworzy nową rewizję ze starym `fileAssetId`; zamiana pliku tworzy nową rewizję z nowym obiektem. `Proposal.payload` to wersjonowany, walidowany schemat zależny od typu operacji, nie dowolny patch encji. Nowy materiał powstaje dopiero przy akceptacji.

## Integralność i izolacja

- Każdy zasób biznesowy należy do `bankId`; API sprawdza członkostwo oraz przynależność docelowego obiektu. UUID sam w sobie nie daje dostępu.
- Relacje folderów, rewizji, plików i propozycji nie mogą łączyć dwóch baz. Tam, gdzie możliwe, wymuszają to złożone klucze obce `(bankId, id)`; pozostałe warunki sprawdza warstwa aplikacji.
- Folder nie może zostać własnym potomkiem. Przenoszenie wymaga kontroli cyklu w transakcji. Niepustego folderu nie usuwamy bez wcześniejszego przeniesienia zawartości.
- Akceptacja używa transakcji i warunkowej aktualizacji statusu propozycji oraz numeru rewizji materiału. Dwie równoczesne decyzje nie mogą nadpisać się wzajemnie.
- Archiwizacja zachowuje historię. Trwałe usuwanie i polityka retencji to osobny późniejszy zakres.
- Odebranie członkostwa natychmiast blokuje dostęp do zasobów i zgłoszeń; członkostwo jest sprawdzane także podczas pobierania.

## Uwierzytelnianie i pliki

Proponowane logowanie: ASP.NET Core Identity i sesja w ciasteczku HttpOnly, Secure, z ochroną CSRF dla operacji zmieniających dane. Frontend i API docelowo pod jednym originem. Nie przechowujemy tokenów sesji w localStorage. Reset hasła i potwierdzenie e-mail są częścią modułu konta.

Upload trafia do prywatnej przestrzeni oczekujących plików. Serwer sprawdza rozmiar, dozwolony format, rzeczywistą sygnaturę pliku i rezultat skanowania przed publikacją. Nazwa oryginalna służy do prezentacji; klucz magazynu generuje serwer. Pobieranie przez autoryzowany endpoint; bez publicznego katalogu uploadów. Osierocone uploady usuwa zadanie według ustalonej retencji, bez naruszania plików używanych przez historię.

## Szkic API (kontrakt do implementacji)

Wspólny prefiks `/api/v1`. Listy: paginacja; błędy: ProblemDetails; konflikt decyzji/rewizji: HTTP 409.

| Obszar | Przykładowe endpointy |
| --- | --- |
| Konto | `POST /auth/register`, `/auth/login`, `/auth/logout`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/confirm-email`; `GET /auth/me` |
| Bazy | `GET/POST /banks`, `GET/PATCH /banks/{bankId}`, `POST /banks/{bankId}/archive` |
| Członkowie | `GET /banks/{bankId}/members`, `PATCH/DELETE /banks/{bankId}/members/{userId}`, `POST /banks/{bankId}/transfer-ownership` |
| Zaproszenia | `POST /banks/{bankId}/invitations`, `POST /invitations/accept` (token w body) |
| Foldery | `GET/POST /banks/{bankId}/folders`, `PATCH/DELETE /banks/{bankId}/folders/{folderId}` |
| Materiały | `GET /banks/{bankId}/materials`, `GET /banks/{bankId}/materials/{materialId}`, `GET /banks/{bankId}/materials/{materialId}/revisions` |
| Pliki | `POST /banks/{bankId}/uploads`, `GET /banks/{bankId}/files/{fileId}/download` |
| Propozycje | `GET/POST /banks/{bankId}/proposals`, `GET/PATCH /banks/{bankId}/proposals/{proposalId}`, `POST .../{proposalId}/submit`, `/withdraw`, `/approve`, `/reject` |
| Historia | `GET /banks/{bankId}/audit` (administracja) |

Listowanie materiałów uwzględnia folder, wyszukiwanie po nazwie/opisie, tagi, prowadzącego, rok akademicki, typ i aktualność. Pobieranie historycznych wersji opublikowanych materiałów pozostaje dostępne członkom; nieopublikowane pliki wyłącznie autorowi i administracji. Bezpośredni zapis materiału przez klienta jest zastąpiony przepływem propozycji.
