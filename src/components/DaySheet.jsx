import { motion } from 'framer-motion'
import { GitCommitVertical, X, CheckCircle2, Link2 } from 'lucide-react'

export default function DaySheet({ day, onClose }) {
  if (!day) return null
  return (
    <motion.div
      className="day-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 32, stiffness: 320 }}
    >
      <div className="grab" />
      <button
        onClick={onClose}
        aria-label="Close"
        style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}
      >
        <X size={17} />
      </button>
      <div className="sheet-title">
        Day {day.day} · {day.title}
      </div>
      <div className="sheet-date">
        {day.date} · {day.completed ? 'Shipped' : 'Not submitted'}
      </div>

      {day.github && (
        <div className="link-row">
          <div className="link-ic gh"><GitCommitVertical size={17} /></div>
          <div className="t">
            GitHub submission
            <b>{day.github.replace('github.com/', 'github.com/')}</b>
          </div>
          <CheckCircle2 size={17} style={{ color: 'var(--mint)', marginLeft: 'auto' }} />
        </div>
      )}
      {day.linkedin && (
        <div className="link-row">
          <div className="link-ic li"><Link2 size={16} /></div>
          <div className="t">
            LinkedIn post
            <b>{day.linkedin}</b>
          </div>
          <CheckCircle2 size={17} style={{ color: 'var(--mint)', marginLeft: 'auto' }} />
        </div>
      )}

      {day.completed ? (
        <div className="sheet-xp">+{day.xp} XP earned</div>
      ) : (
        <p style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 10 }}>
          {day.day === 12
            ? 'Open today → submit your GitHub commit and LinkedIn post to bank this day.'
            : 'A missed square — ship it tomorrow for a come back bonus.'}
        </p>
      )}
    </motion.div>
  )
}