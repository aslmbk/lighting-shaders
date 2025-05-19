uniform samplerCube uEnvironmentMap;

varying vec3 vNormal;
varying vec3 vPosition;

vec3 linearTosRGB(vec3 value ) {
    vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
    vec3 v1 = value * 12.92;
    vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);
    return mix(v2, v1, lt);
}

vec3 linearToGamma(vec3 value) {
    return pow(value, vec3(1.0 / 2.2));
}

void main() {
    vec3 baseColor = vec3(0.5);
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    vec3 lighting = vec3(0.0);

    vec3 normal = normalize(vNormal);

    vec3 iblCoord = reflect(-viewDirection, normal);
    iblCoord = normalize(iblCoord);
    vec3 iblSample = textureCube(uEnvironmentMap, iblCoord).rgb;

    lighting = iblSample;

    vec3 color = baseColor * lighting;
    // color = linearTosRGB(color);
    color = linearToGamma(color);

    gl_FragColor = vec4(color, 1.0);
}