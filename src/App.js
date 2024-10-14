import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Interface } from "./components/Interface";
import { VaaCustomisationProvider } from "./contexts/VaaCustomisationContext";
import { ConfiguratorScene } from "./scenes/ConfiguratorScene";
import { GameScene } from "./scenes/GameScene";
import { HomeScene } from "./scenes/HomeScene";
import { CountdownTimer } from "./components/CountDownTimer";
import { Timer } from "./components/Timer";
import { EndGameScene } from "./scenes/EndGameScene";
import { Sky } from "@react-three/drei";

export default function App() {
  const [currentScene, setCurrentScene] = useState("home");
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [stopTimer, setStopTimer] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [vaaPosition, setVaaPosition] = useState({ x: 0, y: 0, z: 0 });
  const [resetTimer, setResetTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [personalBestTime, setPersonalBestTime] = useState(() => {
    // Récupérer le meilleur temps du localStorage
    const savedTime = localStorage.getItem("personalBestTime");
    return savedTime ? parseFloat(savedTime) : null; // Convertir en nombre
  });

  const handleSceneChange = (scene) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentScene(scene);
      setFadeClass("fade-in");
      if (scene === "game") {
        resetGame();
      }
    }, 1000);
  };

  const resetGame = () => {
    setStopTimer(false);
    setCountdownComplete(false);
    setVaaPosition({ x: 0, y: 0, z: 0 });
    setElapsedTime(0);
    setResetTimer(true);
  };

  const handleRestartGame = () => {
    setCurrentScene("game");
    resetGame();
  };

  const handleReachFinishLine = () => {
    setStopTimer(true);
    // Vérifier et mettre à jour le meilleur temps
    if (personalBestTime === null || elapsedTime < personalBestTime) {
      setPersonalBestTime(elapsedTime);
      localStorage.setItem("personalBestTime", elapsedTime); // Enregistrer dans localStorage
    }
  };

  const handleCountDownComplete = () => {
    console.log("Countdown Complete");
    setCountdownComplete(true);
    setStopTimer(false);
  };

  const handleElapsedTimeUpdate = (time) => {
    setElapsedTime(time);
  };

  useEffect(() => {
    if (resetTimer) {
      setResetTimer(false);
    }
  }, [resetTimer]);

  return (
    <VaaCustomisationProvider>
      <div className="h-screen">
        <Canvas>
          {currentScene === "config" && <ConfiguratorScene />}
          {currentScene === "game" && (
            <GameScene
              onReachFinishLine={handleReachFinishLine}
              countdownComplete={countdownComplete}
              vaaPosition={vaaPosition}
            />
          )}
          {currentScene === "home" && (
            <HomeScene setCurrentScene={handleSceneChange} />
          )}
          <directionalLight
            intensity={5}
            position={[-5, 5, 5]}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Sky scale={1000} sunPosition={[10, 20, -1000]} turbidity={0.2} />
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

        {currentScene === "game" && !countdownComplete && (
          <CountdownTimer
            startCountdown={3}
            onComplete={handleCountDownComplete}
            resetTimer={resetTimer}
          />
        )}

        {currentScene === "game" && countdownComplete && (
          <>
            <Timer
              stopTimer={stopTimer}
              onElapsedTimeUpdate={handleElapsedTimeUpdate}
            />

            {/* Boutons pour déplacer le modèle */}
            <div
              style={{
                position: "absolute",
                bottom: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "50px",
              }}
            >
              <button
                id="leftBtn"
                className="p-20 bg-blue-500 rounded-full"
              ></button>
              <button
                id="rightBtn"
                className="p-20 bg-blue-500 rounded-full"
              ></button>
            </div>
          </>
        )}

        {currentScene === "game" && stopTimer && (
          <EndGameScene
            onPlayAgain={handleRestartGame}
            onConfigure={() => handleSceneChange("config")}
            elapsedTime={elapsedTime}
            personalBestTime={personalBestTime} // Passer le meilleur temps
          />
        )}
      </div>
    </VaaCustomisationProvider>
  );
}
