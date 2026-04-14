import { Check, Clock, RefreshCw, Zap, ShoppingCart } from "lucide-react";
import type { Package, Service } from "@/hooks/useServices";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toast } from "sonner";

interface PackageCardProps {
  pkg: Package;
  service: Service;
  index?: number;
}

const PackageCard = ({ pkg, service, index = 0 }: PackageCardProps) => {
  const { addItem, items } = useCart();
  const { formatPrice } = useCurrency();
  const inCart = items.some((i) => i.id === pkg.id);

  const handleOrder = () => {
    if (inCart) return;
    addItem({
      id: pkg.id,
      serviceId: service.id,
      serviceName: service.title,
      packageId: pkg.id,
      packageName: pkg.name,
      price: parseFloat(pkg.price),
      tier: pkg.tier,
    });
    toast.success(`${pkg.name} package added to cart!`);
  };

  return (
    <div
      className={`glass-card p-8 relative flex flex-col transition-all duration-500 animate-fade-in-up ${
        pkg.isPopular
          ? "red-glow scale-105 glow-border"
          : "hover:border-border/80 hover:scale-[1.02]"
      }`}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
      data-testid={`card-package-${pkg.id}`}
    >
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
          <Zap size={12} />
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-1" data-testid={`text-package-name-${pkg.id}`}>{pkg.name}</h3>
        <div className="text-4xl font-bold gradient-text mt-3">
          {formatPrice(parseFloat(pkg.price))}
          <span className="text-sm text-muted-foreground font-normal"> /project</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-primary/70" />
          {pkg.deliveryDays} days
        </span>
        <span className="flex items-center gap-1.5">
          <RefreshCw size={14} className="text-primary/70" />
          {pkg.revisions === null ? "Unlimited" : pkg.revisions} revisions
        </span>
      </div>

      <ul className="space-y-2.5 mb-8 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
            <Check size={15} className="text-primary shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={handleOrder}
        disabled={inCart}
        className={`w-full inline-flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-lg transition-all duration-300 ${
          inCart
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : pkg.isPopular
            ? "btn-primary-glow animate-pulse-cta"
            : "btn-secondary-outline"
        }`}
        data-testid={`button-order-${pkg.id}`}
      >
        <ShoppingCart size={16} />
        {inCart ? "Added to Cart" : "Order Now"}
      </button>
    </div>
  );
};

export default PackageCard;
