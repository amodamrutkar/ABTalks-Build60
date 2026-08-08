import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

interface NavbarProps {
  onOpenModal: (track?: string) => void;
  ready?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, ready = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why 60 Days', href: '#problem' },
    { name: 'Journey', href: '#journey' },
    { name: 'Features', href: '#why-us' },
    { name: 'Career Compass', href: '#compass' },
    { name: 'Wall of Fame', href: '#social-proof' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05030D]/85 backdrop-blur-xl border-b border-purple-900/30 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-3 sm:py-5'
      } ${
        ready
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo (left) */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-500 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:scale-105 transition-transform">
            AB
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight font-['Plus_Jakarta_Sans'] flex items-center gap-1">
              <span id="nav-brand-text" className="wordmark-gradient">ABTalks</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-slate-400 whitespace-nowrap">60-Day Challenge</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#0F0A1F]/70 border border-purple-900/40 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-purple-300 rounded-full hover:bg-purple-950/40 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Login / Auth Button */}
          <button
            onClick={() => onOpenModal('Login')}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#181133] rounded-xl border border-purple-900/40 transition-colors min-h-[44px]"
          >
            Sign In
          </button>

          {/* Primary CTA */}
          <MagneticButton
            onClick={() => onOpenModal()}
            className="px-4 py-2 text-xs min-h-[44px]"
          >
            <span>Start Challenge</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#0F0A1F] border border-purple-900/40 text-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#05030D]/95 backdrop-blur-2xl border-b border-purple-900/40 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-sm font-medium text-slate-200 hover:text-purple-300 rounded-lg hover:bg-[#130D26] min-h-[44px] flex items-center"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-purple-900/40 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenModal('Login'); }}
              className="w-full py-3 text-xs font-semibold text-slate-300 border border-purple-900/40 rounded-xl min-h-[44px]"
            >
              Sign In
            </button>
            <MagneticButton
              onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}
              className="w-full py-3 text-xs min-h-[44px]"
            >
              <span>Start Challenge</span>
            </MagneticButton>
          </div>
        </div>
      )}
    </header>
  );
};
