import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const HalleyComet: React.FC = () => {
  const cometRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef<number>(0);

  const { simulationSpeed, isPaused, userProgress, showAstroMessage, addXP, triggerConfetti } = useGame();

  useFrame((_, delta) => {
    const effective = isPaused ? 0 : simulationSpeed;
    timeRef.current += delta * 0.05 * effective;

    // Highly eccentric elliptical orbit (from close to Sun out to deep space)
    const a = 28; // semi-major axis
    const b = 15; // semi-minor axis
    const angle = timeRef.current;

    const x = Math.cos(angle) * a - 8;
    const z = Math.sin(angle) * b;
    const y = Math.sin(angle * 1.5) * 6; // Tilted inclination

    if (cometRef.current) {
      cometRef.current.position.set(x, y, z);

      // Tail always points directly away from the Sun (0, 0, 0)
      const sunDir = new THREE.Vector3(-x, -y, -z).normalize();
      const tailDir = sunDir.clone().negate();
      cometRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tailDir);
    }

    if (tailRef.current) {
      // Tail glows brighter and longer when closer to Sun
      const distToSun = Math.sqrt(x * x + y * y + z * z);
      const intensity = Math.max(0.4, (40 - distToSun) / 25);
      tailRef.current.scale.set(1, intensity, 1);
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playCometWhoosh();
    triggerConfetti();
    addXP(30, 'Mengamati Komet Halley');
    showAstroMessage(
      'Ini Komet Halley! Bola es kotor dan debu kosmik. Saat mendekati panas Matahari, esnya menyublim menjadi ekor gas bercahaya jutaan kilometer!',
      'celebrating'
    );
  };

  return (
    <group ref={cometRef}>
      {/* Comet Nucleus (Icy rocky irregular body) */}
      <mesh
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <dodecahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>

      {/* Coma (Luminous glowing gas halo around nucleus) */}
      <mesh scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Long Glowing Gas & Dust Tail (Points away from Sun) */}
      <mesh ref={tailRef} position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.1, 1.8, 9, 16, 1, true]} />
        <meshBasicMaterial
          color="#e2e8f0"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3D Label */}
      {userProgress.settings.labelsVisible && (
        <Html position={[0, 1.2, 0]} center distanceFactor={26} style={{ pointerEvents: 'auto' }}>
          <button
            onClick={handleClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '999px',
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
            }}
          >
            Komet Halley
          </button>
        </Html>
      )}
    </group>
  );
};
