import React, { useMemo } from "react";
import { Island1 } from "../models/Island1";
import { Island2 } from "../models/Island2";
import { Island3 } from "../models/Island3";
import { Island4 } from "../models/Island4";
import { Tree } from "../models/Tree";

// Helper function to generate random positions and rotations
const getRandomPosition = () => [
  (Math.random() - 0.5) * 100, // X position
  0, // Y position (keep it flat on the ground)
  (Math.random() - 0.5) * 100, // Z position
];

const getRandomRotation = () => [
  0, // Keep Y axis flat
  Math.random() * Math.PI * 2, // Random Y rotation (horizontal)
  0,
];

// Component to generate a random number of trees on each island
const TreesOnIsland = ({ islandPosition }) => {
  const treeCount = Math.floor(Math.random() * 4) + 2; // Between 2 to 5 trees

  return (
    <>
      {Array.from({ length: treeCount }).map((_, index) => (
        <Tree
          key={index}
          position={[
            islandPosition[0] + (Math.random() - 0.5) * 10, // Random position near the island
            0, // Keep on the ground
            islandPosition[2] + (Math.random() - 0.5) * 10,
          ]}
          rotation={getRandomRotation()}
        />
      ))}
    </>
  );
};

// Main component to generate islands
const IslandGenerator = () => {
  // Generate random positions and rotations for each island ONCE using useMemo
  const islands = useMemo(
    () =>
      Array.from({ length: 10 }).map(() => ({
        position: getRandomPosition(),
        rotation: getRandomRotation(),
      })),
    [] // Only run once
  );

  const IslandComponents = [Island1, Island2, Island3, Island4];

  return (
    <>
      {islands.map((island, index) => {
        // Choose a random island type for each island
        const IslandComponent =
          IslandComponents[Math.floor(Math.random() * IslandComponents.length)];

        return (
          <group key={index}>
            <IslandComponent
              position={island.position}
              rotation={island.rotation}
            />
            <TreesOnIsland islandPosition={island.position} />
          </group>
        );
      })}
    </>
  );
};

export default IslandGenerator;
