import { Html, Sky } from "@react-three/drei";
import { CameraControls } from "../components/CameraControls";
import { useCamera, CameraModes } from "../contexts/CameraContext";
import { Suspense, useEffect, useState } from "react";
import { Ocean } from "../components/Ocean";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";

export const HomeScene = ({ setCurrentScene }) => {
  const { setCameraMode } = useCamera();
  const { getVaa, getPagaie } = useVaaCustomisation();
  const VaaModel = getVaa();
  const PagaieModel = getPagaie();
  const [fadeClass, setFadeClass] = useState("");

  useEffect(() => {
    setCameraMode(CameraModes.HOME);
  }, [setCameraMode]);

  const handleButtonClick = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCameraMode(CameraModes.VAA); // Transition caméra vers VAA
      setTimeout(() => {
        setCurrentScene("config");
      }, 1000); // Durée de la transition de la caméra
    }, 1000); // Durée de l'animation de fondu
  };

  return (
    <>
      <CameraControls />
      <directionalLight
        intensity={5}
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
      <Suspense fallback={null}>
        <VaaModel />
        <PagaieModel />
        <Ocean />
      </Suspense>
      <Html center position={[10, 5, 0]}>
        <div
          className={`fade-container ${fadeClass}`}
          style={{
            backgroundColor: "transparent",
            padding: "20px",
            textAlign: "center",
            width: "100vw",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "white",
              textShadow:
                "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
              fontFamily: "PoetsenOne",
              fontSize: "3em",
            }}
          >
            LCVCK Tournament
          </p>
          <button
            onClick={handleButtonClick}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#228BE6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            JOUER
          </button>
        </div>
      </Html>
    </>
  );
};
