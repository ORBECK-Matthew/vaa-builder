import React from "react";
import { Bouee } from "../models/Bouee";

const BoueeGenerator = ({ count, spacing }) => {
  const bouees = [];

  // Générer des bouées des deux côtés de l'axe X en miroir
  for (let i = 0; i < count; i++) {
    // Bouées côté positif de l'axe X
    bouees.push(
      <Bouee key={`positive-${i}`} position={[i * spacing, 0, -0.1]} />
    );

    // Bouées côté négatif de l'axe X (miroir)
    bouees.push(
      <Bouee key={`negative-${i}`} position={[i * spacing, 0, 8.1]} />
    );
  }

  return <>{bouees}</>;
};

export default BoueeGenerator;
