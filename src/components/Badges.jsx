import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { BADGES } from '../data/mockData'

export default function Badges() {
  const unlocked = BADGES.filter((b) => b.unlocked).length
  const [justUnlocked, setJustUnlocked] = useState('streak-7')

  return (
    <section className="card">
      <div className="section-label" style={{ justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Trophy size={13} /> Achievements
        </span>
        <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--text-dim)', fontWeight: 700 }}>
          {unlocked}/{BADGES.length}
        </span>
      </div>

      <div className="badge-grid">
        {BADGES.map((b) => (
          <motion.div
            key={b.id}
            className={`badge ${b.unlocked ? 'unlocked' : 'locked'}`}
            whileTap={{ scale: 0.94 }}
            animate={justUnlocked === b.id ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {b.unlocked && <span className="spark">✦</span>}
            <span className="b-ic">{b.unlocked ? b.icon : '🔒'}</span>
            <div className="b-name">{b.name}</div>
            <div className="b-day">{b.unlocked ? `Unlocked Day ${b.day}` : <>Day {b.day}</>}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {justUnlocked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                marginTop: 12,
                fontSize: 12,
                color: 'var(--text-dim)',
                background: 'rgba(255,207,92,0.08)',
                border: '1px solid rgba(255,207,92,0.25)',
                borderRadius: 12,
                padding: '10px 12px',
              }}
            >
              ✨ <b style={{ color: '#ffcf5c' }}>Badge unlocked:</b> 7-Day Streak — one full week of shipping.
              The heat turns up at Day 15 🔥
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}