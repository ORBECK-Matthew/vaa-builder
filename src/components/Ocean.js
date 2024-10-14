import { useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Water } from "three-stdlib";

extend({ Water });

export const Ocean = function Ocean({ vaaPosition }) {
  console.log(vaaPosition);
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/assets/img/waternormals.jpeg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0x66c9ff,
      waterColor: 0x7aebdf,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );

  // Update uniforms to include va'a position for water distortion
  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta * 0.3;
    // console.log("Vaa position" + vaaPosition);
    if (ref.current.material.uniforms.vaaPosition?.value && vaaPosition) {
      ref.current.material.uniforms.vaaPosition.value = vaaPosition;
    }
  });

  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
};
