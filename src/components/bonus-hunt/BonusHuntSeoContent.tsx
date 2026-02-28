import { Link } from "react-router-dom";
import { Target, BarChart3, ShieldCheck, Users } from "lucide-react";

const steps = [
  {
    icon: Target,
    step: 1,
    heading: "Vi samler bonusser",
    description: (
      <>
        Under hunt-fasen køber vi bonusser fra forskellige{" "}
        <Link to="/spillemaskiner" className="text-primary hover:underline">
          spilleautomater
        </Link>{" "}
        og noterer hver indsats. Start balance er det samlede beløb investeret.
      </>
    ),
  },
  {
    icon: BarChart3,
    step: 2,
    heading: "Åbning & resultater",
    description: (
      <>
        Alle bonusser åbnes live på Twitch. Målet er at slå break-even X –
        den multiplikator der kræves for at gå i nul. Average X afgør resultatet.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    step: 3,
    heading: "Dansk licens & transparens",
    description: (
      <>
        Vi tester kun hos{" "}
        <Link to="/casino-anmeldelser" className="text-primary hover:underline">
          casinoer med dansk licens
        </Link>{" "}
        fra{" "}
        <Link to="/spillemyndigheden" className="text-primary hover:underline">
          Spillemyndigheden
        </Link>. Alle resultater dokumenteres med VOD og statistik.
      </>
    ),
  },
  {
    icon: Users,
    step: 4,
    heading: "Community bets",
    description: (
      <>
        Deltag i GTW (gæt end balance) og AVG X (bet på multiplikator-gruppe)
        med StreamElements points og{" "}
        <Link to="/community" className="text-primary hover:underline">
          community credits
        </Link>.
      </>
    ),
  },
];

export function BonusHuntSeoContent() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">
        Sådan foregår vores bonus hunts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="community-card rounded-xl border border-border/50 bg-card p-4 space-y-2 cursor-default"
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
