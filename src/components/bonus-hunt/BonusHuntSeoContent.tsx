import { Link } from "react-router-dom";

export function BonusHuntSeoContent() {
  return (
    <section className="rounded-2xl border border-border/50 bg-card p-5 md:p-8 space-y-4">
      <h2 className="text-lg font-bold text-foreground">
        Sådan foregår vores bonus hunts
      </h2>

      <div className="prose prose-sm text-muted-foreground max-w-none space-y-3">
        <p>
          En bonus hunt er en populær live-streamet begivenhed, hvor vi samler en række
          bonusser fra forskellige spilleautomater og åbner dem én efter én foran vores
          Twitch-community. Konceptet er simpelt: vi køber bonusser under "hunt-fasen",
          noterer hver indsats, og åbner dem alle i rækkefølge under "opening-fasen".
        </p>

        <p>
          <strong>Start balance</strong> er det samlede beløb investeret i alle bonusser.
          Målet er at slå <strong>break-even X</strong> – den gennemsnitlige multiplikator
          der kræves for at gå i nul. Hvis vores <strong>average X</strong> overstiger
          break-even, har hunten genereret overskud.
        </p>

        <p>
          Vi tester udelukkende hos{" "}
          <Link to="/casino-anmeldelser" className="text-primary hover:underline">
            danske casinoer med dansk licens
          </Link>{" "}
          udstedt af{" "}
          <Link to="/spillemyndigheden" className="text-primary hover:underline">
            Spillemyndigheden
          </Link>. Alle resultater dokumenteres live og arkiveres her på siden med fuld
          gennemsigtighed – inklusive Twitch VOD, slot-data og statistik.
        </p>

        <p>
          Under vores hunts kan community-medlemmer deltage i{" "}
          <strong>GTW (Guess The Win)</strong> – gæt end balance – og{" "}
          <strong>AVG X</strong> – bet på hvilken gennemsnitlig multiplikator-gruppe
          resultatet lander i. Begge spil bruger StreamElements points og{" "}
          <Link to="/community" className="text-primary hover:underline">
            community credits
          </Link>.
        </p>

        <p>
          Hver bonus hunt er unik. Vi varierer{" "}
          <Link to="/spillemaskiner" className="text-primary hover:underline">
            spilleautomater
          </Link>{" "}
          og{" "}
          <Link to="/spiludviklere" className="text-primary hover:underline">
            spiludviklere
          </Link>{" "}
          for at give det bredeste billede af casinoets udbud. Resultaterne giver
          et reelt indblik i, hvordan bonusser performer over tid.
        </p>
      </div>
    </section>
  );
}
