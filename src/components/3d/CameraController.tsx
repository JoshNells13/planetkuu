import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';

export const CameraController: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);
  const { selectedPlanet, overviewTrigger, cameraTarget } = useGame();

  const isTransitioningRef = useRef<boolean>(false);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 42, 60));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Reset to solar system overview
  useEffect(() => {
    isTransitioningRef.current = true;
    targetCamPosRef.current.set(0, 40, 56);
    targetLookAtRef.current.set(0, 0, 0);
  }, [overviewTrigger]);

  // Focus on selected planet
  useEffect(() => {
    if (selectedPlanet) {
      isTransitioningRef.current = true;
      const dist = selectedPlanet.orbitRadius;
      targetCamPosRef.current.set(
        dist + selectedPlanet.radius * 3.4,
        selectedPlanet.radius * 2.0 + 1.5,
        selectedPlanet.radius * 3.6
      );
      targetLookAtRef.current.set(dist, 0, 0);
    }
  }, [selectedPlanet]);

  // Direct camera flight from Guide (Pemandu Tata Surya)
  useEffect(() => {
    if (cameraTarget) {
      isTransitioningRef.current = true;
      targetCamPosRef.current.set(
        cameraTarget.camPos[0],
        cameraTarget.camPos[1],
        cameraTarget.camPos[2]
      );
      targetLookAtRef.current.set(
        cameraTarget.lookAt[0],
        cameraTarget.lookAt[1],
        cameraTarget.lookAt[2]
      );
    }
  }, [cameraTarget]);

  useFrame(() => {
    if (isTransitioningRef.current && controlsRef.current) {
      camera.position.lerp(targetCamPosRef.current, 0.06);
      controlsRef.current.target.lerp(targetLookAtRef.current, 0.06);
      controlsRef.current.update();

      if (
        camera.position.distanceTo(targetCamPosRef.current) < 0.25 &&
        controlsRef.current.target.distanceTo(targetLookAtRef.current) < 0.25
      ) {
        isTransitioningRef.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.06}
      minDistance={4}
      maxDistance={140}
      maxPolarAngle={Math.PI / 2 + 0.12}
    />
  );
};
