import React from 'react';

export const MobilePreview: React.FC = () => {
  const basePath = (() => {
    const path = window.location.pathname;
    const trimmed = path.endsWith('/mobile-preview')
      ? path.slice(0, path.length - '/mobile-preview'.length)
      : path;
    return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
  })();

  const previewSrc = `${basePath}?in_preview=true`;

  return (
    <div className="relative w-full min-h-screen bg-[#07040F] flex items-center justify-center px-4 py-2 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-purple-900/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Full-height phone frame — 390px wide, extends to the screen length */}
      <div className="relative z-10 rounded-[46px] border border-purple-900/50 bg-[#0a0616] p-[10px] shadow-[0_30px_90px_-20px_rgba(139,92,246,0.35)]">
        {/* Bezel / notch strip */}
        <div className="h-[26px] flex items-center justify-center mb-1">
          <div className="w-24 h-[22px] rounded-full bg-black border border-purple-950/60" />
        </div>

        <div
          className="relative w-[390px] overflow-hidden rounded-[34px] bg-[#05030D]"
          style={{ height: 'calc(100dvh - 70px)' }}
        >
          <iframe
            src={previewSrc}
            title="ABTalks mobile preview"
            className="w-full h-full border-0"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
