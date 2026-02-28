import { Link } from "react-router-dom";
import { Target, BarChart3, ShieldCheck, Users } from "lucide-react";

const steps = [
  {
    icon: Target,
    step: 1,
    heading: "Bonusser samles",
    description: (
      <>
        Under hunt-fasen købes bonusser fra forskellige{" "}
        <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
          spilleautomater
        </Link>{" "}
        hos et{" "}
        <Link to="/casino-anmeldelser" className="text-primary hover:underline">
          dansk casino
        </Link>. Start balance registreres som det samlede investerede beløb.
      </>
    ),
  },
  {
    icon: BarChart3,
    step: 2,
    heading: "Åbning & analyse",
    description: (
      <>
        Alle bonusser åbnes live på{" "}
        <a href="https://www.twitch.tv/casinoaftaler" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Twitch
        </a>. Break-even X beregnes ud fra start balance divideret med samlet indsats.
        Gennemsnit X afgør det endelige resultat.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    step: 3,
    heading: "Dansk licens & dokumentation",
    description: (
      <>
        Alle hunts gennemføres udelukkende hos{" "}
        <Link to="/licenserede-casinoer" className="text-primary hover:underline">
          casinoer med dansk licens
        </Link>{" "}
        fra{" "}
        <Link to="/spillemyndigheden" className="text-primary hover:underline">
          Spillemyndigheden
        </Link>. Resultater dokumenteres med VOD, statistik og fuld gennemsigtighed.
      </>
    ),
  },
  {
    icon: Users,
    step: 4,
    heading: "Interaktive bets",
    description: (
      <>
        Deltag i GTW (gæt end balance) og AVG X (bet på multiplikator-gruppe)
        med StreamElements points. Læs mere om{" "}
        <Link to="/casino-bonus" className="text-primary hover:underline">
          casino bonus
        </Link>{" "}
        og{" "}
        <Link to="/omsaetningskrav" className="text-primary hover:underline">
          omsætningskrav
        </Link>.
      </>
    ),
  },
];

export function BonusHuntSeoContent() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">
        Sådan fungerer en bonus hunt
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="rounded-xl border border-border/50 bg-card p-4 space-y-2 cursor-default"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Trin {s.step}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  {s.heading}
                </h3>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
