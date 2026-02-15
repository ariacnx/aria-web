import { useRef, useEffect } from 'react';

/**
 * Pine branches with falling needles — ported from Grove app intro.
 * Full-page background with organic branches growing from edges.
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
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.offsetWidth * dpr;
      h = canvas.offsetHeight * dpr;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    // --- Branch generation ---
    interface Branch {
      startX: number; startY: number;
      length: number; angle: number; curve: number;
      thickness: number; depth: number;
      swaySpeed: number; swayAmount: number; phase: number;
      children: Branch[];
      needles: { t: number; angle: number; length: number; swaySpeed: number; phase: number; opacity: number }[];
    }

    const createBranch = (sx: number, sy: number, len: number, angle: number, thick: number, depth: number): Branch => {
      const branch: Branch = {
        startX: sx, startY: sy, length: len, angle,
        curve: (Math.random() - 0.5) * 0.4,
        thickness: thick, depth,
        swaySpeed: 0.12 + Math.random() * 0.2,
        swayAmount: 0.025 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
        children: [], needles: [],
      };

      const needleCount = Math.floor(len / (5 * dpr));
      for (let i = 0; i < needleCount; i++) {
        const t = 0.1 + (i / needleCount) * 0.85;
        for (const side of [-1, 1]) {
          branch.needles.push({
            t, angle: side * (0.25 + Math.random() * 0.55),
            length: (16 + Math.random() * 28) * dpr,
            swaySpeed: 0.3 + Math.random() * 0.6,
            phase: Math.random() * Math.PI * 2,
            opacity: 0.14 + Math.random() * 0.22,
          });
        }
      }

      if (depth < 3 && len > 25 * dpr) {
        const cc = 1 + Math.floor(Math.random() * 2);
        for (let c = 0; c < cc; c++) {
          const ct = 0.35 + Math.random() * 0.4;
          const ex = sx + Math.cos(angle) * len * ct;
          const ey = sy + Math.sin(angle) * len * ct;
          branch.children.push(createBranch(ex, ey, len * (0.4 + Math.random() * 0.3), angle + (Math.random() - 0.5) * 1.2, thick * 0.6, depth + 1));
        }
      }
      return branch;
    };

    // Branches from edges — more than the app version
    const makeBranches = () => {
      const branches: Branch[] = [];
      // Top branches
      branches.push(createBranch(w * 0.7, h * 0.02, h * 0.2, Math.PI * 0.5, 2.5 * dpr, 0));
      branches.push(createBranch(w * 0.3, h * 0.01, h * 0.18, Math.PI * 0.4, 2 * dpr, 0));
      branches.push(createBranch(w * 0.9, h * 0.05, h * 0.15, Math.PI * 0.6, 1.8 * dpr, 0));
      // Left
      branches.push(createBranch(w * 0.02, h * 0.2, h * 0.16, -0.2, 2 * dpr, 0));
      branches.push(createBranch(w * 0.01, h * 0.5, h * 0.12, -0.1, 1.5 * dpr, 1));
      // Right
      branches.push(createBranch(w * 0.98, h * 0.35, h * 0.14, Math.PI + 0.2, 1.8 * dpr, 0));
      branches.push(createBranch(w * 0.95, h * 0.65, h * 0.1, Math.PI + 0.3, 1.5 * dpr, 1));
      // Bottom accent
      branches.push(createBranch(w * 0.5, h * 0.98, h * 0.12, -Math.PI * 0.45, 1.5 * dpr, 1));
      return branches;
    };

    let branches = makeBranches();

    // Falling needles — lots of them
    interface FallingNeedle {
      x: number; y: number; rotation: number; rotSpeed: number;
      fallSpeed: number; swayAmount: number; swaySpeed: number;
      length: number; opacity: number; phase: number;
    }

    const fallingNeedles: FallingNeedle[] = [];
    for (let i = 0; i < 60; i++) {
      fallingNeedles.push({
        x: Math.random() * w, y: Math.random() * h,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.5,
        fallSpeed: (0.1 + Math.random() * 0.22) * dpr,
        swayAmount: (15 + Math.random() * 25) * dpr,
        swaySpeed: 0.15 + Math.random() * 0.35,
        length: (10 + Math.random() * 16) * dpr,
        opacity: 0.08 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Falling whole leaf clusters — small branch segments with needles
    interface FallingLeaf {
      x: number; y: number;
      rotation: number; rotSpeed: number;
      fallSpeed: number; swayAmount: number; swaySpeed: number;
      stemLength: number; needleCount: number; needleLength: number;
      opacity: number; phase: number;
    }

    const fallingLeaves: FallingLeaf[] = [];
    for (let i = 0; i < 12; i++) {
      fallingLeaves.push({
        x: Math.random() * w, y: Math.random() * h,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        fallSpeed: (0.08 + Math.random() * 0.15) * dpr,
        swayAmount: (20 + Math.random() * 35) * dpr,
        swaySpeed: 0.1 + Math.random() * 0.25,
        stemLength: (25 + Math.random() * 35) * dpr,
        needleCount: 4 + Math.floor(Math.random() * 5),
        needleLength: (12 + Math.random() * 18) * dpr,
        opacity: 0.1 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawBranch = (b: Branch, t: number) => {
      const sway = Math.sin(t * b.swaySpeed + b.phase) * b.swayAmount;
      const angle = b.angle + sway;

      ctx.beginPath();
      ctx.moveTo(b.startX, b.startY);
      const segs = 10;
      for (let i = 1; i <= segs; i++) {
        const f = i / segs;
        const co = Math.sin(f * Math.PI) * b.curve * b.length * 0.3;
        ctx.lineTo(
          b.startX + Math.cos(angle) * b.length * f + Math.cos(angle + Math.PI / 2) * co,
          b.startY + Math.sin(angle) * b.length * f + Math.sin(angle + Math.PI / 2) * co
        );
      }
      ctx.strokeStyle = `rgba(62, 90, 58, 0.15)`;
      ctx.lineWidth = b.thickness;
      ctx.lineCap = 'round';
      ctx.stroke();

      for (const n of b.needles) {
        const f = n.t;
        const co = Math.sin(f * Math.PI) * b.curve * b.length * 0.3;
        const bx = b.startX + Math.cos(angle) * b.length * f + Math.cos(angle + Math.PI / 2) * co;
        const by = b.startY + Math.sin(angle) * b.length * f + Math.sin(angle + Math.PI / 2) * co;
        const ns = Math.sin(t * n.swaySpeed + n.phase) * 0.12;
        const na = angle + n.angle + ns;

        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(na) * n.length, by + Math.sin(na) * n.length);
        ctx.strokeStyle = `rgba(62, 90, 58, ${n.opacity})`;
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();
      }

      for (const child of b.children) {
        const f = 0.5;
        const co = Math.sin(f * Math.PI) * b.curve * b.length * 0.3;
        child.startX = b.startX + Math.cos(angle) * b.length * f + Math.cos(angle + Math.PI / 2) * co;
        child.startY = b.startY + Math.sin(angle) * b.length * f + Math.sin(angle + Math.PI / 2) * co;
        drawBranch(child, t);
      }
    };

    const animate = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);

      for (const b of branches) drawBranch(b, t);

      for (const n of fallingNeedles) {
        n.y += n.fallSpeed;
        n.x += Math.sin(t * n.swaySpeed + n.phase) * 0.3 * dpr;
        n.rotation += n.rotSpeed * 0.01;
        if (n.y > h + 20) { n.y = -20; n.x = Math.random() * w; }

        const cos = Math.cos(n.rotation);
        const sin = Math.sin(n.rotation);
        ctx.beginPath();
        ctx.moveTo(n.x - cos * n.length / 2, n.y - sin * n.length / 2);
        ctx.lineTo(n.x + cos * n.length / 2, n.y + sin * n.length / 2);
        ctx.strokeStyle = `rgba(62, 90, 58, ${n.opacity})`;
        ctx.lineWidth = 1 * dpr;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Draw falling whole leaves
      for (const lf of fallingLeaves) {
        lf.y += lf.fallSpeed;
        lf.x += Math.sin(t * lf.swaySpeed + lf.phase) * 0.25 * dpr;
        lf.rotation += lf.rotSpeed * 0.006;
        if (lf.y > h + 40) { lf.y = -60; lf.x = Math.random() * w; }

        const cx = lf.x + Math.sin(t * lf.swaySpeed + lf.phase) * lf.swayAmount;
        const cy = lf.y;
        const cos = Math.cos(lf.rotation);
        const sin = Math.sin(lf.rotation);

        // Draw stem
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + cos * lf.stemLength, cy + sin * lf.stemLength);
        ctx.strokeStyle = `rgba(62, 90, 58, ${lf.opacity * 1.2})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw needles along stem
        for (let ni = 0; ni < lf.needleCount; ni++) {
          const nt = 0.15 + (ni / lf.needleCount) * 0.75;
          const nx = cx + cos * lf.stemLength * nt;
          const ny = cy + sin * lf.stemLength * nt;
          const nSway = Math.sin(t * 0.8 + ni * 1.5 + lf.phase) * 0.1;

          for (const side of [-1, 1]) {
            const na = lf.rotation + side * (0.4 + nSway);
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(nx + Math.cos(na) * lf.needleLength, ny + Math.sin(na) * lf.needleLength);
            ctx.strokeStyle = `rgba(62, 90, 58, ${lf.opacity})`;
            ctx.lineWidth = 1 * dpr;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      resize();
      branches = makeBranches();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
