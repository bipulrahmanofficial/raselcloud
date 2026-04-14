import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { listServices, listPackages } from "@lib/firestore";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const includePackages = req.nextUrl.searchParams.get("include") === "packages";

  try {
    const svcs = await listServices(true);

    if (includePackages) {
      const allPkgs = await listPackages();
      const result = svcs.map((svc) => ({
        ...svc,
        packages: allPkgs.filter((p) => p.serviceId === svc.id),
      }));
      return NextResponse.json(result, {
        headers: { "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300" },
      });
    }

    const allPkgs = await listPackages();
    const priceMap = new Map<string, string>();
    for (const pkg of allPkgs) {
      const cur = priceMap.get(pkg.serviceId);
      if (cur === undefined || parseFloat(pkg.price) < parseFloat(cur)) {
        priceMap.set(pkg.serviceId, pkg.price);
      }
    }

    const result = svcs.map((svc) => ({
      ...svc,
      description: svc.description.slice(0, 160),
      startingPrice: priceMap.get(svc.id) ?? null,
    }));

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("Services fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
