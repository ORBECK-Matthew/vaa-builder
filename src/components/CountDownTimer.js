import { useState, useEffect } from "react";

export const CountdownTimer = ({ startCountdown, onComplete, resetTimer }) => {
  const [countdown, setCountdown] = useState(startCountdown);
  const [isCountingDown, setIsCountingDown] = useState(true);

  useEffect(() => {
    let timer;
    if (isCountingDown) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsCountingDown(false);
            // Utiliser setTimeout pour éviter de mettre à jour l'état pendant le rendu
            setTimeout(onComplete, 0);
            return 0; // Assure que countdown ne devienne pas négatif
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCountingDown, onComplete]);

  // Réinitialisation du compte à rebours lorsque `resetTimer` change
  useEffect(() => {
    if (resetTimer) {
      setCountdown(startCountdown);
      setIsCountingDown(true);
    }
  }, [resetTimer, startCountdown]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "PoetsenOne",
        fontSize: "48px",
        color: "white",
        textAlign: "center",
      }}
    >
      {countdown}
    </div>
  );
};
