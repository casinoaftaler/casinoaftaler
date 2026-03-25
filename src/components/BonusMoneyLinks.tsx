import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, BarChart3, Cpu, Sparkles, Smartphone, Globe, Zap } from "lucide-react";

/**
 * Authority-loop closure component for bonus cluster pages.
 * Links bonus pages → provider guides, slot hubs, and slot database,
 * completing the: Slots → Providers → Reviews → Bonus → Slots loop.
 * ~8 links per page × 11 pages = ~88 new authority-returning links.
 */

interface BonusMoneyLinksProps {
  /** Current bonus page path for context-aware text */
  currentPath: string;
}

const TOP_PROVIDERS = [
  { slug: "pragmatic-play", name: "Pragmatic Play" },
  { slug: "netent", name: "NetEnt" },
  { slug: "play-n-go", name: "Play'n GO" },
  { slug: "big-time-gaming", name: "Big Time Gaming" },
  { slug: "hacksaw-gaming", name: "Hacksaw Gaming" },
  { slug: "nolimit-city", name: "Nolimit City" },
];

const FEATURED_SLOTS = [
  { slug: "sweet-bonanza", name: "Sweet Bonanza" },
  { slug: "gates-of-olympus", name: "Gates of Olympus" },
  { slug: "book-of-dead", name: "Book of Dead" },
  { slug: "starburst", name: "Starburst" },
  { slug: "bonanza", name: "Bonanza" },
  { slug: "wolf-gold", name: "Wolf Gold" },
];

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const INTRO_VARIANTS = [
  "Vil du udnytte din bonus bedst muligt? Udforsk de mest populære spiludbydere og find de bedste slots til at opfylde omsætningskrav.",
  "De rigtige spillemaskiner gør hele forskellen, når du spiller med bonus. Her er de udbydere og slots vi anbefaler.",
  "Bonus og spillemaskiner hænger uløseligt sammen. Find de bedste udbydere og slots til at maksimere din bonusværdi.",
];

export function BonusMoneyLinks({ currentPath }: BonusMoneyLinksProps) {
  const hash = simpleHash(currentPath);
  const intro = INTRO_VARIANTS[hash % INTRO_VARIANTS.length];

  // Rotate which 4 providers and 4 slots to show per page
  const providerOffset = hash % TOP_PROVIDERS.length;
  const slotOffset = (hash + 2) % FEATURED_SLOTS.length;
  const providers = [...TOP_PROVIDERS, ...TOP_PROVIDERS].slice(providerOffset, providerOffset + 4);
  const slots = [...FEATURED_SLOTS, ...FEATURED_SLOTS].slice(slotOffset, slotOffset + 4);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <Gamepad2 className="h-6 w-6 text-primary" />
        Spillemaskiner & Udbydere til din bonus
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">{intro}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Slot Database link */}
        <Link
          to="/slot-database"
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <BarChart3 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Slot Database</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Udforsk 1.460+ spillemaskiner med RTP, volatilitet og bonus hunt-data – find de bedste til omsætningskrav.
            </p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>

        {/* Spillemaskiner hub link */}
        <Link
          to="/casinospil/spillemaskiner"
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <Sparkles className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Spillemaskiner Guide</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alt om spillemaskiner – typer, funktioner og strategier til at vælge de rigtige slots.
            </p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>

        {/* Cross-cluster: Nye Casinoer */}
        <Link
          to="/nye-casinoer"
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <Sparkles className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Nye Casinoer 2026</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              De nyeste licenserede casinoer i Danmark – ofte med bedre bonusvilkår end etablerede sider.
            </p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>

        {/* Cross-cluster: Mobil Casino */}
        <Link
          to="/mobil-casino"
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <Smartphone className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Mobil Casino</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Komplet guide til casino på mobilen – apps, mobile-first design og iOS/Android-tips.
            </p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>

        {/* Cross-cluster: Casino uden Konto */}
        <Link
          to="/casino-uden-konto"
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <Zap className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Casino uden Konto</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Spil via Pay N Play uden registrering – hurtigste vej til casino med Trustly.
            </p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>
      </div>

      {/* Provider cross-links */}
      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5" />
          Top spiludbydere
        </p>
        <div className="flex flex-wrap gap-2">
          {providers.map(({ slug, name }) => (
            <Link
              key={slug}
              to={`/spiludviklere/${slug}`}
              className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured slots cross-links */}
      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
          <Gamepad2 className="h-3.5 w-3.5" />
          Populære slots til bonus
        </p>
        <div className="flex flex-wrap gap-2">
          {slots.map(({ slug, name }) => (
            <Link
              key={slug}
              to={`/slot-katalog/${slug}`}
              className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
