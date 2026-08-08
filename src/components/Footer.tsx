import React from 'react';
import { Github, Linkedin, Twitter, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030208] border-t border-purple-900/30 pt-12 pb-10 sm:pt-16 sm:pb-12 text-[#A8A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-purple-900/30">
          {/* Brand Info (Col 1 & 2) */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-500 flex items-center justify-center font-black text-white text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                AB
              </div>
              <span className="text-2xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] text-[#F5F3FF]">
                AB<span className="text-purple-400">Talks</span>
              </span>
            </a>
            <p className="text-xs text-[#A8A3B8] max-w-sm leading-relaxed">
              ABTalks is a global 60-day challenge helping developers build daily consistency, ship verified GitHub projects, and attract top recruiters.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F0A1F] border border-purple-900/40 text-slate-400 hover:text-purple-300 hover:border-purple-800/60 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F0A1F] border border-purple-900/40 text-slate-400 hover:text-purple-300 hover:border-purple-800/60 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F0A1F] border border-purple-900/40 text-slate-400 hover:text-purple-300 hover:border-purple-800/60 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F0A1F] border border-purple-900/40 text-slate-400 hover:text-purple-300 hover:border-purple-800/60 transition-colors"
                aria-label="Discord Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-slate-200 tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#problem" className="hover:text-purple-300 transition-colors">Why 60 Days</a></li>
              <li><a href="#journey" className="hover:text-purple-300 transition-colors">Journey Flow</a></li>
              <li><a href="#why-us" className="hover:text-purple-300 transition-colors">Features</a></li>
              <li><a href="#compass" className="hover:text-purple-300 transition-colors">Career Compass</a></li>
              <li><a href="#social-proof" className="hover:text-purple-300 transition-colors">Wall of Fame</a></li>
            </ul>
          </div>

          {/* Tracks */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-slate-200 tracking-wider mb-4">
              Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#compass" className="hover:text-purple-300 transition-colors">AI Engineering</a></li>
              <li><a href="#compass" className="hover:text-purple-300 transition-colors">Full Stack Web</a></li>
              <li><a href="#compass" className="hover:text-purple-300 transition-colors">Mobile App Dev</a></li>
              <li><a href="#compass" className="hover:text-purple-300 transition-colors">Cloud & DevOps</a></li>
              <li><a href="#compass" className="hover:text-purple-300 transition-colors">Data Science</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-slate-200 tracking-wider mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors flex items-center gap-1">Community Discord <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ABTalks Dev Platform. All rights reserved.
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            Build Every Day &bull; Become Impossible to Ignore
          </div>
        </div>
      </div>
    </footer>
  );
};
