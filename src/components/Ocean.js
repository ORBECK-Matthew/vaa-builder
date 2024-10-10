import { useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { WaterShader } from "../shaders/waterShader"; // Import du shader personnalisé

export const Ocean = function Ocean({ vaaPosition }) {
  console.log("Ocean");
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/assets/img/waternormals.jpeg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);

  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta * 0.2;
    ref.current.material.uniforms.vaaPosition.value = vaaPosition;
  });

  return (
    <mesh ref={ref} geometry={geom} rotation-x={-Math.PI / 2}>
      <shaderMaterial
        attach="material"
        args={[WaterShader]}
        uniforms-waterNormals-value={waterNormals}
      />
    </mesh>
  );
};
