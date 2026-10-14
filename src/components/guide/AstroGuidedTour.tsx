import React, { useEffect, useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Info,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { ASTRO_TOUR_STOPS } from '../../data/tour';
import { AstroMascot } from '../mascot/AstroMascot';
import { astroVoice } from '../../utils/speech';
import { sound } from '../../utils/sound';

export const AstroGuidedTour: React.FC = () => {
  const {
    isTourActive,
    tourStepIndex,
    isTourAutoplay,
    nextTourStop,
    prevTourStop,
    goToTourStop,
    stopGuidedTour,
    toggleTourAutoplay,
  } = useGame();

  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [autoplayProgress, setAutoplayProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentStop = ASTRO_TOUR_STOPS[tourStepIndex] || ASTRO_TOUR_STOPS[0];
  const isFirst = tourStepIndex === 0;
  const isLast = tourStepIndex === ASTRO_TOUR_STOPS.length - 1;

  // Handle Autoplay countdown progress
  useEffect(() => {
    if (!isTourActive || !isTourAutoplay) {
      setAutoplayProgress(0);
      return;
    }

    const interval = 100; // update progress every 100ms
    const totalDuration = 10000; // 10s per stop
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setAutoplayProgress(Math.min(100, Math.round((elapsed / totalDuration) * 100)));

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        nextTourStop();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isTourActive, isTourAutoplay, tourStepIndex, nextTourStop]);

  // Handle Voice Narration when stop changes
  useEffect(() => {
    if (!isTourActive) {
      astroVoice.stop();
      return;
    }

    if (voiceEnabled) {
      astroVoice.speak(currentStop.astroSpeech);
    } else {
      astroVoice.stop();
    }
  }, [isTourActive, tourStepIndex, voiceEnabled, currentStop.astroSpeech]);

  const handleToggleVoice = () => {
    sound.playClick();
    const nextVal = !voiceEnabled;
    setVoiceEnabled(nextVal);
    astroVoice.setEnabled(nextVal);
    if (!nextVal) {
      astroVoice.stop();
    } else {
      astroVoice.speak(currentStop.astroSpeech);
    }
  };

  const handleReplayVoice = () => {
    sound.playClick();
    astroVoice.stop();
    astroVoice.speak(currentStop.astroSpeech);
  };

  if (!isTourActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '20px',
      }}
    >
      {/* Top Floating Tour Banner Indicator */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '66px' : '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '8px' : '12px',
          padding: isMobile ? '6px 14px' : '8px 20px',
          borderRadius: '999px',
          backgroundColor: 'rgba(10, 11, 15, 0.95)',
          border: '1.5px solid rgba(251, 191, 36, 0.4)',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(251, 191, 36, 0.15)',
          backdropFilter: 'blur(16px)',
          animation: 'floatBob 4s ease-in-out infinite',
          maxWidth: 'calc(100vw - 20px)',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            width: isMobile ? '24px' : '28px',
            height: isMobile ? '24px' : '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
          }}
        >
          <Compass size={isMobile ? 14 : 16} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: 800,
              color: '#fbbf24',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            {isMobile ? 'Tur Astro' : 'Tur Keliling Antariksa bersama Astro'}
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: isMobile ? '10.5px' : '11px',
              fontWeight: 700,
            }}
          >
            {currentStop.stepNumber}/{currentStop.totalSteps}
          </span>
        </div>

        <button
          onClick={stopGuidedTour}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '6px',
            borderRadius: '50%',
          }}
          title="Keluar dari Tur Berkeliling"
        >
          <X size={16} />
        </button>
      </div>

      {/* Main Guided Tour Dialogue & Controller Card */}
      <div
        className="glass-panel-glow"
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '860px',
          maxHeight: isMobile ? '75vh' : 'auto',
          margin: '0 auto',
          borderRadius: isMobile ? '20px' : '24px',
          backgroundColor: '#0a0b0e',
          border: '1.5px solid rgba(251, 191, 36, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.98), 0 0 40px rgba(251, 191, 36, 0.12)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(28px)',
        }}
      >
        {/* Autoplay Progress Line */}
        {isTourAutoplay && (
          <div
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                width: `${autoplayProgress}%`,
                height: '100%',
                backgroundColor: '#fbbf24',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        )}

        {/* Card Content Row */}
        <div
          style={{
            padding: isMobile ? '12px 14px' : '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: isMobile ? '12px' : '20px',
            flexWrap: 'wrap',
            overflowY: 'auto',
            maxHeight: isMobile ? 'calc(75vh - 110px)' : 'none',
          }}
        >
          {/* Animated Mascot Figure */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <AstroMascot
              mood={currentStop.astroMood}
              size={isMobile ? 64 : 90}
              isFloating
              onClick={handleReplayVoice}
            />
            <span
              style={{
                marginTop: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fbbf24',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.5px',
              }}
            >
              Kapten Astro
            </span>
          </div>

          {/* Dialogue & Fact Details */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            {/* Header: Stop name and badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '19px',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {currentStop.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(251, 191, 36, 0.18)',
                      color: '#fbbf24',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                    }}
                  >
                    {currentStop.highlightBadge}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                  {currentStop.tagline}
                </div>
              </div>

              {/* Voice and Audio Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={handleReplayVoice}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#e2e8f0',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  title="Dengarkan Astro berbicara lagi"
                >
                  <RotateCcw size={13} />
                  <span>Ulangi Suara</span>
                </button>

                <button
                  onClick={handleToggleVoice}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: voiceEnabled ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    border: voiceEnabled ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.12)',
                    color: voiceEnabled ? '#fbbf24' : '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={voiceEnabled ? 'Bisukan suara narasi Astro' : 'Aktifkan suara narasi Astro'}
                >
                  {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>
              </div>
            </div>

            {/* Astro's Narration Speech Bubble */}
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '10px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#f8fafc',
                  lineHeight: 1.6,
                }}
              >
                "{currentStop.astroSpeech}"
              </p>
            </div>

            {/* Kid Fun Fact Callout */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
              }}
            >
              <Info size={15} color="#fbbf24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '12px', color: '#fef08a', lineHeight: 1.4 }}>
                <strong>Tahukah Kamu?</strong> {currentStop.kidFact}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tour Navigation Controller */}
        <div
          style={{
            padding: isMobile ? '10px 14px' : '12px 24px',
            backgroundColor: 'rgba(14, 15, 20, 0.98)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: isMobile ? '10px' : '12px',
          }}
        >
          {/* Step Timeline Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '6px' }}>
            {ASTRO_TOUR_STOPS.map((stop, idx) => (
              <button
                key={stop.id}
                onClick={() => goToTourStop(idx)}
                style={{
                  width: idx === tourStepIndex ? (isMobile ? '20px' : '28px') : (isMobile ? '7px' : '10px'),
                  height: isMobile ? '7px' : '10px',
                  borderRadius: '999px',
                  backgroundColor:
                    idx === tourStepIndex
                      ? '#fbbf24'
                      : idx < tourStepIndex
                      ? 'rgba(251, 191, 36, 0.4)'
                      : 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: 0,
                }}
                title={`Pemberhentian ${stop.stepNumber}: ${stop.shortName}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '6px' : '8px',
              flexWrap: 'wrap',
              width: isMobile ? '100%' : 'auto',
              justifyContent: isMobile ? 'space-between' : 'flex-end',
            }}
          >
            {/* Previous Stop */}
            <button
              onClick={prevTourStop}
              disabled={isFirst}
              style={{
                minHeight: '44px',
                padding: isMobile ? '8px 12px' : '7px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: isFirst ? '#475569' : '#e2e8f0',
                fontSize: isMobile ? '12px' : '12.5px',
                fontWeight: 700,
                cursor: isFirst ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: isFirst ? 0.4 : 1,
              }}
            >
              <ArrowLeft size={14} />
              <span>Sebelumnya</span>
            </button>

            {/* Next Stop or Finish (Primary CTA) */}
            <button
              onClick={nextTourStop}
              className="cosmic-btn cosmic-btn-gold"
              style={{
                minHeight: '44px',
                padding: isMobile ? '8px 16px' : '8px 20px',
                fontSize: isMobile ? '13px' : '13.5px',
                fontWeight: 800,
                flex: isMobile ? '1' : 'initial',
                justifyContent: 'center',
              }}
            >
              <span>{isLast ? 'Selesaikan Tur' : 'Lanjut Berkeliling'}</span>
              {isLast ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
            </button>

            {/* Autoplay Toggle */}
            <button
              onClick={toggleTourAutoplay}
              style={{
                minHeight: '44px',
                padding: isMobile ? '8px 12px' : '7px 14px',
                borderRadius: '999px',
                backgroundColor: isTourAutoplay ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: isTourAutoplay ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
                color: isTourAutoplay ? '#fbbf24' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title={isTourAutoplay ? 'Hentikan putaran otomatis' : 'Nyalakan tur otomatis (10 detik per planet)'}
            >
              {isTourAutoplay ? <Pause size={14} /> : <Play size={14} />}
              <span>{isTourAutoplay ? 'Otomatis' : 'Otomatis'}</span>
            </button>

            {/* Exit Tour */}
            <button
              onClick={stopGuidedTour}
              style={{
                minHeight: '44px',
                padding: isMobile ? '8px 12px' : '7px 14px',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
