import { Link } from "react-router-dom";
import { ArrowRight, Database, Filter, Play } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
import { SLOT_COUNT_LABEL } from "@/hooks/useSlotCountLabel";

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
  iconName: string;
  desc: string;
}

// Category → relevant money pages
const CATEGORY_MONEY_LINKS: Record<string, MoneyLink[]> = {
  "Bonus": [
    { to: "/casino-bonus", label: "Casino Bonus Guide", iconName: "gift", desc: "Sammenlign alle bonustyper og find den bedste" },
    { to: "/velkomstbonus", label: "Velkomstbonus", iconName: "gift", desc: "Få mest ud af din første indbetaling" },
    { to: "/free-spins", label: "Free Spins", iconName: "sparkles", desc: "Aktuelle free spins tilbud" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", iconName: "star", desc: "Dybdegående anmeldelser af danske casinoer" },
  ],
  "Spillemaskiner": [
    { to: "/casinospil/spillemaskiner", label: "Spillemaskiner Guide", iconName: "bar-chart3", desc: "Komplet guide til online slots" },
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Bonusser til spillemaskiner" },
    { to: "/free-spins", label: "Free Spins Tilbud", iconName: "sparkles", desc: "Gratis spins på populære slots" },
    { to: "/slot-database", label: "Slot Database", iconName: "bar-chart3", desc: `${SLOT_COUNT_LABEL} slots med community-data` },
  ],
  "Grundbegreber": [
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", iconName: "star", desc: "Find det rette casino med vores anmeldelser" },
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Forstå og sammenlign bonusser" },
    { to: "/nye-casinoer", label: "Nye Casinoer", iconName: "sparkles", desc: "De nyeste casinoer i Danmark" },
    { to: "/casinospil", label: "Casinospil", iconName: "bar-chart3", desc: "Alle typer casinospil forklaret" },
  ],
  "Teknisk": [
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", iconName: "star", desc: "Se hvordan vi vurderer casinoer" },
    { to: "/casino-licenser", label: "Licenserede Casinoer", iconName: "star", desc: "Sikre casinoer med dansk licens" },
    { to: "/spiludviklere", label: "Spiludviklere", iconName: "bar-chart3", desc: "De største spiludviklere i Danmark" },
    { to: "/ansvarligt-spil", label: "Ansvarligt Spil", iconName: "star", desc: "Spil sikkert og ansvarligt" },
  ],
};

// Slug-specific overrides for terms with very specific commercial relevance
const SLUG_OVERRIDES: Record<string, MoneyLink[]> = {
  "rtp": [
    { to: "/casinospil/spillemaskiner/hoej-rtp", label: "Høj RTP Slots", iconName: "bar-chart3", desc: "Find spillemaskiner med bedst tilbagebetaling" },
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Bonusser til slots med høj RTP" },
    { to: "/slot-database", label: "Slot Database", iconName: "bar-chart3", desc: `Sammenlign RTP på ${SLOT_COUNT_LABEL} slots` },
    { to: "/free-spins", label: "Free Spins", iconName: "sparkles", desc: "Brug free spins på høj-RTP slots" },
  ],
  "wagering": [
    { to: "/omsaetningskrav", label: "Omsætningskrav Guide", iconName: "gift", desc: "Forstå gennemspilningskrav i dybden" },
    { to: "/bonus-uden-omsaetningskrav", label: "Uden Omsætningskrav", iconName: "sparkles", desc: "Bonusser du kan hæve med det samme" },
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Sammenlign bonusser og vilkår" },
    { to: "/velkomstbonus", label: "Velkomstbonus", iconName: "credit-card", desc: "Bedste velkomstbonusser i Danmark" },
  ],
  "jackpot": [
    { to: "/jackpot-slots", label: "Jackpot Slots", iconName: "sparkles", desc: "Progressive jackpots med milliongevinster" },
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Bonusser til jackpot-spil" },
    { to: "/slot-database", label: "Slot Database", iconName: "bar-chart3", desc: "Se jackpot-historik og statistik" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", iconName: "star", desc: "Casinoer med de bedste jackpots" },
  ],
  "buy-bonus": [
    { to: "/bonus-buy-slots", label: "Bonus Buy Slots", iconName: "sparkles", desc: "Køb bonus direkte – komplet guide" },
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Bonusser til bonus buy slots" },
    { to: "/slot-database", label: "Slot Database", iconName: "bar-chart3", desc: "Find bonus buy slots i databasen" },
    { to: "/casinospil/spillemaskiner", label: "Spillemaskiner", iconName: "bar-chart3", desc: "Alle typer spillemaskiner" },
  ],
  "cascading-wins": [
    { to: "/megaways-slots", label: "Megaways Slots", iconName: "sparkles", desc: "Slots med cascading wins og megaways" },
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Bonusser til moderne slots" },
    { to: "/slot-database", label: "Slot Database", iconName: "bar-chart3", desc: "Find slots med cascading wins" },
    { to: "/free-spins", label: "Free Spins", iconName: "sparkles", desc: "Gratis spins på tumble-slots" },
  ],
  "kyc": [
    { to: "/casino-uden-konto", label: "Casino uden Konto", iconName: "star", desc: "Spil uden registrering via Pay N Play" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", iconName: "star", desc: "Casinoer med hurtig verifikation" },
    { to: "/nye-casinoer", label: "Nye Casinoer", iconName: "sparkles", desc: "De nyeste casinoer med hurtig KYC" },
    { to: "/betalingsmetoder", label: "Betalingsmetoder", iconName: "credit-card", desc: "Betalingsmetoder og verifikation" },
  ],
  "bankroll-management": [
    { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Udvid din bankroll med bonusser" },
    { to: "/ansvarligt-spil/spillegraenser", label: "Spillegrænser", iconName: "star", desc: "Sæt grænser for din bankroll" },
    { to: "/casino-anmeldelser", label: "Casino Anmeldelser", iconName: "star", desc: "Casinoer med gode bankroll-værktøjer" },
    { to: "/velkomstbonus", label: "Velkomstbonus", iconName: "credit-card", desc: "Boost din bankroll fra dag ét" },
  ],
};

// Default fallback for uncategorized terms
const DEFAULT_MONEY_LINKS: MoneyLink[] = [
  { to: "/casino-anmeldelser", label: "Casino Anmeldelser", iconName: "star", desc: "Dybdegående anmeldelser af danske casinoer" },
  { to: "/casino-bonus", label: "Casino Bonus", iconName: "gift", desc: "Sammenlign de bedste bonusser" },
  { to: "/nye-casinoer", label: "Nye Casinoer", iconName: "sparkles", desc: "De nyeste casinoer i Danmark" },
  { to: "/free-spins", label: "Free Spins", iconName: "sparkles", desc: "Aktuelle free spins tilbud" },
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
        <MenuIcon iconName="gift" className="h-5 w-5 text-primary" />
        Brug din viden om {termTitle}
      </h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Nu hvor du forstår {termTitle.toLowerCase()}, kan du bruge denne viden til at vælge det rette casino og den bedste bonus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map(({ to, label, iconName, desc }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-accent/50"
          >
            <MenuIcon iconName={iconName} className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
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
