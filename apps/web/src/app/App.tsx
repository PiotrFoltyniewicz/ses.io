import { useEffect, useState } from 'react'
import { checkHealth } from '../shared/api/health'

type Connection = 'loading' | 'online' | 'offline'

const labels: Record<Connection, string> = {
  loading: 'Sprawdzanie połączenia…',
  online: 'Połączono z API',
  offline: 'Brak połączenia z API',
}

export default function App() {
  const [connection, setConnection] = useState<Connection>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = window.setTimeout(() => controller.abort(), 5000)

    checkHealth(controller.signal)
      .then(() => { if (active) setConnection('online') })
      .catch(() => { if (active) setConnection('offline') })
      .finally(() => window.clearTimeout(timeout))

    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [attempt])

  return (
    <div className="shell">
      <header>
        <a className="brand" href="/" aria-label="ses.io — strona główna">ses<span>.io</span></a>
        <span className="badge">Wersja startowa</span>
      </header>
      <main>
        <p className="eyebrow">Wspólna wiedza. Łatwiejsza sesja.</p>
        <h1>Twoje miejsce<br />na materiały do sesji.</h1>
        <p className="intro">Bazy pytań, egzaminy i opracowania — uporządkowane według semestrów i przedmiotów, tworzone razem.</p>

        <section className="connection" aria-labelledby="connection-heading">
          <div>
            <h2 id="connection-heading">Połączenie z backendem</h2>
            <p role="status" className={`status ${connection}`}>{labels[connection]}</p>
            {connection === 'offline' && <p className="hint">Uruchom backend na porcie 5080 i spróbuj ponownie.</p>}
          </div>
          <button disabled={connection === 'loading'} onClick={() => {
            setConnection('loading')
            setAttempt(value => value + 1)
          }}>Sprawdź ponownie</button>
        </section>

        <section aria-labelledby="next-heading">
          <h2 id="next-heading">Co powstanie dalej</h2>
          <div className="cards">
            <article><span className="number">01</span><h3>Twoje bazy</h3><p>Logowanie, własne przestrzenie i zapraszanie znajomych.</p></article>
            <article><span className="number">02</span><h3>Porządek w materiałach</h3><p>Semestry, przedmioty, prowadzący i aktualne wersje plików.</p></article>
            <article><span className="number">03</span><h3>Wspólna praca</h3><p>Propozycje zmian i publikacja po akceptacji administratora.</p></article>
          </div>
        </section>
      </main>
      <footer>ses.io · Szkielet aplikacji — funkcje użytkowników nie są jeszcze wdrożone.</footer>
    </div>
  )
}
