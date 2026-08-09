import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, MoreHorizontal, X } from 'lucide-react'

export default function ChallengeHeader({
  day,
  streak,
  active = false,
  onBack,
  progress,
}) {
  const [open, setOpen] = useState(false)
  const pct = Math.ceil((day / 60) * 20)
  const { reqDone = 0, reqTotal = 0, critDone = 0, critTotal = 0, submitted = false } =
    progress ?? {}

  return (
    <>
      <header className="chal-head">
        <button className="chal-back" onClick={onBack} aria-label="Back to Dashboard">
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>

        <div className="chal-head-mid">
          <div className="chal-day-line">DAY {day} OF 60</div>
          <div className="chal-bar" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={`seg ${i < pct ? 'on' : ''}`} />
            ))}
          </div>
        </div>

        <div className="chal-head-right">
          <span className="chal-streak" title="Current streak">
            🔥 {active ? day + 1 : day}
          </span>
          <button
            className="chal-more"
            aria-label="Day progress summary"
            onClick={() => setOpen((o) => !o)}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="chal-pop-mask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="chal-pop"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <div className="chal-pop-head">
                <span>DAY {day} · PROGRESS</span>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <div className="chal-pop-row">
                <span>Requirements</span>
                <b>
                  {reqDone}/{reqTotal}
                </b>
              </div>
              <div className="chal-pop-row">
                <span>Success checks</span>
                <b>
                  {critDone}/{critTotal}
                </b>
              </div>
              <div className="chal-pop-row">
                <span>Submission</span>
                <b>{submitted ? 'Shipped ✓' : 'Pending'}</b>
              </div>
              {active && <div className="chal-pop-badge">🔥 STREAK ACTIVE — {day + 1}</div>}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}