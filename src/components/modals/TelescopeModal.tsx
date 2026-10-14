import React, { useEffect } from 'react';
import { X, Award, CheckCircle2, Eye } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const TelescopeModal: React.FC = () => {
  const { closePanel, addXP, unlockBadge, triggerConfetti, userProgress } = useGame();

  const isUnlocked = userProgress.unlockedBadges.includes('badge-jwst-observer');

  useEffect(() => {
    if (!isUnlocked) {
      addXP(60, 'Menemukan Teleskop James Webb (JWST)');
      unlockBadge('badge-jwst-observer');
      triggerConfetti();
      sound.playSuccess();
    }
  }, [isUnlocked, addXP, unlockBadge, triggerConfetti]);

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
          maxWidth: '640px',
          maxHeight: '90vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0a0b0e',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.1)',
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
            background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.15) 0%, rgba(10, 11, 14, 0.98) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Eye size={22} color="#fbbf24" />
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
                  Teleskop Luar Angkasa James Webb
                </h2>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    color: '#fbbf24',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  Mata Emas Kosmik
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Teleskop ruang angkasa tercanggih yang mengorbit 1,5 juta km dari Bumi!
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

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>18 Cermin Heksagonal Emas</div>
              <div style={{ fontSize: '15px', color: '#fbbf24', fontWeight: 800, marginTop: '2px' }}>
                Diameter 6,5 Meter
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                Dilapisi emas murni setebal mikron untuk menangkap gelombang inframerah paling redup.
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Perisai Panas Pelindung</div>
              <div style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: 800, marginTop: '2px' }}>
                Suhu -233°C Membeku
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                Perisai sebesar lapangan tenis menahan radiasi panas matahari agar instrumen tetap super dingin.
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#ffffff', marginBottom: '10px' }}>
            Misi Penemuan James Webb:
          </h3>

          <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '13.5px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>Melihat Masa Lalu Alam Semesta:</strong> Karena cahaya membutuhkan waktu untuk merambat, teleskop ini mampu melihat bintang dan galaksi pertama yang lahir 13,5 miliar tahun yang lalu!
            </li>
            <li>
              <strong>Mencari Uap Air di Planet Asing:</strong> James Webb menganalisis atmosfer exoplanet (planet di luar tata surya kita) untuk mendeteksi tanda-tanda air, karbon, dan potensi kehidupan.
            </li>
          </ul>

          {/* Reward pill */}
          <div
            style={{
              marginTop: '20px',
              padding: '14px 18px',
              borderRadius: '16px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              border: '1.5px solid #fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={22} color="#fbbf24" />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                  Lencana Dibuka: Mata Alam Semesta (+60 XP)
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Kamu telah menjelajahi teknologi teleskop pengamat bintang tercanggih di dunia!
                </div>
              </div>
            </div>
            <CheckCircle2 size={20} color="#10b981" />
          </div>
        </div>
      </div>
    </div>
  );
};
