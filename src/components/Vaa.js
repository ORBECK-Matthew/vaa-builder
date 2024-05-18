/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/assets/models/gltf/vaa.gltf 
*/

import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export function DefaultVaaModel(props) {
  const { nodes, materials } = useGLTF("assets/models/gltf/vaa.gltf");
  const texture = useTexture("assets/models/textures/vaaTextureImage2.png");

  const textureMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        name="DEFAULT_curve_001_Mesh001"
        geometry={nodes.DEFAULT_curve_001_Mesh001.geometry}
        material={textureMaterial}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.5}
        position={[0, 0.2, 0]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/gltf/vaa.gltf");
