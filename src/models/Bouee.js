import React from "react";
import { useGLTF } from "@react-three/drei";

export function Bouee({ position }) {
  const { nodes, materials } = useGLTF("assets/models/gltf/bouee.gltf");

  return (
    <group position={position} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Torus001_0.geometry}
          material-color={"yellow"}
          position={[-35, 4, 1]} // Vous pouvez ajuster cette position interne
          rotation={[-Math.PI / 2, 0.659, Math.PI / 2]}
          scale={0.1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/gltf/bouee.gltf");
