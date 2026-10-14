import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

export const Pluto: React.FC = () => {
  const plutoGroupRef = useRef<THREE.Group>(null);
  const plutoBodyRef = useRef<THREE.Mesh>(null);
  const charonGroupRef = useRef<THREE.Group>(null);
  const angleRef = useRef<number>(1.2);

  const { simulationSpeed, isPaused, userProgress, showAstroMessage, addXP, unlockBadge, triggerConfetti } = useGame();

  // Procedural Pluto texture with heart-shaped Tombaugh Regio
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Tan / reddish-brown background
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, '#78350f');
    grad.addColorStop(0.5, '#b45309');
    grad.addColorStop(1, '#451a03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);

    // Heart-shaped Tombaugh Regio (White Nitrogen Ice Sheet)
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(128, 64, 30, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(150, 68, 24, 20, 0.2, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((_, delta) => {
    const effective = isPaused ? 0 : simulationSpeed;
    angleRef.current += delta * 0.002 * effective;

    const orbitRadius = 46;
    const x = Math.cos(angleRef.current) * orbitRadius;
    const z = Math.sin(angleRef.current) * orbitRadius;
    const y = Math.sin(angleRef.current * 1.5) * 3.5; // Inclined orbit (17 degrees!)

    if (plutoGroupRef.current) {
      plutoGroupRef.current.position.set(x, y, z);
    }
    if (plutoBodyRef.current) {
      plutoBodyRef.current.rotation.y += delta * 0.01 * effective;
    }
    if (charonGroupRef.current) {
      charonGroupRef.current.rotation.y += delta * 0.3 * effective;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playSuccess();
    triggerConfetti();
    addXP(30, 'Menemukan Planet Kerdil Pluto');
    unlockBadge('badge-meteor-hunter');
    showAstroMessage(
      'Kamu menemukan Pluto! Lihat daratan es nitrogen putih berbentuk hati raksasa (Tombaugh Regio) di permukaannya!',
      'celebrating'
    );
  };

  return (
    <group ref={plutoGroupRef}>
      {/* Pluto Body */}
      <mesh
        ref={plutoBodyRef}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        scale={[0.65, 0.65, 0.65]}
      >
        <sphereGeometry args={[1, 28, 28]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>

      {/* Moon Charon */}
      <group ref={charonGroupRef}>
        <mesh position={[1.4, 0, 0]} scale={[0.26, 0.26, 0.26]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.9} />
        </mesh>
      </group>

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
            Pluto (Kerdil)
          </button>
        </Html>
      )}
    </group>
  );
};
