import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingOverlayProps {
  onComplete?: () => void;
}

/**
 * Premium Minimal Loading Animation (Seamless Hero Handoff)
 *
 * Sequence:
 * 0.0s – 0.3s: Orb fades in on Day 1
 * 0.3s – 1.3s: Orb travels with ease-in-out drawing luminous white line toward Day 60
 * 1.3s – 1.45s: Completed line holds for 150ms
 * 1.45s – 1.6s: Glow intensity and line opacity gradually reduce
 * 1.6s: Trigger onComplete to emerge hero background
 * 1.6s – 2.2s: Loading overlay smoothly fades out over 600ms
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('loading-lock');

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const geo = { startX: 4, endX: 100, y: 12 };

    const measure = () => {
      if (!trackRef.current) return;
      const r = trackRef.current.getBoundingClientRect();
      geo.startX = 4;
      geo.endX = Math.max(4, r.width - 4);
      geo.y = r.height / 2;
    };

    const state = { travel: 0, lineAlpha: 1.0, glowWidth: 7 };
    const orb = orbRef.current!;
    const setOrbX = gsap.quickSetter(orb, 'x', 'px');

    const draw = () => {
      if (!canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      if (state.travel <= 0) return;

      const currentX = geo.startX + (geo.endX - geo.startX) * state.travel;

      // 1. Soft white outer bloom pass (gradually reduces intensity)
      const glowAlpha = 0.28 * state.lineAlpha;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineCap = 'round';
      ctx.globalAlpha = glowAlpha;
      ctx.lineWidth = state.glowWidth;
      ctx.beginPath();
      ctx.moveTo(geo.startX, geo.y);
      ctx.lineTo(currentX, geo.y);
      ctx.stroke();

      // 2. Crisp Pure White Core Line
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = state.lineAlpha;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(geo.startX, geo.y);
      ctx.lineTo(currentX, geo.y);
      ctx.stroke();

      ctx.globalAlpha = 1;
    };

    const fit = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure();
      draw();
    };

    fit();
    window.addEventListener('resize', fit);

    const tl = gsap.timeline({
      onUpdate: () => {
        const cx = geo.startX + (geo.endX - geo.startX) * state.travel;
        setOrbX(cx - 4);
        draw();
      },
      onComplete: () => {
        setGone(true);
      },
    });

    gsap.set(orb, { x: geo.startX - 4, opacity: 0 });

    // 0.0s – 0.3s: Orb fades in at Day 1
    tl.fromTo(
      orb,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
      0
    )

      // 0.3s – 1.3s: Orb travels over 1.0s drawing luminous line
      .to(
        state,
        {
          travel: 1,
          duration: 1.0,
          ease: 'power2.inOut',
          onStart: measure,
        },
        0.3
      )

      // 1.3s – 1.45s: Hold completed line for 150ms
      .to(state, { travel: 1, duration: 0.15 }, 1.3)

      // 1.45s – 1.6s: Gradually reduce glow intensity and line opacity
      .to(
        state,
        { lineAlpha: 0.2, glowWidth: 3, duration: 0.15, ease: 'power1.in' },
        1.45
      )
      .to(orb, { opacity: 0, duration: 0.15 }, 1.45)

      // 1.6s: Invoke onComplete to emerge hero background & start content sequence
      .call(() => {
        onComplete?.();
      }, undefined, 1.6)

      // 1.6s – 2.2s: Loading overlay background slowly fades away over 600ms
      .to(
        rootRef.current,
        { opacity: 0, duration: 0.6, ease: 'power1.inOut' },
        1.6
      );

    return () => {
      document.documentElement.classList.remove('loading-lock');
      window.removeEventListener('resize', fit);
      tl.kill();
    };
  }, [onComplete]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] bg-[#05030D] flex items-center justify-center pointer-events-none will-change-[opacity]"
      aria-hidden="true"
    >
      {/* Centered container occupying ~55-65% screen width */}
      <div className="flex items-center justify-between w-[60vw] min-w-[260px] max-w-[420px] gap-3 sm:gap-5 px-2">
        <span
          className="text-[#F8FAFC] font-semibold text-sm sm:text-base tracking-tight font-['Outfit'] select-none shrink-0"
        >
          Day 1
        </span>

        <div ref={trackRef} className="relative flex-1 h-6 flex items-center">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
          <div
            ref={orbRef}
            className="absolute w-2 h-2 rounded-full opacity-0 pointer-events-none will-change-transform bg-white"
            style={{
              left: 0,
              top: '50%',
              marginTop: -4,
              boxShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)',
            }}
          />
        </div>

        <span
          className="text-[#F8FAFC] font-semibold text-sm sm:text-base tracking-tight font-['Outfit'] select-none shrink-0"
        >
          Day 60
        </span>
      </div>
    </div>
  );
};
