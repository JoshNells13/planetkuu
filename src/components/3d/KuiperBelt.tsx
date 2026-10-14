import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const KuiperBelt: React.FC = () => {
  const beltRef = useRef<THREE.Group>(null);
  const { simulationSpeed, isPaused, showAstroMessage } = useGame();

  const count = 400;
  const innerRadius = 43;
  const outerRadius = 50;

  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const dist = innerRadius + Math.random() * (outerRadius - innerRadius);
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = (Math.random() - 0.5) * 3.5;
      const scale = 0.09 + Math.random() * 0.18;

      items.push({
        pos: [x, y, z] as [number, number, number],
        scale: [scale, scale, scale] as [number, number, number],
        color: Math.random() > 0.4 ? '#94a3b8' : '#7dd3fc',
      });
    }
    return items;
  }, [count, innerRadius, outerRadius]);

  useFrame((_, delta) => {
    if (beltRef.current) {
      const speed = isPaused ? 0 : simulationSpeed;
      beltRef.current.rotation.y += delta * 0.002 * speed;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playAsteroidChime();
    showAstroMessage('Ini Sabuk Kuiper! Cincin es raksasa di tepi luar tata surya kita, tempat Pluto dan jutaan komet dingin mengorbit!', 'explaining');
  };

  return (
    <group
      ref={beltRef}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; sound.playSubtleHover(); }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.pos} scale={p.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={p.color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};
