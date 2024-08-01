import { Suspense, useEffect, useRef, useState } from "react";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";
import { Box, Sky } from "@react-three/drei";
import { Ocean } from "../components/Ocean";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls";
import { useCamera } from "../contexts/CameraContext";

export const GameScene = ({
  onReachFinishLine,
  countdownComplete,
  vaaPosition,
}) => {
  const { getVaa, getPagaie } = useVaaCustomisation();
  const { setCameraMode } = useCamera();
  const VaaModel = getVaa();
  const vaaRef = useRef();
  const PagaieModel = getPagaie();
  const vaaVelocity = useRef(0);
  const finishLineX = 100;
  const [keyState, setKeyState] = useState({ left: false, right: false });
  const [lastKey, setLastKey] = useState(null);
  const [count, setCount] = useState(0); // Ajouter un état pour le nombre

  useFrame(() => {
    if (vaaRef.current) {
      vaaRef.current.position.x += vaaVelocity.current;

      if (vaaRef.current.position.x >= finishLineX) {
        onReachFinishLine();
      }

      // Reduce the velocity over time (friction effect)
      vaaVelocity.current = Math.max(vaaVelocity.current * 0.99, 0);
    }
  });

  useEffect(() => {
    if (vaaRef.current) {
      vaaRef.current.position.set(vaaPosition.x, vaaPosition.y, vaaPosition.z);
    }
  }, [vaaPosition]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setCount((prevCount) => prevCount + 1); // Incrémenter le nombre
      }
      console.log(count);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      <Box position={[finishLineX, 0, 0]} scale={[1, 3, 1]}></Box>
    </>
  );
};
