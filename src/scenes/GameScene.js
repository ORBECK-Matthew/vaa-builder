import { Suspense, useEffect, useRef } from "react";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";
import { Sky } from "@react-three/drei";
import { Ocean } from "../components/Ocean";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls";
import { useCamera, CameraModes } from "../contexts/CameraContext";

export const GameScene = () => {
  const { getVaa, getPagaie } = useVaaCustomisation();
  const { setCameraMode } = useCamera();
  const VaaModel = getVaa();
  const vaaRef = useRef();
  const PagaieModel = getPagaie();
  const vaaVelocity = useRef({ x: 0, y: 0, z: 0 });
  const lastPressTime = useRef({ left: 0, right: 0 });
  const syncThreshold = 300; // Time threshold in ms for considering the presses as synchronized

  useEffect(() => {
    setCameraMode(CameraModes.GAME);
    const handleKeyDown = (event) => {
      const currentTime = Date.now();
      if (event.key === "ArrowLeft") {
        lastPressTime.current.left = currentTime;
        if (currentTime - lastPressTime.current.right < syncThreshold) {
          vaaVelocity.current.x = Math.min(vaaVelocity.current.x + 0.001, 1); // Increase speed, max 1
        }
      } else if (event.key === "ArrowRight") {
        lastPressTime.current.right = currentTime;
        if (currentTime - lastPressTime.current.left < syncThreshold) {
          vaaVelocity.current.x = Math.min(vaaVelocity.current.x + 0.001, 1); // Increase speed, max 1
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        // Optional: Decrease speed when keys are released
        vaaVelocity.current.z = Math.max(vaaVelocity.current.z - 0.1, 0); // Decrease speed, min 0
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setCameraMode]);

  // Update the vaa's position on each frame
  useFrame(() => {
    if (vaaRef.current) {
      vaaRef.current.position.x += vaaVelocity.current.x;
      vaaRef.current.position.y += vaaVelocity.current.y;
      vaaRef.current.position.z += vaaVelocity.current.z;
    }
  });

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
