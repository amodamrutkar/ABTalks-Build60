import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const CONFETTI = Array.from({ length: 10 }).map((_, i) => ({
  left: 8 + i * 9,
  delay: i * 0.07,
  color: i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#22d3ee' : '#fbbf24',
}))

export default function CompletionState({ day }) {
  return (
    <div className="cd-done-wrap">
      <motion.div
        className="cd-done"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <div className="cd-confetti" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, y: 0, x: 0 }}
              animate={{ opacity: 0, y: 46 + (i % 3) * 14, x: (i % 2 ? 1 : -1) * (10 + i * 2) }}
              transition={{ duration: 1.1, delay: 0.15 + c.delay, ease: 'easeOut' }}
              style={{ left: `${c.left}%`, background: c.color }}
            />
          ))}
        </div>

        <div className="cd-done-badge">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.1 }}
          >
            <Check size={26} strokeWidth={3} />
          </motion.span>
        </div>

        <div className="cd-done-t">DAY {day} COMPLETE</div>
        <div className="cd-done-streak">
          🔥 STREAK CONTINUES <b>{day} → {day + 1}</b>
        </div>
        <p className="cd-done-q">“You showed up today. That’s the point.”</p>
      </motion.div>
    </div>
  )
}