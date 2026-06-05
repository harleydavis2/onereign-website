/**
 * OneReign — hero-hex.js  (V3)
 * Element 2: Hero Hex Geometry
 *
 * Interactive 3D polyhedron in the right column of the hero.
 * - IcosahedronGeometry(120, 1), metallic MeshStandardMaterial
 * - Wireframe overlay: blue, 15% opacity
 * - Lighting: blue PointLight + AmbientLight + DirectionalLight
 * - Default rotation: y += 0.001/frame
 * - Pointer enter: speed → 0.004; leave: lerp back over 60 frames
 * - Manual drag rotation via pointerdown/move/up
 * - Fades in at 1000ms after page load
 * - Hidden on mobile (< 768px)
 *
 * Populated in: Phase 3, Element 2
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-hex-canvas');
  const container = canvas ? canvas.parentElement : null;
  
  if (!canvas || !container || typeof THREE === 'undefined') return;

  // 1. Init Setup
  const scene = new THREE.Scene();
  
  // Use container dimensions for camera
  const { width, height } = container.getBoundingClientRect();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 400;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Hide on mobile initially if needed, handled via CSS typically, but we can do a check
  if (window.innerWidth < 768) {
    container.style.display = 'none';
  }

  // 2. Geometry & Materials
  const geometry = new THREE.IcosahedronGeometry(120, 1);
  
  // Solid metallic inner
  const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.9
  });
  const solidMesh = new THREE.Mesh(geometry, solidMaterial);

  // Wireframe outer
  const wireGeometry = new THREE.IcosahedronGeometry(121, 1); // slightly larger
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x2563EB, // --accent-blue
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);

  // Group them
  const hexGroup = new THREE.Group();
  hexGroup.add(solidMesh);
  hexGroup.add(wireMesh);
  scene.add(hexGroup);

  // 3. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(200, 500, 300);
  scene.add(dirLight);

  const blueLight = new THREE.PointLight(0x2563EB, 3, 600);
  blueLight.position.set(-200, -100, 200);
  scene.add(blueLight);

  // 4. Interaction State
  let baseRotationSpeed = 0.001;
  let targetRotationSpeed = 0.001;
  let currentRotationSpeed = 0.001;
  
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  
  // Pointer enter/leave for speed
  canvas.addEventListener('pointerenter', () => {
    targetRotationSpeed = 0.004;
  });
  
  canvas.addEventListener('pointerleave', () => {
    targetRotationSpeed = 0.001;
    isDragging = false;
  });

  // Drag interaction
  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });

  canvas.style.cursor = 'grab';

  canvas.addEventListener('pointermove', (e) => {
    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      // Apply rotation based on drag
      hexGroup.rotation.y += deltaMove.x * 0.005;
      hexGroup.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  // 5. Fade In 
  canvas.style.opacity = '0';
  canvas.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)';
  
  setTimeout(() => {
    canvas.style.opacity = '1';
  }, 1000);

  // 6. Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      // Lerp speed
      currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * 0.05;
      hexGroup.rotation.y += currentRotationSpeed;
      // Slight tilt for dynamic feel
      hexGroup.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
    }

    renderer.render(scene, camera);
  }

  // 7. Resize handling
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      container.style.display = 'none';
      return;
    } else {
      container.style.display = 'block';
    }

    const newRect = container.getBoundingClientRect();
    if (newRect.width === 0) return; // Prevent errors if hidden
    
    camera.aspect = newRect.width / newRect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(newRect.width, newRect.height);
  });

  animate();
});
