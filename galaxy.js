/* ==========================================================================
   AAYUSH'S UNIVERSE — ULTRA-VIBRANT 3D SOLAR SYSTEM & MEMORY PLANETS
   Features:
   - High-Luminance Planets with Glowing Emissive Surfaces & Camera Headlight
   - 3D Floating Planet Name Badges & Pulsing Ground Target Rings
   - 12,000+ Stars, Galactic Spiral Nebula, 3D Asteroid Belt, Shooting Comets
   - Dynamic Cloud Layers, Saturn Rings with Cassini Division, Orbiting Moons
   - Seamless Persistent Audio Controller (Automatic Resume)
   - First Meet Feature Photo: embedded_1.jpg
   ========================================================================== */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- DATA: 7 MEMORY PLANETS WITH PHOTOS & EMOTIONAL NARRATIVES ---
const PLANET_DATA = [
  {
    id: 'childhood',
    indexStr: 'PLANET 01',
    name: 'Planet of Little Beginnings',
    tagline: '"Before I knew you, before our paths crossed..."',
    color: '#f6ad55',
    colorHex: 0xf6ad55,
    emissiveHex: 0xd69e2e,
    radius: 2.3,
    orbitRadius: 18,
    orbitSpeed: 0.007,
    hasRings: false,
    hasClouds: true,
    hasMoons: false,
    photos: [
      { src: 'images/childhood/childhood-1.jpeg', caption: 'Little Aayush with those bright, innocent eyes' },
      { src: 'images/childhood/childhood-2.jpeg', caption: 'The gentle smile that never changed' },
      { src: 'images/childhood/childhood-3.jpeg', caption: 'Growing up into the sweetest soul' },
      { src: 'images/childhood/childhood-4.jpeg', caption: 'Baby cheeks and limitless curiosity' }
    ],
    narrative: `Somewhere in those little eyes was an entire world waiting to unfold. The same soft heart, the little gentle smile, the soul who grew up to become the most comforting presence in my life. Little Aayush had no idea how much warmth, quiet courage, and genuine kindness he would bring to everyone around him years later. Seeing you grow through these pictures makes me wish I could tell your younger self: you turn out to be someone truly extraordinary.`,
    quote: '— To the boy whose kindness was written in the stars from day one.'
  },
  {
    id: 'calm',
    indexStr: 'PLANET 02',
    name: 'Planet of Pure Calm',
    tagline: '"You have never once raised your voice. Not once."',
    color: '#38b2ac',
    colorHex: 0x38b2ac,
    emissiveHex: 0x2c7a7b,
    radius: 2.7,
    orbitRadius: 29,
    orbitSpeed: 0.0055,
    hasRings: false,
    hasClouds: true,
    hasMoons: false,
    photos: [
      { src: 'images/solo/solo-1.jpeg', caption: 'Peace in a person' },
      { src: 'images/solo/solo-2.jpeg', caption: 'The face that calms every storm' },
      { src: 'images/embedded/embedded_2.jpg', caption: 'Quiet strength and gentle eyes' }
    ],
    narrative: `In a world that is always so loud, so rushed, and so quick to react, you are my sanctuary. In all this time, you have never once raised your voice at me. Not out of anger, not out of frustration, not even when days were hard. When my mind feels like a hurricane, just talking to you feels like sitting by a calm sea under the evening breeze. That patience is your superpower, Aayush.`,
    quote: '— My quiet harbor in every storm.'
  },
  {
    id: 'chaos',
    indexStr: 'PLANET 03',
    name: 'Planet of Chaos & Laughter',
    tagline: '"Exhibit A of utter silliness and unhinged joy"',
    color: '#b794f4',
    colorHex: 0xb794f4,
    emissiveHex: 0x805ad5,
    radius: 3.2,
    orbitRadius: 41,
    orbitSpeed: 0.0042,
    hasRings: true,
    ringInner: 4.4,
    ringOuter: 6.2,
    ringColor: 0x9f7aea,
    hasClouds: false,
    hasMoons: false,
    photos: [
      { src: 'images/solo/solo-3.jpeg', caption: 'Goofy face mode: activated' },
      { src: 'images/solo/solo-4.jpeg', caption: '100% unhinged and completely proud' },
      { src: 'images/solo/solo-5.jpeg', caption: 'When you try to be serious for 2 seconds' },
      { src: 'images/embedded/embedded_3.jpg', caption: 'The face that makes me laugh every time' }
    ],
    narrative: `For someone so calm and collected, you have this delightfully chaotic side that makes me laugh until my cheeks hurt. The random funny faces, the goofy expressions when you think no one is watching, the weird noises and silly jokes. Life with you is never dull. Thank you for never taking yourself too seriously and for giving me countless memories that make me smile out of nowhere on random afternoons.`,
    quote: '— Life is simply 1000x brighter with your chaos.'
  },
  {
    id: 'firstmeet',
    indexStr: 'PLANET 04',
    name: 'Planet of Serendipity',
    tagline: '"Black shirt, beige cargos, and chips in exam week"',
    color: '#fbd38d',
    colorHex: 0xfbd38d,
    emissiveHex: 0xdd6b20,
    radius: 2.9,
    orbitRadius: 55,
    orbitSpeed: 0.0034,
    hasRings: true,
    ringInner: 4.0,
    ringOuter: 5.4,
    ringColor: 0xf6ad55,
    hasClouds: true,
    hasMoons: false,
    photos: [
      { src: 'images/embedded/embedded_1.jpg', caption: 'The day our story began — First Meet' },
      { src: 'images/together/together-chips.jpeg', caption: 'The chips he bought when I ate nothing in exams' },
      { src: 'images/together/together-1.jpeg', caption: 'Our earliest frames together' },
      { src: 'images/together/together-2.jpeg', caption: 'Little beginnings that felt like home' },
      { src: 'images/embedded/embedded_4.jpg', caption: 'A memory locked forever in my heart' }
    ],
    narrative: `I still remember the first day clearly — you in your black shirt and beige cargos, standing there with that polite, quiet demeanor. And remember that stressful exam day when I was starving and hadn't eaten a single bite? You noticed. You didn't announce it, you just showed up with chips so I wouldn't faint. Those little acts of quiet care that you do without expecting anything in return... that's when I knew who you truly are.`,
    quote: '— It’s always the quiet gestures that leave the loudest echoes.'
  },
  {
    id: 'us',
    indexStr: 'PLANET 05',
    name: 'Planet of Us',
    tagline: '"Our little universe inside this giant cosmos"',
    color: '#ed64a6',
    colorHex: 0xed64a6,
    emissiveHex: 0xb83280,
    radius: 3.7,
    orbitRadius: 71,
    orbitSpeed: 0.0026,
    hasRings: false,
    hasClouds: true,
    hasMoons: true,
    moonRadius: 0.7,
    moonDist: 5.8,
    moonSpeed: 0.03,
    photos: [
      { src: 'images/together/together-3.jpeg', caption: 'Walking side by side, always' },
      { src: 'images/together/together-4.jpeg', caption: 'Your shoulder is my safest place' },
      { src: 'images/together/together-5.jpeg', caption: 'Shared secrets and silly smiles' },
      { src: 'images/together/together-6.jpeg', caption: 'Every picture tells our story' },
      { src: 'images/embedded/embedded_5.jpg', caption: 'Comfort in its purest form' },
      { src: 'images/embedded/embedded_6.jpg', caption: 'Sunlight and shared moments' }
    ],
    narrative: `Somewhere along the way, between college corridors, quick coffee runs, long shared glances, and conversations that stretched until the stars came out, you became my favorite person. You became the first person I want to tell good news to, and the only person I want near me when everything feels heavy. We have built our own little world, full of inside jokes, unspoken comfort, and pure warmth.`,
    quote: '— In every parallel universe, I’d still look for you.'
  },
  {
    id: 'okhla',
    indexStr: 'PLANET 06',
    name: 'Planet of Golden Evenings',
    tagline: '"Under twilight skies, by the water, just you and me"',
    color: '#ed8936',
    colorHex: 0xed8936,
    emissiveHex: 0xc05621,
    radius: 3.5,
    orbitRadius: 88,
    orbitSpeed: 0.0020,
    hasRings: true,
    ringInner: 5.0,
    ringOuter: 7.2,
    ringColor: 0xdd6b20,
    hasClouds: false,
    hasMoons: false,
    photos: [
      { src: 'images/together/together-7.jpeg', caption: 'Sunset hues at Okhla' },
      { src: 'images/together/together-8.jpeg', caption: 'The golden hour that stood still' },
      { src: 'images/together/together-10.jpeg', caption: 'Watching the twilight together' },
      { src: 'images/embedded/embedded_7.jpg', caption: 'Soft breeze and golden glow' },
      { src: 'images/embedded/embedded_8.jpg', caption: 'A memory etched in sunset colors' }
    ],
    narrative: `That evening at Okhla bird sanctuary is etched permanently in my mind. Walking along the trails, the sun dipping behind the trees, painting the sky in deep amber and violet. The cool breeze off the water, and that silence between us that felt completely full and peaceful. We didn't need grand gestures or constant words — just walking next to you was more than enough. One of my happiest, simplest memories.`,
    quote: '— You are my golden hour, no matter what time of day.'
  },
  {
    id: 'forever',
    indexStr: 'PLANET 07',
    name: 'Planet of Infinite Wishes',
    tagline: '"To the boy who deserves the entire cosmos and more"',
    color: '#63b3ed',
    colorHex: 0x63b3ed,
    emissiveHex: 0x2b6cb0,
    radius: 4.1,
    orbitRadius: 106,
    orbitSpeed: 0.0015,
    hasRings: true,
    ringInner: 5.6,
    ringOuter: 8.5,
    ringColor: 0x4299e1,
    hasClouds: true,
    hasMoons: true,
    moonRadius: 0.8,
    moonDist: 6.6,
    moonSpeed: 0.024,
    photos: [
      { src: 'images/together/together-11.jpeg', caption: 'To many more years of us' },
      { src: 'images/together/together-12.jpeg', caption: 'Laughter that never fades' },
      { src: 'images/together/together-13.jpeg', caption: 'Happy Birthday, my cutie Aayush' },
      { src: 'images/embedded/embedded_9.jpg', caption: 'Forever and always' }
    ],
    narrative: `Happy Birthday, Aayush! 🎂✨ May this year bring you the quiet peace you give to others, the deep happiness you deserve, and all the success your brilliant mind works toward. Thank you for being my constant rock, my favorite smile, and the sweetest part of my life. If I could give you the whole galaxy, I would wrapped in a ribbon. But for now, here is our little universe in 3D. Happy Birthday, always and forever.`,
    quote: '— Happy Birthday, Aayush. You are so deeply loved.'
  }
];

// --- SOUND SYNTHESIS FOR CELESTIAL CHIMES ---
class CosmicAudioSynth {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }
  playChime(freq = 587.33, duration = 1.2) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }
}
const synth = new CosmicAudioSynth();

// --- THREE.JS MAIN APPLICATION ---
class GalaxyApp {
  constructor() {
    this.canvas = document.getElementById('galaxy-canvas');
    this.planets = [];
    this.orbitLines = [];
    this.moons = [];
    this.planetBadges = [];
    this.activePlanetIdx = 0;
    this.currentCarouselImgIdx = 0;
    this.isModalOpen = false;
    this.targetCamPos = new THREE.Vector3(0, 65, 130);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.isTransitioningCam = false;
    this.focusedPlanet = null;
    this.clock = new THREE.Clock();
    
    this.initScene();
    this.initLights();
    this.createSun();
    this.createMultiLayerStarfield();
    this.createGalacticNebula();
    this.createAsteroidBelt();
    this.createShootingComets();
    this.createPlanets();
    this.initRaycaster();
    this.initUI();
    this.initMusicController();
    
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
    
    setTimeout(() => {
      const loader = document.getElementById('loading-screen');
      if (loader) loader.classList.add('hidden');
    }, 700);
  }

  initScene() {
    this.scene = new THREE.Scene();
    // Soft transparent fog so distant planets remain crystal clear
    this.scene.fog = new THREE.FogExp2(0x060816, 0.0009);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1600);
    this.camera.position.set(0, 65, 130);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.045;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 300;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.2;

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  initLights() {
    // 1. Rich Cosmic Ambient Fill (Prevents planets from ever being pitch black)
    const ambientLight = new THREE.AmbientLight(0x8fa8c6, 2.2);
    this.scene.add(ambientLight);

    // 2. Cosmic Hemisphere Fill Light
    const hemiLight = new THREE.HemisphereLight(0xfff5ea, 0x1a2138, 1.8);
    this.scene.add(hemiLight);

    // 3. Central Sun Point Light (Warm Golden Radiance)
    this.sunLight = new THREE.PointLight(0xfff3d6, 5.0, 500, 0.9);
    this.sunLight.position.set(0, 0, 0);
    this.scene.add(this.sunLight);

    // 4. Camera Headlight (Ensures whichever planet the user views is illuminated and stunning)
    this.cameraLight = new THREE.DirectionalLight(0xffffff, 1.4);
    this.cameraLight.position.set(0, 0, 1);
    this.camera.add(this.cameraLight);
    this.scene.add(this.camera);
  }

  // --- PROCEDURAL VIBRANT PLANETARY TEXTURES ---
  generatePlanetTexture(baseColorHex, accentHex, style = 'bands') {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // High-vibrance background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, baseColorHex);
    bgGrad.addColorStop(0.3, accentHex);
    bgGrad.addColorStop(0.7, baseColorHex);
    bgGrad.addColorStop(1, accentHex);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (style === 'bands') {
      for (let i = 0; i < 40; i++) {
        const y = Math.random() * canvas.height;
        const h = 4 + Math.random() * 22;
        ctx.fillStyle = (i % 2 === 0) ? 'rgba(255,255,255,0.32)' : 'rgba(0,0,0,0.22)';
        ctx.fillRect(0, y, canvas.width, h);
        
        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * canvas.width, y, 25 + Math.random() * 50, h * 1.1, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.fill();
        }
      }
    } else if (style === 'continents') {
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        const x = Math.random() * canvas.width;
        const y = 50 + Math.random() * (canvas.height - 100);
        const r = 30 + Math.random() * 95;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, 'rgba(255,255,255,0.5)');
        grad.addColorStop(0.6, accentHex);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Polar Ice Caps
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillRect(0, 0, canvas.width, 32);
      ctx.fillRect(0, canvas.height - 32, canvas.width, 32);
    } else if (style === 'craters') {
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = 5 + Math.random() * 20;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // --- PROCEDURAL CLOUD TEXTURE ---
  generateCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 70; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 25 + Math.random() * 85;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }

  // --- PROCEDURAL VIBRANT RING TEXTURE ---
  generateRingTexture(ringColorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.12, ringColorHex);
    grad.addColorStop(0.35, 'rgba(255,255,255,0.95)');
    grad.addColorStop(0.46, 'transparent'); // Cassini division
    grad.addColorStop(0.55, ringColorHex);
    grad.addColorStop(0.88, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // --- FLOATING 3D PLANET BILLBOARD LABEL ---
  createPlanetLabel(text, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');

    // Pill background
    ctx.fillStyle = 'rgba(8, 12, 28, 0.85)';
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(10, 10, 300, 60, 30);
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.font = 'bold 24px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ ' + text, 160, 40);

    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: 0.9,
      depthTest: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(7.5, 1.88, 1);
    return sprite;
  }

  // --- REALISTIC GLOWING SUN ---
  createSun() {
    const sunGeom = new THREE.SphereGeometry(7.2, 48, 48);
    
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 1024;
    sunCanvas.height = 512;
    const sCtx = sunCanvas.getContext('2d');
    const sGrad = sCtx.createLinearGradient(0, 0, sunCanvas.width, sunCanvas.height);
    sGrad.addColorStop(0, '#ffffff');
    sGrad.addColorStop(0.2, '#fffbe6');
    sGrad.addColorStop(0.5, '#f6ad55');
    sGrad.addColorStop(0.8, '#ed8936');
    sGrad.addColorStop(1, '#dd6b20');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, sunCanvas.width, sunCanvas.height);

    for (let i = 0; i < 60; i++) {
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      sCtx.beginPath();
      sCtx.arc(Math.random() * 1024, Math.random() * 512, 15 + Math.random() * 50, 0, Math.PI * 2);
      sCtx.fill();
    }
    const sunTex = new THREE.CanvasTexture(sunCanvas);

    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      color: 0xffffff
    });
    this.sun = new THREE.Mesh(sunGeom, sunMat);
    this.scene.add(this.sun);

    // Inner Radiant Corona Shell
    const coronaGeom = new THREE.SphereGeometry(8.8, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xfbd38d,
      transparent: true,
      opacity: 0.45,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    this.sunCorona = new THREE.Mesh(coronaGeom, coronaMat);
    this.scene.add(this.sunCorona);

    // Outer Solar Atmosphere Halo
    const outerHaloGeom = new THREE.SphereGeometry(11.5, 32, 32);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: 0xed8936,
      transparent: true,
      opacity: 0.24,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    this.sunOuterHalo = new THREE.Mesh(outerHaloGeom, outerHaloMat);
    this.scene.add(this.sunOuterHalo);
  }

  // --- MULTI-LAYERED STARFIELD ---
  createMultiLayerStarfield() {
    const deepCount = 8500;
    const deepGeom = new THREE.BufferGeometry();
    const deepPos = new Float32Array(deepCount * 3);
    const deepCols = new Float32Array(deepCount * 3);

    for (let i = 0; i < deepCount; i++) {
      const r = 240 + Math.random() * 380;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      deepPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      deepPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      deepPos[i * 3 + 2] = r * Math.cos(phi);

      const shade = 0.7 + Math.random() * 0.3;
      deepCols[i * 3] = shade;
      deepCols[i * 3 + 1] = shade;
      deepCols[i * 3 + 2] = shade;
    }
    deepGeom.setAttribute('position', new THREE.BufferAttribute(deepPos, 3));
    deepGeom.setAttribute('color', new THREE.BufferAttribute(deepCols, 3));

    const deepMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });
    this.deepStars = new THREE.Points(deepGeom, deepMat);
    this.scene.add(this.deepStars);

    // Foreground Twinkling Stars
    const glintCount = 2800;
    const glintGeom = new THREE.BufferGeometry();
    const glintPos = new Float32Array(glintCount * 3);
    const glintCols = new Float32Array(glintCount * 3);

    const starPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#fbd38d'),
      new THREE.Color('#90cdf4'),
      new THREE.Color('#fbb6ce'),
      new THREE.Color('#b794f4')
    ];

    for (let i = 0; i < glintCount; i++) {
      const r = 160 + Math.random() * 320;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      glintPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      glintPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      glintPos[i * 3 + 2] = r * Math.cos(phi);

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      glintCols[i * 3] = col.r;
      glintCols[i * 3 + 1] = col.g;
      glintCols[i * 3 + 2] = col.b;
    }
    glintGeom.setAttribute('position', new THREE.BufferAttribute(glintPos, 3));
    glintGeom.setAttribute('color', new THREE.BufferAttribute(glintCols, 3));

    const glintMat = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    this.glintStars = new THREE.Points(glintGeom, glintMat);
    this.scene.add(this.glintStars);
  }

  // --- GALACTIC SPIRAL NEBULA ---
  createGalacticNebula() {
    const count = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const nebulaColors = [
      new THREE.Color('#805ad5'),
      new THREE.Color('#319795'),
      new THREE.Color('#d53f8c'),
      new THREE.Color('#dd6b20'),
      new THREE.Color('#3182ce')
    ];

    for (let i = 0; i < count; i++) {
      const arm = (i % 2) * Math.PI;
      const dist = 25 + Math.pow(Math.random(), 1.5) * 115;
      const angle = arm + dist * 0.05 + (Math.random() - 0.5) * 0.8;
      const y = (Math.random() - 0.5) * (18 + dist * 0.15);

      positions[i * 3] = Math.cos(angle) * dist;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * dist;

      const col = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.nebula = new THREE.Points(geometry, material);
    this.scene.add(this.nebula);
  }

  // --- 3D ASTEROID BELT ---
  createAsteroidBelt() {
    const asteroidCount = 650;
    const geom = new THREE.DodecahedronGeometry(0.32, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x9c938b,
      roughness: 0.8,
      metalness: 0.15
    });

    this.asteroidInstanced = new THREE.InstancedMesh(geom, mat, asteroidCount);
    const dummy = new THREE.Object3D();
    this.asteroidsData = [];

    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 47 + (Math.random() - 0.5) * 6.5;
      const y = (Math.random() - 0.5) * 3.5;
      const scale = 0.5 + Math.random() * 1.2;

      dummy.position.set(Math.cos(angle) * dist, y, Math.sin(angle) * dist);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      this.asteroidInstanced.setMatrixAt(i, dummy.matrix);

      this.asteroidsData.push({
        angle,
        dist,
        speed: 0.0035 + (Math.random() - 0.5) * 0.0008,
        y,
        scale,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02
      });
    }

    this.asteroidInstanced.instanceMatrix.needsUpdate = true;
    this.scene.add(this.asteroidInstanced);
  }

  updateAsteroidBelt() {
    if (!this.asteroidInstanced) return;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < this.asteroidsData.length; i++) {
      const data = this.asteroidsData[i];
      data.angle += data.speed;

      dummy.position.set(Math.cos(data.angle) * data.dist, data.y, Math.sin(data.angle) * data.dist);
      dummy.rotation.x += data.rotSpeedX;
      dummy.rotation.y += data.rotSpeedY;
      dummy.scale.set(data.scale, data.scale, data.scale);
      dummy.updateMatrix();

      this.asteroidInstanced.setMatrixAt(i, dummy.matrix);
    }
    this.asteroidInstanced.instanceMatrix.needsUpdate = true;
  }

  // --- SHOOTING COMETS ---
  createShootingComets() {
    this.comets = [];
    const headGeom = new THREE.SphereGeometry(0.4, 8, 8);
    const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 3; i++) {
      const group = new THREE.Group();
      const head = new THREE.Mesh(headGeom, headMat);
      group.add(head);

      const tailGeom = new THREE.CylinderGeometry(0.01, 0.4, 24, 6);
      tailGeom.rotateX(Math.PI / 2);
      tailGeom.translate(0, 0, -12);
      const tailMat = new THREE.MeshBasicMaterial({
        color: 0x90cdf4,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const tail = new THREE.Mesh(tailGeom, tailMat);
      group.add(tail);

      group.visible = false;
      this.scene.add(group);

      this.comets.push({
        group,
        headMat,
        tailMat,
        active: false,
        timer: 100 + Math.random() * 400,
        speed: 2.4 + Math.random() * 1.5,
        life: 0
      });
    }
  }

  updateComets() {
    this.comets.forEach(comet => {
      if (!comet.active) {
        comet.timer--;
        if (comet.timer <= 0) {
          comet.active = true;
          comet.life = 75;
          comet.group.visible = true;
          
          const startX = (Math.random() - 0.5) * 200;
          const startY = 50 + Math.random() * 60;
          const startZ = (Math.random() - 0.5) * 200;
          comet.group.position.set(startX, startY, startZ);
          comet.group.lookAt(startX - 80, startY - 50, startZ - 80);
        }
      } else {
        comet.group.translateZ(comet.speed);
        comet.life--;
        const alpha = comet.life / 75;
        comet.tailMat.opacity = alpha * 0.75;
        comet.headMat.opacity = alpha;

        if (comet.life <= 0) {
          comet.active = false;
          comet.group.visible = false;
          comet.timer = 250 + Math.random() * 550;
        }
      }
    });
  }

  // --- CREATE 7 VIBRANT, HIGHLY-VISIBLE PLANETS ---
  createPlanets() {
    const styles = ['continents', 'bands', 'bands', 'continents', 'continents', 'bands', 'bands'];

    PLANET_DATA.forEach((data, index) => {
      // 1. Orbital Track Line with Glowing Color
      const orbitCurve = new THREE.EllipseCurve(0, 0, data.orbitRadius, data.orbitRadius, 0, 2 * Math.PI);
      const orbitPoints = orbitCurve.getPoints(160);
      const orbitGeom = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: data.colorHex,
        transparent: true,
        opacity: 0.38
      });
      const orbitLine = new THREE.Line(orbitGeom, orbitMat);
      this.scene.add(orbitLine);
      this.orbitLines.push(orbitLine);

      // 2. Glowing Planet Ground Ring (Highlight Target)
      const targetRingGeom = new THREE.RingGeometry(data.radius * 1.35, data.radius * 1.5, 48);
      const targetRingMat = new THREE.MeshBasicMaterial({
        color: data.colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const targetRing = new THREE.Mesh(targetRingGeom, targetRingMat);
      targetRing.rotation.x = Math.PI / 2;

      // 3. Planet Mesh with Self-Illuminating Emissive Glow (Never dark!)
      const sphereGeom = new THREE.SphereGeometry(data.radius, 48, 48);
      const texture = this.generatePlanetTexture(
        data.color,
        'rgba(255,255,255,0.45)',
        styles[index % styles.length]
      );
      
      const sphereMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.45,
        metalness: 0.1,
        emissive: data.emissiveHex,
        emissiveIntensity: 0.32,
        bumpScale: 0.08
      });

      const planetMesh = new THREE.Mesh(sphereGeom, sphereMat);
      planetMesh.castShadow = true;
      planetMesh.receiveShadow = true;
      planetMesh.userData = { planetIndex: index, data: data };
      planetMesh.add(targetRing);

      // 4. Dynamic Cloud Layer
      let cloudMesh = null;
      if (data.hasClouds) {
        const cloudGeom = new THREE.SphereGeometry(data.radius * 1.03, 36, 36);
        const cloudMat = new THREE.MeshStandardMaterial({
          map: this.generateCloudTexture(),
          transparent: true,
          opacity: 0.45,
          blending: THREE.NormalBlending
        });
        cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
        planetMesh.add(cloudMesh);
      }

      // 5. Glowing Atmospheric Shell (Vibrant Rim Lighting)
      const auraGeom = new THREE.SphereGeometry(data.radius * 1.18, 32, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: data.colorHex,
        transparent: true,
        opacity: 0.38,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      });
      const auraMesh = new THREE.Mesh(auraGeom, auraMat);
      planetMesh.add(auraMesh);

      // 6. Floating 3D Name Badge
      const labelBadge = this.createPlanetLabel(data.name.replace('Planet of ', ''), data.color);
      labelBadge.position.y = data.radius + 2.4;
      planetMesh.add(labelBadge);
      this.planetBadges.push(labelBadge);

      // 7. Realistic Rings
      let ringMesh = null;
      if (data.hasRings) {
        const ringGeom = new THREE.RingGeometry(data.ringInner, data.ringOuter, 96);
        const ringTex = this.generateRingTexture(data.color);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI / 2.35;
        ringMesh.rotation.y = 0.25;
        planetMesh.add(ringMesh);
      }

      // 8. Orbiting Moons
      let moonMesh = null;
      if (data.hasMoons) {
        const moonGeom = new THREE.SphereGeometry(data.moonRadius, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          emissive: 0x4a5568,
          emissiveIntensity: 0.2,
          roughness: 0.7
        });
        moonMesh = new THREE.Mesh(moonGeom, moonMat);
        this.scene.add(moonMesh);

        this.moons.push({
          mesh: moonMesh,
          parentMesh: planetMesh,
          dist: data.moonDist,
          speed: data.moonSpeed,
          angle: Math.random() * Math.PI * 2
        });
      }

      // Spread planets in orbit
      const angle = (index / PLANET_DATA.length) * Math.PI * 2 + Math.random() * 0.3;
      planetMesh.position.x = Math.cos(angle) * data.orbitRadius;
      planetMesh.position.z = Math.sin(angle) * data.orbitRadius;
      planetMesh.position.y = (Math.random() - 0.5) * 1.5;

      this.scene.add(planetMesh);

      this.planets.push({
        mesh: planetMesh,
        cloudMesh: cloudMesh,
        targetRing: targetRing,
        data: data,
        angle: angle,
        orbitRadius: data.orbitRadius,
        orbitSpeed: data.orbitSpeed,
        auraMesh: auraMesh,
        ringMesh: ringMesh,
        index: index
      });
    });
  }

  // --- RAYCASTER FOR INTERACTION ---
  initRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    let isDragging = false;
    let downPos = { x: 0, y: 0 };

    this.canvas.addEventListener('pointerdown', (e) => {
      isDragging = false;
      downPos = { x: e.clientX, y: e.clientY };
    });

    this.canvas.addEventListener('pointermove', (e) => {
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      if (dist > 6) isDragging = true;

      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = this.planets.map(p => p.mesh);
      const intersects = this.raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        this.canvas.style.cursor = 'pointer';
      } else {
        this.canvas.style.cursor = 'grab';
      }
    });

    this.canvas.addEventListener('pointerup', (e) => {
      if (isDragging) return;

      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = this.planets.map(p => p.mesh);
      const intersects = this.raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && obj.userData.planetIndex === undefined && obj.parent) {
          obj = obj.parent;
        }
        if (obj && obj.userData.planetIndex !== undefined) {
          this.selectPlanet(obj.userData.planetIndex);
        }
      }
    });
  }

  selectPlanet(index) {
    const planetObj = this.planets[index];
    if (!planetObj) return;

    this.activePlanetIdx = index;
    this.focusedPlanet = planetObj;

    document.querySelectorAll('.planet-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    synth.playChime(440 + index * 80, 0.9);

    const planetPos = planetObj.mesh.position;
    const offsetDist = planetObj.data.radius * 4.2;
    this.targetLookAt.copy(planetPos);
    this.targetCamPos.set(
      planetPos.x + offsetDist * 0.8,
      planetPos.y + offsetDist * 0.6,
      planetPos.z + offsetDist * 1.2
    );
    this.isTransitioningCam = true;

    setTimeout(() => {
      this.openPlanetModal(index);
    }, 450);
  }

  resetCamera() {
    this.focusedPlanet = null;
    this.targetLookAt.set(0, 0, 0);
    this.targetCamPos.set(0, 65, 130);
    this.isTransitioningCam = true;
    synth.playChime(659.25, 0.6);
  }

  // --- MODAL & GALLERY ---
  openPlanetModal(index) {
    const data = PLANET_DATA[index];
    this.activePlanetIdx = index;
    this.currentCarouselImgIdx = 0;
    this.isModalOpen = true;

    const modal = document.getElementById('planet-modal');
    const badgeDot = document.getElementById('modal-badge-dot');
    const badgeText = document.getElementById('modal-badge-text');
    const title = document.getElementById('modal-title');
    const tagline = document.getElementById('modal-tagline');
    const narrative = document.getElementById('modal-narrative');
    const quote = document.getElementById('modal-quote');
    const thumbs = document.getElementById('carousel-thumbs');

    badgeDot.style.background = data.color;
    badgeDot.style.boxShadow = `0 0 10px ${data.color}`;
    badgeText.textContent = data.indexStr;
    title.textContent = data.name;
    tagline.textContent = data.tagline;
    narrative.textContent = data.narrative;
    quote.textContent = data.quote;

    thumbs.innerHTML = '';
    data.photos.forEach((photo, i) => {
      const thumb = document.createElement('div');
      thumb.className = `carousel-thumb ${i === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${photo.src}" alt="Thumb ${i + 1}">`;
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showCarouselPhoto(i);
      });
      thumbs.appendChild(thumb);
    });

    this.showCarouselPhoto(0);
    modal.classList.add('open');
  }

  showCarouselPhoto(index) {
    const data = PLANET_DATA[this.activePlanetIdx];
    if (!data || !data.photos[index]) return;

    this.currentCarouselImgIdx = index;
    const img = document.getElementById('carousel-img');
    const counter = document.getElementById('carousel-counter');
    const thumbs = document.querySelectorAll('.carousel-thumb');

    img.style.opacity = '0';
    setTimeout(() => {
      img.src = data.photos[index].src;
      img.style.opacity = '1';
    }, 150);

    counter.textContent = `${index + 1} / ${data.photos.length}`;

    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  closePlanetModal() {
    const modal = document.getElementById('planet-modal');
    modal.classList.remove('open');
    this.isModalOpen = false;
    this.resetCamera();
  }

  initUI() {
    document.querySelectorAll('.planet-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-planet'), 10);
        this.selectPlanet(idx);
      });
    });

    document.getElementById('btn-reset-cam').addEventListener('click', () => {
      this.resetCamera();
    });

    document.getElementById('btn-modal-close').addEventListener('click', () => {
      this.closePlanetModal();
    });

    document.getElementById('planet-modal').addEventListener('click', (e) => {
      if (e.target.id === 'planet-modal') {
        this.closePlanetModal();
      }
    });

    document.getElementById('btn-carousel-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      const data = PLANET_DATA[this.activePlanetIdx];
      let newIdx = this.currentCarouselImgIdx - 1;
      if (newIdx < 0) newIdx = data.photos.length - 1;
      this.showCarouselPhoto(newIdx);
    });

    document.getElementById('btn-carousel-next').addEventListener('click', (e) => {
      e.stopPropagation();
      const data = PLANET_DATA[this.activePlanetIdx];
      let newIdx = (this.currentCarouselImgIdx + 1) % data.photos.length;
      this.showCarouselPhoto(newIdx);
    });

    const carouselStage = document.querySelector('.carousel-stage');
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('btn-lightbox-close');

    carouselStage.addEventListener('click', () => {
      const data = PLANET_DATA[this.activePlanetIdx];
      if (!data) return;
      lightboxImg.src = data.photos[this.currentCarouselImgIdx].src;
      lightbox.classList.add('open');
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });

    const tip = document.getElementById('guidance-tip');
    document.getElementById('btn-tip-dismiss').addEventListener('click', () => {
      tip.style.display = 'none';
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (lightbox.classList.contains('open')) {
          lightbox.classList.remove('open');
        } else if (this.isModalOpen) {
          this.closePlanetModal();
        }
      } else if (this.isModalOpen) {
        if (e.key === 'ArrowLeft') document.getElementById('btn-carousel-prev').click();
        if (e.key === 'ArrowRight') document.getElementById('btn-carousel-next').click();
      }
    });
  }

  // --- SEAMLESS SHARED PERSISTENT MUSIC CONTROLLER ---
  initMusicController() {
    const musicToggleBtn = document.getElementById('btn-music-toggle');
    const musicSwitchBtn = document.getElementById('btn-switch-song');
    const musicTitle = document.getElementById('music-title');
    const musicBars = document.getElementById('music-bars');
    const iconPlay = musicToggleBtn.querySelector('.icon-play');
    const iconPause = musicToggleBtn.querySelector('.icon-pause');

    if (window.bgMusic) {
      window.bgMusic.onStateChange((playing, track) => {
        if (playing) {
          iconPlay.style.display = 'none';
          iconPause.style.display = 'block';
          musicBars.classList.add('playing');
        } else {
          iconPlay.style.display = 'block';
          iconPause.style.display = 'none';
          musicBars.classList.remove('playing');
        }
        if (track) musicTitle.textContent = track.name;
      });

      musicToggleBtn.addEventListener('click', () => {
        synth.init();
        window.bgMusic.toggle();
      });

      musicSwitchBtn.addEventListener('click', () => {
        window.bgMusic.switchTrack();
      });

      // Auto-trigger playback on Galaxy load
      window.bgMusic.play().catch(() => {});
    }
  }

  // --- REAL-TIME ANIMATION LOOP ---
  animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();

    // Rotate Sun & Corona
    if (this.sun) {
      this.sun.rotation.y += 0.002;
      this.sunCorona.rotation.y -= 0.001;
      this.sunOuterHalo.rotation.z += 0.0006;
    }

    // Twinkle & rotate cosmic fields
    if (this.deepStars) {
      this.deepStars.rotation.y += 0.00008;
    }
    if (this.glintStars) {
      this.glintStars.rotation.y += 0.00015;
    }
    if (this.nebula) {
      this.nebula.rotation.y -= 0.00025;
    }

    // Update Comets & Asteroid Belt
    this.updateComets();
    this.updateAsteroidBelt();

    // Rotate planets and orbit around sun
    this.planets.forEach((p) => {
      p.mesh.rotation.y += 0.012;
      if (p.cloudMesh) {
        p.cloudMesh.rotation.y += 0.016;
      }
      if (p.targetRing) {
        p.targetRing.rotation.z += 0.008;
      }

      if (!this.isModalOpen || this.focusedPlanet !== p) {
        p.angle += p.orbitSpeed;
        p.mesh.position.x = Math.cos(p.angle) * p.orbitRadius;
        p.mesh.position.z = Math.sin(p.angle) * p.orbitRadius;
      }
    });

    // Update Moons
    this.moons.forEach(m => {
      m.angle += m.speed;
      const parentPos = m.parentMesh.position;
      m.mesh.position.x = parentPos.x + Math.cos(m.angle) * m.dist;
      m.mesh.position.z = parentPos.z + Math.sin(m.angle) * m.dist;
      m.mesh.position.y = parentPos.y + Math.sin(m.angle * 2) * 0.4;
      m.mesh.rotation.y += 0.02;
    });

    // Smooth Camera Transition
    if (this.isTransitioningCam) {
      this.camera.position.lerp(this.targetCamPos, 0.06);
      this.controls.target.lerp(this.targetLookAt, 0.06);

      if (this.camera.position.distanceTo(this.targetCamPos) < 0.25) {
        this.isTransitioningCam = false;
      }
    } else if (this.focusedPlanet && this.isModalOpen) {
      this.controls.target.copy(this.focusedPlanet.mesh.position);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new GalaxyApp();
});
