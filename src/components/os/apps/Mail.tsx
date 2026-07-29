import { useState } from "react";
import { Inbox, Send, Star, Circle } from "lucide-react";

export const CONTACT_EMAIL = "bemanuela3@gmail.com";

type Msg = { id: number; from: string; subject: string; preview: string; body: string; unread?: boolean; starred?: boolean; tag?: string };

const messages: Msg[] = [
  { id: 1, from: "Lina Torvik <lina@northlightgallery.se>", subject: "Winter Rooms — solo invitation", preview: "We'd love to host your Iceflower series in February…", body: "Dear Emanuela,\n\nWe would love to host your Iceflower series in our February program at North Light Gallery. Six weeks, one wall, quiet lighting.\n\nWe can offer a modest honorarium and cover framing. Let me know if you have room in your calendar.\n\nWarmly,\nLina", unread: true, starred: true, tag: "invite" },
  { id: 2, from: "commissions@studio-quiet.co", subject: "Illustration commission — book cover", preview: "Small press, poetry, deadline in April.", body: "Hi Emanuela — Studio Quiet here. We're publishing a poetry collection about forests and static; your work feels like the exact texture we're chasing. Deadline is loose (April). Budget attached.\n\nCould you share availability?", unread: true, tag: "work" },
  { id: 3, from: "root@frostos.local", subject: "SYSTEM :: cache warm", preview: "Frost cache primed. Wolf sighted at edge of grid.", body: "boot log 022 attached.\nnothing to worry about. the wolf has clearance.\n\n— root", tag: "system" },
  { id: 4, from: "J.", subject: "the cassette", preview: "I found it. Behind the radiator. Of course.", body: "found the cassette. behind the radiator. of course.\ncoffee friday?\n\nj.", unread: true },
  { id: 5, from: "webring@slowweb.club", subject: "New member request", preview: "hello.pines wants to join the frost webring", body: "hello.pines requests membership. site preview looks good — hand-coded, small, quiet. approve?" },
  { id: 6, from: "Mira Halden <mira@northlightgallery.se>", subject: "Re: prints for the shop", preview: "The A5 riso batch sold out already, congrats.", body: "Just so you know: the A5 riso batch is gone. Restock when you can. People keep asking about 'Cathedral of Pines' specifically.\n\nMira" },
  { id: 7, from: "no-reply@arcade.itch", subject: "SIGNAL//FOREST — 12 new plays", preview: "Weekly digest: 12 plays, avg session 4m21s", body: "Your tiny game keeps ticking along.\nTop referrer: your own portfolio.\n(that tracks.)" },
  { id: 8, from: "Papa", subject: "Fwd: recipe (again)", preview: "Sending the walnut bread thing. Don't lose it.", body: "here is the walnut bread recipe. for the fourth time. put it somewhere you'll actually find it.\n\np." },
  { id: 9, from: "unknown@—", subject: "you left the window open", preview: "the signal came through", body: "the signal came through last night. i think it liked the pines.\n\n(don't reply.)", starred: true, tag: "?" },
  { id: 10, from: "R. Osma <r.osma@museum.hr>", subject: "Group show — Adriatic Winters", preview: "Would you consider a piece for the March opening?", body: "Emanuela — long time. We're curating 'Adriatic Winters' and I keep coming back to your Quiet Signal. Could we borrow one? Insurance & transport covered.\n\nR.", tag: "invite" },
  { id: 11, from: "hello@risoprint.eu", subject: "Your quote is ready", preview: "40 copies, 2 colors (frost + fog), ready to print", body: "Quote #4412 attached. Turnaround 6 working days. Confirm and we ship.\n\n— riso team" },
  { id: 12, from: "birds@balcony", subject: "seeds pls", preview: "the feeder is empty. this is unacceptable.", body: "seeds. pls. the feeder is empty. the situation is dire.\n\nmanagement" },
];

export function MailApp() {
  const [tab, setTab] = useState<"inbox" | "compose">("inbox");
  const [selected, setSelected] = useState<Msg>(messages[0]);
  const [read, setRead] = useState<Set<number>>(new Set());

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const mailto = () => {
    const subject = encodeURIComponent(`portfolio message from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} <${form.email}>`);
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openMsg = (m: Msg) => {
    setSelected(m);
    setRead((s) => new Set(s).add(m.id));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b px-2 py-1.5" style={{ borderColor: "var(--window-border)" }}>
        {[
          { id: "inbox", label: "Inbox", icon: Inbox },
          { id: "compose", label: "Compose to Emanuela", icon: Send },
        ].map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`focus-ring mono flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] ${active ? "bg-[color:var(--accent)] text-foreground" : "text-muted-foreground hover:bg-[color:var(--accent)]"}`}
            >
              <Icon className="h-3 w-3" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "inbox" ? (
        <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-[280px_1fr]">
          <ul className="os-scroll overflow-auto border-r" style={{ borderColor: "var(--window-border)" }}>
            {messages.map((m) => {
              const isUnread = m.unread && !read.has(m.id);
              const isSel = selected.id === m.id;
              return (
                <li key={m.id}>
                  <button
                    onClick={() => openMsg(m)}
                    className={`focus-ring flex w-full flex-col items-start gap-0.5 border-b px-3 py-2 text-left text-xs ${isSel ? "bg-[color:var(--accent)]" : "hover:bg-[color:var(--accent)]/60"}`}
                    style={{ borderColor: "var(--window-border)" }}
                  >
                    <div className="flex w-full items-center gap-1.5">
                      {isUnread && <Circle className="h-1.5 w-1.5 fill-current" style={{ color: "var(--frost)" }} />}
                      {m.starred && <Star className="h-3 w-3 fill-current" style={{ color: "var(--frost)" }} />}
                      <span className="mono truncate text-[10px] text-muted-foreground">{m.from.split("<")[0].trim()}</span>
                    </div>
                    <div className={`truncate ${isUnread ? "font-semibold" : ""}`}>{m.subject}</div>
                    <div className="mono truncate text-[10px] text-muted-foreground">{m.preview}</div>
                  </button>
                </li>
              );
            })}
          </ul>
          <article className="os-scroll overflow-auto p-5">
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">{selected.tag ?? "message"}</div>
            <h2 className="mt-1 text-lg font-semibold">{selected.subject}</h2>
            <div className="mono mt-1 text-[11px] text-muted-foreground">from {selected.from}</div>
            <pre className="mt-5 whitespace-pre-wrap font-sans text-sm leading-relaxed">{selected.body}</pre>
          </article>
        </div>
      ) : (
        <form
          className="mx-auto flex w-full max-w-lg flex-col gap-3 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto();
          }}
        >
          <p className="mono text-[11px] text-muted-foreground">
            this composes a mail to <span className="text-foreground">{CONTACT_EMAIL}</span> using your mail client. no server is involved.
          </p>
          <label className="mono text-[11px] text-muted-foreground">
            your name
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="focus-ring mt-1 w-full rounded-lg border px-3 py-2 text-sm font-sans text-foreground" style={{ borderColor: "var(--border)", background: "var(--input)" }} />
          </label>
          <label className="mono text-[11px] text-muted-foreground">
            your email
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="focus-ring mt-1 w-full rounded-lg border px-3 py-2 text-sm font-sans text-foreground" style={{ borderColor: "var(--border)", background: "var(--input)" }} />
          </label>
          <label className="mono text-[11px] text-muted-foreground">
            message
            <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="focus-ring mt-1 w-full rounded-lg border px-3 py-2 text-sm font-sans text-foreground" style={{ borderColor: "var(--border)", background: "var(--input)" }} />
          </label>
          <button
            type="submit"
            className="focus-ring mono self-start rounded-lg bg-[color:var(--frost)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] hover:brightness-110"
          >
            send via mail app
          </button>
        </form>
      )}
    </div>
  );
}

