import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

export default function NextDayCard({ day, onDashboard }) {
  return (
    <motion.div
      className="cd-next"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
    >
      <span className="cd-next-eyebrow">UP NEXT</span>
      <div className="cd-next-t">DAY {day + 1}</div>
      <p>Your next challenge unlocks after today’s challenge is completed.</p>
      <div className="cd-next-actions">
        <button className="hero-btn primary cta" onClick={onDashboard}>
          <Rocket size={16} /> Back to Dashboard
        </button>
      </div>
    </motion.div>
  )
}