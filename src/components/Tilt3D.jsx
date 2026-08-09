import { useCallback, useEffect, useRef, useState } from 'react'

export default function Tilt3D({ children, max = 7 }) {
  const ref = useRef(null)
  const canHover = useRef(true)
  const [state, setState] = useState(null)

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover)').matches
  }, [])

  const onMove = useCallback(
    (e) => {
      const el = ref.current
      if (!canHover.current || !el) return
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = ((0.5 - py) * max).toFixed(2)
      const ry = ((px - 0.5) * max).toFixed(2)
      setState({
        vars: {
          '--rx': `${rx}deg`,
          '--ry': `${ry}deg`,
          '--mx': `${(px * 100).toFixed(1)}%`,
          '--my': `${(py * 100).toFixed(1)}%`,
        },
      })
    },
    [max]
  )

  const onLeave = useCallback(() => setState(null), [])

  return (
    <div
      ref={ref}
      className={`tilt3d ${state ? 'tilting' : ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...(state?.vars ?? {}),
        transform: state
          ? 'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-4px)'
          : 'perspective(900px) translateZ(0)',
        boxShadow: state
          ? '0 30px 60px -25px rgba(0, 0, 0, 0.85), 0 0 44px -12px rgba(139, 92, 246, 0.5)'
          : 'none',
      }}
    >
      {children}
    </div>
  )
}
