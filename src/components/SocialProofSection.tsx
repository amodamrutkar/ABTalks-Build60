import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ChevronLeft, Quote, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  stats: string;
  commits: number;
  rotation: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Full Stack Engineer',
    company: 'Amazon',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'ABTalks completely reshaped my discipline. Pushing commits for 60 consecutive days gave me more real proof than 4 years of college.',
    stats: 'Landed $120k Amazon Offer',
    commits: 142,
    rotation: -2,
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Frontend Developer',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    quote: 'Recruiters started reaching out to ME on LinkedIn because my feed was packed with daily video demos of working apps. Day 45 changed everything.',
    stats: '3 Inbound Recruiter DMs/wk',
    commits: 118,
    rotation: 3,
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    role: 'AI / ML Engineer',
    company: 'Google Intern',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'The Career Compass track gave me exact projects that hiring managers wanted. By Day 60, my portfolio was unmatchable.',
    stats: 'Cleared Google Technical Round',
    commits: 156,
    rotation: -3,
  },
  {
    id: 4,
    name: 'Ananya Desai',
    role: 'Software Engineer',
    company: 'Microsoft',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote: 'Consistency is a superpower. Having an active community doing standups with me kept me accountable when work got busy.',
    stats: 'Promoted to L4 Engineer',
    commits: 130,
    rotation: 2,
  },
];

export const SocialProofSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="social-proof" className="relative py-12 sm:py-28 bg-[#05030D] border-t border-purple-900/30 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Wall of Fame &bull; Proven Impact</span>
          </div>
          <h2 className="text-[28px] sm:text-5xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
            Proven by <span className="gradient-text-purple">18,000+ Builders</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A8A3B8]">
            Real developers who completed the 60-day challenge and transformed their career trajectory.
          </p>
        </div>

        {/* Stacked Rotated Card Deck Container */}
        <div className="relative min-h-[380px] max-w-xl mx-auto flex items-center justify-center mb-12">
          {testimonials.map((item, idx) => {
            const offset = (idx - activeIndex + testimonials.length) % testimonials.length;
            const isTop = offset === 0;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  scale: isTop ? 1 : 1 - offset * 0.05,
                  y: isTop ? 0 : offset * 12,
                  rotate: isTop ? 0 : item.rotation,
                  opacity: offset > 2 ? 0 : 1 - offset * 0.2,
                  zIndex: testimonials.length - offset,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                onClick={() => isTop && handleNext()}
                className={`absolute inset-x-0 mx-auto glass-card rounded-3xl p-5 sm:p-8 border cursor-pointer select-none ${
                  isTop
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-950/60 bg-[#130D26]/95'
                    : 'border-purple-900/30 bg-[#0F0A1F]/80'
                }`}
              >
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-purple-300 fill-purple-300" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-purple-500/30" />
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-lg text-[#F5F3FF] font-medium italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>

                {/* Student Info & Company Badge */}
                <div className="pt-6 border-t border-purple-900/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/40"
                    />
                    <div>
                      <h4 className="text-base font-bold text-[#F5F3FF]">{item.name}</h4>
                      <p className="text-xs text-[#A8A3B8]">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono font-bold flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {item.company}
                    </span>
                    <span className="text-[11px] font-mono text-purple-300 mt-1">
                      {item.commits} GitHub Commits
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deck Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-16">
          <button
            onClick={handlePrev}
            className="min-h-[44px] min-w-[44px] p-3 rounded-full bg-[#0F0A1F] border border-purple-900/40 text-slate-300 hover:text-purple-300 hover:border-purple-800/60 transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-slate-400">
            Tap card or arrows ({activeIndex + 1} / {testimonials.length})
          </span>
          <button
            onClick={handleNext}
            className="min-h-[44px] min-w-[44px] p-3 rounded-full bg-[#0F0A1F] border border-purple-900/40 text-slate-300 hover:text-purple-300 hover:border-purple-800/60 transition-colors"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Key Metrics Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8 sm:pt-10 border-t border-purple-900/30 max-w-4xl mx-auto text-center">
          <div className="p-3 sm:p-4 rounded-2xl glass-card border border-purple-900/30">
            <div className="text-lg sm:text-3xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] gradient-text-purple">
              18,000+
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">Active Students Enrolled</div>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl glass-card border border-purple-900/30">
            <div className="text-lg sm:text-3xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] gradient-text-purple">
              92%
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">Challenge Graduation Rate</div>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl glass-card border border-purple-900/30">
            <div className="text-lg sm:text-3xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] gradient-text-purple">
              350,000+
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">Total GitHub Commits Pushed</div>
          </div>
        </div>
      </div>
    </section>
  );
};
