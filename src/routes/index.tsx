import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/os/theme";
import { FrostOS } from "@/components/os/FrostOS";
import { SiteLanding } from "@/components/site/SiteLanding";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Emanuela Bošnjak Hofmaurerad — Artist & Developer" },
      {
        name: "description",
        content:
          "Portfolio of Emanuela Bošnjak Hofmaurerad: winter paintings, risograph prints, sound and small interfaces — explorable as FrostOS, a fictional desktop.",
      },
      { property: "og:title", content: "Emanuela Bošnjak Hofmaurerad — Artist & Developer" },
      {
        property: "og:description",
        content:
          "Winter paintings, prints, sound and small interfaces — browse the site or boot FrostOS, a fictional desktop portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [desktop, setDesktop] = useState(false);
  return (
    <ThemeProvider>
      {desktop ? <FrostOS onExit={() => setDesktop(false)} /> : <SiteLanding onEnterDesktop={() => setDesktop(true)} />}
    </ThemeProvider>
  );
}

