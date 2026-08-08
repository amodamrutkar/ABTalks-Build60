import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X, Sparkles } from 'lucide-react'
import { BADGES } from '../data/mockData'

const RARITY = {
  rare: { label: 'Rare', color: '#38bdf8' },
  epic: { label: 'Epic', color: '#a855f7' },
  legendary: { label: 'Legendary', color: '#fbbf24' },
  mythic: { label: 'Mythic', color: '#f43f5e' },
}
const RARITY_ORDER = { rare: 1, epic: 2, legendary: 3, mythic: 4 }

const sortByRarity = (arr) => [...arr].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])

export default function Badges() {
  const earned = sortByRarity(BADGES.filter((b) => b.unlocked))
  const locked = sortByRarity(BADGES.filter((b) => !b.unlocked))
  const [sel, setSel] = useState(null)
  const [justUnlocked, setJustUnlocked] = useState('streak-7')

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
      animate={justUnlocked === b.id ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.5 }}
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
        ) : (
          `Day ${b.day}`
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
            <Trophy size={13} /> Achievements
          </span>
          <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--text-dim)', fontWeight: 700 }}>
            {earned.length}/{BADGES.length}
          </span>
        </div>

        <div className="badge-group-label">Earned · {earned.length}</div>
        <div className="badge-grid">
          {earned.map((b) => (
            <BadgeCard key={b.id} b={b} />
          ))}
        </div>

        <div className="badge-group-label" style={{ marginTop: 16 }}>
          Locked · {locked.length}
        </div>
        <div className="badge-grid">
          {locked.map((b) => (
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
                      : `🔒 Locked · unlocks at Day ${sel.day}`}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {justUnlocked && !sel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <p
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: 'var(--text-dim)',
                  background: 'rgba(34,211,238,0.08)',
                  border: '1px solid rgba(34,211,238,0.3)',
                  borderRadius: 12,
                  padding: '10px 12px',
                }}
              >
                ✨ <b style={{ color: '#22d3ee' }}>Badge unlocked:</b> 7-Day Streak — one full week of shipping.
                The heat turns up at Day 15 🔥
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
