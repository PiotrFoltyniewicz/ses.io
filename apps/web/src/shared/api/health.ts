export async function checkHealth(signal: AbortSignal): Promise<void> {
  const response = await fetch('/api/v1/health', { signal })

  if (!response.ok) {
    throw new Error(`API zwróciło HTTP ${response.status}`)
  }

  const data: unknown = await response.json()
  if (typeof data !== 'object' || data === null || !('status' in data) || data.status !== 'ok') {
    throw new Error('Nieprawidłowa odpowiedź API')
  }
}
