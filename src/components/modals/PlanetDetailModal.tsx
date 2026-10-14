import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, Compass, HelpCircle, Layers, Info, RotateCw } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';
import { PlanetInspector3D } from '../3d/PlanetInspector3D';

export const PlanetDetailModal: React.FC = () => {
  const {
    selectedPlanet,
    closePanel,
    resetCameraOverview,
    userProgress,
    completeMission,
    addXP,
    unlockBadge,
    showAstroMessage,
  } = useGame();

  const [activeTab, setActiveTab] = useState<'3d-view' | 'fun' | 'activity' | 'science'>('3d-view');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [activityAnswered, setActivityAnswered] = useState<boolean>(false);

  if (!selectedPlanet) return null;

  const activity = selectedPlanet.activity;
  const isMissionCompleted =
    activity.badgeRewardId && userProgress.unlockedBadges.includes(activity.badgeRewardId);

  const handleAnswerSubmit = (optionIndex: number) => {
    if (activityAnswered) return;
    sound.playClick();
    setSelectedAnswer(optionIndex);
    setActivityAnswered(true);

    if (optionIndex === activity.correctAnswerIndex) {
      sound.playSuccess();
      addXP(activity.xpReward, `Menyelesaikan aktivitas ${selectedPlanet.indonesianName}`);

      if (activity.badgeRewardId) {
        unlockBadge(activity.badgeRewardId);
      }

      // Check specific missions
      if (selectedPlanet.id === 'earth') {
        completeMission('mission-3');
      } else if (selectedPlanet.id === 'saturn') {
        completeMission('mission-4');
      }

      showAstroMessage(`Hebat! ${activity.explanation}`, 'celebrating');
    } else {
      showAstroMessage('Belum tepat, tetapi jangan berkecil hati! Yuk, baca penjelasannya.', 'hint');
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
        padding: '16px',
        backgroundColor: 'rgba(3, 7, 18, 0.85)',
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
          maxWidth: '740px',
          maxHeight: '92vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${selectedPlanet.color}33`,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `linear-gradient(90deg, ${selectedPlanet.color}22 0%, rgba(15, 20, 32, 0.95) 100%)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: selectedPlanet.color,
                boxShadow: `0 0 20px ${selectedPlanet.color}88`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: selectedPlanet.color,
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {selectedPlanet.indonesianName}
                </h2>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    fontFamily: 'var(--font-display)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {selectedPlanet.name}
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', color: '#cbd5e1', fontSize: '13px', fontWeight: 500 }}>
                {selectedPlanet.tagline}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={resetCameraOverview}
              className="cosmic-btn cosmic-btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              title="Lihat seluruh tata surya"
            >
              <Compass size={14} />
              <span>Tata Surya</span>
            </button>
            <button
              onClick={closePanel}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Tutup"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            padding: '8px 20px',
            backgroundColor: 'rgba(10, 15, 44, 0.6)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => { sound.playClick(); setActiveTab('3d-view'); }}
            style={{
              padding: '7px 14px',
              borderRadius: '999px',
              border: 'none',
              background: activeTab === '3d-view' ? '#ffffff' : 'transparent',
              color: activeTab === '3d-view' ? '#000000' : '#94a3b8',
              fontFamily: 'var(--font-display)',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <RotateCw size={14} />
            <span>Detail 3D & Lapisan</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('fun'); }}
            style={{
              padding: '7px 14px',
              borderRadius: '999px',
              border: 'none',
              background: activeTab === 'fun' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: activeTab === 'fun' ? '#ffffff' : '#94a3b8',
              fontFamily: 'var(--font-display)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={14} />
            <span>Fakta Seru</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('activity'); }}
            style={{
              padding: '7px 14px',
              borderRadius: '999px',
              border: 'none',
              background: activeTab === 'activity' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
              color: activeTab === 'activity' ? '#fbbf24' : '#94a3b8',
              fontFamily: 'var(--font-display)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <HelpCircle size={14} />
            <span>Aktivitas Belajar</span>
            {isMissionCompleted && (
              <CheckCircle2 size={12} color="#10b981" />
            )}
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('science'); }}
            style={{
              padding: '7px 14px',
              borderRadius: '999px',
              border: 'none',
              background: activeTab === 'science' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: activeTab === 'science' ? '#ffffff' : '#94a3b8',
              fontFamily: 'var(--font-display)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={14} />
            <span>Data Astronomi</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {activeTab === '3d-view' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Inspeksi Model 3D Interaktif {selectedPlanet.indonesianName}
                </h3>
                <span style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 600 }}>
                  Klik hotspot atau ubah mode lapisan
                </span>
              </div>

              {/* Dedicated 3D Planet Viewer */}
              <PlanetInspector3D planet={selectedPlanet} />

              <div
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                  <strong>Kemiringan Sumbu:</strong> {selectedPlanet.axialTiltDeg}° &bull;{' '}
                  <strong>Rotasi:</strong> {selectedPlanet.scientificData.dayLength}
                </div>

                <button
                  onClick={() => setActiveTab('fun')}
                  className="cosmic-btn cosmic-btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                >
                  <span>Baca Fakta Seru &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'fun' && (
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  color: '#ffffff',
                  marginBottom: '14px',
                }}
              >
                Fakta Menakjubkan untuk Penjelajah Cilik
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedPlanet.funFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: `${selectedPlanet.color}44`,
                        color: selectedPlanet.color,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '13px',
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#f1f5f9' }}>
                      {fact}
                    </p>
                  </div>
                ))}
              </div>

              {/* Artistic vs Real Proportions note */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                <Info size={18} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.5 }}>
                  <strong>Catatan Skala:</strong> {selectedPlanet.artisticScaleNote}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(168, 85, 247, 0.25)',
                    color: '#c084fc',
                    fontFamily: 'var(--font-display)',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '6px',
                  }}
                >
                  Tantangan Belajar Interaktif • +{activity.xpReward} XP
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: '#ffffff',
                    margin: '4px 0',
                  }}
                >
                  {activity.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', margin: 0 }}>
                  {activity.instructions}
                </p>
              </div>

              {/* Question Card */}
              <div
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(18, 20, 26, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  marginBottom: '16px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#f8fafc',
                    margin: '0 0 14px 0',
                  }}
                >
                  {activity.question}
                </p>

                {/* Multiple choice options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activity.options.map((opt, optIdx) => {
                    let btnBg = 'rgba(255, 255, 255, 0.06)';
                    let borderCol = 'rgba(255, 255, 255, 0.15)';
                    let textCol = '#f8fafc';

                    if (activityAnswered) {
                      if (optIdx === activity.correctAnswerIndex) {
                        btnBg = 'rgba(16, 185, 129, 0.25)';
                        borderCol = '#10b981';
                        textCol = '#34d399';
                      } else if (selectedAnswer === optIdx) {
                        btnBg = 'rgba(239, 68, 68, 0.25)';
                        borderCol = '#ef4444';
                        textCol = '#f87171';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswerSubmit(optIdx)}
                        disabled={activityAnswered}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: `1.5px solid ${borderCol}`,
                          backgroundColor: btnBg,
                          color: textCol,
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: activityAnswered ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span>{opt}</span>
                        {activityAnswered && optIdx === activity.correctAnswerIndex && (
                          <CheckCircle2 size={18} color="#10b981" />
                        )}
                        {activityAnswered && selectedAnswer === optIdx && optIdx !== activity.correctAnswerIndex && (
                          <AlertCircle size={18} color="#ef4444" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Explanation */}
              {activityAnswered && (
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '14px',
                    backgroundColor: selectedAnswer === activity.correctAnswerIndex ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: `1px solid ${selectedAnswer === activity.correctAnswerIndex ? '#10b981' : '#ef4444'}`,
                  }}
                >
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#f8fafc' }}>
                    {activity.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'science' && (
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  color: '#ffffff',
                  marginBottom: '14px',
                }}
              >
                Tabel Sains Astronomi
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '10px',
                }}
              >
                {Object.entries({
                  'Jarak dari Matahari': selectedPlanet.scientificData.distanceFromSunKm,
                  'Diameter Khatulistiwa': selectedPlanet.scientificData.diameterKm,
                  'Massa Planet': selectedPlanet.scientificData.mass,
                  'Gravitasi Permukaan': selectedPlanet.scientificData.gravity,
                  'Suhu Permukaan': selectedPlanet.scientificData.surfaceTemperature,
                  'Lama 1 Hari (Rotasi)': selectedPlanet.scientificData.dayLength,
                  'Lama 1 Tahun (Revolusi)': selectedPlanet.scientificData.yearLength,
                  'Jumlah Bulan/Satelit': `${selectedPlanet.scientificData.moonsCount} satelit`,
                  'Komposisi Atmosfer': selectedPlanet.scientificData.atmosphereComposition,
                }).map(([key, val], idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {key}
                    </div>
                    <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 600, marginTop: '4px' }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
