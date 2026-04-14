"use client";

import { Target, Zap, Heart, Globe, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every project is a step toward transforming a business. We treat your goals as our own." },
  { icon: Zap, title: "Speed & Quality", desc: "Fast delivery without compromising on pixel-perfect quality and production-ready code." },
  { icon: Heart, title: "Client-Centric", desc: "24/7 support, transparent communication, and unlimited post-delivery assistance." },
  { icon: Globe, title: "Global Reach", desc: "Serving clients from Bangladesh to Europe, America, and beyond since 2020." },
  { icon: Award, title: "Proven Results", desc: "200+ projects completed, 98% client satisfaction, and growing every month." },
  { icon: Users, title: "Expert Team", desc: "A hand-picked team of designers, developers, AI engineers, and SEO specialists." },
];

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-10 relative">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 max-w-3xl mx-auto animate-fade-in-up">
            <p className="text-sm uppercase tracking-widest text-primary mb-3">{t.navAbout ?? "About Us"}</p>
            <h1 className="section-heading">
              The Team Behind <span className="gradient-text">rasel.cloud</span>
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              We are a full-service digital agency headquartered in Bangladesh, helping businesses across the globe build
              powerful web products, automate workflows with AI, and grow their digital presence.
            </p>
          </div>

          <div className="glass-card p-6 md:p-10 mb-10 max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                rasel.cloud was founded in 2020 by a group of passionate developers and designers who believed that every
                business — regardless of size — deserves enterprise-grade digital solutions at accessible prices.
              </p>
              <p>
                Starting with web development, we quickly expanded into AI automation, SEO, video production, and brand
                design as our clients' needs grew. Today, rasel.cloud is a trusted partner for startups, SMEs, and
                enterprise clients worldwide.
              </p>
              <p>
                We operate with a remote-first culture, drawing talent from across Bangladesh and collaborating with
                specialists globally. Our flat structure means every client gets direct access to the people actually
                building their product.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">Why We're Different</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="glass-card p-6 animate-fade-in-up"
                    data-testid={`card-value-${i}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{val.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
