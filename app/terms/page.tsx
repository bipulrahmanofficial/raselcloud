export const dynamic = "force-static";
import type { Metadata } from "next";
import TermsPage from "@/pages/TermsPage";

export const metadata: Metadata = {
  title: "Terms of Service — rasel.cloud",
  description: "Terms of Service for rasel.cloud digital agency. Read our policies for service usage, payments, and deliverables.",
  robots: { index: false },
};

export default TermsPage;
