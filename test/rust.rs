pub const CLUSTER_DRAW: &str = /*wgsl*/"
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
";
