import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

const DAY0 = new Date(2026, 7, 1)
const DAY_MS = 86400000

export const dateOfDay = (day) =>
  new Date(DAY0.getFullYear(), DAY0.getMonth(), DAY0.getDate() + day - 1)
export const dayOfDate = (dt) => Math.round((dt - DAY0) / DAY_MS) + 1

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DOWS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function MiniCalendar({ days, selected, onSelect, todayDay, expanded }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1))

  useEffect(() => {
    setView(new Date(selected.getFullYear(), selected.getMonth(), 1))
  }, [selected])

  const fmt = selected.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  const y = view.getFullYear()
  const m = view.getMonth()
  const firstDow = (new Date(y, m, 1).getDay() + 6) % 7
  const dim = new Date(y, m + 1, 0).getDate()
  const todayDt = dateOfDay(todayDay)
  const cells = [...Array(firstDow).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)]

  const shiftDay = (n) => {
    onSelect(new Date(selected.getFullYear(), selected.getMonth(), selected.getDate() + n))
  }

  return (
    <div className={`mcal ${expanded ? 'mcal-expanded' : ''}`}>
      {!expanded && (
        <div className="mcal-row">
          <button className="mcal-nav" aria-label="Previous day" onClick={() => shiftDay(-1)}>
            <ChevronLeft size={13} />
          </button>
          <button className="mcal-pill" onClick={() => setOpen((o) => !o)}>
            <CalendarDays size={13} style={{ color: 'var(--purple)' }} />
            {fmt}
            <span className="mcal-caret">{open ? '▲' : '▼'}</span>
          </button>
          <button className="mcal-nav" aria-label="Next day" onClick={() => shiftDay(1)}>
            <ChevronRight size={13} />
          </button>
        </div>
      )}

      {(expanded || open) && (
        <div className="mcal-month">
          <div className="mcal-head">
            <button className="mcal-nav" aria-label="Previous month" onClick={() => setView(new Date(y, m - 1, 1))}>
              <ChevronLeft size={13} />
            </button>
            <span className="mcal-head-label">
              {MONTHS[m]} {y}
            </span>
            <button className="mcal-nav" aria-label="Next month" onClick={() => setView(new Date(y, m + 1, 1))}>
              <ChevronRight size={13} />
            </button>
          </div>
          <div className="mcal-grid">
            {DOWS.map((w) => (
              <span key={w} className="mcal-dow">
                {w}
              </span>
            ))}
            {cells.map((d, i) => {
              if (!d) return <span key={`e${i}`} className="mcal-day empty" />
              const dt = new Date(y, m, d)
              const dn = dayOfDate(dt)
              const day = dn >= 1 && dn <= 60 ? days.find((x) => x.day === dn) : undefined
              const cls = [
                day?.completed ? 'done' : '',
                day?.missed ? 'missed' : '',
                dt.getTime() === selected.getTime() ? 'sel' : '',
                dt.getTime() === todayDt.getTime() ? 'today-ring' : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <button
                  key={d}
                  className={`mcal-day ${cls}`}
                  onClick={() => {
                    onSelect(dt)
                    setOpen(false)
                  }}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
