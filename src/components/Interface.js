import { Affix, Button, Group } from "@mantine/core";
import { CameraModes } from "../contexts/CameraContext";
import { VaaConfigurator } from "./VaaConfigurator";
import { PagaieConfigurator } from "./PagaieConfigurator";
import { useCamera } from "../contexts/CameraContext";

export const Interface = () => {
  const { cameraMode, setCameraMode } = useCamera();

  // Filtrer les modes pour exclure "GAME"
  const cameraModes = Object.keys(CameraModes).filter(
    (mode) => mode !== CameraModes.GAME && mode !== CameraModes.HOME
  );

  return (
    <>
      <Affix position={{ top: 20, right: 20 }}>
        <Group>
          {cameraModes.map((mode) => (
            <Button
              key={mode}
              variant={mode === cameraMode ? "filled" : "light"}
              onClick={() => setCameraMode(mode)}
            >
              {mode}
            </Button>
          ))}
        </Group>
      </Affix>
      <Affix position={{ top: 65, right: 20 }}>
        {cameraMode === CameraModes.VAA && <VaaConfigurator />}
      </Affix>
      <Affix position={{ top: 65, right: 20 }}>
        {cameraMode === CameraModes.PAGAIE && <PagaieConfigurator />}
      </Affix>
    </>
  );
};
