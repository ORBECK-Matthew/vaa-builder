import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export const Camera = ({ zoom, focus }) => {
  const vec = new THREE.Vector3();

  console.log(
    "Focus x : " + focus.x + "Focus y : " + focus.y + "Focus z : " + focus.z
  );

  useFrame((state) => {
    const step = 0.05;

    zoom ? vec.set(focus.x, focus.y, focus.z + 0.2) : vec.set(5, 5, 10);
    state.camera.position.lerp(vec, step);
    state.camera.lookAt(0, 0, 0);

    state.camera.updateProjectionMatrix();
  });

  return (
    <OrbitControls
      makeDefault
      position={zoom ? [focus.x, focus.y, focus.z + 0.2] : [0, 0, 5]}
    />
  );
};
