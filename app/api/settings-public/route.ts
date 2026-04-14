import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const SETTINGS_FILE = path.join(process.cwd(), "scripts", "site-settings.json");

/** Public fields exposed to all visitors (no auth required) */
const PUBLIC_FIELDS = new Set([
  "siteName", "siteName_bn",
  "tagline", "tagline_bn",
  // Hero section
  "heroHeading", "heroHeading_bn",
  "heroSubheading", "heroSubheading_bn",
  "heroCtaText", "heroCtaText_bn",
  "heroCtaPrimaryUrl",
  "heroCtaSecondaryText", "heroCtaSecondaryText_bn",
  "heroCtaSecondaryUrl",
  // CTA banner section
  "ctaHeading", "ctaHeading_bn",
  "ctaDesc", "ctaDesc_bn",
  "ctaBtn1Text", "ctaBtn1Text_bn", "ctaBtn1Url",
  "ctaBtn2Text", "ctaBtn2Text_bn", "ctaBtn2Url",
  // Footer & contact
  "footerText", "footerText_bn",
  "contactEmail", "contactPhone", "contactAddress", "contactAddress_bn",
  "whatsappNumber",
  // Social
  "socialFacebook", "socialInstagram", "socialLinkedin",
  "socialTwitter", "socialYoutube", "socialGithub",
  // Misc
  "announcementBar", "announcementBar_bn", "announcementBarEnabled",
  "statsProjects", "statsClients", "statsYears", "statsSatisfaction",
  "statsTagline", "statsTagline_bn",
  "metaTitle", "metaTitle_bn",
  "metaDescription", "metaDescription_bn",
  "logoUrl", "faviconUrl",
  "primaryColor", "accentColor",
]);

function getDefaults(): Record<string, string | boolean> {
  return {
    siteName: "rasel.cloud",
    tagline: "Digital Agency & Web Solutions",
    // Hero section
    heroHeading: "",
    heroSubheading: "Custom web solutions, AI automation, SEO growth & creative media — built for businesses of every scale.",
    heroSubheading_bn: "কাস্টম ওয়েব সমাধান, এআই অটোমেশন, এসইও গ্রোথ — সব আকারের ব্যবসার জন্য তৈরি।",
    heroCtaText: "",
    heroCtaText_bn: "",
    heroCtaPrimaryUrl: "/contact",
    heroCtaSecondaryText: "",
    heroCtaSecondaryText_bn: "",
    heroCtaSecondaryUrl: "/portfolio",
    // CTA banner section
    ctaHeading: "",
    ctaHeading_bn: "",
    ctaDesc: "",
    ctaDesc_bn: "",
    ctaBtn1Text: "",
    ctaBtn1Text_bn: "",
    ctaBtn1Url: "/contact",
    ctaBtn2Text: "",
    ctaBtn2Text_bn: "",
    ctaBtn2Url: "/portfolio",
    // Footer
    footerText: "© 2025 rasel.cloud. All rights reserved.",
    footerText_bn: "© ২০২৫ রাসেল ক্লাউড। সর্বস্বত্ব সংরক্ষিত।",
    contactEmail: "hello@rasel.cloud",
    contactPhone: "+880 1700-000000",
    contactAddress: "Dhaka, Bangladesh",
    contactAddress_bn: "ঢাকা, বাংলাদেশ",
    whatsappNumber: "+8801700000000",
    socialFacebook: "https://facebook.com/raselcloud",
    socialInstagram: "https://instagram.com/raselcloud",
    socialLinkedin: "https://linkedin.com/company/raselcloud",
    socialTwitter: "https://twitter.com/raselcloud",
    socialYoutube: "",
    socialGithub: "https://github.com/raselcloud",
    announcementBar: "",
    announcementBar_bn: "",
    announcementBarEnabled: false,
    statsProjects: "150+",
    statsClients: "80+",
    statsYears: "5+",
    statsSatisfaction: "99%",
    metaTitle: "rasel.cloud — Digital Agency & Web Solutions",
    metaDescription: "Professional web development, AI automation, SEO, and social media management services.",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#ef4444",
    accentColor: "#f97316",
  };
}

function readAllSettings(): Record<string, string | boolean> {
  const defaults = getDefaults();
  if (!fs.existsSync(SETTINGS_FILE)) return defaults;
  try {
    return { ...defaults, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8")) };
  } catch {
    return defaults;
  }
}

/** GET /api/settings-public — no auth, returns only safe public fields */
export async function GET() {
  const all = readAllSettings();
  const pub: Record<string, string | boolean> = {};
  for (const key of PUBLIC_FIELDS) {
    if (key in all) pub[key] = all[key];
  }
  return NextResponse.json(pub, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
