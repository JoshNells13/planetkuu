import React, { useState } from 'react';
import { X, CheckCircle2, Flag, Footprints, Award, Info, Moon, Rocket } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const LunarEasterEggModal: React.FC = () => {
  const { closePanel, addXP, unlockBadge, userProgress, triggerConfetti, showAstroMessage } = useGame();

  const [inspectedFootprints, setInspectedFootprints] = useState<boolean>(false);
  const [inspectedPlaque, setInspectedPlaque] = useState<boolean>(false);
  const [inspectedEagle, setInspectedEagle] = useState<boolean>(false);

  const isBadgeUnlocked = userProgress.unlockedBadges.includes('badge-moon-detective');

  const handleInspect = (item: 'footprints' | 'plaque' | 'eagle') => {
    sound.playTelemetry();
    if (item === 'footprints') setInspectedFootprints(true);
    if (item === 'plaque') setInspectedPlaque(true);
    if (item === 'eagle') setInspectedEagle(true);

    const willBeComplete =
      (item === 'footprints' || inspectedFootprints) &&
      (item === 'plaque' || inspectedPlaque) &&
      (item === 'eagle' || inspectedEagle);

    if (willBeComplete && !isBadgeUnlocked) {
      addXP(100, 'Menemukan Rahasia Pendaratan Apollo 11');
      unlockBadge('badge-moon-detective');
      triggerConfetti();
      sound.playSuccess();
      showAstroMessage('Luar biasa! Kamu memecahkan misteri pendaratan Bulan dan mendapat lencana Detektif Bulan!', 'celebrating');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePanel();
      }}
    >
      <div
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0a0b0e',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(251, 191, 36, 0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.12) 0%, rgba(10, 11, 14, 0.98) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Moon size={22} color="#f8fafc" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Situs Bersejarah Apollo 11 (Bulan, 1969)
                </h2>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    color: '#fbbf24',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  Easter Egg Tersembunyi
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Pendaratan manusia pertama di luar angkasa: "One small step for man, one giant leap for mankind."
              </p>
            </div>
          </div>

          <button
            onClick={closePanel}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Quick Overview Card */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#fbbf24',
              }}
            >
              <Info size={18} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#ffffff', fontWeight: 700 }}>
                Tahukah Kamu?
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Pada 20 Juli 1969, Neil Armstrong dan Buzz Aldrin menjadi manusia pertama yang menjejakkan kaki di Bulan. Mereka menjelajah selama 2,5 jam di kawah "Sea of Tranquility" dan meninggalkan peninggalan bersejarah yang masih utuh sampai hari ini!
              </p>
            </div>
          </div>

          {/* Interactive Inspection Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {/* 1. Lunar Module Eagle */}
            <div
              onClick={() => handleInspect('eagle')}
              style={{
                padding: '14px 18px',
                borderRadius: '14px',
                backgroundColor: inspectedEagle ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: inspectedEagle ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Rocket size={20} color="#fbbf24" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14.5px', color: '#ffffff', fontWeight: 700 }}>
                    1. Modul Bulan "Eagle" (Lunar Module)
                  </h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
                    Pesawat berbalut foil emas yang membawa astronot mendarat mulus di debu Bulan.
                  </p>
                </div>
              </div>
              {inspectedEagle ? <CheckCircle2 size={20} color="#10b981" /> : <span style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>Periksa</span>}
            </div>

            {/* 2. Footprints in Regolith */}
            <div
              onClick={() => handleInspect('footprints')}
              style={{
                padding: '14px 18px',
                borderRadius: '14px',
                backgroundColor: inspectedFootprints ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: inspectedFootprints ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Footprints size={20} color="#94a3b8" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14.5px', color: '#ffffff', fontWeight: 700 }}>
                    2. Jejak Sepatu Bot Pertama di Debu Bulan
                  </h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
                    Karena tidak ada angin atau hujan di Bulan, jejak kaki ini masih abadi hingga sekarang!
                  </p>
                </div>
              </div>
              {inspectedFootprints ? <CheckCircle2 size={20} color="#10b981" /> : <span style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>Periksa</span>}
            </div>

            {/* 3. Commemorative Plaque & Flag */}
            <div
              onClick={() => handleInspect('plaque')}
              style={{
                padding: '14px 18px',
                borderRadius: '14px',
                backgroundColor: inspectedPlaque ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: inspectedPlaque ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Flag size={20} color="#fbbf24" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14.5px', color: '#ffffff', fontWeight: 700 }}>
                    3. Plakat Perdamaian & Bendera
                  </h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
                    <em>"Here men from the planet Earth first set foot upon the Moon. We came in peace for all mankind."</em>
                  </p>
                </div>
              </div>
              {inspectedPlaque ? <CheckCircle2 size={20} color="#10b981" /> : <span style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>Periksa</span>}
            </div>
          </div>

          {/* Reward Status Card */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: isBadgeUnlocked ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: `1.5px solid ${isBadgeUnlocked ? '#fbbf24' : 'rgba(255, 255, 255, 0.12)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={24} color={isBadgeUnlocked ? '#fbbf24' : '#94a3b8'} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                  Lencana Eksklusif: Detektif Bulan (+100 XP)
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {isBadgeUnlocked ? 'Berhasil dibuka dan tersimpan di profilmu!' : 'Periksa ketiga peninggalan di atas untuk mengklaim lencana!'}
                </div>
              </div>
            </div>

            {isBadgeUnlocked && (
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 800, color: '#34d399' }}>
                Lencana Dimiliki
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
