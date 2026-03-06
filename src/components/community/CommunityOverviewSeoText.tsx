import { Link } from "react-router-dom";

/**
 * Deep SEO text for /community (overview page).
 * ~1500 words explaining the community ecosystem with strategic internal links.
 */
export function CommunityOverviewSeoText() {
  return (
    <div className="space-y-8">
      {/* Section 1 – What is the community */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Hvad er Casinoaftaler Community?
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Casinoaftaler Community er Danmarks mest omfattende gratis casino-fællesskab. Her kan du spille
            eksklusive{" "}
            <Link to="/community/slots" className="text-primary hover:underline">
              gratis spilleautomater
            </Link>, deltage i{" "}
            <Link to="/community/turneringer" className="text-primary hover:underline">
              månedlige turneringer
            </Link>{" "}
            med kontante præmier, følge{" "}
            <Link to="/bonus-hunt" className="text-primary hover:underline">
              live bonus hunts
            </Link>{" "}
            og optjene rewards — alt sammen uden at risikere egne penge.
          </p>
          <p>
            Communityet er bygget på samme transparens- og kvalitetsprincipper som vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline">
              casino-anmeldelser
            </Link>. Alle aktiviteter dokumenteres med fuld data: turneringsvindere arkiveres i{" "}
            <Link to="/community/turneringer/arkiv" className="text-primary hover:underline">
              turneringsarkivet
            </Link>, bonus hunt-resultater logges i{" "}
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
              Bonus Hunt Arkivet
            </Link>, og spilstatistik samles i vores{" "}
            <Link to="/slot-database" className="text-primary hover:underline">
              Slot Database
            </Link>{" "}
            med 163+ analyserede spilleautomater.
          </p>
        </div>
      </section>

      {/* Section 2 – The ecosystem */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Et sammenhængende spil-økosystem
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Communityet består af flere indbyrdes forbundne platforme, der tilsammen skaber en komplet
            spiloplevelse:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Spillehal:</strong> Tre eksklusive community-maskiner
              — Book of Fedesvin, Rise of Fedesvin og Fedesvin Bonanza — med 2.000 daglige credits.
              Spillemekanikkerne afspejler populære{" "}
              <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
                spilleautomater
              </Link>{" "}
              som{" "}
              <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">
                Book of Dead
              </Link>{" "}
              og{" "}
              <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">
                Sweet Bonanza
              </Link>.
            </li>
            <li>
              <strong className="text-foreground">Turneringer:</strong> Månedlige konkurrencer i tre
              kategorier med kontante præmier (500/300/200 kr). Alle resultater arkiveres med
              leaderboard-snapshots.
            </li>
            <li>
              <strong className="text-foreground">Bonus Hunt:</strong> Live-streamede bonus hunts med
              dokumenterede resultater fra{" "}
              <Link to="/casino-anmeldelser" className="text-primary hover:underline">
                danske casinoer
              </Link>. Deltag med GTW- og AVG X-bets i realtid.
            </li>
            <li>
              <strong className="text-foreground">Highlights:</strong> De bedste øjeblikke fra streams og
              community deles i{" "}
              <Link to="/highlights" className="text-primary hover:underline">
                Highlights-sektionen
              </Link>{" "}
              — clips, YouTube-videoer og bruger-indsendt indhold.
            </li>
            <li>
              <strong className="text-foreground">Rewards:</strong> Optjen ekstra credits og spins
              gennem vores{" "}
              <Link to="/community/rewards" className="text-primary hover:underline">
                Rewards Program
              </Link>{" "}
              ved at bidrage aktivt til fællesskabet.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3 – How community data improves casino choices */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Community-data der styrker dine casino-beslutninger
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            En af de unikke fordele ved Casinoaftaler Community er, at data fra tusindvis af daglige
            spins og hundredvis af dokumenterede bonus hunts integreres direkte i vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline">
              casino-anmeldelser
            </Link>{" "}
            og guider. Det er ikke teoretiske tal — det er verificerede resultater fra reelle tests.
          </p>
          <p>
            Vores{" "}
            <Link to="/slot-database" className="text-primary hover:underline">
              Slot Database
            </Link>{" "}
            samler performance-data på tværs af 163+ spilleautomater med metrics som bonus-frekvens,
            gennemsnitlige multiplikatorer og community-performance. Denne data er tilgængelig for alle
            og giver et statistisk grundlag for at vurdere, hvilke spil der performer bedst under
            forskellige forhold.
          </p>
          <p>
            Ligeledes viser{" "}
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
              Bonus Hunt Arkivet
            </Link>{" "}
            dokumenterede resultater fra live-tests hos rigtige casinoer — inklusiv break-even X,
            gennemsnits-multiplikator og top wins. Disse data bruges direkte i vores vurdering af{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">
              casino bonusser
            </Link>{" "}
            og{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline">
              velkomstbonusser
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 4 – Trust & responsible gaming */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Tillid, transparens og ansvarligt spil
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Casinoaftaler er en uafhængig platform, der kun anbefaler casinoer med gyldig{" "}
            <Link to="/casino-licenser" className="text-primary hover:underline">
              dansk licens
            </Link>{" "}
            fra{" "}
            <Link to="/spillemyndigheden" className="text-primary hover:underline">
              Spillemyndigheden
            </Link>. Vores{" "}
            <Link to="/forretningsmodel" className="text-primary hover:underline">
              forretningsmodel
            </Link>{" "}
            er fuldstændig transparent, og vi dokumenterer{" "}
            <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">
              hvordan vi tester
            </Link>{" "}
            alle anmeldte casinoer.
          </p>
          <p>
            Communityet er designet som et{" "}
            <Link to="/ansvarligt-spil" className="text-primary hover:underline">
              ansvarligt spil
            </Link>-alternativ: gratis deltagelse, daglige credit-begrænsninger og ingen mulighed
            for at tabe rigtige penge. For dem, der ønsker at spille med rigtige penge, anbefaler vi
            altid at starte med en{" "}
            <Link to="/free-spins" className="text-primary hover:underline">
              free spins bonus
            </Link>{" "}
            eller en{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline">
              velkomstbonus med lav risiko
            </Link>{" "}
            og altid at sætte{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">
              omsætningskrav
            </Link>{" "}
            i perspektiv inden tilmelding.
          </p>
          <p>
            Se de bedste community-præstationer i vores{" "}
            <Link to="/community/hall-of-fame" className="text-primary hover:underline">
              Hall of Fame
            </Link>, følg turneringshistorikken i{" "}
            <Link to="/community/turneringer/arkiv" className="text-primary hover:underline">
              arkivet
            </Link>, eller udforsk{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline">
              nye online casinoer
            </Link>{" "}
            med de nyeste features og bonusser.
          </p>
        </div>
      </section>
    </div>
  );
}
