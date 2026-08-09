import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const STAGES = [
  { range: 'DAY 1', title: 'The spark', tag: 'START', icon: '🚀', color: '#22d3ee', chip: 'First commit', desc: 'Show up. Ship one small thing. The habit is born.', pct: 8 },
  { range: 'DAYS 5–10', title: 'Consistency', tag: 'HABIT', icon: '🔥', color: '#a855f7', chip: '5-day streak', desc: 'Motivation fades. Showing up doesn’t. Stack the days.', pct: 25 },
  { range: 'DAYS 15–25', title: 'Skill building', tag: 'REPEATS', icon: '🛠️', color: '#6366f1', chip: 'Portfolio grows', desc: 'Daily reps turn into real ability.', pct: 45 },
  { range: 'DAYS 30–40', title: 'Momentum', tag: 'FLOW', icon: '⚡', color: '#22d3ee', chip: 'Halfway there', desc: 'The routine starts running itself.', pct: 60 },
  { range: 'DAYS 45–55', title: 'Mastery', tag: 'EDGE', icon: '🎯', color: '#a78bfa', chip: 'Deep focus', desc: 'You’re not starting anymore — you’re building.', pct: 85 },
  { range: 'DAY 60', title: 'Completion', tag: 'PROOF', icon: '🏆', color: '#fbbf24', chip: 'Challenge complete', desc: '60 days shipped. Proof that consistency worked.', pct: 100 },
]

const WINDOW = 0.62 // how far (in progress units) a card travels while entering/exiting
const CORE = 0.16 // progress window around the center where the card stays fully visible
const DRIFT = 96 // px the card drifts from its true position during entry/exit

const easeInOut = (t) => {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

function JourneyCard({ s, i, total, progress }) {
  const c = i / (total - 1)

  const opacity = useTransform(progress, (p) => {
    const z = Math.abs(p - c)
    if (z >= WINDOW) return 0
    if (z <= CORE) return 1
    return easeInOut((WINDOW - z) / (WINDOW - CORE))
  })

  const x = useTransform(progress, (p) => -DRIFT * clamp((p - c) / WINDOW, -1, 1))

  const scale = useTransform(progress, (p) => {
    const z = Math.abs(p - c)
    return 1 + 0.02 * Math.max(0, 1 - z / 0.25)
  })

  const glow = useTransform(progress, (p) => {
    const z = Math.abs(p - c)
    return 0.55 + 0.45 * Math.max(0, 1 - z / 0.25)
  })

  return (
    <motion.div
      className="jcard"
      style={{ '--jc': s.color, '--jglow': glow, opacity, x, scale }}
    >
      <div className="jcard-top">
        <span className="jcard-range" style={{ color: s.color }}>
          {s.range}
        </span>
        <span className="jcard-ic">{s.icon}</span>
      </div>
      <div className="jcard-title">{s.title}</div>
      <div className="jcard-desc">{s.desc}</div>
      <div className="jcard-bar">
        <div className="jcard-fill" style={{ width: `${s.pct}%`, background: s.color }} />
      </div>
      <div className="jcard-foot">
        <span className="jcard-tag">{s.tag}</span>
        <span className="jcard-chip" style={{ borderColor: `${s.color}55` }}>
          {s.chip}
        </span>
      </div>
      {i === 0 && <span className="jcard-ghost">Day 1 · here it starts</span>}
    </motion.div>
  )
}

export default function JourneySection() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const [travel, setTravel] = useState(0)
  const [idx, setIdx] = useState(1)

  const { scrollYProgress } = useScroll({ target: wrapRef })
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIdx(Math.max(1, Math.min(STAGES.length, Math.round(v * (STAGES.length - 1)) + 1)))
  })

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !stageRef.current) return
      setTravel(Math.max(0, trackRef.current.scrollWidth - stageRef.current.clientWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section className="jrn" ref={wrapRef}>
      <div className="jrn-stage" ref={stageRef}>
        <div className="jrn-head">
          <span className="jrn-eyebrow">THE 60-DAY JOURNEY</span>
          <span className="jrn-count">0{idx} / 06</span>
        </div>
        <p className="jrn-sub">Keep scrolling — the story moves with you.</p>

        <div className="jrn-strip">
          <motion.div className="jrn-track" ref={trackRef} style={{ x }}>
            {STAGES.map((s, i) => (
              <JourneyCard
                key={s.range}
                s={s}
                i={i}
                total={STAGES.length}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        <div className="jrn-dots">
          {STAGES.map((s, i) => (
            <span key={s.range} className={`dot ${i === idx - 1 ? 'on' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  )
}