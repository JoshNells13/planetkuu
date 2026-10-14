import * as THREE from 'three';

// Cache generated canvas textures to avoid regenerating every frame
const textureCache: Record<string, THREE.CanvasTexture> = {};

export function getPlanetTexture(planetId: string): THREE.CanvasTexture {
  if (textureCache[planetId]) {
    return textureCache[planetId];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    textureCache[planetId] = fallback;
    return fallback;
  }

  const w = canvas.width;
  const h = canvas.height;

  switch (planetId) {
    case 'mercury': {
      // Rocky grey surface with tons of craters
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#78716c');
      grad.addColorStop(0.5, '#a8a29e');
      grad.addColorStop(1, '#57534e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Procedural craters
      ctx.fillStyle = 'rgba(41, 37, 36, 0.45)';
      ctx.strokeStyle = 'rgba(214, 211, 209, 0.35)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 40; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const r = 4 + Math.random() * 14;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      break;
    }

    case 'venus': {
      // Golden dense sulfuric swirling cloud bands
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#ca8a04');
      grad.addColorStop(0.3, '#facc15');
      grad.addColorStop(0.6, '#eab308');
      grad.addColorStop(1, '#a16207');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Cloud swirls
      ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
      for (let i = 0; i < 18; i++) {
        const y = (i / 18) * h + Math.sin(i) * 10;
        ctx.beginPath();
        ctx.ellipse(w / 2, y, w / 2, 8 + Math.random() * 8, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'earth': {
      // Deep blue ocean background
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
      oceanGrad.addColorStop(0, '#1d4ed8');
      oceanGrad.addColorStop(0.5, '#2563eb');
      oceanGrad.addColorStop(1, '#1e40af');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // Stylized continents (green & golden landmasses)
      ctx.fillStyle = '#10b981';
      // Eurasia / Africa
      ctx.beginPath();
      ctx.ellipse(w * 0.55, h * 0.45, 60, 45, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.52, h * 0.65, 40, 50, -0.1, 0, Math.PI * 2);
      ctx.fill();
      // Americas
      ctx.beginPath();
      ctx.ellipse(w * 0.25, h * 0.35, 38, 55, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.3, h * 0.7, 30, 45, 0.1, 0, Math.PI * 2);
      ctx.fill();
      // Australia & islands
      ctx.beginPath();
      ctx.ellipse(w * 0.8, h * 0.75, 25, 20, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Polar ice caps
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.ellipse(w / 2, 8, w / 2, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w / 2, h - 8, w / 2, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'mars': {
      // Rust red terrain with dark volcanic maria
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#b91c1c');
      grad.addColorStop(0.4, '#dc2626');
      grad.addColorStop(0.7, '#ea580c');
      grad.addColorStop(1, '#991b1b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Dark basalt maria regions
      ctx.fillStyle = 'rgba(69, 10, 10, 0.35)';
      ctx.beginPath();
      ctx.ellipse(w * 0.4, h * 0.5, 70, 30, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.75, h * 0.6, 50, 25, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // White polar ice caps
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(w / 2, 6, 60, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w / 2, h - 6, 50, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'jupiter': {
      // Alternating bands of cream, tan, and orange
      const bands = ['#c2410c', '#f59e0b', '#fed7aa', '#b45309', '#fbbf24', '#7c2d12', '#fed7aa', '#d97706'];
      const bandHeight = h / bands.length;
      bands.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, i * bandHeight, w, bandHeight + 1);
      });

      // Great Red Spot vortex
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.ellipse(w * 0.65, h * 0.62, 35, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 3;
      ctx.stroke();
      break;
    }

    case 'saturn': {
      // Soft golden-tan cloud bands
      const bands = ['#ca8a04', '#facc15', '#fef08a', '#eab308', '#d97706', '#fde047'];
      const bandHeight = h / bands.length;
      bands.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, i * bandHeight, w, bandHeight + 1);
      });
      break;
    }

    case 'uranus': {
      // Soft pale cyan-aquamarine gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#7dd3fc');
      grad.addColorStop(1, '#0284c7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'neptune': {
      // Deep azure blue with white storm streaks and Great Dark Spot
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1d4ed8');
      grad.addColorStop(0.5, '#2563eb');
      grad.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Great Dark Spot
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.48, 25, 14, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // White methane cirrus clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(w * 0.42, h * 0.42, 32, 4, 0.1, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    default: {
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, 0, w, h);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache[planetId] = texture;
  return texture;
}

// Procedural Ring Texture with Cassini Division
export function getSaturnRingTexture(): THREE.CanvasTexture {
  if (textureCache['saturn-rings']) {
    return textureCache['saturn-rings'];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    textureCache['saturn-rings'] = fallback;
    return fallback;
  }

  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0.0, 'rgba(214, 180, 120, 0.0)');
  grad.addColorStop(0.1, 'rgba(225, 195, 140, 0.7)');
  grad.addColorStop(0.55, 'rgba(235, 205, 150, 0.85)');
  // Cassini Division gap
  grad.addColorStop(0.60, 'rgba(0, 0, 0, 0.05)');
  grad.addColorStop(0.66, 'rgba(0, 0, 0, 0.05)');
  grad.addColorStop(0.70, 'rgba(210, 175, 120, 0.65)');
  grad.addColorStop(0.95, 'rgba(195, 160, 110, 0.4)');
  grad.addColorStop(1.0, 'rgba(180, 145, 100, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache['saturn-rings'] = texture;
  return texture;
}
