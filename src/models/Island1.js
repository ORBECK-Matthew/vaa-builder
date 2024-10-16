import React from "react";
import { useGLTF } from "@react-three/drei";
import { Tree } from "./Tree";

export function Island1(props) {
  const { nodes, materials } = useGLTF("assets/models/gltf/island1.gltf");

  // Générer des positions aléatoires pour les arbres
  const generateRandomTreePositions = (count, range) => {
    return Array.from({ length: count }).map(() => [
      (Math.random() - 0.5) * range, // Position X aléatoire autour de l'île
      0, // Garder sur le sol (Y = 0)
      (Math.random() - 0.5) * range, // Position Z aléatoire autour de l'île
    ]);
  };

  // Générer 5 arbres autour de l'île avec une portée de 10 unités
  const treePositions = generateRandomTreePositions(5, 10);

  return (
    <group {...props} dispose={null}>
      {/* Modèle de l'île */}
      <mesh
        geometry={nodes.Island001.geometry}
        material={materials["Material.001"]}
        position={[5.775, -0.25, 1.426]}
        scale={[6, 0.693, 6]}
      />

      {/* Ajouter des arbres aux positions générées */}
      {treePositions.map((position, index) => (
        <Tree key={index} position={position} />
      ))}
    </group>
  );
}

useGLTF.preload("assets/models/gltf/island1.gltf");
