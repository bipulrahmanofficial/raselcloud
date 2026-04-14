import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@lib/auth";
import { updatePackage, deletePackage } from "@lib/firestore";

const packageSchema = z.object({
  serviceId: z.string().min(1).optional(),
  name: z.string().min(1).max(100).optional(),
  tier: z.string().min(1).optional(),
  price: z.number().or(z.string()).optional(),
  features: z.array(z.string()).optional(),
  deliveryDays: z.number().int().positive().optional(),
  revisions: z.number().int().min(0).nullable().optional(),
  isPopular: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  const body = await req.json().catch(() => null);
  const result = packageSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Validation failed" }, { status: 400 });

  try {
    const { price, ...rest } = result.data;
    const data = { ...rest, ...(price !== undefined ? { price: String(price) } : {}) };
    const updated = await updatePackage(params.id, data);
    if (!updated) return NextResponse.json({ error: "Package not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  try {
    await deletePackage(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
