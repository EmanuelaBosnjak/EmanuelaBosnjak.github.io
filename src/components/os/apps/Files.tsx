import { useState } from "react";
import { Folder, FileText, Image as ImageIcon, Music, ChevronRight, Home, Eye, Sparkles } from "lucide-react";
import { ARTWORKS } from "@/lib/artworks";

type Node =
  | { kind: "folder"; name: string; hidden?: boolean; children: Node[] }
  | {
      kind: "file";
      name: string;
      ext: "txt" | "md" | "png" | "webp" | "mp3" | "log";
      body?: string;
      caption?: string;
      src?: string;
    };

const tree: Node = {
  kind: "folder",
  name: "home",
  children: [
    {
      kind: "folder",
      name: "Gallery",
      children: ARTWORKS.map((artwork) => ({
        kind: "file" as const,
        name: artwork.name,
        ext: "webp" as const,
        caption: `${artwork.title} · ${artwork.kind}`,
        src: artwork.src,
      })),
    },
    {
      kind: "folder",
      name: "Projects",
      children: [
        { kind: "file", name: "signal_forest_devlog", ext: "md", body: "# SIGNAL//FOREST\n\nA tiny grid game that started as a screensaver. Guide the signal through drifting shadows and collect frost fragments.\n\n- v0.1 : keyboard only\n- v0.2 : touch dpad\n- v0.3 : added ambient shadows" },
        { kind: "file", name: "cathedral_of_pines_prints", ext: "md", body: "# Prints\n\nA5 riso, 40 copies. Available on request via Mail." },
        { kind: "file", name: "webring_notes", ext: "md", body: "# frost webring\n\nA slow, hand-linked webring for artists who dislike the algorithm.\nCurrently 14 members. Ask to join." },
      ],
    },
    {
      kind: "folder",
      name: "Music",
      children: [
        { kind: "file", name: "pine_drone_loop", ext: "mp3", caption: "3:22 · ambient loop for painting" },
        { kind: "file", name: "morning_static", ext: "mp3", caption: "1:47 · field recording, january" },
        { kind: "file", name: "cassette_side_a", ext: "mp3", caption: "18:04 · mixtape / winter mood" },
      ],
    },
    {
      kind: "folder",
      name: "Notes",
      children: [
        { kind: "file", name: "commission_pricing", ext: "txt", body: "small (A5): 120€\nmedium (A4): 240€\nlarge (A3+): from 480€\ndelivery: 2–4 weeks\ncontact via Mail app" },
        { kind: "file", name: "reading_list_2026", ext: "md", body: "- The Living Mountain by Nan Shepherd\n- Woodland Radio by L. Marx\n- On Weathering by David Leatherbarrow\n- (loop) Piranesi by Susanna Clarke" },
        { kind: "file", name: "todo", ext: "txt", body: "[ ] finish iceflower iv\n[ ] answer J.\n[ ] rebuild webring index\n[x] feed the sourdough\n[ ] find that one cassette" },
      ],
    },
    { kind: "file", name: "About", ext: "txt", body: "hi, i'm emanuela.\ni draw, make characters, and write small programs.\nbased somewhere cold and answering mail slowly.\nthis desktop is my portfolio, so look around at your own pace.\n\neb" },
    { kind: "file", name: "readme", ext: "md", body: "# FrostOS\n\nYou're inside a fictional operating system. Nothing here needs installing.\nTry the Terminal. There's a small game called SIGNAL//FOREST." },
    {
      kind: "folder",
      name: ".hidden",
      hidden: true,
      children: [
        { kind: "file", name: "wolf_pact", ext: "txt", body: "the wolf and the signal have an agreement.\n(you found this. good.)" },
        { kind: "file", name: "boot_022_frost", ext: "log", body: "0.001 : kernel warm\n0.114 : frost cache primed\n0.290 : wolf sighted at edge of grid\n0.291 : this is fine" },
      ],
    },
  ],
};

function ArtTile({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="group overflow-hidden rounded-xl border" style={{ borderColor: "var(--window-border)" }}>
      <div className="relative aspect-square w-full overflow-hidden bg-[color:var(--ink)]">
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <figcaption className="mono truncate px-2 py-1.5 text-[10px] text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

export function FilesApp() {
  const [path, setPath] = useState<string[]>([]);
  const [showHidden, setShowHidden] = useState(false);
  const [selected, setSelected] = useState<Node | null>(null);

  let cwd: Node = tree;
  for (const seg of path) {
    if (cwd.kind === "folder") {
      const next = cwd.children.find((c) => c.name === seg);
      if (next) cwd = next;
    }
  }

  const isGallery = cwd.kind === "folder" && cwd.name === "Gallery";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-3 py-2 text-xs" style={{ borderColor: "var(--window-border)" }}>
        <button onClick={() => { setPath([]); setSelected(null); }} className="focus-ring rounded p-1 hover:bg-[color:var(--accent)]" aria-label="home">
          <Home className="h-3.5 w-3.5" />
        </button>
        <div className="mono flex flex-wrap items-center gap-1 text-muted-foreground">
          <span>~</span>
          {path.map((p, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              <button onClick={() => setPath(path.slice(0, i + 1))} className="hover:text-foreground">{p}</button>
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label className="mono flex cursor-pointer items-center gap-1 text-[11px] text-muted-foreground">
            <input type="checkbox" checked={showHidden} onChange={(e) => setShowHidden(e.target.checked)} />
            show hidden
          </label>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-[1fr_320px]">
        <div className="os-scroll overflow-auto p-4">
          {isGallery ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {cwd.kind === "folder" && cwd.children.map((c) => (
                <button key={c.name} onClick={() => setSelected(c)} className="focus-ring text-left">
                  <ArtTile
                    src={c.kind === "file" ? c.src ?? "" : ""}
                    caption={c.kind === "file" ? c.caption ?? c.name : c.name}
                  />
                </button>
              ))}
            </div>
          ) : cwd.kind === "folder" ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {cwd.children
                .filter((c) => showHidden || !(c.kind === "folder" && c.hidden) && !c.name.startsWith("."))
                .map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      if (c.kind === "folder") { setPath([...path, c.name]); setSelected(null); }
                      else setSelected(c);
                    }}
                    className="focus-ring flex flex-col items-center gap-1 rounded-xl border border-transparent p-3 text-center hover:border-[color:var(--window-border)] hover:bg-[color:var(--accent)]"
                  >
                    {c.kind === "folder" ? (
                      <Folder className="h-9 w-9" style={{ color: "var(--frost)" }} />
                    ) : c.ext === "png" || c.ext === "webp" ? (
                      <ImageIcon className="h-9 w-9" style={{ color: "var(--milk)" }} />
                    ) : c.ext === "mp3" ? (
                      <Music className="h-9 w-9" style={{ color: "var(--milk)" }} />
                    ) : (
                      <FileText className="h-9 w-9" style={{ color: "var(--milk)" }} />
                    )}
                    <span className="mono max-w-full truncate text-[11px]">
                      {c.name}{c.kind === "file" ? `.${c.ext}` : ""}
                    </span>
                  </button>
                ))}
            </div>
          ) : null}
        </div>

        <aside className="hidden border-l p-4 md:block" style={{ borderColor: "var(--window-border)" }}>
          {selected ? (
            <div className="flex h-full flex-col">
              <div className="mono flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Eye className="h-3 w-3" /> preview
              </div>
              <h3 className="mt-2 truncate text-sm font-semibold">
                {selected.name}{selected.kind === "file" ? `.${selected.ext}` : ""}
              </h3>
              <div className="os-scroll mt-3 flex-1 overflow-auto rounded-xl border p-3 text-xs" style={{ borderColor: "var(--window-border)", background: "color-mix(in oklab, var(--ink) 25%, transparent)" }}>
                {selected.kind === "file" && (selected.ext === "txt" || selected.ext === "md" || selected.ext === "log") ? (
                  <pre className="mono whitespace-pre-wrap leading-relaxed">{selected.body}</pre>
                ) : selected.kind === "file" && (selected.ext === "png" || selected.ext === "webp") ? (
                  <div className="flex flex-col gap-2">
                    <img
                      src={selected.src}
                      alt={selected.caption ?? selected.name}
                      className="max-h-[62vh] w-full rounded-lg object-contain"
                    />
                    <p className="mono text-[11px] text-muted-foreground">{selected.caption}</p>
                  </div>
                ) : selected.kind === "file" && selected.ext === "mp3" ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" style={{ color: "var(--frost)" }} />
                    <span className="mono text-[11px]">{selected.caption ?? "audio placeholder"}</span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">folder</p>
                )}
              </div>
            </div>
          ) : (
            <div className="mono grid h-full place-items-center text-center text-[11px] text-muted-foreground">
              select a file to preview
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
