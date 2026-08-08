/* ABTalks 60 — mock data + shared state (localStorage-backed) */

window.ABTAL = (function () {

  const REQS = ["Project works correctly", "Pushed to GitHub", "LinkedIn post live", "Runs at 390px"];

  /* Prime plan for days 1..15; generate the rest from a template. */
  const PRIME = [
    ["Hello Portfolio", "Build a personal landing page that tells people who you are and what you're building.", "Easy", "30–45 min", ["HTML", "CSS"], ["About you section", "Links to your work", "Mobile-friendly layout", "Deploy it live"]],
    ["CLI Calculator", "Write a calculator that runs in the terminal with a clean command-line interface.", "Easy", "30–45 min", ["Node.js", "CLI"], ["Add, subtract, multiply, divide", "Handle invalid input", "Clean output layout", "README with usage"]],
    ["JS Clock", "Design a real-time clock that renders on screen with pure JavaScript.", "Easy", "45 min", ["JavaScript", "CSS"], ["Shows current time", "Live second hand", "Clean modern look", "Works on mobile"]],
    ["Todo with LocalStorage", "Build a to-do list that survives a page refresh, no backend needed.", "Easy", "45–60 min", ["JavaScript", "LocalStorage"], ["Add and delete tasks", "Persist on refresh", "Mark tasks complete", "Task counter"]],
    ["CSS Only Art", "Recreate a charming subject using only CSS — no images allowed.", "Easy", "45–60 min", ["CSS"], ["Pure CSS artwork", "Mobile responsive", "Caption your technique", "Post your build"]],
    ["Guess the Number", "A game where players guess a hidden number with hints and a moves counter.", "Medium", "45–60 min", ["JavaScript", "DOM"], ["Hidden random number", "High / low hints", "Moves counter", "Win & replay state"]],
    ["GitHub Profile README", "A profile you'll be proud of — stats, streak, and your focus areas.", "Medium", "30–45 min", ["GitHub", "Markdown"], ["Who you are", "Current learning focus", "Live stats badges", "Links to top repos"]],
    ["JSON Resume API", "Build a tiny API that serves your resume as clean JSON.", "Medium", "60 min", ["Node.js", "Express"], ["Profile endpoint", "Projects endpoint", "Valid JSON responses", "Deployed API URL"]],
    ["Pomodoro Timer", "A focus timer with work and break sessions that keeps you in the zone.", "Medium", "45–60 min", ["JavaScript", "CSS"], ["25-min work session", "5-min break", "Start / pause / reset", "Session counter"]],
    ["Memory Card Game", "Flip and match pairs of cards before your moves run out.", "Medium", "60–75 min", ["JavaScript", "CSS"], ["Shuffled card grid", "Flip animation", "Moves counter", "Win state"]],
    ["Clone a Landing Page", "Rewrite a famous landing page — make it at least as good as the original.", "Hard", "75–90 min", ["HTML", "CSS", "Design"], ["Strong hero section", "Feature sections", "Responsive to 390px", "Original layout notes"]],
    ["Weather Dashboard", "Create a responsive weather dashboard that lets users search for a city and view real-time weather information.", "Medium", "45–60 min", ["React", "API"], ["Search for a city", "Display temperature", "Display humidity", "Display wind speed", "Handle invalid searches"]],
    ["Quiz App", "A timed quiz with instant feedback and a final score screen.", "Medium", "60–75 min", ["JavaScript", "API"], ["Question bank", "Instant answer feedback", "Timed session", "Final score"]],
    ["Idea Machine API", "Serve random project ideas through a small public API.", "Hard", "75–90 min", ["Node.js", "Express"], ["Ideas endpoint", "Filter by topic", "Rate limiting", "Basic docs page"]],
    ["Habit Tracker", "Track daily habits on a 30-day grid that rewards consistency.", "Hard", "75–90 min", ["React", "LocalStorage"], ["Daily check-in", "30-day grid", "Streak counter", "Persist locally"]],
  ];

  const ALTER = ["Blink Screen", "Data Dash", "Fetch & Render", "State Keep", "Ship It"];
  const TECH = ["JavaScript", "React", "CSS", "API", "Node.js"];
  const LEV = ["Easy", "Medium", "Hard"];

  function plan() {
    const out = PRIME.map((r, i) => ({
      day: i + 1, title: r[0], description: r[1], difficulty: r[2],
      estimatedTime: r[3], technologies: r[4], requirements: r[5],
    }));
    for (let n = 16; n <= 60; n++) {
      out.push({
        day: n,
        title: ALTER[n % ALTER.length] + ' Project ' + n,
        description: "A fresh build. Open the requirements, ship something real, and publish your progress today.",
        difficulty: LEV[n % 3],
        estimatedTime: '45–60 min',
        technologies: [TECH[n % TECH.length], TECH[(n + 2) % TECH.length]],
        requirements: ["Core feature works", "Pushed to GitHub", "LinkedIn post live", "Runs at 390px"],
      });
    }
    return out;
  }

  const tracks = [
    { name: "Full-Stack Web", count: "1,402 shippers", hot: true },
    { name: "Android", count: "412 shippers" },
    { name: "iOS", count: "388 shippers" },
    { name: "AI & ML", count: "631 shippers" },
  ];

  /* ---------- shared state (dashboard + day page read/write this) ---------- */
  const KEY = "abt60_state_v1";

  function seed() {
    const subs = {};
    const dates = [];
    const t = new Date();
    for (let i = 0; i < 11; i++) {
      const d = new Date(t); d.setDate(t.getDate() - 11 + i);
      const iso = d.toISOString().slice(0, 10);
      dates.push(iso);
      subs[i + 1] = { github: 'https://github.com/aarav/day-' + (i + 1), linkedin: 'https://www.linkedin.com/posts/aarav-day-' + (i + 1), ts: iso + 'T20:15:00' };
    }
    return {
      user: { name: 'aarav', handle: 'aarav.dev', cohort: 'Summer 2026 · Full-Stack Web' },
      completed: subs,
      streak: { current: 11, best: 11, lastDate: dates[dates.length - 1] },
      xp: 64 * 11,
      total: 60,
    };
  }

  function load() {
    let s = null;
    try { const raw = localStorage.getItem(KEY); if (raw) s = JSON.parse(raw); } catch (e) { /* ignore */ }
    if (!s || !s.completed) { s = seed(); save(s); }
    return s;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ } }

  return { plan, tracks, load, save, KEY };
})();