precision highp float;
attribute vec3 aPosition;
attribute vec2 aUv;
attribute vec3 aNormal;

varying vec3 vNormal;
varying vec2 vUv;

uniform mat4 uMvp;
uniform mat4 uModel;

void main()
{
    //pas along the uv to the next stage
    vUv = aUv;
    //pas along the normal to the next stage
    vNormal = aNormal;
    //set the drawing position to be where it should be based on matrix math
    gl_Position = uMvp * uModel * vec4(aPosition, 1);
}
