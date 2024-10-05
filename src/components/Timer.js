import { useState, useEffect } from "react";

export const Timer = ({ stopTimer, onElapsedTimeUpdate }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (!stopTimer) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => {
          const newTime = prevTime + 0.1;
          onElapsedTimeUpdate(newTime.toFixed(1)); // Appeler la fonction pour mettre à jour le temps écoulé
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [stopTimer, onElapsedTimeUpdate]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.3rem",
      }}
    >
      Temp : {elapsedTime.toFixed(1)}s
    </div>
  );
};
