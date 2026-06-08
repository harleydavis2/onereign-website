/**
 * OneReign — service-icons.js  (V3)
 * Element 3: Service Card 3D Icons
 *
 * Five 80×80px Three.js canvases, one per service card.
 * Spec (ONEREIGN_AGENT_PROMPT_V3.md):
 * - Engineering  → TorusKnotGeometry(20, 6, 64, 8)
 * - Design       → IcosahedronGeometry(22, 0)
 * - Research     → OctahedronGeometry(25, 0)
 * - Products     → BoxGeometry(30, 30, 30)
 * - Platforms    → TorusGeometry(20, 7, 16, 32)
 * - Material: MeshStandardMaterial, color 0x2563EB, metalness 0.8, roughness 0.2 (SEPARATE per mesh)
 * - Lighting: PointLight(0x2563EB, 3, 200) + AmbientLight(0xffffff, 0.4)
 * - Rotation: x += 0.008, y += 0.012 per frame
 * - Card mouseenter: pause — card mouseleave: resume
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE === 'undefined') return;

  const icons = [
    { id: 'icon-engineering', geometry: new THREE.TorusKnotGeometry(20, 6, 64, 8) },
    { id: 'icon-design',      geometry: new THREE.IcosahedronGeometry(22, 0) },
    { id: 'icon-research',    geometry: new THREE.OctahedronGeometry(25, 0) },
    { id: 'icon-products',    geometry: new THREE.BoxGeometry(30, 30, 30) },
    { id: 'icon-platforms',   geometry: new THREE.TorusGeometry(20, 7, 16, 32) }
  ];

  const activeRenderers = [];

  icons.forEach(({ id, geometry }) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(80, 80);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Each icon gets its OWN material instance — shared materials cause Three.js bugs
    const material = new THREE.MeshStandardMaterial({
      color: 0x2563EB,
      metalness: 0.8,
      roughness: 0.2
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting per scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x2563EB, 3, 200);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Pause on card hover
    let isPaused = false;
    const card = canvas.closest('.card') || canvas;
    card.addEventListener('mouseenter', () => { isPaused = true; });
    card.addEventListener('mouseleave', () => { isPaused = false; });

    activeRenderers.push({ renderer, scene, camera, mesh, isPaused: () => isPaused });
  });

  if (activeRenderers.length === 0) return;

  function animate() {
    requestAnimationFrame(animate);
    activeRenderers.forEach(({ renderer, scene, camera, mesh, isPaused }) => {
      if (!isPaused()) {
        mesh.rotation.x += 0.008;
        mesh.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    });
  }

  animate();
});
