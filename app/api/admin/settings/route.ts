import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@lib/auth";
import * as fs from "fs";
import * as path from "path";

const SETTINGS_FILE = path.join(process.cwd(), "scripts", "site-settings.json");

function readSettings() {
  if (!fs.existsSync(SETTINGS_FILE)) return getDefaults();
  try { return { ...getDefaults(), ...JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8")) }; }
  catch { return getDefaults(); }
}

function getDefaults() {
  return {
    siteName: "rasel.cloud",
    tagline: "Digital Agency & Web Solutions",
    heroHeading: "We Build Digital Experiences That Drive Results",
    heroSubheading: "Custom websites, AI automation, SEO & social media management — everything your business needs to thrive online.",
    heroCtaText: "Get Started",
    heroCtaSecondaryText: "View Portfolio",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#ef4444",
    accentColor: "#f97316",
    footerText: "© 2025 rasel.cloud. All rights reserved.",
    contactEmail: "hello@rasel.cloud",
    contactPhone: "+880 1700-000000",
    contactAddress: "Dhaka, Bangladesh",
    whatsappNumber: "+8801700000000",
    socialFacebook: "https://facebook.com/raselcloud",
    socialInstagram: "https://instagram.com/raselcloud",
    socialLinkedin: "https://linkedin.com/company/raselcloud",
    socialTwitter: "https://twitter.com/raselcloud",
    socialYoutube: "",
    socialGithub: "https://github.com/raselcloud",
    metaTitle: "rasel.cloud — Digital Agency & Web Solutions",
    metaDescription: "Professional web development, AI automation, SEO, and social media management services from rasel.cloud.",
    announcementBar: "",
    announcementBarEnabled: false,
    maintenanceMode: false,
    googleAnalyticsId: "",
    facebookPixelId: "",
    statsProjects: "150+",
    statsClients: "80+",
    statsYears: "5+",
    statsSatisfaction: "99%",
  };
}

export async function GET(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });
  return NextResponse.json(readSettings());
}

export async function PUT(req: NextRequest) {
  const { user, error, status } = await requireAdmin(req);
  if (!user) return NextResponse.json({ error }, { status });
  try {
    const body = await req.json();
    const current = readSettings();
    const updated = { ...current, ...body };
    fs.mkdirSync(path.dirname(SETTINGS_FILE), { recursive: true });
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
