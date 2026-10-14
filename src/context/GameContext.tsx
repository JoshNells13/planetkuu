import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import confetti from 'canvas-confetti';
import type { PlanetData } from '../types/astronomy';
import type { UserProgress } from '../types/gamification';
import { BADGES_DATA, MISSIONS_DATA } from '../data/missions';
import { ASTRO_TOUR_STOPS } from '../data/tour';
import { loadUserProgress, saveUserProgress, calculateLevel, calculateRankTitle } from '../utils/storage';
import { sound } from '../utils/sound';
import { astroVoice } from '../utils/speech';
import { cosmicBGM } from '../utils/bgm';

export type ActivePanel =
  | 'none'
  | 'planet-detail'
  | 'missions'
  | 'badges'
  | 'encyclopedia'
  | 'quiz'
  | 'easter-egg-lunar'
  | 'rocket-launch'
  | 'settings'
  | 'astro-talk'
  | 'iss-details'
  | 'jwst-details'
  | 'guide';

export interface CameraTarget {
  lookAt: [number, number, number];
  camPos: [number, number, number];
}

export interface AstroDialogueState {
  text: string;
  mood: 'happy' | 'waving' | 'thinking' | 'celebrating' | 'hint' | 'explaining';
  visible: boolean;
}

interface GameContextType {
  selectedPlanet: PlanetData | null;
  selectPlanet: (planet: PlanetData | null) => void;
  resetCameraOverview: () => void;
  overviewTrigger: number;

  cameraTarget: CameraTarget | null;
  flyCameraTo: (target: [number, number, number], offset?: [number, number, number]) => void;

  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  isPaused: boolean;
  togglePause: () => void;

  activePanel: ActivePanel;
  openPanel: (panel: ActivePanel) => void;
  closePanel: () => void;

  userProgress: UserProgress;
  addXP: (amount: number, reason?: string) => void;
  completeMission: (missionId: string) => boolean;
  unlockBadge: (badgeId: string) => boolean;
  resetAllProgress: () => void;

  astroDialogue: AstroDialogueState;
  showAstroMessage: (text: string, mood?: AstroDialogueState['mood']) => void;
  dismissAstroMessage: () => void;

  triggerConfetti: () => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  isMusicPlaying: boolean;
  toggleOrbitLines: () => void;
  toggleLabels: () => void;
  setGraphicsQuality: (quality: 'high' | 'medium' | 'low') => void;

  // Guided Tour System
  isTourActive: boolean;
  tourStepIndex: number;
  isTourAutoplay: boolean;
  startGuidedTour: () => void;
  stopGuidedTour: () => void;
  nextTourStop: () => void;
  prevTourStop: () => void;
  goToTourStop: (index: number) => void;
  toggleTourAutoplay: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [overviewTrigger, setOverviewTrigger] = useState<number>(0);
  const [cameraTarget, setCameraTarget] = useState<CameraTarget | null>(null);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>('none');

  // Guided Tour State
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);
  const [isTourAutoplay, setIsTourAutoplay] = useState<boolean>(false);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => loadUserProgress());

  const [astroDialogue, setAstroDialogue] = useState<AstroDialogueState>({
    text: 'Halo Sobat Cilik! Aku Astro! Tekan tombol "Tur Astro" di atas agar aku bisa mengajakmu terbang berkeliling tata surya kita!',
    mood: 'waving',
    visible: true,
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  useEffect(() => {
    sound.setEnabled(userProgress.settings.soundEnabled);
  }, [userProgress.settings.soundEnabled]);

  useEffect(() => {
    cosmicBGM.setEnabled(userProgress.settings.musicEnabled);
    setIsMusicPlaying(userProgress.settings.musicEnabled);
  }, [userProgress.settings.musicEnabled]);

  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#ffffff', '#10b981', '#f43f5e'],
      });
    } catch {
      // Ignored safely
    }
  }, []);

  const showAstroMessage = useCallback((text: string, mood: AstroDialogueState['mood'] = 'happy') => {
    setAstroDialogue({
      text,
      mood,
      visible: true,
    });
    if (mood === 'celebrating') {
      sound.playAstroHappy();
    } else {
      sound.playAstroBlip();
    }
  }, []);

  const dismissAstroMessage = useCallback(() => {
    setAstroDialogue((prev) => ({ ...prev, visible: false }));
    sound.playClick();
  }, []);

  const addXP = useCallback((amount: number, reason?: string) => {
    setUserProgress((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = calculateLevel(newXp);
      const newRank = calculateRankTitle(newLevel);

      if (newLevel > prev.level) {
        setTimeout(() => {
          showAstroMessage(`Hore! Kamu naik ke Level ${newLevel}: ${newRank}! Kerja bagus, Penjelajah!`, 'celebrating');
          sound.playSuccess();
          triggerConfetti();
        }, 500);
      } else {
        sound.playXpGain();
        if (reason) {
          showAstroMessage(`+${amount} XP: ${reason}! Hebat!`, 'celebrating');
        }
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        rankTitle: newRank,
      };
    });
  }, [showAstroMessage, triggerConfetti]);

  const unlockBadge = useCallback((badgeId: string): boolean => {
    let unlocked = false;
    setUserProgress((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;

      unlocked = true;
      const badge = BADGES_DATA[badgeId];
      const newBadges = [...prev.unlockedBadges, badgeId];

      setTimeout(() => {
        sound.playSuccess();
        triggerConfetti();
        if (badge) {
          showAstroMessage(`Lencana Baru Dibuka: "${badge.name}"! ${badge.description}`, 'celebrating');
        }
      }, 300);

      return {
        ...prev,
        unlockedBadges: newBadges,
      };
    });
    return unlocked;
  }, [showAstroMessage, triggerConfetti]);

  const completeMission = useCallback((missionId: string): boolean => {
    const mission = MISSIONS_DATA.find((m) => m.id === missionId);
    if (!mission) return false;

    let justCompleted = false;
    setUserProgress((prev) => {
      if (prev.completedMissions.includes(missionId)) return prev;

      justCompleted = true;
      const updatedMissions = [...prev.completedMissions, missionId];
      const newXp = prev.xp + mission.xpReward;
      const newLevel = calculateLevel(newXp);
      const newRank = calculateRankTitle(newLevel);

      const newBadges = prev.unlockedBadges.includes(mission.badgeId)
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, mission.badgeId];

      setTimeout(() => {
        sound.playSuccess();
        triggerConfetti();
        showAstroMessage(`Hebat! Kamu menyelesaikan "${mission.title}"! (+${mission.xpReward} XP)`, 'celebrating');
      }, 400);

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        rankTitle: newRank,
        completedMissions: updatedMissions,
        unlockedBadges: newBadges,
      };
    });

    return justCompleted;
  }, [showAstroMessage, triggerConfetti]);

  const selectPlanet = useCallback((planet: PlanetData | null) => {
    sound.playPlanetSelect();
    setSelectedPlanet(planet);

    if (planet) {
      setUserProgress((prev) => {
        if (!prev.visitedPlanets.includes(planet.id)) {
          return { ...prev, visitedPlanets: [...prev.visitedPlanets, planet.id] };
        }
        return prev;
      });

      if (planet.id === 'mars') {
        showAstroMessage('Kamu menemukan Mars! Perhatikan warna merah karat besinya yang khas.', 'happy');
        completeMission('mission-1');
      } else if (planet.id === 'earth') {
        showAstroMessage('Ini Bumi kita! Ada daratan hijau, samudra biru yang luas, dan satelit Bulan kita.', 'happy');
      } else if (planet.id === 'saturn') {
        showAstroMessage('Wah, megahnya cincin Saturnus! Yuk, teliti dari sudut mana pun!', 'happy');
      } else if (planet.id === 'jupiter') {
        showAstroMessage('Jupiter sangat raksasa! Perhatikan pusaran Badai Bintik Merah Raksasanya.', 'happy');
      } else {
        showAstroMessage(`Planet ${planet.indonesianName}: ${planet.tagline}`, 'happy');
      }

      setActivePanel('planet-detail');
    }
  }, [showAstroMessage, completeMission]);

  const resetCameraOverview = useCallback(() => {
    sound.playClick();
    setSelectedPlanet(null);
    setCameraTarget(null);
    setActivePanel('none');
    setOverviewTrigger((prev) => prev + 1);
    showAstroMessage('Kembali ke pemandangan seluruh tata surya. Lihat bagaimana mereka mengelilingi Matahari!', 'happy');
  }, [showAstroMessage]);

  const flyCameraTo = useCallback((target: [number, number, number], offset: [number, number, number] = [3, 2, 4]) => {
    sound.playClick();
    setCameraTarget({
      lookAt: target,
      camPos: [target[0] + offset[0], target[1] + offset[1], target[2] + offset[2]],
    });
  }, []);

  const openPanel = useCallback((panel: ActivePanel) => {
    sound.playModalOpen();
    setIsTourActive(false);
    astroVoice.stop();
    setActivePanel(panel);
  }, []);

  const closePanel = useCallback(() => {
    sound.playModalClose();
    setActivePanel('none');
  }, []);

  // Guided Tour Actions
  const startGuidedTour = useCallback(() => {
    sound.playTourStep();
    setActivePanel('none');
    setSelectedPlanet(null);
    setIsTourActive(true);
    setTourStepIndex(0);
    setIsTourAutoplay(false);

    const firstStop = ASTRO_TOUR_STOPS[0];
    setCameraTarget({
      lookAt: firstStop.targetPosition,
      camPos: [
        firstStop.targetPosition[0] + firstStop.camOffset[0],
        firstStop.targetPosition[1] + firstStop.camOffset[1],
        firstStop.targetPosition[2] + firstStop.camOffset[2],
      ],
    });

    showAstroMessage(firstStop.astroSpeech, firstStop.astroMood);
    astroVoice.speak(firstStop.astroSpeech);
    addXP(15, 'Memulai Tur Antariksa Bersama Astro');
  }, [addXP, showAstroMessage]);

  const stopGuidedTour = useCallback(() => {
    sound.playModalClose();
    setIsTourActive(false);
    setIsTourAutoplay(false);
    astroVoice.stop();
    resetCameraOverview();
  }, [resetCameraOverview]);

  const goToTourStop = useCallback((index: number) => {
    if (index < 0 || index >= ASTRO_TOUR_STOPS.length) return;
    sound.playTourStep();
    setTourStepIndex(index);
    const stop = ASTRO_TOUR_STOPS[index];
    setCameraTarget({
      lookAt: stop.targetPosition,
      camPos: [
        stop.targetPosition[0] + stop.camOffset[0],
        stop.targetPosition[1] + stop.camOffset[1],
        stop.targetPosition[2] + stop.camOffset[2],
      ],
    });
    showAstroMessage(stop.astroSpeech, stop.astroMood);
    astroVoice.speak(stop.astroSpeech);
  }, [showAstroMessage]);

  const nextTourStop = useCallback(() => {
    if (tourStepIndex < ASTRO_TOUR_STOPS.length - 1) {
      goToTourStop(tourStepIndex + 1);
    } else {
      // Completed the grand tour!
      sound.playSuccess();
      triggerConfetti();
      addXP(150, 'Menyelesaikan Tur Keliling Antariksa Bersama Astro');
      unlockBadge('badge-solar-system-explorer');
      setIsTourAutoplay(false);
      showAstroMessage(
        'Horeee! Selamat Sobat Cilik, kamu telah berhasil mengelilingi seluruh tata surya bersama Astro! Kamu adalah penjelajah cilik yang luar biasa!',
        'celebrating'
      );
      astroVoice.speak(
        'Hore! Selamat Sobat Cilik, kamu telah berhasil mengelilingi seluruh tata surya bersama Astro! Kamu adalah penjelajah cilik yang luar biasa!'
      );
    }
  }, [tourStepIndex, goToTourStop, addXP, unlockBadge, triggerConfetti, showAstroMessage]);

  const prevTourStop = useCallback(() => {
    if (tourStepIndex > 0) {
      goToTourStop(tourStepIndex - 1);
    }
  }, [tourStepIndex, goToTourStop]);

  const toggleTourAutoplay = useCallback(() => {
    sound.playClick();
    setIsTourAutoplay((prev) => {
      const next = !prev;
      showAstroMessage(next ? 'Tur otomatis berjalan (10 detik per planet).' : 'Tur otomatis dijeda.', 'thinking');
      return next;
    });
  }, [showAstroMessage]);

  const handleSetSimulationSpeed = useCallback((speed: number) => {
    sound.playSpeedChange(speed);
    setSimulationSpeed(speed);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      sound.playToggle(!next);
      showAstroMessage(next ? 'Simulasi dihentikan sejenak (Pause).' : 'Simulasi kembali berputar!', 'thinking');
      return next;
    });
  }, [showAstroMessage]);

  const toggleSound = useCallback(() => {
    setUserProgress((prev) => {
      const nextVal = !prev.settings.soundEnabled;
      sound.setEnabled(nextVal);
      if (nextVal) sound.playClick();
      return {
        ...prev,
        settings: { ...prev.settings, soundEnabled: nextVal },
      };
    });
  }, []);

  const toggleMusic = useCallback(() => {
    sound.playClick();
    setUserProgress((prev) => {
      const nextVal = !prev.settings.musicEnabled;
      cosmicBGM.setEnabled(nextVal);
      setIsMusicPlaying(nextVal);
      return {
        ...prev,
        settings: { ...prev.settings, musicEnabled: nextVal },
      };
    });
  }, []);

  const toggleOrbitLines = useCallback(() => {
    setUserProgress((prev) => {
      const nextVal = !prev.settings.orbitLinesVisible;
      sound.playToggle(nextVal);
      showAstroMessage(nextVal ? 'Garis orbit ditampilkan.' : 'Garis orbit disembunyikan.', 'thinking');
      return {
        ...prev,
        settings: { ...prev.settings, orbitLinesVisible: nextVal },
      };
    });
  }, [showAstroMessage]);

  const toggleLabels = useCallback(() => {
    setUserProgress((prev) => {
      const nextVal = !prev.settings.labelsVisible;
      sound.playToggle(nextVal);
      return {
        ...prev,
        settings: { ...prev.settings, labelsVisible: nextVal },
      };
    });
  }, []);

  const setGraphicsQuality = useCallback((quality: 'high' | 'medium' | 'low') => {
    sound.playClick();
    setUserProgress((prev) => ({
      ...prev,
      settings: { ...prev.settings, graphicsQuality: quality },
    }));
  }, []);

  const resetAllProgress = useCallback(() => {
    sound.playClick();
    localStorage.removeItem('planet_ku_user_progress_v1');
    setUserProgress(loadUserProgress());
    showAstroMessage('Semua pencapaian telah direset. Ayo mulai petualangan baru dari awal!', 'waving');
  }, [showAstroMessage]);

  return (
    <GameContext.Provider
      value={{
        selectedPlanet,
        selectPlanet,
        resetCameraOverview,
        overviewTrigger,
        cameraTarget,
        flyCameraTo,
        simulationSpeed,
        setSimulationSpeed: handleSetSimulationSpeed,
        isPaused,
        togglePause,
        activePanel,
        openPanel,
        closePanel,
        userProgress,
        addXP,
        completeMission,
        unlockBadge,
        resetAllProgress,
        astroDialogue,
        showAstroMessage,
        dismissAstroMessage,
        triggerConfetti,
        toggleSound,
        toggleMusic,
        isMusicPlaying,
        toggleOrbitLines,
        toggleLabels,
        setGraphicsQuality,
        isTourActive,
        tourStepIndex,
        isTourAutoplay,
        startGuidedTour,
        stopGuidedTour,
        nextTourStop,
        prevTourStop,
        goToTourStop,
        toggleTourAutoplay,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
