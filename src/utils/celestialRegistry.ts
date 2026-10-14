import * as THREE from 'three';

/**
 * Live registry holding current 3D world coordinates of all active objects in the scene.
 * Ensures the Camera, Astro Tour, and Celestial Guide always track exact real-time planet positions
 * as they revolve around the Sun, avoiding pointing at empty space.
 */
export const liveCelestialPositions: Record<string, THREE.Vector3> = {
  sun: new THREE.Vector3(0, 0, 0),
  mercury: new THREE.Vector3(7, 0, 0),
  venus: new THREE.Vector3(7.42, 0, 7.42),
  earth: new THREE.Vector3(0, 0, 14.5),
  mars: new THREE.Vector3(-13.08, 0, 13.08),
  jupiter: new THREE.Vector3(-24, 0, 0),
  saturn: new THREE.Vector3(-20.86, 0, -20.86),
  uranus: new THREE.Vector3(0, 0, -35),
  neptune: new THREE.Vector3(28.28, 0, -28.28),
  moon: new THREE.Vector3(0, 0, 14.5),
  iss: new THREE.Vector3(0, 0.4, 14.5),
  pluto: new THREE.Vector3(46, 2.2, 0),
  asteroids: new THREE.Vector3(21.5, 0.5, 0),
  comet: new THREE.Vector3(-32, 8, -18),
  jwst: new THREE.Vector3(22, 3.5, 14),
  voyager: new THREE.Vector3(52, 6, 20),
};

export function updateCelestialPosition(id: string, x: number, y: number, z: number) {
  if (!liveCelestialPositions[id]) {
    liveCelestialPositions[id] = new THREE.Vector3(x, y, z);
  } else {
    liveCelestialPositions[id].set(x, y, z);
  }
}

export function getCelestialPosition(id: string): THREE.Vector3 | null {
  return liveCelestialPositions[id] || null;
}
