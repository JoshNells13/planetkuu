import React, { useState } from 'react';
import { X, Settings, Volume2, VolumeX, Eye, Monitor, Music } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const SettingsModal: React.FC = () => {
  const {
    closePanel,
    userProgress,
    toggleSound,
    toggleMusic,
    toggleOrbitLines,
    toggleLabels,
    setGraphicsQuality,
    resetAllProgress,
  } = useGame();

  const [confirmReset, setConfirmReset] = useState<boolean>(false);

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
          maxWidth: '560px',
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
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fbbf24',
              }}
            >
              <Settings size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Pengaturan & Aksesibilitas
              </h2>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Sesuaikan kenyamanan visual dan audio eksplorasi kosmikmu.
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

        {/* Settings Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Background Music (BGM) Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: userProgress.settings.musicEnabled ? '1px solid rgba(251, 191, 36, 0.25)' : '1px solid transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: userProgress.settings.musicEnabled ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: userProgress.settings.musicEnabled ? '#fbbf24' : '#94a3b8',
                }}
              >
                <Music size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>Musik Latar Antariksa (BGM)</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Alunan musik atmosfer kosmik yang menenangkan</div>
              </div>
            </div>

            <button
              onClick={toggleMusic}
              className={`cosmic-btn ${userProgress.settings.musicEnabled ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '12px', minWidth: '70px' }}
            >
              {userProgress.settings.musicEnabled ? 'Aktif' : 'Mati'}
            </button>
          </div>

          {/* Sound Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {userProgress.settings.soundEnabled ? <Volume2 size={20} color="#fbbf24" /> : <VolumeX size={20} color="#94a3b8" />}
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>Efek Suara Kosmik</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Suara tombol, roket, dan lonceng kemenangan</div>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className={`cosmic-btn ${userProgress.settings.soundEnabled ? '' : 'cosmic-btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              {userProgress.settings.soundEnabled ? 'Aktif' : 'Mati'}
            </button>
          </div>

          {/* Orbit Lines Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Eye size={20} color="#fbbf24" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>Garis Orbit Planet</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Tampilkan jalur revolusi planet mengelilingi Matahari</div>
              </div>
            </div>

            <button
              onClick={toggleOrbitLines}
              className={`cosmic-btn ${userProgress.settings.orbitLinesVisible ? '' : 'cosmic-btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              {userProgress.settings.orbitLinesVisible ? 'Tampil' : 'Sembunyi'}
            </button>
          </div>

          {/* Planet Labels Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Eye size={20} color="#fbbf24" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>Label Nama 3D</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Tampilkan tag nama melayang di atas planet</div>
              </div>
            </div>

            <button
              onClick={toggleLabels}
              className={`cosmic-btn ${userProgress.settings.labelsVisible ? '' : 'cosmic-btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              {userProgress.settings.labelsVisible ? 'Tampil' : 'Sembunyi'}
            </button>
          </div>

          {/* Graphics Quality */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <Monitor size={20} color="#34d399" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>Kualitas Grafis 3D</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Pilih hemat untuk performa ringan atau baterai hemat</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {(['high', 'medium', 'low'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setGraphicsQuality(q)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: userProgress.settings.graphicsQuality === q ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: userProgress.settings.graphicsQuality === q ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    color: userProgress.settings.graphicsQuality === q ? '#fbbf24' : '#94a3b8',
                    fontFamily: 'var(--font-display)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {q === 'high' ? 'Tinggi' : q === 'medium' ? 'Sedang' : 'Hemat'}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Progress */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '14px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            {!confirmReset ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#f87171' }}>Reset Progres Petualangan</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Mulai ulang semua lencana, XP, dan misi</div>
                </div>

                <button
                  onClick={() => setConfirmReset(true)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    color: '#f87171',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <span style={{ fontSize: '12.5px', color: '#fca5a5', fontWeight: 600 }}>
                  Yakin ingin menghapus semua pencapaian?
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      resetAllProgress();
                      setConfirmReset(false);
                      closePanel();
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: '#ef4444',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Ya, Reset
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
