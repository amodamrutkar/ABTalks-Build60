import { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { Zap } from 'lucide-react'
import { XP_TABLE, getLevelInfo } from '../data/mockData'

function useCountUp(target, duration = 1.1) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [target, duration])
  return val
}

export default function XpCard({ xp, streak }) {
  const info = getLevelInfo(xp.total, XP_TABLE)
  const animated = useCountUp(xp.total)
  const pct = Math.round(info.progress * 100)
  const isNewLevel = streak.current > 0 && xp.total >= 850

  return (
    <motion.section
      className="card xp-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
    >
      <div className="xp-top">
        <div>
          <div className="section-label" style={{ marginBottom: 4 }}>
            <Zap size={13} /> Level {info.level}
          </div>
          <div className="level-chip">LVL {info.level}</div>
        </div>
        <div className="xp-count">
          <div className="n">
            <span>{animated.toLocaleString('en-IN')}</span> XP
          </div>
          <div className="l">{info.xpToNext > 0 ? `${info.xpToNext} XP to Level ${info.level + 1}` : 'Max level'}</div>
        </div>
      </div>

      <div className="xp-bar-wrap">
        <div className="xp-bar">
          <motion.div
            className="xp-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(pct, 4)}%` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
      <div className="xp-foot">
        <span>{info.xpInLevel.toLocaleString('en-IN')} / {info.nextMin - info.currentMin} XP</span>
        <span>{isNewLevel ? 'Level up imminent 🚀' : 'Consistency pays'}</span>
      </div>

      <div className="xp-bonus-row">
        <span className="bonus-chip">+100 / day</span>
        <span className="bonus-chip">+25 streak bonus</span>
        <span className="bonus-chip">+50 LinkedIn post</span>
        <span className="bonus-chip">+25 early bird (before 10 PM)</span>
      </div>
    </motion.section>
  )
}