import { Link } from "react-router-dom";
import { ArrowRight, Gift, Star, Sparkles, CreditCard, Smartphone } from "lucide-react";

/**
 * Contextual money-page CTA + sibling cross-links for mobil-casino spoke pages.
 * ~8 links per page × 4 pages = ~32 new links.
 */

interface MobilCasinoCrossLinksProps {
  pageName: string;
  currentPath: string;
}

const MONEY_LINKS = [
  {
    to: "/casino-anmeldelser",
    icon: Star,
    title: "Casino Anmeldelser",
    getDesc: (name: string) =>
      `Se hvilke casinoer der scorer højest på ${name} – vi har testet mobiloplevelsen.`,
  },
  {
    to: "/casino-med-mobilepay",
    icon: CreditCard,
    title: "Casino med MobilePay",
    getDesc: (_name: string) =>
      `Find casinoer med hurtig indbetaling via MobilePay direkte fra mobilen.`,
  },
  {
    to: "/casino-bonus",
    icon: Gift,
    title: "Casino Bonus",
    getDesc: (_name: string) =>
      `Sammenlign de bedste bonusser – aktiver dem direkte fra din mobil.`,
  },
  {
    to: "/nye-casinoer",
    icon: Sparkles,
    title: "Nye Casinoer 2026",
    getDesc: (_name: string) =>
      `Nyeste casinoer med mobiloptimerede platforme og moderne UI.`,
  },
];

const MOBIL_SIBLINGS = [
  { to: "/mobil-casino", label: "Mobil Casino Hub" },
  { to: "/mobil-casino/iphone", label: "Casino på iPhone" },
  { to: "/mobil-casino/android", label: "Casino på Android" },
  { to: "/mobil-casino/tablet", label: "Casino på Tablet" },
  { to: "/mobil-casino/bedste-apps", label: "Bedste Casino Apps" },
  { to: "/casino-app", label: "Casino App Guide" },
];

export function MobilCasinoCrossLinks({ pageName, currentPath }: MobilCasinoCrossLinksProps) {
  const siblings = MOBIL_SIBLINGS.filter((s) => s.to !== currentPath);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <Smartphone className="h-6 w-6 text-primary" />
        {pageName} – find det rette casino
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Klar til at spille på mobilen? Her finder du de vigtigste ressourcer til at vælge det bedste mobilcasino.
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
                {getDesc(pageName)}
              </p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
          <Smartphone className="h-3.5 w-3.5" />
          Udforsk mobil casino guides
        </p>
        <div className="flex flex-wrap gap-2">
          {siblings.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
