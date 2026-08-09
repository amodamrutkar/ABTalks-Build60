import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const STEPS = [
  { label: 'GitHub → verified', icon: '🖥' },
  { label: 'LinkedIn → verified', icon: '📄' },
  { label: 'Challenge → marked shipped', icon: '🎯' },
]

export default function VerifyOverlay({ open, onDone }) {
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (!open) {
      setStep(-1)
      return
    }
    const t = setInterval(
      (() => {
        let i = -1
        return () => {
          i += 1
          setStep(i)
          if (i >= STEPS.length) {
            clearInterval(t)
            setTimeout(onDone, 500)
          }
        }
      })(),
      620
    )
    return () => clearInterval(t)
  }, [open, onDone])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cd-verify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="cd-verify-card"
            initial={{ scale: 0.92, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            role="status"
            aria-live="polite"
          >
            <div className="cd-verify-title">VERIFYING</div>
            <div className="cd-verify-steps">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`cd-verify-step ${i < step ? 'done' : ''} ${i === step ? 'now' : ''}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="cd-verify-ic">
                    {i < step ? <CheckCircle2 size={17} /> : <span className="cd-verify-spin" />}
                  </span>
                  {s.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}