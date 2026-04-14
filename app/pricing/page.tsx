export const revalidate = 3600;
import type { Metadata } from "next";
import PricingPage from "@/pages/PricingPage";

export const metadata: Metadata = {
  title: "Pricing — rasel.cloud",
  description: "Transparent, affordable pricing for web development, automation, SEO, and design services. Choose from Starter, Standard, or Premium tiers — no hidden fees.",
  alternates: { canonical: "https://rasel.cloud/pricing" },
  openGraph: {
    title: "Pricing — rasel.cloud",
    description: "Transparent, affordable pricing for web development, automation, SEO, and design services. Choose from Starter, Standard, or Premium tiers — no hidden fees.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/pricing",
  },
};

export default PricingPage;
