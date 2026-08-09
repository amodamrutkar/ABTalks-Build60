export default function ChallengeStatus({ c, submitted }) {
  return (
    <div className="cd-card cd-status">
      <div className="cd-row">
        <span className="cd-row-k">🔥 Current streak</span>
        <span className="cd-row-v">Day {submitted ? c.day + 1 : c.day}</span>
      </div>
      <div className="cd-row">
        <span className="cd-row-k">Challenge</span>
        <span className="cd-row-v">
          {c.day} / 60
        </span>
      </div>
      <div className="cd-status-line">
        <span className={`cd-live ${submitted ? 'done' : ''}`} />
        <span className="cd-status-t">{submitted ? 'COMPLETED' : 'IN PROGRESS'}</span>
      </div>
    </div>
  )
}