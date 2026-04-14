export const revalidate = 3600;
import type { Metadata } from "next";
import ServicesPage from "@/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services — rasel.cloud",
  description: "Explore our full range of digital services: web development, AI automation, SEO, social media management, graphic design, and more — tailored for your business growth.",
  alternates: { canonical: "https://rasel.cloud/services" },
  openGraph: {
    title: "Services — rasel.cloud",
    description: "Explore our full range of digital services: web development, AI automation, SEO, social media management, graphic design, and more — tailored for your business growth.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/services",
  },
};

export default ServicesPage;
