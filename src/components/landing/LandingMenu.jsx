import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, LayoutDashboard, ListChecks, Award, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme'

const ITEMS = [
  { id: 'home', label: 'Home', Icon: Home, to: '/' },
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard, to: '/dashboard' },
  { id: 'challenges', label: 'Challenges', Icon: ListChecks, to: '/challenge' },
  { id: 'achievements', label: 'Achievements', Icon: Award, to: '/achievements' },
]

export default function LandingMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (to) => {
    setOpen(false)
    if (to) navigate(to)
  }

  return (
    <>
      <button
        className="land-nav-btn"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="menu-mask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            >
              <div className="menu-head">
                <div className="menu-brand">
                  ABTALKS&nbsp;·&nbsp;60
                  <span>60-day build challenge</span>
                </div>
                <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={19} />
                </button>
              </div>

              <nav className="menu-items">
                {ITEMS.map(({ id, label, Icon, to, soon }) => (
                  <button
                    key={id}
                    className={`menu-item ${soon ? 'soon' : ''}`}
                    onClick={() => go(to)}
                    disabled={soon}
                  >
                    <span className="menu-ic">
                      <Icon size={18} />
                    </span>
                    <span className="menu-label">{label}</span>
                    {soon && <span className="menu-soon">Coming soon</span>}
                  </button>
                ))}
              </nav>

              <div className="menu-theme">
                <div className="menu-theme-label">
                  <span className="menu-ic">
                    {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                  </span>
                  THEME
                </div>
                <div className="theme-pills">
                  <button
                    className={theme === 'dark' ? 'active' : ''}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon size={13} /> Dark
                  </button>
                  <button
                    className={theme === 'light' ? 'active' : ''}
                    onClick={() => setTheme('light')}
                  >
                    <Sun size={13} /> Light
                  </button>
                </div>
              </div>

              <div className="menu-foot">Build. Commit. Go.</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}