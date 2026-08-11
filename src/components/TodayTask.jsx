import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Clock, Target, Layers, ArrowRight, CheckCheck } from 'lucide-react'

export default function TodayTask({ task, streak }) {
  const navigate = useNavigate()
  const done = task.status === 'submitted'

  return (
    <section className="card">
      <div className="section-label">
        <Target size={13} /> Today's challenge
      </div>
      <div className="task-head">
        <div style={{ minWidth: 0 }}>
          <div className="task-title">{task.title}</div>
          <div className="task-cat">{task.category}</div>
        </div>
        <span className="day-pill">Day {task.day}</span>
      </div>

      <div className="task-stats">
        <div className="task-stat">
          <span className="ic">🎯</span>
          <span className="v" style={{ color: task.difficultyColor }}>{task.difficulty}</span>
          <span className="k">Difficulty</span>
        </div>
        <div className="task-stat">
          <span className="ic">⏱️</span>
          <span className="v"><Clock size={12} />{task.time}</span>
          <span className="k">Est. time</span>
        </div>
        <div className="task-stat">
          <span className="ic">🧩</span>
          <span className="v"><Layers size={12} />{task.tech.join(' · ')}</span>
          <span className="k">Stack</span>
        </div>
      </div>

      <motion.button
        className={`task-btn ${done ? 'done' : ''}`}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/challenge')}
      >
        {done ? 'Day complete — nice work' : 'Continue challenge'}
        <span className="arrow">{done ? <CheckCheck size={17} /> : <ArrowRight size={17} />}</span>
      </motion.button>
    </section>
  )
}