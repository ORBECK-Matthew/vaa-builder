import React from "react";
import { useGLTF } from "@react-three/drei";

export function Island3(props) {
  const { nodes, materials } = useGLTF("assets/models/gltf/island3.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Island003.geometry}
        material={materials["Material.001"]}
        position={[3.887, -0.25, -4.239]}
        scale={[4, 0.472, 4]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/gltf/island3.gltf");
