import ambientAndHemiVertexShader from "./shaders/ambient_and_hemi/vertex.glsl";
import ambientAndHemiFragmentShader from "./shaders/ambient_and_hemi/fragment.glsl";
import lambertianVertexShader from "./shaders/lambertian/vertex.glsl";
import lambertianFragmentShader from "./shaders/lambertian/fragment.glsl";
import phongVertexShader from "./shaders/phong/vertex.glsl";
import phongFragmentShader from "./shaders/phong/fragment.glsl";
import iblVertexShader from "./shaders/IBL/vertex.glsl";
import iblFragmentShader from "./shaders/IBL/fragment.glsl";
import toonVertexShader from "./shaders/toon/vertex.glsl";
import toonFragmentShader from "./shaders/toon/fragment.glsl";

export class Config {
  public materialTypes = [
    "ambient_and_hemi",
    "lambertian",
    "phong",
    "ibl",
    "toon",
  ] as const;

  public currentMaterialType: (typeof this.materialTypes)[number] =
    "ambient_and_hemi";

  public materialShaders: Record<
    (typeof this.materialTypes)[number],
    { vertex: string; fragment: string }
  >;

  public constructor() {
    this.materialShaders = {
      ambient_and_hemi: {
        vertex: ambientAndHemiVertexShader,
        fragment: ambientAndHemiFragmentShader,
      },
      lambertian: {
        vertex: lambertianVertexShader,
        fragment: lambertianFragmentShader,
      },
      phong: {
        vertex: phongVertexShader,
        fragment: phongFragmentShader,
      },
      ibl: {
        vertex: iblVertexShader,
        fragment: iblFragmentShader,
      },
      toon: {
        vertex: toonVertexShader,
        fragment: toonFragmentShader,
      },
    };
  }

  public get currentMaterialShader() {
    return this.materialShaders[this.currentMaterialType];
  }
}
