import { Link } from "react-router-dom";
import { Gift, Sparkles, Star, CreditCard, ArrowRight, BarChart3 } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * Contextual money-page CTA section for glossary/ordbog term pages.
 * Maps term categories to the most relevant commercial pages,
 * bridging informational intent → commercial intent.
 * 
 * Adds ~3-4 money-page links per ordbog term (70 terms = ~210-280 new links).
 */

interface MoneyLink {
  to: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

// Category → relevant money pages
const CATEGORY_MONEY_LINKS: Record<string, MoneyLink[]> = {
  "Bonus": [
    { to: "/casino-bonus", label: "Casino Bonus Guide", icon: Gift, desc: "Sammenlign alle bonustyper og find den bedste" },
    { to: "/velkomstbonus", label: "Velkomstbonus", icon: Gift, desc: "Få mest ud af din første indbetaling" },
    { to: "/free-spins", label: "Free Spins", icon: Sparkles, desc: "Aktuelle free spins tilbud" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Dybdegående anmeldelser af danske casinoer" },
  ],
  "Spillemaskiner": [
    { to: "/casinospil/spillemaskiner", label: "Spillemaskiner Guide", icon: BarChart3, desc: "Komplet guide til online slots" },
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Bonusser til spillemaskiner" },
    { to: "/free-spins", label: "Free Spins Tilbud", icon: Sparkles, desc: "Gratis spins på populære slots" },
    { to: "/slot-database", label: "Slot Database", icon: BarChart3, desc: "1.470+ slots med community-data" },
  ],
  "Grundbegreber": [
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Find det rette casino med vores anmeldelser" },
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Forstå og sammenlign bonusser" },
    { to: "/nye-casinoer", label: "Nye Casinoer", icon: Sparkles, desc: "De nyeste casinoer i Danmark" },
    { to: "/casinospil", label: "Casinospil", icon: BarChart3, desc: "Alle typer casinospil forklaret" },
  ],
  "Teknisk": [
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Se hvordan vi vurderer casinoer" },
    { to: "/casino-licenser", label: "Licenserede Casinoer", icon: Star, desc: "Sikre casinoer med dansk licens" },
    { to: "/spiludviklere", label: "Spiludviklere", icon: BarChart3, desc: "De største spiludviklere i Danmark" },
    { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: Star, desc: "Spil sikkert og ansvarligt" },
  ],
};

// Slug-specific overrides for terms with very specific commercial relevance
const SLUG_OVERRIDES: Record<string, MoneyLink[]> = {
  "rtp": [
    { to: "/casinospil/spillemaskiner/hoej-rtp", label: "Høj RTP Slots", icon: BarChart3, desc: "Find spillemaskiner med bedst tilbagebetaling" },
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Bonusser til slots med høj RTP" },
    { to: "/slot-database", label: "Slot Database", icon: BarChart3, desc: "Sammenlign RTP p� 1.470+ slots" },
    { to: "/free-spins", label: "Free Spins", icon: Sparkles, desc: "Brug free spins på høj-RTP slots" },
  ],
  "wagering": [
    { to: "/omsaetningskrav", label: "Omsætningskrav Guide", icon: Gift, desc: "Forstå gennemspilningskrav i dybden" },
    { to: "/bonus-uden-omsaetningskrav", label: "Uden Omsætningskrav", icon: Sparkles, desc: "Bonusser du kan hæve med det samme" },
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Sammenlign bonusser og vilkår" },
    { to: "/velkomstbonus", label: "Velkomstbonus", icon: CreditCard, desc: "Bedste velkomstbonusser i Danmark" },
  ],
  "jackpot": [
    { to: "/jackpot-slots", label: "Jackpot Slots", icon: Sparkles, desc: "Progressive jackpots med milliongevinster" },
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Bonusser til jackpot-spil" },
    { to: "/slot-database", label: "Slot Database", icon: BarChart3, desc: "Se jackpot-historik og statistik" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Casinoer med de bedste jackpots" },
  ],
  "buy-bonus": [
    { to: "/bonus-buy-slots", label: "Bonus Buy Slots", icon: Sparkles, desc: "Køb bonus direkte – komplet guide" },
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Bonusser til bonus buy slots" },
    { to: "/slot-database", label: "Slot Database", icon: BarChart3, desc: "Find bonus buy slots i databasen" },
    { to: "/casinospil/spillemaskiner", label: "Spillemaskiner", icon: BarChart3, desc: "Alle typer spillemaskiner" },
  ],
  "cascading-wins": [
    { to: "/megaways-slots", label: "Megaways Slots", icon: Sparkles, desc: "Slots med cascading wins og megaways" },
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Bonusser til moderne slots" },
    { to: "/slot-database", label: "Slot Database", icon: BarChart3, desc: "Find slots med cascading wins" },
    { to: "/free-spins", label: "Free Spins", icon: Sparkles, desc: "Gratis spins på tumble-slots" },
  ],
  "kyc": [
    { to: "/casino-uden-konto", label: "Casino uden Konto", icon: Star, desc: "Spil uden registrering via Pay N Play" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Casinoer med hurtig verifikation" },
    { to: "/nye-casinoer", label: "Nye Casinoer", icon: Sparkles, desc: "De nyeste casinoer med hurtig KYC" },
    { to: "/betalingsmetoder", label: "Betalingsmetoder", icon: CreditCard, desc: "Betalingsmetoder og verifikation" },
  ],
  "bankroll-management": [
    { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Udvid din bankroll med bonusser" },
    { to: "/ansvarligt-spil/spillegraenser", label: "Spillegrænser", icon: Star, desc: "Sæt grænser for din bankroll" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Casinoer med gode bankroll-værktøjer" },
    { to: "/velkomstbonus", label: "Velkomstbonus", icon: CreditCard, desc: "Boost din bankroll fra dag ét" },
  ],
};

// Default fallback for uncategorized terms
const DEFAULT_MONEY_LINKS: MoneyLink[] = [
  { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Dybdegående anmeldelser af danske casinoer" },
  { to: "/casino-bonus", label: "Casino Bonus", icon: Gift, desc: "Sammenlign de bedste bonusser" },
  { to: "/nye-casinoer", label: "Nye Casinoer", icon: Sparkles, desc: "De nyeste casinoer i Danmark" },
  { to: "/free-spins", label: "Free Spins", icon: Sparkles, desc: "Aktuelle free spins tilbud" },
];

interface GlossaryMoneyLinksProps {
  termSlug: string;
  termTitle: string;
  category?: string;
}

export function GlossaryMoneyLinks({ termSlug, termTitle, category }: GlossaryMoneyLinksProps) {
  // Priority: slug override > category mapping > default
  const links = SLUG_OVERRIDES[termSlug]
    || (category && CATEGORY_MONEY_LINKS[category])
    || DEFAULT_MONEY_LINKS;

  // Filter out any links that match pages already in the term's relatedPages
  // (handled at render time in OrdbogTerm.tsx to avoid duplication)

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
        <Gift className="h-5 w-5 text-primary" />
        Brug din viden om {termTitle}
      </h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Nu hvor du forstår {termTitle.toLowerCase()}, kan du bruge denne viden til at vælge det rette casino og den bedste bonus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map(({ to, label, icon: Icon, desc }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-accent/50"
          >
            <Icon className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
