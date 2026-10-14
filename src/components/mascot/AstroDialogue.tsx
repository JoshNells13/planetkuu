import React from 'react';
import { X, MessageSquare, Sparkles } from 'lucide-react';
import { AstroMascot } from './AstroMascot';
import { useGame } from '../../context/GameContext';

export const AstroDialogue: React.FC = () => {
  const { astroDialogue, dismissAstroMessage, showAstroMessage, openPanel } = useGame();

  const handleMascotClick = () => {
    if (!astroDialogue.visible) {
      showAstroMessage('Halo lagi! Ada yang ingin kamu tanyakan tentang tata surya? Coba pilih planet atau buka Misi!', 'waving');
    } else {
      openPanel('astro-talk');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 40,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '16px',
        pointerEvents: 'none',
        maxWidth: 'calc(100vw - 48px)',
      }}
    >
      {/* Clickable Mascot Figure */}
      <div style={{ pointerEvents: 'auto', flexShrink: 0 }}>
        <AstroMascot
          mood={astroDialogue.mood}
          size={100}
          isFloating
          onClick={handleMascotClick}
        />
      </div>

      {/* Contextual Dialogue Speech Bubble */}
      {astroDialogue.visible && (
        <div
          className="glass-panel-glow"
          style={{
            pointerEvents: 'auto',
            padding: '16px 20px',
            borderRadius: '20px',
            borderBottomLeftRadius: '4px',
            maxWidth: '380px',
            animation: 'floatBob 4s ease-in-out infinite',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fbbf24',
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={14} className="animate-spin-slow" />
              <span>Astro • Sahabat Penjelajah</span>
            </div>

            <button
              onClick={dismissAstroMessage}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              title="Tutup pesan Astro"
            >
              <X size={14} />
            </button>
          </div>

          {/* Dialogue Text */}
          <p
            style={{
              color: '#f8fafc',
              fontSize: '14.5px',
              lineHeight: 1.5,
              fontWeight: 500,
              margin: 0,
            }}
          >
            {astroDialogue.text}
          </p>

          {/* Quick Action Link */}
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
            }}
          >
            <button
              onClick={() => openPanel('astro-talk')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fbbf24',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '8px',
              }}
            >
              <MessageSquare size={13} />
              <span>Tanya Astro</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
