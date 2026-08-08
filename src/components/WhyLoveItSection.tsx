import React, { useRef } from 'react';
import { Flame, FolderGit2, Users, Eye, Sparkles } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const WhyLoveItSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollReveal(sectionRef, {
    title: [pillRef, titleRef],
    description: descriptionRef,
    content: cardRefs,
  });
  const cards = [
    {
      icon: Flame,
      title: 'Consistency',
      highlight: 'Build habits. Not pressure.',
      description: 'Micro-commitments designed to fit into your busy schedule. 1 hour a day for 60 days changes everything.',
      color: 'from-purple-600 to-violet-500',
      badge: 'Habit Engine',
    },
    {
      icon: FolderGit2,
      title: 'Portfolio',
      highlight: 'Projects that speak.',
      description: 'Ship 60 unique, non-generic projects directly to your GitHub repository. Show real execution over theory.',
      color: 'from-violet-500 to-indigo-500',
      badge: 'Proof of Work',
    },
    {
      icon: Users,
      title: 'Community',
      highlight: "You're never building alone.",
      description: 'Join private Discord study groups, daily standups, code reviews, and pair programming sessions.',
      color: 'from-indigo-500 to-purple-600',
      badge: '18K+ Peer Network',
    },
    {
      icon: Eye,
      title: 'Visibility',
      highlight: 'Recruiters can see progress.',
      description: 'Turn your GitHub activity and LinkedIn feed into a recruiter magnet with high engagement templates.',
      color: 'from-purple-500 to-fuchsia-500',
      badge: 'Direct Recruiter Leads',
    },
  ];

  return (
    <section ref={sectionRef} id="why-us" className="relative py-12 sm:py-24 bg-[#05030D] border-t border-purple-900/30 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div ref={pillRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Why Students Love ABTalks</span>
          </div>
          <h2 ref={titleRef} className="text-[26px] sm:text-5xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
            Engineered for <span className="gradient-text-purple">Maximum Impact</span>
          </h2>
          <p ref={descriptionRef} className="mt-4 text-sm sm:text-lg text-[#A8A3B8]">
            Four pillars designed to eliminate burnout and propel you into your dream software engineering role.
          </p>
        </div>

        {/* 2x2 Grid of Pop-in Cards with subtle spring bounce */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
              >
                <TiltCard maxTilt={8}>
                  <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-900/30 hover:border-purple-500/40 relative overflow-hidden group h-full flex flex-col justify-between bg-[#0F0A1F]/80">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform group-hover:scale-110`}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#181133] border border-purple-900/40 text-xs font-mono text-slate-400">
                          {card.badge}
                        </span>
                      </div>

                      {/* Card Content */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] mb-1">
                        {card.title}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-purple-300 mb-3">
                        {card.highlight}
                      </div>

                      <p className="text-xs sm:text-sm text-[#A8A3B8] leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Pillar 0{idx + 1}</span>
                      <span className="text-purple-400 group-hover:translate-x-1 transition-transform inline-block">
                        Learn more &rarr;
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
