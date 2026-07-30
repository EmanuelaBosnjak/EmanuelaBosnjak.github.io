import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Monitor,
  Moon,
  Sun,
  Mail,
  Sparkles,
  Palette,
  Image as ImageIcon,
  Construction,
  Star,
  Briefcase,
  Code2,
  Cloud,
  Languages,
  Flag,
  Trophy,
} from "lucide-react";
import { useTheme } from "@/lib/os/theme";
import { ARTWORKS } from "@/lib/artworks";
import { RainLayer } from "@/components/site/RainLayer";
import { SparkleCursor } from "@/components/site/SparkleCursor";

const CONTACT_EMAIL = "bemanuela3@gmail.com";

const COPY = {
  en: {
    marquee:
      "✦ welcome to emanuela's corner of the internet ✦ best viewed at 1024×768 ✦ new gallery page is up ✦ commissions open for spring ✦ sign the guestbook before you leave ✦ press “enter desktop” for the FrostOS experience ✦",
    tagline: "artist · IT engineer · rain admirer",
    updated: "last updated",
    desktop: "enter desktop",
    lightsOn: "lights on",
    lightsOff: "lights off",
    themeLabel: "Toggle theme",
    languageLabel: "Choose language",
    navigation: "navigation",
    visitors: "visitors",
    visitorNumber: "you are visitor no.",
    nowPlaying: "now playing",
    shop: "shop page under construction, check back soon!",
    welcome: "★ hello friend, welcome ★",
    introOne:
      "This is my little corner online. I'm Emanuela. I draw, make characters, build small interfaces, and usually follow whatever idea shows up when it's raining.",
    introTwo:
      "Everything here is made by me. I care a lot about the details and I can be stubborn about getting them right. If you feel like exploring, open the desktop version too. It is my tiny fake operating system.",
    newLabel: "NEW!",
    updateLine: "gallery page is live · spring commission slots are open",
    galleryHint: "click a thumbnail to view it bigger ✦ all art © hofmaurerad",
    about:
      "I'm Emanuela, an artist and IT engineer from Serbia. I spend half my time drawing and the other half keeping systems, archives, and databases tidy. I honestly enjoy both. Rainy weather is my favourite, especially when everyone else stays inside.",
    likes: "likes: rain, music, books, gaming, movies, comics",
    dislikes: "dislikes: heat, flies & mosquitos, hot food",
    desk: "desk: one old laptop, one tablet, too many cassettes",
    guestbookMessage: "Guestbook message",
    guestbookName: "Guestbook username",
    usernamePlaceholder: "pick a username...",
    addFace: "add a face",
    guestbookPlaceholder: "leave a nice message...",
    sign: "sign it",
    contactNote: "mail goes straight to",
    noDatabase: "no databases here.",
    yourName: "your name",
    yourEmail: "your email",
    message: "message",
    sendMail: "send via mail client",
    webring: "frost webring",
    previous: "◂ prev",
    random: "random",
    next: "next ▸",
    bestViewed: "best viewed in 1024×768",
    handmade: "made by hand, no cookies",
    approved: "frost approved",
    footer: "made with <3 emanuela bosnjak hofmaurerad",
    close: "close ✕",
  },
  sr: {
    marquee:
      "✦ dobrodošli u Emanuelin kutak interneta ✦ najbolje izgleda na 1024×768 ✦ nova galerija je objavljena ✦ prolećne narudžbine su otvorene ✦ upiši se u knjigu gostiju pre nego što odeš ✦ pritisni „otvori desktop” za FrostOS iskustvo ✦",
    tagline: "umetnica · IT inženjerka · ljubiteljka kiše",
    updated: "poslednje ažuriranje",
    desktop: "otvori desktop",
    lightsOn: "upali svetla",
    lightsOff: "ugasi svetla",
    themeLabel: "Promeni temu",
    languageLabel: "Izaberi jezik",
    navigation: "navigacija",
    visitors: "posetioci",
    visitorNumber: "ti si posetilac br.",
    nowPlaying: "trenutno svira",
    shop: "stranica prodavnice je u izradi, svrati uskoro!",
    welcome: "★ zdravo, prijatelju, dobrodošao ★",
    introOne:
      "Ovo je moj mali kutak na internetu. Ja sam Emanuela. Crtam, pravim likove i male interfejse, a najčešće pratim ideju koja mi padne na pamet dok pada kiša.",
    introTwo:
      "Sve ovde sam napravila sama. Mnogo mi znače detalji i umem da budem tvrdoglava dok ih ne sredim kako treba. Ako ti se istražuje, otvori i desktop verziju. To je moj mali izmišljeni operativni sistem.",
    newLabel: "NOVO!",
    updateLine: "galerija je objavljena · prolećni termini za narudžbine su otvoreni",
    galleryHint: "klikni na sličicu za veći prikaz ✦ svi radovi © hofmaurerad",
    about:
      "Ja sam Emanuela, umetnica i IT inženjerka iz Srbije. Pola vremena crtam, a pola sređujem sisteme, arhive i baze podataka. Iskreno volim obe strane. Najviše volim kišu, posebno kada sve ostale zadrži unutra.",
    likes: "volim: kišu, muziku, knjige, igre, filmove, stripove",
    dislikes: "ne volim: vrućinu, muve i komarce, ljutu hranu",
    desk: "radni sto: jedan stari laptop, jedan tablet, previše kaseta",
    guestbookMessage: "Poruka za knjigu gostiju",
    guestbookName: "Korisničko ime za knjigu gostiju",
    usernamePlaceholder: "izaberi korisničko ime...",
    addFace: "dodaj izraz",
    guestbookPlaceholder: "ostavi lepu poruku...",
    sign: "upiši se",
    contactNote: "poruka ide direktno na",
    noDatabase: "ovde nema baza podataka.",
    yourName: "tvoje ime",
    yourEmail: "tvoj imejl",
    message: "poruka",
    sendMail: "pošalji putem mejl aplikacije",
    webring: "frost veb-prsten",
    previous: "◂ prethodni",
    random: "nasumično",
    next: "sledeći ▸",
    bestViewed: "najbolje izgleda na 1024×768",
    handmade: "ručno napravljeno, bez kolačića",
    approved: "frost odobreno",
    footer: "napravljeno s <3 emanuela bosnjak hofmaurerad",
    close: "zatvori ✕",
  },
} as const;

const NAV = [
  { id: "home", en: "home.html", sr: "pocetna.html" },
  { id: "work", en: "my_work.html", sr: "moji_radovi.html" },
  { id: "about", en: "about_me.html", sr: "o_meni.html" },
  { id: "notes", en: "notes.txt", sr: "beleske.txt" },
  { id: "gallery", en: "gallery.html", sr: "galerija.html" },
  { id: "guestbook", en: "guestbook.cgi", sr: "knjiga_gostiju.cgi" },
  { id: "contact", en: "contact.html", sr: "kontakt.html" },
];

const GALLERY = ARTWORKS.map((artwork) => ({
  src: artwork.src,
  t: artwork.title,
  k: artwork.kind,
}));

const WORK = [
  {
    title: "Reddit | Avatar Artist",
    kind: "2022 – 2025 · remote",
    body: "I designed and released NFT avatars and illustrations for Reddit. Together they brought in more than $170K in platform revenue, often on a very busy release schedule.",
    Icon: Sparkles,
    year: "2025",
  },
  {
    title: "Media Press | Database Editor",
    kind: "2019 – 2023 · Subotica",
    body: "I looked after large media archives for French outlets, tracked tasks in MantisBT, edited assets in Photoshop, and handled copy and copyright checks.",
    Icon: Briefcase,
    year: "2023",
  },
  {
    title: "Serbian Cybersecurity Challenge",
    kind: "CTF · national finals · 2025 & 2026",
    body: "I reached the national CTF finals in both 2025 and 2026. In 2025, I competed with Flag Hoarders and we placed 12th, solving challenges across cryptography, reverse engineering, forensics, and web exploitation.",
    Icon: Flag,
    year: "2026",
  },
  {
    title: "Nimbus Weather App",
    kind: "React Native · PHP · API",
    body: "I built this weather app with the OpenMeteo API. It has email-verified accounts, saved cities, and a responsive mobile layout.",
    Icon: Cloud,
    year: "2025",
  },
  {
    title: "Ergela Bunford | Official Site",
    kind: "Figma · WordPress",
    body: "I helped redesign the whole website, starting with detailed Figma prototypes and staying involved until the final WordPress site went live.",
    Icon: Palette,
    year: "2024",
  },
  {
    title: "Subotica Rentals",
    kind: "HTML/CSS/JS · PHP · MySQL",
    body: "I built this property platform with guest, user, and admin accounts, BCRYPT password hashing, activation keys, listing approval, and automatic notifications.",
    Icon: Code2,
    year: "2024",
  },
  {
    title: "Scalable vector assets",
    kind: "SVG · production pipeline",
    body: "I made thousands of SVG and raster assets in Procreate, Photoshop, and Illustrator, all following strict production requirements.",
    Icon: ImageIcon,
    year: "ongoing",
  },
  {
    title: "Reading to the Stars | 1st Place",
    kind: "multimedia · national level",
    body: "I created the complete multimedia video using original digital illustration, video editing, scene composition, transitions, sound syncing, and visual storytelling. The project won 1st place with the maximum score.",
    Icon: Trophy,
    year: "2017",
  },
];

const SKILLS = [
  { t: "IT & data", d: "database management · SQL · information systems · IT infrastructure · Google Workspace · Microsoft Word · PowerPoint" },
  { t: "project operations", d: "MantisBT · digital archive management · copyright compliance · problem solving · finding practical solutions" },
  { t: "technical", d: "Unity · C# · 2D platformer diploma project · WordPress · PHP · HTML/CSS · JavaScript · computer networks" },
  { t: "design & multimedia", d: "Filmora Wondershare · Adobe Creative Cloud · Procreate · Photoshop · Illustrator · Clip Studio · Live2D Cubism · Figma · vector graphics · video editing" },
  { t: "languages", d: "Serbian (native) · English (C2) · German · French (A2)" },
];

const NOTES = [
  { t: "commissions & services", d: "art · character design · web design · private classes · custom quotes", href: "/commissions" as const },
  { t: "photography", d: "places · weather · quiet details · personal photo archive", href: "/photography" as const },
  { t: "baking diary", d: "bakes · experiments · recipes · kitchen notes", href: "/baking" as const },
];

const GUESTBOOK = [
  { n: "pinesignal", d: "12 / 02 / 2026", m: "found u through the webring. iceflower III is my desktop wallpaper now :')" },
  { n: "kv_studio", d: "04 / 02 / 2026", m: "the terminal game ate 20 minutes of my workday. no regrets." },
  { n: "anon", d: "28 / 01 / 2026", m: "please never redesign this. best site of the winter." },
];

const TEXT_FACES = [":3", ":)", ":(", ":D", ";_;", "^^", "<3"];

const GALLERY_KIND_SR: Record<string, string> = {
  "character illustration": "ilustracija lika",
  "chibi · commission": "čibi · narudžbina",
  "full scene": "cela scena",
  "fan art": "fan art",
  "keychain design": "dizajn priveska",
  "character sheet": "tabla likova",
  "platform display": "prikaz za platformu",
  "comic illustration": "strip ilustracija",
};

const WORK_SR: Record<string, { title: string; kind: string; body: string }> = {
  "Reddit | Avatar Artist": {
    title: "Reddit | umetnica avatara",
    kind: "2022–2025 · rad na daljinu",
    body: "Dizajnirala sam i objavljivala NFT avatare i ilustracije za Reddit. Zajedno su doneli više od 170.000 dolara prihoda platformi, često uz veoma gust raspored.",
  },
  "Media Press | Database Editor": {
    title: "Media Press | urednica baze podataka",
    kind: "2019–2023 · Subotica",
    body: "Brinula sam o velikim medijskim arhivama za francuske medije, pratila zadatke u MantisBT-u, sređivala materijale u Photoshopu i proveravala tekstove i autorska prava.",
  },
  "Serbian Cybersecurity Challenge": {
    title: "Serbian Cybersecurity Challenge",
    kind: "CTF · državno finale · 2025. i 2026.",
    body: "Plasirala sam se u državno CTF finale 2025. i 2026. godine. Godine 2025. takmičila sam se sa ekipom Flag Hoarders i zauzeli smo 12. mesto, rešavajući zadatke iz kriptografije, reverznog inženjeringa, forenzike i veb eksploatacije.",
  },
  "Nimbus Weather App": {
    title: "Nimbus vremenska aplikacija",
    kind: "React Native · PHP · API",
    body: "Napravila sam vremensku aplikaciju sa OpenMeteo API-jem. Ima naloge potvrđene imejlom, sačuvane gradove i prilagodljiv prikaz za mobilne uređaje.",
  },
  "Ergela Bunford | Official Site": {
    title: "Ergela Bunford | zvanični sajt",
    kind: "Figma · WordPress",
    body: "Pomogla sam oko kompletnog redizajna sajta, od detaljnih Figma prototipa do objavljivanja završne WordPress verzije.",
  },
  "Subotica Rentals": {
    title: "Izdavanje nekretnina Subotica",
    kind: "HTML/CSS/JS · PHP · MySQL",
    body: "Napravila sam platformu za nekretnine sa nalozima za goste, korisnike i administratore, BCRYPT zaštitom, aktivacionim ključevima, odobravanjem oglasa i automatskim obaveštenjima.",
  },
  "Scalable vector assets": {
    title: "Skalabilni vektorski materijali",
    kind: "SVG · produkcioni proces",
    body: "Napravila sam hiljade SVG i rasterskih materijala u programima Procreate, Photoshop i Illustrator, sve prema strogim produkcionim zahtevima.",
  },
  "Reading to the Stars | 1st Place": {
    title: "Čitanjem do zvijezda | 1. mesto",
    kind: "multimedijalni rad · državni nivo",
    body: "Napravila sam kompletan multimedijalni video koristeći originalne digitalne ilustracije, video montažu, kompoziciju scena, tranzicije, sinhronizaciju zvuka i vizuelno pripovedanje. Projekat je osvojio 1. mesto sa maksimalnim brojem bodova.",
  },
};

const SKILLS_SR: Record<string, { title: string; body: string }> = {
  "design & multimedia": {
    title: "dizajn i multimedija",
    body: "Filmora Wondershare · Adobe Creative Cloud · Procreate · Photoshop · Illustrator · Clip Studio · Live2D Cubism · Figma · vektorska grafika · video montaža",
  },
  "IT & data": {
    title: "IT i podaci",
    body: "upravljanje bazama · SQL · informacioni sistemi · IT infrastruktura · Google Workspace · Microsoft Word · PowerPoint",
  },
  "project operations": {
    title: "projektne operacije",
    body: "MantisBT · upravljanje digitalnim arhivama · poštovanje autorskih prava · rešavanje problema · pronalaženje praktičnih rešenja",
  },
  technical: {
    title: "tehničke veštine",
    body: "Unity · C# · 2D platformer za diplomski rad · WordPress · PHP · HTML/CSS · JavaScript · računarske mreže",
  },
  languages: {
    title: "jezici",
    body: "srpski (maternji) · engleski (C2) · nemački · francuski (A2)",
  },
};

const NOTES_SR: Record<string, { title: string; body: string }> = {
  "commissions & services": { title: "narudžbine i usluge", body: "ilustracije · dizajn likova · veb dizajn · privatni časovi · ponude po dogovoru" },
  photography: { title: "fotografija", body: "mesta · vreme · tihi detalji · lična foto-arhiva" },
  "baking diary": { title: "dnevnik pečenja", body: "peciva · eksperimenti · recepti · beleške iz kuhinje" },
};

function useVisitorCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let n = 0;
    try {
      n = Number(localStorage.getItem("frost-visits") || "0") + 1;
      localStorage.setItem("frost-visits", String(n));
    } catch {
      n = 1;
    }
    setCount(n);
    const id = setInterval(() => setCount((c) => (Math.random() < 0.25 ? c + 1 : c)), 9000);
    return () => clearInterval(id);
  }, []);
  return count;
}

export function SiteLanding({ onEnterDesktop }: { onEnterDesktop: () => void }) {
  const { theme, toggle } = useTheme();
  const [language, setLanguage] = useState<keyof typeof COPY>("en");
  const t = COPY[language];
  const visits = useVisitorCount();
  const digits = useMemo(() => String(visits).padStart(8, "0").split(""), [visits]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [guestbookName, setGuestbookName] = useState("");
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState(GUESTBOOK);
  const [now, setNow] = useState(new Date());
  const [lightbox, setLightbox] = useState<null | (typeof GALLERY)[number]>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "sr" ? "sr-Latn" : "en";
  }, [language]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const mailto = () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      language === "sr"
        ? `pozdrav sa sajta: ${form.name || "posetilac"}`
        : `hello from the website: ${form.name || "a visitor"}`,
    )}&body=${encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)}`;

  const signGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;
    setEntries((p) => [
      {
        n: guestbookName.trim() || (language === "sr" ? "posetilac" : "visitor"),
        d: now.toLocaleDateString(language === "sr" ? "sr-Latn-RS" : "en-GB").replaceAll("/", " / "),
        m: entry.trim(),
      },
      ...p,
    ]);
    setEntry("");
  };

  return (
    <div className="retro-bg os-scroll relative h-dvh overflow-y-auto overflow-x-hidden">
      <RainLayer />
      <SparkleCursor />

      <div className="relative z-10">
        {/* top marquee */}
        <div className="bevel-in overflow-hidden py-1">
          <div className="marquee-track mono text-[11px] text-[color:var(--frost)]">
            {[0, 1].map((k) => (
              <span key={k} className="px-6">
                {t.marquee}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[900px] px-2 py-3 sm:px-4">
          {/* banner */}
          <header id="home" className="bevel rounded-md p-3 text-center sm:p-5">
            <p className="mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              ~/home/emanuela/index.html
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">
              <span
                className="holo"
                tabIndex={0}
                onPointerMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
                  const y = ((event.clientY - bounds.top) / bounds.height) * 100;
                  event.currentTarget.style.setProperty("--foil-x", `${x}%`);
                  event.currentTarget.style.setProperty("--foil-y", `${y}%`);
                }}
                onPointerLeave={(event) => {
                  event.currentTarget.style.removeProperty("--foil-x");
                  event.currentTarget.style.removeProperty("--foil-y");
                }}
              >
                EMANUELA BOŠNJAK
              </span>
            </h1>
            <p className="mono mt-1 text-[12px] tracking-[0.3em] text-[color:var(--frost)]">( hofmaurerad )</p>
            <p className="mono mt-2 text-[11px] text-[color:var(--milk)] sm:text-xs">
              {t.tagline}
            </p>
            <p className="mono mt-3 text-[10px] text-muted-foreground">
              {t.updated}: {now.toLocaleDateString(language === "sr" ? "sr-Latn-RS" : "en-GB")} ·{" "}
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={onEnterDesktop}
                className="bevel focus-ring mono flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] font-bold text-[color:var(--milk)]"
              >
                <Monitor className="h-3.5 w-3.5" /> {t.desktop} [FrostOS]
              </button>
              <button
                onClick={toggle}
                className="bevel focus-ring mono flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] text-[color:var(--milk)]"
                aria-label={t.themeLabel}
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {theme === "dark" ? t.lightsOn : t.lightsOff}
              </button>
              <div
                className="bevel mono flex items-center gap-1 rounded-sm px-1.5 py-1 text-[11px] text-[color:var(--milk)]"
                role="group"
                aria-label={t.languageLabel}
              >
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
          </header>

          {/* body: sidebar + content */}
          <div className="mt-3 grid gap-3 md:grid-cols-[210px_minmax(0,1fr)]">
            {/* sidebar */}
            <aside className="os-scroll space-y-3 md:sticky md:top-3 md:max-h-[calc(100dvh-1.5rem)] md:self-start md:overflow-y-auto md:pr-1">
              <nav
                className="nav-readable bevel rounded-md p-2.5"
                aria-label={language === "sr" ? "Sajt" : "Site"}
              >
                <p
                  className="mono mb-2.5 border-b pb-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {t.navigation}
                </p>
                <ul className="space-y-1.5">
                  {NAV.map((n) => (
                    <li key={n.id}>
                      <button
                        onClick={() => go(n.id)}
                        className="nav-readable-link bevel focus-ring mono w-full rounded-sm px-2.5 py-1.5 text-left text-[12px] font-bold tracking-[0.015em] text-[color:var(--milk)]"
                      >
                        <span aria-hidden>▸</span> {n[language]}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="bevel rounded-md p-2 text-center">
                <p className="mono text-[10px] uppercase tracking-widest text-[color:var(--frost)]">{t.visitors}</p>
                <div className="mt-2 flex justify-center gap-0.5">
                  {digits.map((d, i) => (
                    <span
                      key={i}
                      className="bevel-in mono rounded-[2px] px-1 py-0.5 text-[12px] font-bold text-[color:var(--frost)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <p className="mono mt-2 text-[9px] text-muted-foreground">{t.visitorNumber} {visits}</p>
              </div>

              <div className="bevel rounded-md p-2">
                <p className="mono text-[10px] uppercase tracking-widest text-[color:var(--frost)]">{t.nowPlaying}</p>
                <p className="mono mt-1 text-[11px] text-[color:var(--milk)]">rain_loop_03.mp3</p>
                <div className="bevel-in mt-2 h-2 w-full overflow-hidden rounded-[2px]">
                  <div className="h-full w-2/3" style={{ background: "var(--frost)" }} />
                </div>
                <p className="mono mt-1 text-[9px] text-muted-foreground">02:41 / 04:10 ♪</p>
              </div>

              <div className="bevel rounded-md p-2 text-center">
                <Construction className="mx-auto h-5 w-5 blink-soft" style={{ color: "var(--frost)" }} aria-hidden />
                <p className="mono mt-1 text-[10px] text-muted-foreground">
                  {t.shop}
                </p>
              </div>
            </aside>

            {/* content */}
            <main role="main" className="space-y-3">
              <section className="bevel rounded-md p-3 sm:p-4">
                <h2 className="mono text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]">
                  {t.welcome}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--milk)]">
                  {t.introOne}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--milk)]">
                  {t.introTwo}
                </p>
                <p className="mono mt-3 text-[11px] text-muted-foreground">
                  <span className="blink-soft" style={{ color: "var(--frost)" }}>{t.newLabel}</span>{" "}
                  {t.updateLine}
                </p>
              </section>

              <section id="work" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {NAV[1][language]}
                </h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {WORK.map((w) => (
                    <article key={w.title} className="bevel-in rounded-sm p-3">
                      <div className="flex items-start gap-2">
                        <w.Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--frost)" }} aria-hidden />
                        <div className="min-w-0">
                          <h3 className="mono truncate text-[12px] font-bold text-[color:var(--milk)]">
                            {language === "sr" ? WORK_SR[w.title]?.title || w.title : w.title}
                          </h3>
                          <p className="mono text-[10px] text-[color:var(--frost)]">
                            {language === "sr" ? WORK_SR[w.title]?.kind || w.kind : w.kind} ·{" "}
                            {language === "sr" && w.year === "ongoing" ? "u toku" : w.year}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                        {language === "sr" ? WORK_SR[w.title]?.body || w.body : w.body}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section id="about" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {NAV[2][language]}
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
                  <div className="crt-photo relative h-24 w-24 shrink-0 overflow-hidden rounded-sm">
                    <img
                      src="/photo.jpg?v=original-colors"
                      alt={language === "sr" ? "Emanuela Bošnjak" : "Emanuela Bosnjak"}
                      className="crt-photo-image h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed text-[color:var(--milk)]">
                      {t.about}
                    </p>
                    <ul className="mono mt-2 space-y-1 text-[11px] text-muted-foreground">
                      <li>▸ {t.likes}</li>
                      <li>▸ {t.dislikes}</li>
                      <li>▸ {t.desk}</li>
                    </ul>
                  </div>
                </div>

                <h3
                  className="mono mt-4 border-b pb-1 text-[11px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {language === "sr" ? "vestine.txt" : "skills.txt"}
                </h3>
                <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                  {SKILLS.map((s) => (
                    <div key={s.t} className="bevel-in rounded-sm px-3 py-2">
                      <dt className="mono text-[11px] font-bold text-[color:var(--frost)]">
                        {language === "sr" ? SKILLS_SR[s.t]?.title || s.t : s.t}
                      </dt>
                      <dd className="mono text-[11px] leading-relaxed text-muted-foreground">
                        {language === "sr" ? SKILLS_SR[s.t]?.body || s.d : s.d}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section id="notes" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {NAV[3][language]}
                </h2>
                <dl className="mt-3 space-y-2">
                  {NOTES.map((n) => (
                    <Link
                      key={n.t}
                      to={n.href}
                      className="bevel-in focus-ring group block rounded-sm px-3 py-2 transition-transform hover:-translate-y-0.5"
                    >
                      <dt className="mono text-[11px] font-bold text-[color:var(--frost)]">
                        ▸ {language === "sr" ? NOTES_SR[n.t]?.title || n.t : n.t}
                      </dt>
                      <dd className="mono text-[11px] text-muted-foreground">
                        {language === "sr" ? NOTES_SR[n.t]?.body || n.d : n.d}
                      </dd>
                    </Link>
                  ))}
                </dl>
              </section>

              <section id="gallery" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {NAV[4][language]}
                </h2>
                <p className="mono mt-2 text-[10px] text-muted-foreground">{t.galleryHint}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {GALLERY.map((g) => (
                    <button
                      key={g.t}
                      onClick={() => setLightbox(g)}
                      className="bevel-in focus-ring group rounded-sm p-1 text-left"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-[2px]">
                        <img
                          src={g.src}
                          alt={g.t}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="mono mt-1 truncate text-[10px] text-[color:var(--milk)]">{g.t}</p>
                      <p className="mono truncate text-[9px] text-muted-foreground">
                        {language === "sr" ? GALLERY_KIND_SR[g.k] || g.k : g.k}
                      </p>
                    </button>
                  ))}
                </div>
              </section>

              <section id="guestbook" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {NAV[5][language]}
                </h2>
                <form onSubmit={signGuestbook} className="mt-3 space-y-2">
                  <div className="grid gap-2 sm:grid-cols-[150px_minmax(0,1fr)_auto]">
                    <label className="sr-only" htmlFor="gb-name">{t.guestbookName}</label>
                    <input
                      id="gb-name"
                      value={guestbookName}
                      onChange={(event) => setGuestbookName(event.target.value)}
                      placeholder={t.usernamePlaceholder}
                      maxLength={24}
                      className="bevel-in focus-ring mono w-full rounded-sm px-2 py-1.5 text-[12px] text-[color:var(--milk)] outline-none placeholder:text-muted-foreground"
                    />
                    <label className="sr-only" htmlFor="gb">{t.guestbookMessage}</label>
                    <input
                      id="gb"
                      value={entry}
                      onChange={(event) => setEntry(event.target.value)}
                      placeholder={t.guestbookPlaceholder}
                      maxLength={280}
                      className="bevel-in focus-ring mono w-full rounded-sm px-2 py-1.5 text-[12px] text-[color:var(--milk)] outline-none placeholder:text-muted-foreground"
                    />
                    <button type="submit" className="bevel focus-ring mono rounded-sm px-3 py-1.5 text-[11px] font-bold text-[color:var(--milk)]">
                      {t.sign}
                    </button>
                  </div>
                  <div className="mono flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span>{t.addFace}:</span>
                    {TEXT_FACES.map((face) => (
                      <button
                        key={face}
                        type="button"
                        onClick={() => setEntry((message) => `${message}${message && !message.endsWith(" ") ? " " : ""}${face}`)}
                        className="bevel focus-ring rounded-sm px-2 py-0.5 text-[11px] text-[color:var(--milk)]"
                        aria-label={`${t.addFace} ${face}`}
                      >
                        {face}
                      </button>
                    ))}
                  </div>
                </form>
                <ul className="mt-3 space-y-2">
                  {entries.map((g, i) => (
                    <li key={`${g.n}-${i}`} className="bevel-in rounded-sm px-3 py-2">
                      <p className="mono text-[11px] text-[color:var(--frost)]">
                        {g.n} <span className="text-muted-foreground">· {g.d}</span>
                      </p>
                      <p className="mt-0.5 text-[12px] text-[color:var(--milk)]">{g.m}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="contact" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  {NAV[6][language]}
                </h2>
                <p className="mono mt-2 text-[11px] text-muted-foreground">
                  {t.contactNote} <span className="text-[color:var(--frost)]">{CONTACT_EMAIL}</span>. {t.noDatabase}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cname" className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.yourName}</label>
                    <input
                      id="cname"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bevel-in focus-ring mono mt-1 w-full rounded-sm px-2 py-1.5 text-[12px] text-[color:var(--milk)] outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="cmail" className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.yourEmail}</label>
                    <input
                      id="cmail"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bevel-in focus-ring mono mt-1 w-full rounded-sm px-2 py-1.5 text-[12px] text-[color:var(--milk)] outline-none"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label htmlFor="cmsg" className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.message}</label>
                  <textarea
                    id="cmsg"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bevel-in focus-ring mono mt-1 w-full resize-y rounded-sm px-2 py-1.5 text-[12px] text-[color:var(--milk)] outline-none"
                  />
                </div>
                <a
                  href={mailto()}
                  className="bevel focus-ring mono mt-3 inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] font-bold text-[color:var(--milk)]"
                >
                  <Mail className="h-3.5 w-3.5" /> {t.sendMail}
                </a>
              </section>

              {/* webring / badges */}
              <section className="bevel rounded-md p-3 text-center">
                <p className="mono text-[10px] uppercase tracking-widest text-[color:var(--frost)]">{t.webring}</p>
                <div className="mono mt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] text-[color:var(--milk)]">
                  <span className="bevel-in rounded-sm px-2 py-1">{t.previous}</span>
                  <span className="bevel-in rounded-sm px-2 py-1">{t.random}</span>
                  <span className="bevel-in rounded-sm px-2 py-1">{t.next}</span>
                </div>
                <div className="mono mt-3 flex flex-wrap items-center justify-center gap-2 text-[9px] text-muted-foreground">
                  <span className="bevel-in rounded-sm px-2 py-1">{t.bestViewed}</span>
                  <span className="bevel-in rounded-sm px-2 py-1">{t.handmade}</span>
                  <span className="bevel-in inline-flex items-center gap-1 rounded-sm px-2 py-1">
                    <Star className="h-3 w-3" style={{ color: "var(--frost)" }} /> {t.approved}
                  </span>
                </div>
              </section>
            </main>
          </div>

          <footer className="mono mt-4 pb-8 text-center text-[10px] text-muted-foreground">
            {t.footer}
          </footer>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.t}
          onClick={() => setLightbox(null)}
        >
          <div className="bevel max-h-full w-full max-w-[720px] overflow-auto rounded-md p-2" onClick={(e) => e.stopPropagation()}>
            <div className="mono flex items-center justify-between gap-2 px-1 pb-2">
              <span className="truncate text-[11px] text-[color:var(--milk)]">
                {lightbox.t}{" "}
                <span className="text-muted-foreground">
                  · {language === "sr" ? GALLERY_KIND_SR[lightbox.k] || lightbox.k : lightbox.k}
                </span>
              </span>
              <button
                onClick={() => setLightbox(null)}
                className="bevel focus-ring rounded-sm px-2 py-0.5 text-[11px] text-[color:var(--milk)]"
              >
                {t.close}
              </button>
            </div>
            <img src={lightbox.src} alt={lightbox.t} className="w-full rounded-sm object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
