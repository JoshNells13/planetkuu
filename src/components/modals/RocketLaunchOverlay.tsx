import React, { useState, useEffect } from 'react';
import { X, Rocket, CheckCircle2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const RocketLaunchOverlay: React.FC = () => {
  const { closePanel, addXP, unlockBadge, showAstroMessage, triggerConfetti } = useGame();

  const [phase, setPhase] = useState<'ready' | 'countdown' | 'liftoff' | 'orbit' | 'complete'>('ready');
  const [countdown, setCountdown] = useState<number>(3);

  const startLaunch = () => {
    sound.playClick();
    setPhase('countdown');
    setCountdown(3);
  };

  useEffect(() => {
    if (phase === 'countdown') {
      if (countdown > 0) {
        sound.playCountdown(countdown);
        const timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // Meluncur!
        setPhase('liftoff');
        sound.playCountdown(0);
        sound.playRocketLaunch();
        showAstroMessage('3... 2... 1... MELUNCURRR! Roket melesat menembus atmosfer Bumi!', 'celebrating');

        const liftoffTimer = setTimeout(() => {
          setPhase('orbit');
        }, 3000);
        return () => clearTimeout(liftoffTimer);
      }
    }

    if (phase === 'orbit') {
      const orbitTimer = setTimeout(() => {
        setPhase('complete');
        addXP(50, 'Misi Peluncuran Roket');
        unlockBadge('badge-rocket-captain');
        triggerConfetti();
        sound.playSuccess();
        showAstroMessage('Selamat! Roketmu berhasil mencapai orbit luar angkasa dengan stabil!', 'celebrating');
      }, 2500);
      return () => clearTimeout(orbitTimer);
    }
  }, [phase, countdown, addXP, unlockBadge, showAstroMessage, triggerConfetti]);

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
        if (e.target === e.currentTarget && (phase === 'ready' || phase === 'complete')) closePanel();
      }}
    >
      <div
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '560px',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0a0b0e',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(249, 115, 22, 0.1)',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(249, 115, 22, 0.15) 0%, rgba(10, 11, 14, 0.98) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Rocket size={20} color="#fb923c" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#ffffff', margin: 0 }}>
              Pusat Peluncuran Roket Bumi
            </h3>
          </div>

          <button
            onClick={closePanel}
            style={{
              width: '30px',
              height: '30px',
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
            <X size={16} />
          </button>
        </div>

        {/* Animation & Launch Screen */}
        <div style={{ padding: '36px 24px' }}>
          {phase === 'ready' && (
            <div>
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(249, 115, 22, 0.15)',
                  border: '2px solid #f97316',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 0 25px rgba(249, 115, 22, 0.3)',
                }}
              >
                <Rocket size={44} color="#f97316" />
              </div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#ffffff', margin: '0 0 8px 0' }}>
                Siap Meluncur ke Orbit Bumi?
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '380px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
                Bahan bakar hidrogen cair sudah penuh. Sistem navigasi siap. Tekan tombol peluncuran untuk menghitung mundur!
              </p>

              <button
                onClick={startLaunch}
                className="cosmic-btn cosmic-btn-gold"
                style={{ padding: '12px 32px', fontSize: '16px' }}
              >
                <Rocket size={18} />
                <span>Luncurkan Roket Sekarang!</span>
              </button>
            </div>
          )}

          {phase === 'countdown' && (
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '76px',
                  fontWeight: 800,
                  color: '#fbbf24',
                  textShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
                  marginBottom: '16px',
                }}
              >
                {countdown}
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#f8fafc' }}>
                Hitung Mundur Peluncuran... Bersiap!
              </p>
            </div>
          )}

          {phase === 'liftoff' && (
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'floatBob 0.4s ease-in-out infinite',
                  marginBottom: '16px',
                }}
              >
                <Rocket size={56} color="#f97316" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#f97316', margin: '0 0 8px 0' }}>
                IGNITION & LIFTOFF!
              </h4>
              <p style={{ color: '#fed7aa', fontSize: '14px' }}>
                Pendorong roket menyala dahsyat! Roket memecah gravitasi Bumi!
              </p>
            </div>
          )}

          {phase === 'orbit' && (
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Rocket size={56} color="#fbbf24" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#fbbf24', margin: '0 0 8px 0' }}>
                Injeksi Orbit Berhasil!
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '14px' }}>
                Roket telah stabil berada di lintasan orbit mengelilingi Bumi.
              </p>
            </div>
          )}

          {phase === 'complete' && (
            <div>
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  border: '2px solid #10b981',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  marginBottom: '16px',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)',
                }}
              >
                <CheckCircle2 size={40} color="#10b981" />
              </div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#ffffff', margin: '0 0 6px 0' }}>
                Misi Sukses!
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '20px' }}>
                Kamu telah memperoleh lencana <strong style={{ color: '#fb923c' }}>Kapten Roket</strong> dan +50 XP!
              </p>

              <button
                onClick={closePanel}
                className="cosmic-btn"
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                <span>Kembali ke Tata Surya</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
