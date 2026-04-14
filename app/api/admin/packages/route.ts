import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@lib/auth";
import { listPackages, createPackage } from "@lib/firestore";
import { getLocalPackages } from "@lib/local-data";

const packageSchema = z.object({
  serviceId: z.string().min(1),
  name: z.string().min(1).max(100),
  tier: z.string().min(1),
  price: z.number().or(z.string()),
  features: z.array(z.string()),
  deliveryDays: z.number().int().positive(),
  revisions: z.number().int().min(0).nullable().optional(),
  isPopular: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  try {
    const allPackages = await listPackages();
    return NextResponse.json(allPackages);
  } catch {
    // Firebase unavailable — fall back to local db-export.json
    try {
      return NextResponse.json(getLocalPackages());
    } catch {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}


export async function POST(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  const body = await req.json().catch(() => null);
  const result = packageSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Validation failed", issues: result.error.issues }, { status: 400 });

  try {
    const pkg = await createPackage({
      serviceId: result.data.serviceId,
      name: result.data.name,
      tier: result.data.tier,
      price: String(result.data.price),
      features: result.data.features,
      deliveryDays: result.data.deliveryDays,
      revisions: result.data.revisions ?? null,
      isPopular: result.data.isPopular ?? false,
    });
    return NextResponse.json(pkg, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
