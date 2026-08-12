# ABTALKS · 60

> Build. Commit. Go.

A 60-day public build challenge platform that turns consistency into a habit — ship something every day for 60 days and create public proof of your growth.

## 1. Project Title & Tagline

**ABTALKS · 60** — *Build. Commit. Go.*

> Ship something every day for 60 days — a line of code, a fix, a post. Public proof that consistency beats everything.

| | |
|---|---|
| **Live Demo** | [ab-talks-build60.vercel.app](https://ab-talks-build60.vercel.app/) |
| **GitHub Repository** | https://github.com/amodamrutkar/ABTalks-Build60 |

## 2. About the Project

**ABTALKS · 60** is a mobile-first 60-day coding challenge platform built for college students. It turns the simple promise of "show up every day" into a structured, trackable, and rewarding experience.

- **What ABTALKS · 60 is** — a guided 60-day public build challenge where daily effort produces visible career evidence.
- **What the website does** — guides students through the journey with daily challenges, proof-of-work submissions (GitHub/LinkedIn), streak tracking, XP, badges, and progress visualization.
- **Who it's designed for** — college students and early developers who want to build consistently, often on their phones after college hours.

## 3. Problem Statement

- **The problem of inconsistency** — beginners start strong and fade out within weeks; motivation dies without structure or accountability.
- **Why people struggle to maintain momentum** — no clear daily goal, no visible progress, and no public commitment to keep them honest.
- **Why a structured 60-day challenge helps** — a fixed 60-day arc with daily tasks, streaks, and public proof turns "being consistent" from a vague goal into a repeatable daily habit.

## 4. Solution

**ABTALKS · 60** converts the challenge idea into an interactive experience:

- **Addresses the problem** — a predefined 60-day curriculum with one clear task per day, streak tracking, and XP rewards keeps momentum alive.
- **Interactive experience** — the landing page sells the journey; the dashboard visualizes progress as a tangible 60-day map; each day opens a challenge sheet with today's task, success criteria, and submission flow.
- **Proof of work** — GitHub commits and LinkedIn posts are built into the daily flow, so consistency automatically produces hireable evidence.

## 5. Key Features

- **Hero / landing experience** — animated intro, glowing dot background, and cinematic scroll-driven storytelling
- **Interactive 60-Day Journey** — visual milestone map with scroll-driven progress
- **Daily challenge engine** — per-day tasks, success criteria, tips, and resources
- **Proof-of-work submissions** — GitHub & LinkedIn submission flow with verification overlay
- **Review/testimonial carousel** — social proof from students
- **Animated UI and visual effects** — Framer Motion transitions, 3D tilt cards, glowing streaks and badges
- **Responsive design** — mobile-first, designed for a 390px viewport
- **Final CTA** — no streaks required to begin — just show up today

## 6. How It Works

```text
Landing Page
     ↓
Start My Journey
     ↓
60-Day Journey (choose today's challenge)
     ↓
Daily Progress (submissions, streaks, XP, badges)
     ↓
Day 60 Completion
```

1. Open the landing page and tap **Start My Journey**.
2. Pick today's challenge from the 60-day journey map.
3. Read the day sheet — task, success criteria, today's tip, resources.
4. Complete the build, then submit your GitHub commit / LinkedIn post.
5. Watch your streak, XP, and badges grow as you progress.
6. Reach Day 60 — completed challenge, public proof, transformed habit.

## 7. Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI |
| **Vite** | Fast dev server & production builds |
| **JavaScript (JSX/ES modules)** | Application logic |
| **CSS** | Custom styles with CSS variables (no UI framework) |
| **React Router DOM** | Client-side routing |
| **Framer Motion** | Animations & micro-interactions |
| **Lucide React** | Lightweight SVG icons |
| **Git / GitHub** | Version control & hosting |

## 8. Project Structure

```text
src/
├── App.jsx              # Routes + intro animation orchestration
├── main.jsx             # App entry
├── theme.jsx            # Shared theme tokens
├── data/
│   ├── challengeDays.js # 60-day challenge content
│   └── mockData.js      # Mock user/reviews data
├── pages/
│   ├── LandingPage.jsx
│   ├── AboutChallengePage.jsx
│   ├── DashboardPage.jsx
│   └── ChallengeDayPage.jsx
├── components/
│   ├── landing/         # Hero, Journey, Perks, Reviews, Footer, Menu
│   ├── challenge/       # Day sheet, submission form, verify overlay, tips
│   ├── about/           # Challenge timeline
│   └── (Badges, Calendar, StreakCard, XpCard, Tilt3D, …)
├── styles/
│   ├── global.css       # Tokens & base styles
│   ├── landing.css      # Landing page styles
│   └── challenge.css    # Challenge & dashboard styles
└── utils/
    └── challengeStorage.js  # localStorage progress persistence
```

**Key parts explained:**

- `pages/` — the four screens: landing, about, dashboard, challenge day.
- `components/landing/` — every section of the marketing page, from the animated hero to the final CTA.
- `components/challenge/` — the daily build experience: day sheet, task checklist, and the GitHub/LinkedIn submission + verification flow.
- `data/challengeDays.js` — the entire 60-day curriculum content.
- `utils/challengeStorage.js` — persists streaks and progress locally so the journey survives refreshes.

## 9. Route Map

```text
/             → Landing page (hero, journey, reviews, footer)
/about        → About the 60-day challenge + timeline
/dashboard    → Dashboard (progress, streak, XP, journey map)
/challenge    → Today's challenge day sheet
/achievements → Badges & achievements gallery
```

## 10. Installation & Setup

```bash
git clone <repository-url>
cd ABTalks-Build60
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`) in your browser. For a production build, run `npm run build` and preview with `npm run preview`.

## 11. AI Usage

This project was built with heavy assistance from an AI coding assistant:

- **AI tools used** — opencode (AI coding assistant for development, debugging, and iteration)
- **What AI was used for**:
  - **Development assistance** — writing React components, pages, and routing logic
  - **Debugging / code suggestions** — fixing build issues and refining component behavior
  - **UI/design ideation** — animated hero backgrounds, glow effects, journey visuals, dark theme styling
  - **Documentation assistance** — generating and structuring this README
- **AI Usage Log URL** — *(add your AI usage log / chat transcript link here)*

## 12. Screenshots / Demo

*From left to right: Landing (Hero), Dashboard (60-Day Journey), Challenge Day.*

### Landing Page — Hero
<img width="300" alt="Landing — Hero" src="https://github.com/user-attachments/assets/27cc50f5-a898-4aac-819f-131e6651e185" />

### Dashboard — 60-Day Journey
<img width="300" alt="Dashboard — 60-Day Journey" src="https://github.com/user-attachments/assets/6406ba81-58d7-40d1-8540-ffd73ade901b" />

### Challenge Day
<img width="300" alt="Challenge Day" src="https://github.com/user-attachments/assets/d25bbab6-4d54-48f4-adcc-cce864f916d4" />

*Mobile responsive view — the entire app is designed mobile-first around a 390px viewport.*

---

## Team — VibeSmiths

- **Amod Amrutkar**
- **Siddhesh Bhole**