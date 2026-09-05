/* ==========================================================================
   AAYUSH'S UNIVERSE — 3D THREE.JS SOLAR SYSTEM & MEMORY PLANETS
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
    radius: 2.2,
    orbitRadius: 18,
    orbitSpeed: 0.007,
    hasRings: false,
    photos: [
      { src: 'images/childhood/childhood-1.jpeg', caption: 'Little Aayush with those bright, innocent eyes' },
      { src: 'images/childhood/childhood-2.jpeg', caption: 'The gentle smile that never changed' },
      { src: 'images/childhood/childhood-3.jpeg', caption: 'Growing up into the sweetest soul' },
      { src: 'images/childhood/childhood-4.jpeg', caption: 'Baby cheeks and limitless curiosity' },
      { src: 'images/embedded/embedded_1.jpg', caption: 'A snapshot from the very beginning' }
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
    radius: 2.6,
    orbitRadius: 28,
    orbitSpeed: 0.0055,
    hasRings: false,
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
    radius: 3.1,
    orbitRadius: 39,
    orbitSpeed: 0.0042,
    hasRings: true,
    ringInner: 4.2,
    ringOuter: 5.6,
    ringColor: 0x9f7aea,
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
    radius: 2.8,
    orbitRadius: 51,
    orbitSpeed: 0.0034,
    hasRings: true,
    ringInner: 3.8,
    ringOuter: 4.8,
    ringColor: 0xf6ad55,
    photos: [
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
    radius: 3.5,
    orbitRadius: 65,
    orbitSpeed: 0.0026,
    hasRings: false,
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
    radius: 3.3,
    orbitRadius: 80,
    orbitSpeed: 0.0020,
    hasRings: true,
    ringInner: 4.5,
    ringOuter: 6.2,
    ringColor: 0xdd6b20,
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
    radius: 3.8,
    orbitRadius: 96,
    orbitSpeed: 0.0015,
    hasRings: true,
    ringInner: 5.2,
    ringOuter: 7.4,
    ringColor: 0x4299e1,
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

// --- SOUND SYNTHESIS FOR COSMIC CHIMES ---
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
    } catch (e) {
      // Ignore audio synthesis errors if blocked
    }
  }
}
const synth = new CosmicAudioSynth();

// --- THREE.JS MAIN APPLICATION ---
class GalaxyApp {
  constructor() {
    this.canvas = document.getElementById('galaxy-canvas');
    this.planets = [];
    this.orbitLines = [];
    this.activePlanetIdx = 0;
    this.currentCarouselImgIdx = 0;
    this.isModalOpen = false;
    this.targetCamPos = new THREE.Vector3(0, 55, 110);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.isTransitioningCam = false;
    this.focusedPlanet = null;
    
    // Music tracks
    this.tracks = [
      { name: 'song.mpeg', src: 'music/song.mpeg' },
      { name: 'Haareya', src: 'music/haareya.mp3' }
    ];
    this.currentTrackIdx = 0;
    
    this.initScene();
    this.initLights();
    this.createSun();
    this.createStarfield();
    this.createNebulaParticles();
    this.createShootingStars();
    this.createPlanets();
    this.initRaycaster();
    this.initUI();
    this.initAudio();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
    
    // Hide loader
    setTimeout(() => {
      const loader = document.getElementById('loading-screen');
      if (loader) loader.classList.add('hidden');
    }, 900);
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060714, 0.0035);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 55, 110);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 12;
    this.controls.maxDistance = 240;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.15;

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0x2d3748, 0.9);
    this.scene.add(ambientLight);

    this.sunLight = new THREE.PointLight(0xffeedd, 3.5, 300, 1.2);
    this.sunLight.position.set(0, 0, 0);
    this.scene.add(this.sunLight);
  }

  // Procedural Canvas Textures for Planet Surfaces
  generatePlanetTexture(baseColorHex, stripeColorHex, style = 'stripes') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = baseColorHex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (style === 'stripes') {
      for (let i = 0; i < 24; i++) {
        const y = Math.random() * canvas.height;
        const h = 4 + Math.random() * 20;
        ctx.fillStyle = (i % 2 === 0) ? stripeColorHex : 'rgba(255,255,255,0.12)';
        ctx.fillRect(0, y, canvas.width, h);
      }
    } else if (style === 'marbled') {
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = 20 + Math.random() * 80;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, stripeColorHex);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (style === 'craters') {
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = 4 + Math.random() * 16;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // Central Sun
  createSun() {
    const sunGeom = new THREE.SphereGeometry(6.5, 32, 32);
    
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 512;
    sunCanvas.height = 256;
    const sCtx = sunCanvas.getContext('2d');
    const sGrad = sCtx.createLinearGradient(0, 0, sunCanvas.width, sunCanvas.height);
    sGrad.addColorStop(0, '#fff3b0');
    sGrad.addColorStop(0.5, '#f6ad55');
    sGrad.addColorStop(1, '#dd6b20');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, sunCanvas.width, sunCanvas.height);
    for (let i = 0; i < 30; i++) {
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      sCtx.beginPath();
      sCtx.arc(Math.random() * 512, Math.random() * 256, 10 + Math.random() * 40, 0, Math.PI * 2);
      sCtx.fill();
    }
    const sunTex = new THREE.CanvasTexture(sunCanvas);

    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      color: 0xfff5ea
    });
    this.sun = new THREE.Mesh(sunGeom, sunMat);
    this.scene.add(this.sun);

    const glowGeom = new THREE.SphereGeometry(7.8, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xfbd38d,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide
    });
    this.sunGlow = new THREE.Mesh(glowGeom, glowMat);
    this.scene.add(this.sunGlow);

    const outerHaloGeom = new THREE.SphereGeometry(9.5, 32, 32);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: 0xed8936,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide
    });
    this.sunOuterHalo = new THREE.Mesh(outerHaloGeom, outerHaloMat);
    this.scene.add(this.sunOuterHalo);
  }

  // Background Starfield
  createStarfield() {
    const starCount = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#fbd38d'),
      new THREE.Color('#90cdf4'),
      new THREE.Color('#fbb6ce'),
      new THREE.Color('#e9d8fd')
    ];

    for (let i = 0; i < starCount; i++) {
      const r = 180 + Math.random() * 260;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  // Nebula Cosmic Dust
  createNebulaParticles() {
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const nebulaColors = [
      new THREE.Color('#805ad5'),
      new THREE.Color('#319795'),
      new THREE.Color('#d53f8c'),
      new THREE.Color('#3182ce')
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 110;
      const y = (Math.random() - 0.5) * 26;

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
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.nebula = new THREE.Points(geometry, material);
    this.scene.add(this.nebula);
  }

  // Shooting Stars
  createShootingStars() {
    this.shootingStars = [];
    const geom = new THREE.CylinderGeometry(0.1, 0.0, 18, 6);
    geom.rotateX(Math.PI / 2);

    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.visible = false;
      this.scene.add(mesh);

      this.shootingStars.push({
        mesh,
        active: false,
        timer: Math.random() * 400,
        speed: 1.8 + Math.random() * 1.5,
        life: 0
      });
    }
  }

  updateShootingStars() {
    this.shootingStars.forEach(star => {
      if (!star.active) {
        star.timer--;
        if (star.timer <= 0) {
          star.active = true;
          star.life = 60;
          star.mesh.visible = true;
          star.mesh.material.opacity = 0.9;
          
          const startX = (Math.random() - 0.5) * 160;
          const startY = 40 + Math.random() * 50;
          const startZ = (Math.random() - 0.5) * 160;
          star.mesh.position.set(startX, startY, startZ);
          star.mesh.lookAt(startX - 60, startY - 40, startZ - 60);
        }
      } else {
        star.mesh.translateZ(star.speed);
        star.life--;
        star.mesh.material.opacity = star.life / 60;
        if (star.life <= 0) {
          star.active = false;
          star.mesh.visible = false;
          star.timer = 200 + Math.random() * 500;
        }
      }
    });
  }

  // Create Planets
  createPlanets() {
    const styles = ['marbled', 'stripes', 'marbled', 'stripes', 'marbled', 'stripes', 'marbled'];

    PLANET_DATA.forEach((data, index) => {
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        data.orbitRadius, data.orbitRadius,
        0, 2 * Math.PI,
        false,
        0
      );
      const orbitPoints = orbitCurve.getPoints(128);
      const orbitGeom = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: data.colorHex,
        transparent: true,
        opacity: 0.16
      });
      const orbitLine = new THREE.Line(orbitGeom, orbitMat);
      this.scene.add(orbitLine);
      this.orbitLines.push(orbitLine);

      const sphereGeom = new THREE.SphereGeometry(data.radius, 32, 32);
      const texture = this.generatePlanetTexture(
        data.color,
        'rgba(255,255,255,0.3)',
        styles[index % styles.length]
      );
      
      const sphereMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.65,
        metalness: 0.15,
        bumpScale: 0.05
      });

      const planetMesh = new THREE.Mesh(sphereGeom, sphereMat);
      planetMesh.castShadow = true;
      planetMesh.receiveShadow = true;
      planetMesh.userData = { planetIndex: index, data: data };

      const auraGeom = new THREE.SphereGeometry(data.radius * 1.18, 32, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: data.colorHex,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide
      });
      const auraMesh = new THREE.Mesh(auraGeom, auraMat);
      planetMesh.add(auraMesh);

      let ringMesh = null;
      if (data.hasRings) {
        const ringGeom = new THREE.RingGeometry(data.ringInner, data.ringOuter, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: data.ringColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.55
        });
        ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = 0.2;
        planetMesh.add(ringMesh);
      }

      const angle = (index / PLANET_DATA.length) * Math.PI * 2 + Math.random() * 0.5;
      planetMesh.position.x = Math.cos(angle) * data.orbitRadius;
      planetMesh.position.z = Math.sin(angle) * data.orbitRadius;
      planetMesh.position.y = (Math.random() - 0.5) * 2;

      this.scene.add(planetMesh);

      this.planets.push({
        mesh: planetMesh,
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

  // Raycaster for Hover & Click
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
      const intersects = this.raycaster.intersectObjects(meshes, false);

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
      const intersects = this.raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const clickedPlanetIndex = intersects[0].object.userData.planetIndex;
        this.selectPlanet(clickedPlanetIndex);
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
    this.targetCamPos.set(0, 55, 110);
    this.isTransitioningCam = true;
    synth.playChime(659.25, 0.6);
  }

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

  initAudio() {
    this.audio = document.getElementById('bg-audio');
    this.musicToggleBtn = document.getElementById('btn-music-toggle');
    this.musicSwitchBtn = document.getElementById('btn-switch-song');
    this.musicTitle = document.getElementById('music-title');
    this.musicBars = document.getElementById('music-bars');
    this.iconPlay = this.musicToggleBtn.querySelector('.icon-play');
    this.iconPause = this.musicToggleBtn.querySelector('.icon-pause');

    this.loadTrack(0);

    this.musicToggleBtn.addEventListener('click', () => {
      synth.init();
      if (this.audio.paused) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    });

    this.musicSwitchBtn.addEventListener('click', () => {
      this.currentTrackIdx = (this.currentTrackIdx + 1) % this.tracks.length;
      this.loadTrack(this.currentTrackIdx);
      this.playAudio();
    });

    const startAudioOnce = () => {
      synth.init();
      this.playAudio().catch(() => {});
      window.removeEventListener('click', startAudioOnce);
    };
    window.addEventListener('click', startAudioOnce, { once: true });
  }

  loadTrack(idx) {
    const track = this.tracks[idx];
    this.audio.src = track.src;
    this.musicTitle.textContent = track.name;
  }

  playAudio() {
    return this.audio.play().then(() => {
      this.iconPlay.style.display = 'none';
      this.iconPause.style.display = 'block';
      this.musicBars.classList.add('playing');
    }).catch(err => {
      console.log('Audio autoplay prevented:', err);
    });
  }

  pauseAudio() {
    this.audio.pause();
    this.iconPlay.style.display = 'block';
    this.iconPause.style.display = 'none';
    this.musicBars.classList.remove('playing');
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.sun) {
      this.sun.rotation.y += 0.002;
      this.sunGlow.rotation.y -= 0.001;
      this.sunOuterHalo.rotation.z += 0.0005;
    }

    if (this.starfield) {
      this.starfield.rotation.y += 0.00015;
    }
    if (this.nebula) {
      this.nebula.rotation.y -= 0.0003;
    }

    this.updateShootingStars();

    this.planets.forEach((p) => {
      p.mesh.rotation.y += 0.01;

      if (!this.isModalOpen || this.focusedPlanet !== p) {
        p.angle += p.orbitSpeed;
        p.mesh.position.x = Math.cos(p.angle) * p.orbitRadius;
        p.mesh.position.z = Math.sin(p.angle) * p.orbitRadius;
      }
    });

    if (this.isTransitioningCam) {
      this.camera.position.lerp(this.targetCamPos, 0.06);
      this.controls.target.lerp(this.targetLookAt, 0.06);

      if (this.camera.position.distanceTo(this.targetCamPos) < 0.2) {
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
