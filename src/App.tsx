import React, { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'framer-motion';

import { LoadingOverlay } from './components/LoadingOverlay';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { WhyLoveItSection } from './components/WhyLoveItSection';
import { CareerCompassSection } from './components/CareerCompassSection';
import { SocialProofSection } from './components/SocialProofSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { Modal } from './components/ui/Modal';
import { MobilePreview } from './components/MobilePreview';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Full Stack');
  const [loadingFinished, setLoadingFinished] = useState(false);

  // Lightweight native routing: /mobile-preview (top-level only) renders the
  // simulated mobile viewport instead of the main app, so Lenis never runs on
  // the preview page and scrolling happens only inside the iframe.
  const isMobilePreview =
    typeof window !== 'undefined' &&
    window.location.pathname === '/mobile-preview' &&
    window.self === window.top;

  const handleLoadingComplete = useCallback(() => setLoadingFinished(true), []);

  // Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    if (isMobilePreview) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [isMobilePreview]);

  const handleOpenModal = (track: string = 'Full Stack') => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isMobilePreview) {
    return <MobilePreview />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#05030D] text-[#F5F3FF] selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* 0. Loading Overlay (< 800ms) */}
      <LoadingOverlay onComplete={handleLoadingComplete} />

      {/* 1. Header Navigation */}
      <Navbar ready={loadingFinished} onOpenModal={handleOpenModal} />

      {/* Main Page Content */}
      <main className="relative z-10 w-full">
        {/* Section 1: Hero */}
        <HeroSection reveal={loadingFinished} onOpenModal={() => handleOpenModal()} />

        {/* Section 2: 60-Day Journey — continuous transition straight from the Hero */}
        <JourneySection />

        {/* Section 4: Why Students Love ABTalks */}
        <WhyLoveItSection />

        {/* Section 5: Career Compass */}
        <CareerCompassSection />

        {/* Section 6: Social Proof & Rotated Card Deck */}
        <SocialProofSection />

        {/* Section 7: Final CTA */}
        <FinalCTASection onOpenModal={handleOpenModal} />
      </main>

      {/* Section 8: Footer */}
      <Footer />

      {/* Interactive Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedTrack={selectedTrack}
      />
      </div>
    </MotionConfig>
  );
}

export default App;
