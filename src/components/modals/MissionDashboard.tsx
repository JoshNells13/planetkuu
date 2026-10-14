import React from 'react';
import {
  X,
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Compass,
  Orbit,
  Globe,
  Disc,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MISSIONS_DATA } from '../../data/missions';
import { PLANETS_DATA } from '../../data/planets';
import { sound } from '../../utils/sound';

export const MissionDashboard: React.FC = () => {
  const {
    closePanel,
    userProgress,
    selectPlanet,
    openPanel,
    showAstroMessage,
  } = useGame();

  const handleStartMission = (missionId: string) => {
    sound.playClick();
    const mission = MISSIONS_DATA.find((m) => m.id === missionId);
    if (!mission) return;

    if (mission.targetPlanetId) {
      const targetPlanet = PLANETS_DATA.find((p) => p.id === mission.targetPlanetId);
      if (targetPlanet) {
        selectPlanet(targetPlanet);
        showAstroMessage(`Kamu memulai ${mission.title}! ${mission.hint}`, 'waving');
        return;
      }
    }

    if (mission.id === 'mission-5') {
      openPanel('quiz');
      showAstroMessage('Ayo buktikan kemampuanmu dalam Tantangan Kuis Tata Surya!', 'celebrating');
    }
  };

  const renderMissionIcon = (badgeIcon: string) => {
    switch (badgeIcon) {
      case 'compass':
        return <Compass size={22} color="#fbbf24" />;
      case 'orbit':
        return <Orbit size={22} color="#fbbf24" />;
      case 'globe':
        return <Globe size={22} color="#fbbf24" />;
      case 'disc':
        return <Disc size={22} color="#fbbf24" />;
      case 'award':
        return <Award size={22} color="#fbbf24" />;
      default:
        return <Target size={22} color="#fbbf24" />;
    }
  };

  const completedCount = userProgress.completedMissions.length;
  const totalCount = MISSIONS_DATA.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

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
          maxWidth: '750px',
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
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fbbf24',
              }}
            >
              <Target size={22} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Misi Penjelajah Kosmik
              </h2>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Selesaikan misi, kumpulkan lencana kosmik, dan raih XP untuk naik level!
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

        {/* Progress Bar Summary */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'rgba(14, 15, 20, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13.5px',
                fontWeight: 700,
                color: '#f8fafc',
              }}
            >
              Progres Petualangan: {completedCount} dari {totalCount} Misi Selesai
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 800,
                color: '#fbbf24',
              }}
            >
              {progressPercent}%
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                borderRadius: '999px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Missions List */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {MISSIONS_DATA.map((mission) => {
            const isCompleted = userProgress.completedMissions.includes(mission.id);

            return (
              <div
                key={mission.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: isCompleted ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '260px' }}>
                  {/* Badge Icon or Status */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${isCompleted ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={24} color="#10b981" /> : renderMissionIcon(mission.badgeIcon)}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {mission.title}
                      </h4>

                      <span
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          backgroundColor: mission.difficulty === 'Mudah' ? 'rgba(16, 185, 129, 0.15)' : mission.difficulty === 'Menengah' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(236, 72, 153, 0.15)',
                          color: mission.difficulty === 'Mudah' ? '#34d399' : mission.difficulty === 'Menengah' ? '#fbbf24' : '#f472b6',
                          fontWeight: 700,
                        }}
                      >
                        {mission.difficulty}
                      </span>

                      {isCompleted && (
                        <span
                          style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            backgroundColor: 'rgba(16, 185, 129, 0.2)',
                            color: '#34d399',
                            fontWeight: 700,
                          }}
                        >
                          Selesai
                        </span>
                      )}
                    </div>

                    <p style={{ margin: '4px 0 8px 0', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.45 }}>
                      {mission.description}
                    </p>

                    {/* Rewards pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#fbbf24',
                        }}
                      >
                        <Sparkles size={12} />
                        +{mission.xpReward} XP
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#e2e8f0',
                        }}
                      >
                        <Award size={12} />
                        Lencana: {mission.badgeName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  {isCompleted ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#10b981',
                        fontFamily: 'var(--font-display)',
                        fontSize: '13px',
                        fontWeight: 700,
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Berhasil Diklaim</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartMission(mission.id)}
                      className="cosmic-btn"
                      style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                      <span>{mission.actionLabel}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
