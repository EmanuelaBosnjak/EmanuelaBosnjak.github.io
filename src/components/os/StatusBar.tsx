import { useEffect, useState } from "react";
import { Moon, Sun, Wifi, BatteryFull, Volume2, LogOut } from "lucide-react";
import { useTheme } from "@/lib/os/theme";

export function StatusBar({ hint, onExit }: { hint?: string; onExit?: () => void }) {
  const { theme, toggle } = useTheme();
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-between px-3 text-xs"
      style={{ background: "color-mix(in oklab, var(--window-header) 90%, transparent)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--window-border)" }}
    >
      <div className="flex items-center gap-2">
        <div className="mono flex items-center gap-1.5 font-semibold">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--frost)", boxShadow: "0 0 10px var(--frost)" }} />
          FrostOS
        </div>
        <span className="mono hidden text-muted-foreground sm:inline">/ home / emanuela</span>
      </div>
      {hint && <div className="mono hidden truncate text-muted-foreground md:block">{hint}</div>}
      <div className="mono flex items-center gap-3">
        <Wifi className="hidden h-3.5 w-3.5 sm:block" />
        <Volume2 className="hidden h-3.5 w-3.5 sm:block" />
        <BatteryFull className="hidden h-3.5 w-3.5 sm:block" />
        <button onClick={toggle} aria-label="Toggle theme" className="focus-ring rounded-md p-1 hover:bg-[color:var(--accent)]">
          {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>
        {onExit && (
          <button
            onClick={onExit}
            aria-label="Back to website"
            title="Back to website"
            className="focus-ring flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-[color:var(--accent)]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden md:inline text-[10px]">site</span>
          </button>
        )}
        <span className="hidden sm:inline">{date}</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

