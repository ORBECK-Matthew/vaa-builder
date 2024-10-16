import { createContext, useContext, useState } from "react";

const CameraContext = createContext({});

export const CameraModes = {
  FREE: "FREE",
  VAA: "VAA",
  // PAGAIE: "PAGAIE",
  GAME: "GAME",
  HOME: "HOME",
};

export const CameraProvider = ({ children }) => {
  const [cameraMode, setCameraMode] = useState(CameraModes.FREE);

  return (
    <CameraContext.Provider
      value={{
        cameraMode,
        setCameraMode,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  return useContext(CameraContext);
};
