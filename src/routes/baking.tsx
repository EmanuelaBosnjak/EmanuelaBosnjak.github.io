import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCat } from "@/components/site/ComingSoonCat";
import { FrostSubpage } from "@/components/site/FrostSubpage";

export const Route = createFileRoute("/baking")({
  component: BakingPage,
  head: () => ({
    meta: [
      { title: "Baking Diary | Emanuela Bošnjak" },
      {
        name: "description",
        content: "Emanuela's baking diary is coming soon.",
      },
    ],
  }),
});

function BakingPage() {
  return (
    <FrostSubpage
      active="baking"
      eyebrow={{ en: "~/personal/baking_log.html", sr: "~/licno/dnevnik_pecenja.html" }}
      title={{ en: "BAKING DIARY", sr: "DNEVNIK PEČENJA" }}
      subtitle={{
        en: "Recipes, experiments, and kitchen notes are currently baking behind the scenes.",
        sr: "Recepti, eksperimenti i kuhinjske beleške se trenutno peku iza scene.",
      }}
    >
      {(language) => <ComingSoonCat language={language} page="baking" />}
    </FrostSubpage>
  );
}
