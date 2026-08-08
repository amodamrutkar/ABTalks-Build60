import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedTrack?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "Start Your 60-Day Challenge",
  selectedTrack = "Full Stack",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#05030D]/85 backdrop-blur-md"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg overflow-y-auto max-h-[92dvh] rounded-2xl glass-card border border-purple-500/30 p-5 md:p-8 shadow-2xl shadow-purple-950/60 bg-[#130D26]/95"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-900/30">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#F5F3FF]">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#181133] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-4">
              <p className="text-sm text-[#A8A3B8]">
                You're joining the <span className="font-semibold text-purple-300">{selectedTrack} Track</span>. Prepare to build 60 projects in 60 days, push commits to GitHub, and document your growth.
              </p>

              <div className="space-y-3 bg-[#0F0A1F]/80 p-4 rounded-xl border border-purple-900/40">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F3FF]">Instant Access to Prompts</h4>
                    <p className="text-xs text-[#A8A3B8]">Daily curated projects designed to showcase real skills.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F3FF]">Automated GitHub & LinkedIn Tracker</h4>
                    <p className="text-xs text-[#A8A3B8]">Keep your streak green and grow your professional presence.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F3FF]">18K+ Builder Network</h4>
                    <p className="text-xs text-[#A8A3B8]">Connect with peer devs, get code reviews & recruiter intros.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert(`Welcome to ABTalks! Your ${selectedTrack} journey has begun.`); onClose(); }} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#A8A3B8] mb-1">GitHub Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. octocat"
                    className="w-full px-4 py-3 rounded-xl bg-[#070414] border border-purple-900/40 text-[#F5F3FF] text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 min-h-[44px]"
                  />
                </div>

                <MagneticButton type="submit" className="w-full py-3.5 mt-4 text-base min-h-[44px]">
                  <span>Confirm Track & Launch</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
