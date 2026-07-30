import { useEffect, useRef } from "react";

const SPARK_LIFETIME = 900;
const MIN_DISTANCE = 14;
const MIN_INTERVAL = 34;

export function SparkleCursor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastSpawn = 0;

    const addSpark = (x: number, y: number, delay = 0) => {
      window.setTimeout(() => {
        if (!layer.isConnected) return;

        const spark = document.createElement("span");
        spark.className = "cursor-spark";
        spark.textContent = "✦";
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.setProperty("--spark-drift-x", `${(Math.random() - 0.5) * 12}px`);
        spark.style.setProperty("--spark-drift-y", `${-10 - Math.random() * 10}px`);
        spark.style.setProperty("--spark-rotation", `${(Math.random() - 0.5) * 30}deg`);
        spark.style.setProperty("--spark-scale", `${0.72 + Math.random() * 0.34}`);
        layer.appendChild(spark);

        window.setTimeout(() => spark.remove(), SPARK_LIFETIME + 80);
      }, delay);
    };

    const onMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const now = performance.now();

      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;
        addSpark(x, y);
        lastSpawn = now;
        return;
      }

      const distance = Math.hypot(x - lastX, y - lastY);
      if (distance >= MIN_DISTANCE && now - lastSpawn >= MIN_INTERVAL) {
        addSpark(x, y);
        lastX = x;
        lastY = y;
        lastSpawn = now;
      }
    };

    const onDown = (event: MouseEvent) => {
      for (let i = 0; i < 5; i += 1) {
        addSpark(
          event.clientX + (Math.random() - 0.5) * 18,
          event.clientY + (Math.random() - 0.5) * 18,
          i * 28,
        );
      }
    };

    const resetPosition = () => {
      lastX = null;
      lastY = null;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", resetPosition);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", resetPosition);
      layer.replaceChildren();
    };
  }, []);

  return <div ref={layerRef} className="spark-layer" aria-hidden="true" />;
}
