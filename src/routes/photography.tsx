import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonCat } from "@/components/site/ComingSoonCat";
import { FrostSubpage } from "@/components/site/FrostSubpage";

export const Route = createFileRoute("/photography")({
  component: PhotographyPage,
  head: () => ({
    meta: [
      { title: "Photography | Emanuela Bošnjak" },
      {
        name: "description",
        content: "Emanuela Bošnjak's photography archive is coming soon.",
      },
    ],
  }),
});

function PhotographyPage() {
  return (
    <FrostSubpage
      active="photography"
      eyebrow={{ en: "~/archive/photography.html", sr: "~/arhiva/fotografija.html" }}
      title={{ en: "PHOTOGRAPHY", sr: "FOTOGRAFIJA" }}
      subtitle={{
        en: "A personal archive of weather, places, and quiet details is currently being developed.",
        sr: "Lična arhiva vremena, mesta i tihih detalja je trenutno u izradi.",
      }}
    >
      {(language) => <ComingSoonCat language={language} page="photography" />}
    </FrostSubpage>
  );
}
