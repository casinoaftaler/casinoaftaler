import { Link } from "react-router-dom";
import { ArrowRight, Link } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { optimizeStorageImage } from "@/lib/imageOptimization";

/**
 * Mapping of casino slugs → related casinos by category affinity.
 * Categories: bonus-type, license, target audience, payout speed.
 */
const RELATED_REVIEWS: Record<string, { slug: string; anchor: string }[]> = {
  betinia: [
    { slug: "spilleautomaten", anchor: "Spilleautomaten anmeldelse – også no-sticky bonus" },
    { slug: "campobet", anchor: "Campobet anmeldelse – bred sportssektion" },
    { slug: "swift-casino", anchor: "Swift Casino – hurtige udbetalinger" },
    { slug: "leovegas", anchor: "LeoVegas anmeldelse – stor mobiloplevelse" },
    { slug: "unibet", anchor: "Unibet – etableret dansk licens" },
  ],
  spilleautomaten: [
    { slug: "betinia", anchor: "Betinia – top no-sticky bonus" },
    { slug: "campobet", anchor: "Campobet – bredt spiludvalg" },
    { slug: "luna-casino", anchor: "Luna Casino anmeldelse" },
    { slug: "mr-green", anchor: "Mr Green – stærk mobiloplevelse" },
    { slug: "comeon", anchor: "ComeOn Casino anmeldelse" },
  ],
  campobet: [
    { slug: "betinia", anchor: "Betinia – dual-motor casino" },
    { slug: "spilleautomaten", anchor: "Spilleautomaten – no-sticky bonus" },
    { slug: "swift-casino", anchor: "Swift Casino – hurtige udbetalinger" },
    { slug: "bet365", anchor: "bet365 – stor sportsbetting" },
    { slug: "nordicbet", anchor: "NordicBet anmeldelse" },
  ],
  "swift-casino": [
    { slug: "betinia", anchor: "Betinia anmeldelse – no-sticky vilkår" },
    { slug: "spilleautomaten", anchor: "Spilleautomaten – bredt spiludvalg" },
    { slug: "luna-casino", anchor: "Luna Casino – nyt dansk casino" },
    { slug: "leovegas", anchor: "LeoVegas – hurtig udbetaling" },
    { slug: "comeon", anchor: "ComeOn – etableret spillested" },
  ],
  "luna-casino": [
    { slug: "swift-casino", anchor: "Swift Casino anmeldelse" },
    { slug: "spilleautomaten", anchor: "Spilleautomaten – lignende bonus" },
    { slug: "betinia", anchor: "Betinia – bedste no-sticky bonus" },
    { slug: "spildansknu", anchor: "SpilDanskNu anmeldelse" },
    { slug: "getlucky", anchor: "GetLucky Casino anmeldelse" },
  ],
  spildansknu: [
    { slug: "spilleautomaten", anchor: "Spilleautomaten – stærkt spiludvalg" },
    { slug: "betinia", anchor: "Betinia – no-sticky velkomstbonus" },
    { slug: "danske-spil", anchor: "Danske Spil Casino anmeldelse" },
    { slug: "spilnu", anchor: "Spilnu anmeldelse – dansk fokus" },
    { slug: "royal-casino", anchor: "Royal Casino – dansk licens" },
  ],
  leovegas: [
    { slug: "betinia", anchor: "Betinia – no-sticky bonus" },
    { slug: "mr-green", anchor: "Mr Green – mobilfokus" },
    { slug: "unibet", anchor: "Unibet – dansk storspiller" },
    { slug: "comeon", anchor: "ComeOn Casino anmeldelse" },
    { slug: "videoslots", anchor: "Videoslots – størst spiludvalg" },
  ],
  "danske-spil": [
    { slug: "spildansknu", anchor: "SpilDanskNu – dansk alternativ" },
    { slug: "royal-casino", anchor: "Royal Casino – dansk ejerskab" },
    { slug: "spilnu", anchor: "Spilnu – dansk licens" },
    { slug: "bet365", anchor: "bet365 – bred sportsbetting" },
    { slug: "unibet", anchor: "Unibet – etableret platform" },
  ],
  bet365: [
    { slug: "unibet", anchor: "Unibet – stor dansk platform" },
    { slug: "betinia", anchor: "Betinia – dual casino/sport" },
    { slug: "campobet", anchor: "Campobet – sports og casino" },
    { slug: "nordicbet", anchor: "NordicBet – nordisk fokus" },
    { slug: "danske-spil", anchor: "Danske Spil Casino anmeldelse" },
  ],
  "mr-green": [
    { slug: "leovegas", anchor: "LeoVegas – også stærk mobiloplevelse" },
    { slug: "unibet", anchor: "Unibet anmeldelse" },
    { slug: "comeon", anchor: "ComeOn – lignende bonusstruktur" },
    { slug: "betinia", anchor: "Betinia – bedste no-sticky bonus" },
    { slug: "videoslots", anchor: "Videoslots – maksimalt spiludvalg" },
  ],
  unibet: [
    { slug: "bet365", anchor: "bet365 – stor sportsbetting" },
    { slug: "leovegas", anchor: "LeoVegas – stærk mobilcasino" },
    { slug: "mr-green", anchor: "Mr Green anmeldelse" },
    { slug: "danske-spil", anchor: "Danske Spil – dansk licens" },
    { slug: "nordicbet", anchor: "NordicBet – nordisk betting" },
  ],
  "royal-casino": [
    { slug: "danske-spil", anchor: "Danske Spil – også dansk ejerskab" },
    { slug: "spildansknu", anchor: "SpilDanskNu – dansk fokus" },
    { slug: "spilnu", anchor: "Spilnu anmeldelse" },
    { slug: "maria-casino", anchor: "Maria Casino anmeldelse" },
    { slug: "leovegas", anchor: "LeoVegas – mobilvenlig" },
  ],
  pokerstars: [
    { slug: "bet365", anchor: "bet365 – bred sportssektion" },
    { slug: "unibet", anchor: "Unibet – poker og casino" },
    { slug: "888-casino", anchor: "888 Casino – også poker" },
    { slug: "betano", anchor: "Betano anmeldelse" },
    { slug: "mr-green", anchor: "Mr Green – bredt udvalg" },
  ],
  "888-casino": [
    { slug: "pokerstars", anchor: "PokerStars – poker-fokus" },
    { slug: "unibet", anchor: "Unibet – etableret platform" },
    { slug: "mr-green", anchor: "Mr Green anmeldelse" },
    { slug: "leovegas", anchor: "LeoVegas – stærk mobil" },
    { slug: "betinia", anchor: "Betinia – no-sticky bonus" },
  ],
  videoslots: [
    { slug: "mr-green", anchor: "Mr Green – stærkt spiludvalg" },
    { slug: "leovegas", anchor: "LeoVegas anmeldelse" },
    { slug: "comeon", anchor: "ComeOn – lignende platform" },
    { slug: "betinia", anchor: "Betinia – bedste bonusvilkår" },
    { slug: "stake-casino", anchor: "Stake Casino – krypto-venlig" },
  ],
  comeon: [
    { slug: "mr-green", anchor: "Mr Green – lignende profil" },
    { slug: "leovegas", anchor: "LeoVegas – mobilcasino" },
    { slug: "spilleautomaten", anchor: "Spilleautomaten anmeldelse" },
    { slug: "getlucky", anchor: "GetLucky Casino anmeldelse" },
    { slug: "betinia", anchor: "Betinia – stærkere bonus" },
  ],
  betano: [
    { slug: "bet365", anchor: "bet365 – sportsbetting" },
    { slug: "unibet", anchor: "Unibet – etableret alternativ" },
    { slug: "campobet", anchor: "Campobet anmeldelse" },
    { slug: "nordicbet", anchor: "NordicBet – nordisk betting" },
    { slug: "betinia", anchor: "Betinia – bedre bonusvilkår" },
  ],
  "stake-casino": [
    { slug: "videoslots", anchor: "Videoslots – stort spiludvalg" },
    { slug: "mr-vegas", anchor: "Mr Vegas – innovativt casino" },
    { slug: "betinia", anchor: "Betinia – no-sticky bonus" },
    { slug: "leovegas", anchor: "LeoVegas anmeldelse" },
    { slug: "comeon", anchor: "ComeOn Casino anmeldelse" },
  ],
  nordicbet: [
    { slug: "unibet", anchor: "Unibet – samme ejer (Kindred)" },
    { slug: "bet365", anchor: "bet365 – bred sportssektion" },
    { slug: "betano", anchor: "Betano – sportsfokus" },
    { slug: "danske-spil", anchor: "Danske Spil Casino anmeldelse" },
    { slug: "maria-casino", anchor: "Maria Casino – Kindred Group" },
  ],
  bwin: [
    { slug: "bet365", anchor: "bet365 – stærkere sportsbetting" },
    { slug: "betano", anchor: "Betano – moderne sportsplatform" },
    { slug: "unibet", anchor: "Unibet anmeldelse" },
    { slug: "nordicbet", anchor: "NordicBet – nordisk fokus" },
    { slug: "expekt", anchor: "Expekt – lignende profil" },
  ],
  "mr-vegas": [
    { slug: "stake-casino", anchor: "Stake Casino – innovativt" },
    { slug: "videoslots", anchor: "Videoslots – stort udvalg" },
    { slug: "comeon", anchor: "ComeOn Casino anmeldelse" },
    { slug: "getlucky", anchor: "GetLucky anmeldelse" },
    { slug: "betinia", anchor: "Betinia – bedste bonusvilkår" },
  ],
  "maria-casino": [
    { slug: "nordicbet", anchor: "NordicBet – Kindred Group" },
    { slug: "unibet", anchor: "Unibet – samme koncern" },
    { slug: "royal-casino", anchor: "Royal Casino – dansk fokus" },
    { slug: "leovegas", anchor: "LeoVegas anmeldelse" },
    { slug: "mr-green", anchor: "Mr Green – lignende profil" },
  ],
  getlucky: [
    { slug: "comeon", anchor: "ComeOn – lignende platform" },
    { slug: "mr-vegas", anchor: "Mr Vegas anmeldelse" },
    { slug: "luna-casino", anchor: "Luna Casino – nyt casino" },
    { slug: "spilleautomaten", anchor: "Spilleautomaten – no-sticky" },
    { slug: "betinia", anchor: "Betinia – bedste vilkår" },
  ],
  spilnu: [
    { slug: "spildansknu", anchor: "SpilDanskNu – dansk alternativ" },
    { slug: "danske-spil", anchor: "Danske Spil Casino anmeldelse" },
    { slug: "royal-casino", anchor: "Royal Casino – dansk licens" },
    { slug: "casinostuen", anchor: "Casinostuen anmeldelse" },
    { slug: "maria-casino", anchor: "Maria Casino anmeldelse" },
  ],
  "kapow-casino": [
    { slug: "luna-casino", anchor: "Luna Casino – nyt dansk casino" },
    { slug: "swift-casino", anchor: "Swift Casino anmeldelse" },
    { slug: "getlucky", anchor: "GetLucky – lignende profil" },
    { slug: "spilleautomaten", anchor: "Spilleautomaten – bedre bonus" },
    { slug: "betinia", anchor: "Betinia – stærkeste vilkår" },
  ],
  marathonbet: [
    { slug: "bet365", anchor: "bet365 – bedre sportsbetting" },
    { slug: "bwin", anchor: "bwin – lignende profil" },
    { slug: "nordicbet", anchor: "NordicBet anmeldelse" },
    { slug: "expekt", anchor: "Expekt – sammenlignelig platform" },
    { slug: "unibet", anchor: "Unibet – etableret alternativ" },
  ],
  expekt: [
    { slug: "bwin", anchor: "bwin – lignende sportsfokus" },
    { slug: "marathonbet", anchor: "MarathonBet anmeldelse" },
    { slug: "bet365", anchor: "bet365 – bedre odds" },
    { slug: "nordicbet", anchor: "NordicBet – nordisk betting" },
    { slug: "betano", anchor: "Betano – moderne platform" },
  ],
  "one-casino": [
    { slug: "casinostuen", anchor: "Casinostuen – lignende profil" },
    { slug: "kapow-casino", anchor: "Kapow Casino anmeldelse" },
    { slug: "getlucky", anchor: "GetLucky – bedre udvalg" },
    { slug: "luna-casino", anchor: "Luna Casino anmeldelse" },
    { slug: "spilleautomaten", anchor: "Spilleautomaten – stærkere bonus" },
  ],
  casinostuen: [
    { slug: "spilnu", anchor: "Spilnu – dansk fokus" },
    { slug: "one-casino", anchor: "One Casino anmeldelse" },
    { slug: "royal-casino", anchor: "Royal Casino – dansk licens" },
    { slug: "spildansknu", anchor: "SpilDanskNu anmeldelse" },
    { slug: "kapow-casino", anchor: "Kapow Casino anmeldelse" },
  ],
};

interface RelatedReviewsProps {
  /** Current casino slug */
  currentSlug: string;
}

export function RelatedReviews({ currentSlug }: RelatedReviewsProps) {
  const related = RELATED_REVIEWS[currentSlug];

  const { data: casinos } = useQuery({
    queryKey: ["casinos-for-related-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casinos")
        .select("slug, name, logo_url, rating")
        .eq("is_active", true);
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  if (!related || related.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Lignende casinoer du bør kende</h2>
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        Sammenlign med disse relaterede danske casinoer for at finde det bedste match til din spillestil.
      </p>
      <ul className="space-y-3">
        {related.map((item) => {
          const casino = casinos?.find((c) => c.slug === item.slug);
          const score = CASINO_SCORES[item.slug]?.total;
          return (
            <li key={item.slug} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-sm">
              {casino?.logo_url && (
                <img
                  src={optimizeStorageImage(casino.logo_url, 80) ?? casino.logo_url}
                  alt={casino?.name || item.slug}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />
              )}
              <div className="min-w-0 flex-1">
                <Link
                  to={`/casino-anmeldelser/${item.slug}`}
                  className="text-primary hover:underline font-semibold text-sm block"
                >
                  {item.anchor}
                </Link>
                {score && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MenuIcon iconName="star" className="h-3 w-3 fill-primary text-primary" />
                    {score.toFixed(1)} / 5.0
                  </span>
                )}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
