import { motion } from 'framer-motion'

export default function TodayTip({ tip }) {
  return (
    <motion.div
      className="cd-tip"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
    >
      <span className="cd-tip-ic">💡</span>
      <div>
        <div className="cd-tip-t">TODAY'S TIP</div>
        <p>“{tip}”</p>
      </div>
    </motion.div>
  )
}