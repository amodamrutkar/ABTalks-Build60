import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flame, Star, Trophy, ArrowRight, Play } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

interface HeroSectionProps {
  onOpenModal: () => void;
  reveal?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal, reveal = true }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Line1Ref = useRef<HTMLSpanElement>(null);
  const h1Line2Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLDivElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reveal) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const statEls = gsap.utils.toArray<HTMLElement>('.stat-item', section);

      // Accessibility: skip the cinematic sequence entirely.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(
          [bgWrapRef.current, badgeRef.current, h1Line1Ref.current, h1Line2Ref.current, paragraphRef.current, ctaPrimaryRef.current, ctaSecondaryRef.current, ...statEls],
          { opacity: 1, scale: 1, y: 0, filter: 'brightness(1)' }
        );
        return;
      }

      // Pre-reveal initial states
      gsap.set(bgWrapRef.current, { opacity: 0, scale: 1.03 });
      gsap.set(badgeRef.current, { opacity: 0, y: 16 });
      gsap.set(h1Line1Ref.current, { opacity: 0.7, scale: 0.95, y: 8, filter: 'brightness(1.4)' });
      gsap.set(h1Line2Ref.current, { opacity: 0.7, scale: 0.95, y: 8, filter: 'brightness(1.4)' });
      gsap.set(paragraphRef.current, { opacity: 0, y: 15 });
      gsap.set(ctaPrimaryRef.current, { opacity: 0, scale: 0.96 });
      gsap.set(ctaSecondaryRef.current, { opacity: 0, y: 12 });
      gsap.set(statEls, { opacity: 0, y: 18 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 0.1s: dark, minimal background emerges subtly
      tl.to(bgWrapRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 0.1)

        // 0.45s: headline reveals as the loading overlay fades away
        .to(
          h1Line1Ref.current,
          { opacity: 1, scale: 1, y: 0, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' },
          0.45
        )
        .to(
          h1Line2Ref.current,
          { opacity: 1, scale: 1, y: 0, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' },
          0.53
        )

        // Supporting elements reveal after the headline settles
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.9)
        .to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.1)
        .to(ctaPrimaryRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }, 1.25)
        .to(
          ctaPrimaryRef.current,
          { filter: 'drop-shadow(0 0 24px rgba(139, 92, 246, 0.5))', duration: 0.4, ease: 'power2.out' },
          1.32
        )
        .to(ctaSecondaryRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 1.42)
        .to(statEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 1.6);
    }, section);

    return () => ctx.revert();
  }, [reveal]);

  // Animated abstract network background (canvas, 3 depth layers, parallax)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    interface NetNode {
      x: number;
      y: number;
      r: number;
      layer: number;
      ripple: number;
      period: number;
    }

    const layerConfig = [
      { count: 26, depth: 0.35, color: 'rgba(139, 92, 246,', rMin: 1, rMax: 1.7, linkDist: 150, linkAlpha: 0.14 },
      { count: 13, depth: 0.6, color: 'rgba(168, 85, 247,', rMin: 1.3, rMax: 2.2, linkDist: 175, linkAlpha: 0.2 },
      { count: 7, depth: 1, color: 'rgba(34, 211, 238,', rMin: 1.8, rMax: 2.8, linkDist: 210, linkAlpha: 0.28 },
    ];

    let width = 0;
    let height = 0;
    let nodes: NetNode[] = [];
    let links: [number, number][] = [];
    let visible = true;
    let rafId = 0;
    let lastT = 0;
    let hasPointer = false;
    const parallax = 24;
    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const genNodes = () => {
      nodes = [];
      layerConfig.forEach((cfg, layer) => {
        let placed = 0;
        let guard = 0;
        while (placed < cfg.count && guard < cfg.count * 80) {
          guard++;
          const x = Math.random() * width;
          const y = Math.random() * height;
          const nx = (x / Math.max(width, 1) - 0.5) * 2;
          const ny = (y / Math.max(height, 1) - 0.5) * 2;
          const d = Math.hypot(nx, ny);
          // Keep the center behind the headline clean and sparse
          const keep = d < 0.3 ? 0.04 : d < 0.55 ? 0.4 : 0.92;
          if (Math.random() > keep) continue;
          nodes.push({
            x,
            y,
            r: rand(cfg.rMin, cfg.rMax),
            layer,
            ripple: Math.random(),
            period: rand(2.6, 4.8),
          });
          placed++;
        }
      });
    };

    const buildLinks = () => {
      links = [];
      layerConfig.forEach((cfg, layer) => {
        const idxs: number[] = [];
        nodes.forEach((n, i) => {
          if (n.layer === layer) idxs.push(i);
        });
        for (let ii = 0; ii < idxs.length; ii++) {
          const a = nodes[idxs[ii]];
          const nearest: { j: number; d: number }[] = [];
          for (let jj = ii + 1; jj < idxs.length; jj++) {
            const b = nodes[idxs[jj]];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < cfg.linkDist) nearest.push({ j: idxs[jj], d });
          }
          nearest.sort((p, q) => p.d - q.d);
          nearest.slice(0, 2).forEach(({ j }) => links.push([idxs[ii], j]));
        }
      });
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        const dt = Math.min((time - lastT) / 1000, 0.05);
        lastT = time;
        if (!hasPointer) {
          target.x = 0.5 + Math.sin(time / 6000) * 0.14;
          target.y = 0.5 + Math.cos(time / 7000) * 0.12;
        }
        mouse.x += (target.x - mouse.x) * 0.06;
        mouse.y += (target.y - mouse.y) * 0.06;

        for (const n of nodes) {
          n.ripple += dt / n.period;
          if (n.ripple >= 1) n.ripple -= 1;
        }
      }

      for (const [i, j] of links) {
        const a = nodes[i];
        const b = nodes[j];
        const cfg = layerConfig[a.layer];
        const ox = (mouse.x - 0.5) * parallax * cfg.depth;
        const oy = (mouse.y - 0.5) * parallax * cfg.depth;
        const ax = a.x + ox;
        const ay = a.y + oy;
        const bx = b.x + ox;
        const by = b.y + oy;
        const d = Math.hypot(ax - bx, ay - by);
        const alpha = cfg.linkAlpha * (1 - d / cfg.linkDist);
        if (alpha <= 0.012) continue;
        ctx.strokeStyle = `${cfg.color} ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      for (const n of nodes) {
        const cfg = layerConfig[n.layer];
        const ox = (mouse.x - 0.5) * parallax * cfg.depth;
        const oy = (mouse.y - 0.5) * parallax * cfg.depth;
        const nx = n.x + ox;
        const ny = n.y + oy;

        if (!reduceMotion && n.layer === 2) {
          const ringR = 4 + n.ripple * 36;
          const ringAlpha = (1 - n.ripple) * 0.32;
          if (ringAlpha > 0.02) {
            ctx.strokeStyle = `${cfg.color} ${ringAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(nx, ny, ringR, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `${cfg.color} 0.85)`;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (time: number) => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      drawFrame(time);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      genNodes();
      buildLinks();
      drawFrame(0);
    };

    const onPointerMove = (e: PointerEvent) => {
      hasPointer = true;
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };

    const onResize = () => resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: '100px' }
    );
    io.observe(canvas);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onResize);

    resize();

    if (!reduceMotion) {
      lastT = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Hero → Journey continuity: hero content subtly lifts and fades as the
  // user scrolls away, dissolving directly into the 60-Day Journey section.
  useEffect(() => {
    const section = sectionRef.current;
    const stack = contentStackRef.current;
    if (!section || !stack) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to(stack, {
        y: -70,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom 25%',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Flame, title: '18K+ Students', sub: 'Active Daily Builders', iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { icon: Star, title: '4.9 Rating', sub: 'From 3,400+ Reviews', iconBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20', isStar: true },
    { icon: Trophy, title: '60 Days Challenge', sub: 'Transformative Habit', iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-4 sm:pt-28 sm:pb-16 overflow-hidden bg-[#05030D]"
    >
      {/* Visual Background: grid + ambient glow + animated network, emerges dark & minimal */}
      <div ref={bgWrapRef} className="absolute inset-0 opacity-0 pointer-events-none will-change-transform">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(420px,92vw)] h-[min(420px,92vw)] sm:w-[650px] sm:h-[650px] bg-gradient-to-tr from-purple-900/25 via-violet-600/15 to-indigo-600/10 rounded-full blur-[140px]" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
      </div>

      {/* Main Content Container — nudged above the vertical center line on mobile */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center items-center w-full -translate-y-10 sm:translate-y-0">
        <div ref={contentStackRef} className="flex flex-col items-center w-full">
          {/* Announcement Pill */}
          <div
            ref={badgeRef}
            className="opacity-0 mb-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill border border-purple-500/30 text-xs font-semibold text-purple-300"
          >
            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            <span>Cohorts Live Now &bull; Join 18K+ Builders</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline text-[42px] leading-[1.05] sm:text-7xl sm:leading-[1.08] md:text-8xl font-extrabold tracking-tight text-[#F5F3FF] font-['Plus_Jakarta_Sans'] max-w-4xl">
            <span ref={h1Line1Ref} className="block opacity-0 will-change-transform">
              Build. Commit.
            </span>
            <span ref={h1Line2Ref} className="block opacity-0 mt-1 sm:mt-2 gradient-text-purple will-change-transform">
              Grow.
            </span>
          </h1>

          {/* Supporting Paragraph */}
          <p
            ref={paragraphRef}
            className="opacity-0 mt-5 text-[15px] sm:text-xl text-[#A8A3B8] max-w-md sm:max-w-2xl font-normal leading-relaxed"
          >
            A 60-day coding challenge where every GitHub commit and LinkedIn post builds your portfolio, consistency, and visibility.
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <div ref={ctaPrimaryRef} className="opacity-0 w-full sm:w-auto will-change-transform">
              <MagneticButton
                onClick={onOpenModal}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold !min-h-[48px]"
              >
                <span>Start My Journey</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </MagneticButton>
            </div>

            <a
              ref={ctaSecondaryRef}
              href="#journey"
              className="opacity-0 w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-slate-300 hover:text-white glass-pill hover:bg-purple-900/30 transition-all flex items-center justify-center gap-2 text-sm border border-purple-900/40 min-h-[44px]"
            >
              <Play className="w-4 h-4 text-purple-400 fill-purple-400/20" />
              <span>See How It Works</span>
            </a>
          </div>

          {/* Compact Trust Statistics — 3-column on mobile */}
          <div ref={statsRef} className="mt-6 sm:mt-16 grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3.5 w-full max-w-md sm:max-w-3xl">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="stat-item opacity-0 glass-card px-1.5 py-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center sm:justify-center gap-1.5 sm:gap-3 border border-purple-900/30 text-center sm:text-left"
                >
                  <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border ${stat.iconBg}`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.isStar ? 'fill-violet-400' : ''}`} />
                  </div>
                  <div className="sm:text-left">
                    <div className="text-[13px] sm:text-lg font-bold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] leading-tight">{stat.title}</div>
                    <div className="text-[11px] sm:text-xs text-[#A8A3B8] leading-snug">{stat.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
