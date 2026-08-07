import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { MILESTONES } from '../data/mockData'

export default function StreakCard({ s, day }) {
  const nextMilestone = MILESTONES.find((m) => m > s.current) ?? null
  const progressToNext = nextMilestone
    ? Math.min(1, s.current / nextMilestone)
    : 1
  const show = s.current > 0

  return (
    <motion.section
      className="card streak-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="streak-top">
        <motion.div
          className="streak-flame"
          animate={
            show
              ? { scale: [1, 1.14, 1], rotate: [-3, 3, -3, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 1.6, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        >
          🔥
        </motion.div>
        {s.isActive && !s.firstDay ? (
          <span className="streak-chip">
            <span className="live-dot" style={{ width: 7, height: 7 }} />
            Streak active
          </span>
        ) : s.missedYesterday ? (
          <span className="streak-chip" style={{ color: '#e0c8ff', background: 'rgba(167,139,250,0.15)', borderColor: 'rgba(167,139,250,0.35)' }}>
            💜 Comeback mode
          </span>
        ) : (
          <span className="streak-chip">Ready when you are</span>
        )}
      </div>

      <div className="streak-number-row">
        <span className="streak-number">{s.current}</span>
        <span className="streak-unit">{s.firstDay ? 'days so far' : s.current === 1 ? 'day streak' : 'day streak'}</span>
      </div>
      {s.firstDay && (
        <p style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 6 }}>
          No streak yet — every champion starts here. Ship Day 1 and make it official. 🚀
        </p>
      )}

      <div className="streak-meta">
        <div className="meta-item">
          <div className="meta-label">Longest</div>
          <div className="meta-value">{s.longest} days</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Challenge day</div>
          <div className="meta-value">Day {day} of 60</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Level</div>
          <div className="meta-value dim">{s.firstDay ? '—' : '5'} 🚀</div>
        </div>
      </div>

      <div className="milestone-track">
        <div className="milestone-row">
          <span>
            {nextMilestone ? (
              <>Next milestone: <b>{nextMilestone} days</b></>
            ) : (
              <b>All milestones reached 🏆</b>
            )}
          </span>
          <span>{Math.round(progressToNext * 100)}%</span>
        </div>
        <div className="milestone-bar">
          <motion.div
            className="milestone-fill"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressToNext * 100, 100)}%` }}
            transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          />
        </div>
        <div className="milestone-pips">
          {[3, 7, 15, 30, 60].map((m) => (
            <div key={m} className={`pip ${s.current >= m ? 'passed' : nextMilestone === m ? 'next' : ''}`}>
              {s.current >= m ? '✓' : m === 15 ? '15' : ''}
            </div>
          ))}
        </div>
      </div>

      {show && (
        <motion.div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            marginTop: 12,
            fontSize: 11.5,
            color: 'var(--text-faint)',
          }}
        >
          <Flame size={13} /> Tonight's commit will make it {s.current + 1}
        </motion.div>
      )}
    </motion.section>
  )
}