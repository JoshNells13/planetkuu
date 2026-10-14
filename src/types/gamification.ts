export interface UserProgress {
  xp: number;
  level: number;
  rankTitle: string;
  completedMissions: string[];
  unlockedBadges: string[];
  visitedPlanets: string[];
  easterEggsFound: string[];
  quizBestScore: number;
  settings: {
    soundEnabled: boolean;
    orbitLinesVisible: boolean;
    labelsVisible: boolean;
    graphicsQuality: 'high' | 'medium' | 'low';
    reducedMotion: boolean;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  planetRelated?: string;
}
