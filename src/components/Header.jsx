import { Bell, CalendarDays } from 'lucide-react'

export default function Header({ user, quote }) {
  return (
    <header>
      <div className="header">
        <div className="avatar-wrap">
          <div className="avatar" style={{ background: user.avatarGradient }}>
            {user.avatarEmoji}
          </div>
          <div>
            <div className="greet-name">Welcome back, {user.name.split(' ')[0]} 👋</div>
            <div className="greet-handle">{user.handle} · {user.college.split(' · ')[0]}</div>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-btn" aria-label="Challenge calendar">
            <CalendarDays size={19} strokeWidth={2} />
          </button>
          <button className="icon-btn" aria-label="Notifications">
            <Bell size={19} strokeWidth={2} />
            <span className="dot" />
          </button>
        </div>
      </div>
      <p className="quote">
        ✨ &nbsp;<strong>{quote.split('.')[0]}.</strong>{quote.split('.').slice(1).join('.').trim() && <> {quote.split('.').slice(1).join('.').trim()}.</>}
      </p>
    </header>
  )
}