import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CakeSlice, Camera, Languages, Moon, Palette, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "@/lib/os/theme";
import { RainLayer } from "@/components/site/RainLayer";
import { SparkleCursor } from "@/components/site/SparkleCursor";

export type SiteLanguage = "en" | "sr";

type FrostSubpageProps = {
  active: "commissions" | "photography" | "baking";
  eyebrow: Record<SiteLanguage, string>;
  title: Record<SiteLanguage, string>;
  subtitle: Record<SiteLanguage, string>;
  children: (language: SiteLanguage) => ReactNode;
};

const PAGE_LINKS = [
  { id: "commissions", to: "/commissions" as const, en: "commissions", sr: "narudžbine", Icon: Palette },
  { id: "photography", to: "/photography" as const, en: "photography", sr: "fotografija", Icon: Camera },
  { id: "baking", to: "/baking" as const, en: "baking", sr: "pečenje", Icon: CakeSlice },
] as const;

export function FrostSubpage(props: FrostSubpageProps) {
  return (
    <ThemeProvider>
      <FrostSubpageInner {...props} />
    </ThemeProvider>
  );
}

function FrostSubpageInner({ active, eyebrow, title, subtitle, children }: FrostSubpageProps) {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const { theme, toggle } = useTheme();

  return (
    <div className="retro-bg os-scroll relative h-dvh overflow-y-auto overflow-x-hidden">
      <RainLayer />
      <SparkleCursor />

      <div className="relative z-10 mx-auto w-full max-w-[980px] px-2 py-3 sm:px-4 sm:py-5">
        <header className="bevel rounded-md p-3 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              to="/"
              className="bevel focus-ring mono inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] text-[color:var(--milk)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {language === "sr" ? "nazad na portfolio" : "back to portfolio"}
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                className="bevel focus-ring mono inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] text-[color:var(--milk)]"
                aria-label={language === "sr" ? "Promeni temu" : "Toggle theme"}
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {theme === "dark" ? (language === "sr" ? "svetlo" : "lights on") : (language === "sr" ? "tamno" : "lights off")}
              </button>
              <div className="bevel mono flex items-center gap-1 rounded-sm px-1.5 py-1 text-[11px] text-[color:var(--milk)]">
                <Languages className="h-3.5 w-3.5" aria-hidden />
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`focus-ring rounded-sm px-1.5 py-0.5 ${language === "en" ? "bevel-in font-bold text-[color:var(--frost)]" : ""}`}
                  aria-pressed={language === "en"}
                >
                  EN
                </button>
                <span aria-hidden>/</span>
                <button
                  type="button"
                  onClick={() => setLanguage("sr")}
                  className={`focus-ring rounded-sm px-1.5 py-0.5 ${language === "sr" ? "bevel-in font-bold text-[color:var(--frost)]" : ""}`}
                  aria-pressed={language === "sr"}
                >
                  SR
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{eyebrow[language]}</p>
            <h1 className="holo mt-2 text-3xl font-black tracking-tight sm:text-5xl">{title[language]}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--milk)]">{subtitle[language]}</p>
          </div>

          <nav className="mt-5 grid gap-2 sm:grid-cols-3" aria-label={language === "sr" ? "Kreativne stranice" : "Creative pages"}>
            {PAGE_LINKS.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className={`focus-ring mono flex items-center justify-center gap-2 rounded-sm px-3 py-2 text-[11px] ${
                  active === item.id ? "bevel-in font-bold text-[color:var(--frost)]" : "bevel text-[color:var(--milk)]"
                }`}
              >
                <item.Icon className="h-3.5 w-3.5" aria-hidden />
                {item[language]}
              </Link>
            ))}
          </nav>
        </header>

        <main className="mt-3 space-y-3">{children(language)}</main>

        <footer className="bevel mt-3 rounded-md p-3 text-center">
          <p className="mono text-[10px] text-muted-foreground">
            {language === "sr" ? "deo Emanuelinog FrostOS portfolija · napravljeno s <3" : "part of Emanuela's FrostOS portfolio · made with <3"}
          </p>
        </footer>
      </div>
    </div>
  );
}
