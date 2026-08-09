import { motion } from 'framer-motion'

const REVIEWS = [
  { name: 'Aarav', place: 'VIT Pune', q: 'Day 20 was when I realized I wasn’t relying on motivation anymore.', c: '#22d3ee' },
  { name: 'Meera', place: 'SPPU Pune', q: 'Seeing progress on the dashboard is what kept me shipping.', c: '#a855f7' },
  { name: 'Yuki', place: 'Delhi University', q: 'Losing my first streak hurt. Earning it back felt better than winning.', c: '#6366f1' },
  { name: 'Riya', place: 'KIIT', q: 'I came for the badges. I stayed for the 60 days of proof.', c: '#f43f5e' },
  { name: 'Arjun', place: 'BITS Pilani', q: 'Sixty days of work, every single one on public record.', c: '#fbbf24' },
]

export default function ReviewsSection() {
  return (
    <section className="rvw-sec">
      <div className="sec-head">
        <span className="sec-eyebrow">STUDENT VOICES</span>
        <h2 className="sec-title">They showed up. So can you.</h2>
        <p className="sec-sub">Sample voices — for demo purposes.</p>
      </div>

      <div className="rvw-list">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name}
            className="rvw"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
          >
            <figcaption className="rvw-who">
              <span
                className="rvw-av"
                style={{
                  background: `linear-gradient(135deg, ${r.c}33, transparent)`,
                  borderColor: `${r.c}55`,
                }}
              >
                {r.name[0]}
              </span>
              <span>
                <b>{r.name}</b>
                <span className="rvw-pl">{r.place}</span>
              </span>
            </figcaption>
            <div className="rvw-stars" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
            <blockquote className="rvw-q">“{r.q}”</blockquote>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}