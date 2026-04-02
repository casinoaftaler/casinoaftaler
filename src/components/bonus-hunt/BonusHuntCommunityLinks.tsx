import { Link } from "react-router-dom";
import { MenuIcon } from "@/components/MenuIcon";

const COMMUNITY_LINKS = [
  { iconName: "gamepad-2", title: "Gratis Spillehal", description: "Spil gratis slots og optjen points uden risiko.", to: "/community/slots" },
  { iconName: "trophy", title: "Turneringer", description: "Deltag i ugentlige turneringer og vind præmier.", to: "/community/turneringer" },
  { iconName: "archive", title: "Bonus Hunt Arkiv", description: "Alle dokumenterede hunt-resultater med statistik.", to: "/bonus-hunt/arkiv" },
  { iconName: "database", title: "Slot Database", description: "1.640+ slots med community-data og performance-stats.", to: "/slot-database" },
  { iconName: "chart-bar", title: "Statistik", description: "Aggregeret data fra alle bonus hunts og slot-tests.", to: "/statistik" },
  { iconName: "crown", title: "Hall of Fame", description: "All-time leaderboards, top clips og community-legender.", to: "/community/hall-of-fame" },
  { iconName: "tv", title: "Highlights & Clips", description: "Se de bedste stream-øjeblikke og del dine egne wins.", to: "/highlights" },
  { iconName: "refresh-cw", title: "Spin the Reel", description: "Dagligt lykkehjul med bonus spins og credits.", to: "/community/spin-the-reel" },
  { iconName: "gift", title: "Rewards Program", description: "Optjen og indløs points for eksklusive præmier.", to: "/community/rewards" },
  { iconName: "shopping-bag", title: "Community Butik", description: "Brug dine optjente points på merchandise og bonusser.", to: "/butik" },
];

export function BonusHuntCommunityLinks() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Udforsk community</h2>
        <p className="text-sm text-muted-foreground">
          Bonus hunts er kun én del af{" "}
          <Link to="/community" className="font-medium text-foreground/80 hover:text-foreground hover:underline transition-colors">
            Casinoaftaler Community
          </Link>
          . Udforsk alt hvad vi tilbyder.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COMMUNITY_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group rounded-xl border border-border/50 bg-card p-3 text-center space-y-1.5 transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
          >
            <MenuIcon iconName={link.iconName} className="h-5 w-5 mx-auto" />
            <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
              {link.title}
            </h3>
            <p className="text-[11px] text-muted-foreground leading-snug hidden sm:block">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
