import React from "react";
import { useGLTF } from "@react-three/drei";

export function Island4(props) {
  const { nodes, materials } = useGLTF("assets/models/gltf/island4.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Island002.geometry}
        material={materials["Material.001"]}
        position={[-2.976, -0.25, -4.187]}
        scale={[6, 0.524, 6]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/gltf/island4.gltf");
