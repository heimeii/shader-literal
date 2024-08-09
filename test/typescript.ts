const wgsl0 = /*wgsl*/`
@group(0) @binding(0) var<uniform> camera: CameraNodeUBO;
@group(0) @binding(1) var<storage, read> indices: array<u32>;

struct VertexOutput {
  @builtin(position) position: vec4f,
}

@vertex
fn vertex_main(@builtin(vertex_index) vertex_index: u32) -> VertexOutput {
  let clip_position = camera.projection_matrix * camera.view_matrix * cluster.matrix * vec4(vertex_position, 1.0);
  return VertexOutput(clip_position);
}
`;

const ONE = 1.0;
const wgsl1 = /*wgsl*/ `
@fragment
fn frag_main(
  @location(0) normal: vec3f,
) -> @location(0) vec4f {
  return vec4(normal * 0.5 + 0.5, ${ONE});
}
`;

const glsl = /*glsl*/`
precision highp float;
struct IncidentLight {
  vec3 color;
};
uniform sampler2D diffuseMap;
layout (std140) uniform RenderInfoComponentUBO {
  RenderInfoComponent RenderInfoComponentData;
};

void main() {
  gl_Position = CameraComponentData.view_projection * NodeInfoComponentData.world_matrix * vec4(position, ${ONE});
}
`;
