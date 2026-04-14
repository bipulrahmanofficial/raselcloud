import { NextRequest, NextResponse } from "next/server";
import { findServiceBySlug, listPackages } from "@lib/firestore";

export const revalidate = 60;

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  try {
    const svc = await findServiceBySlug(slug);
    if (!svc) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    const packages = await listPackages(svc.id);
    return NextResponse.json({ ...svc, packages }, {
      headers: { "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("Service detail error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
