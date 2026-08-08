import { SCENES } from '../data/mockData'

export default function ScenePicker({ current, onChange }) {
  return (
    <div className="scene-picker" style={{ marginBottom: 2 }}>
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