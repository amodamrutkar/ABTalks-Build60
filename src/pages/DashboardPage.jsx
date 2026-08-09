import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ScenePicker from '../components/ScenePicker'
import StreakCard from '../components/StreakCard'
import Reminder from '../components/Reminder'
import TodayTask from '../components/TodayTask'
import OverallProgress from '../components/OverallProgress'
import Calendar from '../components/Calendar'
import XpCard from '../components/XpCard'
import Badges from '../components/Badges'
import Portfolio from '../components/Portfolio'
import Community from '../components/Community'
import BottomNav from '../components/BottomNav'
import DaySheet from '../components/DaySheet'
import Tilt3D from '../components/Tilt3D'
import AchievementsPage from '../components/AchievementsPage'
import { SCENES, QUOTES, COMMUNITY } from '../data/mockData'

export default function DashboardPage({ initialPage = 'dashboard' }) {
  const [page, setPage] = useState(initialPage)
  const [sceneKey, setSceneKey] = useState('day-12')
  const [scene, setScene] = useState(SCENES['day-12'])
  const [sheetDay, setSheetDay] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [toast, setToast] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  const pullY = useRef(0)
  const touchStart = useRef(0)
  const [pull, setPull] = useState(0)

  const switchScene = useCallback((key) => {
    setSceneKey(key)
    setScene(SCENES[key])
    setToast(null)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

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

  const onPageChange = (id) => {
    setPage(id === 'challenges' ? 'dashboard' : id)
    if (id === 'challenges') navigate('/challenge')
    else if (id === 'home') navigate('/')
    else if (id === 'achievements') navigate('/achievements')
    else navigate('/dashboard')
  }

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
        {page === 'achievements' ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <AchievementsPage />
          </motion.div>
        ) : (
        <>
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
          <Tilt3D>
            <StreakCard s={scene.streak} day={scene.today.day} />
          </Tilt3D>
        </motion.div>

        <Tilt3D>
          <Reminder r={scene.reminder} s={scene.streak} />
        </Tilt3D>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Tilt3D>
            <TodayTask task={scene.today} streak={scene.streak} {...handlers} />
          </Tilt3D>
          <Tilt3D>
            <OverallProgress completed={scene.streak.current} total={60} today={scene.today.day} />
          </Tilt3D>
        </div>

        <Tilt3D>
          <Calendar days={scene.calendar} onOpen={handlers.onSheetOpen} today={scene.today.day} />
        </Tilt3D>

        <Tilt3D>
          <XpCard xp={scene.xp} s={scene.streak} streak={scene.streak} />
        </Tilt3D>

        <div className="dashboard-grid" style={{ display: 'grid', gap: 16 }}>
          <Tilt3D>
            <Badges />
          </Tilt3D>
          <Tilt3D>
            <Portfolio p={scene.portfolio} />
          </Tilt3D>
        </div>

        <Tilt3D>
          <Community c={COMMUNITY} rank={scene.streak.firstDay ? null : COMMUNITY_RANK} />
        </Tilt3D>

        <motion.p
          style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-faint)', paddingTop: 4 }}
        >
          ABTalks 60 · {scene.completedDays}/60 days shipped
        </motion.p>
        </>
        )}
      </div>

      <BottomNav active={page} onChange={onPageChange} />

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