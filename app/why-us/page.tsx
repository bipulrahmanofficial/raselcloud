export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import WhyUsPage from "@/pages/WhyUsPage";

export const metadata: Metadata = {
  title: "Why Choose Us — rasel.cloud",
  description: "Discover why 30+ clients trust rasel.cloud for web development, automation, and digital marketing. Results-driven, transparent, affordable.",
  alternates: { canonical: "https://rasel.cloud/why-us" },
  openGraph: {
    title: "Why Choose Us — rasel.cloud",
    description: "Discover why 30+ clients trust rasel.cloud for web development, automation, and digital marketing.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/why-us",
  },
};

export default WhyUsPage;
