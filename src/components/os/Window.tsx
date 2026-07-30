import { useEffect, useRef, useState, type ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";

export type WindowState = {
  id: string;
  title: string;
  x: number; y: number;
  w: number; h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type Props = {
  state: WindowState;
  onChange: (s: Partial<WindowState>) => void;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  isMobile: boolean;
  children: ReactNode;
};

export function Window({ state, onChange, onClose, onFocus, onMinimize, isMobile, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => {
      onChange({ x: Math.max(4, e.clientX - drag.dx), y: Math.max(44, e.clientY - drag.dy) });
    };
    const up = () => setDrag(null);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag, onChange]);

  if (state.minimized) return null;

  const style: React.CSSProperties = isMobile
    ? { position: "fixed", left: 6, right: 60, top: 40, bottom: 22, zIndex: state.z }
    : state.maximized
      ? { position: "fixed", left: 8, top: 44, right: 72, bottom: 8, zIndex: state.z }
      : { position: "absolute", left: state.x, top: state.y, width: state.w, height: state.h, zIndex: state.z };


  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={state.title}
      className="glass win-in flex flex-col overflow-hidden rounded-2xl shadow-2xl"
      style={{ ...style, boxShadow: "var(--glow)" }}
      onPointerDown={onFocus}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 select-none"
        style={{ background: "var(--window-header)", borderBottom: "1px solid var(--window-border)" }}
        onPointerDown={(e) => {
          if (isMobile || state.maximized) return;
          if ((e.target as HTMLElement).closest("button")) return;
          const rect = ref.current!.getBoundingClientRect();
          setDrag({ dx: e.clientX - rect.left, dy: e.clientY - rect.top });
        }}
        onDoubleClick={() => !isMobile && onChange({ maximized: !state.maximized })}
      >
        <div className="flex gap-1.5">
          <button aria-label="Close" onClick={onClose}
            className="focus-ring grid h-3.5 w-3.5 place-items-center rounded-full bg-[#e57373] text-transparent hover:text-black/60">
            <X className="h-2.5 w-2.5" />
          </button>
          <button aria-label="Minimize" onClick={onMinimize}
            className="focus-ring grid h-3.5 w-3.5 place-items-center rounded-full bg-[#d9b26a] text-transparent hover:text-black/60">
            <Minus className="h-2.5 w-2.5" />
          </button>
          <button aria-label="Maximize" onClick={() => onChange({ maximized: !state.maximized })}
            className="focus-ring grid h-3.5 w-3.5 place-items-center rounded-full bg-[#7fb69a] text-transparent hover:text-black/60">
            <Square className="h-2 w-2" />
          </button>
        </div>
        <div className="mono ml-2 text-xs text-muted-foreground truncate">{state.title}</div>
      </div>
      <div className="os-scroll relative flex-1 overflow-auto">{children}</div>
    </div>
  );
}

