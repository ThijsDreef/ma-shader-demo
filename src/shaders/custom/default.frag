precision mediump float;

varying vec3 vNormal;
varying vec2 vUv;

uniform sampler2D uHatch0;
uniform sampler2D uHatch1;

float between(float value, float minValue, float maxValue)
{
    return step(value, maxValue) * step(minValue, value);
}

void main(void)
{
    float luminance = (1. - clamp(dot(vNormal, normalize(vec3(0.3, 1, 0.3))), 0., 0.9)) * 5.;
    float color = 0.;
    vec3 low = texture2D(uHatch0, vUv * 3.).xyz;
    vec3 high = texture2D(uHatch1, vUv * 3.).xyz;
    color += mix(low.r, low.g, luminance) * between(luminance, 0., 1.);
    color += mix(low.g, low.b, luminance - 1.) * between(luminance - 1., 0., 1.);
    color += mix(low.b, high.r, luminance - 2.) * between(luminance - 2., 0., 1.);
    color += mix(high.r, high.g, luminance - 3.) * between(luminance - 3., 0., 1.);
    color += mix(high.g, high.b, luminance - 4.) * between(luminance - 4., 0., 1.);

    gl_FragColor = vec4(color);
    gl_FragColor.w = 1.;

}
