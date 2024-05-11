import { Canvas } from "@react-three/fiber";
import { Interface } from "./components/Interface";
import { CameraControls } from "./components/CameraControls";

export default function App() {
  return (
    <div className="h-screen">
      <Canvas>
        <CameraControls />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[3, 3, 5]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
      <Interface />
    </div>
  );
}
