import React, { useState, useEffect } from 'react';
import './App.css';
import { GameProvider, useGame } from './context/GameContext';
import { SolarSystemScene } from './components/3d/SolarSystemScene';
import { FloatingHUD } from './components/ui/FloatingHUD';
import { AstroDialogue } from './components/mascot/AstroDialogue';
import { PlanetDetailModal } from './components/modals/PlanetDetailModal';
import { MissionDashboard } from './components/modals/MissionDashboard';
import { AchievementsModal } from './components/modals/AchievementsModal';
import { EncyclopediaModal } from './components/modals/EncyclopediaModal';
import { QuizModal } from './components/modals/QuizModal';
import { RocketLaunchOverlay } from './components/modals/RocketLaunchOverlay';
import { LunarEasterEggModal } from './components/modals/LunarEasterEggModal';
import { SpaceStationModal } from './components/modals/SpaceStationModal';
import { TelescopeModal } from './components/modals/TelescopeModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AstroTalkModal } from './components/modals/AstroTalkModal';
import { CelestialGuideModal } from './components/guide/CelestialGuideModal';
import { AstroGuidedTour } from './components/guide/AstroGuidedTour';
import { WebGLFallback } from './components/ui/WebGLFallback';

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const PlanetKuContent: React.FC = () => {
  const { activePanel, closePanel, togglePause, openPanel, isTourActive, stopGuidedTour } = useGame();
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTourActive) {
          stopGuidedTour();
        } else {
          closePanel();
        }
      } else if (e.code === 'Space' && activePanel === 'none' && !isTourActive) {
        // Spacebar pauses/resumes when no modal or tour is open
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanel, closePanel, togglePause, isTourActive, stopGuidedTour]);

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      {/* Primary 3D Living Solar System Scene */}
      {hasWebGL ? (
        <SolarSystemScene />
      ) : (
        <WebGLFallback
          onRetry={() => setHasWebGL(isWebGLAvailable())}
          onOpenEncyclopedia={() => openPanel('encyclopedia')}
        />
      )}

      {/* Floating Holographic Navigation & Simulation Controls HUD */}
      <FloatingHUD />

      {/* Astro Mascot Companion & Contextual Dialogue (When not in guided tour) */}
      {!isTourActive && activePanel === 'none' && <AstroDialogue />}

      {/* Astro's Interactive Space Tour Mode */}
      {isTourActive && <AstroGuidedTour />}

      {/* Holographic Modals and Overlays */}
      {activePanel === 'planet-detail' && <PlanetDetailModal />}
      {activePanel === 'guide' && <CelestialGuideModal />}
      {activePanel === 'missions' && <MissionDashboard />}
      {activePanel === 'badges' && <AchievementsModal />}
      {activePanel === 'encyclopedia' && <EncyclopediaModal />}
      {activePanel === 'quiz' && <QuizModal />}
      {activePanel === 'rocket-launch' && <RocketLaunchOverlay />}
      {activePanel === 'easter-egg-lunar' && <LunarEasterEggModal />}
      {activePanel === 'iss-details' && <SpaceStationModal />}
      {activePanel === 'jwst-details' && <TelescopeModal />}
      {activePanel === 'settings' && <SettingsModal />}
      {activePanel === 'astro-talk' && <AstroTalkModal />}
    </main>
  );
};

export function App() {
  return (
    <GameProvider>
      <PlanetKuContent />
    </GameProvider>
  );
}

export default App;
