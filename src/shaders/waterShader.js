// WaterShader.js
import * as THREE from "three";

export const WaterShader = {
  uniforms: {
    time: { value: 0.0 },
    waterNormals: { value: null },
    sunDirection: { value: new THREE.Vector3() },
    sunColor: { value: new THREE.Color(0xffffff) },
    waterColor: { value: new THREE.Color(0x8ce8fa) },
    distortionScale: { value: 3.7 },
    fog: { value: false },
    vaaPosition: { value: new THREE.Vector3() }, // Uniforme pour la position du va'a
  },
  vertexShader: `
      varying vec3 worldPosition;
      varying vec2 vUv;
  
      void main() {
        vUv = uv;
        worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      uniform vec3 vaaPosition;
      uniform vec3 waterColor;
      varying vec3 worldPosition;
  
      void main() {
        // Calculer la distance entre la position de chaque fragment et le va'a
        float distanceToVaa = distance(worldPosition, vaaPosition);
        
        // Créer un effet de traînée blanche en fonction de la distance
        vec3 color = mix(vec3(1.0, 1.0, 1.0), waterColor, smoothstep(0.0, 5.0, distanceToVaa));
  
        gl_FragColor = vec4(color, 1.0);
      }
    `,
};
