export const dynamic = "force-static";
import type { Metadata } from "next";
import TeamPage from "@/pages/TeamPage";

export const metadata: Metadata = {
  title: "Our Team — rasel.cloud",
  description: "Meet the talented designers, developers, and digital strategists behind rasel.cloud who are passionate about building exceptional digital experiences for every client.",
  alternates: { canonical: "https://rasel.cloud/team" },
  openGraph: {
    title: "Our Team — rasel.cloud",
    description: "Meet the talented designers, developers, and digital strategists behind rasel.cloud who are passionate about building exceptional digital experiences for every client.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud/team",
  },
};

export default TeamPage;
