import { Sky } from "@react-three/drei";
import { CameraControls } from "../components/CameraControls";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";
import { Suspense, useEffect, useRef } from "react";
import { Ocean } from "../components/Ocean";
import { CameraModes, useCamera } from "../contexts/CameraContext";

export const ConfiguratorScene = () => {
  const { getVaa, getPagaie } = useVaaCustomisation();
  const VaaModel = getVaa();
  const vaaRef = useRef();
  const PagaieModel = getPagaie();

  const { setCameraMode } = useCamera();

  useEffect(() => {
    setCameraMode(CameraModes.VAA);
  }, [setCameraMode]);

  return (
    <>
      <CameraControls vaaRef={vaaRef} />
      <directionalLight
        intensity={5}
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
      <Suspense fallback={null}>
        <VaaModel ref={vaaRef} />
        <PagaieModel />
        <Ocean />
      </Suspense>
    </>
  );
};
