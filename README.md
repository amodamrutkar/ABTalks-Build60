# ABTalks — 60-Day Coding Challenge
> Build. Commit. Grow.


## Overview
ABTalks is a 60-day coding challenge platform designed for college students to build projects consistently, document their progress, and create visible proof of their learning through GitHub and LinkedIn.

## Problem Statement
Students often struggle to maintain consistency while learning development. ABTalks-Build60 encourages students to build something every day for 60 days while maintaining a public learning streak through GitHub commits and LinkedIn posts.


## Solution
The redesigned ABTalks experience provides a mobile-first interface that guides students through their 60-day journey with visual progress tracking, daily tasks, proof-of-work submissions, andmotivational feedback.

## Features

- 60-day coding journey
- Daily challenge tracking
- GitHub proof-of-work submission
- LinkedIn proof-of-work submission
- Streak tracking
- Progress visualization
- Student achievements
- Mobile-first interface
- Interactive journey experience

## Screenshots

### Landing Page
![Landing Page](./screenshots/landing-page.png)

### Dashboard
<img width="550" height="700" alt="Dashboard" src="https://github.com/user-attachments/assets/6406ba81-58d7-40d1-8540-ffd73ade901b" />


### Challenge Day
<img width="550" height="700" alt="Screenshot 2026-08-09 173450" src="https://github.com/user-attachments/assets/d25bbab6-4d54-48f4-adcc-cce864f916d4" />


## Usage

1. Open the landing page.
2. Select "Start My Journey".
3. Choose a coding track.
4. Complete the daily challenge.
5. Submit your GitHub commit.
6. Submit your LinkedIn post.
7. Track your progress through the 60-day journey.

## Live Demo

## Design Decisions

### Mobile First
The platform is designed primarily for a 390px mobile viewport because students are expected to use the platform on their phones, often after college.

### 60-Day Journey
The challenge is represented as a visual journey rather than simply displaying a progress percentage. This makes long-term progress feel tangible and encourages students to continue.

### Proof of Work
GitHub and LinkedIn submissions are integrated into the daily experience so that consistency produces visible career evidence.

## Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| *Frontend* | React 19 | Component-based UI development |
| *Build Tool* | Vite | Fast development server and production builds |
| *Routing* | React Router DOM | Client-side routing for /, /dashboard, and /day/:day |
| *Styling* | Vanilla CSS | Custom responsive styling with CSS variables |
| *Icons* | Lucide React | Lightweight, consistent SVG icons |
| *Animations* | Framer Motion | Page transitions, micro-interactions, and animations |
| *Rendering* | React DOM | Rendering React components to the browser |

## Project Structure / Route Map

```text
src/
│
├── App.jsx
├── main.jsx
├── index.css
│
├── pages/
│   ├── LandingPage.jsx
│   ├── AboutChallengePage.jsx
│   ├── DashboardPage.jsx
│   └── ChallengeDayPage.jsx
│
├── components/
│   ├── landing/
│   │   ├── IntroAnimation.jsx
│   │   ├── Hero.jsx
│   │   ├── JourneySection.jsx
│   │   ├── PerksSection.jsx
│   │   ├── ReviewsSection.jsx
│   │   └── CTASection.jsx
│   │
│   ├── dashboard/
│   │   ├── DashboardHeader.jsx
│   │   ├── ProgressCard.jsx
│   │   ├── CurrentChallenge.jsx
│   │   ├── JourneyProgress.jsx
│   │   └── AchievementCard.jsx
│   │
│   └── challenge/
│       ├── ChallengeHeader.jsx
│       ├── ChallengeContent.jsx
│       ├── SubmissionPanel.jsx
│       └── DayNavigation.jsx
│
├── data/
│   ├── challenges.js
│   ├── achievements.js
│   ├── reviews.js
│   └── student.js
│
├── hooks/
│   ├── useProgress.js
│   └── useChallenge.js
│
├── services/
│   └── mockApi.js
│
├── utils/
│   ├── validation.js
│   └── storage.js
│
└── assets/
    ├── images/
    └── icons/
```

## Future Improvements

- Real authentication
- GitHub API integration
- LinkedIn integration
- Real-time streak tracking
- Notifications
- Personalized learning paths
- Production database

## Team
Amod Amrutkar
Siddesh Bhole
