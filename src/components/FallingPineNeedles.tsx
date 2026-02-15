import { useRef, useEffect } from 'react';

/**
 * Falling pine needles — subtle background canvas animation.
 * Needles drift down slowly, rotating and swaying.
 */
export default function FallingPineNeedles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Needle {
      x: number; y: number;
      rotation: number;
      rotSpeed: number;
      fallSpeed: number;
      swayAmount: number;
      swaySpeed: number;
      length: number;
      opacity: number;
      phase: number;
    }

    const needles: Needle[] = [];
    const COUNT = 35;

    const spawn = (randomY: boolean): Needle => ({
      x: Math.random(),
      y: randomY ? Math.random() : -0.02,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.4,
      fallSpeed: 0.015 + Math.random() * 0.025,
      swayAmount: 0.01 + Math.random() * 0.02,
      swaySpeed: 0.3 + Math.random() * 0.5,
      length: (8 + Math.random() * 14) * dpr,
      opacity: 0.06 + Math.random() * 0.1,
      phase: Math.random() * Math.PI * 2,
    });

    for (let i = 0; i < COUNT; i++) needles.push(spawn(true));

    const animate = (now: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);

      for (const n of needles) {
        n.y += n.fallSpeed / h * dpr;
        const sx = (n.x + Math.sin(t * n.swaySpeed + n.phase) * n.swayAmount) * w;
        const sy = n.y * h;
        n.rotation += n.rotSpeed * 0.008;

        if (n.y > 1.05) {
          Object.assign(n, spawn(false));
        }

        const cos = Math.cos(n.rotation);
        const sin = Math.sin(n.rotation);

        ctx.beginPath();
        ctx.moveTo(sx - cos * n.length / 2, sy - sin * n.length / 2);
        ctx.lineTo(sx + cos * n.length / 2, sy + sin * n.length / 2);
        ctx.strokeStyle = `rgba(62, 90, 58, ${n.opacity})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
