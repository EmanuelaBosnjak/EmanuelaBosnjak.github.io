import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

type Post = {
  id: string;
  title: string;
  category: "art" | "process" | "games" | "web";
  date: string;
  excerpt: string;
  body: string;
  read: string;
};

const posts: Post[] = [
  { id: "iceflower", title: "Notes on the Iceflower series", category: "art", date: "2026-01-12", read: "6 min", excerpt: "Six panels, one long January. Trying to paint the moment ice makes a decision.", body: "The Iceflower series began the week the pipes froze. I was standing in the kitchen at 3am waiting for water to remember its way through the wall, and I started drawing frost patterns on the window with the back of a spoon.\n\nEach panel is a slowed-down version of that: a decision the ice made, held still long enough to look at. I painted them on cold-pressed paper because the tooth grabs the pigment the way the window grabbed my breath.\n\nSix panels. One long January. If you look at them in order you can almost hear the pipes complaining." },
  { id: "process-quiet", title: "Working slowly on purpose", category: "process", date: "2025-12-30", read: "4 min", excerpt: "On refusing the algorithm, keeping a paper journal, and finishing three things a year.", body: "I've been trying, for a while, to work at the speed of the material. Oil takes a week to feel dry. Riso ink needs a night to sit. Code needs a day away from it to be honest about what it is.\n\nThe internet keeps offering to speed all of this up. I keep politely declining. Three finished things a year is plenty. Everything else is just noticing." },
  { id: "signal-forest", title: "SIGNAL//FOREST — devlog #3", category: "games", date: "2026-02-04", read: "5 min", excerpt: "Shadows now drift instead of chasing. It feels less like a game and more like weather.", body: "The chase mechanic never sat right — it made the forest hostile, and the forest is not hostile, it's just busy.\n\nIn devlog #3 the shadows drift. They don't chase; they weather. You are a small signal moving through a system that mostly ignores you. Occasionally you meet.\n\nFragments are still worth collecting. Five of them and the grid exhales." },
  { id: "webring", title: "A slow webring for people who paint", category: "web", date: "2025-11-18", read: "3 min", excerpt: "Fourteen sites, one plain index page, zero analytics.", body: "The frost webring is fourteen sites long. There is no algorithm. There is a plain HTML index and a hand-drawn button you can put on your homepage. If you paint or draw or make small websites about weather, ask.\n\nIt is the least ambitious project I've ever been proud of." },
  { id: "cathedral", title: "How 'Cathedral of Pines' happened", category: "art", date: "2025-10-02", read: "7 min", excerpt: "It was supposed to be a study. It stayed a study for eight months.", body: "It began as a warm-up: fifteen minutes of oil sticks on a wet ground. Then I looked at it wrong, tilted my head, and it was suddenly a room made of trees.\n\nI didn't finish it for eight months because every time I tried to fix a thing I broke a better thing. Eventually I framed it mid-study. That is now allowed." },
  { id: "static-garden", title: "Field notes: static gardens", category: "process", date: "2025-09-14", read: "4 min", excerpt: "What happens when you photograph snow with a broken sensor.", body: "The sensor on the old camera has a column of dead pixels. Photograph snow with it and you get a garden of static — a strict vertical row of frost where the sensor forgot how to see.\n\nI've stopped fixing it. It's more honest than most cameras I own." },
  { id: "terminal-love", title: "Why the terminal, still", category: "web", date: "2025-08-01", read: "3 min", excerpt: "A love letter to prompts, blinking cursors, and green-on-black gestures.", body: "The terminal is the last honest UI. It tells you exactly what it will do. It waits. It doesn't upsell. When it fails it fails in words you can grep.\n\nI put one in my portfolio because it felt rude not to." },
  { id: "wolf-signal", title: "The wolf and the signal", category: "art", date: "2025-07-19", read: "2 min", excerpt: "A short piece of fiction that keeps showing up in the paintings.", body: "The wolf and the signal met at the edge of the grid. Neither introduced itself. They walked in the same direction for a while and then the signal went one way through the trees and the wolf went another and that was that.\n\n(this keeps showing up in the work. i've stopped fighting it.)" },
];

const cats: Array<Post["category"] | "all"> = ["all", "art", "process", "games", "web"];

export function BrowseApp() {
  const [cat, setCat] = useState<(typeof cats)[number]>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Post | null>(null);

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (cat === "all" || p.category === cat) &&
          (q === "" || (p.title + p.excerpt + p.body).toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  if (open) {
    return (
      <article className="mx-auto max-w-2xl p-6">
        <button onClick={() => setOpen(null)} className="focus-ring mono mb-4 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> back to browse
        </button>
        <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{open.category} · {open.date} · {open.read}</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{open.title}</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          {open.body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </article>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b p-3" style={{ borderColor: "var(--window-border)" }}>
        <div className="flex flex-wrap gap-1">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`mono focus-ring rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${cat === c ? "bg-[color:var(--frost)] text-[color:var(--ink)]" : "bg-[color:var(--accent)] text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="ml-auto flex min-w-0 items-center gap-1.5 rounded-lg border px-2 py-1 text-xs" style={{ borderColor: "var(--border)", background: "var(--input)" }}>
          <Search className="h-3 w-3 opacity-60" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="search" className="w-32 bg-transparent outline-none placeholder:text-muted-foreground" />
        </label>
      </div>
      <div className="os-scroll grid flex-1 gap-3 overflow-auto p-4 sm:grid-cols-2">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpen(p)}
            className="focus-ring group flex flex-col rounded-2xl border p-4 text-left transition hover:border-[color:var(--frost)]"
            style={{ borderColor: "var(--window-border)", background: "color-mix(in oklab, var(--ink) 22%, transparent)" }}
          >
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {p.category} · {p.date}
            </div>
            <h3 className="mt-2 text-base font-semibold tracking-tight group-hover:text-[color:var(--frost)]">{p.title}</h3>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{p.excerpt}</p>
            <div className="mono mt-3 text-[10px] text-muted-foreground">{p.read} read →</div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="mono col-span-full grid place-items-center py-16 text-xs text-muted-foreground">
            nothing here. try another category.
          </div>
        )}
      </div>
    </div>
  );
}

