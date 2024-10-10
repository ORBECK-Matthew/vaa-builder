import React, { useMemo } from "react";
import { Tree } from "../models/Tree"; // Import du modèle Tree

// Fonction qui génère un nombre aléatoire entre min et max
const getRandomPosition = (min, max) => Math.random() * (max - min) + min;
const getRandomRotation = () => Math.random() * Math.PI * 2; // Rotation entre 0 et 2π

export function TreeGenerator({ count = 50, radius = 50 }) {
  // Utilisation de useMemo pour éviter de recalculer les positions et rotations à chaque rendu
  const trees = useMemo(() => {
    const treeTransforms = [];

    for (let i = 0; i < count; i++) {
      // Générer une position x et z aléatoire dans un rayon donné
      const x = getRandomPosition(-radius, radius);
      const z = getRandomPosition(-radius, radius);
      const y = 0; // Garder y à 0 pour chaque arbre

      // Générer une rotation aléatoire autour de l'axe Y
      const rotationY = getRandomRotation();

      treeTransforms.push({ x, y, z, rotationY });
    }

    return treeTransforms;
  }, [count, radius]);

  return (
    <>
      {trees.map((transform, index) => (
        // Chaque arbre a une position et une rotation aléatoire
        <Tree
          key={index}
          position={[transform.x, transform.y, transform.z]}
          rotation={[0, transform.rotationY, 0]} // Rotation uniquement autour de l'axe Y
        />
      ))}
    </>
  );
}
