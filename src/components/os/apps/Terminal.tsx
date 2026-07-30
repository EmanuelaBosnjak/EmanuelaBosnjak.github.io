import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/lib/os/theme";

const GRID_W = 15;
const GRID_H = 11;
const FRAGMENT_COUNT = 5;

type Pt = { x: number; y: number };
type Line = { text: string; kind?: "sys" | "err" | "ok" };

const rand = (n: number) => Math.floor(Math.random() * n);
const key = (p: Pt) => `${p.x},${p.y}`;

function initGame() {
  const player: Pt = { x: 1, y: 1 };
  const fragments: Pt[] = [];
  while (fragments.length < FRAGMENT_COUNT) {
    const p = { x: rand(GRID_W), y: rand(GRID_H) };
    if ((p.x !== player.x || p.y !== player.y) && !fragments.some((f) => f.x === p.x && f.y === p.y)) fragments.push(p);
  }
  const shadows: Array<Pt & { dx: number; dy: number }> = [];
  for (let i = 0; i < 3; i++) {
    shadows.push({
      x: rand(GRID_W),
      y: rand(GRID_H),
      dx: Math.random() < 0.5 ? -1 : 1,
      dy: Math.random() < 0.5 ? -1 : 1,
    });
  }
  return { player, fragments, shadows, score: 0, over: false as boolean, won: false as boolean };
}

export function TerminalApp() {
  const { theme, toggle, setTheme } = useTheme();
  const [game, setGame] = useState(initGame);
  const [tick, setTick] = useState(0);
  const gameRef = useRef(game);
  gameRef.current = game;

  const [lines, setLines] = useState<Line[]>([
    { text: "frostos terminal | v1.4", kind: "sys" },
    { text: "type 'help' for commands. arrow keys / wasd to move signal. touch dpad on mobile.", kind: "sys" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = useCallback((l: Line | Line[]) => {
    setLines((prev) => [...prev, ...(Array.isArray(l) ? l : [l])]);
  }, []);

  const move = useCallback((dx: number, dy: number) => {
    setGame((g) => {
      if (g.over || g.won) return g;
      const nx = Math.max(0, Math.min(GRID_W - 1, g.player.x + dx));
      const ny = Math.max(0, Math.min(GRID_H - 1, g.player.y + dy));
      const player = { x: nx, y: ny };
      let fragments = g.fragments;
      let score = g.score;
      if (fragments.some((f) => f.x === nx && f.y === ny)) {
        fragments = fragments.filter((f) => !(f.x === nx && f.y === ny));
        score += 1;
      }
      const hit = g.shadows.some((s) => s.x === nx && s.y === ny);
      const won = fragments.length === 0;
      return { ...g, player, fragments, score, over: hit, won };
    });
  }, []);

  // Ambient shadow drift
  useEffect(() => {
    const id = setInterval(() => {
      setGame((g) => {
        if (g.over || g.won) return g;
        const shadows = g.shadows.map((s) => {
          let dx = s.dx, dy = s.dy;
          if (Math.random() < 0.2) dx = Math.random() < 0.5 ? -1 : 1;
          if (Math.random() < 0.2) dy = Math.random() < 0.5 ? -1 : 1;
          let x = s.x + dx, y = s.y + dy;
          if (x < 0 || x >= GRID_W) { dx = -dx; x = s.x + dx; }
          if (y < 0 || y >= GRID_H) { dy = -dy; y = s.y + dy; }
          return { x, y, dx, dy };
        });
        const hit = shadows.some((s) => s.x === g.player.x && s.y === g.player.y);
        return { ...g, shadows, over: g.over || hit };
      });
      setTick((t) => t + 1);
    }, 650);
    return () => clearInterval(id);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") {
        // still allow arrows for gameplay from the prompt
      }
      const k = e.key.toLowerCase();
      if (["arrowup", "w"].includes(k)) { e.preventDefault(); move(0, -1); }
      else if (["arrowdown", "s"].includes(k)) { e.preventDefault(); move(0, 1); }
      else if (["arrowleft", "a"].includes(k)) { e.preventDefault(); move(-1, 0); }
      else if (["arrowright", "d"].includes(k)) { e.preventDefault(); move(1, 0); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    push({ text: `» ${raw}` });
    if (cmd === "help") {
      push([
        { text: "commands:" },
        { text: "  help         this list" },
        { text: "  about        who runs this desktop" },
        { text: "  gallery      hint about the files app" },
        { text: "  theme        toggle light / dark" },
        { text: "  theme dark   force dark" },
        { text: "  theme light  force light" },
        { text: "  reset        reset SIGNAL//FOREST" },
        { text: "  clear        clear the screen" },
        { text: "controls: arrows / wasd move the signal." },
      ]);
    } else if (cmd === "about") {
      push([
        { text: "emanuela bošnjak hofmaurerad" },
        { text: "artist · developer · signal-hunter" },
        { text: "this is FrostOS, a fictional desktop portfolio." },
      ]);
    } else if (cmd === "gallery") {
      push({ text: "open Files → Gallery. the good stuff lives there.", kind: "ok" });
    } else if (cmd === "theme") {
      toggle();
      push({ text: `theme → ${theme === "dark" ? "light" : "dark"}`, kind: "ok" });
    } else if (cmd === "theme dark") { setTheme("dark"); push({ text: "theme → dark", kind: "ok" }); }
    else if (cmd === "theme light") { setTheme("light"); push({ text: "theme → light", kind: "ok" }); }
    else if (cmd === "reset") { setGame(initGame()); push({ text: "signal//forest reset.", kind: "ok" }); }
    else if (cmd === "clear") { setLines([]); }
    else if (cmd === "sudo") { push({ text: "nice try.", kind: "err" }); }
    else if (cmd === "wolf") { push({ text: "the wolf and the signal have an agreement.", kind: "sys" }); }
    else { push({ text: `command not found: ${cmd}. try 'help'.`, kind: "err" }); }
  };

  const cells: string[][] = [];
  for (let y = 0; y < GRID_H; y++) {
    const row: string[] = [];
    for (let x = 0; x < GRID_W; x++) row.push("·");
    cells.push(row);
  }
  game.fragments.forEach((f) => (cells[f.y][f.x] = "◆"));
  game.shadows.forEach((s) => (cells[s.y][s.x] = "▓"));
  cells[game.player.y][game.player.x] = "◉";

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_260px]" style={{ background: "color-mix(in oklab, var(--ink) 45%, transparent)" }}>
      <div className="mono flex min-h-0 flex-col p-3 text-[12.5px]">
        <div ref={scrollRef} className="os-scroll flex-1 overflow-auto pr-2">
          {lines.map((l, i) => (
            <div key={i} className={l.kind === "err" ? "text-[color:var(--destructive)]" : l.kind === "ok" ? "text-[color:var(--frost)]" : l.kind === "sys" ? "text-muted-foreground" : ""}>
              {l.text}
            </div>
          ))}
        </div>
        <form
          className="mt-2 flex items-center gap-2"
          onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }}
        >
          <span className="text-[color:var(--frost)]">emanuela@frostos:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="focus-ring flex-1 bg-transparent outline-none"
            autoFocus
            aria-label="Terminal input"
          />
        </form>
      </div>

      <aside className="flex flex-col gap-3 border-t p-3 md:border-t-0 md:border-l" style={{ borderColor: "var(--window-border)" }}>
        <div className="flex items-center justify-between">
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">SIGNAL//FOREST</div>
          <div className="mono text-[11px]">
            <span className="text-[color:var(--frost)]">◆</span> {game.score}/{FRAGMENT_COUNT}
          </div>
        </div>
        <div
          className="mono select-none overflow-hidden rounded-lg p-2 text-center leading-[1.1] tracking-[0.15em]"
          style={{ background: "color-mix(in oklab, var(--ink) 70%, transparent)", border: "1px solid var(--window-border)", fontSize: "clamp(10px, 2.2vw, 14px)" }}
          aria-hidden
          data-tick={tick}
        >
          {cells.map((row, y) => (
            <div key={y}>
              {row.map((c, x) => (
                <span
                  key={x}
                  style={{
                    color:
                      c === "◉" ? "var(--frost)" :
                      c === "◆" ? "var(--milk)" :
                      c === "▓" ? "color-mix(in oklab, var(--slate) 80%, transparent)" :
                      "color-mix(in oklab, var(--slate) 40%, transparent)",
                    textShadow: c === "◉" ? "0 0 10px var(--frost)" : undefined,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
        {(game.over || game.won) && (
          <div className="mono rounded-lg border p-2 text-center text-[11px]" style={{ borderColor: "var(--window-border)" }}>
            {game.won ? "✦ signal cleared the grid ✦" : "the shadow caught the signal."}
            <button onClick={() => setGame(initGame())} className="focus-ring mono ml-2 rounded bg-[color:var(--frost)] px-2 py-0.5 text-[10px] text-[color:var(--ink)]">reset</button>
          </div>
        )}
        <div className="grid grid-cols-3 gap-1 md:hidden">
          <div />
          <button onPointerDown={() => move(0, -1)} className="focus-ring rounded-lg border py-2" style={{ borderColor: "var(--window-border)" }}>↑</button>
          <div />
          <button onPointerDown={() => move(-1, 0)} className="focus-ring rounded-lg border py-2" style={{ borderColor: "var(--window-border)" }}>←</button>
          <button onPointerDown={() => move(0, 1)} className="focus-ring rounded-lg border py-2" style={{ borderColor: "var(--window-border)" }}>↓</button>
          <button onPointerDown={() => move(1, 0)} className="focus-ring rounded-lg border py-2" style={{ borderColor: "var(--window-border)" }}>→</button>
        </div>
        <div className="mono text-[10px] leading-relaxed text-muted-foreground">
          collect all {FRAGMENT_COUNT} frost fragments. avoid drifting shadows. try <span className="text-[color:var(--frost)]">help</span> in the prompt.
        </div>
      </aside>
    </div>
  );
}
