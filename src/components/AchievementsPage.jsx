import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X, Sparkles, Medal } from 'lucide-react'
import { ACHIEVEMENTS } from '../data/mockData'

const RARITY = {
  rare: { label: 'Rare', color: '#38bdf8' },
  epic: { label: 'Epic', color: '#a855f7' },
  legendary: { label: 'Legendary', color: '#fbbf24' },
  mythic: { label: 'Mythic', color: '#f43f5e' },
}
const RARITY_ORDER = { rare: 1, epic: 2, legendary: 3, mythic: 4 }

const sortByRarity = (arr) => [...arr].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])

export default function AchievementsPage() {
  const earned = sortByRarity(ACHIEVEMENTS.filter((b) => b.unlocked))
  const locked = sortByRarity(ACHIEVEMENTS.filter((b) => !b.unlocked))
  const events = locked.filter((b) => b.event)
  const regularLocked = locked.filter((b) => !b.event)
  const [sel, setSel] = useState(null)

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
      }}
      whileTap={{ scale: 0.94 }}
      onClick={() => setSel(b)}
    >
      {b.unlocked && <span className="spark">✦</span>}
      {b.event && <span className="badge-event-tag">⚡</span>}
      <span className="b-ic">{b.unlocked ? b.icon : '🔒'}</span>
      <div className="b-name">{b.name}</div>
      <div className="b-rarity" style={{ color: RARITY[b.rarity].color }}>
        {RARITY[b.rarity].label}
      </div>
      <div className="b-day">
        {b.event ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            ⏳ {b.unlocked ? 'Earned' : `ends ${b.eventEnds}`}
          </span>
        ) : b.unlocked ? (
          `Unlocked Day ${b.day}`
        ) : b.day ? (
          `Day ${b.day}`
        ) : (
          'Secret unlock'
        )}
      </div>
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

        <AnimatePresence>
          {sel && (
            <motion.div
              key={sel.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="badge-detail" style={{ borderColor: `${RARITY[sel.rarity].color}55` }}>
                <div className="bd-top">
                  <span
                    className="bd-ic"
                    style={{ boxShadow: `0 0 28px -4px ${RARITY[sel.rarity].color}`, borderColor: `${RARITY[sel.rarity].color}88` }}
                  >
                    {sel.icon}
                  </span>
                  <div className="bd-head">
                    <div className="bd-name">{sel.name}</div>
                    <div className="bd-tags">
                      <span className="bd-rarity" style={{ color: RARITY[sel.rarity].color, borderColor: `${RARITY[sel.rarity].color}66` }}>
                        {RARITY[sel.rarity].label}
                      </span>
                      {sel.event && (
                        <span className="bd-event" style={{ color: '#22d3ee', borderColor: 'rgba(34,211,238,0.5)' }}>
                          ⚡ Limited event
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="bd-close" onClick={() => setSel(null)} aria-label="Close">
                    <X size={14} />
                  </button>
                </div>

                <p className="bd-desc">{sel.desc}</p>

                <div className="bd-howto">
                  <Sparkles size={13} style={{ color: RARITY[sel.rarity].color, flexShrink: 0 }} />
                  <span>
                    <b>How to earn:</b> {sel.howto}
                  </span>
                </div>

                <div className="bd-status" style={{ color: sel.unlocked ? 'var(--mint)' : sel.event ? '#22d3ee' : 'var(--text-faint)' }}>
                  {sel.unlocked
                    ? `✓ Earned · Day ${sel.day}`
                    : sel.event
                      ? `⏳ Limited time · ends ${sel.eventEnds}`
                      : sel.day
                        ? `🔒 Locked · unlocks at Day ${sel.day}`
                        : '🔒 Secret · unlock condition hidden'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
    </section>
  )
}
