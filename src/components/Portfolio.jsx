import { motion } from 'framer-motion'
import { Crosshair } from 'lucide-react'

const R = 38
const CIRC = 2 * Math.PI * R

export default function Portfolio({ p }) {
  const offset = CIRC * (1 - p.score / 100)

  return (
    <section className="card portfolio">
      <div className="section-label">
        <Crosshair size={13} /> Portfolio strength
      </div>

      <div className="port-top">
        <div className="ring">
          <svg width="86" height="86" viewBox="0 0 86 86">
            <circle className="ring-bg" cx="43" cy="43" r={R} fill="none" strokeWidth="7" />
            <motion.circle
              className="ring-fill"
              cx="43"
              cy="43"
              r={R}
              fill="none"
              strokeWidth="7"
              strokeDasharray={CIRC}
              initial={{ strokeDashoffset: CIRC }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            />
          </svg>
          <div className="ring-label">
            <div className="v">{p.score}%</div>
            <div className="s">score</div>
          </div>
        </div>
        <div className="port-status">
          <div className="title">Recruiter readiness</div>
          <span className="tag">{p.recruiterReady}</span>
          <p style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, lineHeight: 1.45 }}>
            {p.score >= 70
              ? 'Recruiters can see a real, consistent builder.'
              : 'Keep shipping — the algorithm rewards proof.'}
          </p>
        </div>
      </div>

      <div className="port-bars">
        {p.breakdown.map((b) => (
          <div className="port-bar" key={b.label}>
            <span className="label">{b.label}</span>
            <div className="track">
              <motion.div
                className="fill"
                style={{ background: b.color }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(b.value, 3)}%` }}
                transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
            <span className="val">{b.value}</span>
          </div>
        ))}
      </div>

      <div className="port-tips">
        {p.tips.map((t, i) => (
          <div className="tip" key={i}>
            <span className="t-ic">💡</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  )
}