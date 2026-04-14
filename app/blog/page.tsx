import type { Metadata } from "next";
import BlogPage from "@/pages/BlogPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — rasel.cloud",
  description: "Digital strategy, web development tips, SEO guides, and marketing insights from the rasel.cloud team — helping businesses grow online effectively.",
  alternates: { canonical: "https://rasel.cloud/blog" },
  openGraph: {
    title: "Blog — rasel.cloud",
    description: "Digital strategy, web development tips, SEO guides, and marketing insights from the rasel.cloud team — helping businesses grow online effectively.",
    type: "website",
    siteName: "rasel.cloud",
    url: "https://rasel.cloud/blog",
  },
};

export default BlogPage;
