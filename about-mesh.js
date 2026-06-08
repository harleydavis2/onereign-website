/**
 * OneReign — about-mesh.js  (V3)
 * Element 4: About Section Mesh Background
 *
 * Spec (ONEREIGN_AGENT_PROMPT_V3.md):
 * - Canvas: full width × height of .about section, position absolute, z-index 0
 * - Geometry: PlaneGeometry(2000, 800, 40, 20) — flat on XZ plane
 * - Per-frame vertex Y displacement:
 *     vertex.y = sin(vertex.x * 0.01 + time) * 15 + cos(vertex.z * 0.01 + time * 0.7) * 10
 * - Material: MeshBasicMaterial, color 0x2563EB, wireframe true, opacity 0.07
 * - Camera: PerspectiveCamera tilted down at 45° — looks straight down at mesh
 * - No lighting needed (wireframe ignores it)
 * - time += 0.003 per frame
 * - Only animates when the .about section is visible (IntersectionObserver)
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('about-canvas');
  const section = document.querySelector('.about');
  if (!canvas || !section || typeof THREE === 'undefined') return;

  // ── Canvas Styling ──
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none';

  // ── Scene ──
  const scene = new THREE.Scene();

  const rect = section.getBoundingClientRect();
  const w = rect.width  || window.innerWidth;
  const h = rect.height || 600;

  // Camera tilted down at exactly 45° — positioned equal Y and Z above/behind origin
  const camera = new THREE.PerspectiveCamera(60, w / h, 1, 5000);
  camera.position.set(0, 600, 600);  // equal y and z → 45° downward tilt
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(w, h);
  renderer.setPixelRatio(1); // fixed pixel ratio for performance on a background element

  // ── Geometry — PlaneGeometry lies on XZ plane ──
  // PlaneGeometry by default is on XY plane — rotate -90° on X to lay it flat on XZ
  const geometry = new THREE.PlaneGeometry(2000, 800, 40, 20);
  geometry.rotateX(-Math.PI / 2); // now: X stays X, Y (local) becomes Z (world), Z (local) becomes Y (world, down)

  const material = new THREE.MeshBasicMaterial({
    color: 0x2563EB,
    wireframe: true,
    transparent: true,
    opacity: 0.07
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Store original vertex positions for clean displacement each frame
  const posAttr = geometry.getAttribute('position');
  const origPositions = new Float32Array(posAttr.array);
  let time = 0;

  // ── Animation Loop ──
  let rafId = null;

  function animate() {
    rafId = requestAnimationFrame(animate);
    time += 0.003;

    // Apply spec displacement formula to each vertex
    // After rotateX(-PI/2): local X → world X, local Z → world Z (down), local Y → world -Z
    // The plane vertices have their world X and Z we need for the sine formula
    for (let i = 0; i < posAttr.count; i++) {
      const ox = origPositions[i * 3];     // world X (unchanged by rotation)
      const oz = origPositions[i * 3 + 2]; // original local Z, now maps to world Z

      // spec: vertex.y = sin(vertex.x * 0.01 + time) * 15 + cos(vertex.z * 0.01 + time*0.7) * 10
      const dy = Math.sin(ox * 0.01 + time) * 15
               + Math.cos(oz * 0.01 + time * 0.7) * 10;

      posAttr.setY(i, dy);
    }

    posAttr.needsUpdate = true;
    geometry.computeVertexNormals(); // keeps wireframe looking clean

    renderer.render(scene, camera);
  }

  function startAnimation() {
    if (!rafId) animate();
  }

  function stopAnimation() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // ── Intersection Observer — only run when About section is visible ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimation();
      } else {
        stopAnimation();
      }
    });
  }, { threshold: 0.05 });

  observer.observe(section);

  // ── Resize ──
  window.addEventListener('resize', () => {
    const newRect = section.getBoundingClientRect();
    const nw = newRect.width  || window.innerWidth;
    const nh = newRect.height || 600;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });
});
