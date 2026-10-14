import React from 'react';
import {
  X,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle2,
  Compass,
  Orbit,
  Globe,
  Disc,
  Award,
  Moon,
  Rocket,
  Zap,
  Radio,
  Eye,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { BADGES_DATA } from '../../data/missions';
import { sound } from '../../utils/sound';

export const AchievementsModal: React.FC = () => {
  const { closePanel, userProgress, showAstroMessage } = useGame();

  const allBadges = Object.values(BADGES_DATA);
  const unlockedCount = userProgress.unlockedBadges.length;
  const totalBadges = allBadges.length;

  const renderBadgeIcon = (iconKey: string, color: string) => {
    switch (iconKey) {
      case 'compass':
        return <Compass size={26} color={color} />;
      case 'orbit':
        return <Orbit size={26} color={color} />;
      case 'globe':
        return <Globe size={26} color={color} />;
      case 'disc':
        return <Disc size={26} color={color} />;
      case 'award':
        return <Award size={26} color={color} />;
      case 'moon':
        return <Moon size={26} color={color} />;
      case 'rocket':
        return <Rocket size={26} color={color} />;
      case 'zap':
        return <Zap size={26} color={color} />;
      case 'radio':
        return <Radio size={26} color={color} />;
      case 'eye':
        return <Eye size={26} color={color} />;
      default:
        return <Award size={26} color={color} />;
    }
  };

  return (
    <div
      className="modal-backdrop-mobile"
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
        className="glass-panel-glow modal-container-mobile"
        style={{
          width: '100%',
          maxWidth: '720px',
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
              <Trophy size={22} />
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
                Piala & Lencana Antariksa
              </h2>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Koleksi penghargaan atas setiap penemuan kosmik yang kamu capai!
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

        {/* Level and XP Banner */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'rgba(14, 15, 20, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pangkat Penjelajah
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 800,
                color: '#fbbf24',
                marginTop: '2px',
              }}
            >
              {userProgress.rankTitle} (Level {userProgress.level})
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 800,
                color: '#fbbf24',
              }}
            >
              <Sparkles size={16} />
              <span>{userProgress.xp} XP Terkumpul</span>
            </div>

            <div
              style={{
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {unlockedCount} / {totalBadges} Lencana
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {allBadges.map((badge) => {
            const isUnlocked = userProgress.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (isUnlocked) {
                    sound.playEasterEgg();
                    showAstroMessage(`Lencana ${badge.name}! ${badge.description}`, 'celebrating');
                  } else {
                    sound.playQuizWrong();
                    showAstroMessage(`Lencana "${badge.name}" masih terkunci. ${badge.description}`, 'hint');
                  }
                }}
                style={{
                  padding: '18px 16px',
                  borderRadius: '18px',
                  backgroundColor: isUnlocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(10, 11, 15, 0.6)',
                  border: isUnlocked ? `1.5px solid ${badge.color}66` : '1px dashed rgba(255, 255, 255, 0.12)',
                  boxShadow: isUnlocked ? `0 8px 24px rgba(0,0,0,0.6)` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  opacity: isUnlocked ? 1 : 0.6,
                  cursor: 'pointer',
                }}
              >
                {/* Badge Icon Circle */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: isUnlocked ? `${badge.color}22` : 'rgba(0, 0, 0, 0.4)',
                    border: `2px solid ${isUnlocked ? badge.color : 'rgba(255, 255, 255, 0.15)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  {isUnlocked ? (
                    renderBadgeIcon(badge.icon, badge.color)
                  ) : (
                    <Lock size={22} color="#64748b" />
                  )}
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: isUnlocked ? '#ffffff' : '#94a3b8',
                    margin: '0 0 6px 0',
                  }}
                >
                  {badge.name}
                </h4>

                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    color: isUnlocked ? '#cbd5e1' : '#64748b',
                    lineHeight: 1.4,
                  }}
                >
                  {badge.description}
                </p>

                {isUnlocked ? (
                  <div
                    style={{
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#34d399',
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>Terbuka</span>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#64748b',
                    }}
                  >
                    Terkunci
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
