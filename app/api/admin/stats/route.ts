import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@lib/auth";
import { countOrders, countUsers, sumOrderRevenue, recentOrders } from "@lib/firestore";

export async function GET(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  try {
    const [totalOrders, totalUsers, totalRevenue, recent] = await Promise.all([
      countOrders(),
      countUsers(),
      sumOrderRevenue(),
      recentOrders(10),
    ]);

    return NextResponse.json({
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue.toFixed(2),
      recentOrders: recent,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
