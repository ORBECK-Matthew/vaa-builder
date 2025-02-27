/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function FinishLine(props) {
  const { nodes, materials } = useGLTF("assets/models/glb/finishLine.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.154, 4.5, 0.024]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={1.25}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text_1.geometry}
          material={materials.blackMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text_2.geometry}
          material={materials.woodMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text_3.geometry}
          material={materials.whiteMaterial}
        />
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/glb/finishLine.glb");
