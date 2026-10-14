import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { X } from 'lucide-react';
import * as THREE from 'three';
import type { PlanetData } from '../../types/astronomy';
import { getPlanetTexture, getSaturnRingTexture } from '../../utils/textures';
import { sound } from '../../utils/sound';

interface PlanetInspectorSceneProps {
  planet: PlanetData;
  viewMode: 'surface' | 'internal';
  onSelectHotspot: (hotspot: { title: string; description: string } | null) => void;
  activeHotspotId: string | null;
}

const PlanetInspectorScene: React.FC<PlanetInspectorSceneProps> = ({
  planet,
  viewMode,
  onSelectHotspot,
  activeHotspotId,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => getPlanetTexture(planet.id), [planet.id]);
  const saturnRingTexture = useMemo(() => (planet.id === 'saturn' ? getSaturnRingTexture() : null), [planet.id]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.26;
    }
  });

  const baseRadius = 2.4;

  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight position={[8, 6, 8]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-8, -4, -6]} intensity={0.5} color="#ffffff" />

      {/* Surface View */}
      {viewMode === 'surface' ? (
        <group rotation={[(planet.axialTiltDeg * Math.PI) / 180, 0, 0]}>
          {/* Main Planet Sphere */}
          <mesh ref={meshRef}>
            <sphereGeometry args={[baseRadius, 64, 64]} />
            <meshStandardMaterial
              map={texture}
              color={planet.color}
              roughness={0.6}
              metalness={0.15}
            />

            {/* 3D Hotspot Markers */}
            {planet.hotspots?.map((hs) => {
              const isActive = activeHotspotId === hs.id;
              const pos: [number, number, number] = [
                hs.position[0] * baseRadius * 0.7,
                hs.position[1] * baseRadius * 0.7,
                hs.position[2] * baseRadius * 0.7,
              ];

              return (
                <group key={hs.id} position={pos}>
                  <Html distanceFactor={14} center style={{ pointerEvents: 'auto' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        onSelectHotspot(isActive ? null : hs);
                      }}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '999px',
                        background: isActive ? '#f59e0b' : '#ffffff',
                        border: '1.5px solid #000000',
                        color: '#000000',
                        fontFamily: 'var(--font-display)',
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {hs.title.split(' ')[0]}
                    </button>
                  </Html>
                </group>
              );
            })}
          </mesh>

          {/* Earth Atmosphere Cloud Layer */}
          {planet.id === 'earth' && (
            <mesh ref={cloudsRef} scale={[1.025, 1.025, 1.025]}>
              <sphereGeometry args={[baseRadius, 48, 48]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.35}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )}

          {/* Glowing Atmosphere Rim */}
          <mesh scale={[1.06, 1.06, 1.06]}>
            <sphereGeometry args={[baseRadius, 32, 32]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.25}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Saturn Rings */}
          {planet.id === 'saturn' && saturnRingTexture && (
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[baseRadius * 1.25, baseRadius * 2.3, 64]} />
              <meshStandardMaterial
                map={saturnRingTexture}
                transparent
                opacity={0.92}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}

          {/* Uranus Rings */}
          {planet.id === 'uranus' && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[baseRadius * 1.2, baseRadius * 1.5, 48]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
      ) : (
        /* Internal Core Cutaway View */
        <group>
          {/* Inner Core Sphere */}
          <mesh>
            <sphereGeometry args={[baseRadius * 0.42, 32, 32]} />
            <meshStandardMaterial
              color={planet.internalLayers?.coreColor || '#ea580c'}
              emissive={planet.internalLayers?.coreColor || '#ea580c'}
              emissiveIntensity={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* Middle Mantle Sphere */}
          <mesh>
            <sphereGeometry args={[baseRadius * 0.76, 32, 32, 0, Math.PI * 1.5]} />
            <meshStandardMaterial
              color={planet.internalLayers?.mantleColor || '#ca8a04'}
              side={THREE.DoubleSide}
              roughness={0.6}
            />
          </mesh>

          {/* Outer Crust Shell Cutaway */}
          <mesh>
            <sphereGeometry args={[baseRadius, 32, 32, 0, Math.PI * 1.2]} />
            <meshStandardMaterial
              map={texture}
              color={planet.color}
              side={THREE.DoubleSide}
              roughness={0.7}
            />
          </mesh>
        </group>
      )}

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={3.8}
        maxDistance={9.5}
        autoRotate={false}
      />
    </>
  );
};

export const PlanetInspector3D: React.FC<{ planet: PlanetData }> = ({ planet }) => {
  const [viewMode, setViewMode] = useState<'surface' | 'internal'>('surface');
  const [selectedHotspot, setSelectedHotspot] = useState<{ title: string; description: string } | null>(null);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '380px',
        borderRadius: '18px',
        overflow: 'hidden',
        backgroundColor: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.8)',
      }}
    >
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 1.2, 5.2], fov: 45 }}>
        <PlanetInspectorScene
          planet={planet}
          viewMode={viewMode}
          onSelectHotspot={setSelectedHotspot}
          activeHotspotId={selectedHotspot?.title ? selectedHotspot.title : null}
        />
      </Canvas>

      {/* Floating Mode Switcher Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {
            sound.playTabSwitch();
            setViewMode('surface');
            setSelectedHotspot(null);
          }}
          style={{
            padding: '6px 14px',
            borderRadius: '999px',
            border: viewMode === 'surface' ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
            backgroundColor: viewMode === 'surface' ? '#ffffff' : 'rgba(0, 0, 0, 0.8)',
            color: viewMode === 'surface' ? '#000000' : '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
        >
          Permukaan 3D & Hotspot
        </button>

        <button
          onClick={() => {
            sound.playTabSwitch();
            setViewMode('internal');
            setSelectedHotspot(null);
          }}
          style={{
            padding: '6px 14px',
            borderRadius: '999px',
            border: viewMode === 'internal' ? '1.5px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.15)',
            backgroundColor: viewMode === 'internal' ? '#f59e0b' : 'rgba(0, 0, 0, 0.8)',
            color: viewMode === 'internal' ? '#000000' : '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
        >
          Struktur Lapisan Inti
        </button>
      </div>

      {/* Hint pill */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          padding: '4px 10px',
          borderRadius: '999px',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          color: '#94a3b8',
          fontSize: '11px',
          fontWeight: 600,
          pointerEvents: 'none',
        }}
      >
        Putar 360° dengan mouse / sentuhan
      </div>

      {/* Hotspot Card Overlay */}
      {selectedHotspot && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            maxWidth: '300px',
            padding: '12px 16px',
            borderRadius: '14px',
            backgroundColor: 'rgba(10, 11, 15, 0.95)',
            border: '1.5px solid #fbbf24',
            boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 800, color: '#fbbf24' }}>
              {selectedHotspot.title}
            </span>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={14} />
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#e2e8f0', lineHeight: 1.45 }}>
            {selectedHotspot.description}
          </p>
        </div>
      )}

      {/* Internal Layers Legend if internal mode */}
      {viewMode === 'internal' && planet.internalLayers && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            maxWidth: '300px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'rgba(10, 11, 15, 0.95)',
            border: '1px solid rgba(245, 158, 11, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24', marginBottom: '6px' }}>
            Lapisan Dalam {planet.indonesianName}:
          </div>
          <div style={{ fontSize: '11px', color: '#e2e8f0', lineHeight: 1.5 }}>
            <div>
              <strong style={{ color: '#fbbf24' }}>1. {planet.internalLayers.crustName}:</strong>{' '}
              {planet.internalLayers.crustDesc}
            </div>
            <div style={{ marginTop: '3px' }}>
              <strong style={{ color: '#f59e0b' }}>2. {planet.internalLayers.mantleName}:</strong>{' '}
              {planet.internalLayers.mantleDesc}
            </div>
            <div style={{ marginTop: '3px' }}>
              <strong style={{ color: '#ef4444' }}>3. {planet.internalLayers.coreName}:</strong>{' '}
              {planet.internalLayers.coreDesc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
