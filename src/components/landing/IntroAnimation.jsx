import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function IntroAnimation({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="intro"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="intro-glow" />
      <motion.div
        className="intro-word"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        ABTALKS&nbsp;·&nbsp;60
      </motion.div>

      <div className="intro-linerow">
        <motion.span
          className="intro-day"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          Day 1
        </motion.span>
        <div className="intro-line">
          <motion.div
            className="intro-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.62, ease: 'easeInOut', delay: 0.16 }}
          />
        </div>
        <motion.span
          className="intro-day"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.55 }}
        >
          Day 60
        </motion.span>
      </div>

      <motion.div
        className="intro-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.82 }}
      >
        sixty days of shipping
      </motion.div>
    </motion.div>
  )
}