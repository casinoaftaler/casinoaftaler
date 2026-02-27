import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, CreditCard, BarChart3, Landmark, Gift } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CTAMapping {
  title: string;
  description: string;
  links: { to: string; label: string; icon: LucideIcon }[];
}

/**
 * Maps article categories to contextual money-page CTAs.
 * Each category links to 2-3 highly relevant commercial pages.
 */
const CATEGORY_CTA_MAP: Record<string, CTAMapping> = {
  regulering: {
    title: "Forstå det regulerede danske marked",
    description:
      "Reguleringsændringer påvirker direkte din spiloplevelse. Udforsk vores dybdegående guides til det danske licenssystem og ansvarligt spil.",
    links: [
      { to: "/casino-licenser", label: "Casino Licenser i Danmark", icon: ShieldCheck },
      { to: "/spillemyndigheden", label: "Spillemyndigheden – Tilsyn & Regler", icon: Landmark },
      { to: "/ansvarligt-spil", label: "Guide til Ansvarligt Spil", icon: ShieldCheck },
    ],
  },
  licenser: {
    title: "Vælg altid et licenseret casino",
    description:
      "Licensændringer kan betyde nye muligheder – eller risici. Se hvilke casinoer der aktuelt har dansk licens og lever op til de strengeste krav.",
    links: [
      { to: "/casino-licenser", label: "Casinoer med Dansk Licens", icon: ShieldCheck },
      { to: "/casino-anmeldelser", label: "Se Alle Casino Anmeldelser", icon: BarChart3 },
      { to: "/nye-casinoer", label: "Nye Casinoer 2026", icon: Sparkles },
    ],
  },
  "nye-casinoer": {
    title: "Udforsk de nyeste casinoer på markedet",
    description:
      "Nye operatører bringer friske bonusser og innovative features. Se vores kuraterede oversigt over de bedste nye casinoer i Danmark.",
    links: [
      { to: "/nye-casinoer", label: "Nye Casinoer 2026", icon: Sparkles },
      { to: "/casino-bonus", label: "Sammenlign Velkomstbonusser", icon: Gift },
      { to: "/nye-casinoer/dansk-licens", label: "Nye Casinoer med Dansk Licens", icon: ShieldCheck },
    ],
  },
  betalingsmetoder: {
    title: "Sammenlign betalingsmetoder på danske casinoer",
    description:
      "Ændringer i betalingsløsninger påvirker din mulighed for hurtige ind- og udbetalinger. Se hvilke metoder de bedste casinoer tilbyder.",
    links: [
      { to: "/betalingsmetoder", label: "Alle Betalingsmetoder", icon: CreditCard },
      { to: "/betalingsmetoder/mobilepay", label: "MobilePay Casino", icon: CreditCard },
      { to: "/casinoer/hurtig-udbetaling", label: "Casinoer med Hurtig Udbetaling", icon: ArrowRight },
    ],
  },
  "markedsbevægelser": {
    title: "Hvad betyder det for danske spillere?",
    description:
      "Markedsudviklinger former fremtidens casinolandskab. Se vores aktuelle anbefalinger baseret på de nyeste tendenser.",
    links: [
      { to: "/casino-anmeldelser", label: "Casino Anmeldelser 2026", icon: BarChart3 },
      { to: "/casino-bonus", label: "Bedste Casino Bonusser", icon: Gift },
      { to: "/nye-casinoer", label: "Nye Casinoer i Danmark", icon: Sparkles },
    ],
  },
  juridisk: {
    title: "Juridiske rammer for online casino i Danmark",
    description:
      "Lovændringer har direkte konsekvenser for spillere og operatører. Forstå dine rettigheder og de gældende regler.",
    links: [
      { to: "/spillemyndigheden", label: "Spillemyndigheden", icon: Landmark },
      { to: "/casino-licenser", label: "Licenssystemet i Danmark", icon: ShieldCheck },
      { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck },
    ],
  },
};

const FALLBACK_CTA: CTAMapping = {
  title: "Udforsk mere på Casinoaftaler.dk",
  description:
    "Hold dig opdateret med vores dybdegående guides, anmeldelser og sammenligninger af danske casinoer.",
  links: [
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: BarChart3 },
    { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift },
    { to: "/nye-casinoer", label: "Nye Casinoer 2026", icon: Sparkles },
  ],
};

interface NewsContextualCTAProps {
  category: string;
}

export function NewsContextualCTA({ category }: NewsContextualCTAProps) {
  const cta = CATEGORY_CTA_MAP[category] || FALLBACK_CTA;

  return (
    <section className="my-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <h2 className="text-xl font-bold mb-2">{cta.title}</h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {cta.description}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {cta.links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent"
          >
            <link.icon className="h-4 w-4 text-primary" />
            {link.label}
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </section>
  );
}
