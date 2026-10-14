import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { OrbitLine } from './OrbitLine';
import { AsteroidBelt } from './AsteroidBelt';
import { RocketShip } from './RocketShip';
import { CosmicEasterEggs } from './CosmicEasterEggs';
import { Pluto } from './Pluto';
import { HalleyComet } from './HalleyComet';
import { VoyagerProbe } from './VoyagerProbe';
import { KuiperBelt } from './KuiperBelt';
import { CameraController } from './CameraController';
import { PLANETS_DATA } from '../../data/planets';
import { useGame } from '../../context/GameContext';

export const SolarSystemScene: React.FC = () => {
  const { userProgress } = useGame();

  const orbitColors = [
    '#94a3b8', // Mercury
    '#facc15', // Venus
    '#cbd5e1', // Earth - starlight silver (no blue glow)
    '#f87171', // Mars
    '#fb923c', // Jupiter
    '#fde047', // Saturn
    '#94a3b8', // Uranus
    '#64748b', // Neptune
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 42, 60], fov: 45 }}
        dpr={userProgress.settings.graphicsQuality === 'low' ? 1 : [1, 2]}
        gl={{
          antialias: userProgress.settings.graphicsQuality !== 'low',
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Deep Space Background Stars */}
          <Stars
            radius={140}
            depth={70}
            count={userProgress.settings.graphicsQuality === 'low' ? 2000 : 5500}
            factor={4}
            saturation={0.3}
            fade
            speed={0.3}
          />

          {/* Ambient Cosmic Fill Light */}
          <ambientLight color="#0f172a" intensity={0.6} />

          {/* Central Sun */}
          <Sun />

          {/* Planetary Orbital Lines */}
          {PLANETS_DATA.map((planet, idx) => (
            <OrbitLine
              key={`orbit-${planet.id}`}
              radius={planet.orbitRadius}
              color={orbitColors[idx % orbitColors.length]}
              visible={userProgress.settings.orbitLinesVisible}
            />
          ))}

          {/* Pluto Orbit Line */}
          <OrbitLine
            radius={46}
            color="#94a3b8"
            visible={userProgress.settings.orbitLinesVisible}
          />

          {/* All 8 Planets */}
          {PLANETS_DATA.map((planet, idx) => (
            <Planet
              key={planet.id}
              planet={planet}
              initialAngle={(idx * Math.PI) / 4}
            />
          ))}

          {/* Main Asteroid Belt between Mars & Jupiter */}
          <AsteroidBelt />

          {/* Pluto & Moon Charon */}
          <Pluto />

          {/* Kuiper Belt beyond Neptune */}
          <KuiperBelt />

          {/* Halley's Comet with Glowing Gas & Dust Tail */}
          <HalleyComet />

          {/* Interstellar Voyager 1 Probe */}
          <VoyagerProbe />

          {/* Earth Orbiting Rocket Ship */}
          <RocketShip />

          {/* Dynamic Cosmic Easter Eggs (Meteors, ISS Space Station, James Webb Telescope) */}
          <CosmicEasterEggs />

          {/* Interactive Orbit Camera with Guide Target Lerp */}
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
};
