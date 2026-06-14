export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number; // seconds remaining
  maxLife: number;
  active: boolean;
}

const POOL_SIZE = 120;
const COLORS = [
  "var(--color-marigold)",
  "var(--color-leaf)",
  "var(--color-terracotta)",
  "var(--color-wool-pink)",
];

/** Pre-allocated particle pool — avoids GC churn during bursts. */
export function createParticlePool(): Particle[] {
  return Array.from({ length: POOL_SIZE }, () => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    size: 0,
    color: COLORS[0],
    life: 0,
    maxLife: 0,
    active: false,
  }));
}

/** Activates ~12-18 inactive particles at (x, y) to simulate a catch burst. */
export function spawnBurst(pool: Particle[], x: number, y: number, resolvedColors: string[]) {
  const count = 12 + Math.floor(Math.random() * 6);
  let spawned = 0;

  for (const p of pool) {
    if (spawned >= count) break;
    if (p.active) continue;

    const angle = Math.random() * Math.PI * 2;
    const speed = 60 + Math.random() * 140;

    p.x = x;
    p.y = y;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed - 40; // slight upward bias
    p.size = 3 + Math.random() * 4;
    p.color = resolvedColors[Math.floor(Math.random() * resolvedColors.length)];
    p.maxLife = 0.5 + Math.random() * 0.4;
    p.life = p.maxLife;
    p.active = true;

    spawned++;
  }
}

/** Updates and deactivates expired particles. dt in seconds. */
export function updateParticles(pool: Particle[], dt: number) {
  for (const p of pool) {
    if (!p.active) continue;
    p.life -= dt;
    if (p.life <= 0) {
      p.active = false;
      continue;
    }
    p.vy += 220 * dt; // gravity
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
}
