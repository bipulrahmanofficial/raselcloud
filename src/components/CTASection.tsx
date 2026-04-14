import { Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10 md:py-14 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className="glass-card p-10 md:p-16 text-center max-w-4xl mx-auto border-primary/20 animate-fade-in-up"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="section-heading text-3xl md:text-5xl mb-6">
            {t.ctaHeading1} <span className="gradient-text">{t.ctaHeadingHighlight}</span> {t.ctaHeading2}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary-glow inline-flex items-center justify-center gap-2 text-base animate-pulse-cta">
              <Phone size={20} />
              {t.ctaCta1}
            </a>
            <a href="#portfolio" className="btn-secondary-outline inline-flex items-center justify-center gap-2 text-base">
              {t.ctaCta2}
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
