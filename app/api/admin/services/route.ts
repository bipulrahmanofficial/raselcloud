import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@lib/auth";
import { listServices, listPackages, createService } from "@lib/firestore";

const serviceSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(100),
  category: z.string().min(1),
  description: z.string(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  try {
    const allServices = await listServices(false);
    const allPackages = await listPackages();
    const result = allServices.map((svc) => ({
      ...svc,
      packages: allPackages.filter((p) => p.serviceId === svc.id),
    }));
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });

  const body = await req.json().catch(() => null);
  const result = serviceSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Validation failed", issues: result.error.issues }, { status: 400 });

  try {
    const { title, slug, category, description, imageUrl, tags, isActive } = result.data;
    const svc = await createService({
      title,
      slug,
      category,
      description,
      tags: tags ?? [],
      isActive: isActive ?? true,
      imageUrl: imageUrl ?? null,
    });
    return NextResponse.json(svc, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
