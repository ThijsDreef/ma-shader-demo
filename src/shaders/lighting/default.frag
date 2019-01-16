precision mediump float;

varying vec2 vUv;
varying vec3 vNormal;

void main(void) {
    //set ligth dir to come from certain direction
    vec3 ligthDir = normalize(vec3(0.3, 1, 0.3));
    //calculate light strength by comparing how aligned two vectors are
    float lightStrength = max(dot(vNormal, ligthDir), 0.0);
    //multiply our color by the strenth of the light
    gl_FragColor = vec4(1, 1, 0, 1) * (lightStrength + 0.2);
    //set alpha to 1 because we dont want transparency
    gl_FragColor.w = 1.0;
}