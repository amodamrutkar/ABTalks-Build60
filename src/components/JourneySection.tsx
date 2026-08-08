import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Code2, Hammer, GitCommit, Share2, Flame, Award } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

interface JourneyCard {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  accent: string;
}

const journeyCards: JourneyCard[] = [
  {
    step: 1,
    title: 'Choose Your Track',
    description: 'Pick AI, Full Stack, Mobile, Cloud, or Data Science and get a 60-day roadmap.',
    icon: Compass,
    accent: 'from-purple-600 to-fuchsia-500',
  },
  {
    step: 2,
    title: 'Get Your Daily Challenge',
    description: 'A real project spec lands at 9 AM sharp, every single day.',
    icon: Code2,
    accent: 'from-violet-600 to-purple-400',
  },
  {
    step: 3,
    title: 'Build Something',
    description: 'Ship production-grade code. No tutorials — only tangible builds.',
    icon: Hammer,
    accent: 'from-indigo-600 to-blue-500',
  },
  {
    step: 4,
    title: 'Commit to GitHub',
    description: 'Push your work and keep the contribution grid bright green.',
    icon: GitCommit,
    accent: 'from-blue-600 to-sky-500',
  },
  {
    step: 5,
    title: 'Share on LinkedIn',
    description: 'Post your demo and learnings to build your brand in public.',
    icon: Share2,
    accent: 'from-sky-600 to-cyan-500',
  },
  {
    step: 6,
    title: 'Build Your Streak',
    description: 'Consistency compounds. Unlock badges and climb the leaderboard.',
    icon: Flame,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    step: 7,
    title: 'Reach Day 60',
    description: 'Graduate with a verified portfolio and direct recruiter matches.',
    icon: Award,
    accent: 'from-emerald-600 to-teal-500',
  },
];

export const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const day1Ref = useRef<HTMLSpanElement>(null);
  const day60Ref = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const nodeEls = nodeRefs.current.filter(Boolean) as HTMLDivElement[];

    let centers: number[] = [];
    let span = 1;
    let activeIndex = -1;

    const measure = () => {
      const trackRect = track.getBoundingClientRect();
      centers = cardEls.map(
        (el) =>
          el.getBoundingClientRect().left - trackRect.left + el.getBoundingClientRect().width / 2
      );
      span = centers.length > 1 ? centers[1] - centers[0] : 1;
    };

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const onUpdate = (self: ScrollTrigger) => {
      const p = self.progress;
      const viewportCenter = p * getScrollAmount() + window.innerWidth / 2;

      let best = -1;
      let bestFocus = -1;

      cardEls.forEach((el, i) => {
        const dist = Math.abs(centers[i] - viewportCenter);
        const focus = Math.max(0, 1 - dist / span);
        const eased = Math.pow(focus, 0.65);
        if (eased > bestFocus) {
          bestFocus = eased;
          best = i;
        }
        const upcoming = centers[i] > viewportCenter;
        const rise = upcoming ? (1 - eased) * 180 : 0;
        gsap.set(el, { scale: 0.92 + 0.08 * eased, opacity: 0.45 + 0.55 * eased, y: rise });

        // Ambient glow on the active card (cyan/purple), stronger when focused
        const inner = el.querySelector<HTMLElement>('.journey-card-inner');
        if (inner) {
          const glow = Math.max(0, (eased - 0.55) / 0.45);
          gsap.set(inner, {
            borderColor: `rgba(168, 85, 247, ${(0.22 + 0.35 * glow).toFixed(3)})`,
            boxShadow: `0 0 ${(20 + 40 * glow).toFixed(1)}px -14px rgba(192, 132, 252, ${(0.22 * glow).toFixed(3)}), 0 0 ${(10 + 26 * glow).toFixed(1)}px -10px rgba(34, 211, 238, ${(0.16 * glow).toFixed(3)})`,
          });
        }
      });

      if (lineFillRef.current) {
        gsap.set(lineFillRef.current, { scaleX: p, transformOrigin: 'left center' });
      }

      if (best !== activeIndex) {
        activeIndex = best;
        nodeEls.forEach((node, i) => {
          const on = i === activeIndex;
          const passed = i <= activeIndex;
          gsap.set(node, {
            scale: on ? 1.35 : 1,
            backgroundColor: passed ? '#c084fc' : '#181133',
            borderColor: passed ? '#e9d5ff' : 'rgba(88, 28, 135, 0.6)',
            boxShadow: on
              ? '0 0 12px rgba(192, 132, 252, 0.9)'
              : passed
              ? '0 0 8px rgba(192, 132, 252, 0.45)'
              : 'none',
          });
        });
        if (day1Ref.current) {
          gsap.set(day1Ref.current, { color: activeIndex === 0 ? '#e9d5ff' : '#A8A3B8' });
        }
        if (day60Ref.current) {
          gsap.set(day60Ref.current, {
            color: activeIndex === cardEls.length - 1 ? '#e9d5ff' : '#A8A3B8',
          });
        }
      }

      if (bgGlowRef.current) {
        gsap.set(bgGlowRef.current, { x: (p - 0.5) * 80, opacity: 0.45 + p * 0.35 });
      }
    };

    const ctx = gsap.context(() => {
      measure();
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top+=40',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: measure,
          onUpdate,
        },
      });
      const st = tween.scrollTrigger as ScrollTrigger;
      onUpdate(st);
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [reducedMotion]);

  // Journey entrance: merged into scroll progress so there is no dead zone —
  // the heading and first card reveal continuously as the section rises and
  // finish exactly at the pin position where the horizontal travel begins.
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      const card0 = cardRefs.current[0];

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top 100%',
          end: 'top top+=40',
          scrub: 0.1,
        },
      });

      tl.fromTo(
        heading,
        { opacity: 0, y: 24, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }
      ).fromTo(
        card0,
        { opacity: 0, scale: 0.95, y: 20, filter: 'blur(4px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section
        id="journey"
        className="relative py-16 sm:py-24 bg-[#05030D] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-[28px] sm:text-5xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] tracking-tight">
              The 60-Day <span className="gradient-text-purple">Journey Flow</span>
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-[#A8A3B8]">
              Seven steps from picking your track to landing your next role.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {journeyCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="glass-card rounded-3xl p-6 border border-purple-900/30 bg-[#0F0A1F]/80 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.accent} flex items-center justify-center text-white shadow-lg`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#A8A3B8]">
                        Step 0{card.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] leading-tight">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#A8A3B8] leading-relaxed">{card.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center justify-between">
                    <span className="text-3xl font-black text-purple-950/70 font-['Plus_Jakarta_Sans']">
                      0{card.step}
                    </span>
                    <span className="text-xs font-mono text-[#6E687E]">Milestone</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-[#05030D] overflow-hidden flex flex-col min-h-screen"
    >
      {/* Evolving background glow */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] sm:w-[700px] sm:h-[700px] rounded-full bg-purple-900/30 blur-[120px]" />
      </div>

      {/* Header — pt-16 on mobile clears the fixed navbar while the section is pinned */}
      <div className="relative z-10 px-4 sm:px-8 pt-28 sm:pt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <h2
            ref={headingRef}
            className="text-2xl sm:text-4xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] tracking-tight"
          >
            The 60-Day <span className="gradient-text-purple">Journey Flow</span>
          </h2>
        </div>
      </div>

      {/* Horizontal card track */}
      <div className="relative z-10 flex-1 flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-3 sm:gap-8 px-[5vw] sm:px-[calc((100vw-400px)/2)] w-max will-change-transform"
        >
          {journeyCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="w-[82vw] max-w-[400px] sm:w-[400px] shrink-0 will-change-transform"
              >
                <TiltCard>
                  <div className="journey-card-inner glass-card rounded-3xl p-5 sm:p-6 border border-purple-900/30 bg-[#0F0A1F]/80 h-[300px] sm:h-[340px] flex flex-col justify-between overflow-hidden">
                    <div>
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.accent} flex items-center justify-center text-white shadow-lg`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="mt-5 text-[11px] font-mono uppercase tracking-widest text-[#A8A3B8]">
                        Step 0{card.step}
                      </div>
                      <h3 className="mt-1 text-2xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] leading-tight">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#A8A3B8] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#6E687E]">Milestone</span>
                      <span className="text-3xl font-black text-purple-950/70 font-['Plus_Jakarta_Sans']">
                        0{card.step}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress line: Day 1 -> Day 60 */}
      <div className="relative z-10 px-4 sm:px-8 pb-14 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative mx-1">
            <div className="h-1 bg-purple-950/50 rounded-full overflow-hidden">
              <div
                ref={lineFillRef}
                className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 rounded-full origin-left will-change-transform"
              />
            </div>
            {journeyCards.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-[#181133] border border-purple-800/60 will-change-transform"
                style={{
                  left: `${(i / (journeyCards.length - 1)) * 100}%`,
                  marginLeft: -5,
                  marginTop: -5,
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs font-mono">
            <span ref={day1Ref} className="text-[#A8A3B8]">
              Day 1
            </span>
            <span ref={day60Ref} className="text-[#A8A3B8]">
              Day 60
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
