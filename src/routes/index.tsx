import { createFileRoute } from "@tanstack/react-router";
import { BrEngineeringHome } from "@/components/br-engineering-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BR Engineering Company | Machinery & Machine Tools, Coimbatore" },
      { name: "description", content: "Workshop machinery, industrial machinery, machine tools and chucks from BR Engineering Company in Coimbatore." },
      { property: "og:title", content: "BR Engineering Company | Coimbatore" },
      { property: "og:description", content: "Reliable workshop machinery and engineering solutions backed by industry experience since 1976." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrEngineeringHome,
});
