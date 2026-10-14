import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';

interface RocketShipProps {
  isLaunching?: boolean;
}

export const RocketShip: React.FC<RocketShipProps> = ({ isLaunching = false }) => {
  const rocketRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const { simulationSpeed, isPaused } = useGame();
  const timeRef = useRef<number>(0);

  useFrame((_, delta) => {
    const effective = isPaused ? 0 : simulationSpeed;
    timeRef.current += delta * effective;

    if (rocketRef.current) {
      if (isLaunching) {
        // Spiraling launch trajectory outward
        const altitude = 14.5 + Math.min(timeRef.current * 2, 8);
        const angle = timeRef.current * 1.5;
        rocketRef.current.position.set(
          Math.cos(angle) * altitude,
          Math.sin(timeRef.current * 3) * 2 + 1,
          Math.sin(angle) * altitude
        );
        rocketRef.current.rotation.y = -angle + Math.PI / 2;
        rocketRef.current.rotation.z = 0.3;
      } else {
        // Cruising near Earth orbit
        const baseEarthOrbit = 14.5;
        const angle = timeRef.current * 0.15;
        const localX = Math.cos(angle) * baseEarthOrbit + 1.8;
        const localZ = Math.sin(angle) * baseEarthOrbit + 1.8;
        rocketRef.current.position.set(localX, 0.4, localZ);
        rocketRef.current.rotation.y = -angle + Math.PI / 2;
      }
    }

    if (flameRef.current) {
      const flicker = 0.8 + Math.random() * 0.4;
      flameRef.current.scale.set(1, flicker, 1);
    }
  });

  return (
    <group ref={rocketRef} scale={[0.4, 0.4, 0.4]}>
      {/* Rocket Main Body (White Cylinder) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.45, 2.0, 16]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.3} />
      </mesh>

      {/* Nosecone (Red Cone) */}
      <mesh position={[1.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.35, 0.8, 16]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} />
      </mesh>

      {/* Cockpit Window (Gold Reflective Visor) */}
      <mesh position={[0.5, 0.32, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Fins (Wings) */}
      {[-1, 1].map((dir, i) => (
        <mesh key={i} position={[-0.7, dir * 0.45, 0]} rotation={[0, 0, dir * 0.3]}>
          <boxGeometry args={[0.6, 0.5, 0.08]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      ))}

      {/* Thruster Engine Nozzle */}
      <mesh position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.2, 0.3, 12]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Thruster Flame */}
      <mesh ref={flameRef} position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.24, 0.8, 12]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.85} />
      </mesh>
    </group>
  );
};
