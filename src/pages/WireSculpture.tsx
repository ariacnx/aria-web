import { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Generative wire sculpture — inspired by Ruth Asawa's suspended forms.
 * Full-screen, living art piece.
 */
export default function WireSculpturePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    const dpr = window.devicePixelRatio || 1;

    // Generate looping wire paths
    const NUM_LOOPS = 7;
    const loops: { points: { ax: number; ay: number; bx: number; by: number; freq: number; phase: number }[]; opacity: number; width: number }[] = [];

    for (let l = 0; l < NUM_LOOPS; l++) {
      const numPoints = 10 + Math.floor(Math.random() * 8);
      const points = [];
      const baseRadius = (80 + l * 40) * dpr;
      const verticalStretch = 0.55 + l * 0.08;

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const wobble = (Math.random() - 0.5) * 50 * dpr;
        points.push({
          ax: Math.cos(angle) * (baseRadius + wobble),
          ay: Math.sin(angle) * (baseRadius + wobble) * verticalStretch,
          bx: (Math.random() - 0.5) * 60 * dpr,
          by: (Math.random() - 0.5) * 35 * dpr,
          freq: 0.15 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
        });
      }

      loops.push({
        points,
        opacity: 0.08 + (l / NUM_LOOPS) * 0.18,
        width: (0.8 + l * 0.35) * dpr,
      });
    }

    // Floating dust
    const dots: { angle: number; dist: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 50; i++) {
      dots.push({
        angle: Math.random() * Math.PI * 2,
        dist: 60 * dpr + Math.random() * 200 * dpr,
        speed: 0.05 + Math.random() * 0.2,
        size: (0.6 + Math.random() * 2) * dpr,
      });
    }

    const animate = (now: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const t = now / 1000;

      ctx.clearRect(0, 0, w, h);

      // Wire loops
      for (const loop of loops) {
        ctx.beginPath();
        const pts = loop.points;
        const len = pts.length;

        for (let i = 0; i <= len; i++) {
          const curr = pts[i % len];
          const px = cx + curr.ax + Math.sin(t * curr.freq + curr.phase) * curr.bx;
          const py = cy + curr.ay + Math.cos(t * curr.freq + curr.phase) * curr.by;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            const prev = pts[(i - 1 + len) % len];
            const prevX = cx + prev.ax + Math.sin(t * prev.freq + prev.phase) * prev.bx;
            const prevY = cy + prev.ay + Math.cos(t * prev.freq + prev.phase) * prev.by;
            const midX = (prevX + px) / 2;
            const midY = (prevY + py) / 2;
            ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          }
        }

        ctx.closePath();
        ctx.strokeStyle = `rgba(45, 55, 72, ${loop.opacity * 0.7})`;
        ctx.lineWidth = loop.width;
        ctx.stroke();
      }

      // Cross-connecting mesh threads
      ctx.lineWidth = 0.5 * dpr;
      for (let l = 0; l < loops.length - 1; l++) {
        const loopA = loops[l];
        const loopB = loops[l + 1];
        const connections = Math.min(loopA.points.length, loopB.points.length);

        for (let i = 0; i < connections; i += 2) {
          const a = loopA.points[i];
          const b = loopB.points[i % loopB.points.length];
          const ax = cx + a.ax + Math.sin(t * a.freq + a.phase) * a.bx;
          const ay = cy + a.ay + Math.cos(t * a.freq + a.phase) * a.by;
          const bx = cx + b.ax + Math.sin(t * b.freq + b.phase) * b.bx;
          const by = cy + b.ay + Math.cos(t * b.freq + b.phase) * b.by;

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(45, 55, 72, ${0.03 + Math.sin(t + i) * 0.015})`;
          ctx.stroke();
        }
      }

      // Floating dust particles
      for (const dot of dots) {
        const dx = cx + Math.cos(dot.angle + t * dot.speed) * dot.dist;
        const dy = cy + Math.sin(dot.angle + t * dot.speed) * dot.dist * 0.65;
        const flickr = 0.2 + Math.sin(t * 1.5 + dot.angle * 5) * 0.2;

        ctx.beginPath();
        ctx.arc(dx, dy, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 214, 167, ${flickr})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = draw(canvas);
    return () => {
      cancelAnimationFrame(animRef.current);
      cleanup?.();
    };
  }, [draw]);

  return (
    <div className="fixed inset-0 bg-[#F3F6F4] cursor-crosshair">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Minimal label */}
      <div className="absolute bottom-8 left-8 z-10">
        <p className="font-serif text-xs text-[#2D3748]/30 tracking-widest uppercase">
          After Ruth Asawa · Generative · 2025
        </p>
      </div>

      <Link
        to="/"
        className="absolute top-8 right-8 z-10 font-serif text-xs text-[#2D3748]/30 hover:text-[#2D3748]/60 transition-colors tracking-widest uppercase"
      >
        Back
      </Link>
    </div>
  );
}
