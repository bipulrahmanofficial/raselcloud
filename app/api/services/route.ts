import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  readLocalServices,
  readLocalPackages,
  getActiveLocalServices,
} from "@lib/local-services-store";

// Re-validate every 30s in production
export const revalidate = 30;

export async function GET(req: NextRequest) {
  const includePackages = req.nextUrl.searchParams.get("include") === "packages";

  try {
    const allServices = getActiveLocalServices();
    const allPkgs = readLocalPackages();

    if (includePackages) {
      const result = allServices.map((svc) => ({
        ...svc,
        packages: allPkgs.filter((p) => p.serviceId === svc.id),
      }));
      return NextResponse.json(result, {
        headers: { "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300" },
      });
    }

    // Build startingPrice from packages
    const priceMap = new Map<string, string>();
    for (const pkg of allPkgs) {
      const cur = priceMap.get(pkg.serviceId);
      if (cur === undefined || parseFloat(pkg.price) < parseFloat(cur)) {
        priceMap.set(pkg.serviceId, pkg.price);
      }
    }

    const result = allServices.map((svc) => ({
      ...svc,
      packages: allPkgs.filter((p) => p.serviceId === svc.id),
      startingPrice: priceMap.get(svc.id) ?? null,
    }));

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("Services API error:", err);
    return NextResponse.json([], { status: 200 });
  }
}
