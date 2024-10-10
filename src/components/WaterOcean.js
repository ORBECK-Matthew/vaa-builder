import { useFrame, useThree } from "@react-three/fiber";
import {
  ShaderLib,
  UniformsUtils,
  Color,
  Vector2,
  MeshPhysicalMaterial,
} from "three";
import { GPUComputationRenderer } from "three-stdlib";
import {
  heightmapFragmentShader,
  waterVertexShader,
} from "../shaders/waterShaderDisplacement";
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla";

// Texture width for simulation
const WIDTH = 256;
// Water size in system units
const BOUNDS = 1024;

let waterUniforms;
let heightmapVariable;
let gpuCompute;

export default function WaterOcean({ vaaPosition }) {
  const waterMaterial = new CustomShaderMaterialImpl({
    baseMaterial: MeshPhysicalMaterial,
    vertexShader: waterVertexShader,
    uniforms: UniformsUtils.merge([
      ShaderLib["physical"].uniforms,
      { heightmap: { value: null } },
    ]),
  });

  // Material attributes
  waterMaterial.transmission = 1;
  waterMaterial.metalness = 0;
  waterMaterial.roughness = 0;
  waterMaterial.color = new Color(0x217d9c);

  // Defines
  waterMaterial.defines.WIDTH = WIDTH.toFixed(1);
  waterMaterial.defines.BOUNDS = BOUNDS.toFixed(1);

  waterUniforms = waterMaterial.uniforms;

  const gl = useThree((state) => state.gl);
  gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl);

  const heightmap0 = gpuCompute.createTexture();
  heightmapVariable = gpuCompute.addVariable(
    "heightmap",
    heightmapFragmentShader,
    heightmap0
  );
  gpuCompute.setVariableDependencies(heightmapVariable, [heightmapVariable]);
  // Utilisation de la position du va'a au lieu de la souris
  heightmapVariable.material.uniforms["vaaPosition"] = {
    value: new Vector2(vaaPosition.x, vaaPosition.y),
  };
  heightmapVariable.material.uniforms["mouseSize"] = { value: 20.0 }; // on peut garder ce paramètre pour ajuster l'effet
  heightmapVariable.material.uniforms["viscosityConstant"] = { value: 0.98 };
  heightmapVariable.material.uniforms["heightCompensation"] = { value: 0 };
  heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1);

  const error = gpuCompute.init();
  if (error !== null) {
    console.error(error);
  }

  useFrame(() => {
    const uniforms = heightmapVariable.material.uniforms;
    // Mise à jour de la position du va'a à chaque frame
    uniforms["vaaPosition"].value.set(vaaPosition.x, vaaPosition.y);

    // Calcul des nouvelles valeurs de la simulation
    gpuCompute.compute();
    waterUniforms["heightmap"].value =
      gpuCompute.getCurrentRenderTarget(heightmapVariable).texture;
  });

  return (
    <>
      <mesh
        material={waterMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        scale={0.4}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[BOUNDS, BOUNDS, WIDTH, WIDTH]} />
      </mesh>
    </>
  );
}
