import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import AboutChallengePage from './pages/AboutChallengePage'
import DashboardPage from './pages/DashboardPage'
import ChallengeDayPage from './pages/ChallengeDayPage'
import IntroAnimation from './components/landing/IntroAnimation'

let introShown = false

export default function App() {
  const navigate = useNavigate()
  const [intro, setIntro] = useState(() => {
    if (introShown) return false
    introShown = true
    return true
  })

  useEffect(() => {
    if (window.location.pathname !== '/') navigate('/', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AnimatePresence>{intro && <IntroAnimation onDone={() => setIntro(false)} />}</AnimatePresence>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutChallengePage />} />
        <Route path="/dashboard" element={<DashboardPage key="dash" />} />
        <Route path="/challenge" element={<ChallengeDayPage key="challenge" />} />
        <Route
          path="/achievements"
          element={<DashboardPage key="ach" initialPage="achievements" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}