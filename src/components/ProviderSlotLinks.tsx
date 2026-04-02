import { Link } from "react-router-dom";
import { ArrowRight, Link } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { PROVIDER_TO_SLOTS, PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";

/**
 * Renders links to slot guides for a given provider.
 * Used on provider pages to create bidirectional equity flow.
 */
interface ProviderSlotLinksProps {
  providerSlug: string;
}

export function ProviderSlotLinks({ providerSlug }: ProviderSlotLinksProps) {
  const slots = PROVIDER_TO_SLOTS[providerSlug];
  const providerName = PROVIDER_DISPLAY_NAMES[providerSlug] || providerSlug;

  if (!slots || slots.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
        <MenuIcon iconName="gamepad2" className="h-7 w-7 text-primary" />
        Spilguides fra {providerName}
      </h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Læs vores dybdegående guides til de mest populære spillemaskiner fra {providerName}.
        Hver guide dækker RTP, volatilitet, bonusfunktioner og optimal strategi.
      </p>
      <ul className="space-y-2">
        {slots.map((slot) => (
          <li key={slot.slug}>
            <Link
              to={`/casinospil/spillemaskiner/${slot.slug}`}
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <MenuIcon iconName="gamepad2" className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="flex-1">{slot.name} – komplet guide</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
