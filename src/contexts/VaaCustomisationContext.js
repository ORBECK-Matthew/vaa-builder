import { createContext, useContext, useState } from "react";
import { DefaultVaaModel } from "../components/Vaa.js";
import { CompetitionVaaModel } from "../components/Vaa2.js";

const VaaCustomisationContext = createContext({});

export const CameraModes = {
  FREE: "FREE",
  VAA: "VAA",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
};

export const VaaCustomisationProvider = ({ children }) => {
  const [cameraMode, setCameraMode] = useState(CameraModes.FREE);
  const [vaa, setVaa] = useState(0);
  const [pagaie, setPagaie] = useState(0);

  const getVaa = () => {
    switch (vaa) {
      case 0:
        return DefaultVaaModel;
      case 1:
        return CompetitionVaaModel;
      default:
        return DefaultVaaModel;
    }
  };

  return (
    <VaaCustomisationContext.Provider
      value={{
        cameraMode,
        setCameraMode,
        vaa,
        setVaa,
        getVaa,
        pagaie,
        setPagaie,
      }}
    >
      {children}
    </VaaCustomisationContext.Provider>
  );
};

export const useVaaCustomisation = () => {
  return useContext(VaaCustomisationContext);
};
