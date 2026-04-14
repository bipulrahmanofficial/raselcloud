"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Save, Globe, Palette, Phone, Share2, BarChart3, Code, Megaphone, RefreshCw } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { BilingualField } from "@/components/admin/BilingualField";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

type Settings = Record<string, string | boolean>;

const tabs = [
  { id: "general", label: "General", icon: Globe },
  { id: "hero", label: "Hero Section", icon: Megaphone },
  { id: "contact", label: "Contact Info", icon: Phone },
  { id: "social", label: "Social Media", icon: Share2 },
  { id: "stats", label: "Stats & Numbers", icon: BarChart3 },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "seo", label: "SEO & Analytics", icon: Code },
];

function Field({
  label, description, name, type = "text", value, onChange, placeholder,
}: {
  label: string;
  description?: string;
  name: string;
  type?: string;
  value: string | boolean;
  onChange: (name: string, val: string | boolean) => void;
  placeholder?: string;
}) {
  if (type === "toggle") {
    return (
      <div className="flex items-start justify-between gap-4 py-3 border-b border-white/5">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          {description && <p className="text-xs text-white/40 mt-0.5">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => onChange(name, !value)}
          className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${value ? "bg-red-500" : "bg-white/10"}`}
        >
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
        </button>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="py-3 border-b border-white/5">
        <label className="block text-sm font-medium text-white mb-1">{label}</label>
        {description && <p className="text-xs text-white/40 mb-2">{description}</p>}
        <textarea
          rows={3}
          value={value as string}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-red-500/50 resize-none transition-colors"
        />
      </div>
    );
  }

  if (type === "color") {
    return (
      <div className="flex items-center justify-between gap-4 py-3 border-b border-white/5">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          {description && <p className="text-xs text-white/40 mt-0.5">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value as string}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
          />
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-24 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-red-500/50"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 border-b border-white/5">
      <label className="block text-sm font-medium text-white mb-1">{label}</label>
      {description && <p className="text-xs text-white/40 mb-2">{description}</p>}
      <input
        type={type}
        value={value as string}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-red-500/50 transition-colors"
      />
    </div>
  );
}

const AdminSettings = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<Settings>({});
  const [dirty, setDirty] = useState(false);

  const { data, isLoading } = useQuery<Settings>({
    queryKey: ["/api/admin/settings"],
    queryFn: async () => {
      const r = await apiFetch("/api/admin/settings");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
  });

  useEffect(() => {
    if (data) { setSettings(data); setDirty(false); }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const r = await apiFetch("/api/admin/settings", { method: "PUT", body: JSON.stringify(settings) });
      if (!r.ok) throw new Error("Save failed");
      return r.json();
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(["/api/admin/settings"], saved);
      setDirty(false);
      toast.success("Settings saved successfully!");
    },
    onError: () => toast.error("Failed to save settings"),
  });

  const set = (name: string, val: string | boolean) => {
    setSettings((prev) => ({ ...prev, [name]: val }));
    setDirty(true);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "general": return (
        <div>
          <BilingualField label="Site Name" nameEn="siteName" nameBn="siteName_bn"
            valueEn={String(settings.siteName ?? "")} valueBn={String(settings.siteName_bn ?? "")}
            onChange={(n, v) => set(n, v)} placeholder="rasel.cloud" placeholderBn="রাসেল ক্লাউড" />
          <BilingualField label="Tagline" nameEn="tagline" nameBn="tagline_bn"
            valueEn={String(settings.tagline ?? "")} valueBn={String(settings.tagline_bn ?? "")}
            onChange={(n, v) => set(n, v)} placeholder="Digital Agency & Web Solutions" placeholderBn="ডিজিটাল এজেন্সি ও ওয়েব সমাধান" />
          <Field label="Logo URL" description="URL to your logo image (PNG/SVG recommended)" name="logoUrl" value={settings.logoUrl ?? ""} onChange={set} placeholder="https://..." />
          <Field label="Favicon URL" description="URL to your favicon (.ico or .png)" name="faviconUrl" value={settings.faviconUrl ?? ""} onChange={set} placeholder="https://..." />
          <BilingualField label="Footer Text" nameEn="footerText" nameBn="footerText_bn"
            valueEn={String(settings.footerText ?? "")} valueBn={String(settings.footerText_bn ?? "")}
            onChange={(n, v) => set(n, v)} placeholder="© 2025 rasel.cloud. All rights reserved." placeholderBn="© ২০২৫ রাসেল ক্লাউড। সর্বস্বত্ব সংরক্ষিত।" />
          <BilingualField label="Announcement Bar Text" nameEn="announcementBar" nameBn="announcementBar_bn"
            valueEn={String(settings.announcementBar ?? "")} valueBn={String(settings.announcementBar_bn ?? "")}
            onChange={(n, v) => set(n, v)} type="textarea"
            description="Shown as a top banner if enabled"
            placeholder="🎉 New: AI Agent packages now available!" placeholderBn="🎉 নতুন: এআই প্যাকেজ এখন পাওয়া যাচ্ছে!" />
          <Field label="Enable Announcement Bar" name="announcementBarEnabled" value={settings.announcementBarEnabled ?? false} onChange={set} type="toggle" />
          <Field label="Maintenance Mode" description="Shows a maintenance page to all visitors" name="maintenanceMode" value={settings.maintenanceMode ?? false} onChange={set} type="toggle" />
        </div>
      );

      case "hero": return (
        <div>
          <BilingualField label="Hero Heading" nameEn="heroHeading" nameBn="heroHeading_bn"
            valueEn={String(settings.heroHeading ?? "")} valueBn={String(settings.heroHeading_bn ?? "")}
            onChange={(n, v) => set(n, v)} type="textarea"
            placeholder="We Build Digital Experiences That Drive Results"
            placeholderBn="আমরা ডিজিটাল অভিজ্ঞতা তৈরি করি যা ফলাফল দেয়" />
          <BilingualField label="Hero Subheading" nameEn="heroSubheading" nameBn="heroSubheading_bn"
            valueEn={String(settings.heroSubheading ?? "")} valueBn={String(settings.heroSubheading_bn ?? "")}
            onChange={(n, v) => set(n, v)} type="textarea"
            placeholder="Custom websites, AI automation, SEO & social media management..."
            placeholderBn="কাস্টম ওয়েবসাইট, এআই অটোমেশন, এসইও ও সোশ্যাল মিডিয়া ম্যানেজমেন্ট..." />
          <BilingualField label="Primary CTA Button Text" nameEn="heroCtaText" nameBn="heroCtaText_bn"
            valueEn={String(settings.heroCtaText ?? "")} valueBn={String(settings.heroCtaText_bn ?? "")}
            onChange={(n, v) => set(n, v)} placeholder="Get Started" placeholderBn="শুরু করুন" />
          <BilingualField label="Secondary CTA Button Text" nameEn="heroCtaSecondaryText" nameBn="heroCtaSecondaryText_bn"
            valueEn={String(settings.heroCtaSecondaryText ?? "")} valueBn={String(settings.heroCtaSecondaryText_bn ?? "")}
            onChange={(n, v) => set(n, v)} placeholder="View Portfolio" placeholderBn="পোর্টফোলিও দেখুন" />
        </div>
      );

      case "contact": return (
        <div>
          <Field label="Contact Email" name="contactEmail" value={settings.contactEmail ?? ""} onChange={set} type="email" placeholder="hello@rasel.cloud" />
          <Field label="Contact Phone" name="contactPhone" value={settings.contactPhone ?? ""} onChange={set} type="tel" placeholder="+880 1700-000000" />
          <BilingualField label="Office Address" nameEn="contactAddress" nameBn="contactAddress_bn"
            valueEn={String(settings.contactAddress ?? "")} valueBn={String(settings.contactAddress_bn ?? "")}
            onChange={(n, v) => set(n, v)} placeholder="Dhaka, Bangladesh" placeholderBn="ঢাকা, বাংলাদেশ" />
          <Field label="WhatsApp Number" description="Include country code, e.g. +8801700000000" name="whatsappNumber" value={settings.whatsappNumber ?? ""} onChange={set} placeholder="+8801700000000" />
        </div>
      );

      case "social": return (
        <div>
          <Field label="Facebook URL" name="socialFacebook" value={settings.socialFacebook ?? ""} onChange={set} placeholder="https://facebook.com/..." />
          <Field label="Instagram URL" name="socialInstagram" value={settings.socialInstagram ?? ""} onChange={set} placeholder="https://instagram.com/..." />
          <Field label="LinkedIn URL" name="socialLinkedin" value={settings.socialLinkedin ?? ""} onChange={set} placeholder="https://linkedin.com/company/..." />
          <Field label="Twitter / X URL" name="socialTwitter" value={settings.socialTwitter ?? ""} onChange={set} placeholder="https://twitter.com/..." />
          <Field label="YouTube URL" name="socialYoutube" value={settings.socialYoutube ?? ""} onChange={set} placeholder="https://youtube.com/..." />
          <Field label="GitHub URL" name="socialGithub" value={settings.socialGithub ?? ""} onChange={set} placeholder="https://github.com/..." />
        </div>
      );

      case "stats": return (
        <div>
          <p className="text-xs text-white/40 pb-3 border-b border-white/5 mb-1">These numbers appear in the Stats section on the homepage.</p>
          <Field label="Projects Completed" name="statsProjects" value={settings.statsProjects ?? ""} onChange={set} placeholder="150+" />
          <Field label="Happy Clients" name="statsClients" value={settings.statsClients ?? ""} onChange={set} placeholder="80+" />
          <Field label="Years Experience" name="statsYears" value={settings.statsYears ?? ""} onChange={set} placeholder="5+" />
          <Field label="Client Satisfaction" name="statsSatisfaction" value={settings.statsSatisfaction ?? ""} onChange={set} placeholder="99%" />
          <BilingualField label="Stats Section Tagline" nameEn="statsTagline" nameBn="statsTagline_bn"
            valueEn={String(settings.statsTagline ?? "")} valueBn={String(settings.statsTagline_bn ?? "")}
            onChange={(n, v) => set(n, v)} placeholder="Numbers that speak for themselves"
            placeholderBn="সংখ্যাই বলে দেয় সব কিছু" />
        </div>
      );

      case "appearance": return (
        <div>
          <Field label="Primary Color" description="Main brand color (used for buttons, accents)" name="primaryColor" value={settings.primaryColor ?? "#ef4444"} onChange={set} type="color" />
          <Field label="Accent Color" description="Secondary highlight color" name="accentColor" value={settings.accentColor ?? "#f97316"} onChange={set} type="color" />
        </div>
      );

      case "seo": return (
        <div>
          <BilingualField label="Meta Title" nameEn="metaTitle" nameBn="metaTitle_bn"
            valueEn={String(settings.metaTitle ?? "")} valueBn={String(settings.metaTitle_bn ?? "")}
            onChange={(n, v) => set(n, v)}
            description="Browser tab & Google search title"
            placeholder="rasel.cloud — Digital Agency"
            placeholderBn="রাসেল ক্লাউড — ডিজিটাল এজেন্সি" />
          <BilingualField label="Meta Description" nameEn="metaDescription" nameBn="metaDescription_bn"
            valueEn={String(settings.metaDescription ?? "")} valueBn={String(settings.metaDescription_bn ?? "")}
            onChange={(n, v) => set(n, v)} type="textarea"
            description="Google search result description (150–160 chars)"
            placeholder="Professional web development, AI automation, SEO services..."
            placeholderBn="পেশাদার ওয়েব ডেভেলপমেন্ট, এআই অটোমেশন, এসইও সেবা..." />
          <Field label="Google Analytics ID" description="e.g. G-XXXXXXXXXX or UA-XXXXXXX" name="googleAnalyticsId" value={settings.googleAnalyticsId ?? ""} onChange={set} placeholder="G-XXXXXXXXXX" />
          <Field label="Facebook Pixel ID" name="facebookPixelId" value={settings.facebookPixelId ?? ""} onChange={set} placeholder="1234567890" />
        </div>
      );

      default: return null;
    }
  };

  return (
    <AdminLayout
      title="Site Settings"
      subtitle="Control every aspect of your website"
      actions={
        dirty ? (
          <button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {save.isPending ? "Saving..." : "Save Changes"}
          </button>
        ) : null
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={24} className="text-white/20 animate-spin" />
        </div>
      ) : (
        <div className="max-w-4xl flex gap-6">
          {/* Tab sidebar */}
          <div className="w-44 shrink-0">
            <div className="space-y-0.5 sticky top-20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-500/15 text-red-400"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70"
                  }`}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  {(() => {
                    const t = tabs.find((t) => t.id === activeTab)!;
                    return (
                      <div className="flex items-center gap-2">
                        <t.icon size={16} className="text-red-400" />
                        <h2 className="font-semibold text-white text-sm">{t.label}</h2>
                      </div>
                    );
                  })()}
                </div>
                <button
                  onClick={() => save.mutate()}
                  disabled={save.isPending || !dirty}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/15 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/25 disabled:opacity-30 transition-colors"
                >
                  <Save size={12} />
                  {save.isPending ? "Saving..." : "Save"}
                </button>
              </div>
              {renderTab()}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSettings;
