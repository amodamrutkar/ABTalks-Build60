import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function RequirementChecklist({ items, done, onToggle }) {
  const count = done.filter(Boolean).length
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
          className="cd-bar-fill"
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
                className={`cd-check ${on ? 'on' : ''}`}
                onClick={() => onToggle(i)}
                aria-pressed={on}
              >
                <span className="cd-checkbox">
                  {on && (
                    <motion.span
                      initial={{ scale: 0.3 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                    >
                      <Check size={13} strokeWidth={3} />
                    </motion.span>
                  )}
                </span>
                <span className="cd-check-label">{it}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}