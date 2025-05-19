varying vec3 vNormal;

float inverseLerp(float value, float minValue, float maxValue) {
    return (value - minValue) / (maxValue - minValue);
}

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(value, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec3 baseColor = vec3(0.5);
    vec3 skyColor = vec3(0.0, 0.3, 0.6);
    vec3 groundColor = vec3(0.6, 0.3, 0.1);
    vec3 lighting = vec3(0.0);

    vec3 normal = normalize(vNormal);

    // Ambient light
    vec3 ambient = vec3(0.5);

    // Hemi light
    float hemiMix = remap(normal.y, -1.0, 1.0, 0.0, 1.0);
    vec3 hemi = mix(groundColor, skyColor, hemiMix);

    lighting = ambient + hemi;

    vec3 color = baseColor * lighting;

    gl_FragColor = vec4(color, 1.0);
}