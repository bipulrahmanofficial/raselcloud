import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@lib/auth";
import { listOrders } from "@lib/firestore";

export async function GET(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  try {
    const allOrders = await listOrders();
    return NextResponse.json(allOrders);
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
