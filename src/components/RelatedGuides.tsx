import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Gift,
  Sparkles,
  CreditCard,
  Target,
  Zap,
  Trophy,
  BookOpen,
  Tv,
  ShieldCheck,
} from "lucide-react";

const guideLinks = [
  { to: "/velkomstbonus", label: "Velkomstbonus", icon: Trophy, desc: "Få mest ud af din første indbetaling" },
  { to: "/free-spins", label: "Free Spins", icon: Sparkles, desc: "Gratis spins på populære spilleautomater" },
  { to: "/indskudsbonus", label: "Indskudsbonus", icon: CreditCard, desc: "Matchbonusser der fordobler dit indskud" },
  { to: "/omsaetningskrav", label: "Omsætningskrav", icon: Target, desc: "Forstå gennemspilningskrav på bonusser" },
  { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling", icon: Gift, desc: "Spil gratis uden at indbetale" },
  { to: "/bonus-uden-omsaetningskrav", label: "Uden Omsætningskrav", icon: Zap, desc: "Hæv gevinster med det samme" },
  { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil med rigtige dealere i realtid" },
  { to: "/nye-casinoer", label: "Nye Casinoer", icon: Sparkles, desc: "De seneste casinoer med dansk licens" },
];

interface RelatedGuidesProps {
  /** Current page path to exclude from links */
  currentPath: string;
  /** Max number of links to show */
  maxLinks?: number;
}

export function RelatedGuides({ currentPath, maxLinks = 6 }: RelatedGuidesProps) {
  const filteredLinks = guideLinks.filter((link) => link.to !== currentPath).slice(0, maxLinks);

  return (
    <>
      <Separator className="my-10" />
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">
          <BookOpen className="mr-2 inline h-7 w-7 text-primary" />
          Relaterede Guides
        </h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Udforsk vores andre dybdegående guides og bliv klogere på alt inden for casino bonusser i Danmark.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <link.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">{link.label}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust / Ansvarligt Spil CTA */}
      <section className="mb-12">
        <Card className="border-border bg-card border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Ansvarligt Spil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Spil skal altid være underholdning. Sæt grænser for tid og penge, og stop hvis det ikke længere er sjovt.
              Alle casinoer på vores side har dansk licens og tilbyder selvudelukkelse via{" "}
              <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>.
              Har du brug for hjælp? Kontakt{" "}
              <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>{" "}
              – gratis og anonymt. 18+ | Spil ansvarligt | Annoncering
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
