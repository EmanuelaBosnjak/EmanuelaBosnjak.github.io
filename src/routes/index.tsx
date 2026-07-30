import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/os/theme";
import { FrostOS } from "@/components/os/FrostOS";
import { SiteLanding } from "@/components/site/SiteLanding";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Emanuela Bošnjak Hofmaurerad | Artist & Developer" },
      {
        name: "description",
        content:
          "Portfolio of Emanuela Bošnjak Hofmaurerad with illustrations, digital art, small interfaces, and FrostOS, a fictional desktop.",
      },
      { property: "og:title", content: "Emanuela Bošnjak Hofmaurerad | Artist & Developer" },
      {
        property: "og:description",
        content:
          "Illustrations, digital art, and small interfaces. Browse the site or open FrostOS, a fictional desktop portfolio.",
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
