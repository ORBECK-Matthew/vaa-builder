import { Html, Sky } from "@react-three/drei";
import { CameraControls } from "../components/CameraControls";
import { useCamera, CameraModes } from "../contexts/CameraContext";
import { Suspense, useEffect, useRef, useState } from "react";
import WaterOcean from "../components/WaterOcean";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";
import { Ocean } from "../components/Ocean";

export const HomeScene = ({ setCurrentScene }) => {
  const { setCameraMode } = useCamera();
  const { getVaa, getPagaie } = useVaaCustomisation();
  const VaaModel = getVaa();
  const vaaRef = useRef();
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
  console.log(vaaRef);

  return (
    <>
      <CameraControls />
      <Suspense fallback={null}>
        <VaaModel ref={vaaRef} />
        <Ocean
          vaaPosition={vaaRef.current ? vaaRef.current.position : [0, 0, 0]}
        />
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
              userSelect: "none",
            }}
          >
            Va'a Sprint
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
              userSelect: "none",
            }}
          >
            JOUER
          </button>
        </div>
      </Html>
    </>
  );
};
