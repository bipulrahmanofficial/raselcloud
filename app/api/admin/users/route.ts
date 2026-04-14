import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@lib/auth";
import { listUsers } from "@lib/firestore";

export async function GET(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  try {
    const allUsers = await listUsers();
    return NextResponse.json(
      allUsers.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt }))
    );
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
