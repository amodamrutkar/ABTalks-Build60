export const USER = {
  name: 'Siddhesh',
  fullName: 'Siddhesh Pawar',
  handle: '@siddhesh_dev',
  avatarEmoji: '😎',
  avatarGradient: 'linear-gradient(135deg, #FF8A4C, #FF5E6C)',
  location: 'Pune, India',
  college: 'VIT Pune · CS 3rd Year',
  joinedDay: 'Day 1',
}

export const QUOTES = [
  'You are one commit away from extending your streak.',
  'Future recruiters are watching the timeline you build tonight.',
  'Consistency compounds. Show up tired, finish strong.',
  '60 small ships later, you will not recognise yourself.',
  'Your future self is reading your GitHub commit history.',
]

export const MILESTONES = [3, 7, 15, 30, 45, 60]

export const TODAY_TASK = {
  day: 12,
  title: 'Build a Weather Dashboard',
  category: 'Frontend · API',
  difficulty: 'Medium',
  difficultyColor: '#FFB45C',
  time: '45 min',
  tech: ['React', 'REST API'],
  hint: 'Fetch live weather with OpenWeather, show 5-day forecast, add a unit toggle.',
  status: 'pending', // pending | submitted
}

export const XP_TABLE = {
  levels: [
    { level: 1, min: 0 },
    { level: 2, min: 100 },
    { level: 3, min: 250 },
    { level: 4, min: 450 },
    { level: 5, min: 700 },
    { level: 6, min: 1000 },
    { level: 7, min: 1350 },
    { level: 8, min: 1750 },
    { level: 9, min: 2200 },
    { level: 10, min: 2700 },
  ],
  perDay: 100,
  streakBonus: 25,
  linkedInBonus: 50,
  earlyBirdBonus: 25,
}

export const BADGES = [
  { id: 'first-commit', name: 'First Commit', icon: '🌱', desc: 'Ship your first day', unlocked: true, day: 1 },
  { id: 'streak-3', name: '3-Day Streak', icon: '🔥', desc: 'Three days in a row', unlocked: true, day: 3 },
  { id: 'streak-7', name: '7-Day Streak', icon: '⚡', desc: 'A full week of shipping', unlocked: true, day: 7 },
  { id: 'night-owl', name: 'Night Owl', icon: '🦉', desc: 'Ship after 10 PM', unlocked: true, day: 9 },
  { id: 'streak-15', name: '15-Day Streak', icon: '🌋', desc: 'Halfway to a habit', unlocked: false, day: 15 },
  { id: 'react-explorer', name: 'React Explorer', icon: '⚛️', desc: '5 React challenges', unlocked: false, day: 18 },
  { id: 'api-master', name: 'API Master', icon: '🛰️', desc: '5 API challenges', unlocked: false, day: 25 },
  { id: 'consistency-king', name: 'Consistency King', icon: '👑', desc: '30-day streak', unlocked: false, day: 30 },
  { id: 'finisher', name: '60-Day Finisher', icon: '🏆', desc: 'Complete all 60 days', unlocked: false, day: 60 },
]

export const COMMUNITY = {
  codingTonight: 2351,
  rank: 142,
  totalParticipants: 8412,
  friends: [
    { name: 'Ananya', avatar: '🦊', status: 'Submitted Day 12 · JS algorithm', time: '2h ago', color: '#FFB45C' },
    { name: 'Rohit', avatar: '🐯', status: 'Started Day 12 · Node CLI', time: '1h ago', color: '#6EE7B7' },
    { name: 'Meera', avatar: '🐼', status: 'Day 12 done · Portfolio site', time: 'just now', color: '#A5B4FC' },
  ],
  weeklyChallenge: { active: true, title: 'Ping-Pong Multiplayer', submissions: 486, endsIn: '3d 4h' },
}

export const PORTFOLIO = {
  score: 72,
  breakdown: [
    { label: 'Consistency', value: 80, color: '#FF8A4C' },
    { label: 'GitHub activity', value: 74, color: '#31E0A6' },
    { label: 'LinkedIn presence', value: 62, color: '#5BB0FF' },
  ],
  tips: [
    'Posting on LinkedIn raises your score the fastest (+8)',
    'Complete 3 more challenges to unlock the API badge',
    'Keep your streak alive — consistency is 80% of the score',
  ],
  recruiterReady: 'Getting there',
}

export function buildCalendar() {
  const days = []
  for (let i = 0; i < 60; i++) {
    const day = i + 1
    const titles = {
      1: 'Setup & First Commit',
      2: 'Portfolio Landing Page',
      3: 'BMI Calculator',
      4: 'Todo REST API',
      5: 'CSS-only Art',
      6: 'Regex Validator',
      7: 'Personal Portfolio',
      8: 'Markdown Blog Engine',
      9: 'Night Owl: Snake Game',
      10: 'News API Fetcher',
      11: 'Quiz App',
      12: 'Build a Weather Dashboard',
    }
    days.push({
      day,
      title: titles[day] || `Day ${day} Challenge`,
      completed: day <= 11,
      submitted: day <= 11,
      github: day <= 11 ? `github.com/siddhesh-dev/day-${day}` : null,
      linkedin: day <= 11 ? `linkedin.com/in/siddhesh/day-${day}` : null,
      date: `Aug ${6 + (i % 30)}`,
      xp: day <= 11 ? 100 + (day % 3) * 25 : 0,
    })
  }
  return days
}

export const SCENES = {
  'day-12': {
    label: 'Day 12 · Active streak',
    user: { ...USER },
    streak: { current: 12, longest: 18, isActive: true, missedYesterday: false },
    today: { ...TODAY_TASK, status: 'pending' },
    calendar: buildCalendar(),
    completedDays: 11,
    xp: { total: 850, level: 5 },
    portfolio: { ...PORTFOLIO },
    reminder: { type: 'due', label: 'Expires in 4h 12m' },
  },
  'day-1': {
    label: 'Day 1 · First day',
    user: { ...USER },
    streak: { current: 0, longest: 0, isActive: false, missedYesterday: false, firstDay: true },
    today: { ...TODAY_TASK, day: 1, title: 'Setup & First Commit', category: 'Git · Basics', difficulty: 'Easy', time: '20 min', tech: ['Git', 'GitHub'], status: 'pending' },
    calendar: buildCalendar().map((d) => ({ ...d, completed: false })),
    completedDays: 0,
    xp: { total: 0, level: 1 },
    portfolio: { ...PORTFOLIO, score: 12, breakdown: [...PORTFOLIO.breakdown.map((b) => ({ ...b, value: b.value === 80 ? 0 : 0 }))], tips: ['Your score starts the moment you ship Day 1', 'A LinkedIn post + GitHub commit = instant boost', 'Consistency builds 80% of your score'] },
    reminder: { type: 'start', label: 'Your journey starts today' },
  },
  missed: {
    label: 'Missed a day',
    user: { ...USER },
    streak: { current: 4, longest: 18, isActive: false, missedYesterday: true },
    today: { ...TODAY_TASK, status: 'pending' },
    calendar: buildCalendar().map((d) => (d.day === 11 ? { ...d, completed: false, submitted: false } : d)),
    completedDays: 10,
    xp: { total: 700, level: 4 },
    portfolio: { ...PORTFOLIO, score: 58, tips: ['Missed Day 11 — finish today and your comeback counts for +25 XP', 'A streak is not the score. Consistency over 60 days is.', 'Post today, even a small win, to rebuild momentum'] },
    reminder: { type: 'comeback', label: 'Comeback mode · 1 missed day' },
  },
  complete: {
    label: 'Day 12 · Completed',
    user: { ...USER },
    streak: { current: 12, longest: 18, isActive: true, missedYesterday: false, todayDone: true },
    today: { ...TODAY_TASK, status: 'submitted' },
    calendar: buildCalendar().map((d) => (d.day === 12 ? { ...d, completed: true, submitted: true, github: 'github.com/siddhesh-dev/day-12', linkedin: 'linkedin.com/in/siddhesh/day-12' } : d)),
    completedDays: 12,
    xp: { total: 975, level: 5 },
    portfolio: { ...PORTFOLIO, score: 76 },
    reminder: { type: 'done', label: 'Great work! Come back tomorrow for Day 13' },
  },
}

export function getLevelInfo(xp, table) {
  let info = { level: 1, currentMin: 0, nextMin: 100 }
  for (let i = 0; i < table.levels.length; i++) {
    if (xp >= table.levels[i].min) info = { level: table.levels[i].level, currentMin: table.levels[i].min, nextMin: table.levels[i + 1]?.min ?? xp }
  }
  const span = info.nextMin - info.currentMin
  info.progress = Math.min(1, (xp - info.currentMin) / span)
  info.xpInLevel = xp - info.currentMin
  info.xpToNext = Math.max(0, info.nextMin - xp)
  return info
}
