export const revalidate = 3600;
import type { Metadata } from "next";
import PortfolioPage from "@/pages/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio — rasel.cloud",
  description: "Browse our portfolio of successful web development, e-commerce, mobile, AI, and SEO projects delivered to clients across Bangladesh and worldwide.",
  alternates: { canonical: "https://rasel.cloud/portfolio" },
  openGraph: {
    title: "Portfolio — rasel.cloud",
    description: "Browse our portfolio of successful web development, e-commerce, mobile, AI, and SEO projects delivered to clients across Bangladesh and worldwide.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/portfolio",
  },
};

export default PortfolioPage;
