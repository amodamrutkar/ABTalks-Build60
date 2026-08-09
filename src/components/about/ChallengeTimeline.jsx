import { motion } from 'framer-motion'

const SECTIONS = [
  {
    icon: '🌱',
    title: 'About',
    text: 'Ship something every day for 60 days — a small build, a commit, a post. No gaps, no excuses. Just visible progress.',
    chip: '60 days · public · free',
  },
  {
    icon: '🔄',
    title: 'Workflow',
    text: 'Open the day’s task, build it, commit it publicly, post it, and mark it done to bank your XP for the day.',
    chip: 'build → commit → post',
  },
  {
    icon: '🧱',
    title: 'Consistency',
    text: 'Daily effort compounds. What looks tiny on day 4 becomes undeniable by day 40 — but only if you show up today.',
    chip: '“small wins, daily”',
  },
  {
    icon: '🔥',
    title: 'Streak',
    text: 'Every shipped day extends your streak. Milestones glow, the heat turns up, and momentum becomes the fuel.',
    chip: 'streak +1 every day',
  },
  {
    icon: '💔',
    title: 'Streak loss',
    text: 'Miss a day and the streak resets. Come back anyway — a comeback bonus softens the landing and rebuilds momentum.',
    chip: 'comeback bonus +25 XP',
  },
  {
    icon: '🏅',
    title: 'Achievements',
    text: 'Badges from Rare to Mythic unlock across the journey — some public milestones, some secret ones.',
    chip: 'new rarity tiers',
  },
  {
    icon: '👥',
    title: 'Friends',
    text: 'See what friends shipped, compare streaks and leaderboard ranks. A little friendly pressure keeps everyone honest.',
    chip: 'feed · ranks · countries',
  },
  {
    icon: '📊',
    title: 'Progress',
    text: 'A contribution calendar, XP, level, portfolio strength and recruiter readiness — live on your dashboard.',
    chip: 'tracked automatically',
  },
  {
    icon: '🏁',
    title: 'Final day',
    text: 'Day 60 is the finish line: 60 days of public proof that consistency beats intensity.',
    chip: 'the one thing to finish',
  },
]

export default function ChallengeTimeline() {
  return (
    <div className="tl">
      <div className="tl-line" />
      {SECTIONS.map((s, i) => (
        <motion.div
          key={s.title}
          className="tl-item"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="tl-node">
            <span className="tl-dot">{s.icon}</span>
          </span>
          <div className="tl-card">
            <div className="tl-title">{s.title}</div>
            <p className="tl-text">{s.text}</p>
            <span className="tl-chip">{s.chip}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}