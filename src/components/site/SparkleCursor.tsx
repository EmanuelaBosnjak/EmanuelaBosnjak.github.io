import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };

export function SparkleCursor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let parts: P[] = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number) => {
      const n = 1 + Math.round(Math.random());
      for (let i = 0; i < n; i++) {
        if (parts.length > 180) break;
        parts.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.15 - Math.random() * 0.5,
          life: 0,
          max: 400 + Math.random() * 500,
          size: 0.8 + Math.random() * 1.8,
          hue: 200 + Math.random() * 60,
        });
      }
    };

    const onMove = (e: PointerEvent) => spawn(e.clientX, e.clientY);

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);
      parts = parts.filter((p) => p.life < p.max);
      for (const p of parts) {
        p.life += dt;
        p.x += p.vx;
        p.y += p.vy;
        const t = 1 - p.life / p.max;
        ctx.globalAlpha = Math.max(0, t) * 0.9;
        ctx.fillStyle = `hsl(${p.hue} 80% 82%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * t, 0, Math.PI * 2);
        ctx.fill();
        // tiny cross sparkle
        ctx.strokeStyle = `hsl(${p.hue} 90% 90% / ${Math.max(0, t) * 0.5})`;
        ctx.lineWidth = 0.6;
        const r = p.size * 2.4 * t;
        ctx.beginPath();
        ctx.moveTo(p.x - r, p.y);
        ctx.lineTo(p.x + r, p.y);
        ctx.moveTo(p.x, p.y - r);
        ctx.lineTo(p.x, p.y + r);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="spark-canvas" aria-hidden />;
}

