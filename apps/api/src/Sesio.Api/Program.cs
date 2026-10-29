var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/api/v1/health", () => Results.Ok(new
{
    status = "ok",
    service = "ses.io API"
}))
.WithName("GetHealth")
.WithSummary("Sprawdza, czy API odpowiada. Nie sprawdza bazy danych.");

app.Run();

