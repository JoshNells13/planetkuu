import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const AsteroidBelt: React.FC = () => {
  const beltRef = useRef<THREE.Group>(null);
  const { simulationSpeed, isPaused, showAstroMessage } = useGame();

  const count = 350;
  const innerRadius = 20.2;
  const outerRadius = 22.8;

  // Generate randomized positions, sizes, and colors for asteroids
  const asteroids = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.1;
      const dist = innerRadius + Math.random() * (outerRadius - innerRadius);
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = (Math.random() - 0.5) * 1.2;
      const scale = 0.08 + Math.random() * 0.16;

      items.push({
        position: [x, y, z] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: [scale, scale, scale] as [number, number, number],
        color: Math.random() > 0.5 ? '#78716c' : '#57534e',
      });
    }
    return items;
  }, [count, innerRadius, outerRadius]);

  useFrame((_, delta) => {
    if (beltRef.current) {
      const speed = isPaused ? 0 : simulationSpeed;
      beltRef.current.rotation.y += delta * 0.007 * speed;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playAsteroidChime();
    showAstroMessage('Ini Sabuk Asteroid! Jutaan batuan luar angkasa sisa pembentukan tata surya yang mengorbit di antara Mars dan Jupiter.', 'explaining');
  };

  return (
    <group
      ref={beltRef}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; sound.playSubtleHover(); }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {asteroids.map((ast, idx) => (
        <mesh key={idx} position={ast.position} rotation={ast.rotation} scale={ast.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={ast.color} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};
