import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import ScenePicker from './components/ScenePicker'
import StreakCard from './components/StreakCard'
import Reminder from './components/Reminder'
import TodayTask from './components/TodayTask'
import OverallProgress from './components/OverallProgress'
import Calendar from './components/Calendar'
import XpCard from './components/XpCard'
import Badges from './components/Badges'
import Portfolio from './components/Portfolio'
import Community from './components/Community'
import BottomNav from './components/BottomNav'
import DaySheet from './components/DaySheet'
import { SCENES, QUOTES, COMMUNITY } from './data/mockData'

export default function App() {
  const [sceneKey, setSceneKey] = useState('day-12')
  const [scene, setScene] = useState(SCENES['day-12'])
  const [sheetDay, setSheetDay] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [toast, setToast] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const pullY = useRef(0)
  const touchStart = useRef(0)
  const [pull, setPull] = useState(0)

  const switchScene = useCallback((key) => {
    setSceneKey(key)
    setScene(SCENES[key])
    setToast(null)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 350)
    return () => clearTimeout(t)
  }, [])

  const showToast = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1)
    showToast('Everything is up to date ✨')
  }, [showToast])

  const handlers = {
    onSheetOpen: setSheetDay,
    onRefresh,
    onToast: showToast,
  }

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientY
    pullY.current = 0
  }
  const onTouchMove = (e) => {
    if (window.scrollY <= 0) {
      const dy = e.touches[0].clientY - touchStart.current
      if (dy > 0 && dy < 140) {
        pullY.current = dy
        setPull(Math.min(1, dy / 90))
      }
    }
  }
  const onTouchEnd = () => {
    if (pullY.current >= 90) onRefresh()
    pullY.current = 0
    setPull(0)
  }

  const quote = QUOTES[scene.xp.level % QUOTES.length]

  return (
    <div className="shell">
      <motion.div
        className="pull-spinner"
        animate={{ opacity: pull > 0 ? 1 : 0, rotate: pull * 360 }}
      >
        🔥
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="page"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        key={refreshKey}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 14 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Header user={scene.user} quote={quote} />
        </motion.div>

        <ScenePicker current={sceneKey} onChange={switchScene} />

        <motion.div
          key={sceneKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <StreakCard s={scene.streak} day={scene.today.day} />
        </motion.div>

        <Reminder r={scene.reminder} s={scene.streak} />

        <div className="dashboard-grid" style={{ display: 'grid', gap: 16 }}>
          <TodayTask task={scene.today} streak={scene.streak} {...handlers} />
          <OverallProgress completed={scene.completedDays} total={60} today={scene.today.day} />
        </div>

        <Calendar days={scene.calendar} onOpen={handlers.onSheetOpen} />

        <XpCard xp={scene.xp} s={scene.streak} streak={scene.streak} />

        <div className="dashboard-grid" style={{ display: 'grid', gap: 16 }}>
          <Badges />
          <Portfolio p={scene.portfolio} />
        </div>

        <Community c={COMMUNITY} rank={scene.streak.firstDay ? null : COMMUNITY_RANK} />

        <motion.p
          style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-faint)', paddingTop: 4 }}
        >
          ABTalks 60 · {scene.completedDays}/60 days shipped
        </motion.p>
      </div>

      <BottomNav />

      <AnimatePresence>
        {sheetDay && (
          <>
            <motion.div
              className="sheet-mask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetDay(null)}
            />
            <DaySheet day={sheetDay} onClose={() => setSheetDay(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

const COMMUNITY_RANK = 142