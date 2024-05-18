import { Affix, Button, Group } from "@mantine/core";
import {
  CameraModes,
  useVaaCustomisation,
} from "../contexts/VaaCustomisationContext";
import { VaaConfigurator } from "./VaaConfigurator";

export const Interface = () => {
  const { cameraMode, setCameraMode } = useVaaCustomisation();
  return (
    <>
      <Affix position={{ top: 20, right: 20 }}>
        <Group>
          {Object.keys(CameraModes).map((mode) => (
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
    </>
  );
};
