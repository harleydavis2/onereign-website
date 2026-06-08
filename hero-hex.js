/**
 * OneReign — hero-hex.js  (V3)
 * Element 2: Hero Hex Geometry
 *
 * Interactive 3D polyhedron in the right column of the hero.
 * Spec (ONEREIGN_AGENT_PROMPT_V3.md):
 * - Canvas: 500×500px, hidden on mobile (< 768px)
 * - IcosahedronGeometry(120, 1)
 * - MeshStandardMaterial: color 0xCCCCCC, metalness 0.9, roughness 0.1
 * - Wireframe overlay: MeshBasicMaterial color 0x2563EB, wireframe true, opacity 0.15
 * - PointLight(0x2563EB, 2.5, 500) at (200, 200, 200)
 * - AmbientLight(0xffffff, 0.25)
 * - DirectionalLight(0xffffff, 0.8) at (-100, 200, 100)
 * - Default rotation: y += 0.001/frame
 * - Pointer enter: speed → 0.004; leave: lerp back to 0.001 over ~60 frames
 * - Drag: pointerdown/pointermove/pointerup — deltaX * 0.005, deltaY * 0.005
 * - Fade in: opacity 0 → 1 at 1000ms after page load
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-hex-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Hide on mobile per spec
  if (window.innerWidth < 768) {
    canvas.style.display = 'none';
    return;
  }

  // ── Scene Setup ──
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000); // 1:1 aspect for 500×500
  camera.position.z = 400;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(500, 500);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ── Geometry & Materials ──
  const geometry = new THREE.IcosahedronGeometry(120, 1);

  // Solid metallic surface — spec: color 0xCCCCCC, metalness 0.9, roughness 0.1
  const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0xCCCCCC,
    metalness: 0.9,
    roughness: 0.1,
    wireframe: false
  });
  const solidMesh = new THREE.Mesh(geometry, solidMaterial);

  // Wireframe overlay — spec: color 0x2563EB, opacity 0.15
  const wireGeometry = new THREE.IcosahedronGeometry(122, 1); // slightly larger to avoid z-fighting
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x2563EB,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);

  const hexGroup = new THREE.Group();
  hexGroup.add(solidMesh);
  hexGroup.add(wireMesh);
  scene.add(hexGroup);

  // ── Lighting — exact spec values ──
  const pointLight = new THREE.PointLight(0x2563EB, 2.5, 500);
  pointLight.position.set(200, 200, 200);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(-100, 200, 100);
  scene.add(dirLight);

  // ── Rotation State ──
  let targetSpeed = 0.001;
  let currentSpeed = 0.001;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener('pointerenter', () => {
    targetSpeed = 0.004;
  });

  canvas.addEventListener('pointerleave', () => {
    targetSpeed = 0.001;
    isDragging = false;
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.style.cursor = 'grabbing';
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener('pointerup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    hexGroup.rotation.y += deltaX * 0.005;
    hexGroup.rotation.x += deltaY * 0.005;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  canvas.style.cursor = 'grab';

  // ── Fade In at 1000ms ──
  canvas.style.opacity = '0';
  canvas.style.transition = 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)';
  setTimeout(() => {
    canvas.style.opacity = '1';
  }, 1000);

  // ── Animation Loop ──
  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      // Lerp speed back toward target over ~60 frames
      currentSpeed += (targetSpeed - currentSpeed) * (1 / 60);
      hexGroup.rotation.y += currentSpeed;
    }

    renderer.render(scene, camera);
  }

  // ── Resize Handler ──
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      canvas.style.display = 'none';
      return;
    }
    canvas.style.display = 'block';
  });

  animate();
});
