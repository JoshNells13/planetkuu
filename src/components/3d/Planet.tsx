import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetData } from '../../types/astronomy';
import { useGame } from '../../context/GameContext';
import { getPlanetTexture, getSaturnRingTexture } from '../../utils/textures';

interface PlanetProps {
  planet: PlanetData;
  initialAngle?: number;
}

export const Planet: React.FC<PlanetProps> = ({ planet, initialAngle = 0 }) => {
  const {
    selectPlanet,
    selectedPlanet,
    simulationSpeed,
    isPaused,
    userProgress,
    openPanel,
    showAstroMessage,
  } = useGame();

  const orbitGroupRef = useRef<THREE.Group>(null);
  const planetBodyRef = useRef<THREE.Mesh>(null);
  const cloudMeshRef = useRef<THREE.Mesh>(null);
  const moonGroupRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const angleRef = useRef<number>(initialAngle);

  // Generate procedural canvas texture
  const texture = useMemo(() => getPlanetTexture(planet.id), [planet.id]);
  const saturnRingTexture = useMemo(() => {
    return planet.id === 'saturn' ? getSaturnRingTexture() : null;
  }, [planet.id]);

  const isSelected = selectedPlanet?.id === planet.id;

  // Axial tilt in radians
  const axialTiltRad = useMemo(() => (planet.axialTiltDeg * Math.PI) / 180, [planet.axialTiltDeg]);

  useFrame((_, delta) => {
    const effectiveSpeed = isPaused ? 0 : simulationSpeed;

    // Revolution around Sun
    angleRef.current += delta * planet.orbitSpeed * effectiveSpeed * 1.5;
    const x = Math.cos(angleRef.current) * planet.orbitRadius;
    const z = Math.sin(angleRef.current) * planet.orbitRadius;

    if (orbitGroupRef.current) {
      orbitGroupRef.current.position.set(x, 0, z);
    }

    // Rotation on its axis
    if (planetBodyRef.current) {
      planetBodyRef.current.rotation.y += delta * planet.rotationSpeed * effectiveSpeed * 25;
    }

    // Earth's cloud layer
    if (cloudMeshRef.current) {
      cloudMeshRef.current.rotation.y += delta * (planet.rotationSpeed * 1.25) * effectiveSpeed * 25;
    }

    // Earth's Moon revolution
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y += delta * 1.2 * effectiveSpeed;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    selectPlanet(planet);
  };

  const handleMoonClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    openPanel('easter-egg-lunar');
    showAstroMessage('Kamu menemukan Bulan! Mari kita selidiki pendaratan bersejarah Apollo 11 di sini!', 'celebrating');
  };

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [hovered]);

  return (
    <group ref={orbitGroupRef}>
      {/* Tilt container */}
      <group rotation={[axialTiltRad, 0, 0]}>
        {/* Planet Sphere */}
        <mesh
          ref={planetBodyRef}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? [1.08, 1.08, 1.08] : [1, 1, 1]}
        >
          <sphereGeometry args={[planet.radius, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.7}
            metalness={0.1}
            color={planet.color}
          />
        </mesh>

        {/* Earth's Atmospheric Cloud Layer */}
        {planet.id === 'earth' && (
          <mesh ref={cloudMeshRef} scale={[1.025, 1.025, 1.025]}>
            <sphereGeometry args={[planet.radius, 32, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.28}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Atmospheric Glow Rim */}
        <mesh scale={[1.06, 1.06, 1.06]}>
          <sphereGeometry args={[planet.radius, 24, 24]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={hovered || isSelected ? 0.35 : 0.12}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Selected Highlight Beacon */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.radius * 1.35, planet.radius * 1.45, 36]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Saturn's Iconic Rings */}
        {planet.id === 'saturn' && planet.hasRings && saturnRingTexture && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[planet.ringInnerRadius || 2.3, planet.ringOuterRadius || 4.2, 64]}
            />
            <meshStandardMaterial
              map={saturnRingTexture}
              transparent
              opacity={0.92}
              side={THREE.DoubleSide}
              roughness={0.4}
            />
          </mesh>
        )}

        {/* Uranus' Tilted Faint Rings */}
        {planet.id === 'uranus' && planet.hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[planet.ringInnerRadius || 1.7, planet.ringOuterRadius || 2.2, 48]}
            />
            <meshBasicMaterial
              color="#bae6fd"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Earth's Orbiting Moon with Easter Egg Apollo site */}
        {planet.id === 'earth' && (
          <group ref={moonGroupRef}>
            {/* Moon Orbit Line */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2.48, 2.52, 40]} />
              <meshBasicMaterial color="#94a3b8" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>

            {/* Moon Celestial Body */}
            <group position={[2.5, 0, 0]}>
              <mesh
                ref={moonMeshRef}
                onClick={handleMoonClick}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'auto';
                }}
                scale={[1, 1, 1]}
              >
                <sphereGeometry args={[0.35, 20, 20]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
              </mesh>

              {/* Moon Label */}
              {userProgress.settings.labelsVisible && (
                <Html position={[0, 0.6, 0]} center distanceFactor={22} style={{ pointerEvents: 'none' }}>
                  <div
                    style={{
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: 'rgba(51, 65, 85, 0.9)',
                      border: '1px solid #94a3b8',
                      color: '#f8fafc',
                      fontFamily: 'var(--font-display)',
                      fontSize: '11px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    Bulan (Apollo 11)
                  </div>
                </Html>
              )}
            </group>
          </group>
        )}
      </group>

      {/* 3D Floating Name Label */}
      {userProgress.settings.labelsVisible && (
        <Html
          position={[0, planet.radius + 0.9, 0]}
          center
          distanceFactor={28}
          style={{ pointerEvents: 'auto' }}
        >
          <button
            onClick={handleClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              background: isSelected
                ? '#000000'
                : hovered
                ? 'rgba(24, 27, 36, 0.95)'
                : 'rgba(5, 6, 8, 0.85)',
              backdropFilter: 'blur(12px)',
              border: isSelected
                ? '1.5px solid #ffffff'
                : hovered
                ? '1px solid rgba(255, 255, 255, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: isSelected
                ? '0 0 16px rgba(255, 255, 255, 0.4), 0 8px 24px rgba(0,0,0,0.9)'
                : '0 4px 14px rgba(0,0,0,0.8)',
              transition: 'all 0.2s ease',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <span>{planet.indonesianName}</span>
          </button>
        </Html>
      )}
    </group>
  );
};
