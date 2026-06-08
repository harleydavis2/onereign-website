/**
 * OneReign — hero-canvas.js  (V3)
 * Element 1: Hero Particle Field
 *
 * Spec (ONEREIGN_AGENT_PROMPT_V3.md):
 * - Full-viewport WebGL canvas, position fixed behind hero, z-index: 0
 * - 120 nodes: SphereGeometry(0.8), MeshBasicMaterial color #2563EB, opacity 0.5
 * - Nodes drift in 3D with random velocity vectors, speed 0.0003
 * - LineSegments between nodes closer than 150 units: LineBasicMaterial #FAFAFA, opacity 0.06
 * - On mousemove: nearest 15 nodes lerp toward cursor (factor 0.015)
 * - Canvas opacity → 0 as user scrolls past hero height
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // ── Canvas Styling — spec: position fixed, full viewport, z-index 0 ──
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '0';            // spec: 0, not -1
  canvas.style.pointerEvents = 'none';

  // ── Scene ──
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 400;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ── Nodes — spec: SphereGeometry(0.8), #2563EB, opacity 0.5 ──
  const NODE_COUNT = 120;
  const MAX_DIST = 150;
  const SPEED = 0.0003;

  const nodeGeo = new THREE.SphereGeometry(0.8, 6, 6);
  const nodeMat = new THREE.MeshBasicMaterial({
    color: 0x2563EB,
    transparent: true,
    opacity: 0.5
  });

  const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
  nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(nodes);

  const dummy = new THREE.Object3D();

  // Bounds — particles fill 1.5× viewport in world space
  const boundX = window.innerWidth * 0.75;
  const boundY = window.innerHeight * 0.75;
  const boundZ = 300;

  // Particle state
  const positions = [];
  const velocities = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    positions.push(new THREE.Vector3(
      (Math.random() - 0.5) * boundX * 2,
      (Math.random() - 0.5) * boundY * 2,
      (Math.random() - 0.5) * boundZ * 2
    ));

    // spec: speed 0.0003 — scale to world bounds for gentle drift
    velocities.push(new THREE.Vector3(
      (Math.random() - 0.5) * 2 * boundX * SPEED,
      (Math.random() - 0.5) * 2 * boundY * SPEED,
      (Math.random() - 0.5) * 2 * boundZ * SPEED
    ));

    dummy.position.copy(positions[i]);
    dummy.updateMatrix();
    nodes.setMatrixAt(i, dummy.matrix);
  }

  // ── Lines — spec: LineBasicMaterial #FAFAFA, opacity 0.06 ──
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xFAFAFA,
    transparent: true,
    opacity: 0.06
  });

  const maxPairs = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
  const linePositions = new Float32Array(maxPairs * 6);
  const lineGeo = new THREE.BufferGeometry();
  const lineAttr = new THREE.BufferAttribute(linePositions, 3);
  lineAttr.setUsage(THREE.DynamicDrawUsage);
  lineGeo.setAttribute('position', lineAttr);

  const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lineMesh);

  // ── Mouse Interaction ──
  const mouse2D = new THREE.Vector2(-99999, -99999);
  const mouse3D = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  window.addEventListener('pointermove', (e) => {
    mouse2D.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse2D.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse2D, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);
  });

  window.addEventListener('pointerleave', () => {
    mouse2D.set(-99999, -99999);
  });

  // ── Scroll Fade — spec: opacity → 0 as user scrolls past hero height ──
  window.addEventListener('scroll', () => {
    const heroHeight = window.innerHeight;
    const ratio = Math.max(0, Math.min(1, 1 - (window.scrollY / heroHeight)));
    canvas.style.opacity = ratio.toString();
  });

  // ── Animation Loop ──
  function animate() {
    requestAnimationFrame(animate);

    // Find nearest 15 nodes to mouse cursor
    const nearest15 = new Set();
    if (mouse2D.x !== -99999) {
      const dists = positions.map((p, i) => ({ i, d: p.distanceToSquared(mouse3D) }));
      dists.sort((a, b) => a.d - b.d);
      dists.slice(0, 15).forEach(({ i }) => nearest15.add(i));
    }

    let lineIdx = 0;

    for (let i = 0; i < NODE_COUNT; i++) {
      const p = positions[i];
      const v = velocities[i];

      // Drift
      p.add(v);

      // Boundary bounce
      if (p.x >  boundX || p.x < -boundX) v.x *= -1;
      if (p.y >  boundY || p.y < -boundY) v.y *= -1;
      if (p.z >  boundZ || p.z < -boundZ) v.z *= -1;

      // Mouse pull — spec: nearest 15 lerp toward cursor, factor 0.015
      if (nearest15.has(i)) {
        p.lerp(mouse3D, 0.015);
      }

      // Update instanced mesh
      dummy.position.copy(p);
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);

      // Build line segments to closer nodes
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (p.distanceToSquared(positions[j]) < MAX_DIST * MAX_DIST) {
          linePositions[lineIdx++] = p.x;
          linePositions[lineIdx++] = p.y;
          linePositions[lineIdx++] = p.z;
          linePositions[lineIdx++] = positions[j].x;
          linePositions[lineIdx++] = positions[j].y;
          linePositions[lineIdx++] = positions[j].z;
        }
      }
    }

    nodes.instanceMatrix.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx / 3);
    lineGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // ── Resize ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
});
