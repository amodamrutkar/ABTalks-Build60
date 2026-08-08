import { motion } from 'framer-motion'
import { Home, LayoutDashboard, ListChecks, Award } from 'lucide-react'

const ITEMS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'challenges', label: 'Challenges', Icon: ListChecks },
  { id: 'achievements', label: 'Achievements', Icon: Award },
]

export default function BottomNav({ active = 'dashboard', onChange }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        {ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-item ${active === id ? 'active' : ''}`}
            onClick={() => onChange?.(id)}
          >
            <motion.span className="svg" whileTap={{ scale: 0.85 }}>
              <Icon size={20} strokeWidth={active === id ? 2.4 : 2} />
              {id === 'challenges' && <span className="nav-dot" />}
            </motion.span>
            {label}
            {active === id && (
              <motion.span
                layoutId="nav-glow"
                style={{
                  position: 'absolute',
                  bottom: -5,
                  width: 22,
                  height: 3,
                  borderRadius: 99,
                  background: 'var(--grad-sun)',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}