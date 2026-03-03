import { Link } from "react-router-dom";
import { Gamepad2, Trophy, BarChart3, Gift } from "lucide-react";

const steps = [
  {
    icon: Gamepad2,
    step: 1,
    heading: "Opret en konto & spil",
    description: (
      <>
        For at deltage i vores månedlige turneringer skal du oprette en gratis konto på{" "}
        <Link to="/community" className="text-primary hover:underline">
          community-siden
        </Link>
        . Herefter kan du spille vores eksklusive{" "}
        <Link to="/community/slots/fedesvin-bonanza" className="text-primary hover:underline">
          community spilleautomater
        </Link>{" "}
        — helt uden rigtige penge. Du deltager automatisk i turneringen, så snart du starter dit første spin.
      </>
    ),
  },
  {
    icon: BarChart3,
    step: 2,
    heading: "Tre kategorier — tre vindere",
    description: (
      <>
        Hver måned kåres vindere i tre kategorier: <strong>Flest Point</strong> (samlet antal point),{" "}
        <strong>Højeste X</strong> (største multiplikator) og <strong>Største Gevinst</strong> (højeste
        enkeltgevinst). Det betyder, at du har tre forskellige chancer for at vinde — uanset om du
        foretrækker volumen eller high-risk spins.
      </>
    ),
  },
  {
    icon: Trophy,
    step: 3,
    heading: "Klatr op på leaderboardet",
    description: (
      <>
        Dit bedste resultat i hver kategori registreres automatisk og opdateres i realtid på{" "}
        <Link to="/community/turneringer" className="text-primary hover:underline">
          leaderboardet
        </Link>
        . Du kan følge din placering, søge efter andre spillere og se, hvor tæt du er på top 3.
        Turneringen nulstilles den 1. i hver måned, så alle starter fra scratch.
      </>
    ),
  },
  {
    icon: Gift,
    step: 4,
    heading: "Vind præmier hver måned",
    description: (
      <>
        De tre bedste spillere i hver kategori vinder præmier: <strong>500 kr</strong> for 1. pladsen,{" "}
        <strong>300 kr</strong> for 2. pladsen og <strong>200 kr</strong> for 3. pladsen. Vinderne
        annonceres automatisk, og tidligere vindere kan ses i{" "}
        <span className="text-primary">turneringsarkivet</span>. Det koster intet at deltage —
        kun dit engagement tæller.
      </>
    ),
  },
];

export function TournamentSeoContent() {
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-bold text-foreground">
        Sådan deltager du i vores månedlige turneringer
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
