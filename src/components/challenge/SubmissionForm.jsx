import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, GitBranch, Link2 } from 'lucide-react'

const GIT_RE = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/
const LI_RE = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/

const FIELDS = [
  { key: 'github', label: 'GitHub Repository', Icon: GitBranch, hold: 'https://github.com/you/repo', re: GIT_RE, validMsg: 'Valid GitHub URL', invalidMsg: 'Enter a valid GitHub repository URL.' },
  { key: 'linkedin', label: 'LinkedIn Post', Icon: Link2, hold: 'https://www.linkedin.com/in/you', re: LI_RE, validMsg: 'Valid LinkedIn URL', invalidMsg: 'Enter a valid LinkedIn post URL.' },
]

export default function SubmissionForm({ urls, onChange, missing, valid, onConfirm }) {
  const [touched, setTouched] = useState({ github: false, linkedin: false })

  const statusOf = (f) => {
    if (!urls[f.key]) return touched[f.key] ? 'warn' : 'idle'
    if (f.re.test(urls[f.key])) return 'ok'
    return touched[f.key] ? 'warn' : 'idle'
  }

  const messageOf = (f) => {
    if (!urls[f.key]) return touched[f.key] ? f.invalidMsg : ''
    if (f.re.test(urls[f.key])) return f.validMsg
    return touched[f.key] ? f.invalidMsg : 'Paste the full link to validate.'
  }

  const hint = () => {
    if (missing > 0)
      return `Complete your success criteria first — ${missing} ${missing === 1 ? 'check' : 'checks'} left.`
    const bad = FIELDS.find((f) => !f.re.test(urls[f.key] || ''))
    if (bad) return `Enter a valid ${bad.label} URL before submitting.`
    return null
  }

  const trySubmit = () => {
    setTouched({ github: true, linkedin: true })
    if (missing === 0 && FIELDS.every((f) => f.re.test(urls[f.key] || ''))) onConfirm()
  }

  return (
    <div className="cd-card">
      <div className="cd-form-title">SUBMIT YOUR PROOF</div>

      {FIELDS.map((f) => {
        const s = statusOf(f)
        return (
          <div className="cd-field" key={f.key}>
            <label htmlFor={`cd-${f.key}`}>{f.label}</label>
            <div className={`cd-input-wrap ${s}`}>
              <f.Icon size={16} className="cd-input-ic" />
              <input
                id={`cd-${f.key}`}
                type="url"
                inputMode="url"
                autoCapitalize="none"
                spellCheck="false"
                placeholder={f.hold}
                value={urls[f.key]}
                onChange={(e) => onChange({ ...urls, [f.key]: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                aria-label={f.label}
              />
              {s === 'ok' && <CheckCircle2 size={17} className="cd-input-ok" />}
              {s === 'warn' && <AlertCircle size={17} className="cd-input-warn" />}
            </div>
            <div className={`cd-input-hint ${s}`} role="status">
              {messageOf(f)}
            </div>
          </div>
        )
      })}

      {hint() && (
        <div className="cd-sub-hint" role="status">
          ⚠ {hint()}
        </div>
      )}

      <motion.button
        className={`cd-submit ${missing === 0 && valid ? 'live' : ''}`}
        whileTap={{ scale: 0.97 }}
        onClick={trySubmit}
      >
        Submit Challenge
      </motion.button>
    </div>
  )
}