import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";
import { Box, Sky } from "@react-three/drei";
import { Ocean } from "../components/Ocean";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls";
import { useCamera, CameraModes } from "../contexts/CameraContext";
import { Trail } from "../components/Trail";
import { TreeGenerator } from "../components/TreeGenerator";
import { FinishLine } from "../models/FinishLine";
import WaterOcean from "../components/WaterOcean";
// import WaterOcean from "../components/WaterOcean";

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
  const finishLineX = 50;
  const [count, setCount] = useState(0); // État pour le nombre

  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  //======================================== Gestion bouton gauche ========================================//
  const handleLeftBtnClick = useCallback(() => {
    if (!countdownComplete) return;
    leftBtn.disabled = true;
    rightBtn.disabled = false;
    leftBtn.classList.add("bg-opacity-30");
    rightBtn.classList.remove("bg-opacity-30");
    // Augmenter la vitesse du va'a lorsqu'on clique sur le bouton gauche
    vaaVelocity.current = Math.min(vaaVelocity.current + 0.01, 0.5);
  }, [countdownComplete]);

  useEffect(() => {
    // Ajoutez un écouteur d'événements pour le bouton gauche
    if (leftBtn) {
      leftBtn.addEventListener("click", handleLeftBtnClick);
    }
    return () => {
      if (leftBtn) {
        leftBtn.removeEventListener("click", handleLeftBtnClick);
      }
    };
  }, [handleLeftBtnClick]);

  //======================================== Gestion bouton droit ========================================//
  const handleRightBtnClick = useCallback(() => {
    if (!countdownComplete) return;
    rightBtn.disabled = true;
    leftBtn.disabled = false;
    rightBtn.classList.add("bg-opacity-30");
    leftBtn.classList.remove("bg-opacity-30");
    // Augmenter la vitesse du va'a lorsqu'on clique sur le bouton droit
    vaaVelocity.current = Math.min(vaaVelocity.current + 0.01, 0.5);
  }, [countdownComplete]);

  useEffect(() => {
    // Ajoutez un écouteur d'événements pour le bouton droit
    if (rightBtn) {
      rightBtn.addEventListener("click", handleRightBtnClick);
    }
    return () => {
      if (rightBtn) {
        rightBtn.removeEventListener("click", handleRightBtnClick);
      }
    };
  }, [handleRightBtnClick]);

  useFrame(() => {
    if (vaaRef.current) {
      // Avancer le va'a en fonction de sa vitesse
      vaaRef.current.position.x += vaaVelocity.current;

      if (vaaRef.current.position.x >= finishLineX) {
        onReachFinishLine();
      }

      // Réduire la vitesse avec le temps (effet de friction)
      vaaVelocity.current = Math.max(vaaVelocity.current * 0.99, 0);
    }
  });

  useEffect(() => {
    setCameraMode(CameraModes.GAME);
    // Positionner le va'a selon les props
    if (vaaRef.current) {
      vaaRef.current.position.set(vaaPosition.x, vaaPosition.y, vaaPosition.z);
    }
  }, [setCameraMode, vaaPosition]);

  return (
    <>
      <CameraControls vaaRef={vaaRef} />
      <Suspense fallback={null}>
        <TreeGenerator count={50} radius={50} />
        <group ref={vaaRef}>
          <VaaModel />
          <PagaieModel />
        </group>
        <Trail target={vaaRef} />
        <Ocean vaaPosition={vaaRef.current?.position} />
      </Suspense>
      <FinishLine position={[finishLineX, 0, 0]} />
    </>
  );
};
