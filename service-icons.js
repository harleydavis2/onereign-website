/**
 * OneReign — service-icons.js  (V3)
 * Element 3: Service Card 3D Icons
 *
 * Five 80×80px Three.js canvases, one per service card.
 * Geometries:
 *   Engineering  → TorusKnotGeometry(20, 6, 64, 8)
 *   Design       → IcosahedronGeometry(22, 0)
 *   Research     → OctahedronGeometry(25, 0)
 *   Products     → BoxGeometry(30, 30, 30)
 *   Platforms    → TorusGeometry(20, 7, 16, 32)
 * Material: MeshStandardMaterial, blue metallic
 * Lighting: blue PointLight(3, 200) + AmbientLight(0.4)
 * Default rotation: x += 0.008, y += 0.012 per frame
 * Card mouseenter: pause rotation
 * Card mouseleave: resume rotation
 *
 * Populated in: Phase 3, Element 3
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

  const material = new THREE.MeshStandardMaterial({
    color: 0x2563EB, // --accent-blue
    metalness: 0.8,
    roughness: 0.2
  });

  const renderers = [];

  icons.forEach(({ id, geometry }) => {
    const canvas = document.getElementById(id);
    if (!canvas) return; // Will initialize when the DOM for Phase 8 is ready

    const scene = new THREE.Scene();
    
    // We assume 80x80 container as per spec
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(80, 80);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x2563EB, 3, 200);
    blueLight.position.set(50, 50, 50);
    scene.add(blueLight);

    // Interaction state
    let isPaused = false;

    // The spec requests pausing when the card is hovered
    // Find the closest parent with class 'card', or fallback to canvas itself
    const card = canvas.closest('.card') || canvas;

    card.addEventListener('mouseenter', () => isPaused = true);
    card.addEventListener('mouseleave', () => isPaused = false);

    // Register for animation loop
    renderers.push({
      renderer,
      scene,
      camera,
      mesh,
      getIsPaused: () => isPaused
    });
  });

  // Global animation loop for all mini-canvases
  function animate() {
    requestAnimationFrame(animate);

    renderers.forEach(({ renderer, scene, camera, mesh, getIsPaused }) => {
      if (!getIsPaused()) {
        mesh.rotation.x += 0.008;
        mesh.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    });
  }

  if (renderers.length > 0) {
    animate();
  }
});
