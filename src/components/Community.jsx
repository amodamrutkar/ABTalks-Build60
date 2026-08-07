import { motion } from 'framer-motion'
import { Users, Medal, Trophy } from 'lucide-react'

export default function Community({ c, rank }) {
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
        <Trophy size={13} color="#ffcf5c" /> Friends' recent activity
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
          background: 'rgba(255,207,92,0.07)',
          border: '1px dashed rgba(255,207,92,0.35)',
          fontSize: 12.5,
          color: 'var(--text-dim)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Medal size={16} style={{ color: '#ffcf5c', flexShrink: 0 }} />
        <span>
          <b style={{ color: '#ffcf5c' }}>{c.weeklyChallenge.title}</b> weekly challenge ·{' '}
          {c.weeklyChallenge.submissions.toLocaleString('en-IN')} joined · ends in {c.weeklyChallenge.endsIn}
        </span>
      </motion.div>
    </section>
  )
}