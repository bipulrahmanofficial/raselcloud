export const dynamic = "force-static";
import type { Metadata } from "next";
import PrivacyPage from "@/pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — rasel.cloud",
  description: "Privacy Policy for rasel.cloud. Learn how we collect, use, and protect your personal information.",
  robots: { index: false },
};

export default PrivacyPage;
