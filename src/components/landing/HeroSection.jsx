import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Rocket } from 'lucide-react'

const STATS = [
  { value: '18K+', label: 'Students\nActive Daily Builders' },
  { value: '4.9', label: 'Rating\nFrom 3,400+ Reviews' },
  { value: '60 Days', label: 'Challenge\nTransformative Habit' },
]

function makeDots(count) {
  let seed = 20260811
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: count }, () => {
    const glow = rand() < 0.3 ? (rand() < 0.5 ? 'purple' : 'cyan') : 'none'
    return {
      left: (rand() * 100).toFixed(2),
      top: (rand() * 100).toFixed(2),
      size: (1 + rand() * 1.8).toFixed(1),
      opacity: (0.1 + rand() * 0.38).toFixed(2),
      glow,
      strong: rand() < 0.08,
      trail: rand() < 0.2,
      dur: (4 + rand() * 9).toFixed(1),
      delay: (rand() * 9).toFixed(1),
    }
  })
}

export default function HeroSection() {
  const navigate = useNavigate()
  const dots = useMemo(() => makeDots(54), [])

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-patch patch-a" />
        <div className="hero-patch patch-b" />
        <div className="hero-patch patch-c" />
        {dots.map((d, i) => (
          <span
            key={i}
            className={`hero-dot${d.glow !== 'none' ? ` glow-${d.glow}` : ''}${d.strong ? ' strong' : ''}${d.trail ? ' trail' : ''}`}
            style={{
              '--dl': `${d.left}%`,
              '--dt': `${d.top}%`,
              '--ds': `${d.size}px`,
              '--do': d.opacity,
              '--dd': `${d.dur}s`,
              '--dg': `${d.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-top">
        <span className="hero-brand">
          ABTALKS <i>·</i> <em>60</em>
        </span>
      </div>

      <motion.span
        className="hero-chip"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        ⚡ 60-day public build challenge
      </motion.span>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        Build.
        <br />
        Commit.
        <br />
        <span>Go.</span>
      </motion.h1>

      <motion.p
        className="hero-desc"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18 }}
      >
        Ship something every day for 60 days — a line of code, a fix, a post.
        Public proof that consistency beats everything.
      </motion.p>

      <motion.div
        className="hero-btns"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28 }}
      >
        <button className="hero-btn primary" onClick={() => navigate('/dashboard')}>
          <Rocket size={16} /> Start My Journey
        </button>
      </motion.div>

      <motion.p
        className="hero-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        no streaks required to begin — just show up today
      </motion.p>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.58 }}
      >
        {STATS.map((s) => (
          <div key={s.value} className="stat-card">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
