attribute vec3 position;
attribute vec2 uv;
varying vec2 coord;

void main() {
  // coord = position.xy * 0.5 + 0.5;
  coord = uv;

  gl_Position = vec4(position.xyz, 1.0);
}
