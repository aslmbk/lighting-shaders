import { Experience } from "./Experience";

export class DebugController {
  constructor(experience: Experience) {
    experience.debug
      .addBinding(experience.config, "currentMaterialType", {
        label: "Material",
        options: {
          "Ambient and Hemi": "ambient_and_hemi",
          Lambertian: "lambertian",
          Phong: "phong",
          "Image Based Lighting": "ibl",
          "Toon Shading": "toon",
        },
      })
      .on("change", ({ value }) => {
        experience.config.currentMaterialType = value;
        experience.changeMaterial();
      });
  }
}
