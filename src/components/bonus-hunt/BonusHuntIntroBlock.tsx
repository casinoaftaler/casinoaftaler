import { Link } from "react-router-dom";

export function BonusHuntIntroBlock() {
  return (
    <section className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
      <h2 className="text-base font-bold text-foreground">
        Hvad er en bonus hunt?
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        En bonus hunt er en populær live-stream inden for casinospil, hvor flere bonusser samles og åbnes i
        én session. Resultatet måles typisk i gennemsnit X, break-even X og top wins. På denne side finder
        du både live og arkiverede bonus hunts med fuld dokumentation fra{" "}
        <Link to="/casino-anmeldelser" className="text-primary hover:underline">
          danske casinoer
        </Link>{" "}
        med licens fra{" "}
        <Link to="/spillemyndigheden" className="text-primary hover:underline">
          Spillemyndigheden
        </Link>.
      </p>
    </section>
  );
}
