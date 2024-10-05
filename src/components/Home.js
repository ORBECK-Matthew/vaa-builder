import React from "react";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Interface } from "./Interface";
import { VaaCustomisationProvider } from "../contexts/VaaCustomisationContext";
import { ConfiguratorScene } from "../scenes/ConfiguratorScene";
import { GameScene } from "../scenes/GameScene";
import { HomeScene } from "../scenes/HomeScene";
import { CountdownTimer } from "./CountDownTimer";
import { EndGameScene } from "../scenes/EndGameScene";

const Home = () => {
  const [currentScene, setCurrentScene] = useState("home");
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [stopTimer, setStopTimer] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [vaaPosition, setVaaPosition] = useState({ x: 0, y: 0, z: 0 }); // New state

  const handleSceneChange = (scene) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentScene(scene);
      setFadeClass("fade-in");
      if (scene === "game") {
        setStopTimer(false);
        setCountdownComplete(false);
        setVaaPosition({ x: 0, y: 0, z: 0 }); // Reset Vaa position
      }
    }, 1000);
  };

  const handleRestartGame = () => {
    setStopTimer(false);
    setCountdownComplete(false);
    setVaaPosition({ x: 0, y: 0, z: 0 });
  };

  const handleReachFinishLine = () => {
    setStopTimer(true);
  };

  const handleCountDownComplete = () => {
    console.log("Countdown Complete");
    setCountdownComplete(true);
  };

  return (
    <VaaCustomisationProvider>
      <div className="h-screen">
        <Canvas>
          {currentScene === "config" && <ConfiguratorScene />}
          {currentScene === "game" && (
            <GameScene
              onReachFinishLine={handleReachFinishLine}
              countdownComplete={countdownComplete}
              vaaPosition={vaaPosition} // Pass Vaa position state
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
            startCountdown={3}
            onComplete={handleCountDownComplete}
            stopTimer={stopTimer}
          />
        )}
        {currentScene === "game" && stopTimer === true ? (
          <EndGameScene
            onPlayAgain={handleRestartGame}
            onConfigure={() => handleSceneChange("config")}
          />
        ) : (
          ""
        )}
      </div>
    </VaaCustomisationProvider>
  );
};

export default Home;
