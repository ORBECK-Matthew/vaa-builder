import { useState, useEffect } from "react";

export const CountdownTimer = ({ startCountdown, onComplete, stopTimer }) => {
  const [countdown, setCountdown] = useState(startCountdown);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(true);

  useEffect(() => {
    let timer;
    if (isCountingDown) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsCountingDown(false);
            onComplete();
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      timer = setInterval(() => {
        if (!stopTimer) {
          setElapsedTime((prevTime) => parseFloat((prevTime + 0.1).toFixed(1)));
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isCountingDown, onComplete, stopTimer]);

  return (
    <>
      {isCountingDown ? (
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
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            fontFamily: "PoetsenOne",
            fontSize: "24px",
            color: "white",
          }}
        >
          Time: {elapsedTime.toFixed(1)}s
        </div>
      )}
    </>
  );
};
