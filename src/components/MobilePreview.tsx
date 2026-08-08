import React, { useState } from 'react';
import { RefreshCw, ExternalLink, Smartphone } from 'lucide-react';

const PREVIEW_WIDTH = 390;
const PREVIEW_HEIGHT = 840;

export const MobilePreview: React.FC = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [reloading, setReloading] = useState(false);

  const basePath = (() => {
    const path = window.location.pathname;
    const trimmed = path.endsWith('/mobile-preview')
      ? path.slice(0, path.length - '/mobile-preview'.length)
      : path;
    return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
  })();

  const previewSrc = `${basePath}?in_preview_mode=true`;

  const handleReload = () => {
    setReloading(true);
    setReloadKey((k) => k + 1);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#07040F] text-[#F5F3FF]">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-purple-900/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold font-['Plus_Jakarta_Sans'] leading-tight">
                  ABTalks <span className="gradient-text-purple">Mobile Preview</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-[10px] font-mono text-purple-300 border border-purple-500/25 uppercase tracking-wider">
                  Dev Only
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#A8A3B8] mt-0.5">
                Simulated {PREVIEW_WIDTH} &times; {PREVIEW_HEIGHT} viewport &bull; loads the live app
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F0A1F] border border-purple-900/40 text-xs font-semibold text-slate-300 hover:text-purple-300 hover:border-purple-800/60 transition-colors min-h-[44px]"
            >
              <RefreshCw className={`w-4 h-4 ${reloading ? 'animate-spin' : ''}`} />
              Reload
            </button>
            <a
              href={previewSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F0A1F] border border-purple-900/40 text-xs font-semibold text-slate-300 hover:text-purple-300 hover:border-purple-800/60 transition-colors min-h-[44px]"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Tab
            </a>
          </div>
        </div>

        {/* Device frame — the iframe inside keeps an exact 390x840 layout viewport */}
        <div className="preview-device-scale">
          <div className="rounded-[46px] border border-purple-900/50 bg-[#0a0616] p-[10px] shadow-[0_30px_90px_-20px_rgba(139,92,246,0.35)]">
            {/* Bezel / notch strip */}
            <div className="h-[26px] flex items-center justify-center mb-1">
              <div className="w-24 h-[22px] rounded-full bg-black border border-purple-950/60" />
            </div>

            <div
              key={reloadKey}
              className="relative w-[390px] h-[840px] overflow-hidden rounded-[34px] bg-[#05030D]"
            >
              <iframe
                src={previewSrc}
                title="ABTalks mobile preview"
                className="w-full h-full border-0"
                loading="eager"
                onLoad={() => setReloading(false)}
              />
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-md text-center text-xs font-mono text-[#6E687E] leading-relaxed">
          The real application renders inside this frame at exactly {PREVIEW_WIDTH} &times;{' '}
          {PREVIEW_HEIGHT} px — scroll, tap and interact exactly as on a phone.
        </p>
      </div>
    </div>
  );
};

export default MobilePreview;
