"use client";

type GeoLocale = { lang: "en" | "bn"; currency: "BDT" | "USD" };

const COUNTRY_KEY = "rc_country";

let _promise: Promise<GeoLocale> | null = null;

async function fetchCountry(): Promise<string> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 3500);
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    const data = await res.json();
    const code = (data.country_code as string) || "UNKNOWN";
    try { localStorage.setItem(COUNTRY_KEY, code); } catch {}
    return code;
  } finally {
    clearTimeout(id);
  }
}

export function detectGeoLocale(): Promise<GeoLocale> {
  if (_promise) return _promise;
  _promise = (async (): Promise<GeoLocale> => {
    try {
      const cached = localStorage.getItem(COUNTRY_KEY);
      const country = cached !== null ? cached : await fetchCountry();
      return country === "BD"
        ? { lang: "bn", currency: "BDT" }
        : { lang: "en", currency: "USD" };
    } catch {
      return { lang: "en", currency: "USD" };
    }
  })();
  return _promise;
}
