import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { useTheme } from "@/lib/os/theme";
import { RainLayer } from "@/components/site/RainLayer";
import { SparkleCursor } from "@/components/site/SparkleCursor";

import artIMG from "@/assets/IMG_3038.png.asset.json";
import artChars from "@/assets/characterdesign1.png.asset.json";
import artDisplay from "@/assets/display1.png.asset.json";
import artFan from "@/assets/fanart1.webp.asset.json";
import artFull from "@/assets/fullscale.webp.asset.json";
import artFull2 from "@/assets/fullscale2.webp.asset.json";
import artKey2 from "@/assets/keychain2.webp.asset.json";
import artKeyFull from "@/assets/keychainfull.webp.asset.json";
import artMashi1 from "@/assets/mashi1.webp.asset.json";
import artMashi2 from "@/assets/mashi2.webp.asset.json";

const CONTACT_EMAIL = "bemanuela3@gmail.com";

const NAV = [
  { id: "home", label: "home.html" },
  { id: "gallery", label: "gallery.html" },
  { id: "work", label: "my_work.html" },
  { id: "about", label: "about_me.html" },
  { id: "notes", label: "notes.txt" },
  { id: "guestbook", label: "guestbook.cgi" },
  { id: "contact", label: "contact.html" },
];

const GALLERY = [
  { src: artIMG.url, t: "moonlit wanderer", k: "character illustration" },
  { src: artMashi2.url, t: "shrine fox", k: "chibi · commission" },
  { src: artMashi1.url, t: "ember priestess", k: "chibi · commission" },
  { src: artFull.url, t: "quiet field", k: "full scene" },
  { src: artFull2.url, t: "halo on the railing", k: "full scene" },
  { src: artFan.url, t: "mask & flowers", k: "fan art" },
  { src: artKeyFull.url, t: "staff bearer", k: "keychain design" },
  { src: artKey2.url, t: "violet mage", k: "keychain design" },
  { src: artChars.url, t: "avatars collection", k: "character sheet" },
  { src: artDisplay.url, t: "reddit × hofmaurerad", k: "platform display" },
];

const WORK = [
  {
    title: "Reddit — Avatar Artist",
    kind: "2022 – 2025 · remote",
    body: "Designed and shipped NFT-based avatars and illustrations that generated $170K+ in platform revenue, on a constant high-volume release schedule.",
    Icon: Sparkles,
    year: "2025",
  },
  {
    title: "Media Press — Database Editor",
    kind: "2019 – 2023 · Subotica",
    body: "Managed large media archives for French outlets, tracked work in MantisBT, processed assets in Photoshop and handled copywriting and copyright compliance.",
    Icon: Briefcase,
    year: "2023",
  },
  {
    title: "Nimbus Weather App",
    kind: "React Native · PHP · API",
    body: "Cross-platform weather app on the OpenMeteo API, with email-verified accounts, saved city preferences and a responsive mobile-first UI.",
    Icon: Cloud,
    year: "2025",
  },
  {
    title: "Ergela Bunford — Official Site",
    kind: "Figma · WordPress",
    body: "Consultant and designer for a full website overhaul, from high-fidelity Figma prototypes to publication, iterating closely with the client.",
    Icon: Palette,
    year: "2024",
  },
  {
    title: "Subotica Rentals",
    kind: "HTML/CSS/JS · PHP · MySQL",
    body: "Real-estate platform with guest/user/admin tiers, BCRYPT hashing and activation keys, plus an automated listing-approval and notification workflow.",
    Icon: Code2,
    year: "2024",
  },
  {
    title: "Scalable vector assets",
    kind: "SVG · production pipeline",
    body: "Thousands of SVG and raster assets built to strict technical specs in Procreate, Photoshop and Illustrator — clean, reusable, spec-perfect.",
    Icon: ImageIcon,
    year: "ongoing",
  },
];

const SKILLS = [
  { t: "design & multimedia", d: "Procreate · Photoshop · Illustrator · Clip Studio · Live2D Cubism · Figma · vector graphics" },
  { t: "IT & data", d: "database management · SQL · information systems · IT infrastructure" },
  { t: "project operations", d: "MantisBT · digital archive management · copyright compliance" },
  { t: "technical", d: "WordPress · PHP · HTML/CSS · JavaScript · computer networks" },
  { t: "languages", d: "Serbian (native) · English (C2) · German · French (A2)" },
];

const NOTES = [
  { t: "commission pricing", d: "A5 120€ · A4 240€ · A3+ from 480€ · 2–4 weeks" },
  { t: "reading list 2026", d: "Nan Shepherd, Piranesi (on loop), On Weathering" },
  { t: "studio log", d: "north-facing window, one lamp, too many cassettes" },
  { t: "now playing", d: "rain on the window + pine drone loop no.3" },
];

const GUESTBOOK = [
  { n: "pinesignal", d: "12 / 02 / 2026", m: "found u through the webring. iceflower III is my desktop wallpaper now :')" },
  { n: "kv_studio", d: "04 / 02 / 2026", m: "the terminal game ate 20 minutes of my workday. no regrets." },
  { n: "anon", d: "28 / 01 / 2026", m: "please never redesign this. best site of the winter." },
];

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
  const visits = useVisitorCount();
  const digits = useMemo(() => String(visits).padStart(8, "0").split(""), [visits]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState(GUESTBOOK);
  const [now, setNow] = useState(new Date());
  const [lightbox, setLightbox] = useState<null | (typeof GALLERY)[number]>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const mailto = () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `hello from the website — ${form.name || "a visitor"}`,
    )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)}`;

  const signGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;
    setEntries((p) => [
      { n: form.name.trim() || "visitor", d: now.toLocaleDateString("en-GB").replaceAll("/", " / "), m: entry.trim() },
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
                ✦ welcome to emanuela's corner of the internet ✦ best viewed at 1024×768 ✦ new gallery page is up ✦ commissions open for spring ✦ sign the
                guestbook before you leave ✦ press "enter desktop" for the FrostOS experience ✦
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
              <span className="holo" tabIndex={0}>
                EMANUELA BOŠNJAK
              </span>
            </h1>
            <p className="mono mt-1 text-[12px] tracking-[0.3em] text-[color:var(--frost)]">( hofmaurerad )</p>
            <p className="mono mt-2 text-[11px] text-[color:var(--milk)] sm:text-xs">
              artist · IT engineer · rain admirer
            </p>
            <p className="mono mt-3 text-[10px] text-muted-foreground">
              last updated: {now.toLocaleDateString("en-GB")} ·{" "}
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={onEnterDesktop}
                className="bevel focus-ring mono flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] font-bold text-[color:var(--milk)]"
              >
                <Monitor className="h-3.5 w-3.5" /> enter desktop [FrostOS]
              </button>
              <button
                onClick={toggle}
                className="bevel focus-ring mono flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] text-[color:var(--milk)]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {theme === "dark" ? "lights on" : "lights off"}
              </button>
            </div>
          </header>

          {/* body: sidebar + content */}
          <div className="mt-3 grid gap-3 md:grid-cols-[190px_minmax(0,1fr)]">
            {/* sidebar */}
            <aside className="space-y-3">
              <nav className="bevel rounded-md p-2" aria-label="Site">
                <p
                  className="mono mb-2 border-b pb-1 text-[10px] uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  navigation
                </p>
                <ul className="space-y-1">
                  {NAV.map((n) => (
                    <li key={n.id}>
                      <button
                        onClick={() => go(n.id)}
                        className="bevel focus-ring mono w-full rounded-sm px-2 py-1 text-left text-[11px] text-[color:var(--milk)] hover:text-[color:var(--frost)]"
                      >
                        ▸ {n.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="bevel rounded-md p-2 text-center">
                <p className="mono text-[10px] uppercase tracking-widest text-[color:var(--frost)]">visitors</p>
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
                <p className="mono mt-2 text-[9px] text-muted-foreground">you are visitor no. {visits}</p>
              </div>

              <div className="bevel rounded-md p-2">
                <p className="mono text-[10px] uppercase tracking-widest text-[color:var(--frost)]">now playing</p>
                <p className="mono mt-1 text-[11px] text-[color:var(--milk)]">rain_loop_03.mp3</p>
                <div className="bevel-in mt-2 h-2 w-full overflow-hidden rounded-[2px]">
                  <div className="h-full w-2/3" style={{ background: "var(--frost)" }} />
                </div>
                <p className="mono mt-1 text-[9px] text-muted-foreground">02:41 / 04:10 ♪</p>
              </div>

              <div className="bevel rounded-md p-2 text-center">
                <Construction className="mx-auto h-5 w-5 blink-soft" style={{ color: "var(--frost)" }} aria-hidden />
                <p className="mono mt-1 text-[10px] text-muted-foreground">
                  shop page under construction — check back soon!
                </p>
              </div>
            </aside>

            {/* content */}
            <main role="main" className="space-y-3">
              <section className="bevel rounded-md p-3 sm:p-4">
                <h2 className="mono text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]">
                  ★ hello friend, welcome ★
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--milk)]">
                  This is my little homepage. My name is Emanuela — I draw, and I build the world
                  around me one small piece at a time: characters, quiet scenes, tiny interfaces,
                  and whatever else the rain suggests.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--milk)]">
                  Everything here is hand-made, with a touch of love and stubborn passion, and its
                  own particular kind of vibe. If you want the full experience, check out the
                  desktop version — it boots a whole little operating system of its own.
                </p>
                <p className="mono mt-3 text-[11px] text-muted-foreground">
                  <span className="blink-soft" style={{ color: "var(--frost)" }}>NEW!</span> gallery page is live · spring commission slots are open
                </p>
              </section>

              <section id="gallery" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  gallery.html
                </h2>
                <p className="mono mt-2 text-[10px] text-muted-foreground">click a thumbnail to view it bigger ✦ all art © hofmaurerad</p>
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
                      <p className="mono truncate text-[9px] text-muted-foreground">{g.k}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section id="work" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  my_work.html
                </h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {WORK.map((w) => (
                    <article key={w.title} className="bevel-in rounded-sm p-3">
                      <div className="flex items-start gap-2">
                        <w.Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--frost)" }} aria-hidden />
                        <div className="min-w-0">
                          <h3 className="mono truncate text-[12px] font-bold text-[color:var(--milk)]">{w.title}</h3>
                          <p className="mono text-[10px] text-[color:var(--frost)]">
                            {w.kind} · {w.year}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{w.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section id="about" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  about_me.html
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
                  <div className="bevel-in grid h-24 w-24 shrink-0 place-items-center rounded-sm">
                    <span className="mono text-[10px] text-muted-foreground">[ photo.jpg ]</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed text-[color:var(--milk)]">
                      I'm Emanuela — an artist and IT engineer somewhere cold and pine-heavy. I've
                      spent years split between drawing characters and keeping systems, archives and
                      databases in order, and I like both halves equally. My favourite weather is the
                      kind that keeps everyone else indoors.
                    </p>
                    <ul className="mono mt-2 space-y-1 text-[11px] text-muted-foreground">
                      <li>▸ likes: rain, music, books, gaming, movies, comics</li>
                      <li>▸ dislikes: heat, flies &amp; mosquitos, hot food</li>
                      <li>▸ desk: one old laptop, one tablet, too many cassettes</li>
                    </ul>
                  </div>
                </div>

                <h3
                  className="mono mt-4 border-b pb-1 text-[11px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  skills.txt
                </h3>
                <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                  {SKILLS.map((s) => (
                    <div key={s.t} className="bevel-in rounded-sm px-3 py-2">
                      <dt className="mono text-[11px] font-bold text-[color:var(--frost)]">{s.t}</dt>
                      <dd className="mono text-[11px] leading-relaxed text-muted-foreground">{s.d}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section id="notes" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  notes.txt
                </h2>
                <dl className="mt-3 space-y-2">
                  {NOTES.map((n) => (
                    <div key={n.t} className="bevel-in rounded-sm px-3 py-2">
                      <dt className="mono text-[11px] font-bold text-[color:var(--frost)]">{n.t}</dt>
                      <dd className="mono text-[11px] text-muted-foreground">{n.d}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section id="guestbook" className="bevel rounded-md p-3 sm:p-4">
                <h2
                  className="mono border-b pb-1 text-[12px] font-bold uppercase tracking-widest text-[color:var(--frost)]"
                  style={{ borderColor: "var(--window-border)" }}
                >
                  guestbook.cgi
                </h2>
                <form onSubmit={signGuestbook} className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <label className="sr-only" htmlFor="gb">Guestbook message</label>
                  <input
                    id="gb"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="leave a nice message..."
                    className="bevel-in focus-ring mono w-full rounded-sm px-2 py-1.5 text-[12px] text-[color:var(--milk)] outline-none placeholder:text-muted-foreground"
                  />
                  <button type="submit" className="bevel focus-ring mono rounded-sm px-3 py-1.5 text-[11px] font-bold text-[color:var(--milk)]">
                    sign it
                  </button>
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
                  contact.html
                </h2>
                <p className="mono mt-2 text-[11px] text-muted-foreground">
                  mail goes straight to <span className="text-[color:var(--frost)]">{CONTACT_EMAIL}</span> — no databases here.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cname" className="mono text-[10px] uppercase tracking-widest text-muted-foreground">your name</label>
                    <input
                      id="cname"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bevel-in focus-ring mono mt-1 w-full rounded-sm px-2 py-1.5 text-[12px] text-[color:var(--milk)] outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="cmail" className="mono text-[10px] uppercase tracking-widest text-muted-foreground">your email</label>
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
                  <label htmlFor="cmsg" className="mono text-[10px] uppercase tracking-widest text-muted-foreground">message</label>
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
                  <Mail className="h-3.5 w-3.5" /> send via mail client
                </a>
              </section>

              {/* webring / badges */}
              <section className="bevel rounded-md p-3 text-center">
                <p className="mono text-[10px] uppercase tracking-widest text-[color:var(--frost)]">frost webring</p>
                <div className="mono mt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] text-[color:var(--milk)]">
                  <span className="bevel-in rounded-sm px-2 py-1">◂ prev</span>
                  <span className="bevel-in rounded-sm px-2 py-1">random</span>
                  <span className="bevel-in rounded-sm px-2 py-1">next ▸</span>
                </div>
                <div className="mono mt-3 flex flex-wrap items-center justify-center gap-2 text-[9px] text-muted-foreground">
                  <span className="bevel-in rounded-sm px-2 py-1">best viewed in 1024×768</span>
                  <span className="bevel-in rounded-sm px-2 py-1">made by hand, no cookies</span>
                  <span className="bevel-in inline-flex items-center gap-1 rounded-sm px-2 py-1">
                    <Star className="h-3 w-3" style={{ color: "var(--frost)" }} /> frost approved
                  </span>
                </div>
              </section>
            </main>
          </div>

          <footer className="mono mt-4 pb-8 text-center text-[10px] text-muted-foreground">
            made with &lt;3 emanuelabosnjak hofmaurerad
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
                {lightbox.t} <span className="text-muted-foreground">· {lightbox.k}</span>
              </span>
              <button
                onClick={() => setLightbox(null)}
                className="bevel focus-ring rounded-sm px-2 py-0.5 text-[11px] text-[color:var(--milk)]"
              >
                close ✕
              </button>
            </div>
            <img src={lightbox.src} alt={lightbox.t} className="w-full rounded-sm object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

