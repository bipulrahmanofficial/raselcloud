import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@lib/auth";
import { updateService, deleteService } from "@lib/firestore";

const serviceSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  slug: z.string().min(2).max(100).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  const body = await req.json().catch(() => null);
  const result = serviceSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Validation failed" }, { status: 400 });

  try {
    const updated = await updateService(params.id, result.data as Record<string, unknown>);
    if (!updated) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  try {
    await deleteService(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
