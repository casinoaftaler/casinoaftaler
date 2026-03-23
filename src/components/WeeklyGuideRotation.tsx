import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

interface Guide {
  title: string;
  description: string;
  path: string;
}

/**
 * Rotates 3 internal guide links weekly based on ISO week number.
 * Supplements WeeklyRotationReviews with guide/hub pages.
 */
const GUIDES: Guide[] = [
  { title: "Casino Bonus Guide", description: "Alt du skal vide om bonusser, omsætningskrav og vilkår", path: "/casino-bonus" },
  { title: "Spillemaskiner Guide", description: "Forstå RTP, volatilitet og vælg de bedste slots", path: "/casinospil/spillemaskiner" },
  { title: "Live Casino Guide", description: "Oplev ægte dealere og real-time spil fra din sofa", path: "/live-casino" },
  { title: "Betalingsmetoder", description: "MobilePay, Trustly og andre hurtige indbetalingsmuligheder", path: "/betalingsmetoder" },
  { title: "No-Sticky Bonus", description: "Bonusser du kan hæve uden at opfylde omsætningskrav", path: "/no-sticky-bonus" },
  { title: "Free Spins i Dag", description: "Dagligt opdaterede tilbud på gratis spins", path: "/free-spins-i-dag" },
  { title: "Nye Casinoer 2026", description: "De seneste danske casinoer med licens og bonusser", path: "/nye-casinoer" },
  { title: "Blackjack Strategi", description: "Optimal strategi til den laveste house edge", path: "/casinospil/blackjack" },
  { title: "Roulette Guide", description: "Forstå regler, odds og populære strategier", path: "/casinospil/roulette" },
  { title: "Ansvarligt Spil", description: "Værktøjer, grænser og hjælp til sunde spillevaner", path: "/ansvarligt-spil" },
  { title: "Casino Anmeldelser", description: "Dybdegående tests af alle danske casinoer", path: "/casino-anmeldelser" },
  { title: "Hurtig Udbetaling", description: "Casinoer med de hurtigste udbetalingstider i Danmark", path: "/casinoer/hurtig-udbetaling" },
  { title: "Slot Database", description: "1.400+ spilleautomater med RTP, volatilitet og statistik", path: "/slot-database" },
  { title: "Omsætningskrav Forklaret", description: "Hvad omsætningskrav betyder og hvordan du opfylder dem", path: "/omsaetningskrav" },
  { title: "Baccarat Guide", description: "En af casinoets mest elegante spil med lav house edge", path: "/casinospil/baccarat" },
];

function getISOWeek(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function WeeklyGuideRotation() {
  const guides = useMemo(() => {
    const week = getISOWeek();
    const offset = (week * 3) % GUIDES.length;
    const rotated = [...GUIDES.slice(offset), ...GUIDES.slice(0, offset)];
    return rotated.slice(0, 3);
  }, []);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <span aria-hidden="true">📚</span>
        Populære Guides Denne Uge
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {guides.map((guide) => (
          <Link
            key={guide.path}
            to={guide.path}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md group"
          >
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-sm block group-hover:text-primary transition-colors">
                {guide.title}
              </span>
              <span className="text-xs text-muted-foreground mt-1 block leading-relaxed">
                {guide.description}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>

      {/* Noscript: all guide links visible to crawlers */}
      <noscript>
        <ul>
          {GUIDES.map((g) => (
            <li key={g.path}>
              <a href={g.path}>{g.title}</a> – {g.description}
            </li>
          ))}
        </ul>
      </noscript>
    </section>
  );
}
