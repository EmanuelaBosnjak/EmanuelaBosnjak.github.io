import { useTheme } from "@/lib/os/theme";
import { Moon, Sun } from "lucide-react";

const swatches: Array<{ name: string; hex: string; token: string }> = [
  { name: "ink", hex: "#07080c", token: "--ink" },
  { name: "fog", hex: "#333c50", token: "--fog" },
  { name: "slate", hex: "#546282", token: "--slate" },
  { name: "frost", hex: "#9cb2e8", token: "--frost" },
  { name: "milk", hex: "#cad9f5", token: "--milk" },
];

export function ThemeApp() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-5">
      <h2 className="text-base font-semibold tracking-tight">Appearance</h2>
      <p className="mono mt-1 text-[11px] text-muted-foreground">choose a mode. the whole desktop follows.</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { id: "dark", label: "Dark | winter forest", Icon: Moon, preview: "linear-gradient(135deg,#07080c,#12203b)" },
          { id: "light", label: "Light | frost morning", Icon: Sun, preview: "linear-gradient(135deg,#eef2fb,#cad9f5)" },
        ].map((opt) => {
          const active = theme === opt.id;
          const Icon = opt.Icon;
          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id as any)}
              className={`focus-ring flex flex-col overflow-hidden rounded-2xl border text-left transition ${active ? "border-[color:var(--frost)]" : "border-[color:var(--window-border)] hover:border-[color:var(--frost)]/60"}`}
            >
              <div className="h-24 w-full" style={{ background: opt.preview }} />
              <div className="flex items-center gap-2 p-3">
                <Icon className="h-4 w-4" />
                <span className="text-sm">{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <h3 className="mono mt-8 text-[10px] uppercase tracking-widest text-muted-foreground">palette</h3>
      <div className="mt-2 grid grid-cols-5 gap-2">
        {swatches.map((s) => (
          <div key={s.name} className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--window-border)" }}>
            <div className="h-14 w-full" style={{ background: s.hex }} />
            <div className="p-2">
              <div className="mono text-[11px]">{s.name}</div>
              <div className="mono text-[10px] text-muted-foreground">{s.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
