import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

function estimateEndDate(completed) {
  const start = new Date(2026, 7, 6)
  const elapsedDays = Math.max(completed, 1)
  const perDay = elapsedDays / 10
  const remaining = Math.max(60 - completed, 0)
  const end = new Date(start.getTime() + (completed + remaining / perDay) * 24 * 3600 * 1000)
  return end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function OverallProgress({ completed, total, today }) {
  const pct = Math.round((completed / total) * 100)
  const endDate = estimateEndDate(completed)

  return (
    <section className="card">
      <div className="section-label">
        <TrendingUp size={13} /> Overall progress
      </div>
      <div className="progress-row">
        <div className="progress-frac">
          {completed} <small>/ {total} days</small>
        </div>
        <div className="progress-pct">{pct}%</div>
      </div>
      <div className="bar-outer">
        <motion.div
          className="bar-inner"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
        />
      </div>
      <div className="progress-foot">
        <span>
          {completed === 0
            ? 'Nothing shipped yet — Day 1 is waiting'
            : completed >= total
              ? '🏆 60/60 — full challenge complete'
              : `Day ${today} in progress`}
        </span>
        <span>Finishes ~{endDate}</span>
      </div>
    </section>
  )
}