import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';
import { updateCelestialPosition } from '../../utils/celestialRegistry';

export const CosmicEasterEggs: React.FC = () => {
  const {
    openPanel,
    addXP,
    unlockBadge,
    showAstroMessage,
    triggerConfetti,
    simulationSpeed,
    isPaused,
    userProgress,
  } = useGame();

  // 1. Meteor Streaker State
  const meteorRef = useRef<THREE.Group>(null);
  const [meteorActive, setMeteorActive] = useState<boolean>(true);
  const meteorTimerRef = useRef<number>(0);
  const meteorProgressRef = useRef<number>(0);

  // 2. ISS Orbit State
  const issRef = useRef<THREE.Group>(null);
  const issAngleRef = useRef<number>(0.8);

  // 3. JWST Floating State
  const jwstRef = useRef<THREE.Group>(null);

  // 4. Aurora Glow State
  const auroraRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const effective = isPaused ? 0 : simulationSpeed;

    // --- Meteor Animation ---
    meteorTimerRef.current += delta * effective;
    if (meteorActive && meteorRef.current) {
      meteorProgressRef.current += delta * 0.45 * effective;

      if (meteorProgressRef.current >= 1) {
        // Disappear and reset timer for next flyby
        setMeteorActive(false);
        meteorTimerRef.current = 0;
      } else {
        // Lerp position across sky
        const t = meteorProgressRef.current;
        const startX = -45, startY = 22, startZ = -30;
        const endX = 45, endY = -15, endZ = 30;

        meteorRef.current.position.set(
          startX + (endX - startX) * t,
          startY + (endY - startY) * t,
          startZ + (endZ - startZ) * t
        );
      }
    } else {
      // Re-trigger meteor every 14 seconds
      if (meteorTimerRef.current > 14) {
        meteorProgressRef.current = 0;
        setMeteorActive(true);
      }
    }

    // --- ISS Earth Orbit Animation ---
    if (issRef.current) {
      issAngleRef.current += delta * 0.08 * effective;
      const earthBaseRadius = 14.5;
      const earthX = Math.cos(issAngleRef.current * 0.25) * earthBaseRadius;
      const earthZ = Math.sin(issAngleRef.current * 0.25) * earthBaseRadius;

      // Orbit closely around Earth
      const issLocalDist = 2.8;
      const localAngle = issAngleRef.current * 1.8;
      issRef.current.position.set(
        earthX + Math.cos(localAngle) * issLocalDist,
        Math.sin(localAngle * 2) * 0.6 + 0.3,
        earthZ + Math.sin(localAngle) * issLocalDist
      );
      issRef.current.rotation.y = -localAngle;
      updateCelestialPosition(
        'iss',
        issRef.current.position.x,
        issRef.current.position.y,
        issRef.current.position.z
      );
    }

    // --- JWST Subtle Floating ---
    if (jwstRef.current) {
      const time = Date.now() * 0.001;
      jwstRef.current.position.y = 3.5 + Math.sin(time * 0.8) * 0.2;
      jwstRef.current.rotation.y += delta * 0.03 * effective;
      updateCelestialPosition('jwst', 22, jwstRef.current.position.y, 14);
    }

    // --- Aurora Pulsing ---
    if (auroraRef.current) {
      const time = Date.now() * 0.002;
      const mat = auroraRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.35 + Math.sin(time) * 0.2;
      }
    }
  });

  const handleCatchMeteor = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playEasterEgg();
    triggerConfetti();
    addXP(40, 'Menangkap Meteor Jatuh!');
    unlockBadge('badge-meteor-hunter');
    showAstroMessage('Wuuusss! Refleks yang hebat! Kamu berhasil menangkap meteor melintas!', 'celebrating');
    setMeteorActive(false);
    meteorTimerRef.current = 0;
  };

  const handleOpenISS = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playTelemetry();
    openPanel('iss-details');
    showAstroMessage('Ini Stasiun Luar Angkasa Internasional (ISS)! Tempat para astronaut tinggal dan bekerja di luar bumi.', 'explaining');
  };

  const handleOpenJWST = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playTelescopeScan();
    openPanel('jwst-details');
    showAstroMessage('Teleskop Antariksa James Webb (JWST)! Cermin emasnya mengintip cahaya bintang paling awal di alam semesta.', 'explaining');
  };

  return (
    <group>
      {/* 1. STREAKING METEOR (Interactive Shooting Star Easter Egg) */}
      {meteorActive && (
        <group
          ref={meteorRef}
          onClick={handleCatchMeteor}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          {/* Meteor Head (fiery white/gold core) */}
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Glowing Corona */}
          <mesh scale={[1.6, 1.6, 1.6]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
          </mesh>

          {/* Fiery Cosmic Plasma Trail */}
          <mesh position={[-2.4, 1.0, -1.8]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[0.6, 5.0, 12]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
          </mesh>

          {/* Clickable Hint Pill */}
          <Html distanceFactor={28} center style={{ pointerEvents: 'none' }}>
            <div
              style={{
                padding: '2px 8px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.92)',
                border: '1px solid #fbbf24',
                color: '#fbbf24',
                fontSize: '11px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.8)',
              }}
            >
              Tangkap Meteor!
            </div>
          </Html>
        </group>
      )}

      {/* 2. INTERNATIONAL SPACE STATION (ISS) - Human Activity Outside Earth */}
      <group
        ref={issRef}
        onClick={handleOpenISS}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        scale={[0.35, 0.35, 0.35]}
      >
        {/* Central Truss Beam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.2, 0.25, 0.25]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Central Pressurized Living Modules (Destiny, Unity, Zvezda) */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 2.8, 16]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.4} roughness={0.2} />
        </mesh>

        {/* Cupola Window Dome */}
        <mesh position={[0, -0.45, 0.4]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Left Solar Panel Wings */}
        <group position={[-1.6, 0, 0]}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.9, 1.4, 0.05]} />
            <meshStandardMaterial color="#334155" emissive="#1e293b" emissiveIntensity={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, -0.8, 0]}>
            <boxGeometry args={[0.9, 1.4, 0.05]} />
            <meshStandardMaterial color="#334155" emissive="#1e293b" emissiveIntensity={0.2} metalness={0.7} />
          </mesh>
        </group>

        {/* Right Solar Panel Wings */}
        <group position={[1.6, 0, 0]}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.9, 1.4, 0.05]} />
            <meshStandardMaterial color="#334155" emissive="#1e293b" emissiveIntensity={0.2} metalness={0.7} />
          </mesh>
          <mesh position={[0, -0.8, 0]}>
            <boxGeometry args={[0.9, 1.4, 0.05]} />
            <meshStandardMaterial color="#334155" emissive="#1e293b" emissiveIntensity={0.2} metalness={0.7} />
          </mesh>
        </group>

        {/* Spacewalking Astronaut (EVA) on a safety tether! */}
        <group position={[0.6, -0.6, 0.8]} scale={[0.4, 0.4, 0.4]}>
          {/* Astronaut Body */}
          <mesh>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Helmet Visor */}
          <mesh position={[0, 0.05, 0.22]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Tether Line */}
          <mesh position={[-0.4, 0.4, -0.4]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 6]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>

        {/* 3D Label */}
        {userProgress.settings.labelsVisible && (
          <Html position={[0, 1.8, 0]} center distanceFactor={22} style={{ pointerEvents: 'auto' }}>
            <button
              onClick={handleOpenISS}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1.5px solid #10b981',
                color: '#10b981',
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
              }}
            >
              Stasiun Luar Angkasa ISS
            </button>
          </Html>
        )}
      </group>

      {/* 3. JAMES WEBB SPACE TELESCOPE (Deep Space Observation) */}
      <group
        ref={jwstRef}
        position={[22, 3.5, 14]}
        onClick={handleOpenJWST}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        scale={[0.45, 0.45, 0.45]}
      >
        {/* Diamond Sunshield Base (Silver Foil Layers) */}
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <boxGeometry args={[4.2, 2.4, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Golden Primary Hexagonal Mirror Array */}
        <group position={[0, 0.9, 0]} rotation={[-0.3, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[1.3, 1.3, 0.12, 6]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.4}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>

          {/* Secondary Mirror Support Struts */}
          <mesh position={[0, 0.6, 0.8]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 0.9, 1.2]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} />
          </mesh>
        </group>

        {/* 3D Label */}
        {userProgress.settings.labelsVisible && (
          <Html position={[0, 2.2, 0]} center distanceFactor={24} style={{ pointerEvents: 'auto' }}>
            <button
              onClick={handleOpenJWST}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '999px',
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1.5px solid #f59e0b',
                color: '#fbbf24',
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
              }}
            >
              Teleskop James Webb
            </button>
          </Html>
        )}
      </group>

      {/* 4. DISTANT SUPERNOVA PULSE (Cosmic Light Flashes in deep space) */}
      <group position={[-50, 28, -60]}>
        <mesh>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh scale={[2.5, 2.5, 2.5]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial color="#fef08a" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
};
