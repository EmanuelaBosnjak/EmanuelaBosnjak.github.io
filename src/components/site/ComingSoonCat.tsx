import { Cat, Construction } from "lucide-react";
import type { SiteLanguage } from "@/components/site/FrostSubpage";

type ComingSoonCatProps = {
  language: SiteLanguage;
  page: "photography" | "baking";
};

const COPY = {
  photography: {
    code: "404: PHOTOS_NOT_FOUND",
    en: "The cat is still developing the photographs. This archive is coming soon, once every tiny detail passes inspection.",
    sr: "Mačka još razvija fotografije. Arhiva stiže uskoro, čim svaki mali detalj prođe inspekciju.",
    statusEn: "sorting memories...",
    statusSr: "sortiranje uspomena...",
  },
  baking: {
    code: "404: CAKE_NOT_FOUND",
    en: "The cat checked the oven. The page is still baking, but something warm and sweet is coming soon.",
    sr: "Mačka je proverila rernu. Stranica se još peče, ali nešto toplo i slatko stiže uskoro.",
    statusEn: "baking page...",
    statusSr: "pečenje stranice...",
  },
} as const;

export function ComingSoonCat({ language, page }: ComingSoonCatProps) {
  const copy = COPY[page];

  return (
    <section className="bevel rounded-md p-4 sm:p-8">
      <div className="bevel-in mx-auto max-w-xl rounded-sm p-5 text-center sm:p-8">
        <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-full border border-[color:var(--window-border)] bg-[color:var(--ink)]">
          <Cat className="h-16 w-16 text-[color:var(--frost)]" strokeWidth={1.35} aria-hidden />
          <Construction className="absolute -right-1 -top-1 h-7 w-7 text-[color:var(--milk)]" aria-hidden />
        </div>

        <p className="mono mt-5 text-[11px] font-bold tracking-[0.12em] text-[color:var(--frost)]">
          {copy.code}
        </p>
        <h2 className="mono mt-2 text-xl font-bold text-[color:var(--milk)] sm:text-2xl">
          {language === "sr" ? "stiže uskoro :3" : "coming soon :3"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground">
          {language === "sr" ? copy.sr : copy.en}
        </p>

        <div className="mx-auto mt-6 max-w-sm">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <span className="mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {language === "sr" ? copy.statusSr : copy.statusEn}
            </span>
            <span className="mono text-[9px] text-[color:var(--frost)]">▓▓▓▓░░ 64%</span>
          </div>
          <div className="bevel-in h-2 overflow-hidden rounded-[2px]">
            <div className="h-full w-[64%] bg-[color:var(--frost)]" />
          </div>
        </div>

        <p className="mono mt-5 text-[16px] text-[color:var(--milk)]" aria-label="cat face">
          /ᐠ｡ꞈ｡ᐟ\
        </p>
      </div>
    </section>
  );
}
