import { OrbitControls } from "@react-three/drei";
import { CameraModes } from "../contexts/CameraContext";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useCamera } from "../contexts/CameraContext";

const cameraPositions = {
  [CameraModes.FREE]: {
    position: new THREE.Vector3(3, 1, 5),
    target: new THREE.Vector3(0, 0, 0),
  },
  [CameraModes.VAA]: {
    position: new THREE.Vector3(-5, 3, 3),
    target: new THREE.Vector3(0, 0.5, 0),
  },
  [CameraModes.PAGAIE]: {
    position: new THREE.Vector3(-4, 2, 3.5),
    target: new THREE.Vector3(0, 0.5, 2),
  },
  [CameraModes.PERSONNAGE]: {
    position: new THREE.Vector3(-3, 3, 5),
    target: new THREE.Vector3(0.5, 0.5, 3),
  },
  [CameraModes.GAME]: {
    position: new THREE.Vector3(0, 0, 0),
    target: new THREE.Vector3(0, 0, 0),
  },
  [CameraModes.HOME]: {
    position: new THREE.Vector3(5, 5, 5),
    target: new THREE.Vector3(10, 5, 0),
  },
};

export const CameraControls = ({ vaaRef }) => {
  const { cameraMode, setCameraMode } = useCamera();
  const orbitControls = useRef();

  useFrame((state, delta) => {
    if (cameraMode !== CameraModes.FREE) {
      if (cameraMode === CameraModes.GAME && vaaRef.current) {
        const vaaPosition = vaaRef.current.position;
        const offset = new THREE.Vector3(-8, 3, 0);
        const desiredPosition = vaaPosition.clone().add(offset);

        state.camera.position.lerp(desiredPosition, 3 * delta);
        orbitControls.current.target.lerp(vaaPosition, 3 * delta);
      } else {
        state.camera.position.lerp(
          cameraPositions[cameraMode].position,
          3 * delta
        );
        orbitControls.current.target.lerp(
          cameraPositions[cameraMode].target,
          3 * delta
        );
      }
    }
  });

  return <OrbitControls ref={orbitControls} />;
};
