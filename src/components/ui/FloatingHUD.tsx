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
  Music,
  Volume2,
  VolumeX,
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
    toggleMusic,
    toggleSound,
  } = useGame();

  const totalMissions = MISSIONS_DATA.length;
  const completedMissionsCount = userProgress.completedMissions.length;
  const badgesCount = userProgress.unlockedBadges.length;

  return (
    <>
      {/* Top Floating Hitam Modern Header Bar */}
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
          gap: '10px',
        }}
      >
        {/* Brand & Explorer Rank Pill */}
        <div
          className="glass-panel-glow"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '7px 16px',
            borderRadius: '999px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.5px',
            }}
          >
            <Compass size={18} color="#fbbf24" />
            <span>PlanetKuu</span>
          </div>

          <div
            style={{
              width: '1px',
              height: '20px',
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
                padding: '2px 8px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
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
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#fbbf24',
              }}
            >
              <Sparkles size={12} />
              <span>{userProgress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Quick Audio & Settings Controls (Always Visible & Accessible on Mobile & Desktop) */}
        <div
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 6px',
            borderRadius: '999px',
          }}
        >
          {/* Background Music (BGM) Toggle */}
          <button
            onClick={toggleMusic}
            className={`cosmic-btn cosmic-btn-icon ${
              userProgress.settings.musicEnabled ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'
            }`}
            style={{
              width: '38px',
              height: '38px',
              position: 'relative',
            }}
            title={
              userProgress.settings.musicEnabled
                ? 'Musik Antariksa: Menyala (Klik untuk membisukan)'
                : 'Musik Antariksa: Mati (Klik untuk menyalakan)'
            }
          >
            <Music size={16} />
            {userProgress.settings.musicEnabled && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                }}
              />
            )}
          </button>

          {/* Sound SFX Toggle */}
          <button
            onClick={toggleSound}
            className={`cosmic-btn cosmic-btn-icon ${
              userProgress.settings.soundEnabled ? '' : 'cosmic-btn-secondary'
            }`}
            style={{ width: '38px', height: '38px' }}
            title={userProgress.settings.soundEnabled ? 'Efek Suara: Nyala' : 'Efek Suara: Mati'}
          >
            {userProgress.settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={() => openPanel('settings')}
            className={`cosmic-btn cosmic-btn-icon ${
              activePanel === 'settings' ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'
            }`}
            style={{ width: '38px', height: '38px' }}
            title="Pengaturan Suara, Musik, & Grafis"
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Desktop-Only Top Navigation Menu */}
        <nav
          aria-label="Desktop Navigation"
          className="desktop-only glass-panel"
          style={{
            pointerEvents: 'auto',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 8px',
            borderRadius: '999px',
          }}
        >
          {/* Tur Berkeliling Bersama Astro (Interaktif Pemandu) */}
          <button
            onClick={startGuidedTour}
            className={`cosmic-btn cosmic-btn-gold ${isTourActive ? 'animate-pulse-glow' : ''}`}
            style={{
              padding: '7px 16px',
              fontSize: '13px',
              border: '1.5px solid #fbbf24',
              boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)',
            }}
            title="Ajak Berkeliling Tata Surya Bersama Astro!"
          >
            <Compass size={15} />
            <span style={{ fontWeight: 800 }}>Tur Astro</span>
          </button>

          {/* Overview Reset */}
          <button
            onClick={resetCameraOverview}
            className={`cosmic-btn ${activePanel === 'none' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Kembali ke pemandangan seluruh tata surya"
          >
            <RotateCcw size={15} />
            <span>Tata Surya</span>
          </button>

          {/* Missions */}
          <button
            onClick={() => openPanel('missions')}
            className={`cosmic-btn ${activePanel === 'missions' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px', position: 'relative' }}
            title="Buka Misi Penjelajah Cilik"
          >
            <Target size={15} />
            <span>Misi</span>
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
            <span>Lencana</span>
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
            <span>Ensiklopedia</span>
          </button>

          {/* Quizzes */}
          <button
            onClick={() => openPanel('quiz')}
            className={`cosmic-btn ${activePanel === 'quiz' ? '' : 'cosmic-btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Tantangan Kuis Galaksi Berhadiah"
          >
            <HelpCircle size={15} />
            <span>Kuis</span>
          </button>

          {/* Rocket Launch Easter Egg */}
          <button
            onClick={() => openPanel('rocket-launch')}
            className="cosmic-btn cosmic-btn-gold"
            style={{ padding: '7px 14px', fontSize: '13px' }}
            title="Luncurkan Roket dari Bumi!"
          >
            <Rocket size={15} />
            <span>Roket</span>
          </button>
        </nav>
      </header>

      {/* Mobile Exploration Dock (Thumb-Friendly, Swipeable, Min 44px Height per Button) */}
      <nav aria-label="Mobile Navigation" className="mobile-only mobile-dock">
        {/* Tur Astro - Star Action */}
        <button
          onClick={startGuidedTour}
          className={`mobile-dock-btn ${isTourActive ? 'animate-pulse-glow' : ''}`}
          style={{
            backgroundColor: '#fbbf24',
            color: '#000000',
            border: 'none',
            boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)',
          }}
        >
          <Compass size={17} />
          <span>Tur Astro</span>
        </button>

        {/* Reset Tata Surya */}
        <button
          onClick={resetCameraOverview}
          className="mobile-dock-btn cosmic-btn-secondary"
        >
          <RotateCcw size={16} />
          <span>Tata Surya</span>
        </button>

        {/* Misi */}
        <button
          onClick={() => openPanel('missions')}
          className={`mobile-dock-btn ${activePanel === 'missions' ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'}`}
        >
          <Target size={16} />
          <span>Misi</span>
          <span
            style={{
              padding: '1px 5px',
              borderRadius: '999px',
              backgroundColor: completedMissionsCount === totalMissions ? '#10b981' : '#f59e0b',
              color: '#ffffff',
              fontSize: '10px',
            }}
          >
            {completedMissionsCount}/{totalMissions}
          </span>
        </button>

        {/* Lencana */}
        <button
          onClick={() => openPanel('badges')}
          className={`mobile-dock-btn ${activePanel === 'badges' ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'}`}
        >
          <Trophy size={16} />
          <span>Lencana ({badgesCount})</span>
        </button>

        {/* Ensiklopedia */}
        <button
          onClick={() => openPanel('encyclopedia')}
          className={`mobile-dock-btn ${activePanel === 'encyclopedia' ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'}`}
        >
          <BookOpen size={16} />
          <span>Ensiklopedia</span>
        </button>

        {/* Kuis */}
        <button
          onClick={() => openPanel('quiz')}
          className={`mobile-dock-btn ${activePanel === 'quiz' ? 'cosmic-btn-gold' : 'cosmic-btn-secondary'}`}
        >
          <HelpCircle size={16} />
          <span>Kuis</span>
        </button>

        {/* Roket */}
        <button
          onClick={() => openPanel('rocket-launch')}
          className="mobile-dock-btn cosmic-btn-gold"
        >
          <Rocket size={16} />
          <span>Roket</span>
        </button>

        {/* Mobile Simulation Controls Group */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0,
          }}
        >
          {/* Pause / Play */}
          <button
            onClick={togglePause}
            className="cosmic-btn cosmic-btn-icon cosmic-btn-secondary"
            style={{ width: '38px', height: '38px' }}
            title={isPaused ? 'Putar' : 'Jeda'}
          >
            {isPaused ? <Play size={15} fill="currentColor" /> : <Pause size={15} />}
          </button>

          {/* Speed */}
          {[0.5, 1, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => setSimulationSpeed(spd)}
              style={{
                background: simulationSpeed === spd ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                color: simulationSpeed === spd ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '999px',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {spd}x
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop-Only Bottom Simulation Controls Bar */}
      <footer
        role="region"
        aria-label="Simulation Controls"
        className="desktop-only"
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
            <span>Orbit</span>
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
            <span>Label</span>
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
