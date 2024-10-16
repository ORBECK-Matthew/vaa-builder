import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const CompetitionVaaModel = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("assets/models/glb/vaa3.glb");

  // Set the color of the materials when the component mounts
  useEffect(() => {
    // Change vaaTexture color (example: red)
    materials.vaaTexture.color.set("#0050b8");

    // Change vaaInnerTexture color (example: blue)
    materials.vaaInnerTexture.color.set("#000000");
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <group
        name="DEFAULT_curve_001_Mesh001"
        position={[0, 0.12, 0]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.313}
        ref={ref}
      >
        <mesh
          name="DEFAULT_curve_001_Mesh002"
          geometry={nodes.DEFAULT_curve_001_Mesh002.geometry}
          material={materials.vaaTexture} // Outer texture
        />
        <mesh
          name="DEFAULT_curve_001_Mesh002_1"
          geometry={nodes.DEFAULT_curve_001_Mesh002_1.geometry}
          material={materials.vaaInnerTexture} // Inner texture
        />
      </group>
    </group>
  );
});

useGLTF.preload("/vaa3.glb");
