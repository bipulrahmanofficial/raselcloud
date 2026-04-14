import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/checkout", "/profile"],
      },
    ],
    sitemap: "https://rasel.cloud/sitemap.xml",
    host: "https://rasel.cloud",
  };
}
