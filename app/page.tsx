export const dynamic = "force-dynamic";
import IndexPage from "@/pages/Index";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "rasel.cloud",
    "url": "https://rasel.cloud",
    "logo": "https://rasel.cloud/logo.png",
    "description": "Full-service digital agency specializing in web development, AI automation, SEO, and creative design.",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://rasel.cloud/contact",
    },
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndexPage />
    </>
  );
}
