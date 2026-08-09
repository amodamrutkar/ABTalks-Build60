import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, X, ArrowUp } from 'lucide-react'

export default function ResourcesSection({ resources, tone }) {
  const [open, setOpen] = useState(null)

  return (
    <>
      <div className="cd-resources">
        {resources.map((r, i) => (
          <motion.button
            key={r.title}
            className="cd-res"
            onClick={() => setOpen(i)}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <span className="cd-res-ic">{r.icon}</span>
            <span className="cd-res-t">
              <b>{r.title}</b>
              <small>{r.sub}</small>
            </span>
            <ChevronRight size={17} className="cd-res-arrow" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && resources[open] && (
          <>
            <motion.div
              className="chal-pop-mask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(null)}
            />
            <motion.div
              className="cd-res-pop"
              role="dialog"
              aria-modal="true"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <button className="cd-pop-close" onClick={() => setOpen(null)} aria-label="Close">
                <X size={17} />
              </button>
              <div className="cd-res-pop-ic">{resources[open].icon}</div>
              <div className="cd-res-pop-t">{resources[open].title}</div>
              <p className="cd-res-pop-b">{resources[open].body}</p>
              {resources[open].url && (
                <a
                  className="cd-res-pop-open"
                  href={resources[open].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open resource <ChevronRight size={16} />
                </a>
              )}
              <button className="cd-res-pop-cancel" onClick={() => setOpen(null)}>
                <ArrowUp size={14} /> Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}