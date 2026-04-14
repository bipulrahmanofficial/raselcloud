export const dynamic = "force-static";
import type { Metadata } from "next";
import ContactPage from "@/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — rasel.cloud",
  description: "Get in touch with rasel.cloud for a free consultation on web development, AI automation, SEO, or design. We respond within 24 hours — let's build something great.",
  alternates: { canonical: "https://rasel.cloud/contact" },
  openGraph: {
    title: "Contact Us — rasel.cloud",
    description: "Get in touch with rasel.cloud for a free consultation on web development, AI automation, SEO, or design. We respond within 24 hours — let's build something great.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/contact",
  },
};

export default ContactPage;
