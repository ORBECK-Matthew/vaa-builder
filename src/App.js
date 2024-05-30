// Libraries
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
// Components
import { Interface } from "./components/Interface";
import { VaaCustomisationProvider } from "./contexts/VaaCustomisationContext";
import { ConfiguratorScene } from "./scenes/ConfiguratorScene";
import { GameScene } from "./scenes/GameScene";
import { HomeScene } from "./scenes/HomeScene";

export default function App() {
  const cameraRef = useRef();
  const [currentScene, setCurrentScene] = useState("home");

  return (
    <VaaCustomisationProvider>
      <div className="h-screen">
        <Canvas>
          {currentScene === "config" && <ConfiguratorScene />}
          {currentScene === "game" && <GameScene />}
          {currentScene === "home" && (
            <HomeScene setCurrentScene={setCurrentScene} />
          )}
        </Canvas>

        {currentScene === "config" && <Interface />}
        {currentScene === "config" && (
          <button
            onClick={() => setCurrentScene("game")}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
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
        )}
      </div>
    </VaaCustomisationProvider>
  );
}
