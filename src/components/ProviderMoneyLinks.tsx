import { Link } from "react-router-dom";
import { ArrowRight, Gift, Star, Sparkles, CreditCard } from "lucide-react";

/**
 * Contextual money-page links for provider hub pages (/spillemaskiner/*).
 * Distributes link equity from ~13 provider hubs to core commercial pages.
 * Uses hash-based intro variation to reduce template footprint.
 */

interface ProviderMoneyLinksProps {
  providerName: string;
  providerSlug: string;
  slotCount?: number;
}

const MONEY_LINKS = [
  {
    to: "/casino-anmeldelser",
    icon: Star,
    title: "Casino Anmeldelser",
    getDesc: (name: string) =>
      `Find de bedst ratede casinoer med ${name} spillemaskiner – vores anmeldelser dækker bonus, udbetaling og spiludvalg.`,
  },
  {
    to: "/casino-bonus",
    icon: Gift,
    title: "Bedste Casino Bonus",
    getDesc: (name: string) =>
      `Sammenlign de bedste bonustilbud og brug dem på ${name} slots – vi har testet omsætningskrav og vilkår.`,
  },
  {
    to: "/free-spins",
    icon: Sparkles,
    title: "Free Spins Tilbud",
    getDesc: (name: string) =>
      `Se aktuelle free spins tilbud, som kan bruges på populære ${name} spillemaskiner.`,
  },
  {
    to: "/velkomstbonus",
    icon: CreditCard,
    title: "Velkomstbonus Guide",
    getDesc: (name: string) =>
      `Forstå velkomstbonusser og find det bedste tilbud til at komme i gang med ${name} slots.`,
  },
];

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const INTRO_VARIANTS = [
  (name: string, count?: number) =>
    `Vil du spille ${name} spillemaskiner${count ? ` – vi har ${count}+ i vores katalog` : ""}? Find de bedste casinoer, bonusser og free spins til ${name} herunder.`,
  (name: string) =>
    `Udnyt dit spil på ${name} slots bedst muligt med den rette bonus og det rette casino. Her er vores anbefalinger.`,
  (name: string) =>
    `Vi har samlet de vigtigste ressourcer til dig, der vil spille ${name}. Fra casino-anmeldelser til aktuelle bonustilbud.`,
];

export function ProviderMoneyLinks({ providerName, providerSlug, slotCount }: ProviderMoneyLinksProps) {
  const hash = simpleHash(providerSlug);
  const introFn = INTRO_VARIANTS[hash % INTRO_VARIANTS.length];

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
        <Gift className="h-7 w-7 text-primary" />
        Bonus & Casinoer med {providerName}
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        {introFn(providerName, slotCount)}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {MONEY_LINKS.map(({ to, icon: Icon, title, getDesc }) => (
          <Link
            key={to}
            to={to}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
          >
            <Icon className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getDesc(providerName)}
              </p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        Er du på udkig efter et helt nyt casino?{" "}
        <Link to="/nye-casinoer" className="text-primary hover:underline underline-offset-2">
          Se de nyeste casinoer i Danmark
        </Link>{" "}
        – mange tilbyder {providerName} fra dag ét.
      </p>
    </section>
  );
}
