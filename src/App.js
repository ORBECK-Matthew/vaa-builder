// Libraries
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Suspense } from "react";

// Components
import { Interface } from "./components/Interface";
import { CameraControls } from "./components/CameraControls";
import { Ocean } from "./components/Ocean";

export default function App() {
  return (
    <div className="h-screen">
      <Canvas>
        <CameraControls />
        {/* <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[3, 3, 5]} /> */}
        <directionalLight
          intensity={5}
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <Suspense fallback={null}>
          <Ocean />
        </Suspense>
      </Canvas>
      <Interface />
    </div>
  );
}
