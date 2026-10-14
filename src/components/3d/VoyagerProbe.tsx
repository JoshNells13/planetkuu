import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const VoyagerProbe: React.FC = () => {
  const probeRef = useRef<THREE.Group>(null);
  const { userProgress, showAstroMessage, addXP, triggerConfetti } = useGame();

  useFrame((_, delta) => {
    if (probeRef.current) {
      probeRef.current.rotation.y += delta * 0.05;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playSuccess();
    triggerConfetti();
    addXP(40, 'Menemukan Wahana Antarbintang Voyager 1');
    showAstroMessage(
      'Voyager 1! Objek buatan manusia terjauh di ruang antarbintang (24 miliar km dari Bumi). Wahana ini membawa Piringan Emas (Golden Record) berisi rekaman salam damai dan musik Bumi untuk peradaban asing!',
      'celebrating'
    );
  };

  return (
    <group
      ref={probeRef}
      position={[52, 6, 20]}
      scale={[0.5, 0.5, 0.5]}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {/* Parabolic High-Gain Dish Antenna (White) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.8, 0.2, 0.5, 32, 1, true]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Subreflector on central tripod */}
      <mesh position={[0, 0, 0.9]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* Central Electronics Equipment Bay (10-sided bus) */}
      <mesh position={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.8, 0.8, 0.6, 10]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Iconic Golden Record Disc on the side */}
      <mesh position={[0.7, 0, -0.4]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.04, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* RTG Power Boom */}
      <mesh position={[-1.4, 0, -0.6]} rotation={[0, 0, Math.PI / 3]}>
        <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Magnetometer Boom */}
      <mesh position={[0, 1.8, -0.8]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 3.2, 8]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* 3D Label */}
      {userProgress.settings.labelsVisible && (
        <Html position={[0, 2.5, 0]} center distanceFactor={28} style={{ pointerEvents: 'auto' }}>
          <button
            onClick={handleClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '999px',
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(251, 191, 36, 0.5)',
              color: '#fbbf24',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
            }}
          >
            Voyager 1 (Antarbintang)
          </button>
        </Html>
      )}
    </group>
  );
};
