export type CelestialBodyType = 'star' | 'terrestrial' | 'gas_giant' | 'ice_giant' | 'moon';

export interface ScientificData {
  distanceFromSunKm: string;
  diameterKm: string;
  mass: string;
  gravity: string;
  surfaceTemperature: string;
  dayLength: string;
  yearLength: string;
  moonsCount: number;
  atmosphereComposition: string;
}

export interface LearningActivity {
  id: string;
  title: string;
  tagline: string;
  instructions: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  badgeRewardId?: string;
  xpReward: number;
}

export interface PlanetHotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
}

export interface PlanetInternalLayers {
  crustName: string;
  crustDesc: string;
  mantleName: string;
  mantleDesc: string;
  mantleColor: string;
  coreName: string;
  coreDesc: string;
  coreColor: string;
}

export interface PlanetData {
  id: string;
  name: string;
  indonesianName: string;
  tagline: string;
  type: CelestialBodyType;
  color: string;
  emissiveColor?: string;
  secondaryColor?: string;
  ringColor?: string;
  radius: number; // Artistic scale for 3D view
  realDiameterScaleRatio: number; // To show real proportions compare to Earth
  orbitRadius: number; // Simplified orbital distance for kids
  realDistanceRatio: number; // Real astronomical distance ratio (AU or AU multiple)
  orbitSpeed: number; // Relative orbital revolution speed
  rotationSpeed: number; // Spin speed on its axis
  axialTiltDeg: number; // Axial tilt in degrees (e.g., Earth 23.5, Uranus 98)
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  funFacts: string[];
  scientificData: ScientificData;
  artisticScaleNote: string;
  activity: LearningActivity;
  hotspots?: PlanetHotspot[];
  internalLayers?: PlanetInternalLayers;
}
