import { NextResponse } from "next/server";
import { readPortfolio } from "@/app/api/admin/portfolio/route";

// Public endpoint — no auth required, returns all active portfolio items
export async function GET() {
  try {
    const items = readPortfolio();
    return NextResponse.json(items, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
