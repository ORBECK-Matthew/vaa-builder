import { createContext, useContext, useState } from "react";

const VaaCustomisationContext = createContext({});

export const CameraModes = {
  FREE: "FREE",
  HEAD: "HEAD",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
};

export const VaaCustomisationProvider = ({ children }) => {
  const [cameraMode, setCameraMode] = useState(CameraModes.FREE);

  return (
    <VaaCustomisationContext.Provider value={{ cameraMode, setCameraMode }}>
      {children}
    </VaaCustomisationContext.Provider>
  );
};

export const useVaaCustomisation = () => {
  return useContext(VaaCustomisationContext);
};
