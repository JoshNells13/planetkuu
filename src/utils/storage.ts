import type { UserProgress } from '../types/gamification';

const STORAGE_KEY = 'planet_ku_user_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  rankTitle: 'Kadet Antariksa',
  completedMissions: [],
  unlockedBadges: [],
  visitedPlanets: [],
  easterEggsFound: [],
  quizBestScore: 0,
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    orbitLinesVisible: true,
    labelsVisible: true,
    graphicsQuality: 'high',
    reducedMotion: false,
  },
};

export function calculateRankTitle(level: number): string {
  if (level >= 5) return 'Komandan Kosmik';
  if (level >= 4) return 'Kapten Galaksi';
  if (level >= 3) return 'Penjelajah Bintang';
  if (level >= 2) return 'Pengamat Antariksa';
  return 'Kadet Antariksa';
}

export function calculateLevel(xp: number): number {
  // 0 - 99 XP: Level 1
  // 100 - 199 XP: Level 2
  // 200 - 349 XP: Level 3
  // 350 - 499 XP: Level 4
  // 500+ XP: Level 5
  if (xp >= 500) return 5;
  if (xp >= 350) return 4;
  if (xp >= 200) return 3;
  if (xp >= 100) return 2;
  return 1;
}

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };

    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return { ...DEFAULT_PROGRESS };
    }

    // Validate and sanitize fields
    const safeXp = typeof parsed.xp === 'number' && !isNaN(parsed.xp) && parsed.xp >= 0 ? parsed.xp : 0;
    const computedLevel = calculateLevel(safeXp);
    const computedRank = calculateRankTitle(computedLevel);

    const validated: UserProgress = {
      xp: safeXp,
      level: computedLevel,
      rankTitle: computedRank,
      completedMissions: Array.isArray(parsed.completedMissions) ? parsed.completedMissions.filter((x: unknown) => typeof x === 'string') : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges.filter((x: unknown) => typeof x === 'string') : [],
      visitedPlanets: Array.isArray(parsed.visitedPlanets) ? parsed.visitedPlanets.filter((x: unknown) => typeof x === 'string') : [],
      easterEggsFound: Array.isArray(parsed.easterEggsFound) ? parsed.easterEggsFound.filter((x: unknown) => typeof x === 'string') : [],
      quizBestScore: typeof parsed.quizBestScore === 'number' ? parsed.quizBestScore : 0,
      settings: {
        soundEnabled: parsed.settings?.soundEnabled ?? true,
        musicEnabled: parsed.settings?.musicEnabled ?? true,
        orbitLinesVisible: parsed.settings?.orbitLinesVisible ?? true,
        labelsVisible: parsed.settings?.labelsVisible ?? true,
        graphicsQuality: ['high', 'medium', 'low'].includes(parsed.settings?.graphicsQuality) ? parsed.settings.graphicsQuality : 'high',
        reducedMotion: parsed.settings?.reducedMotion ?? false,
      },
    };

    return validated;
  } catch (e) {
    console.warn('Failed to load user progress from localStorage, returning defaults', e);
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    // Recalculate level and rank prior to save
    const level = calculateLevel(progress.xp);
    const rankTitle = calculateRankTitle(level);
    const toSave: UserProgress = {
      ...progress,
      level,
      rankTitle,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save user progress to localStorage', e);
  }
}

export function clearUserProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignored
    }
  }
  return { ...DEFAULT_PROGRESS };
}
