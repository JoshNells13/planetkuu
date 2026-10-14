import React from 'react';
import * as THREE from 'three';

interface OrbitLineProps {
  radius: number;
  color?: string;
  visible?: boolean;
}

export const OrbitLine: React.FC<OrbitLineProps> = ({ radius, color = 'rgba(255, 255, 255, 0.22)', visible = true }) => {
  if (!visible) return null;

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.035, radius + 0.035, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.22}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
