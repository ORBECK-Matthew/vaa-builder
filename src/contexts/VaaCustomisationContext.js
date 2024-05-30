import { createContext, useContext, useState } from "react";
import { DefaultVaaModel } from "../models/Vaa.js";
import { TraditionVaaModel } from "../models/Vaa2.js";
import { CompetitionVaaModel } from "../models/Vaa3.js";

import { DefaultPagaieModel } from "../models/Pagaie.js";

const VaaCustomisationContext = createContext({});

export const VaaCustomisationProvider = ({ children }) => {
  const [vaa, setVaa] = useState(0);
  const [pagaie, setPagaie] = useState(0);

  const getVaa = () => {
    switch (vaa) {
      case 0:
        return DefaultVaaModel;
      case 1:
        return TraditionVaaModel;
      case 2:
        return CompetitionVaaModel;
      default:
        return DefaultVaaModel;
    }
  };

  const getPagaie = () => {
    switch (pagaie) {
      case 0:
        return DefaultPagaieModel;
      case 1:
        return TraditionVaaModel;
      default:
        return DefaultPagaieModel;
    }
  };

  return (
    <VaaCustomisationContext.Provider
      value={{
        vaa,
        setVaa,
        getVaa,
        pagaie,
        setPagaie,
        getPagaie,
      }}
    >
      {children}
    </VaaCustomisationContext.Provider>
  );
};

export const useVaaCustomisation = () => {
  return useContext(VaaCustomisationContext);
};
