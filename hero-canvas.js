/**
 * OneReign — hero-canvas.js  (V3)
 * Element 1: Hero Particle Field
 *
 * Full-viewport WebGL canvas, fixed behind the hero.
 * - 120 drifting nodes (blue spheres, 0.5 opacity)
 * - LineSegments connecting nodes within 150 units (white, 6% opacity)
 * - Mouse pull: nearest 15 nodes lerp toward cursor (factor 0.015)
 * - Fades to opacity 0 as user scrolls past hero height
 *
 * Populated in: Phase 3, Element 1
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Apply fixed background styling directly
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none'; // Let window capture mouse

  const config = {
    particleCount: 120,
    maxDistance: 150,
    mousePullFactor: 0.015,
    colors: {
      nodes: 0x2563EB, // --accent-blue
      lines: 0xFAFAFA  // --text-primary
    }
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 400;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ── Particles Setup ──
  const particles = [];
  const positions = new Float32Array(config.particleCount * 3);

  const nodeGeometry = new THREE.SphereGeometry(2, 8, 8);
  const nodeMaterial = new THREE.MeshBasicMaterial({ 
    color: config.colors.nodes, 
    transparent: true, 
    opacity: 0.5 
  });
  
  const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, config.particleCount);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < config.particleCount; i++) {
    const x = (Math.random() - 0.5) * window.innerWidth * 1.5;
    const y = (Math.random() - 0.5) * window.innerHeight * 1.5;
    const z = (Math.random() - 0.5) * 500;
    
    // Random velocity
    const vx = (Math.random() - 0.5) * 0.5;
    const vy = (Math.random() - 0.5) * 0.5;
    const vz = (Math.random() - 0.5) * 0.5;
    
    particles.push({ 
      current: new THREE.Vector3(x, y, z), 
      v: new THREE.Vector3(vx, vy, vz) 
    });
    
    dummy.position.set(x, y, z);
    dummy.updateMatrix();
    nodes.setMatrixAt(i, dummy.matrix);
  }
  
  nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(nodes);

  // ── Lines Setup ──
  const lineMaterial = new THREE.LineBasicMaterial({
    color: config.colors.lines,
    transparent: true,
    opacity: 0.06
  });
  
  const lineGeometry = new THREE.BufferGeometry();
  const maxLines = (config.particleCount * (config.particleCount - 1)) / 2;
  const linePositions = new Float32Array(maxLines * 6);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  
  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  // ── Mouse Interaction ──
  const mouse = new THREE.Vector2(-9999, -9999);
  const mouse3D = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  
  window.addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);
  });

  // Reset mouse on leave so nodes don't bunch up in the corner
  window.addEventListener('pointerleave', () => {
    mouse.set(-9999, -9999);
  });

  // ── Scroll Fade ──
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const fadeHeight = window.innerHeight;
    let opacity = 1 - (scrollY / fadeHeight);
    canvas.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
  });

  // ── Animation Loop ──
  function animate() {
    requestAnimationFrame(animate);
    
    let lineIndex = 0;
    
    // Find nearest 15 nodes to mouse
    let nearest15 = new Set();
    if (mouse.x !== -9999) {
      const distances = particles.map((p, index) => ({
        index,
        distSq: p.current.distanceToSquared(mouse3D)
      }));
      distances.sort((a, b) => a.distSq - b.distSq);
      nearest15 = new Set(distances.slice(0, 15).map(d => d.index));
    }

    const boundX = window.innerWidth * 0.8;
    const boundY = window.innerHeight * 0.8;

    for (let i = 0; i < config.particleCount; i++) {
      const p = particles[i];
      
      p.current.add(p.v);
      
      // Soft boundary bounce
      if (p.current.x > boundX || p.current.x < -boundX) p.v.x *= -1;
      if (p.current.y > boundY || p.current.y < -boundY) p.v.y *= -1;
      if (p.current.z > 250 || p.current.z < -250) p.v.z *= -1;

      // Mouse Pull
      if (nearest15.has(i)) {
        p.current.lerp(mouse3D, config.mousePullFactor);
      }

      dummy.position.copy(p.current);
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);
      
      // Calculate connecting lines
      for (let j = i + 1; j < config.particleCount; j++) {
        const p2 = particles[j];
        const distSq = p.current.distanceToSquared(p2.current);
        
        if (distSq < config.maxDistance * config.maxDistance) {
          linePositions[lineIndex++] = p.current.x;
          linePositions[lineIndex++] = p.current.y;
          linePositions[lineIndex++] = p.current.z;
          linePositions[lineIndex++] = p2.current.x;
          linePositions[lineIndex++] = p2.current.y;
          linePositions[lineIndex++] = p2.current.z;
        }
      }
    }
    
    nodes.instanceMatrix.needsUpdate = true;
    
    lineGeometry.setDrawRange(0, lineIndex / 3);
    lineGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // ── Resize Handler ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
});
