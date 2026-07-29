import { useEffect, useMemo, useState } from "react";
import { FolderOpen, Mail, Compass, TerminalSquare, Palette } from "lucide-react";
import { BootLogin } from "./BootLogin";
import { StatusBar } from "./StatusBar";
import { Window, type WindowState } from "./Window";
import { FilesApp } from "./apps/Files";
import { MailApp } from "./apps/Mail";
import { BrowseApp } from "./apps/Browse";
import { TerminalApp } from "./apps/Terminal";
import { ThemeApp } from "./apps/ThemeApp";

type AppId = "files" | "mail" | "browse" | "terminal" | "theme";

const APPS: Array<{ id: AppId; title: string; Icon: any; defaultSize: { w: number; h: number } }> = [
  { id: "files", title: "Files", Icon: FolderOpen, defaultSize: { w: 780, h: 520 } },
  { id: "mail", title: "Mail", Icon: Mail, defaultSize: { w: 820, h: 540 } },
  { id: "browse", title: "Browse", Icon: Compass, defaultSize: { w: 820, h: 560 } },
  { id: "terminal", title: "Terminal — SIGNAL//FOREST", Icon: TerminalSquare, defaultSize: { w: 780, h: 520 } },
  { id: "theme", title: "Theme", Icon: Palette, defaultSize: { w: 560, h: 480 } },
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export function FrostOS({ onExit }: { onExit?: () => void }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const isMobile = useIsMobile();

  const [windows, setWindows] = useState<Record<AppId, WindowState | null>>({
    files: null, mail: null, browse: null, terminal: null, theme: null,
  });
  const [zTop, setZTop] = useState(10);

  const open = (id: AppId) => {
    setWindows((prev) => {
      const existing = prev[id];
      const app = APPS.find((a) => a.id === id)!;
      const newZ = zTop + 1;
      setZTop(newZ);
      if (existing) {
        return { ...prev, [id]: { ...existing, minimized: false, z: newZ } };
      }
      const count = Object.values(prev).filter(Boolean).length;
      return {
        ...prev,
        [id]: {
          id,
          title: app.title,
          x: 60 + count * 30,
          y: 70 + count * 24,
          w: app.defaultSize.w,
          h: app.defaultSize.h,
          z: newZ,
          minimized: false,
          maximized: false,
        },
      };
    });
  };

  const close = (id: AppId) => setWindows((prev) => ({ ...prev, [id]: null }));
  const minimize = (id: AppId) => setWindows((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id]!, minimized: true } } : prev));
  const focus = (id: AppId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      const newZ = zTop + 1;
      setZTop(newZ);
      return { ...prev, [id]: { ...prev[id]!, z: newZ } };
    });
  };
  const update = (id: AppId, patch: Partial<WindowState>) =>
    setWindows((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id]!, ...patch } } : prev));

  const openWins = useMemo(() => Object.values(windows).filter(Boolean) as WindowState[], [windows]);
  const anyOpen = openWins.some((w) => !w.minimized);

  const renderApp = (id: AppId) => {
    switch (id) {
      case "files": return <FilesApp />;
      case "mail": return <MailApp />;
      case "browse": return <BrowseApp />;
      case "terminal": return <TerminalApp />;
      case "theme": return <ThemeApp />;
    }
  };

  if (!loggedIn) return <BootLogin onLogin={() => { setLoggedIn(true); open("files"); }} />;

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden" style={{ background: "var(--wallpaper)" }}>
      <StatusBar hint={!anyOpen ? "welcome — pick an app from the dock" : undefined} onExit={onExit} />

      {/* Desktop icons — clickable on every screen size */}
      <div className="pointer-events-none absolute inset-x-0 top-9 bottom-0 select-none">
        <div className="pointer-events-auto grid grid-cols-3 gap-2 p-3 pr-16 sm:w-28 sm:grid-cols-1 sm:gap-4 sm:p-4 sm:pr-4">
          {APPS.map((a) => {
            const Icon = a.Icon;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => open(a.id)}
                aria-label={`Open ${a.title}`}
                className="focus-ring flex flex-col items-center gap-1 rounded-xl p-2 text-center transition hover:bg-white/5 active:scale-95"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl border" style={{ borderColor: "var(--window-border)", background: "color-mix(in oklab, var(--ink) 40%, transparent)" }}>
                  <Icon className="h-5 w-5" style={{ color: "var(--frost)" }} />
                </div>
                <span className="mono text-[10px] text-[color:var(--milk)]" style={{ textShadow: "0 1px 4px rgba(0,0,0,.6)" }}>{a.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>


      {/* Welcome hint when nothing is open */}
      {!anyOpen && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center px-6">
          <div className="glass-strong pointer-events-auto max-w-md rounded-3xl p-6 text-center">
            <div className="mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">FrostOS · session</div>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">welcome, visitor</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              this is Emanuela's desktop portfolio. open <span className="mono text-foreground">Files</span> for artwork, <span className="mono text-foreground">Mail</span> to write, or <span className="mono text-foreground">Terminal</span> for a small game.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {APPS.map((a) => (
                <button key={a.id} onClick={() => open(a.id)} className="focus-ring mono rounded-full border px-3 py-1 text-[11px] hover:bg-[color:var(--accent)]" style={{ borderColor: "var(--window-border)" }}>
                  {a.title.split(" ")[0].toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Windows layer */}
      <main className="relative flex-1" role="main">
        {openWins.map((w) => (
          <Window
            key={w.id}
            state={w}
            isMobile={isMobile}
            onChange={(patch) => update(w.id as AppId, patch)}
            onClose={() => close(w.id as AppId)}
            onFocus={() => focus(w.id as AppId)}
            onMinimize={() => minimize(w.id as AppId)}
          >
            {renderApp(w.id as AppId)}
          </Window>
        ))}
      </main>

      {/* Dock — right side rail */}
      <nav
        aria-label="Dock"
        className="glass-strong pointer-events-auto fixed top-1/2 right-2 z-50 flex -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl px-1.5 py-2"
        style={{ boxShadow: "var(--glow)" }}
      >
        {APPS.map((a) => {
          const Icon = a.Icon;
          const w = windows[a.id];
          const active = !!w && !w.minimized;
          return (
            <button
              key={a.id}
              onClick={() => (w && !w.minimized ? minimize(a.id) : open(a.id))}
              className="focus-ring group relative grid h-10 w-10 place-items-center rounded-xl transition hover:-translate-x-0.5 hover:bg-[color:var(--accent)] sm:h-11 sm:w-11"
              aria-label={a.title}
              title={a.title}
            >
              <Icon className="h-5 w-5" style={{ color: active ? "var(--frost)" : undefined }} />
              <span
                className="absolute -left-0.5 h-1 w-1 rounded-full"
                style={{ background: active ? "var(--frost)" : w ? "var(--slate)" : "transparent" }}
              />
            </button>
          );
        })}
      </nav>

      {/* Signature */}
      <div className="pointer-events-none fixed bottom-1 left-1/2 z-40 -translate-x-1/2">
        <span className="mono text-[10px] text-[color:var(--milk)]/60">made with &lt;3 emanuelabosnjak hofmaurerad</span>
      </div>

    </div>
  );
}

