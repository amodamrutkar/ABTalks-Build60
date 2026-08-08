import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarHeart, CheckCircle2, X } from 'lucide-react'
import MiniCalendar, { dateOfDay, dayOfDate } from './MiniCalendar'

const SIDE_DOWS = ['M', 'T', 'W', 'T', 'F']

export default function Calendar({ days, onOpen, today }) {
  const todayDay = today ?? 12
  const [sel, setSel] = useState(() => dateOfDay(todayDay))
  const selNum = dayOfDate(sel)
  const selDay = days.find((d) => d.day === selNum)

  const shipped = days.filter((d) => d.completed).length
  const missed = days.filter((d) => d.missed).length

  const start = dateOfDay(1)
  const end = dateOfDay(60)
  const fmt = (dt) =>
    dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  const groups = []
  for (let g = 0; g < 6; g++) {
    const cols = [[], []]
    for (let i = 0; i < 10; i++) {
      const day = g * 10 + i + 1
      cols[Math.floor(i / 5)].push(day)
    }
    groups.push(cols)
  }

  return (
    <section className="card">
      <div className="section-label" style={{ justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <CalendarHeart size={13} /> Contribution calendar
        </span>
      </div>

      <div className="month-strip">
        <button className="month-chip active" onClick={() => setSel(dateOfDay(1))}>
          <span className="mc-name">60-day challenge</span>
          <span className="mc-stats">
            {fmt(start)} – {fmt(end)} · {shipped} shipped{missed ? ` · ${missed} missed` : ''}
          </span>
        </button>
      </div>

      <div className="cal-flex">
        <div className="cal-wrap">
          <div className="cal-dows-side">
            {SIDE_DOWS.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>

          <div className="cal-groups">
          {groups.map((cols, g) => (
            <div key={g} className="cal-group">
              {cols.map((col, ci) => (
                <div key={ci} className="cal-col">
                  {col.map((cell) => {
                    const day = days.find((d) => d.day === cell)
                    const isToday = cell === todayDay
                    return (
                      <motion.button
                        key={cell}
                        className={`cal-cell ${day?.completed ? 'done' : ''} ${day?.missed ? 'missed' : ''} ${isToday ? 'today' : ''} ${cell === selNum ? 'sel' : ''}`}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: Math.min((cell - 1) * 0.008, 0.3), duration: 0.2 }}
                        onClick={() => onOpen(day)}
                        aria-label={`Day ${cell}: ${day?.title ?? 'Challenge'}`}
                      >
                        {isToday && !day?.completed && <span className="ghost" />}
                      </motion.button>
                    )
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

        <MiniCalendar days={days} selected={sel} onSelect={setSel} todayDay={todayDay} />
      </div>

      {selDay && (
        <div className="cal-caption">
          {selDay.completed ? (
            <CheckCircle2 size={13} style={{ color: 'var(--mint)', flexShrink: 0 }} />
          ) : selDay.missed ? (
            <X size={13} strokeWidth={3} style={{ color: '#ff9fb2', flexShrink: 0 }} />
          ) : (
            <span className="cal-caption-dot" />
          )}
          <span>
            <b>{selDay.day === todayDay ? 'Today · ' : ''}Day {selDay.day}</b> · {selDay.title} ·{' '}
            {selDay.completed ? 'Shipped' : selDay.missed ? 'Missed' : 'Upcoming'}
          </span>
        </div>
      )}
    </section>
  )
}
