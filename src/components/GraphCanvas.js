import React, { useRef, useEffect } from 'react';

/**
 * Force-directed particle graph rendered on a canvas.
 *
 * Nodes drift, link to nearby neighbours and are pushed away by the cursor.
 * Written directly against requestAnimationFrame rather than pulling in a
 * physics library — the whole simulation is a few hundred lines of vector
 * math and the render loop needs to stay cheap enough to sit behind text.
 *
 * Neighbour lookup goes through a uniform spatial hash so link-finding is
 * roughly O(n) instead of the O(n^2) a naive pass would cost; at 90 nodes
 * that is the difference between a comfortable frame budget and a janky one
 * on integrated graphics.
 */

const PALETTE = ['#42A6E3', '#8B5CF6', '#FF56F6', '#3BACE2'];

const CONFIG = {
  density: 11000, // one node per N square pixels
  maxNodes: 90,
  minNodes: 26,
  linkDistance: 148,
  cursorRadius: 170,
  cursorForce: 0.55,
  drift: 0.14,
  friction: 0.94,
  nodeRadius: [1.3, 2.9],
};

class SpatialHash {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cells = new Map();
  }

  clear() {
    this.cells.clear();
  }

  insert(node) {
    const k = ((node.x / this.cellSize) | 0) + ':' + ((node.y / this.cellSize) | 0);
    const bucket = this.cells.get(k);
    if (bucket) bucket.push(node);
    else this.cells.set(k, [node]);
  }

  // Only scans the cells forward of the current one, so each pair is visited
  // exactly once and links are never drawn twice.
  forEachNeighbour(node, fn) {
    const cx = (node.x / this.cellSize) | 0;
    const cy = (node.y / this.cellSize) | 0;
    const offsets = [
      [0, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];
    for (let i = 0; i < offsets.length; i++) {
      const bucket = this.cells.get(cx + offsets[i][0] + ':' + (cy + offsets[i][1]));
      if (!bucket) continue;
      for (let j = 0; j < bucket.length; j++) {
        const other = bucket[j];
        if (other !== node) fn(other);
      }
    }
  }
}

const GraphCanvas = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef({ nodes: [], w: 0, h: 0 });
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = stateRef.current;
    const grid = new SpatialHash(CONFIG.linkDistance);

    const spawn = (w, h) => {
      const target = Math.round((w * h) / CONFIG.density);
      const count = Math.max(CONFIG.minNodes, Math.min(CONFIG.maxNodes, target));
      const [rMin, rMax] = CONFIG.nodeRadius;
      state.nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * CONFIG.drift,
        vy: (Math.random() - 0.5) * CONFIG.drift,
        r: rMin + Math.random() * (rMax - rMin),
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Cap DPR at 2 — beyond that the extra pixels cost real frame time and
      // buy nothing visible on a background layer.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.w = rect.width;
      state.h = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn(rect.width, rect.height);
    };

    const step = () => {
      const { nodes, w, h } = state;
      const pointer = pointerRef.current;
      ctx.clearRect(0, 0, w, h);

      grid.clear();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!reduced) {
          // Cursor repulsion, falling off linearly to the edge of its radius.
          if (pointer.active) {
            const dx = n.x - pointer.x;
            const dy = n.y - pointer.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONFIG.cursorRadius * CONFIG.cursorRadius && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const falloff = (1 - dist / CONFIG.cursorRadius) * CONFIG.cursorForce;
              n.vx += (dx / dist) * falloff;
              n.vy += (dy / dist) * falloff;
            }
          }

          n.vx *= CONFIG.friction;
          n.vy *= CONFIG.friction;

          // Keep a floor on speed so the field never settles into stillness.
          const speed = Math.hypot(n.vx, n.vy);
          if (speed < CONFIG.drift * 0.4) {
            n.vx += (Math.random() - 0.5) * 0.05;
            n.vy += (Math.random() - 0.5) * 0.05;
          }

          n.x += n.vx;
          n.y += n.vy;

          // Wrap rather than bounce: no visible collisions at the edges.
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }

        grid.insert(n);
      }

      // Links first, so nodes render on top of them.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        grid.forEachNeighbour(n, (other) => {
          const dx = n.x - other.x;
          const dy = n.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > CONFIG.linkDistance * CONFIG.linkDistance) return;
          const alpha = (1 - Math.sqrt(distSq) / CONFIG.linkDistance) * 0.32;
          ctx.strokeStyle = 'rgba(139, 122, 246, ' + alpha + ')';
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        });
      }

      ctx.globalAlpha = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(step);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    // Pause offscreen: no reason to burn frames the visitor cannot see.
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(rafRef.current);
        if (entry.isIntersecting) rafRef.current = requestAnimationFrame(step);
      },
      { threshold: 0 }
    );

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    resize();
    observer.observe(canvas);
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className={'absolute inset-0 w-full h-full pointer-events-none ' + className}
    />
  );
};

export default GraphCanvas;
