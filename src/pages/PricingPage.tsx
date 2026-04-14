"use client";

import { useMemo } from "react";
import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLangValue } from "@/hooks/useLangValue";
import { useServicesWithPackages } from "@/hooks/useServices";
import { useCurrency } from "@/contexts/CurrencyContext";

const tierOrder = { basic: 0, standard: 1, premium: 2 } as const;

const PricingPage = () => {
  const { t } = useLanguage();
  const lv = useLangValue();
  const { data: services, isLoading } = useServicesWithPackages();
  const { formatPrice } = useCurrency();

  const sortedServices = useMemo(
    () =>
      (services || []).map((svc) => ({
        ...svc,
        sortedPackages: [...(svc.packages || [])].sort(
          (a, b) => (tierOrder[a.tier as keyof typeof tierOrder] ?? 3) - (tierOrder[b.tier as keyof typeof tierOrder] ?? 3)
        ),
      })),
    [services]
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-10 relative">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 animate-fade-in-up">
            <p className="text-sm uppercase tracking-widest text-primary mb-3">{t.pricingTag}</p>
            <h1 className="section-heading">
              {t.pricingHeading} <span className="gradient-text">{t.pricingHeadingHighlight}</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Each service has three package tiers — Basic, Standard, and Premium. Click a service to compare packages and order.
            </p>
          </div>

          {isLoading ? (
            <div className="min-h-[400px]" />
          ) : (
            <div className="space-y-16 max-w-5xl mx-auto">
              {sortedServices.map((svc) => (
                  <div key={svc.id} className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Package size={18} className="text-primary" />
                        {lv(svc.title, (svc as Record<string,string>).title_bn)}
                      </h2>
                      <Link
                        href={`/services/${svc.slug}`}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                        data-testid={`link-pricing-detail-${svc.id}`}
                      >
                        See full details <ArrowRight size={13} />
                      </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {svc.sortedPackages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`glass-card p-6 relative transition-all duration-300 hover:scale-[1.02] ${
                            pkg.isPopular ? "red-glow glow-border" : "hover:border-border/80"
                          }`}
                          data-testid={`card-pricing-${pkg.id}`}
                        >
                          {pkg.isPopular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                              Most Popular
                            </div>
                          )}
                          <h3 className="font-bold text-foreground mb-1">{pkg.name}</h3>
                          <div className="text-2xl font-bold gradient-text mb-4">
                            {formatPrice(parseFloat(pkg.price))}
                          </div>
                          <p className="text-xs text-muted-foreground mb-4">
                            {pkg.deliveryDays} days · {pkg.revisions === null ? "Unlimited" : pkg.revisions} revisions
                          </p>
                          <Link
                            href={`/services/${svc.slug}`}
                            className={`w-full inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-lg transition-all ${
                              pkg.isPopular ? "btn-primary-glow" : "btn-secondary-outline"
                            }`}
                            data-testid={`link-order-pricing-${pkg.id}`}
                          >
                            Order Now <ArrowRight size={13} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PricingPage;
