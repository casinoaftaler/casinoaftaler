import { BonusHuntTopCasinos } from "@/components/bonus-hunt/BonusHuntTopCasinos";
import { BonusHuntCommunityLinks } from "@/components/bonus-hunt/BonusHuntCommunityLinks";
import { BonusHuntLatestNews } from "@/components/bonus-hunt/BonusHuntLatestNews";
import { Link } from "react-router-dom";

/**
 * Shared SEO bridge sections used across community pages to link
 * community traffic → money pages / SEO content.
 */
export function CommunitySeoSections() {
  return (
    <div className="space-y-8 mt-8">
      <section className="rounded-2xl border border-border bg-card px-5 py-5 md:px-6">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Live casino – næste skridt efter community</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Når du har testet slots, fulgt bonus hunts og set data i community, er <Link to="/live-casino" className="font-medium text-primary hover:underline">live casino</Link> det naturlige næste step for spillere, der vil over i blackjack, roulette og baccarat med rigtige dealere. Vi gennemgår house edge, bankroll, game shows og de stærkeste danske live casinoer i én samlet hub.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/live-casino" className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
              Gå til live casino-guiden
            </Link>
            <Link to="/live-casino/strategi" className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
              Se live casino strategi
            </Link>
            <Link to="/live-casino/udbydere" className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
              Sammenlign live udbydere
            </Link>
          </div>
        </div>
      </section>
      <BonusHuntTopCasinos />
      <BonusHuntCommunityLinks />
      <BonusHuntLatestNews />
    </div>
  );
}
