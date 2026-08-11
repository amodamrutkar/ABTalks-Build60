import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const REVIEWS = [
  { name: 'Aarav Mehta', rating: 5, position: 'Full-Stack Developer', country: 'India', review: 'Shipping something every day helped me stop overthinking and actually build consistently.', c: '#22d3ee' },
  { name: 'Meera Kulkarni', rating: 5, position: 'CS Student', country: 'India', review: 'Seeing progress on the dashboard is what kept me shipping even on the days I wanted to quit.', c: '#a855f7' },
  { name: 'Yuki Tanaka', rating: 5, position: 'Frontend Developer', country: 'Japan', review: 'Losing my first streak hurt. Earning it back felt better than winning any hackathon.', c: '#6366f1' },
  { name: 'Riya Sharma', rating: 5, position: 'Product Designer', country: 'India', review: 'I came for the badges. I stayed for the 60 days of public proof I can now show anywhere.', c: '#a78bfa' },
  { name: 'Arjun Nair', rating: 5, position: 'Backend Engineer', country: 'India', review: 'Sixty days of work, every single one on public record. That kind of proof opens doors.', c: '#fbbf24' },
  { name: 'Sofia Reyes', rating: 5, position: 'Mobile Developer', country: 'Philippines', review: 'The daily commit ritual turned chaos into a habit. I finally stopped starting over every week.', c: '#22d3ee' },
]

const SWIPE_THRESHOLD = 40

export default function ReviewsSection() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [touchX, setTouchX] = useState(null)

  const go = useCallback((d) => {
    setDir(d)
    setIdx((i) => (i + d + REVIEWS.length) % REVIEWS.length)
  }, [])

  const onTouchStart = (e) => setTouchX(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchX === null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1)
    setTouchX(null)
  }

  const r = REVIEWS[idx]

  return (
    <section className="rvw-sec">
      <div className="sec-head">
        <span className="sec-eyebrow">STUDENT VOICES</span>
        <h2 className="sec-title">They showed up. So can you.</h2>
      </div>

      <div className="rvw-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button className="rvw-nav prev" onClick={() => go(-1)} aria-label="Previous review">
          <ChevronLeft size={18} />
        </button>

        <div className="rvw-viewport">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={idx}
              className="rvw"
              style={{ '--rc': r.c }}
              custom={dir}
              initial={{ opacity: 0, x: 36 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 * dir }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <figcaption className="rvw-who">
                <span>
                  <b>{r.name}</b>
                  <span className="rvw-pl">
                    {r.position} · {r.country}
                  </span>
                </span>
              </figcaption>
              <div className="rvw-stars" aria-label={`${r.rating} out of 5 stars`}>
                {'★'.repeat(r.rating)}
              </div>
              <blockquote className="rvw-q">“{r.review}”</blockquote>
            </motion.figure>
          </AnimatePresence>
        </div>

        <button className="rvw-nav next" onClick={() => go(1)} aria-label="Next review">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="rvw-dots">
        {REVIEWS.map((_, i) => (
          <span key={i} className={`rvw-dot ${i === idx ? 'on' : ''}`} />
        ))}
      </div>
    </section>
  )
}
