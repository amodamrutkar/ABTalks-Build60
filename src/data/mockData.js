export const USER = {
  name: 'Aarnv',
  fullName: 'Aarnv Pawar',
  handle: '@aarnv_dev',
  avatarEmoji: '😎',
  avatarGradient: 'linear-gradient(135deg, #FF8A4C, #FF5E6C)',
  location: 'Pune, India',
  college: 'VIT Pune · CS 3rd Year',
  joinedDay: 'Day 1',
}

export const QUOTES = [
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

export const ACHIEVEMENTS = [
  { id: 'first-commit', name: 'First Commit', icon: '🌱', desc: 'Ship your first challenge to GitHub.', howto: 'Complete and push Day 1 challenge before midnight.', rarity: 'rare', unlocked: true, day: 1 },
  { id: 'streak-3', name: '3-Day Streak', icon: '🔥', desc: 'Three days of shipping in a row.', howto: 'Submit 3 consecutive daily challenges without breaking your streak.', rarity: 'rare', unlocked: true, day: 3 },
  { id: 'streak-7', name: '7-Day Streak', icon: '⚡', desc: 'A full week of shipping.', howto: 'Keep your streak alive for 7 straight days.', rarity: 'epic', unlocked: true, day: 7 },
  { id: 'night-owl', name: 'Night Owl', icon: '🦉', desc: 'Shipped after 10 PM.', howto: 'Submit any challenge between 10 PM and 4 AM.', rarity: 'epic', unlocked: true, day: 9 },
  { id: 'profile-setup', name: 'Profile Setup', icon: '🪪', desc: 'Complete your developer profile.', howto: 'Fill in your bio, links and tech stack on your profile.', rarity: 'rare', unlocked: false, day: 2 },
  { id: 'first-star', name: 'First Star', icon: '⭐', desc: 'Someone starred your project.', howto: 'Share a shipped project and get your first GitHub star.', rarity: 'rare', unlocked: false, day: 4 },
  { id: 'week-one', name: 'Week One', icon: '🗓️', desc: 'Completed your first full week.', howto: 'Ship all 7 challenges in week 1.', rarity: 'rare', unlocked: false, day: 7 },
  { id: 'early-bird', name: 'Early Bird', icon: '🐦', desc: 'Shipped before breakfast.', howto: 'Submit any challenge before 10 AM.', rarity: 'rare', unlocked: false, day: 8 },
  { id: 'terminal-tamer', name: 'Terminal Tamer', icon: '🐚', desc: 'Shipped a CLI tool.', howto: 'Complete a command-line tool challenge.', rarity: 'rare', unlocked: false, day: 10 },
  { id: 'responsive-ready', name: 'Responsive Ready', icon: '📱', desc: 'Perfect on every screen.', howto: 'Ship a fully responsive UI challenge.', rarity: 'rare', unlocked: false, day: 11 },
  { id: 'lighthouse', name: 'Lighthouse', icon: '💡', desc: 'Performance score 90+.', howto: 'Hit a 90+ Lighthouse score on a shipped project.', rarity: 'rare', unlocked: false, day: 13 },
  { id: 'clean-code', name: 'Clean Code', icon: '🧹', desc: 'Zero lint warnings shipped.', howto: 'Complete a challenge with zero lint warnings.', rarity: 'rare', unlocked: false, day: 14 },
  { id: 'readme-rockstar', name: 'Readme Rockstar', icon: '📝', desc: 'Documentation done right.', howto: 'Write a detailed README for a shipped project.', rarity: 'rare', unlocked: false, day: 16 },
  { id: 'pr-pioneer', name: 'PR Pioneer', icon: '🔀', desc: 'Opened your first pull request.', howto: 'Open a PR on any project.', rarity: 'rare', unlocked: false, day: 17 },
  { id: 'dark-mode', name: 'Dark Mode', icon: '🌑', desc: 'The night is on your side.', howto: 'Ship a challenge with a dark-mode toggle.', rarity: 'rare', unlocked: false, day: 19 },
  { id: 'git-wizard', name: 'Git Wizard', icon: '🧙', desc: '3+ Git features in one challenge.', howto: 'Use branches, stash and rebase in a single challenge.', rarity: 'rare', unlocked: false, day: 21 },
  { id: 'testing-trailblazer', name: 'Testing Trailblazer', icon: '🧪', desc: 'Tests before it breaks.', howto: 'Add unit tests to a shipped challenge.', rarity: 'rare', unlocked: false, day: 22 },
  { id: 'asset-artist', name: 'Asset Artist', icon: '🖼️', desc: 'Custom assets, custom style.', howto: 'Ship a challenge with custom images or icons.', rarity: 'rare', unlocked: false, day: 24 },
  { id: 'twenty-commits', name: '20 Commits', icon: '💾', desc: 'Twenty commits and counting.', howto: 'Ship 20 total commits across your challenges.', rarity: 'rare', unlocked: false, day: 26 },
  { id: 'accessible-ace', name: 'Accessible Ace', icon: '♿', desc: 'The web for everyone.', howto: 'Ship with semantic HTML and ARIA labels.', rarity: 'rare', unlocked: false, day: 27 },
  { id: 'debug-detective', name: 'Debug Detective', icon: '🕵️', desc: 'Bug found, bug fixed.', howto: 'Fix a challenge bug in under 30 minutes.', rarity: 'rare', unlocked: false, day: 28 },
  { id: 'branch-builder', name: 'Branch Builder', icon: '🌿', desc: 'Feature branches for a week.', howto: 'Use a feature branch for every challenge for one week.', rarity: 'rare', unlocked: false, day: 29 },
  { id: 'streak-15', name: '15-Day Streak', icon: '🌋', desc: 'Halfway to a habit.', howto: 'Maintain your streak for 15 consecutive days.', rarity: 'epic', unlocked: false, day: 15 },
  { id: 'react-explorer', name: 'React Explorer', icon: '⚛️', desc: '5 React challenges shipped.', howto: 'Complete 5 challenges from the React track.', rarity: 'epic', unlocked: false, day: 18 },
  { id: 'typescript-titan', name: 'TypeScript Titan', icon: '🟦', desc: 'Types make it right.', howto: 'Complete 3 TypeScript challenges.', rarity: 'epic', unlocked: false, day: 20 },
  { id: 'fullstack-falcon', name: 'Full-Stack Falcon', icon: '🦅', desc: 'Front and back, both handled.', howto: 'Complete 3 full-stack challenges.', rarity: 'epic', unlocked: false, day: 23 },
  { id: 'database-dabbler', name: 'Database Dabbler', icon: '🗄️', desc: 'Data in, data out.', howto: 'Complete 3 database challenges.', rarity: 'epic', unlocked: false, day: 26 },
  { id: 'cloud-climber', name: 'Cloud Climber', icon: '☁️', desc: 'Born in the cloud.', howto: 'Complete 3 cloud or deployment challenges.', rarity: 'epic', unlocked: false, day: 28 },
  { id: 'styling-star', name: 'Styling Star', icon: '🎨', desc: 'CSS is your canvas.', howto: 'Complete 5 CSS design challenges.', rarity: 'epic', unlocked: false, day: 31 },
  { id: 'deploy-dynamo', name: 'Deploy Dynamo', icon: '🚀', desc: 'Three projects live.', howto: 'Deploy 3 challenges to production.', rarity: 'epic', unlocked: false, day: 32 },
  { id: 'mobile-mover', name: 'Mobile Mover', icon: '📲', desc: 'App-ready skills.', howto: 'Complete 3 mobile-first challenges.', rarity: 'epic', unlocked: false, day: 33 },
  { id: 'auth-ace', name: 'Auth Ace', icon: '🔐', desc: 'Login, logout, secure.', howto: 'Complete 3 authentication challenges.', rarity: 'epic', unlocked: false, day: 34 },
  { id: 'microservice-master', name: 'Microservice Master', icon: '🧩', desc: 'Small services, big systems.', howto: 'Complete 3 microservice challenges.', rarity: 'epic', unlocked: false, day: 35 },
  { id: 'ssr-sage', name: 'SSR Sage', icon: '🖥️', desc: 'Server-rendered mastery.', howto: 'Complete 3 server-side rendering challenges.', rarity: 'epic', unlocked: false, day: 36 },
  { id: 'performance-pro', name: 'Performance Pro', icon: '📈', desc: 'Fast by design.', howto: 'Complete 3 performance optimization challenges.', rarity: 'epic', unlocked: false, day: 38 },
  { id: 'api-master', name: 'API Master', icon: '🛰️', desc: '5 API challenges shipped.', howto: 'Complete 5 challenges from the API track.', rarity: 'legendary', unlocked: true, day: 25 },
  { id: 'consistency-king', name: 'Consistency King', icon: '👑', desc: 'A month of non-stop shipping.', howto: 'Reach a 30-day streak.', rarity: 'legendary', unlocked: false, day: 30 },
  { id: 'community-captain', name: 'Community Captain', icon: '🌍', desc: 'Helped five students.', howto: 'Help or review 5 students in the community.', rarity: 'legendary', unlocked: false, day: 37 },
  { id: 'open-source-hero', name: 'Open Source Hero', icon: '🤝', desc: 'PR merged on a real project.', howto: 'Get a pull request merged on an open-source repo.', rarity: 'legendary', unlocked: false, day: 39 },
  { id: 'hackathon-hustler', name: 'Hackathon Hustler', icon: '🏁', desc: 'Shipped under pressure.', howto: 'Complete a challenge during a hackathon weekend.', rarity: 'legendary', unlocked: false, day: 41 },
  { id: 'blogging-buddy', name: 'Blogging Buddy', icon: '✍️', desc: 'Three dev blogs published.', howto: 'Write and publish 3 blog posts about your builds.', rarity: 'legendary', unlocked: false, day: 43 },
  { id: 'interview-ace', name: 'Interview Ace', icon: '💼', desc: 'Three interview-ready projects.', howto: 'Build 3 portfolio projects with documentation.', rarity: 'legendary', unlocked: false, day: 45 },
  { id: 'scaling-star', name: 'Scaling Star', icon: '📊', desc: 'Built for scale.', howto: 'Complete 3 high-performance system challenges.', rarity: 'legendary', unlocked: false, day: 47 },
  { id: 'mentor-mode', name: 'Mentor Mode', icon: '🧑‍🏫', desc: 'Reviewed five PRs.', howto: 'Review 5 of your peers submissions.', rarity: 'legendary', unlocked: false, day: 49 },
  { id: 'legacy-lap', name: 'Legacy Lap', icon: '🏛️', desc: 'Maintained for two weeks.', howto: 'Keep a project maintained for 2 straight weeks.', rarity: 'legendary', unlocked: false, day: 50 },
  { id: 'finisher', name: '60-Day Finisher', icon: '🏆', desc: 'Complete the full ABTalks 60 journey.', howto: 'Ship all 60 daily challenges.', rarity: 'mythic', unlocked: false, day: 60 },
  { id: 'century-club', name: 'Century Club', icon: '💯', desc: 'A hundred commits shipped.', howto: 'Reach 100 total commits across your challenges.', rarity: 'mythic', unlocked: true, day: 0 },
  { id: 'iron-streak', name: 'Iron Streak', icon: '⚔️', desc: 'Fifty days unbroken.', howto: 'Reach a 50-day streak.', rarity: 'mythic', unlocked: false, day: 50 },
  { id: 'ultimate-shipmaster', name: 'Ultimate Shipmaster', icon: '🚢', desc: 'Three perfect ships in a day.', howto: 'Ship 3 challenges in one day with perfect quality.', rarity: 'mythic', unlocked: false, day: 0 },
  { id: 'untouchable', name: 'Untouchable', icon: '💠', desc: 'A perfect month.', howto: 'Finish a full month without missing a single day.', rarity: 'mythic', unlocked: false, day: 0 },
  { id: 'bug-bash', name: 'Bug Bash', icon: '🐛', desc: 'Ship 3 challenges during the Bug Bash weekend.', howto: 'Submit any 3 challenges while the Bug Bash event is live.', rarity: 'epic', unlocked: true, day: 0, event: true, eventEnds: 'Aug 16' },
  { id: 'moon-marathon', name: 'Moonlight Marathon', icon: '🌙', desc: 'Ship 5 nights in a row during the Moonlight Marathon.', howto: 'Submit a challenge every night while the event is live.', rarity: 'legendary', unlocked: false, day: 0, event: true, eventEnds: 'Aug 31' },
  { id: 'ghost-ship', name: 'Ghost Ship', icon: '👻', desc: 'Complete a challenge on Halloween night.', howto: 'Submit any challenge on Oct 31 between 6 PM and midnight.', rarity: 'mythic', unlocked: false, day: 0, event: true, eventEnds: 'Oct 31' },
  { id: 'new-year-sprint', name: 'New Year Sprint', icon: '🎆', desc: 'Five ships in the first week of the year.', howto: 'Submit 5 challenges between Jan 1 and Jan 7.', rarity: 'epic', unlocked: false, day: 0, event: true, eventEnds: 'Jan 7' },
  { id: 'diwali-dev', name: 'Diwali Dev', icon: '🪔', desc: 'Shipped during the festival of lights.', howto: 'Submit any challenge during the Diwali weekend.', rarity: 'legendary', unlocked: false, day: 0, event: true, eventEnds: 'Nov 1' },
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

const LB_POOL = {
  India: { flag: '🇮🇳', first: ['Vivaan', 'Diya', 'Rohan', 'Myra', 'Kabir', 'Naina', 'Arjun', 'Saanvi', 'Dev', 'Riya'], last: ['Patel', 'Iyer', 'Reddy', 'Kapoor', 'Singh', 'Verma', 'Nair', 'Joshi', 'Gupta', 'Desai'] },
  USA: { flag: '🇺🇸', first: ['Ethan', 'Ava', 'Mason', 'Mia', 'Logan', 'Ella', 'Ryan', 'Grace', 'Dylan', 'Chloe'], last: ['Smith', 'Johnson', 'Davis', 'Miller', 'Taylor', 'Anderson', 'Thomas', 'Moore', 'Clark', 'Lewis'] },
  UK: { flag: '🇬🇧', first: ['Oliver', 'Amelia', 'Harry', 'Poppy', 'George', 'Isla', 'Arthur', 'Freya', 'Jack', 'Rose'], last: ['Watson', 'Clarke', 'Bennett', 'Hughes', 'Parker', 'Mitchell', 'Turner', 'Cooper', 'Edwards', 'Morgan'] },
  Japan: { flag: '🇯🇵', first: ['Haruto', 'Sakura', 'Ren', 'Aoi', 'Sora', 'Hinata', 'Kaito', 'Mei', 'Daiki', 'Emi'], last: ['Sato', 'Suzuki', 'Takahashi', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato', 'Inoue'] },
  Germany: { flag: '🇩🇪', first: ['Lena', 'Finn', 'Mia', 'Elias', 'Jonas', 'Clara', 'Leon', 'Hanna', 'Felix', 'Paul'], last: ['Schmidt', 'Weber', 'Wagner', 'Fischer', 'Hoffmann', 'Koch', 'Richter', 'Klein', 'Wolf', 'Neumann'] },
  UAE: { flag: '🇦🇪', first: ['Omar', 'Layla', 'Zayed', 'Fatima', 'Hamad', 'Sara', 'Rashid', 'Noor', 'Khalid', 'Mariam'], last: ['Al-Farsi', 'Al-Mansouri', 'Haddad', 'Rahman', 'Sharif', 'Aziz', 'Qadir', 'Nasser', 'Hakim', 'Sultan'] },
  Mexico: { flag: '🇲🇽', first: ['Sofia', 'Mateo', 'Valentina', 'Santiago', 'Camila', 'Alejandro', 'Lucia', 'Emilio', 'Renata', 'Iker'], last: ['Hernandez', 'Garcia', 'Martinez', 'Lopez', 'Gonzalez', 'Perez', 'Rodriguez', 'Sanchez', 'Torres', 'Flores'] },
  'South Korea': { flag: '🇰🇷', first: ['Min-jun', 'Seo-yeon', 'Ji-ho', 'Soo-ah', 'Jun-ho', 'Ye-jin', 'Dong-hyun', 'Hye-jin', 'Sang-wook', 'Jin-woo'], last: ['Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Kang', 'Cho', 'Yoon', 'Jang', 'Lim'] },
  Brazil: { flag: '🇧🇷', first: ['Alice', 'Gabriel', 'Laura', 'Pedro', 'Beatriz', 'Rafael', 'Marina', 'Thiago', 'Camila', 'Gustavo'], last: ['Santos', 'Oliveira', 'Souza', 'Costa', 'Pereira', 'Almeida', 'Ferreira', 'Rodrigues', 'Gomes', 'Lima'] },
  Australia: { flag: '🇦🇺', first: ['Jack', 'Charlotte', 'Ruby', 'Ethan', 'Matilda', 'Lachlan', 'Zoe', 'Cooper', 'Harper', 'Mackenzie'], last: ['Wilson', 'Thompson', 'Walker', 'Harris', 'Martin', 'White', 'Hall', 'Green', 'Baker', 'Adams'] },
  Poland: { flag: '🇵🇱', first: ['Zuzanna', 'Jakub', 'Aleksandra', 'Michal', 'Julia', 'Kacper', 'Natalia', 'Piotr', 'Wiktoria', 'Tomasz'], last: ['Kowalski', 'Wozniak', 'Kowalczyk', 'Kaminski', 'Lewandowski', 'Zielinski', 'Szymanski', 'Wojcik', 'Duda', 'Mazur'] },
}

const LB_AVATARS = ['🦊', '🐼', '🐯', '🦁', '🐺', '🐨', '🐸', '🦜', '🐱', '🐳', '🦩', '🦔', '🐰', '🦉', '🐙', '🦚', '🦢', '🐢', '🦋', '🐿️']
const LB_PROJECTS = ['Realtime Chat App', 'AI Flashcard App', 'DevBoard SaaS', 'Task Tracker CLI', 'Weather API App', 'Portfolio 3D', 'Blog CMS', 'Kanban Board', 'Music Player', 'Fitness Tracker', 'URL Shortener', 'E-commerce UI', 'Auth Boilerplate', 'Markdown Editor', 'Quiz Game', 'Pomodoro App', 'Expense Tracker', 'Landing Page', 'News App', 'Recipe Finder']

const LB_FEATURED = [
  { name: 'Aarav Mehta', avatar: '🦁', country: 'India', flag: '🇮🇳', xp: 4120, streak: 18, achievements: 14, project: 'AI Flashcard App' },
  { name: 'Sophia Chen', avatar: '🦊', country: 'USA', flag: '🇺🇸', xp: 3890, streak: 15, achievements: 12, project: 'Realtime Collab Editor' },
  { name: 'Liam Carter', avatar: '🐺', country: 'UK', flag: '🇬🇧', xp: 3560, streak: 14, achievements: 11, project: 'DevBoard SaaS' },
  { name: 'Yuki Tanaka', avatar: '🐼', country: 'Japan', flag: '🇯🇵', xp: 3410, streak: 12, achievements: 13, project: 'Task Tracker CLI' },
  { name: 'Priya Sharma', avatar: '🐯', country: 'India', flag: '🇮🇳', xp: 3280, streak: 11, achievements: 10, project: 'E-commerce UI' },
  { name: 'Emma Wilson', avatar: '🐰', country: 'USA', flag: '🇺🇸', xp: 3140, streak: 10, achievements: 12, project: 'Weather API App' },
  { name: 'Noah Becker', avatar: '🐨', country: 'Germany', flag: '🇩🇪', xp: 2990, streak: 13, achievements: 9, project: 'Auth Boilerplate' },
  { name: 'Aisha Khan', avatar: '🦜', country: 'UAE', flag: '🇦🇪', xp: 2870, streak: 9, achievements: 11, project: 'Portfolio 3D' },
  { name: 'Diego Ramirez', avatar: '🐸', country: 'Mexico', flag: '🇲🇽', xp: 2760, streak: 8, achievements: 10, project: 'Blog CMS' },
  { name: 'Aarnv', avatar: '🦉', country: 'India', flag: '🇮🇳', xp: 2200, streak: 11, achievements: 7, project: 'Realtime Chat App', me: true },
  { name: 'Hana Kim', avatar: '🐱', country: 'South Korea', flag: '🇰🇷', xp: 2180, streak: 7, achievements: 9, project: 'Kanban Board' },
  { name: 'Lucas Silva', avatar: '🦩', country: 'Brazil', flag: '🇧🇷', xp: 2050, streak: 6, achievements: 8, project: 'Music Player' },
  { name: 'Olivia Brown', avatar: '🐳', country: 'Australia', flag: '🇦🇺', xp: 1940, streak: 5, achievements: 7, project: 'Fitness Tracker' },
  { name: 'Adam Nowak', avatar: '🦔', country: 'Poland', flag: '🇵🇱', xp: 1820, streak: 4, achievements: 8, project: 'URL Shortener' },
]

export const LEADERBOARD = (() => {
  const rows = [...LB_FEATURED]
  const used = new Set(rows.map((p) => p.name))
  for (const [country, pool] of Object.entries(LB_POOL)) {
    const have = rows.filter((p) => p.country === country).length
    for (let i = 0; i < Math.max(0, 5 - have); i++) {
      let name = ''
      let guard = 0
      do {
        name = `${pool.first[(i + guard) % pool.first.length]} ${pool.last[Math.floor((i + guard) / pool.first.length) % pool.last.length]}`
        guard++
      } while (used.has(name))
      used.add(name)
      rows.push({
        name,
        avatar: LB_AVATARS[(rows.length * 3 + i) % LB_AVATARS.length],
        country,
        flag: pool.flag,
        xp: 2650 - i * 220 - (rows.length % 7) * 15,
        streak: 4 + ((rows.length * 7 + i) % 14),
        achievements: 4 + ((rows.length * 5 + i) % 11),
        project: LB_PROJECTS[(rows.length + i) % LB_PROJECTS.length],
      })
    }
  }
  return rows
})()

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
      23: 'Realtime Chat App',
    }
    days.push({
      day,
      title: titles[day] || `Day ${day} Challenge`,
      completed: day <= 11,
      submitted: day <= 11,
      github: day <= 11 ? `github.com/aarnv-dev/day-${day}` : null,
      linkedin: day <= 11 ? `linkedin.com/in/aarnv/day-${day}` : null,
      date: `Aug ${i + 1}`,
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
  missed: {
    label: 'Missed days',
    user: { ...USER },
    streak: { current: 11, longest: 18, isActive: true, missedYesterday: false, missedCount: 4 },
    today: { ...TODAY_TASK, title: 'Realtime Chat App', category: 'Full-Stack · WebSockets', time: '60 min', tech: ['Socket.IO', 'React'], status: 'submitted' },
    calendar: buildCalendar().map((d) => {
      if (d.day >= 9 && d.day <= 12)
        return { ...d, completed: false, submitted: false, missed: true, github: null, linkedin: null, xp: 0 }
      if (d.day >= 13 && d.day <= 23)
        return { ...d, completed: true, submitted: true, github: `github.com/aarnv-dev/day-${d.day}`, linkedin: `linkedin.com/in/aarnv/day-${d.day}`, xp: 100 + (d.day % 3) * 25 }
      return d
    }),
    completedDays: 19,
    xp: { total: 2200, level: 9 },
    portfolio: { ...PORTFOLIO, score: 64, tips: ['You missed 4 days but came back — that is what consistency looks like', 'Keep the 11-day streak alive, one ship at a time', 'Post today, even a small win, to rebuild momentum'] },
    reminder: { type: 'done', label: 'Back on track — 11-day streak. Keep it alive tomorrow!' },
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
