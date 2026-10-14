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
          top: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 20px',
          borderRadius: '999px',
          backgroundColor: 'rgba(10, 11, 15, 0.95)',
          border: '1.5px solid rgba(251, 191, 36, 0.4)',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(251, 191, 36, 0.15)',
          backdropFilter: 'blur(16px)',
          animation: 'floatBob 4s ease-in-out infinite',
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
          }}
        >
          <Compass size={16} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 800,
              color: '#fbbf24',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Tur Keliling Antariksa bersama Astro
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            Pemberhentian {currentStop.stepNumber} dari {currentStop.totalSteps}
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
          margin: '0 auto',
          borderRadius: '24px',
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
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
            flexWrap: 'wrap',
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
              size={90}
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
            padding: '12px 24px',
            backgroundColor: 'rgba(14, 15, 20, 0.95)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Step Timeline Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {ASTRO_TOUR_STOPS.map((stop, idx) => (
              <button
                key={stop.id}
                onClick={() => goToTourStop(idx)}
                style={{
                  width: idx === tourStepIndex ? '28px' : '10px',
                  height: '10px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Autoplay Toggle */}
            <button
              onClick={toggleTourAutoplay}
              style={{
                padding: '7px 14px',
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
              <span>{isTourAutoplay ? 'Otomatis: Nyala' : 'Tur Otomatis'}</span>
            </button>

            {/* Previous Stop */}
            <button
              onClick={prevTourStop}
              disabled={isFirst}
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: isFirst ? '#475569' : '#e2e8f0',
                fontSize: '12.5px',
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

            {/* Next Stop or Finish */}
            <button
              onClick={nextTourStop}
              className="cosmic-btn cosmic-btn-gold"
              style={{
                padding: '8px 20px',
                fontSize: '13.5px',
                fontWeight: 800,
              }}
            >
              <span>{isLast ? 'Selesaikan Tur Antariksa' : 'Lanjut Berkeliling'}</span>
              {isLast ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
            </button>

            {/* Exit Tour */}
            <button
              onClick={stopGuidedTour}
              style={{
                padding: '7px 14px',
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
