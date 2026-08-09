import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Rocket } from 'lucide-react'
import ChallengeTimeline from '../components/about/ChallengeTimeline'

export default function AboutChallengePage() {
  const navigate = useNavigate()

  return (
    <div className="shell land-shell">
      <header className="about-head">
        <button className="about-back" onClick={() => navigate('/')} aria-label="Back to home">
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="about-title">About the challenge</div>
          <div className="about-sub">how the 60 days work</div>
        </div>
      </header>

      <motion.div
        className="about-hero"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="hero-chip">⚡ THE RULES ARE SIMPLE</span>
        <h1 className="about-h1">
          Show up.<br />
          Ship.<br />
          <span>Repeat.</span>
        </h1>
        <p className="about-lead">
          Scroll the journey — from Day 1 to the finish line. This is what 60
          days looks like, step by step.
        </p>
      </motion.div>

      <ChallengeTimeline />

      <motion.div
        className="about-cta"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        <div className="about-cta-ic">🏁</div>
        <div className="about-cta-t">Day 60 is waiting.</div>
        <p className="about-cta-d">The only day that matters is today.</p>
        <button className="hero-btn primary cta" onClick={() => navigate('/dashboard')}>
          <Rocket size={16} /> Start the Challenge
        </button>
        <button className="hero-btn ghost cta" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Home
        </button>
      </motion.div>

      <footer className="land-foot">
        ABTalks 60 · Build. Commit. Go.
      </footer>
    </div>
  )
}