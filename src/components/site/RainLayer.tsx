import { useEffect, useRef } from "react";

type Drop = { x: number; y: number; len: number; speed: number; alpha: number };

export function RainLayer() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let drops: Drop[] = [];
    let raf = 0;

    const make = (): Drop => ({
      x: Math.random() * w,
      y: Math.random() * -h,
      len: 8 + Math.random() * 18,
      speed: 3 + Math.random() * 6,
      alpha: 0.12 + Math.random() * 0.3,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(220, Math.max(60, w / 7)));
      drops = Array.from({ length: count }, make);
    };

    const color = () =>
      document.documentElement.classList.contains("light") ? "120,145,195" : "156,178,232";

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const c = color();
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.strokeStyle = `rgba(${c},${d.alpha})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.2, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        d.x -= 0.35;
        if (d.y > h) {
          d.y = -20 - Math.random() * 80;
          d.x = Math.random() * w;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="rain-canvas" aria-hidden />;
}

