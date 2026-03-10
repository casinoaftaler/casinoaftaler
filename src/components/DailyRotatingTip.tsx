import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import { getTodayDanish } from "@/lib/danishDate";

interface Tip {
  text: string;
  linkText: string;
  linkTo: string;
}

/**
 * 31 casino-tips that rotate daily based on day-of-year.
 * Each tip links to a relevant internal page (dofollow).
 * Includes <noscript> fallback so crawlers always see content.
 */
const TIPS: Tip[] = [
  { text: "Vidste du, at alle gevinster fra online casinoer med dansk licens er 100 % skattefri?", linkText: "Læs mere om danske casino-regler", linkTo: "/online-casino-regler" },
  { text: "No-sticky bonusser lader dig hæve gevinster uden omsætningskrav – en stor fordel for spilleren.", linkText: "Se casinoer med no-sticky bonus", linkTo: "/casino-bonus/no-sticky-bonus" },
  { text: "RTP (Return to Player) angiver, hvor meget en spilleautomat betaler tilbage over tid. Jo højere, desto bedre.", linkText: "Udforsk vores slot database", linkTo: "/slot-database" },
  { text: "ROFUS giver dig mulighed for at udelukke dig selv fra alle danske spillesider med ét klik.", linkText: "Læs om ansvarligt spil", linkTo: "/ansvarligt-spil" },
  { text: "Danske casinoer kræver MitID til registrering – det sikrer, at kun verificerede spillere deltager.", linkText: "Se alle danske casinoer", linkTo: "/casino-anmeldelser" },
  { text: "Spilleautomater med høj volatilitet giver sjældnere, men større gevinster. Lav volatilitet giver hyppigere, mindre gevinster.", linkText: "Find den rigtige slot", linkTo: "/casinospil/spillemaskiner" },
  { text: "Blackjack har den laveste house edge – ned til 0,5 % med optimal strategi.", linkText: "Læs blackjack guide", linkTo: "/casinospil/blackjack" },
  { text: "Danske casinoer skal overholde et maksimalt omsætningskrav på 10x ifølge Spillemyndigheden.", linkText: "Forstå omsætningskrav", linkTo: "/casino-bonus/omsaetningskrav" },
  { text: "Live casino giver dig den autentiske casinooplevelse med rigtige dealere fra din sofa.", linkText: "Prøv live casino", linkTo: "/casinospil/live-casino" },
  { text: "Free spins uden indbetaling er en risikofri måde at prøve et nyt casino på.", linkText: "Find free spins tilbud", linkTo: "/free-spins-i-dag" },
  { text: "Spillemyndigheden fører løbende tilsyn med alle danske licenserede casinoer.", linkText: "Se compliance-status", linkTo: "/compliance" },
  { text: "MobilePay og Trustly giver de hurtigste udbetalinger hos danske online casinoer.", linkText: "Sammenlign betalingsmetoder", linkTo: "/betalingsmetoder" },
  { text: "Bonus hunts er en populær måde at teste mange slots i træk – følg med live på Twitch.", linkText: "Se seneste bonus hunts", linkTo: "/bonus-hunt/arkiv" },
  { text: "Roulette tilbyder mange strategier, men husk at house edge altid er til stede.", linkText: "Læs roulette guide", linkTo: "/casinospil/roulette" },
  { text: "Et godt casino tilbyder mindst 500+ spilleautomater fra anerkendte udbydere.", linkText: "Se top casinoer", linkTo: "/casino-anmeldelser" },
  { text: "Pragmatic Play, NetEnt og Play'n GO er blandt de mest populære spiludbydere i Danmark.", linkText: "Udforsk spiludbydere", linkTo: "/spillemaskiner/pragmatic-play" },
  { text: "Velkomstbonusser varierer markant – sammenlign altid vilkår før du vælger.", linkText: "Se alle bonustyper", linkTo: "/casino-bonus" },
  { text: "Baccarat har en af de laveste house edges (ca. 1,06 %) – et godt valg for strategiske spillere.", linkText: "Læs baccarat guide", linkTo: "/casinospil/baccarat" },
  { text: "Nye casinoer tilbyder ofte bedre bonusser for at tiltrække spillere – men tjek altid licensen.", linkText: "Se nye casinoer 2026", linkTo: "/nye-casinoer" },
  { text: "StopSpillet.dk tilbyder gratis og anonym rådgivning, hvis du oplever problemer med spillevaner.", linkText: "Læs om ansvarligt spil", linkTo: "/ansvarligt-spil" },
  { text: "Danske casinoer tilbyder typisk udbetalinger inden for 0-24 timer for e-wallets.", linkText: "Se hurtigste udbetalinger", linkTo: "/casino-bonus/hurtig-udbetaling" },
  { text: "Megaways-slots kan have op til 117.649 gevinstlinjer – det giver ekstra spænding.", linkText: "Find Megaways slots", linkTo: "/slot-database" },
  { text: "En god casino-anmeldelse tester kundeservice, spiludvalg, bonus og udbetalingshastighed.", linkText: "Læs vores metodik", linkTo: "/om-os" },
  { text: "Community clips lader dig dele dine bedste gevinster med andre spillere.", linkText: "Se community highlights", linkTo: "/community/slots" },
  { text: "Cashback-bonusser giver dig en procentdel af dine tab tilbage – en populær bonustype.", linkText: "Forstå bonustyper", linkTo: "/casino-bonus" },
  { text: "Turneringer i vores community giver dig mulighed for at vinde præmier uden ekstra indsats.", linkText: "Se aktive turneringer", linkTo: "/community/turneringer" },
  { text: "Volatilitet og RTP er de to vigtigste tal at kende, når du vælger en spilleautomat.", linkText: "Udforsk slot-statistik", linkTo: "/slot-database" },
  { text: "Video poker kan have en RTP på op til 99,5 % – højere end de fleste spilleautomater.", linkText: "Læs om casinospil", linkTo: "/casinospil" },
  { text: "Danske casino-nyheder holder dig opdateret om nye spil, reguleringer og bonustilbud.", linkText: "Læs seneste nyheder", linkTo: "/casino-nyheder" },
  { text: "Indbetalingsgrænser er et vigtigt værktøj til ansvarligt spil – sæt dem, før du starter.", linkText: "Værktøjer til ansvarligt spil", linkTo: "/ansvarligt-spil" },
  { text: "Nolimit City og Hacksaw Gaming er kendt for high-volatility slots med store gevinstpotentialer.", linkText: "Se Nolimit City slots", linkTo: "/spillemaskiner/nolimit-city" },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function DailyRotatingTip() {
  const { tip, todayISO } = useMemo(() => {
    const dayIndex = getDayOfYear() % TIPS.length;
    return {
      tip: TIPS[dayIndex],
      todayISO: getTodayDanish(),
    };
  }, []);

  return (
    <section className="py-4 border-b border-border/30" aria-label="Dagens casino-tip">
      <div className="container">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0 mt-0.5">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Dagens Tip</span>
              <time dateTime={todayISO} className="text-xs text-muted-foreground">
                {todayISO}
              </time>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {tip.text}{" "}
              <Link to={tip.linkTo} className="text-primary hover:underline font-medium">
                {tip.linkText} →
              </Link>
            </p>
          </div>
        </div>

        {/* Noscript fallback: crawlers see all tips + links without JS */}
        <noscript>
          <div style={{ marginTop: "8px" }}>
            <strong>Casino-tips fra Casinoaftaler.dk:</strong>
            <ul>
              {TIPS.map((t, i) => (
                <li key={i}>
                  {t.text} <a href={t.linkTo}>{t.linkText}</a>
                </li>
              ))}
            </ul>
          </div>
        </noscript>
      </div>
    </section>
  );
}
