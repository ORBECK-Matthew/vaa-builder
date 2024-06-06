import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Interface } from "./components/Interface";
import { VaaCustomisationProvider } from "./contexts/VaaCustomisationContext";
import { ConfiguratorScene } from "./scenes/ConfiguratorScene";
import { GameScene } from "./scenes/GameScene";
import { HomeScene } from "./scenes/HomeScene";
import { CountdownTimer } from "./components/CountDownTimer";
import { EndGameScene } from "./scenes/EndGameScene";

export default function App() {
  const [currentScene, setCurrentScene] = useState("home");
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [stopTimer, setStopTimer] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(false); // New state

  const handleSceneChange = (scene) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentScene(scene);
      setFadeClass("fade-in");
      if (scene === "game") {
        setStopTimer(false); // Reset the timer
        setCountdownComplete(false); // Reset countdown status
      }
    }, 1000); // Durée de l'animation de fondu
  };

  const handleReachFinishLine = () => {
    setStopTimer(true);
  };

  const handleCountDownComplete = () => {
    console.log("Countdown Complete");
    setCountdownComplete(true); // Update countdown status
  };

  return (
    <VaaCustomisationProvider>
      <div className="h-screen">
        <Canvas>
          {currentScene === "config" && <ConfiguratorScene />}
          {currentScene === "game" && (
            <GameScene
              onReachFinishLine={handleReachFinishLine}
              countdownComplete={countdownComplete} // Pass the state
            />
          )}
          {currentScene === "home" && (
            <HomeScene setCurrentScene={handleSceneChange} />
          )}
        </Canvas>

        {currentScene === "config" && (
          <div>
            <Interface />
            <button
              onClick={() => handleSceneChange("game")}
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
          </div>
        )}
        {currentScene === "game" && (
          <CountdownTimer
            startCountdown={3} // 3 seconds countdown
            onComplete={handleCountDownComplete} // Updated to call directly
            stopTimer={stopTimer}
          />
        )}
        {currentScene === "game" && stopTimer === true ? (
          <EndGameScene
            onPlayAgain={() => handleSceneChange("game")}
            onConfigure={() => handleSceneChange("config")}
          />
        ) : (
          ""
        )}
      </div>
    </VaaCustomisationProvider>
  );
}
