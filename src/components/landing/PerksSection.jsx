import { motion } from 'framer-motion'

const PERKS = [
  { t: 'Build consistency', d: 'Show up daily — gamified.', icon: '🔥', cls: 'pa' },
  { t: 'Improve skills', d: 'Code, write, design, ship.', icon: '🛠️', cls: 'pb' },
  { t: 'Track progress', d: 'Calendar, XP, level, score.', icon: '📈', cls: 'pc' },
  { t: 'Earn achievements', d: 'Rare → Mythic badges.', icon: '🏅', cls: 'pd' },
  { t: 'Portfolio proof', d: 'A public history of work.', icon: '💼', cls: 'pe' },
  { t: 'Move with friends', d: 'Feeds, ranks, leaderboards.', icon: '🤝', cls: 'pf' },
  { t: 'Develop discipline', d: 'The meta-skill of everything.', icon: '🧠', cls: 'pg' },
]

export default function PerksSection() {
  return (
    <section className="perks-sec">
      <div className="sec-head">
        <span className="sec-eyebrow">WHY JOIN</span>
        <h2 className="sec-title">Perks of the grind</h2>
      </div>
      <div className="perks">
        {PERKS.map((p, i) => (
          <motion.div
            key={p.t}
            className={`perk ${p.cls}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
          >
            <div className="perk-in" style={{ '--fd': `${i * 0.45}s` }}>
              <span className="perk-ic">{p.icon}</span>
              <div className="perk-t">{p.t}</div>
              <div className="perk-d">{p.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}