import React from "react";
import { useGLTF } from "@react-three/drei";

export function Island2(props) {
  const { nodes, materials } = useGLTF("assets/models/gltf/island2.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Island.geometry}
        material={materials["Material.001"]}
        position={[-1.542, -0.25, 1.615]}
        scale={[5, 0.513, 5]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/gltf/island2.gltf");
