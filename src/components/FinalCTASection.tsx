import React, { useRef } from 'react';
import { ArrowRight, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FinalCTASectionProps {
  onOpenModal: (track?: string) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, {
    title: [pillRef, titleRef],
    description: descriptionRef,
    content: [buttonsRef, badgesRef],
  });

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-32 bg-[#05030D] border-t border-purple-900/30 overflow-hidden text-center">
      {/* Dark Starfield Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-900/30 via-violet-600/20 to-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Completed Journey Path Line Running Across Section */}
      <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.6)] animate-ping" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-5 sm:p-14 border border-purple-500/30 shadow-2xl shadow-purple-950/60 relative overflow-hidden bg-[#130D26]/90">
          {/* Top Pill */}
          <div ref={pillRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-purple-500/30 text-xs font-mono text-purple-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Next Cohort Starts Monday &bull; Limited Spots</span>
          </div>

          {/* Headline */}
          <h2 ref={titleRef} className="text-[28px] sm:text-5xl md:text-6xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
            You've already taken the first step.{' '}
            <span className="gradient-text-purple">Ready for the next 60?</span>
          </h2>

          <p ref={descriptionRef} className="mt-6 text-base sm:text-lg text-[#A8A3B8] max-w-xl mx-auto leading-relaxed">
            Join 18,000+ software engineers building production apps daily. Transform your GitHub grid, LinkedIn authority, and resume today.
          </p>

          {/* Primary & Secondary Buttons */}
          <div ref={buttonsRef} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenModal()}
              className="w-full sm:w-auto px-9 py-4 text-base font-bold min-h-[44px]"
            >
              <span>Start My Journey</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </MagneticButton>

            <a
              href="#journey"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white glass-pill hover:bg-[#181133] transition-all flex items-center justify-center gap-2 text-sm border border-purple-900/40 min-h-[44px]"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Explore Challenges</span>
            </a>
          </div>

          {/* Guarantee / Info Badges */}
          <div ref={badgesRef} className="mt-10 pt-6 border-t border-purple-900/30 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" /> No credit card required to start
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" /> 100% Free Daily Prompts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" /> Recruiter Verified Portfolio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
