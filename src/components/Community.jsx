import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Medal, Trophy } from 'lucide-react'
import { LEADERBOARD } from '../data/mockData'

export default function Community({ c, rank }) {
  const [filter, setFilter] = useState('default')
  const [country, setCountry] = useState('India')

  const countries = [...new Set(LEADERBOARD.map((p) => p.country))]

  const byXp = [...LEADERBOARD].sort((a, b) => b.xp - a.xp)
  const byAch = [...LEADERBOARD].sort((a, b) => b.achievements - a.achievements)

  let rows, sub
  if (filter === 'country') {
    const pool = LEADERBOARD.filter((p) => p.country === country).sort((a, b) => b.xp - a.xp)
    rows = pool
    sub = `${country} · ${pool.length} students`
  } else if (filter === 'achievements') {
    rows = byAch.slice(0, 10)
    sub = 'Top 10 by achievements'
  } else {
    rows = byXp.slice(0, 10)
    sub = 'Top 10 by XP'
  }

  const me = LEADERBOARD.find((p) => p.me)
  const meVisible = rows.some((p) => p.me)
  const meRank = (filter === 'achievements' ? byAch : byXp).indexOf(me) + 1
  return (
    <section className="card">
      <div className="section-label">
        <Users size={13} /> Community · tonight
      </div>

      <div className="live-row">
        <span className="live-dot" />
        <span style={{ fontSize: 13 }}>
          <b style={{ color: 'var(--text)' }}>{c.codingTonight.toLocaleString('en-IN')}</b> students are
          coding tonight
        </span>
      </div>

      <div className="rank-box">
        <div className="rank-num">#{rank ?? '—'}</div>
        <div className="rank-info">
          <div className="t">{rank ? 'Leaderboard rank' : 'Climb to your first rank'}</div>
          <div className="s">
            {rank ? (
              <>Top {Math.round((rank / c.totalParticipants) * 100)}% of {c.totalParticipants.toLocaleString('en-IN')} students</>
            ) : (
              'Finish Day 1 to enter the leaderboard'
            )}
          </div>
        </div>
        {rank && <span className="rank-trend">↑ 3 this week</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 6px', fontSize: 12, color: 'var(--text-faint)', fontWeight: 600 }}>
        <Trophy size={13} color="#22d3ee" /> Friends' recent activity
      </div>
      {c.friends.map((f) => (
        <div className="friend-row" key={f.name}>
          <div className="friend-av" style={{ background: `linear-gradient(135deg, ${f.color}33, transparent)` }}>
            {f.avatar}
          </div>
          <div className="friend-mid">
            <div className="friend-name">{f.name}</div>
            <div className="friend-status">{f.status}</div>
          </div>
          <span className="friend-time">{f.time}</span>
        </div>
      ))}

      <motion.div
        style={{
          marginTop: 12,
          padding: '12px 14px',
          borderRadius: 14,
          background: 'rgba(34,211,238,0.07)',
          border: '1px dashed rgba(34,211,238,0.35)',
          fontSize: 12.5,
          color: 'var(--text-dim)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Medal size={16} style={{ color: '#22d3ee', flexShrink: 0 }} />
        <span>
          <b style={{ color: '#22d3ee' }}>{c.weeklyChallenge.title}</b> weekly challenge ·{' '}
          {c.weeklyChallenge.submissions.toLocaleString('en-IN')} joined · ends in {c.weeklyChallenge.endsIn}
        </span>
      </motion.div>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '14px 0 2px', fontSize: 13, color: 'var(--text)', fontWeight: 700 }}
      >
        <Trophy size={14} color="#22d3ee" /> Leaderboard
      </div>

      <div className="lb-tabs">
        <button className={`lb-tab ${filter === 'default' ? 'active' : ''}`} onClick={() => setFilter('default')}>
          Default <small>Top 10</small>
        </button>
        <button className={`lb-tab ${filter === 'country' ? 'active' : ''}`} onClick={() => setFilter('country')}>
          By country
        </button>
        <button className={`lb-tab ${filter === 'achievements' ? 'active' : ''}`} onClick={() => setFilter('achievements')}>
          By achievements
        </button>
      </div>

      {filter === 'country' && (
        <div className="lb-countries">
          {countries.map((c2) => (
            <button
              key={c2}
              className={`lb-chip ${country === c2 ? 'active' : ''}`}
              onClick={() => setCountry(c2)}
            >
              {LEADERBOARD.find((p) => p.country === c2).flag} {c2}
            </button>
          ))}
        </div>
      )}

      <div style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 600, margin: '6px 0 8px' }}>
        {sub}
      </div>

      {rows.map((p, i) => (
        <motion.div
          key={p.name}
          className={`lb-row ${p.me ? 'me' : ''}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <span className="lb-rank">
            {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
          </span>
          <span className="lb-av">{p.avatar}</span>
          <div className="lb-mid">
            <div className="lb-name">
              {p.name} <span className="lb-flag">{p.flag}</span>
              {p.me && <span className="lb-me-badge">you</span>}
            </div>
            <div className="lb-sub">{p.project}</div>
          </div>
          <span className={`lb-metric ${filter === 'achievements' ? 'badges' : ''}`}>
            {filter === 'achievements' ? `${p.achievements} 🏆` : `${p.xp.toLocaleString('en-IN')} XP`}
          </span>
        </motion.div>
      ))}

      {!meVisible && me && (
        <motion.div
          className="lb-row me"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="lb-rank">#{meRank}</span>
          <span className="lb-av">{me.avatar}</span>
          <div className="lb-mid">
            <div className="lb-name">
              {me.name} <span className="lb-flag">{me.flag}</span>
              <span className="lb-me-badge">you</span>
            </div>
            <div className="lb-sub">{me.project}</div>
          </div>
          <span className={`lb-metric ${filter === 'achievements' ? 'badges' : ''}`}>
            {filter === 'achievements' ? `${me.achievements} 🏆` : `${me.xp.toLocaleString('en-IN')} XP`}
          </span>
        </motion.div>
      )}
    </section>
  )
}