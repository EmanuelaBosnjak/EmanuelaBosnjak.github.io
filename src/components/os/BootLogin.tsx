import { useEffect, useState } from "react";

export function BootLogin({ onLogin }: { onLogin: () => void }) {
  const [phase, setPhase] = useState<"boot" | "login">("boot");
  const [lines, setLines] = useState<string[]>([]);
  const boot = [
    "FrostOS 1.4.0 (winter build)",
    "loading kernel modules ...... [ok]",
    "mounting /home/emanuela ..... [ok]",
    "starting compositor .......... [ok]",
    "warming frost cache .......... [ok]",
    "signal//forest daemon ........ [ready]",
    "",
    "welcome back.",
  ];

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setLines((l) => [...l, boot[i]]);
      i++;
      if (i >= boot.length) {
        clearInterval(id);
        setTimeout(() => setPhase("login"), 350);
      }
    }, 140);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="scanlines noise fixed inset-0 grid place-items-center overflow-hidden"
      style={{ background: "var(--wallpaper)" }}
    >
      {phase === "boot" ? (
        <pre className="mono boot-flicker max-w-[92vw] whitespace-pre-wrap text-left text-xs sm:text-sm text-[color:var(--milk)]">
          {lines.map((l, i) => (
            <div key={i}>
              <span className="text-[color:var(--frost)]">›</span> {l}
            </div>
          ))}
          <span className="blink">▍</span>
        </pre>
      ) : (
        <div className="glass-strong win-in flex w-[min(92vw,420px)] flex-col items-center gap-5 rounded-3xl p-8">
          <div
            className="grid h-24 w-24 place-items-center rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--frost), var(--slate))",
              boxShadow: "0 0 40px -8px var(--frost)",
            }}
          >
            <span className="mono text-2xl font-bold text-[color:var(--ink)]">eb</span>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold tracking-tight">Emanuela Bošnjak Hofmaurerad</h1>
            <p className="mono mt-1 text-xs text-muted-foreground">artist · developer · signal-hunter</p>
          </div>
          <input
            aria-label="Password"
            type="password"
            defaultValue="••••••••"
            readOnly
            className="mono w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--input)] px-3 py-2 text-center text-sm focus-ring"
          />
          <button
            onClick={onLogin}
            className="focus-ring mono w-full rounded-xl bg-[color:var(--frost)] px-4 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:brightness-110"
          >
            log in
          </button>
          <p className="mono text-[10px] text-muted-foreground">no real login, just a visitor session</p>
        </div>
      )}
    </div>
  );
}
