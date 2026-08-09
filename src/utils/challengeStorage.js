const PREFIX = 'abt-challenge-'

export function loadDayProgress(day) {
  try {
    const raw = localStorage.getItem(PREFIX + day)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveDayProgress(day, data) {
  try {
    localStorage.setItem(PREFIX + day, JSON.stringify(data))
  } catch {}
}