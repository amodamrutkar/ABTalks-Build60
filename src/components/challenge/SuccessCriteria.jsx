import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessCriteria({ items, done, onToggle }) {
  const count = done.filter(Boolean).length
  const missing = items.length - count
  const pct = items.length ? Math.round((count / items.length) * 100) : 0

  return (
    <div className="cd-card">
      <div className="cd-prog-head">
        <span>
          {count} / {items.length} completed
        </span>
        <span className="cd-prog-num">{pct}%</span>
      </div>
      <div className="cd-bar">
        <motion.div
          className="cd-bar-fill sun"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <ul className="cd-checks">
        {items.map((it, i) => {
          const on = done[i]
          return (
            <li key={i}>
              <button
                className={`cd-crit ${on ? 'on' : ''}`}
                onClick={() => onToggle(i)}
                aria-pressed={on}
              >
                <span className="cd-crit-ic">
                  {on && (
                    <motion.span
                      initial={{ scale: 0.3 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                    >
                      <CheckCircle2 size={15} strokeWidth={2.4} />
                    </motion.span>
                  )}
                </span>
                <span className="cd-crit-label">
                  {it.label}
                  <small>{it.hint}</small>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {missing > 0 && (
        <div className="cd-crit-note" role="status">
          Complete {missing} more {missing === 1 ? 'check' : 'checks'} to submit.
        </div>
      )}
    </div>
  )
}