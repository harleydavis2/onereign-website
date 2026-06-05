/**
 * OneReign — about-mesh.js  (V3)
 * Element 4: About Section Mesh Background
 *
 * Undulating sine-wave wireframe plane behind the About section.
 * - Canvas: full width × height of .about section, position absolute, z-index 0
 * - PlaneGeometry(2000, 800, 40, 20)
 * - Per-frame vertex displacement:
 *     vertex.y = sin(vertex.x * 0.01 + time) * 15
 *              + cos(vertex.z * 0.01 + time * 0.7) * 10
 * - Material: MeshBasicMaterial, blue wireframe, 7% opacity
 * - Camera: PerspectiveCamera tilted down at 45°
 * - time += 0.003 per frame
 *
 * Populated in: Phase 3, Element 4
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('about-canvas');
  const container = canvas ? canvas.closest('.about') : null;
  
  if (!canvas || !container || typeof THREE === 'undefined') return;

  // 1. Setup styling for canvas
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none'; // Don't block text

  // 2. Setup Scene
  const scene = new THREE.Scene();
  
  const rect = container.getBoundingClientRect();
  const camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 3000);
  
  // Position camera so it looks down at 45deg
  camera.position.set(0, 300, 400);
  camera.lookAt(0, 0, -200);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(rect.width, rect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 3. Geometry & Material
  // We'll create the plane and rotate it so it lies flat on XZ plane.
  // In local coords, PlaneGeometry is on XY.
  const geometry = new THREE.PlaneGeometry(2000, 800, 40, 20);
  
  const material = new THREE.MeshBasicMaterial({
    color: 0x2563EB, // --accent-blue
    wireframe: true,
    transparent: true,
    opacity: 0.07
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2; // Flat on the floor
  // Shift it slightly down
  mesh.position.y = -100;
  scene.add(mesh);

  // We need the original positions to calculate displacement cleanly
  const positionAttribute = geometry.getAttribute('position');
  const initialPositions = new Float32Array(positionAttribute.array);

  let time = 0;

  // 4. Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    time += 0.003;

    for (let i = 0; i < positionAttribute.count; i++) {
      // Local coordinates of PlaneGeometry are x and y
      const x = initialPositions[i * 3];
      const y = initialPositions[i * 3 + 1]; 
      
      // Calculate new Z (which points up after rotating the mesh)
      const newZ = Math.sin(x * 0.01 + time) * 15 + Math.cos(y * 0.01 + time * 0.7) * 10;
      
      positionAttribute.setZ(i, newZ);
    }
    
    positionAttribute.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // 5. Intersection Observer to only animate when visible
  let isAnimating = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isAnimating) {
          isAnimating = true;
          animate();
        }
      } else {
        isAnimating = false;
      }
    });
  });
  
  observer.observe(container);

  // 6. Resize handling
  window.addEventListener('resize', () => {
    const newRect = container.getBoundingClientRect();
    if (newRect.width === 0) return;
    
    camera.aspect = newRect.width / newRect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(newRect.width, newRect.height);
  });
});
