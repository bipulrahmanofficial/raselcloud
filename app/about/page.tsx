export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import AboutPage from "@/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us — rasel.cloud",
  description: "rasel.cloud is a full-service digital agency delivering web development, AI automation, SEO, and creative design for growing businesses worldwide. Learn our story.",
  alternates: { canonical: "https://rasel.cloud/about" },
  openGraph: {
    title: "About Us — rasel.cloud",
    description: "rasel.cloud is a full-service digital agency delivering web development, AI automation, SEO, and creative design for growing businesses worldwide. Learn our story.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/about",
  },
};

export default AboutPage;
