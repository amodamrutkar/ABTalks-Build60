import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Rocket, Info } from 'lucide-react'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero-glow" />
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
          <Rocket size={16} /> Start the Challenge
        </button>
        <button className="hero-btn ghost" onClick={() => navigate('/about')}>
          <Info size={16} /> About the Challenge
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
    </section>
  )
}