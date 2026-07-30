import { createFileRoute } from "@tanstack/react-router";
import { Brush, Code2, GraduationCap, Mail, Sparkles } from "lucide-react";
import { FrostSubpage, type SiteLanguage } from "@/components/site/FrostSubpage";

export const Route = createFileRoute("/commissions")({
  component: CommissionsPage,
  head: () => ({
    meta: [
      { title: "Commissions & Services | Emanuela Bošnjak" },
      {
        name: "description",
        content: "Art commissions, character design, web design, creative services, and private classes by Emanuela Bošnjak.",
      },
    ],
  }),
});

const ART_PRICING = [
  {
    en: "Avatar / chibi + design",
    sr: "Avatar / čibi + dizajn",
    lines: ["Sketch · $100", "Rendered · $200", "Old style · $200"],
  },
  {
    en: "Simple style",
    sr: "Jednostavni stil",
    lines: ["Sketch · $50", "Rendered · $100", "Old style · $100"],
  },
  {
    en: "Anime style art",
    sr: "Anime stil",
    lines: ["Sketch · $30–50", "Rendered · $50–100"],
  },
  {
    en: "Character design",
    sr: "Dizajn lika",
    lines: ["Sketch · $100–200", "Rendered · $200+"],
  },
  {
    en: "Backgrounds",
    sr: "Pozadine",
    lines: ["Simple · $10", "Complex · $50–100"],
  },
  {
    en: "Custom work",
    sr: "Rad po dogovoru",
    lines: ["Animation · custom quote", "VTuber models · custom quote", "Icons & other work · ask me"],
  },
];

const SERVICES = [
  {
    Icon: Code2,
    en: "Web design",
    sr: "Veb dizajn",
    enBody: "Portfolio sites, landing pages, interface layouts, redesigns, and responsive front-end work. Every project gets a custom quote.",
    srBody: "Portfolio sajtovi, landing stranice, interfejsi, redizajn i prilagodljiv front-end. Svaki projekat dobija posebnu ponudu.",
  },
  {
    Icon: Brush,
    en: "Design & art services",
    sr: "Dizajn i umetničke usluge",
    enBody: "Character art, illustrations, vector assets, icons, social graphics, and visual packages for personal or commercial projects.",
    srBody: "Dizajn likova, ilustracije, vektorski materijali, ikonice, grafike za mreže i vizuelni paketi za lične ili komercijalne projekte.",
  },
  {
    Icon: GraduationCap,
    en: "Private classes",
    sr: "Privatni časovi",
    enBody: "One-to-one help with digital drawing, vector basics, portfolio setup, beginner web design, and practical creative software skills.",
    srBody: "Individualna pomoć za digitalno crtanje, osnove vektora, sređivanje portfolija, početni veb dizajn i praktičan rad u kreativnim programima.",
  },
];

function CommissionsPage() {
  return (
    <FrostSubpage
      active="commissions"
      eyebrow={{ en: "~/services/commissions.html", sr: "~/usluge/narudzbine.html" }}
      title={{ en: "COMMISSIONS & SERVICES", sr: "NARUDŽBINE I USLUGE" }}
      subtitle={{
        en: "Illustration, design, web work, and private creative lessons. Pick a starting point below or message me for a custom quote.",
        sr: "Ilustracije, dizajn, veb rad i privatni kreativni časovi. Izaberi početnu opciju ili mi piši za posebnu ponudu.",
      }}
    >
      {(language) => <CommissionsContent language={language} />}
    </FrostSubpage>
  );
}

function CommissionsContent({ language }: { language: SiteLanguage }) {
  return (
    <>
      <section className="bevel overflow-hidden rounded-md p-2 sm:p-3">
        <img
          src="/commissions/comm.png"
          alt={language === "sr" ? "Tabela cena za umetničke narudžbine" : "Art commission pricing sheet"}
          className="w-full rounded-sm"
        />
      </section>

      <section className="bevel rounded-md p-3 sm:p-4">
        <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: "var(--window-border)" }}>
          <Sparkles className="h-4 w-4 text-[color:var(--frost)]" aria-hidden />
          <h2 className="mono text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]">
            {language === "sr" ? "cene ilustracija" : "art pricing"}
          </h2>
        </div>
        <p className="mono mt-2 text-[10px] text-muted-foreground">
          {language === "sr"
            ? "Cene su u USD. Komercijalna upotreba, potpuno vlasništvo, dodatni likovi i složeniji zahtevi dobijaju posebnu ponudu."
            : "Prices are in USD. Commercial use, full ownership, extra characters, and complex requests receive a separate quote."}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ART_PRICING.map((item) => (
            <article key={item.en} className="bevel-in rounded-sm p-3">
              <h3 className="mono text-[11px] font-bold text-[color:var(--milk)]">{item[language]}</h3>
              <ul className="mono mt-2 space-y-1 text-[10px] text-muted-foreground">
                {item.lines.map((line) => <li key={line}>▸ {line}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bevel rounded-md p-3 sm:p-4">
        <h2 className="mono border-b pb-2 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]" style={{ borderColor: "var(--window-border)" }}>
          {language === "sr" ? "još usluga i ponude" : "more services & quotes"}
        </h2>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.en} className="bevel-in rounded-sm p-3">
              <service.Icon className="h-5 w-5 text-[color:var(--frost)]" aria-hidden />
              <h3 className="mono mt-2 text-[11px] font-bold text-[color:var(--milk)]">{service[language]}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                {language === "sr" ? service.srBody : service.enBody}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bevel rounded-md p-4 text-center">
        <Mail className="mx-auto h-6 w-6 text-[color:var(--frost)]" aria-hidden />
        <h2 className="mono mt-2 text-[12px] font-bold text-[color:var(--milk)]">
          {language === "sr" ? "imaš ideju koja nije na listi?" : "have something else in mind?"}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          {language === "sr"
            ? "Pošalji kratak opis, rok, veličinu ili platformu i način na koji će rad biti korišćen. Odgovoriću sa jasnom ponudom."
            : "Send a short brief, deadline, size or platform, and how the work will be used. I will reply with a clear custom quote."}
        </p>
        <a
          href="mailto:bemanuela3@gmail.com?subject=Commission%20or%20service%20quote"
          className="bevel focus-ring mono mt-3 inline-flex items-center gap-2 rounded-sm px-4 py-2 text-[11px] font-bold text-[color:var(--milk)]"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden />
          bemanuela3@gmail.com
        </a>
      </section>
    </>
  );
}
