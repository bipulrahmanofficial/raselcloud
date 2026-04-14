"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X, ExternalLink, TrendingUp, ArrowRight, Tag,
  Globe, ShoppingCart, Smartphone, Brain, PenTool, BarChart3,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORIES = ["All", "Web", "E-Commerce", "Mobile", "AI", "SEO"] as const;
type Category = typeof CATEGORIES[number];

const projects = [
  {
    id: 1,
    category: "E-Commerce",
    icon: ShoppingCart,
    title: "BazaarBD — Multi-vendor E-Commerce",
    tagline: "Bangladesh's growing online marketplace",
    description: "Full WooCommerce platform with bKash, Nagad & card payments. Real-time inventory, seller dashboard, and mobile-first checkout flow built for 50k+ daily users.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    tags: ["WooCommerce", "PHP", "bKash API", "MySQL", "Redis"],
    metric: "+40% sales in 30 days",
    metricVal: "40%",
    features: ["Multi-vendor seller portal", "bKash & Nagad gateway", "SMS order notifications", "Real-time inventory sync", "Mobile-first UI"],
    color: "from-orange-500/20 to-red-500/10",
    accent: "text-orange-400",
    year: "2024",
  },
  {
    id: 2,
    category: "Web",
    icon: Globe,
    title: "Quran Academy — Islamic Learning Portal",
    tagline: "Interactive Quran & Arabic learning platform",
    description: "Next.js-powered platform with audio recitations, tajweed lessons, and live tutoring. Supports Arabic RTL layouts, multi-level progress tracking, and certificate generation.",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=900&q=80",
    tags: ["Next.js", "React", "PostgreSQL", "Web Audio API", "RTL"],
    metric: "10k+ active students",
    metricVal: "10k+",
    features: ["Arabic RTL support", "Audio recitation player", "Live tutor scheduling", "Progress certificates", "Quiz & assessment engine"],
    color: "from-green-500/20 to-teal-500/10",
    accent: "text-green-400",
    year: "2024",
  },
  {
    id: 3,
    category: "Web",
    icon: Globe,
    title: "MedCare — Patient Management System",
    tagline: "Healthcare dashboard for clinics & hospitals",
    description: "React + Node.js dashboard for patient records, appointment scheduling, prescriptions, and billing. HIPAA-compliant with end-to-end encryption and role-based access.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    tags: ["React", "Node.js", "MySQL", "Encryption", "PDF"],
    metric: "60% faster appointments",
    metricVal: "60%",
    features: ["Patient record management", "Appointment scheduler", "Digital prescriptions", "Role-based access", "Automated billing"],
    color: "from-blue-500/20 to-cyan-500/10",
    accent: "text-blue-400",
    year: "2023",
  },
  {
    id: 4,
    category: "AI",
    icon: Brain,
    title: "AutoBot — AI Business Automation",
    tagline: "Intelligent workflow automation with GPT-4",
    description: "Python + Linux server AI suite automating invoice processing, customer email replies, social scheduling, and data reporting. Saved clients 70% of manual time.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
    tags: ["Python", "GPT-4 API", "Linux", "Celery", "Redis"],
    metric: "70% time saved",
    metricVal: "70%",
    features: ["AI email responder", "Invoice auto-processor", "Social media scheduler", "Report generator", "24/7 server automation"],
    color: "from-purple-500/20 to-pink-500/10",
    accent: "text-purple-400",
    year: "2024",
  },
  {
    id: 5,
    category: "Mobile",
    icon: Smartphone,
    title: "FoodRush — Restaurant Delivery App",
    tagline: "On-demand food delivery for Dhaka",
    description: "React Native app with real-time GPS tracking, live order status, and restaurant admin panel. Launched in 21 days. Handles 500+ orders per day with 99.9% uptime.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80",
    tags: ["React Native", "Node.js", "Socket.io", "Google Maps", "Stripe"],
    metric: "500+ daily orders",
    metricVal: "500+",
    features: ["Real-time GPS tracking", "Live order notifications", "Restaurant admin panel", "Rider assignment system", "Rating & review system"],
    color: "from-yellow-500/20 to-orange-500/10",
    accent: "text-yellow-400",
    year: "2024",
  },
  {
    id: 6,
    category: "SEO",
    icon: BarChart3,
    title: "StyleHouse BD — Fashion SEO Campaign",
    tagline: "Full-stack SEO & digital growth strategy",
    description: "6-month SEO + content strategy for a Dhaka fashion brand. Keyword research, technical SEO, link building, and Google Shopping ads. Achieved #1 ranking for 45 target keywords.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    tags: ["Technical SEO", "Google Ads", "Schema Markup", "Content", "Analytics"],
    metric: "#1 Google rank in BD",
    metricVal: "#1",
    features: ["45 keywords in top 3", "2× organic traffic", "Google Shopping ads", "Monthly SEO reports", "Core Web Vitals fixed"],
    color: "from-pink-500/20 to-rose-500/10",
    accent: "text-pink-400",
    year: "2023",
  },
  {
    id: 7,
    category: "E-Commerce",
    icon: ShoppingCart,
    title: "PropFinder BD — Real Estate Portal",
    tagline: "Buy, sell and rent properties in Bangladesh",
    description: "Full-stack property marketplace with map search, virtual tours, mortgage calculator, and agent dashboard. Over 8,000 listings in its first year of operation.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80",
    tags: ["Next.js", "PostgreSQL", "Google Maps", "Cloudinary", "Stripe"],
    metric: "8k+ property listings",
    metricVal: "8k+",
    features: ["Map-based search", "Virtual tour viewer", "Mortgage calculator", "Agent dashboard", "Lead management CRM"],
    color: "from-teal-500/20 to-green-500/10",
    accent: "text-teal-400",
    year: "2023",
  },
  {
    id: 8,
    category: "Mobile",
    icon: Smartphone,
    title: "EduTrack — Student Learning App",
    tagline: "Smart progress tracking for schools",
    description: "Cross-platform mobile app for schools to track attendance, grades, assignments, and parent communication. Used by 12 schools and 4,000+ students across Bangladesh.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    tags: ["Flutter", "Firebase", "Node.js", "Push Notifications", "PDF"],
    metric: "12 schools onboarded",
    metricVal: "12",
    features: ["Attendance tracker", "Grade management", "Parent portal", "Push notifications", "Certificate export"],
    color: "from-indigo-500/20 to-blue-500/10",
    accent: "text-indigo-400",
    year: "2024",
  },
];

const PortfolioPage = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [selected, closeModal]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-10 relative">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">

          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">{t.portfolioTag ?? "Our Work"}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t.portfolioHeading ?? "Portfolio"}{" "}
              <span className="gradient-text">{t.portfolioHeadingHighlight ?? "Showcase"}</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Real projects. Real results. Click any project to see the full case study.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]"
                    : "bg-muted/30 text-muted-foreground border-border/40 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((project, i) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelected(project)}
                  data-testid={`card-portfolio-${project.id}`}
                  className="group glass-card-hover cursor-pointer overflow-hidden relative animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "both" }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-[10px] uppercase tracking-wider font-semibold text-primary">
                      <Icon size={10} />
                      {project.category}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-foreground shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        View Case Study <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm leading-snug mb-1 line-clamp-1">{project.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{project.tagline}</p>

                    {/* Metric pill */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <TrendingUp size={11} />
                        {project.metric}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{project.year}</span>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 border border-border/40 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 border border-border/40 text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No projects in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* ── Detail Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-border/40 shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              data-testid="button-close-modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow"
            >
              <X size={16} />
            </button>

            {/* Hero image */}
            <div className="relative h-52 md:h-72 overflow-hidden rounded-t-2xl">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${selected.color} mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              {/* Floating metric */}
              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border/40 shadow-lg">
                  <TrendingUp size={14} className={selected.accent} />
                  <span className={`text-sm font-bold ${selected.accent}`}>{selected.metric}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold">{selected.category}</span>
                    <span className="text-xs text-muted-foreground">· {selected.year}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{selected.title}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{selected.tagline}</p>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6 text-sm md:text-base">{selected.description}</p>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selected.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag size={13} className="text-muted-foreground" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-foreground font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="btn-primary-glow flex-1 inline-flex items-center justify-center gap-2 text-sm"
                  data-testid="link-portfolio-contact"
                >
                  Build Something Similar <ArrowRight size={14} />
                </a>
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 rounded-xl border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                >
                  ← Back to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
