import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SUN_DATA } from '../../data/planets';
import { useGame } from '../../context/GameContext';

export const Sun: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const { userProgress, showAstroMessage } = useGame();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.08;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    showAstroMessage('Ini Matahari! Bintang raksasa bercahaya yang menjadi pusat gravitasi seluruh tata surya kita.', 'explaining');
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Central Solar Core */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[SUN_DATA.radius, 36, 36]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>

      {/* Glowing Soft Corona Shell */}
      <mesh ref={coronaRef} scale={[1.18, 1.18, 1.18]}>
        <sphereGeometry args={[SUN_DATA.radius, 32, 32]} />
        <meshBasicMaterial
          color="#ff7700"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer Halo Glow */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[SUN_DATA.radius, 24, 24]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Primary Point Light illuminating all planets */}
      <pointLight color="#fff7ed" intensity={3.5} distance={200} decay={0.8} />

      {/* 3D Label */}
      {userProgress.settings.labelsVisible && (
        <Html position={[0, SUN_DATA.radius + 1.2, 0]} center distanceFactor={28} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #fbbf24',
              color: '#fbbf24',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.8)',
              whiteSpace: 'nowrap',
            }}
          >
            Matahari
          </div>
        </Html>
      )}
    </group>
  );
};
