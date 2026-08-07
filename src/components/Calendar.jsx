import { motion } from 'framer-motion'
import { CalendarHeart } from 'lucide-react'

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function Calendar({ days, onOpen }) {
  const todayDay = 12
  const cols = Math.ceil(days.length / 7)

  return (
    <section className="card">
      <div className="section-label" style={{ justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <CalendarHeart size={13} /> Contribution calendar
        </span>
        <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--text-faint)', fontWeight: 600 }}>
          tap a square
        </span>
      </div>

      <div className="cal-scroll">
        <div className="cal" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {WEEKDAYS.map((w, row) =>
            days.map((d) => {
              const gi = d.day - 1
              const r = gi % 7
              const c = Math.floor(gi / 7)
              if (r !== row) return null
              return (
                <div key={d.day} style={{ position: 'relative' }}>
                  <motion.button
                    className={`cal-cell ${d.completed ? 'done' : ''} ${d.day === todayDay ? 'today' : ''}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(c * 0.02, 0.3), duration: 0.2 }}
                    onClick={() => onOpen(d)}
                    aria-label={`Day ${d.day}: ${d.title}`}
                  >
                    {d.day === todayDay && !d.completed && <span className="ghost" />}
                  </motion.button>
                  <span
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 3px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 8,
                      color: 'var(--text-faint)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {d.day === todayDay ? 'now' : ''}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 12, fontSize: 11, color: 'var(--text-faint)' }}>
        Less
        {[0, 1, 2, 3].map((i) => (
          <span key={i} style={{ width: 12, height: 12, borderRadius: 4, background: i === 0 ? 'rgba(255,255,255,0.06)' : `rgba(255,138,76,${0.25 + i * 0.25})`, display: 'inline-block' }} />
        ))}
        More
      </div>
    </section>
  )
}