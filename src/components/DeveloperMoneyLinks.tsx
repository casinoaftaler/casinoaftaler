import { Link } from "react-router-dom";
import { ArrowRight, Gift, Star, Sparkles, CreditCard, BarChart3 } from "lucide-react";
import { PROVIDER_HUB_SLUGS } from "@/lib/providerHubContent";

/**
 * Contextual money-page links for spiludviklere pages (/spiludviklere/*).
 * Distributes link equity from 12 deep editorial guides to core commercial pages,
 * and cross-links to the matching /spillemaskiner/{slug} data hub.
 * Uses hash-based intro variation to reduce template footprint.
 */

interface DeveloperMoneyLinksProps {
  providerName: string;
  providerSlug: string; // e.g. "netent", "pragmatic-play"
}

const MONEY_LINKS = [
  {
    to: "/casino-anmeldelser",
    icon: Star,
    title: "Casino Anmeldelser",
    getDesc: (name: string) =>
      `Se vores dybdegående anmeldelser af casinoer med ${name} i spiludvalget.`,
  },
  {
    to: "/casino-bonus",
    icon: Gift,
    title: "Bedste Casino Bonus",
    getDesc: (name: string) =>
      `Find de bedste bonusser og brug dem på ${name} spillemaskiner – vi har testet vilkårene.`,
  },
  {
    to: "/free-spins",
    icon: Sparkles,
    title: "Free Spins Tilbud",
    getDesc: (name: string) =>
      `Aktuelle free spins tilbud der kan bruges på populære ${name} slots.`,
  },
  {
    to: "/velkomstbonus",
    icon: CreditCard,
    title: "Velkomstbonus Guide",
    getDesc: (name: string) =>
      `Få det bedste velkomsttilbud til at udforske ${name} spilleautomater.`,
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
  (name: string) =>
    `Leder du efter det rette casino til ${name} spillemaskiner? Herunder finder du links til bonusser, anmeldelser og vores fulde ${name} slot-katalog.`,
  (name: string) =>
    `Kombiner din viden om ${name} med de bedste bonusser og casinoer. Vi har samlet de vigtigste ressourcer.`,
  (name: string) =>
    `Udnyt ${name} slots bedst muligt med den rette bonus og det rette casino – her er vores anbefalinger.`,
];

export function DeveloperMoneyLinks({ providerName, providerSlug }: DeveloperMoneyLinksProps) {
  const hash = simpleHash(providerSlug);
  const introFn = INTRO_VARIANTS[hash % INTRO_VARIANTS.length];
  const hasSlotHub = PROVIDER_HUB_SLUGS.includes(providerSlug);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
        <Gift className="h-7 w-7 text-primary" />
        Bonus & Casinoer med {providerName}
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        {introFn(providerName)}
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

      {/* Cross-link to provider data hub */}
      {hasSlotHub && (
        <Link
          to={`/spillemaskiner/${providerSlug}`}
          className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">{providerName} Slot-katalog – Statistik & Data</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Se alle {providerName} spillemaskiner med RTP, volatilitet og ægte bonus hunt-data.
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>
      )}

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
