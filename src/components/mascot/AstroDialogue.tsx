import React from 'react';
import { X, MessageSquare, Sparkles, Compass } from 'lucide-react';
import { AstroMascot } from './AstroMascot';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const AstroDialogue: React.FC = () => {
  const { astroDialogue, dismissAstroMessage, showAstroMessage, openPanel, startGuidedTour } = useGame();
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMascotClick = () => {
    sound.playAstroBlip();
    if (!astroDialogue.visible) {
      showAstroMessage('Halo lagi! Ada yang ingin kamu tanyakan tentang tata surya? Coba pilih planet atau buka Misi!', 'waving');
    } else {
      openPanel('astro-talk');
    }
  };

  return (
    <div className="astro-dialogue-container">
      {/* Clickable Mascot Figure */}
      <div style={{ pointerEvents: 'auto', flexShrink: 0 }}>
        <AstroMascot
          mood={astroDialogue.mood}
          size={isMobile ? 70 : 96}
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
            padding: isMobile ? '12px 14px' : '16px 20px',
            borderRadius: '20px',
            borderBottomLeftRadius: '4px',
            maxWidth: isMobile ? 'calc(100vw - 110px)' : '380px',
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
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <button
              onClick={() => {
                dismissAstroMessage();
                startGuidedTour();
              }}
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                border: 'none',
                color: '#000000',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)',
              }}
            >
              <Compass size={13} />
              <span>Ajak Berkeliling!</span>
            </button>

            <button
              onClick={() => openPanel('astro-talk')}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
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
