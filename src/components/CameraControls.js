import { OrbitControls } from "@react-three/drei";
import {
  CameraModes,
  useVaaCustomisation,
} from "../contexts/VaaCustomisationContext";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";
import { useRef } from "react";

const cameraPositions = {
  [CameraModes.VAA]: {
    position: new THREE.Vector3(-5, 3, 3),
    target: new THREE.Vector3(0, 0.5, 0),
  },
  [CameraModes.TOP]: {
    position: new THREE.Vector3(-0.5, 0.2, 1.5),
    target: new THREE.Vector3(0, 0.2, 0),
  },
  [CameraModes.BOTTOM]: {
    position: new THREE.Vector3(0, -0.5, 2.5),
    target: new THREE.Vector3(0, -0.5, 0),
  },
};

export const CameraControls = () => {
  const { cameraMode, setCameraMode } = useVaaCustomisation();
  const orbitControls = useRef();

  useFrame((state, delta) => {
    if (cameraMode === CameraModes.FREE) {
      return;
    }

    state.camera.position.lerp(cameraPositions[cameraMode].position, 3 * delta);
    orbitControls.current.target.lerp(
      cameraPositions[cameraMode].target,
      3 * delta
    );
  });

  return (
    <>
      <OrbitControls
        ref={orbitControls}
        onStart={() => {
          setCameraMode(CameraModes.FREE);
        }}
      />
    </>
  );
};
