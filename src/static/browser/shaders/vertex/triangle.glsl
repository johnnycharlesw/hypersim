#version 300 es

precision highp float;

in vec3 inColor;

out vec4 outColor;

float clamp_rgb(int rgb) {
    return rgb / 255;
}

void main() {
  float rClamped = inColor.x;
  float gClamped = inColor.y;
  float bClamped = inColor.z;
  outColor = vec4(rClamped, gClamped, bClamped, 1);
}