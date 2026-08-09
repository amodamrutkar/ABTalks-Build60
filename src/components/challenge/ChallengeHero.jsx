import { motion } from 'framer-motion'

export default function ChallengeHero({ c }) {
  return (
    <motion.div
      className="cd-hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <span className="cd-eyebrow">{c.subtitle}</span>
      <h1 className="cd-hero-title">{c.title}</h1>
      <div className="cd-meta">
        <span className="cd-chip">{c.category}</span>
        <span className="cd-chip" style={{ color: '#FFB45C' }}>{c.difficulty}</span>
        <span className="cd-chip">{c.duration}</span>
      </div>
      <p className="cd-desc">{c.description}</p>
    </motion.div>
  )
}