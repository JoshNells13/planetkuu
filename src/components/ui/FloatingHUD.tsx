import React from 'react';
import {
  Compass,
  Target,
  Trophy,
  BookOpen,
  HelpCircle,
  Rocket,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MISSIONS_DATA } from '../../data/missions';

export const FloatingHUD: React.FC = () => {
  const {
    resetCameraOverview,
    openPanel,
    activePanel,
    userProgress,
    simulationSpeed,
    setSimulationSpeed,
    isPaused,
    togglePause,
    toggleOrbitLines,
    toggleLabels,
    startGuidedTour,
    isTourActive,
  } = useGame();

  const totalMissions = MISSIONS_DATA.length;
  const completedMissionsCount = userProgress.completedMissions.length;
  const badgesCount = userProgress.unlockedBadges.length;

  return (
    <>
      {/* Top Floating Hitam Modern Navigation Bar */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Brand & Explorer Rank Pill */}
        <div
          className="glass-panel-glow"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '8px 18px',
            borderRadius: '999px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.5px',
            }}
          >
            <Compass size={19} color="#fbbf24" />
            <span>PlanetKuu</span>
          </div>

          <div
            style={{
              width: '1px',
              height: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            }}
          />

          {/* XP & Level Indicator */}
          <div
            onClick={() => openPanel('badges')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
            title="Lihat pencapaian lencana dan progres XP"
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 10px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 700,
                color: '#e2e8f0',
              }}
            >
              <span>{userProgress.rankTitle}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                color: '#fbbf24',
              }}
            >
              <Sparkles size={13} />
              <span>{userProgress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Floating Menu Buttons */}
        <nav
          aria-label="Main Navigation"
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 8px',
            borderRadius: '999px',
          }}
        >
          {/* Tur Berkeliling Bersama Astro (Interaktif Pemandu) */}
          <button
            onClick={startGuidedTour}
            className={`cosmic-btn ${isTourActive ? 'cosmic-btn-gold' : ''}`}
            style={{ padding: '7px 15px', fontSize: '13px' }}
            title="Ajak Berkeliling Tata Surya Bersama Astro!"
          >
            <Compass size={15} />
            <span className="hud-label">Tur Astro</span>
          </button>

          {/* Overview Reset */}
          <button
            onClick={resetCameraOverview}
            className={`cosmic-btn ${activePanel === 'none' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Kembali ke pemandangan seluruh tata surya"
          >
            <Compass size={15} />
            <span className="hud-label">Tata Surya</span>
          </button>

          {/* Missions */}
          <button
            onClick={() => openPanel('missions')}
            className={`cosmic-btn ${activePanel === 'missions' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px', position: 'relative' }}
            title="Buka Misi Penjelajah Cilik"
          >
            <Target size={15} />
            <span className="hud-label">Misi</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1px 6px',
                borderRadius: '999px',
                backgroundColor: completedMissionsCount === totalMissions ? '#10b981' : '#f59e0b',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                marginLeft: '4px',
              }}
            >
              {completedMissionsCount}/{totalMissions}
            </span>
          </button>

          {/* Badges / Achievements */}
          <button
            onClick={() => openPanel('badges')}
            className={`cosmic-btn ${activePanel === 'badges' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Koleksi Lencana & Pencapaian"
          >
            <Trophy size={15} />
            <span className="hud-label">Lencana</span>
            {badgesCount > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  marginLeft: '4px',
                }}
              >
                {badgesCount}
              </span>
            )}
          </button>

          {/* Encyclopedia */}
          <button
            onClick={() => openPanel('encyclopedia')}
            className={`cosmic-btn ${activePanel === 'encyclopedia' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Ensiklopedia Tata Surya & Komparasi Planet"
          >
            <BookOpen size={15} />
            <span className="hud-label">Ensiklopedia</span>
          </button>

          {/* Quizzes */}
          <button
            onClick={() => openPanel('quiz')}
            className={`cosmic-btn ${activePanel === 'quiz' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Tantangan Kuis Galaksi Berhadiah"
          >
            <HelpCircle size={15} />
            <span className="hud-label">Kuis</span>
          </button>

          {/* Rocket Launch Easter Egg */}
          <button
            onClick={() => openPanel('rocket-launch')}
            className="cosmic-btn cosmic-btn-gold"
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Luncurkan Roket dari Bumi!"
          >
            <Rocket size={15} />
            <span className="hud-label">Roket</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => openPanel('settings')}
            className={`cosmic-btn cosmic-btn-icon ${activePanel === 'settings' ? '' : 'cosmic-btn-secondary'}`}
            style={{ width: '34px', height: '34px' }}
            title="Pengaturan Suara, Grafis, & Aksesibilitas"
          >
            <Settings size={15} />
          </button>
        </nav>
      </header>

      {/* Bottom Floating Simulation Controls */}
      <footer
        role="region"
        aria-label="Simulation Controls"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <div
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '999px',
          }}
        >
          {/* Play / Pause */}
          <button
            onClick={togglePause}
            className={`cosmic-btn cosmic-btn-icon ${isPaused ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'}`}
            style={{ width: '38px', height: '38px' }}
            title={isPaused ? 'Lanjutkan Putaran Simulasi' : 'Hentikan Putaran Simulasi (Pause)'}
          >
            {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} />}
          </button>

          {/* Speed Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '999px',
              padding: '2px',
            }}
          >
            {[0.5, 1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimulationSpeed(spd)}
                style={{
                  background: simulationSpeed === spd ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                  color: simulationSpeed === spd ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.2s',
                }}
              >
                {spd}x
              </button>
            ))}
          </div>

          <div
            style={{
              width: '1px',
              height: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            }}
          />

          {/* Orbit Lines Toggle */}
          <button
            onClick={toggleOrbitLines}
            className={`cosmic-btn ${userProgress.settings.orbitLinesVisible ? 'cosmic-btn-secondary' : ''}`}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              opacity: userProgress.settings.orbitLinesVisible ? 1 : 0.6,
            }}
            title="Tampilkan / Sembunyikan Jalur Orbit"
          >
            {userProgress.settings.orbitLinesVisible ? <Eye size={14} /> : <EyeOff size={14} />}
            <span className="hud-label">Orbit</span>
          </button>

          {/* Labels Toggle */}
          <button
            onClick={toggleLabels}
            className={`cosmic-btn ${userProgress.settings.labelsVisible ? 'cosmic-btn-secondary' : ''}`}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              opacity: userProgress.settings.labelsVisible ? 1 : 0.6,
            }}
            title="Tampilkan / Sembunyikan Nama Planet"
          >
            <span className="hud-label">Label</span>
          </button>

          {/* Reset Camera */}
          <button
            onClick={resetCameraOverview}
            className="cosmic-btn cosmic-btn-secondary cosmic-btn-icon"
            style={{ width: '38px', height: '38px' }}
            title="Reset Sudut Pandang Kamera"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </footer>
    </>
  );
};
