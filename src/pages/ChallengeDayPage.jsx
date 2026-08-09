import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ChallengeHeader from '../components/challenge/ChallengeHeader'
import ChallengeHero from '../components/challenge/ChallengeHero'
import ChallengeStatus from '../components/challenge/ChallengeStatus'
import RequirementChecklist from '../components/challenge/RequirementChecklist'
import SuccessCriteria from '../components/challenge/SuccessCriteria'
import ResourcesSection from '../components/challenge/ResourceCard'
import TodayTip from '../components/challenge/TodayTip'
import BuildProgress from '../components/challenge/BuildProgress'
import SubmissionForm from '../components/challenge/SubmissionForm'
import VerifyOverlay from '../components/challenge/VerifyOverlay'
import CompletionState from '../components/challenge/CompletionState'
import NextDayCard from '../components/challenge/NextDayCard'
import { getChallenge } from '../data/challengeDays'
import { loadDayProgress, saveDayProgress } from '../utils/challengeStorage'

const GIT_RE = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/
const LI_RE = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/

const SECTIONS = [
  { id: 'challenge', label: 'CHALLENGE' },
  { id: 'requirements', label: 'REQUIREMENTS' },
  { id: 'criteria', label: 'SUCCESS CRITERIA' },
  { id: 'resources', label: 'RESOURCES' },
  { id: 'progress', label: 'YOUR PROGRESS' },
  { id: 'submit', label: 'SUBMIT' },
  { id: 'complete', label: 'COMPLETE' },
]

export default function ChallengeDayPage() {
  const navigate = useNavigate()
  const day = 12
  const c = getChallenge(day)

  const [req, setReq] = useState(() => {
    const s = loadDayProgress(day)
    return s?.req ? [...s.req] : Array(c.requirements.length).fill(false)
  })
  const [crit, setCrit] = useState(() => {
    const s = loadDayProgress(day)
    return s?.crit ? [...s.crit] : Array(c.criteria.length).fill(false)
  })
  const [urls, setUrls] = useState(() => loadDayProgress(day)?.urls ?? { github: '', linkedin: '' })
  const [submitted, setSubmitted] = useState(() => loadDayProgress(day)?.submitted ?? false)
  const [verifying, setVerifying] = useState(false)
  const [shake, setShake] = useState(null)
  const [activeId, setActiveId] = useState('challenge')

  const reqDone = req.filter(Boolean).length
  const critDone = crit.filter(Boolean).length
  const missing = c.criteria.length - critDone
  const allValid = GIT_RE.test(urls.github) && LI_RE.test(urls.linkedin)

  const progress = {
    reqDone,
    reqTotal: c.requirements.length,
    critDone,
    critTotal: c.criteria.length,
    submitted,
  }

  useEffect(() => {
    saveDayProgress(day, { req, crit, urls, submitted })
  }, [day, req, crit, urls, submitted])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sectionRefs = useRef({})
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.dataset.sec)
        })
      },
      { rootMargin: '-25% 0px -60% 0px' }
    )
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const toggleReq = useCallback((i) => {
    setReq((r) => {
      const next = [...r]
      next[i] = !next[i]
      return next
    })
  }, [])

  const toggleCrit = useCallback((i) => {
    setCrit((r) => {
      const next = [...r]
      next[i] = !next[i]
      return next
    })
  }, [])

  const confirmSubmit = useCallback(() => {
    setVerifying(true)
  }, [])

  const finishVerify = useCallback(() => {
    setVerifying(false)
    setSubmitted(true)
  }, [])

  const secState = useCallback(
    (id) => {
      if (id === 'challenge' || id === 'resources' || id === 'progress') return null
      if (id === 'requirements') return req.every(Boolean) ? 'done' : 'open'
      if (id === 'criteria') return crit.every(Boolean) ? 'done' : 'open'
      if (id === 'submit') return submitted ? 'done' : 'open'
      return submitted ? 'done' : 'future'
    },
    [req, crit, submitted]
  )

  const stepIndex = submitted
    ? c.steps.length - 1
    : critDone === c.criteria.length
      ? c.steps.length - 2
      : reqDone === c.requirements.length
        ? Math.min(c.steps.length - 3, 2)
        : reqDone > 0
          ? 1
          : 0

  const onBack = () => navigate('/dashboard')

  return (
    <div className="shell chal">
      <ChallengeHeader
        day={day}
        streak={day}
        active={submitted}
        onBack={onBack}
        progress={progress}
      />

      <div className="cd-track">
        {SECTIONS.map((s) => (
          <section
            key={s.id}
            className={`cd-sec ${secState(s.id) ? `st-${secState(s.id)}` : ''}`}
            data-sec={s.id}
            ref={(el) => (sectionRefs.current[s.id] = el)}
          >
            <div className={`cd-node ${activeId === s.id ? 'active' : ''}`}>
              {secState(s.id) === 'done' ? (
                <span className="cd-node-done">✓</span>
              ) : (
                <span className="cd-node-dot" />
              )}
            </div>
            <div className="cd-label">{s.label}</div>

            {s.id === 'challenge' && (
              <div className="cd-content">
                <ChallengeHero c={c} />
                <ChallengeStatus c={c} submitted={submitted} />
              </div>
            )}

            {s.id === 'requirements' && (
              <div className="cd-content">
                <RequirementChecklist items={c.requirements} done={req} onToggle={toggleReq} />
              </div>
            )}

            {s.id === 'criteria' && (
              <div className="cd-content">
                <SuccessCriteria items={c.criteria} done={crit} onToggle={toggleCrit} />
              </div>
            )}

            {s.id === 'resources' && (
              <div className="cd-content">
                <ResourcesSection resources={c.resources} />
              </div>
            )}

            {s.id === 'progress' && (
              <div className="cd-content">
                <TodayTip tip={c.tip} />
                <BuildProgress steps={c.steps} currentIndex={stepIndex} />
              </div>
            )}

            {s.id === 'submit' && !submitted && (
              <div className="cd-content">
                <motion.div
                  key={shake ?? 'idle'}
                  className="cd-shake"
                  initial={{ x: 0 }}
                  animate={shake ? { x: [0, -7, 7, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <SubmissionForm
                    urls={urls}
                    onChange={setUrls}
                    missing={missing}
                    valid={allValid}
                    onConfirm={confirmSubmit}
                  />
                </motion.div>
              </div>
            )}

            {s.id === 'submit' && submitted && (
              <div className="cd-content">
                <div className="cd-card cd-shipped">
                  <span className="cd-shipped-ic">🚀</span>
                  <span className="cd-shipped-t">Challenge shipped</span>
                  <span className="cd-shipped-s">
                    {urls.github} · {urls.linkedin}
                  </span>
                </div>
              </div>
            )}

            {s.id === 'complete' && submitted && (
              <div className="cd-content">
                <CompletionState day={day} />
                <NextDayCard day={day} onDashboard={onBack} />
              </div>
            )}
          </section>
        ))}
      </div>

      {!submitted && (
        <div className="cd-foot">
          <button className="hero-btn ghost cta" onClick={onBack}>
            ← Back to Dashboard
          </button>
        </div>
      )}

      <VerifyOverlay open={verifying} onDone={finishVerify} />
    </div>
  )
}