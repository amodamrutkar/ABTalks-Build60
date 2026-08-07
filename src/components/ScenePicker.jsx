import { SCENES } from '../data/mockData'

export default function ScenePicker({ current, onChange }) {
  return (
    <div className="scene-picker" style={{ marginBottom: 2 }}>
      <span
        style={{
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-faint)',
          alignSelf: 'center',
          paddingRight: 2,
        }}
      >
        Demo
      </span>
      {Object.entries(SCENES).map(([key, s]) => (
        <button
          key={key}
          className={current === key ? 'active' : ''}
          onClick={() => onChange(key)}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}