export const dynamic = "force-static";
import type { Metadata } from "next";
import FaqPage from "@/pages/FaqPage";

export const metadata: Metadata = {
  title: "FAQ — rasel.cloud",
  description: "Frequently asked questions about rasel.cloud digital agency — covering services, pricing, project timelines, revisions, payment methods, and support process.",
  alternates: { canonical: "https://rasel.cloud/faq" },
  openGraph: {
    title: "FAQ — rasel.cloud",
    description: "Frequently asked questions about rasel.cloud digital agency — covering services, pricing, project timelines, revisions, payment methods, and support process.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/faq",
  },
};

export default FaqPage;
