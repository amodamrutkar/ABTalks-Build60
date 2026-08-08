import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Medal } from 'lucide-react'
import { ACHIEVEMENTS } from '../data/mockData'

const RARITY = {
  rare: { label: 'Rare', color: '#38bdf8' },
  epic: { label: 'Epic', color: '#a855f7' },
  legendary: { label: 'Legendary', color: '#fbbf24' },
  mythic: { label: 'Mythic', color: '#f43f5e' },
}
const RARITY_ORDER = { rare: 1, epic: 2, legendary: 3, mythic: 4 }

const RARITY_SHINE = {
  rare: { '--glow': '#a78bfa' },
  epic: { '--shine': 'rgba(168, 85, 247, 0.65)', '--glow': '#a855f7', '--spark': 'linear-gradient(135deg,#a855f7,#7c3aed)' },
  legendary: { '--shine': 'rgba(253, 224, 71, 0.55)', '--glow': '#fde047', '--spark': 'linear-gradient(135deg,#fde047,#facc15)' },
  mythic: { '--shine': 'rgba(251, 113, 133, 0.55)', '--glow': '#fb7185', '--spark': 'linear-gradient(135deg,#fb7185,#f87171)' },
}

const dayLabel = (b) =>
  b.event
    ? `⏳ ${b.unlocked ? 'Earned' : `ends ${b.eventEnds}`}`
    : b.unlocked
      ? b.day
        ? `Unlocked Day ${b.day}`
        : 'Unlocked · secret milestone'
      : b.day
        ? `Day ${b.day}`
        : 'Secret unlock'

const sortByRarity = (arr) => [...arr].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])

export default function AchievementsPage() {
  const earned = sortByRarity(ACHIEVEMENTS.filter((b) => b.unlocked))
  const locked = sortByRarity(ACHIEVEMENTS.filter((b) => !b.unlocked))
  const events = locked.filter((b) => b.event)
  const regularLocked = locked.filter((b) => !b.event)
  const [pop, setPop] = useState(null)

  const openPop = (e, b) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.bottom + 10
    setPop({ b, x, y, flip: y > window.innerHeight - 340 })
  }

  const BadgeCard = ({ b }) => (
    <motion.button
      className={`badge ${b.unlocked ? 'unlocked' : 'locked'}`}
      style={{
        borderColor: b.unlocked ? `${RARITY[b.rarity].color}66` : undefined,
        boxShadow: b.unlocked ? `0 0 18px -6px ${RARITY[b.rarity].color}aa` : undefined,
        cursor: 'pointer',
        textAlign: 'center',
        background: b.unlocked
          ? `linear-gradient(170deg, ${RARITY[b.rarity].color}22, var(--surface))`
          : undefined,
        ...(b.unlocked && !b.event ? RARITY_SHINE[b.rarity] : {}),
      }}
      {...(b.event ? { 'data-event': '1' } : {})}
      whileTap={{ scale: 0.94 }}
      onClick={(e) => openPop(e, b)}
    >
      {b.unlocked && <span className="spark">✦</span>}
      {b.event && <span className="badge-event-tag">⚡</span>}
      <span className="b-ic">{b.unlocked ? b.icon : '🔒'}</span>
      <div className="b-name">{b.name}</div>
      <div className="b-rarity" style={{ color: RARITY[b.rarity].color }}>
        {RARITY[b.rarity].label}
      </div>
      <div className="b-day">{dayLabel(b)}</div>
    </motion.button>
  )

  return (
    <section className="card badge-card">
      <div className="badge-dots" />
      <div className="badge-card-inner">
        <div className="section-label" style={{ justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Medal size={13} /> Achievements vault
          </span>
          <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--text-dim)', fontWeight: 700 }}>
            {earned.length}/{ACHIEVEMENTS.length}
          </span>
        </div>

        <div className="badge-group-label">
          Earned · {earned.length}
        </div>
        <div className="badge-grid">
          {earned.map((b) => (
            <BadgeCard key={b.id} b={b} />
          ))}
        </div>

        <div className="badge-group-label" style={{ marginTop: 16 }}>
          Locked · {regularLocked.length}
        </div>
        <div className="badge-grid">
          {regularLocked.map((b) => (
            <BadgeCard key={b.id} b={b} />
          ))}
        </div>

        <div className="badge-group-label" style={{ marginTop: 16, color: '#22d3ee' }}>
          ⚡ Event limited · {events.length}
        </div>
        <div className="badge-grid">
          {events.map((b) => (
            <BadgeCard key={b.id} b={b} />
          ))}
        </div>

        <div className="badge-legend">
          {Object.values(RARITY).map((r) => (
            <span key={r.label} className="badge-legend-item">
              <i style={{ background: r.color }} />
              {r.label}
            </span>
          ))}
          <span className="badge-legend-item">
            <i style={{ background: '#22d3ee' }} />
            Event
          </span>
        </div>
      </div>

      <AnimatePresence>
        {pop && (
          <>
            <motion.div
              key="bd-mask"
              className="bd-pop-mask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPop(null)}
            />
            <motion.div
              key={pop.b.id}
              className="bd-pop"
              style={{
                left: Math.max(10, Math.min(pop.x, window.innerWidth - 290)),
                top: pop.flip ? pop.y - 360 : pop.y,
                borderColor: `${RARITY[pop.b.rarity].color}55`,
              }}
              initial={{ opacity: 0, scale: 0.92, y: pop.flip ? 6 : -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: pop.flip ? 4 : -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bd-top">
                <span
                  className="bd-ic"
                  style={{ boxShadow: `0 0 28px -4px ${RARITY[pop.b.rarity].color}`, borderColor: `${RARITY[pop.b.rarity].color}88` }}
                >
                  {pop.b.icon}
                </span>
                <div className="bd-head">
                  <div className="bd-name">{pop.b.name}</div>
                  <div className="bd-tags">
                    <span className="bd-rarity" style={{ color: RARITY[pop.b.rarity].color, borderColor: `${RARITY[pop.b.rarity].color}66` }}>
                      {RARITY[pop.b.rarity].label}
                    </span>
                    {pop.b.event && (
                      <span className="bd-event" style={{ color: '#22d3ee', borderColor: 'rgba(34,211,238,0.5)' }}>
                        ⚡ Limited event
                      </span>
                    )}
                  </div>
                </div>
                <button className="bd-close" onClick={() => setPop(null)} aria-label="Close">
                  <X size={14} />
                </button>
              </div>

              <p className="bd-desc">{pop.b.desc}</p>

              <div className="bd-howto">
                <Sparkles size={13} style={{ color: RARITY[pop.b.rarity].color, flexShrink: 0 }} />
                <span>
                  <b>How to earn:</b> {pop.b.howto}
                </span>
              </div>

              <div className="bd-status" style={{ color: pop.b.unlocked ? 'var(--mint)' : pop.b.event ? '#22d3ee' : 'var(--text-faint)' }}>
                {pop.b.unlocked
                  ? pop.b.day
                    ? `✓ Earned · Day ${pop.b.day}`
                    : '✓ Earned · secret milestone'
                  : pop.b.event
                    ? `⏳ Limited time · ends ${pop.b.eventEnds}`
                    : pop.b.day
                      ? `🔒 Locked · unlocks at Day ${pop.b.day}`
                      : '🔒 Secret · unlock condition hidden'}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}