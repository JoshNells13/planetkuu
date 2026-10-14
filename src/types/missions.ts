export type MissionStatus = 'not_started' | 'in_progress' | 'completed';

export interface Mission {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  difficulty: 'Mudah' | 'Menengah' | 'Tantangan';
  targetPlanetId?: string;
  objective: string;
  description: string;
  xpReward: number;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  hint: string;
  actionLabel: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
}
