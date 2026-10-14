import React, { useEffect } from 'react';
import { X, Award, CheckCircle2, Radio } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const SpaceStationModal: React.FC = () => {
  const { closePanel, addXP, unlockBadge, triggerConfetti, userProgress } = useGame();

  const isUnlocked = userProgress.unlockedBadges.includes('badge-iss-explorer');

  useEffect(() => {
    if (!isUnlocked) {
      addXP(60, 'Menemukan Stasiun Luar Angkasa ISS');
      unlockBadge('badge-iss-explorer');
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
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(16, 185, 129, 0.1)',
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
            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(10, 11, 14, 0.98) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Radio size={22} color="#34d399" />
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
                  Stasiun Luar Angkasa Internasional (ISS)
                </h2>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  Aktivitas Manusia di Orbit
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Laboratorium sains terbang seukuran lapangan sepak bola mengelilingi Bumi!
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
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Kecepatan Mengitari Bumi</div>
              <div style={{ fontSize: '16px', color: '#fbbf24', fontWeight: 800, marginTop: '2px' }}>
                28.000 km/jam!
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                Mengitari seluruh planet Bumi setiap 90 menit (16 kali matahari terbit setiap hari!)
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Penghuni Astronot</div>
              <div style={{ fontSize: '16px', color: '#34d399', fontWeight: 800, marginTop: '2px' }}>
                6–7 Astronaut Internasional
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                Tinggal dan meneliti tanaman, biologi sel, dan fisika di kondisi gravitasi nol (0G).
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#ffffff', marginBottom: '10px' }}>
            Fakta Menakjubkan Kehidupan di ISS:
          </h3>

          <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '13.5px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>Astronaut Melayang (Spacewalk):</strong> Untuk memperbaiki panel surya, astronaut mengenakan pakaian bertekanan khusus dan keluar melayang di luar angkasa dengan tali pengaman.
            </li>
            <li>
              <strong>Tidur Menempel di Dinding:</strong> Karena tidak ada gravitasi atas atau bawah, astronaut tidur di dalam kantung tidur yang diikatkan ke dinding agar tidak melayang terbentur saat tidur!
            </li>
            <li>
              <strong>Air Didaur Ulang 98%:</strong> Semua kelembapan udara dan cairan di dalam stasiun dimurnikan kembali menjadi air minum yang sangat steril dan segar.
            </li>
          </ul>

          {/* Reward pill */}
          <div
            style={{
              marginTop: '20px',
              padding: '14px 18px',
              borderRadius: '16px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={22} color="#34d399" />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                  Lencana Dibuka: Peneliti ISS (+60 XP)
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Kamu telah mempelajari aktivitas penjelajahan manusia di orbit Bumi!
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
