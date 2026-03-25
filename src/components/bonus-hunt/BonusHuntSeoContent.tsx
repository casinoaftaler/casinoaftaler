import { Link } from "react-router-dom";
import { Target, BarChart3, ShieldCheck, Users } from "lucide-react";

const steps = [
  {
    icon: Target,
    step: 1,
    heading: "Bonusser samles",
    description: (
      <>
        Vi starter med en fast balance og spinner på udvalgte{" "}
        <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
          spilleautomater
        </Link>{" "}
        hos{" "}
        <Link to="/casino-anmeldelser" className="text-primary hover:underline">
          anmeldte danske casinoer
        </Link>. Hver bonus der trigges, gemmes og lukkes ned. Når balancen er i 0, er alle bonusser klar til åbning.
      </>
    ),
  },
  {
    icon: BarChart3,
    step: 2,
    heading: "Åbning & analyse",
    description: (
      <>
        Bonusser åbnes live på{" "}
        <a href="https://www.twitch.tv/fedesvinsejer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Twitch
        </a>. Break-even X og gennemsnit X beregnes i realtid, så du kan følge med. Læs mere om{" "}
        <Link to="/casino-bonus" className="text-primary hover:underline">
          bonustyper
        </Link>{" "}
        og{" "}
        <Link to="/omsaetningskrav" className="text-primary hover:underline">
          gennemspilskrav
        </Link>.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    step: 3,
    heading: "Licens & transparens",
    description: (
      <>
        Kun{" "}
        <Link to="/casino-licenser" className="text-primary hover:underline">
          licenserede casinoer
        </Link>{" "}
        godkendt af{" "}
        <Link to="/spillemyndigheden" className="text-primary hover:underline">
          Spillemyndigheden
        </Link>. Se{" "}
        <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">
          hvordan vi tester
        </Link>.
      </>
    ),
  },
  {
    icon: Users,
    step: 4,
    heading: "Community bets",
    description: (
      <>
        Deltag i GTW og AVG X bets i realtid via{" "}
        <Link to="/community" className="text-primary hover:underline">
          vores community
        </Link>. Følg{" "}
        <Link to="/forfatter/kevin" className="text-primary hover:underline">
          Kevin
        </Link>{" "}
        live med dokumenterede resultater.
      </>
    ),
  },
];

export function BonusHuntSeoContent() {
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-bold text-foreground">
        Sådan dokumenterer vi vores bonus hunts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="group rounded-xl border border-border/50 bg-card p-5 space-y-3 cursor-default transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.7) 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                {s.step}
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
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
