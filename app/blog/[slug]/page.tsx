import type { Metadata } from "next";
import { listPublishedPosts, findPostBySlug } from "@lib/firestore";
import BlogPostPage from "@/pages/BlogPostPage";

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const posts = await listPublishedPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await findPostBySlug(params.slug);
    if (!post) return { title: "Post Not Found — rasel.cloud" };

    const description = post.excerpt || "Read this article on the rasel.cloud blog.";
    const canonical = `https://rasel.cloud/blog/${params.slug}`;
    return {
      title: `${post.title} — rasel.cloud`,
      description,
      alternates: { canonical },
      openGraph: {
        title: post.title,
        description,
        type: "article",
        siteName: "rasel.cloud",
        url: canonical,
        publishedTime: post.publishedAt ?? undefined,
        ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
      },
      twitter: {
        card: post.coverImage ? "summary_large_image" : "summary",
        title: post.title,
        description,
        ...(post.coverImage ? { images: [post.coverImage] } : {}),
      },
    };
  } catch {
    return { title: "Blog — rasel.cloud" };
  }
}

export default function Page({ params }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": params.slug,
    "publisher": {
      "@type": "Organization",
      "name": "rasel.cloud",
      "url": "https://rasel.cloud",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostPage />
    </>
  );
}
