import { Link } from "react-router-dom";
import { BookOpen, TrendingUp, ShieldCheck, Gamepad2, CreditCard, Users } from "lucide-react";

const guides = [
  {
    icon: TrendingUp,
    title: "Casino Bonus Guide",
    description: "Komplet overblik over bonustyper, vilkår og strategier for danske spillere.",
    to: "/casino-bonus",
  },
  {
    icon: BookOpen,
    title: "Omsætningskrav forklaret",
    description: "Forstå gennemspilskrav og hvordan de påvirker din bonus.",
    to: "/omsaetningskrav",
  },
  {
    icon: ShieldCheck,
    title: "Casinoer med dansk licens",
    description: "Alle licenserede casinoer reguleret af Spillemyndigheden.",
    to: "/licenserede-casinoer",
  },
  {
    icon: Gamepad2,
    title: "Populære spilleautomater",
    description: "De mest populære slots med RTP, volatilitet og strategiguides.",
    to: "/casinospil/spillemaskiner",
  },
  {
    icon: CreditCard,
    title: "Casino anmeldelser",
    description: "Detaljerede tests af danske casinoer med bonus, udbetaling og spilvalg.",
    to: "/casino-anmeldelser",
  },
  {
    icon: Users,
    title: "Sådan tester vi casinoer",
    description: "Vores dokumenterede testmetode – fra licens til udbetalingshastighed.",
    to: "/saadan-tester-vi-casinoer",
  },
];

export function BonusHuntRelatedGuides() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">Relaterede guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {guides.map((g) => (
          <Link
            key={g.to}
            to={g.to}
            className="group rounded-xl border border-border/50 bg-card p-4 space-y-2 transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center gap-2">
              <g.icon className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {g.title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {g.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
