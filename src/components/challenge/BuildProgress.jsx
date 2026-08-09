import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function BuildProgress({ steps, currentIndex, onSelect }) {
  const [open, setOpen] = useState(currentIndex ?? 0)

  return (
    <div className="cd-card cd-progress">
      <ol className="cd-work">
        {steps.map((s, i) => {
          const done = i < currentIndex
          const isCurrent = i === currentIndex
          const expanded = open === i
          return (
            <li key={s.label} className="cd-step">
              <button
                className={`cd-step-btn ${isCurrent ? 'current' : ''} ${done ? 'done' : ''}`}
                onClick={() => {
                  if (expanded) setOpen(-1)
                  else {
                    setOpen(i)
                    onSelect?.(i)
                  }
                }}
                aria-expanded={expanded}
              >
                <span className="cd-step-node">
                  {done ? <Check size={13} strokeWidth={3} /> : isCurrent ? '●' : i + 1}
                </span>
                <span className="cd-step-label">{s.label}</span>
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    className="cd-step-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {s.demo}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </div>
  )
}