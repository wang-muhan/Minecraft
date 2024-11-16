precision highp float;
precision highp int;

uniform sampler2D texture;
varying vec2 coord;


void main() {
  /* get vertex info */
  vec4 info = texture2D(texture, coord);

  /* output the normal */
  vec3 normal = vec3(info.b, sqrt(1.0 - dot(info.ba, info.ba)), info.a);

  /* Ensure FragColor is a vec4 */
  gl_FragColor = vec4(normal, 1.0);
}
