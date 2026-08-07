import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TimerReset, PartyPopper, HeartHandshake, Flag } from 'lucide-react'

const DEADLINE_HOUR = 23
const DEADLINE_MIN = 59

function useCountdown() {
  const [left, setLeft] = useState({ h: DEADLINE_HOUR, m: DEADLINE_MIN })
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(DEADLINE_HOUR, DEADLINE_MIN, 0, 0)
      let diff = Math.max(0, Math.floor((end - now) / 1000))
      if (diff === 0) {
        end.setDate(end.getDate() + 1)
        diff = Math.max(0, Math.floor((end - now) / 1000))
      }
      setLeft({ h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60) })
    }
    tick()
    const t = setInterval(tick, 30000)
    return () => clearInterval(t)
  }, [])
  return left
}

export default function Reminder({ r, s }) {
  const left = useCountdown()
  const pad = (n) => String(n).padStart(2, '0')

  if (r.type === 'done') {
    return (
      <motion.div className="reminder done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div className="reminder-icon"><PartyPopper size={18} color="#31e0a6" /></div>
        <div className="reminder-body">
          <div className="reminder-title">{r.label}</div>
          <div className="reminder-sub">+150 XP banked · comeback tomorrow, same time 🔥</div>
        </div>
      </motion.div>
    )
  }

  if (r.type === 'comeback') {
    return (
      <motion.div className="reminder comeback" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div className="reminder-icon"><HeartHandshake size={18} color="#a78bfa" /></div>
        <div className="reminder-body">
          <div className="reminder-title">Comeback mode · {s.current} day streak on the line</div>
          <div className="reminder-sub">Missed days don't erase you. Ship today for a +25 XP comeback bonus. 💜</div>
        </div>
      </motion.div>
    )
  }

  if (r.type === 'start') {
    return (
      <motion.div className="reminder" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div className="reminder-icon"><Flag size={18} color="#ffcf5c" /></div>
        <div className="reminder-body">
          <div className="reminder-title">Your 60-day journey starts today</div>
          <div className="reminder-sub">Commit on GitHub + post on LinkedIn. That's it. You've got this.</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="reminder due" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <div className="reminder-icon"><TimerReset size={18} color="#ff8a4c" /></div>
      <div className="reminder-body">
        <div className="reminder-title">Today's challenge expires tonight</div>
        <div className="reminder-sub">Day {s.current + 1} resets at 12:00 AM IST</div>
      </div>
      <span className="timer">⏳ {pad(left.h)}:{pad(left.m)}</span>
    </motion.div>
  )
}