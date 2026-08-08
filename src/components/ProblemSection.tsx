import React from 'react';
import { motion } from 'framer-motion';
import { UserX, UserCheck, AlertCircle, CheckCircle2, Zap, ArrowDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="relative py-12 sm:py-24 bg-[#05030D] overflow-hidden border-t border-purple-900/30">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>The Cold Truth About Hiring</span>
          </div>
          <h2 className="text-[26px] sm:text-5xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
            Talent gets you noticed once.{' '}
            <span className="gradient-text-purple">Consistency gets you remembered.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-[#A8A3B8]">
            Every year, millions of developers post identical PDF resumes. Here is how you stand out from the noise.
          </p>
        </div>

        {/* Side-by-Side Comparison Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* Central Glowing Divider Line (Visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-purple-500/60 to-transparent z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#05030D] border border-purple-500 flex items-center justify-center text-purple-300 font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              VS
            </div>
          </div>

          {/* Card 1: Student A (Standard Applicant) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-900/30 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity bg-[#0F0A1F]/60"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-purple-900/30 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#130D26] border border-purple-900/40 flex items-center justify-center text-slate-400">
                    <UserX className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-200">Student A</h3>
                    <p className="text-xs text-slate-500">Standard Applicant</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#181133] text-slate-400 text-xs font-mono">PDF Resume</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0A1F]/80 border border-purple-900/30">
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-300">"Knows React"</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0A1F]/80 border border-purple-900/30">
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-300">"Knows Python"</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0A1F]/80 border border-purple-900/30">
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-300">"Good Resume"</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-900/30 text-xs text-slate-500 text-center font-mono">
              Result: 0 Public Proof &bull; Lost in Inbox
            </div>
          </motion.div>

          {/* Card 2: Student B (ABTalks Highlighted) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-purple-500/50 relative overflow-hidden shadow-2xl shadow-purple-950/40 flex flex-col justify-between bg-[#130D26]/90"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-purple-900/40 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F5F3FF] flex items-center gap-2">
                      Student B <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">ABTalks</span>
                    </h3>
                    <p className="text-xs text-purple-300">60-Day Proof of Work</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
                  🔥 Active Streak
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0A1F]/90 border border-purple-500/30 shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm font-semibold text-[#F5F3FF]">"120 GitHub Commits"</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0A1F]/90 border border-purple-500/30 shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm font-semibold text-[#F5F3FF]">"60 LinkedIn Posts"</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0A1F]/90 border border-purple-500/30 shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm font-semibold text-[#F5F3FF]">"Daily Projects"</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-900/40 text-xs text-purple-300 text-center font-mono font-semibold">
              Result: Inbound Recruiter DMs &bull; Verified Portfolio
            </div>
          </motion.div>
        </div>

        {/* Punchline Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 px-5 sm:px-6 py-4 rounded-2xl glass-card border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.25)] max-w-xl mx-auto">
            <span className="text-lg sm:text-2xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans']">
              Then... Guess who recruiters notice first?
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A8A3B8]">
              <span>Scroll to see the 60-day roadmap</span>
              <ArrowDown className="w-4 h-4 text-purple-400 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
