import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Eye, RotateCcw, Monitor, Laptop, Layers, Sun, Moon, Maximize2, Minimize2 } from 'lucide-react';

interface ThreeCanvasProps {
  onInteraction?: () => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<'overview' | 'monitor' | 'laptop' | 'architecture'>('overview');
  const [themeMode, setThemeMode] = useState<'day' | 'night'>('day');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // References for animation and control updates
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    keyLight: THREE.DirectionalLight;
    hemiLight: THREE.HemisphereLight;
    codeTexture?: THREE.CanvasTexture;
    terminalTexture?: THREE.CanvasTexture;
    laptopLidGroup?: THREE.Group;
    floatingCubes?: THREE.Group;
    laptopGroup?: THREE.Group;
    monitorGroup?: THREE.Group;
    deskGroup?: THREE.Group;
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    isTransitioning: boolean;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Renderer Setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Scene and Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Deep modern navy slate
    scene.fog = new THREE.FogExp2(0x0f172a, 0.05);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(2.8, 2.4, 4.2);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going beneath floor
    controls.minDistance = 1.8;
    controls.maxDistance = 8.0;
    controls.target.set(0, 0.9, 0);
    controls.update();

    // 5. Studio Environment Map (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 6. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    keyLight.position.set(4, 6, 3);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 1.2);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.4);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // 7. Ground Floor & Contact Shadow
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.85,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = !isSoftwareGl;
    scene.add(floor);

    // Procedural Contact Shadow Canvas
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const gradient = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = gradient;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const contactShadowGeo = new THREE.PlaneGeometry(3.6, 2.2);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, 0.01, 0);
    scene.add(contactShadow);

    // 8. Procedural Code Matrix Screen Texture
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024;
    codeCanvas.height = 576;
    const cCtx = codeCanvas.getContext('2d')!;

    function drawCodeScreen() {
      cCtx.fillStyle = '#090d16';
      cCtx.fillRect(0, 0, 1024, 576);

      // Top IDE Tab bar
      cCtx.fillStyle = '#141c2e';
      cCtx.fillRect(0, 0, 1024, 44);

      // Window controls
      cCtx.fillStyle = '#f87171';
      cCtx.beginPath();
      cCtx.arc(24, 22, 6, 0, Math.PI * 2);
      cCtx.fill();
      cCtx.fillStyle = '#fbbf24';
      cCtx.beginPath();
      cCtx.arc(44, 22, 6, 0, Math.PI * 2);
      cCtx.fill();
      cCtx.fillStyle = '#34d399';
      cCtx.beginPath();
      cCtx.arc(64, 22, 6, 0, Math.PI * 2);
      cCtx.fill();

      // Tab text
      cCtx.font = '14px "Space Grotesk", monospace';
      cCtx.fillStyle = '#94a3b8';
      cCtx.fillText('PortfolioStack.tsx — Janvi Raj', 100, 26);

      // Code lines
      cCtx.font = '15px "Space Grotesk", monospace';
      const lines = [
        { text: '// Janvi Raj - Full Stack Web Developer Architecture', color: '#64748b' },
        { text: 'import { FullStackEngineer, ReactJS, NodeJS, MongoDB } from "@janviraj/core";', color: '#a78bfa' },
        { text: '', color: '' },
        { text: 'export const developerProfile: FullStackEngineer = {', color: '#60a5fa' },
        { text: '  name: "Janvi Raj",', color: '#38bdf8' },
        { text: '  education: "Bachelor of Computer Applications (BCA)",', color: '#f472b6' },
        { text: '  college: "Devki Devi Jain College, Ludhiana (Panjab University)",', color: '#f472b6' },
        { text: '  academicScores: { percentage: "79%", cgpa: 8.3 },', color: '#fbbf24' },
        { text: '  coreExpertise: ["Full Stack Development", "MERN Stack", "Vibe Coding", "AI Prompting"],', color: '#34d399' },
        { text: '  featuredProjects: [', color: '#a78bfa' },
        { text: '    { name: "Airbnb-Inspired Web App", stack: ["Node", "Express", "MongoDB", "EJS"] },', color: '#38bdf8' },
        { text: '    { name: "Travel Website", stack: ["Full Stack Web Platform"] },', color: '#38bdf8' },
        { text: '    { name: "Mini Projects", stack: ["JavaScript", "Modern UI", "APIs"] }', color: '#38bdf8' },
        { text: '  ],', color: '#60a5fa' },
        { text: '  status: "Available for Full Stack Opportunities",', color: '#4ade80' },
        { text: '  passion: "Transforming ideas into performant digital experiences."', color: '#cbd5e1' },
        { text: '};', color: '#60a5fa' },
      ];

      lines.forEach((line, idx) => {
        if (!line.text) return;
        cCtx.fillStyle = '#475569';
        cCtx.fillText(String(idx + 1).padStart(2, '0'), 24, 76 + idx * 28);
        cCtx.fillStyle = line.color;
        cCtx.fillText(line.text, 64, 76 + idx * 28);
      });
    }
    drawCodeScreen();

    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    codeTexture.colorSpace = THREE.SRGBColorSpace;
    codeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 9. Laptop Screen Texture
    const laptopCanvas = document.createElement('canvas');
    laptopCanvas.width = 512;
    laptopCanvas.height = 320;
    const lCtx = laptopCanvas.getContext('2d')!;
    lCtx.fillStyle = '#0f172a';
    lCtx.fillRect(0, 0, 512, 320);

    // Terminal header
    lCtx.fillStyle = '#1e293b';
    lCtx.fillRect(0, 0, 512, 28);
    lCtx.font = '12px "Space Grotesk", monospace';
    lCtx.fillStyle = '#a78bfa';
    lCtx.fillText('terminal — bash ~ npm run build:success', 20, 18);

    // Terminal lines
    lCtx.font = '13px "Space Grotesk", monospace';
    const termLines = [
      { t: '$ node server.js --env=production', c: '#93c5fd' },
      { t: '[MongoDB] Connected successfully to cluster', c: '#4ade80' },
      { t: '[Express] REST API live on port :5000', c: '#38bdf8' },
      { t: '[Vite] Production bundle built in 420ms', c: '#a78bfa' },
      { t: 'Ready for client requests | 0 errors', c: '#34d399' },
      { t: 'Janvi Raj Portfolio loaded successfully ✓', c: '#fbcfe8' }
    ];
    termLines.forEach((l, i) => {
      lCtx.fillStyle = l.c;
      lCtx.fillText(l.t, 18, 56 + i * 26);
    });

    const laptopTexture = new THREE.CanvasTexture(laptopCanvas);
    laptopTexture.colorSpace = THREE.SRGBColorSpace;
    laptopTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 10. COMPOSITE PROCEDURAL 3D MODELS (Group of 3-12 parts)
    const deskGroup = new THREE.Group();
    const monitorGroup = new THREE.Group();
    const laptopGroup = new THREE.Group();
    const laptopLidGroup = new THREE.Group();
    const accessoriesGroup = new THREE.Group();
    const floatingCubes = new THREE.Group();

    // -- A. Desk Table Setup --
    // Desktop surface
    const deskTopGeo = new THREE.BoxGeometry(2.8, 0.08, 1.4);
    const deskTopMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.15,
    });
    const deskTop = new THREE.Mesh(deskTopGeo, deskTopMat);
    deskTop.position.set(0, 0.72, 0);
    deskTop.castShadow = !isSoftwareGl;
    deskTop.receiveShadow = !isSoftwareGl;
    deskGroup.add(deskTop);

    // Desk Legs (4 legs)
    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 16);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.7,
    });
    const legPositions = [
      [-1.3, 0.36, -0.6],
      [1.3, 0.36, -0.6],
      [-1.3, 0.36, 0.6],
      [1.3, 0.36, 0.6],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = !isSoftwareGl;
      deskGroup.add(leg);
    });

    // Desk Mat
    const matGeo = new THREE.BoxGeometry(1.6, 0.005, 0.8);
    const deskMatMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.9,
      metalness: 0.05,
    });
    const deskMat = new THREE.Mesh(matGeo, deskMatMat);
    deskMat.position.set(0, 0.765, 0.08);
    deskMat.receiveShadow = !isSoftwareGl;
    deskGroup.add(deskMat);

    scene.add(deskGroup);

    // -- B. Main Monitor (Beveled Frame, Stand, Bezel, Procedural Screen) --
    // Stand Base
    const standBaseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.02, 32);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.25,
      metalness: 0.85,
    });
    const standBase = new THREE.Mesh(standBaseGeo, metalMat);
    standBase.position.set(0, 0.77, -0.28);
    standBase.castShadow = !isSoftwareGl;
    monitorGroup.add(standBase);

    // Stand Neck
    const standNeckGeo = new THREE.BoxGeometry(0.06, 0.38, 0.04);
    const standNeck = new THREE.Mesh(standNeckGeo, metalMat);
    standNeck.position.set(0, 0.96, -0.29);
    standNeck.castShadow = !isSoftwareGl;
    monitorGroup.add(standNeck);

    // Screen Housing
    const monitorBackGeo = new THREE.BoxGeometry(1.5, 0.88, 0.04);
    const monitorBackMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.35,
      metalness: 0.4,
    });
    const monitorBack = new THREE.Mesh(monitorBackGeo, monitorBackMat);
    monitorBack.position.set(0, 1.25, -0.26);
    monitorBack.castShadow = !isSoftwareGl;
    monitorGroup.add(monitorBack);

    // Screen Display Surface
    const screenGeo = new THREE.PlaneGeometry(1.44, 0.82);
    const screenMat = new THREE.MeshStandardMaterial({
      map: codeTexture,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0x475569,
      emissiveMap: codeTexture,
      emissiveIntensity: 0.45,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.25, -0.238);
    monitorGroup.add(screenMesh);

    scene.add(monitorGroup);

    // -- C. Modern Laptop (Base, Keyboard, Hinged Screen) --
    // Laptop Base
    const laptopBaseGeo = new THREE.BoxGeometry(0.48, 0.018, 0.34);
    const laptopMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.25,
      metalness: 0.8,
    });
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
    laptopBase.position.set(-0.62, 0.772, 0.16);
    laptopBase.rotation.y = 0.22;
    laptopBase.castShadow = !isSoftwareGl;
    laptopGroup.add(laptopBase);

    // Trackpad
    const trackpadGeo = new THREE.PlaneGeometry(0.12, 0.08);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.4,
      metalness: 0.3,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.rotation.z = 0.22;
    trackpad.position.set(-0.62, 0.782, 0.26);
    laptopGroup.add(trackpad);

    // Laptop Lid (Pivot at back of laptop base)
    const laptopLidGeo = new THREE.BoxGeometry(0.48, 0.32, 0.012);
    const laptopLid = new THREE.Mesh(laptopLidGeo, laptopMat);
    laptopLid.position.set(0, 0.155, 0);

    const laptopScreenGeo = new THREE.PlaneGeometry(0.46, 0.29);
    const laptopScreenMat = new THREE.MeshStandardMaterial({
      map: laptopTexture,
      roughness: 0.2,
      emissive: 0x3b82f6,
      emissiveMap: laptopTexture,
      emissiveIntensity: 0.5,
    });
    const laptopScreen = new THREE.Mesh(laptopScreenGeo, laptopScreenMat);
    laptopScreen.position.set(0, 0.155, 0.007);
    laptopScreen.rotation.y = Math.PI; // Face forwards

    laptopLidGroup.add(laptopLid);
    laptopLidGroup.add(laptopScreen);
    laptopLidGroup.position.set(-0.65, 0.78, 0.01);
    laptopLidGroup.rotation.y = 0.22;
    laptopLidGroup.rotation.x = -0.3; // Open at ~105 deg

    laptopGroup.add(laptopLidGroup);
    scene.add(laptopGroup);

    // -- D. Keyboard & Wireless Mouse on Desk Mat --
    const kbGeo = new THREE.BoxGeometry(0.42, 0.012, 0.14);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
      metalness: 0.3,
    });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.position.set(0.08, 0.772, 0.14);
    kb.castShadow = !isSoftwareGl;
    accessoriesGroup.add(kb);

    const mouseGeo = new THREE.CapsuleGeometry(0.035, 0.05, 8, 16);
    const mouseMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.3,
      metalness: 0.5,
    });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.rotation.x = Math.PI / 2;
    mouse.position.set(0.48, 0.778, 0.14);
    mouse.castShadow = !isSoftwareGl;
    accessoriesGroup.add(mouse);

    // -- E. Ceramic Coffee Mug --
    const mugGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.09, 24);
    const mugMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.15,
      metalness: 0.05,
    });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(0.68, 0.81, -0.05);
    mug.castShadow = !isSoftwareGl;

    // Mug handle (Torus)
    const handleGeo = new THREE.TorusGeometry(0.026, 0.008, 12, 24, Math.PI);
    const handle = new THREE.Mesh(handleGeo, mugMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0.725, 0.81, -0.05);
    accessoriesGroup.add(mug);
    accessoriesGroup.add(handle);

    // Coffee liquid inside
    const coffeeGeo = new THREE.CircleGeometry(0.042, 24);
    const coffeeMat = new THREE.MeshStandardMaterial({
      color: 0x3e2723,
      roughness: 0.1,
    });
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.set(0.68, 0.845, -0.05);
    accessoriesGroup.add(coffee);

    // -- F. Succulent Plant in Modern Pot --
    const potGeo = new THREE.CylinderGeometry(0.065, 0.05, 0.1, 8); // Faceted pot
    const potMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.6,
      metalness: 0.1,
    });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(-1.0, 0.81, -0.22);
    pot.castShadow = !isSoftwareGl;
    accessoriesGroup.add(pot);

    // Succulent leaves
    const leafGeo = new THREE.ConeGeometry(0.025, 0.08, 6);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4,
    });
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(-1.0 + Math.cos(angle) * 0.03, 0.87, -0.22 + Math.sin(angle) * 0.03);
      leaf.rotation.x = Math.sin(angle) * 0.4;
      leaf.rotation.z = -Math.cos(angle) * 0.4;
      accessoriesGroup.add(leaf);
    }

    scene.add(accessoriesGroup);

    // -- G. Floating Architectural Tech Blocks --
    const cubeData = [
      { color: 0x61dafb, label: 'React', offset: [-1.2, 1.45, 0.3], size: 0.12 },
      { color: 0x68a063, label: 'Node', offset: [1.2, 1.55, 0.2], size: 0.13 },
      { color: 0x47a248, label: 'MongoDB', offset: [1.0, 1.25, -0.4], size: 0.11 },
      { color: 0xa855f7, label: 'Vibe AI', offset: [-0.95, 1.7, -0.3], size: 0.12 }
    ];

    cubeData.forEach((d) => {
      const cGeo = new THREE.BoxGeometry(d.size, d.size, d.size);
      const cMat = new THREE.MeshPhysicalMaterial({
        color: d.color,
        roughness: 0.2,
        metalness: 0.3,
        transmission: isSoftwareGl ? 0 : 0.4,
        transparent: true,
        opacity: 0.9,
      });
      const cubeMesh = new THREE.Mesh(cGeo, cMat);
      cubeMesh.position.set(d.offset[0], d.offset[1], d.offset[2]);
      cubeMesh.castShadow = !isSoftwareGl;
      floatingCubes.add(cubeMesh);
    });

    scene.add(floatingCubes);

    // Save references for runtime manipulation
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      keyLight,
      hemiLight,
      codeTexture,
      terminalTexture: laptopTexture,
      laptopLidGroup,
      floatingCubes,
      laptopGroup,
      monitorGroup,
      deskGroup,
      targetCamPos: new THREE.Vector3(2.8, 2.4, 4.2),
      targetLookAt: new THREE.Vector3(0, 0.9, 0),
      isTransitioning: false,
    };

    // 11. Animation Loop with Software WebGL Guard & Frame Synchronization
    let animationFrameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      if (!sync) {
        animationFrameId = window.setTimeout(cb, 50);
        return;
      }
      const poll = () => {
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animationFrameId = window.setTimeout(poll, 6);
        } else {
          gl.deleteSync(sync);
          animationFrameId = window.setTimeout(cb, 60);
        }
      };
      animationFrameId = window.setTimeout(poll, 6);
    }

    function renderLoop() {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animations for tech cubes
      floatingCubes.children.forEach((child, idx) => {
        child.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.0008;
        child.rotation.x += 0.005;
        child.rotation.y += 0.007;
      });

      // Smooth camera interpolation if transitioning
      if (sceneRef.current && sceneRef.current.isTransitioning) {
        camera.position.lerp(sceneRef.current.targetCamPos, 0.05);
        controls.target.lerp(sceneRef.current.targetLookAt, 0.05);
        if (
          camera.position.distanceTo(sceneRef.current.targetCamPos) < 0.02 &&
          controls.target.distanceTo(sceneRef.current.targetLookAt) < 0.02
        ) {
          sceneRef.current.isTransitioning = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(renderLoop);
      } else {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    }

    renderLoop();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Preset Camera Transitions
  const applyPreset = (preset: 'overview' | 'monitor' | 'laptop' | 'architecture') => {
    setActivePreset(preset);
    const ref = sceneRef.current;
    if (!ref) return;

    ref.isTransitioning = true;
    if (preset === 'overview') {
      ref.targetCamPos.set(2.8, 2.4, 4.2);
      ref.targetLookAt.set(0, 0.9, 0);
    } else if (preset === 'monitor') {
      ref.targetCamPos.set(0, 1.35, 1.4);
      ref.targetLookAt.set(0, 1.25, -0.24);
    } else if (preset === 'laptop') {
      ref.targetCamPos.set(-0.65, 1.1, 0.9);
      ref.targetLookAt.set(-0.62, 0.88, 0.16);
    } else if (preset === 'architecture') {
      ref.targetCamPos.set(3.4, 3.8, 2.6);
      ref.targetLookAt.set(0, 0.8, 0);
    }
  };

  // Exploded View Separation
  const toggleExploded = () => {
    const next = !isExploded;
    setIsExploded(next);
    const ref = sceneRef.current;
    if (!ref) return;

    if (next) {
      ref.monitorGroup?.position.set(0, 0.45, -0.2);
      ref.laptopGroup?.position.set(-0.35, 0.35, 0.2);
      ref.floatingCubes?.position.set(0, 0.6, 0);
    } else {
      ref.monitorGroup?.position.set(0, 0, 0);
      ref.laptopGroup?.position.set(0, 0, 0);
      ref.floatingCubes?.position.set(0, 0, 0);
    }
  };

  // Day / Night Theme Toggle for 3D Lighting
  const toggleTheme = () => {
    const next = themeMode === 'day' ? 'night' : 'day';
    setThemeMode(next);
    const ref = sceneRef.current;
    if (!ref) return;

    if (next === 'night') {
      ref.scene.background = new THREE.Color(0x050811);
      ref.keyLight.color.setHex(0x6366f1);
      ref.keyLight.intensity = 1.6;
      ref.hemiLight.color.setHex(0x4338ca);
      ref.hemiLight.intensity = 0.8;
    } else {
      ref.scene.background = new THREE.Color(0x0f172a);
      ref.keyLight.color.setHex(0xfff8ee);
      ref.keyLight.intensity = 3.2;
      ref.hemiLight.color.setHex(0x93c5fd);
      ref.hemiLight.intensity = 1.2;
    }
  };

  const resetView = () => {
    applyPreset('overview');
  };

  return (
    <div className="relative w-full h-[540px] md:h-[620px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={() => setIsInteracting(true)}
        onMouseUp={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
      />

      {/* Top Left Spec Badge - Clean & Static (Zero pulsating dots per guidelines) */}
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-lg pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold text-slate-200 tracking-wide font-mono">
          3D WORKSPACE LAB // THREE.JS PBR
        </span>
      </div>

      {/* Top Right Quick Hint */}
      <div className="absolute top-5 right-5 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-[11px] text-slate-400 font-medium pointer-events-none">
        <span>Click & drag to rotate • Scroll to zoom</span>
      </div>

      {/* Collapse / Expand Toggle Button for Bottom Dock */}
      <div className="absolute bottom-[72px] sm:bottom-[84px] left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/95 border border-slate-700/70 text-slate-300 hover:text-white text-xs font-medium shadow-md transition-all hover:border-slate-500 cursor-pointer"
          title={isCollapsed ? 'Expand 3D Controls' : 'Collapse for Clean View'}
        >
          {isCollapsed ? (
            <>
              <Maximize2 className="w-3 h-3 text-indigo-400" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3 h-3 text-indigo-400" />
              <span>Hide Controls</span>
            </>
          )}
        </button>
      </div>

      {/* Unified Ergonomic Bottom Control Dock (Pinned bottom-center per Three.js Skill guidelines) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-[820px] transition-all duration-300 ease-in-out ${
          isCollapsed ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl">
          {/* Camera View Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden md:inline mr-1">
              Views:
            </span>
            <button
              onClick={() => applyPreset('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activePreset === 'overview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => applyPreset('monitor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activePreset === 'monitor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>IDE Screen</span>
            </button>
            <button
              onClick={() => applyPreset('laptop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activePreset === 'laptop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Terminal</span>
            </button>
            <button
              onClick={() => applyPreset('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activePreset === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Isometric</span>
            </button>
          </div>

          {/* Feature Actions (Exploded View, Day/Night, Reset) */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleExploded}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                isExploded
                  ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title="Explode components to see procedural layers"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Explode</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Toggle Lighting Mode"
            >
              {themeMode === 'day' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Night Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Day Mode</span>
                </>
              )}
            </button>

            <button
              onClick={resetView}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Reset Camera"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
