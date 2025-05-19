import { Engine } from "./Engine";
import { DebugController } from "./DebugController";
import { Config } from "./Config";
import * as THREE from "three";

export class Experience extends Engine {
  public readonly config: Config;
  public readonly debugController: DebugController;

  private model: THREE.Object3D | null = null;
  private material: THREE.ShaderMaterial;

  constructor(domElement: HTMLElement) {
    super({ domElement });
    this.config = new Config();
    this.debugController = new DebugController(this);

    this.material = new THREE.ShaderMaterial({
      vertexShader: this.config.currentMaterialShader.vertex,
      fragmentShader: this.config.currentMaterialShader.fragment,
      uniforms: {
        uEnvironmentMap: new THREE.Uniform(null),
      },
    });

    this.setEnvironment();

    this.loadModels();
  }

  private setEnvironment() {
    this.loader.loadCubeTexture({
      urls: [
        "env/Cold_Sunset__Cam_2_Left+X.png",
        "env/Cold_Sunset__Cam_3_Right-X.png",
        "env/Cold_Sunset__Cam_4_Up+Y.png",
        "env/Cold_Sunset__Cam_5_Down-Y.png",
        "env/Cold_Sunset__Cam_0_Front+Z.png",
        "env/Cold_Sunset__Cam_1_Back-Z.png",
      ],
      setBackground: true,
      setEnvironment: true,
      onLoad: (texture) => {
        this.material.uniforms.uEnvironmentMap.value = texture;
      },
    });
  }

  private async loadModels() {
    const model = await this.loader.loadGLTFAsync({
      url: "models/suzanne.glb",
    });
    this.model = model.scene;
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.material;
      }
    });
    this.scene.add(this.model);
  }

  public changeMaterial() {
    this.material.vertexShader = this.config.currentMaterialShader.vertex;
    this.material.fragmentShader = this.config.currentMaterialShader.fragment;
    this.material.needsUpdate = true;
  }
}
