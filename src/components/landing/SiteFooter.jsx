import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUp, Camera, Briefcase, GitBranch, Rocket } from 'lucide-react'

function makeDots(count) {
  let seed = 7719
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: count }, () => {
    const glow = rand() < 0.25 ? (rand() < 0.5 ? 'purple' : 'cyan') : 'none'
    return {
      left: (rand() * 100).toFixed(2),
      top: (rand() * 100).toFixed(2),
      size: (1 + rand() * 1.6).toFixed(1),
      opacity: (0.08 + rand() * 0.26).toFixed(2),
      glow,
      dur: (5 + rand() * 8).toFixed(1),
      delay: (rand() * 10).toFixed(1),
    }
  })
}

const colVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function SiteFooter() {
  const navigate = useNavigate()
  const dots = useMemo(() => makeDots(16), [])

  const goSection = (sel) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="foot">
      <div className="foot-bg" aria-hidden="true">
        <div className="foot-patch patch-a" />
        <div className="foot-patch patch-b" />
        {dots.map((d, i) => (
          <span
            key={i}
            className={`foot-dot${d.glow !== 'none' ? ` glow-${d.glow}` : ''}`}
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

      <motion.div
        className="foot-cta"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="foot-cta-title">Ready to start?</h3>
        <p className="foot-cta-sub">
          Don&apos;t wait for motivation.
          <br />
          Just show up.
        </p>
        <button className="hero-btn primary foot-cta-btn" onClick={() => navigate('/dashboard')}>
          <Rocket size={16} /> Start My Journey →
        </button>
      </motion.div>

      <motion.div
        className="foot-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div className="foot-brand" variants={colVariants}>
          <span className="foot-logo">
            ABTALKS <i>·</i> <em>60</em>
          </span>
          <p className="foot-tagline">Build. Commit. Go.</p>
          <p className="foot-blurb">Ship something every day for 60 days. Show up. Build. Share. Repeat.</p>
        </motion.div>

        <motion.nav className="foot-col" variants={colVariants} aria-label="Challenge">
          <h4 className="foot-col-title">Challenge</h4>
          <button className="foot-link" onClick={() => goSection('.jrn')}>
            60-Day Journey
          </button>
          <button className="foot-link" onClick={() => navigate('/about')}>
            How It Works
          </button>
          <button className="foot-link" onClick={() => goSection('.rvw-sec')}>
            Reviews
          </button>
          <span className="foot-link soon">FAQ</span>
        </motion.nav>

        <motion.nav className="foot-col" variants={colVariants} aria-label="Connect">
          <h4 className="foot-col-title">Connect</h4>
          <span className="foot-link soon">
            <Camera size={15} /> Instagram
          </span>
          <span className="foot-link soon">
            <Briefcase size={15} /> LinkedIn
          </span>
          <a
            className="foot-link"
            href="https://github.com/amodamrutkar/ABTalks-Build60"
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={15} /> GitHub
          </a>
        </motion.nav>
      </motion.div>

      <motion.div
        className="foot-statement"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        60 days. 60 builds. One habit.
      </motion.div>

      <div className="foot-bottom">
        <span>© 2026 ABTALKS · 60</span>
        <button className="foot-top" onClick={backToTop}>
          <ArrowUp size={14} /> Back to top
        </button>
      </div>
    </footer>
  )
}
