// Libraries
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Suspense } from "react";

// Components
import { Interface } from "./components/Interface";
import { CameraControls } from "./components/CameraControls";
import { Ocean } from "./components/Ocean";
import {
  VaaCustomisationProvider,
  useVaaCustomisation,
} from "./contexts/VaaCustomisationContext";

function VaaScene() {
  const { getVaa } = useVaaCustomisation();
  const VaaModel = getVaa();

  return (
    <Suspense fallback={null}>
      <VaaModel />
      <Ocean />
    </Suspense>
  );
}

export default function App() {
  return (
    <VaaCustomisationProvider>
      <div className="h-screen">
        <Canvas>
          <CameraControls />
          <directionalLight
            intensity={5}
            position={[-5, 5, 5]}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
          <VaaScene />
        </Canvas>
        <Interface />
      </div>
    </VaaCustomisationProvider>
  );
}
