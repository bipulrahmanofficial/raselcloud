"use client";

import { ExternalLink, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLangValue } from "@/hooks/useLangValue";
import { useQuery } from "@tanstack/react-query";

interface PortfolioItem {
  id: string;
  category: string;
  title: string;       title_bn?: string;
  tagline: string;     tagline_bn?: string;
  description: string; description_bn?: string;
  image: string;
  tags: string[];
  metric: string;      metric_bn?: string;
  year: string;
  liveUrl?: string;
  isActive?: boolean;
}

const DemoSection = () => {
  const { t } = useLanguage();
  const lv = useLangValue();

  const { data: allItems = [] } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio-demos"],
    queryFn: async () => {
      const r = await fetch("/api/admin/portfolio");
      if (!r.ok) return [];
      return r.json();
    },
    staleTime: 60_000,
  });

  // One demo per category — pick the first active item in each category
  const seenCategories = new Set<string>();
  const demos: PortfolioItem[] = [];
  for (const item of allItems) {
    if (item.isActive === false) continue;
    const cat = (item.category || "").trim();
    if (!cat || seenCategories.has(cat)) continue;
    seenCategories.add(cat);
    demos.push(item);
  }

  if (demos.length === 0) return null;

  return (
    <section id="demos" className="py-10 md:py-14 relative">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-10 animate-fade-in-up" style={{ animationFillMode: "both" }}>
          <p className="text-sm uppercase tracking-widest text-secondary mb-3" suppressHydrationWarning>
            {lv("Our Work", "আমাদের কাজ")}
          </p>
          <h2 className="section-heading" suppressHydrationWarning>
            {lv("Service", "সেবা")} <span className="gradient-text">{lv("Demos", "ডেমোসমূহ")}</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm" suppressHydrationWarning>
            {lv(
              "Explore one live demo from each of our service categories.",
              "আমাদের প্রতিটি সেবা বিভাগ থেকে একটি করে লাইভ ডেমো দেখুন।"
            )}
          </p>
        </div>

        {/* Cards grid — same design as PortfolioSection */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {demos.map((project, i) => (
            <div
              key={project.id}
              className="glass-card-hover group cursor-pointer relative overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={lv(project.title, project.title_bn)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 relative">
                {/* External link icon */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={18} className="text-primary" />
                  </a>
                )}
                {!project.liveUrl && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={18} className="text-primary" />
                  </div>
                )}

                {/* Category badge */}
                <span className="text-xs uppercase tracking-widest text-primary font-medium">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground" suppressHydrationWarning>
                  {lv(project.title, project.title_bn)}
                </h3>

                {/* Tagline */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4" suppressHydrationWarning>
                  {lv(project.tagline, project.tagline_bn) || lv(project.description, project.description_bn)}
                </p>

                {/* Metric */}
                {project.metric && (
                  <div className="flex items-center gap-2 mb-5 text-secondary text-sm font-medium" suppressHydrationWarning>
                    <TrendingUp size={16} />
                    {lv(project.metric, project.metric_bn)}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tech-badge text-xs !py-1 !px-3">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 btn-secondary-outline px-6 py-3 text-sm font-semibold"
            suppressHydrationWarning
          >
            {lv("View Full Portfolio", "সম্পূর্ণ পোর্টফোলিও দেখুন")}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
