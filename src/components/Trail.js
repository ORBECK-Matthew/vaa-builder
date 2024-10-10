import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NodeToyMaterial } from "@nodetoy/react-nodetoy";

export const Trail = ({ target }) => {
  const trailRef = useRef();
  const trailLength = 50; // Number of segments for the trail
  const positions = useRef(new Array(trailLength).fill(new THREE.Vector3()));

  useFrame(() => {
    if (!target.current || !trailRef.current) return;

    // Update trail positions
    positions.current.unshift(target.current.position.clone());
    positions.current = positions.current.slice(0, trailLength);

    // Convert positions to a Float32Array for BufferGeometry
    const points = positions.current.map(
      (pos) => new THREE.Vector3(pos.x, pos.y, pos.z)
    );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    if (trailRef.current) {
      trailRef.current.geometry = lineGeometry;
    }
  });

  return (
    <line ref={trailRef} position={[-2.5, 0.05, 0]}>
      <lineBasicMaterial
        attach="material"
        color={"#ffffff"}
        linewidth={100}
        linecap={"round"}
        linejoin={"round"}
      />
    </line>
  );
};
