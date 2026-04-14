import { ExternalLink, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import portfolioEcommerce from "@/assets/portfolio-ecommerce.jpg";
import portfolioQuran from "@/assets/portfolio-quran.jpg";
import portfolioHealthcare from "@/assets/portfolio-healthcare.jpg";
import portfolioAi from "@/assets/portfolio-ai.jpg";

const PortfolioSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t.port1Title,
      category: t.port1Cat,
      description: t.port1Desc,
      metric: t.port1Metric,
      tags: ["WordPress", "PHP", "WooCommerce"],
      image: portfolioEcommerce.src,
    },
    {
      title: t.port2Title,
      category: t.port2Cat,
      description: t.port2Desc,
      metric: t.port2Metric,
      tags: ["React", "Next.js", "API"],
      image: portfolioQuran.src,
    },
    {
      title: t.port3Title,
      category: t.port3Cat,
      description: t.port3Desc,
      metric: t.port3Metric,
      tags: ["React", "Node.js", "MySQL"],
      image: portfolioHealthcare.src,
    },
    {
      title: t.port4Title,
      category: t.port4Cat,
      description: t.port4Desc,
      metric: t.port4Metric,
      tags: ["Linux", "Python", "AI"],
      image: portfolioAi.src,
    },
  ];

  return (
    <section id="portfolio" className="py-10 md:py-14 relative">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className="text-center mb-10 animate-fade-in-up"
          style={{ animationFillMode: "both" }}
        >
          <p className="text-sm uppercase tracking-widest text-secondary mb-3">{t.portfolioTag}</p>
          <h2 className="section-heading">
            {t.portfolioHeading} <span className="gradient-text">{t.portfolioHeadingHighlight}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="glass-card-hover group cursor-pointer relative overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              <div className="p-8 relative">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={18} className="text-primary" />
                </div>

                <span className="text-xs uppercase tracking-widest text-primary font-medium">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex items-center gap-2 mb-5 text-secondary text-sm font-medium">
                  <TrendingUp size={16} />
                  {project.metric}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-badge text-xs !py-1 !px-3">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
