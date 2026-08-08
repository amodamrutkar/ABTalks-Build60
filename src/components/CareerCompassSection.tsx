import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Bot, Globe, Smartphone, Cloud, BarChart3, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';


interface TrackInfo {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  timeline: { week: string; topic: string; detail: string }[];
}

const tracks: TrackInfo[] = [
  {
    id: 'AI Engineer',
    name: 'AI Engineer',
    icon: Bot,
    description: 'Master LLMs, PyTorch, OpenAI APIs, and build production AI agents.',
    timeline: [
      { week: 'Week 1', topic: 'Python & NumPy Foundations', detail: 'Vector mathematics, data structures & clean API scripting.' },
      { week: 'Week 3', topic: 'Machine Learning Core', detail: 'Scikit-learn models, regression, classification & validation.' },
      { week: 'Week 5', topic: 'Fraud Detection & LLM Agents', detail: 'RAG pipelines, LangChain, embeddings & vector databases.' },
      { week: 'Week 8', topic: 'Production AI Portfolio', detail: 'Deploy 4 full-stack AI applications with live endpoints.' },
    ],
  },
  {
    id: 'Full Stack',
    name: 'Full Stack',
    icon: Globe,
    description: 'Master React, Next.js, Node.js, PostgreSQL, and serverless deployments.',
    timeline: [
      { week: 'Week 1', topic: 'TypeScript & React Architecture', detail: 'State management, custom hooks, and Tailwind design systems.' },
      { week: 'Week 3', topic: 'Node.js & Next.js REST/GraphQL', detail: 'Authentication, database schemas, Prismic & Prisma ORM.' },
      { week: 'Week 5', topic: 'Microservices & Real-time WebSockets', detail: 'Redis caching, WebSockets, payment gateways (Stripe).' },
      { week: 'Week 8', topic: 'Full Stack SaaS Portfolio', detail: 'Ship 3 complete SaaS applications with user auth & billing.' },
    ],
  },
  {
    id: 'App Developer',
    name: 'App Developer',
    icon: Smartphone,
    description: 'Build native cross-platform mobile apps for iOS and Android.',
    timeline: [
      { week: 'Week 1', topic: 'React Native / Expo Essentials', detail: 'UI layout systems, gesture handlers & navigation routing.' },
      { week: 'Week 3', topic: 'Native Device APIs & State', detail: 'Camera, geolocation, SQLite offline sync & Push Notifications.' },
      { week: 'Week 5', topic: 'Offline-First Fitness Tracker', detail: 'Building resilient offline mobile architectures & animations.' },
      { week: 'Week 8', topic: 'App Store Portfolio', detail: 'Publish mobile apps to App Store & Google Play sandbox.' },
    ],
  },
  {
    id: 'Cloud',
    name: 'Cloud Architect',
    icon: Cloud,
    description: 'Master Docker, Kubernetes, AWS, Terraform, and DevOps CI/CD pipelines.',
    timeline: [
      { week: 'Week 1', topic: 'Linux & Docker Containerization', detail: 'Shell scripting, multi-stage builds & container security.' },
      { week: 'Week 3', topic: 'AWS Services & Infrastructure as Code', detail: 'EC2, S3, Lambda, VPCs, and Terraform orchestration.' },
      { week: 'Week 5', topic: 'Kubernetes & CI/CD Pipelines', detail: 'GitHub Actions, Helm charts, automated zero-downtime deploys.' },
      { week: 'Week 8', topic: 'Enterprise Infra Portfolio', detail: 'Architect automated cloud infrastructure for high scale.' },
    ],
  },
  {
    id: 'Data Science',
    name: 'Data Science',
    icon: BarChart3,
    description: 'Master SQL, Pandas, statistical modeling, data visualization, and ETL.',
    timeline: [
      { week: 'Week 1', topic: 'SQL & Data Wrangling', detail: 'Advanced joins, window functions & Pandas data manipulation.' },
      { week: 'Week 3', topic: 'Statistical Modeling & EDA', detail: 'Hypothesis testing, exploratory analysis & Plotly dashboards.' },
      { week: 'Week 5', topic: 'Automated Analytics Engine', detail: 'Building end-to-end data pipelines & Airflow workflows.' },
      { week: 'Week 8', topic: 'Enterprise Data Portfolio', detail: 'Publish interactive data dashboards & machine learning insights.' },
    ],
  },
];

export const CareerCompassSection: React.FC = () => {
  const [selectedTrackId, setSelectedTrackId] = useState('Full Stack');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const selectedTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[1];

  useScrollReveal(containerRef, {
    title: [pillRef, titleRef],
    description: descriptionRef,
    content: [buttonsRef, timelineRef],
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="compass"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-12 sm:py-28 bg-[#05030D] overflow-hidden border-t border-purple-900/30"
    >
      {/* Focused Spotlight Overlay Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.18), transparent 80%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div ref={pillRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Tool &bull; Career Compass</span>
          </div>
          <h2 ref={titleRef} className="text-[28px] sm:text-5xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">
            Where do you want to be in <span className="gradient-text-purple">one year?</span>
          </h2>
          <p ref={descriptionRef} className="mt-4 text-base sm:text-lg text-[#A8A3B8]">
            Select a career track below to reveal your custom 60-day roadmap and project milestones.
          </p>
        </div>

        {/* Interactive Track Buttons Row / Grid */}
        <div ref={buttonsRef} className="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-visible sm:flex-wrap sm:justify-center mb-6 sm:mb-12">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = track.id === selectedTrackId;

            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrackId(track.id)}
                className={`shrink-0 min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300 border-purple-500/60 shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105'
                    : 'bg-[#0F0A1F]/80 text-slate-400 border-purple-900/30 hover:text-slate-200 hover:bg-[#130D26]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                <span>{track.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Timeline Container */}
        <div ref={timelineRef} className="glass-card rounded-3xl p-5 sm:p-10 border border-purple-900/30 shadow-2xl relative overflow-hidden bg-[#0F0A1F]/90">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-purple-900/30 mb-8 gap-4">
            <div>
              <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1">
                Selected Track
              </div>
              <h3 className="text-2xl font-extrabold text-[#F5F3FF] font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                {selectedTrack.name} Path
              </h3>
              <p className="text-sm text-[#A8A3B8] mt-1">{selectedTrack.description}</p>
            </div>
          </div>

          {/* Timeline View (4 Milestone Cards) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTrack.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {selectedTrack.timeline.map((item, idx) => (
                <div
                  key={item.week}
                  className="bg-[#130D26]/80 rounded-2xl p-5 border border-purple-900/30 hover:border-purple-500/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[11px] font-mono font-bold border border-purple-500/20">
                        {item.week}
                      </span>
                      <span className="text-slate-500 font-mono text-xs">Phase 0{idx + 1}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#F5F3FF] mb-2">{item.topic}</h4>
                    <p className="text-[13px] sm:text-xs text-[#A8A3B8] leading-relaxed">{item.detail}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center gap-1.5 text-purple-400 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Project Milestone</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
