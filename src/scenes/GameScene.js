import { Suspense, useEffect, useRef, useState } from "react";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";
import { Box, Sky } from "@react-three/drei";
import { Ocean } from "../components/Ocean";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls";
import { useCamera, CameraModes } from "../contexts/CameraContext";

export const GameScene = ({ onReachFinishLine, countdownComplete }) => {
  const { getVaa, getPagaie } = useVaaCustomisation();
  const { setCameraMode } = useCamera();
  const VaaModel = getVaa();
  const vaaRef = useRef();
  const PagaieModel = getPagaie();
  const vaaVelocity = useRef(0); // Single value for forward velocity
  const lastPressTime = useRef({ left: 0, right: 0, keydown: 0 });
  const syncThreshold = 300; // Time threshold in ms for considering the presses as synchronized
  const finishLineX = 10; // Position X of the finish line
  const [keyState, setKeyState] = useState({ left: false, right: false }); // Track key states

  useEffect(() => {
    setCameraMode(CameraModes.GAME);

    const handleKeyDown = (event) => {
      if (!countdownComplete) return;
      const currentTime = Date.now();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        lastPressTime.current.keydown = currentTime;
        lastPressTime.current[event.key === "ArrowLeft" ? "left" : "right"] =
          currentTime;
        setKeyState((prevState) => ({
          ...prevState,
          [event.key === "ArrowLeft" ? "left" : "right"]: true,
        }));
      }
    };

    const handleKeyUp = (event) => {
      if (!countdownComplete) return;
      const currentTime = Date.now();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const pressTime = lastPressTime.current.keydown;
        if (currentTime - pressTime < syncThreshold) {
          // Increase speed if keyup occurs within the syncThreshold after keydown
          vaaVelocity.current = Math.min(vaaVelocity.current + 0.01, 0.5);
        }
        setKeyState((prevState) => ({
          ...prevState,
          [event.key === "ArrowLeft" ? "left" : "right"]: false,
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setCameraMode, countdownComplete]);

  useFrame(() => {
    if (vaaRef.current) {
      const currentTime = Date.now();
      const timeSinceLastLeft = currentTime - lastPressTime.current.left;
      const timeSinceLastRight = currentTime - lastPressTime.current.right;

      if (keyState.left && keyState.right) {
        // Keys are being pressed, check synchronization
        if (Math.abs(timeSinceLastLeft - timeSinceLastRight) > syncThreshold) {
          // Desynchronized, slow down
          vaaVelocity.current = Math.max(vaaVelocity.current * 0.9, 0);
        }
      } else if (!keyState.left && !keyState.right) {
        // No keys are being pressed, slow down significantly
        vaaVelocity.current = Math.max(vaaVelocity.current * 0.9, 0);
      }

      vaaRef.current.position.x += vaaVelocity.current;

      if (vaaRef.current.position.x >= finishLineX) {
        onReachFinishLine();
      }
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
      {/* Finish Line */}
      <Box position={[finishLineX, 0, 0]} scale={[1, 3, 1]}></Box>
    </>
  );
};
