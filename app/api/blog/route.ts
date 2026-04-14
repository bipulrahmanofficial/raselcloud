import { NextResponse } from "next/server";
import { listPublishedPosts, findUserById } from "@lib/firestore";

export const revalidate = 3600;

export async function GET() {
  try {
    const posts = await listPublishedPosts();
    const authorIds = Array.from(new Set(posts.map((p) => p.authorId).filter(Boolean) as string[]));
    const authorMap = new Map<string, string>();
    await Promise.all(
      authorIds.map(async (id) => {
        const user = await findUserById(id);
        if (user) authorMap.set(id, user.name);
      })
    );
    const result = posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage ?? null,
      tags: post.tags,
      publishedAt: post.publishedAt ?? null,
      createdAt: post.createdAt,
      authorName: post.authorName ?? (post.authorId ? (authorMap.get(post.authorId) ?? null) : null),
    }));
    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
