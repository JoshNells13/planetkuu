import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { getCelestialPosition } from '../../utils/celestialRegistry';

export const CameraController: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);
  const { selectedPlanet, overviewTrigger, cameraTarget } = useGame();

  const isTransitioningRef = useRef<boolean>(false);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 42, 60));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const activeTrackedEntityRef = useRef<string | null>(null);
  const currentOffsetRef = useRef<THREE.Vector3>(new THREE.Vector3(3, 2, 4));

  // Reset to solar system overview
  useEffect(() => {
    isTransitioningRef.current = true;
    activeTrackedEntityRef.current = null;
    targetCamPosRef.current.set(0, 40, 56);
    targetLookAtRef.current.set(0, 0, 0);
  }, [overviewTrigger]);

  // Focus on selected planet
  useEffect(() => {
    if (selectedPlanet) {
      isTransitioningRef.current = true;
      activeTrackedEntityRef.current = selectedPlanet.id;

      const livePos = getCelestialPosition(selectedPlanet.id);
      const posX = livePos ? livePos.x : selectedPlanet.orbitRadius;
      const posY = livePos ? livePos.y : 0;
      const posZ = livePos ? livePos.z : 0;

      const offsetDist = Math.max(2.6, selectedPlanet.radius * 3.6);
      currentOffsetRef.current.set(
        offsetDist * 0.7,
        selectedPlanet.radius * 1.8 + 1.2,
        offsetDist
      );

      targetCamPosRef.current.set(
        posX + currentOffsetRef.current.x,
        posY + currentOffsetRef.current.y,
        posZ + currentOffsetRef.current.z
      );
      targetLookAtRef.current.set(posX, posY, posZ);
    }
  }, [selectedPlanet]);

  // Direct camera flight from Guide & Tour
  useEffect(() => {
    if (cameraTarget) {
      isTransitioningRef.current = true;
      if (cameraTarget.targetEntityId) {
        activeTrackedEntityRef.current = cameraTarget.targetEntityId;
        if (cameraTarget.camOffset) {
          currentOffsetRef.current.set(...cameraTarget.camOffset);
        }
      } else {
        activeTrackedEntityRef.current = null;
      }

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
    if (!controlsRef.current) return;

    // Live continuous tracking for orbiting planets and celestial bodies
    if (activeTrackedEntityRef.current) {
      const livePos = getCelestialPosition(activeTrackedEntityRef.current);
      if (livePos) {
        targetLookAtRef.current.copy(livePos);
        targetCamPosRef.current.set(
          livePos.x + currentOffsetRef.current.x,
          livePos.y + currentOffsetRef.current.y,
          livePos.z + currentOffsetRef.current.z
        );
      }
    }

    if (isTransitioningRef.current) {
      camera.position.lerp(targetCamPosRef.current, 0.08);
      controlsRef.current.target.lerp(targetLookAtRef.current, 0.08);
      controlsRef.current.update();

      if (
        camera.position.distanceTo(targetCamPosRef.current) < 0.25 &&
        controlsRef.current.target.distanceTo(targetLookAtRef.current) < 0.25
      ) {
        isTransitioningRef.current = false;
      }
    } else if (activeTrackedEntityRef.current) {
      // Continue following smoothly as planet revolves in orbit
      camera.position.lerp(targetCamPosRef.current, 0.06);
      controlsRef.current.target.lerp(targetLookAtRef.current, 0.06);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.06}
      minDistance={3}
      maxDistance={140}
      maxPolarAngle={Math.PI / 2 + 0.12}
    />
  );
};
