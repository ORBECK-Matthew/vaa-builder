import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

export function DefaultPagaieModel(props) {
  const { nodes } = useGLTF("assets/models/gltf/pagaie.gltf");
  const texture = useTexture("assets/models/textures/paggaieTextureImage.png");

  // Créez un matériau standard avec la texture
  const material = new MeshStandardMaterial({ map: texture });

  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cylinder"
        geometry={nodes.Cylinder.geometry}
        material={material}
        position={[-1.5, 0.5, 2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.05 / 1.5, 0.185 / 1.5, 0.05 / 1.5]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/gltf/pagaie.gltf");
