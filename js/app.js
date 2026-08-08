/* ABTalks 60 — app: router, views, shared submission state */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);

  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20h16"/><path d="M7 16V9m5 7V5m5 11v-5"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v6a4 4 0 0 1-8 0V4Z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4"/><path d="M12 14v4M8 21h8"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M5 21c1-4 3.5-6 7-6s6 2 7 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    clock: '⏱', flame: '🔥', check: '✓', bubble: '💬', git: '⌨',
  };

  let state = ABTAL.load();
  const plan = ABTAL.plan();
  let currentDay = 12;

  /* ---------------- shared helpers ---------------- */
  const todayISO = () => { const d = new Date(); return d.toISOString().slice(0, 10); };
  const commit = () => ABTAL.save(state);
  const dayXp = (day) => 25 + Math.min(75, day * 2);
  const doneCount = () => Object.keys(state.completed).filter((k) => +k <= 60).length;

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t.__h);
    t.__h = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function header(title, right) {
    return `<header class="app-header">
      <button class="back" data-back aria-label="Back">${ICONS.back}</button>
      <div class="brand">AB<b>Talks</b> 60<div class="brand-sub">${title}</div></div>
      <div class="spacer"></div>
      ${right || ''}
    </header>`;
  }

  function bottomNav(active) {
    const items = [
      ['home', 'Home', '/dashboard'],
      ['chart', 'Challenges', '/day/12'],
      ['trophy', 'Achievements', '/dashboard'],
      ['user', 'Profile', '/dashboard'],
    ];
    return `<nav class="bottom-nav">${items.map(([ic, label, href]) =>
      `<a href="${href}" data-link class="${label === active ? 'active' : ''}">${ICONS[ic]}<span>${label}</span></a>`
    ).join('')}</nav>`;
  }

  function streakStatus() {
    const last = state.streak.lastDate;
    if (!last) return { fresh: true, missed: false };
    if (last === todayISO()) return { fresh: false, missed: false };
    const y = new Date(); y.setDate(y.getDate() - 1);
    if (last === y.toISOString().slice(0, 10)) return { fresh: false, missed: false };
    return { fresh: false, missed: true };
  }

  /* ---------------- router ---------------- */
  function route() {
    const p = location.pathname.replace(/\/+$/, '');
    if (p === '/' || p === '' || p.endsWith('index.html')) return Landing();
    if (p === '/dashboard') return Dashboard();
    const m = p.match(/^\/day\/(\d+)$/);
    if (m) return Day(+m[1]);
    return Landing();
  }

  function navigate(href) {
    history.pushState({}, '', href);
    render();
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', (e) => {
    const backBtn = e.target.closest('[data-back]');
    if (backBtn) {
      e.preventDefault();
      if (window.history.length > 1) { history.back(); return; }
      if (location.pathname === '/') return;
      navigate(location.pathname === '/dashboard' ? '/' : '/dashboard');
      return;
    }
    const nav = e.target.closest('[data-link]');
    if (nav) { e.preventDefault(); navigate(nav.getAttribute('href')); return; }
    const btn = e.target.closest('[data-link-href]');
    if (btn) navigate(btn.getAttribute('data-link-href'));
  });
  window.addEventListener('popstate', render);

  function bindStatic() {
    document.querySelectorAll('.res-head').forEach((b) =>
      b.addEventListener('click', () => b.closest('.res-item').classList.toggle('open')));
    const f = $('#submit-form');
    if (f) {
      const gh = $('#gh-input'), li = $('#li-input'), btn = $('#submit-day');
      gh.addEventListener('input', () => validate(gh, 'gh'));
      li.addEventListener('input', () => validate(li, 'li'));
      f.addEventListener('submit', (e) => { e.preventDefault(); submitProof(gh, li, btn); });
    }
    const vw = $('#view-prog');
    if (vw) vw.addEventListener('click', () => {
      const el = $('#progress-sec');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function render() {
    const html = route();
    if (typeof html !== 'string' || !html.length) throw new Error('blank route');
    $('#app').innerHTML = html;
    bindStatic();
  }

  /* no white screens, ever: any render error → front page */
  function safeRender() {
    try {
      render();
    } catch (err) {
      console.error('[ABTalks] render failed, landing on the front page:', err);
      try {
        if (location.pathname !== '/') history.replaceState({}, '', '/');
        $('#app').innerHTML = Landing();
        bindStatic();
      } catch (e2) { /* keep the boot text visible */ }
    }
  }

  /* refresh / back-forward → front page; fresh opens keep their own URL page */
  let isReload = false;
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    isReload = !!(nav && (nav.type === 'reload' || nav.type === 'back_forward'));
  } catch (e) { /* ignore */ }
  if (isReload && location.pathname !== '/') history.replaceState({}, '', '/');

  /* ================= URL validation ================= */
  function isOK(kind, raw) {
    if (!raw) return false;
    let u = raw.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    let host = '';
    try { host = new URL(u).host.replace(/^www\./, ''); } catch (e) { return false; }
    if (kind === 'gh') return host === 'github.com' && u.split('/').length >= 4;
    if (kind === 'li') return host === 'linkedin.com' && /(\/posts\/|\/feed\/update\/|\/share\/)/.test(u);
    return false;
  }

  function msgFor(kind, v) {
    if (!v) return kind === 'gh' ? 'Add your GitHub repository or commit link.' : 'Add the LinkedIn post where you shared today\u2019s work.';
    if (!isOK(kind, v)) return kind === 'gh'
      ? 'Please enter a valid GitHub repository or commit URL. Example: github.com/you/project'
      : 'Please enter a valid LinkedIn post URL. Example: linkedin.com/posts/you-123';
    return kind === 'gh' ? '✓ GitHub link looks good' : '✓ LinkedIn link looks good';
  }

  function validate(input, kind) {
    const v = input.value.trim();
    const wrap = input.closest('.fc');
    const msg = $('.help-text', wrap);
    const ok = isOK(kind, v);
    input.classList.toggle('has-err', !!v && !ok);
    input.classList.toggle('input-ok', !!v && ok);
    msg.className = 'help-text' + (v && !ok ? ' bad' : (v && ok ? ' good' : ''));
    msg.textContent = msgFor(kind, v);
    if (v && ok) {
      toast(kind === 'gh' ? '✓ GitHub link looks good — box checked' : '✓ LinkedIn link looks good — box checked');
      const box = $('#prog-' + (kind === 'gh' ? 'gh' : 'li'));
      if (box) {
        box.classList.add('done');
        box.querySelector('.dot').textContent = ICONS.check;
      }
    }
    updateStrength();
    return ok;
  }

  /* ================= Proof Strength (live) ================= */
  function updateStrength() {
    const gh = $('#gh-input'), li = $('#li-input');
    if (!gh || !li) return;
    const gOk = isOK('gh', gh.value), lOk = isOK('li', li.value);
    const sv = $('#strength-val'), sl = $('#strength-list');
    if (!sv || !sl) return;
    let tag = 'Almost there', cls = '';
    if (gOk && lOk) { tag = 'Strong Proof ✓'; cls = 'good'; }
    else if (gOk || lOk) tag = 'Getting there';
    sv.innerHTML = `Proof Strength: <b style="color:${cls ? 'var(--success)' : 'var(--accent)'}">${tag}</b>`;
    const rows = sl.querySelectorAll('li');
    if (rows[0]) { rows[0].classList.toggle('on', gOk); rows[0].querySelector('.mk').textContent = gOk ? '✓' : '○'; }
    if (rows[1]) { rows[1].classList.toggle('on', lOk); rows[1].querySelector('.mk').textContent = lOk ? '✓' : '○'; }
    if (rows[2]) { rows[2].classList.toggle('on', gOk && lOk); rows[2].querySelector('.mk').textContent = (gOk && lOk) ? '✓' : '○'; }
  }

  /* ================= submission ================= */
  async function submitProof(gh, li, btn) {
    const g = validate(gh, 'gh');
    const l = validate(li, 'li');
    if (!g || !l) { toast('Fix the highlighted links and try again.'); return; }

    btn.disabled = true;
    btn.textContent = 'Submitting proof…';
    $('#submit-form').querySelector('.loader').textContent = 'Validating your links…';

    await new Promise((r) => setTimeout(r, 900));

    const d = currentDay;
    state.completed[d] = { github: gh.value.trim(), linkedin: li.value.trim(), ts: new Date().toISOString() };
    const st = streakStatus();
    if (st.missed) state.streak.current = 1;
    else if (state.streak.lastDate !== todayISO()) state.streak.current += 1;
    state.streak.lastDate = todayISO();
    state.streak.best = Math.max(state.streak.best, state.streak.current);
    state.xp += dayXp(d);
    commit();

    render();
    confettiBurst();
    toast(`Day ${d} locked in · +${dayXp(d)} XP 🔥`);
  }

  function confettiBurst() {
    const c = document.createElement('div');
    c.className = 'confetti';
    const colors = ['#FF9B45', '#FF6B63', '#22C98A', '#F2F0E9', '#C7402F'];
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('i');
      s.style.left = Math.random() * 100 + '%';
      s.style.background = colors[i % colors.length];
      s.style.animationDuration = (1.4 + Math.random() * 1.3) + 's';
      s.style.animationDelay = (Math.random() * 0.4) + 's';
      c.appendChild(s);
    }
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3200);
  }

  /* ================= LANDING ================= */
  function Landing() {
    const tracks = ABTAL.tracks.map((t) =>
      `<span class="chip ${t.hot ? 'chip-hot' : ''}">${t.hot ? ICONS.flame + ' ' : ''}${t.name} · ${t.count}</span>`).join('');
    return `
    <div class="landing">
      ${header('Ship every day')}
      <div class="land-hero">
        <span class="chip chip-hot">${ICONS.flame} 60-day challenge · free for students</span>
        <h1 style="margin-top:14px">Build every day.<br/><span class="hot">Prove it publicly.</span></h1>
        <p>ABTalks 60 is a daily coding challenge for Indian college students — ship one project a day and keep a public streak of GitHub commits and LinkedIn posts that recruiters actually open.</p>
      </div>
      <div class="land-stats">
        <div class="stat"><b>12,000+</b><span>shippers</span></div>
        <div class="stat"><b>60</b><span>days</span></div>
        <div class="stat"><b>2</b><span>public proofs</span></div>
      </div>
      <div class="card" style="margin-top:16px">
        <div class="label">How it works</div>
        <div class="step"><div class="step-num">1</div><div><h3>Pick a track</h3><p>Full-Stack Web, Android, iOS, AI &amp; ML — or start anywhere you want to grow.</p></div></div>
        <div class="step"><div class="step-num">2</div><div><h3>Build one thing daily</h3><p>A fresh, finishable mission each day with clear requirements and a time budget.</p></div></div>
        <div class="step"><div class="step-num">3</div><div><h3>Prove it publicly</h3><p>A GitHub commit and a LinkedIn post. Two links a day keeps the momentum real.</p></div></div>
        <div class="step"><div class="step-num">4</div><div><h3>Become visible</h3><p>Your streak, repos and posts compile into a track record that speaks for you.</p></div></div>
      </div>
      <div class="sec">
        <div class="label">Tracks</div>
        <div class="tracks">${tracks}</div>
      </div>
      <div class="land-cta">
        <button class="btn btn-primary" data-link-href="/dashboard">Start your 60 days →</button>
        <p style="text-align:center;color:var(--muted);font-size:12px;margin-top:10px">No credit card. Your streak starts the day you ship.</p>
      </div>
    </div>`;
  }

  /* ================= DASHBOARD ================= */
  function Dashboard() {
    const doneN = doneCount();
    const pct = Math.round(doneN / 60 * 100);
    const t12 = plan[11];
    const t12done = !!state.completed[12];
    const streak = state.streak.current;
    const st = streakStatus();

    const ach = [
      { ic: '🔥', nm: '7-day Streak', got: streak >= 7 },
      { ic: '🌙', nm: 'Midnight Build', got: doneN >= 15 },
      { ic: '🧠', nm: '10 Shipped', got: doneN >= 10 },
      { ic: '⚡', nm: 'Streak Master', got: streak >= 30 },
      { ic: '👑', nm: 'Top 1%', got: doneN >= 45 },
    ];

    const heat = [];
    const t = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(t); d.setDate(t.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      heat.push(Object.values(state.completed).some((c2) => (c2.ts || '').slice(0, 10) === iso));
    }

    return `
      <div class="dash">
        ${header('Dashboard')}
        <div class="dash-hello">
          <div class="avatar">${state.user.name[0].toUpperCase()}</div>
          <div><h1>Hey ${state.user.name}</h1><div class="sub">${state.user.cohort}</div></div>
          <div class="streak-pill">${ICONS.flame} ${streak}d</div>
        </div>

        <div class="progress-card">
          <div class="row1"><div class="day-xof">DAY ${Math.min(60, doneN + 1)} OF 60</div><div class="pct">${pct}%</div></div>
          <div class="bar"><span style="width:${pct}%"></span></div>
          <div class="chips-row"><span class="chip">◉ ${doneN}/60 days</span><span class="chip chip-hot">+${state.xp} XP</span>${t12done ? '<span class="chip chip-good">Day 12 ✓</span>' : '<span class="chip">Today: Day 12</span>'}</div>
        </div>

        ${st.missed ? `<div class="banner" style="margin-top:12px">${ICONS.clock} Your previous streak ended, but today is a <b>fresh start</b>.</div>` : ''}

        <div class="card today-card">
          <div class="tc-top"><span class="label">Today's challenge · Day 12</span>${t12done ? '<span class="chip chip-good" style="margin-left:auto">Completed</span>' : '<span class="chip chip-hot" style="margin-left:auto">Active</span>'}</div>
          <h3>${t12.title}</h3>
          <p class="desc">${t12.description}</p>
          <div class="chips-row"><span class="chip">${t12.difficulty}</span><span class="chip">${ICONS.clock} ${t12.estimatedTime}</span>${t12.technologies.map((x) => `<span class="chip chip-hot">${x}</span>`).join('')}</div>
          <button class="btn ${t12done ? 'btn-ghost' : 'btn-primary'}" data-link-href="/day/12">${t12done ? 'Review Day 12' : 'Start Day 12 →'}</button>
        </div>

        <div class="mini-cards">
          <div class="mini"><div class="big">${doneN}<span style="color:var(--muted)">/60</span></div><div class="cap">overall completion</div></div>
          <div class="mini"><div class="big" style="color:var(--accent)">${streak}${ICONS.flame}</div><div class="cap">current streak</div></div>
          <div class="mini"><div class="big">${state.streak.best}</div><div class="cap">best streak</div></div>
          <div class="mini"><div class="big" style="color:var(--success)">${state.xp}</div><div class="cap">total XP</div></div>
        </div>

        <div class="sec">
          <div class="sec-title">Achievements</div>
          <div class="ach-row">
            ${ach.map((a) => `<div class="ach ${a.got ? 'unlocked' : ''}"><div class="ic">${a.ic}</div><div class="nm">${a.nm}</div></div>`).join('')}
          </div>
        </div>

        <div class="card heat" style="margin-top:14px">
          <div class="sec-title" style="margin-bottom:0">Ship beat — last two weeks</div>
          <div class="heat-grid">${heat.map((on) => `<i class="${on ? 'on' : ''}"></i>`).join('')}</div>
          <div style="font-size:11.5px;color:var(--muted);margin-top:8px">Ship today to keep the orange streak alive. ${ICONS.flame}</div>
        </div>
      </div>
      ${bottomNav(t12done ? 'Home' : 'Challenges')}`;
  }

  /* ================= CHALLENGE DAY ================= */
  function Day(dayNum) {
    const day = Math.max(1, Math.min(60, dayNum));
    currentDay = day;
    const c = plan.find((p) => p.day === day) || plan[day - 1];
    const sub = state.completed[day];
    const streak = state.streak.current;
    const st = streakStatus();
    const completed = !!sub;
    const pct = Math.round(day / 60 * 100);

    const ghOK = completed && isOK('gh', sub.github);
    const liOK = completed && isOK('li', sub.linkedin);

    const banner = completed ? '' :
      (day === 1 || st.fresh
        ? `<div class="banner">${ICONS.flame} 0-day streak — <b>your first streak starts today.</b></div>`
        : st.missed
          ? `<div class="banner">${ICONS.clock} Your previous streak ended, but today is a <b>fresh start</b>. Ship it and the count begins again.</div>`
          : '');

    const mission = `<section class="sec">
      <h3 class="sec-title">Your Mission</h3>
      <div class="card"><ul class="check-list">
        ${c.requirements.map((r) => `<li><span class="dot">${ICONS.check}</span><span>${r}</span></li>`).join('')}
      </ul></div>
    </section>`;

    const criteria = `<section class="sec">
      <h3 class="sec-title">Before You Submit</h3>
      <div class="card"><ul class="check-list">
        ${['Project works correctly', 'Project pushed to GitHub', 'LinkedIn post published', 'Both links are accessible']
          .map((r) => `<li class="done"><span class="dot">${ICONS.check}</span><span>${r}</span></li>`).join('')}
      </ul></div>
    </section>`;

    const resources = `<section class="sec">
      <h3 class="sec-title">Resources <span class="chip" style="font-size:10.5px">4</span></h3>
      <div class="card res-compact">
        ${[
          ['API Documentation', 'Use the OpenWeatherMap current-weather endpoint — the free tier is enough for this build.'],
          ['Starter Repository', 'A Vite + React scaffold with the search box pre-wired. Fork it and skip setup.'],
          ['Design Reference', 'A clean mobile-first weather card layout that looks great at 390px.'],
          ['Helpful Guide', 'How to write today\u2019s LinkedIn post in five minutes without sounding like a template.'],
        ].map(([t2, d], i) => `<div class="res-item ${i === 0 ? 'open' : ''}">
          <button class="res-head">${ICONS.link} ${t2}<span class="arr">${ICONS.arrow}</span></button>
          <div class="res-body">${d}</div>
        </div>`).join('')}
      </div>
    </section>`;

    const progress = `<section class="sec" id="progress-sec">
      <h3 class="sec-title">Today's Progress</h3>
      <div class="card"><ul class="check-list">
        <li class="done"><span class="dot">${ICONS.check}</span><span>Understand challenge</span></li>
        <li class="${completed ? 'done' : 'cur'}"><span class="dot">${completed ? ICONS.check : ICONS.arrow}</span><span>Build project</span></li>
        <li id="prog-gh" class="${ghOK ? 'done' : ''}"><span class="dot">${ghOK ? ICONS.check : ''}</span><span>Push to GitHub</span></li>
        <li id="prog-li" class="${liOK ? 'done' : ''}"><span class="dot">${liOK ? ICONS.check : ''}</span><span>Share on LinkedIn</span></li>
      </ul></div>
    </section>`;

    const proofCard = `<div class="card proof-card" style="margin-top:12px">
      <div class="fc">
        <div class="svc-head"><div class="svc-ic svc-gh">${ICONS.git}</div><h3>GitHub</h3><span class="st ${ghOK ? 'ok' : 'no'}">${ghOK ? '✓ verified' : (completed ? 'invalid' : 'required')}</span></div>
        <p class="svc-sub">Add the repository or commit containing today's work.</p>
        <div class="field">
          <div class="input-wrap">
            <span class="input-ico">⌁</span>
            <input class="input" id="gh-input" type="url" placeholder="github.com/username/project" autocomplete="off" value="${completed ? sub.github : ''}" ${completed ? 'disabled' : ''} />
          </div>
          <div class="help-text">${msgFor('gh', completed ? sub.github : '')}</div>
        </div>
      </div>
      <div class="fc">
        <div class="svc-head"><div class="svc-ic svc-li">in</div><h3>LinkedIn</h3><span class="st ${liOK ? 'ok' : 'no'}">${liOK ? '✓' : 'required'}</span></div>
        <p class="svc-sub">Share your progress publicly and keep your learning streak visible.</p>
        <div class="field">
          <div class="input-wrap">
            <span class="input-ico">${ICONS.bubble}</span>
            <input class="input" id="li-input" type="url" placeholder="linkedin.com/posts/..." autocomplete="off" value="${completed ? sub.linkedin : ''}" ${completed ? 'disabled' : ''} />
          </div>
          <div class="help-text">${msgFor('li', completed ? sub.linkedin : '')}</div>
        </div>
      </div>
    </div>`;

    const strength = `<div class="card card-warm strength-card">
      <div class="strength-top">
        <div id="strength-val" class="strength-val">Proof Strength: <b style="color:var(--accent)">${completed && ghOK && liOK ? 'Strong Proof ✓' : 'Almost there'}</b></div>
        <span class="strength-ic">📊</span>
      </div>
      <ul id="strength-list" class="strength-list">
        <li class="${ghOK ? 'on' : ''}"><span class="mk">${ghOK ? '✓' : '○'}</span> ${ghOK ? 'GitHub repository attached' : 'GitHub link pending'}</li>
        <li class="${liOK ? 'on' : ''}"><span class="mk">${liOK ? '✓' : '○'}</span> ${liOK ? 'LinkedIn post attached' : 'LinkedIn link pending'}</li>
        <li class="${(ghOK && liOK) ? 'on' : ''}"><span class="mk">${(ghOK && liOK) ? '✓' : '○'}</span> Both links live and public</li>
      </ul>
    </div>`;

    const cta = completed ? `
      <div class="card card-warm card-glow" style="text-align:center">
        <div style="font-size:36px">${ICONS.flame}</div>
        <div class="label" style="color:var(--accent);margin-top:8px">Day ${day} complete · +${dayXp(day)} XP</div>
        <div style="font-size:13px;color:var(--muted);margin-top:6px">Your proof of work has been submitted successfully.</div>
        <div class="done-links">
          <div class="dl"><span class="ic">⌨</span><a href="${sub.github}" target="_blank" rel="noopener">${sub.github}</a><span class="ok">✓</span></div>
          <div class="dl"><span class="ic">💬</span><a href="${sub.linkedin}" target="_blank" rel="noopener">${sub.linkedin}</a><span class="ok">✓</span></div>
        </div>
        <div style="display:grid;gap:10px;margin-top:18px">
          <button class="btn btn-primary" data-link-href="/dashboard">Back to Dashboard</button>
          <button class="btn btn-ghost" id="view-prog">View Progress</button>
        </div>
      </div>` : `
      <form id="submit-form">
        <button type="submit" id="submit-day" class="btn btn-primary">Submit Day ${day}</button>
        <p class="loader" style="text-align:center;color:var(--muted);font-size:12px;margin-top:10px">Submitting locks in your streak for today.</p>
      </form>`;

    return `
      ${header(`Day ${day}`, `<span class="chip chip-hot" style="font-size:11px;min-height:30px">${ICONS.flame} ${streak}</span>`)}
      <div class="day">
        <div class="day-progress">
          <div class="dp-main">
            <div class="dp-xof">DAY <em>${day}</em> OF 60</div>
            <div class="bar" style="margin-top:8px"><span style="width:${pct}%"></span></div>
            <div class="dp-pct">${pct}% completed</div>
          </div>
          <div class="day-streak"><b>${ICONS.flame} ${streak}</b><span>day streak</span></div>
        </div>
        ${banner}

        <div class="card card-warm card-glow hero-card">
          <span class="day-badge">Day ${day}</span>
          <h2>${c.title}</h2>
          <p class="desc">${c.description}</p>
          <div class="hero-meta">
            <span class="chip">${c.difficulty}</span>
            <span class="chip">${ICONS.clock} ${c.estimatedTime}</span>
            ${c.technologies.map((t2) => `<span class="chip chip-hot">${t2}</span>`).join('')}
            <span class="chip">Build · Commit · Share</span>
          </div>
        </div>

        ${mission}
        ${criteria}
        ${resources}
        ${progress}
        <section class="sec">
          <h3 class="sec-title">Submit Your Proof</h3>
          <p style="font-size:13px;color:var(--muted);margin-top:-4px">Show what you built today and keep your streak alive.</p>
          ${proofCard}
          ${strength}
        </section>
        <div class="day-cta">${cta}</div>
      </div>
      ${bottomNav('Challenges')}`;
  }

  /* last-resort: never show a blank screen */
  window.addEventListener('error', (ev) => {
    console.error('[ABTalks] uncaught error:', ev.message);
    try {
      if (location.pathname !== '/') history.replaceState({}, '', '/');
      $('#app').innerHTML = Landing();
      bindStatic();
    } catch (e) { /* nothing else to try */ }
  });

  safeRender();
})();