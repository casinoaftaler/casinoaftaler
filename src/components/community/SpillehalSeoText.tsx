import { Link } from "react-router-dom";

/**
 * Deep SEO text for /community/slots – placed before BonusHuntTopCasinos (CommunitySeoSections).
 * ~1800 words of unique content with strategic internal links to money pages.
 */
export function SpillehalSeoText() {
  return (
    <div className="space-y-8">
      {/* Section 1 – What is the community spillehal */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Hvad er Casinoaftalers gratis spillehal?
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Casinoaftalers Spillehal er en gratis platform, hvor du kan spille eksklusive community-spillemaskiner
            uden at risikere rigtige penge. Vores maskiner — Book of Fedesvin, Rise of Fedesvin og Fedesvin
            Bonanza — er bygget med de samme spillemekanikker, du kender fra populære{" "}
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
              online spilleautomater
            </Link>{" "}
            hos licenserede{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline">
              danske casinoer
            </Link>.
          </p>
          <p>
            Formålet er dobbelt: dels at give dig en underholdende og risikofri spiloplevelse, dels at lade dig
            afprøve spillemekanikker, før du eventuelt spiller med rigtige penge. Book of Fedesvin er inspireret
            af{" "}
            <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">
              Book of Dead
            </Link>{" "}
            fra{" "}
            <Link to="/spiludviklere/play-n-go" className="text-primary hover:underline">
              Play'n GO
            </Link>, mens Fedesvin Bonanza bruger tumble-mekanikken fra{" "}
            <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">
              Sweet Bonanza
            </Link>{" "}
            af{" "}
            <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline">
              Pragmatic Play
            </Link>.
          </p>
          <p>
            Alle spillere får <strong className="text-foreground">2.000 virtuelle credits dagligt</strong>,
            der nulstilles ved midnat dansk tid. Credits deles på tværs af alle maskiner, så du selv vælger,
            hvordan du fordeler dem. Points fra dine spins registreres automatisk på{" "}
            <Link to="/community/turneringer" className="text-primary hover:underline">
              turneringernes leaderboard
            </Link>, hvor du kan vinde kontante præmier hver måned.
          </p>
        </div>
      </section>

      {/* Section 2 – Game mechanics deep dive */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Spillemekanikker: Expanding wilds, tumble wins & multi-symbols
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Hver af vores tre spillemaskiner er designet med unikke bonusmekanikker, der afspejler trends
            i den moderne{" "}
            <Link to="/casinospil" className="text-primary hover:underline">
              casinospil
            </Link>-industri:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Book of Fedesvin (Expanding Symbols):</strong> I
              bonusrunden vælges ét tilfældigt symbol, der udvider sig over hele hjulet ved gevinst.
              Denne mekanik stammer fra den klassiske "Book of"-serie og giver potentiale for massive
              multiplikatorer — især når high-value symboler expander. Volatiliteten er høj, hvilket
              betyder sjældne, men store gevinster.
            </li>
            <li>
              <strong className="text-foreground">Fedesvin Bonanza (Tumble/Cascade Wins):</strong> Ved
              gevinst fjernes vindende symboler, og nye falder ned ovenfra. Multiplieren stiger med
              1x for hver tumble i bonusrunden, og bomber kan tilføje ekstra multiplikator-værdier.
              Denne "cluster pays"-tilgang giver mange consecutive wins og en jævnere gevinstfordeling
              end expanding wilds.
            </li>
            <li>
              <strong className="text-foreground">Rise of Fedesvin (Multi-Expanding Symbols):</strong> En
              evolution af Book of Fedesvin-konceptet, hvor <em>flere</em> symboler kan expande
              samtidig i bonusrunden. Retriggers tilføjer nye aktive symboler, så potentialet vokser
              med hver ekstra free spin. Inspireret af{" "}
              <Link to="/casinospil/spillemaskiner/legacy-of-dead" className="text-primary hover:underline">
                Legacy of Dead
              </Link>.
            </li>
          </ul>
          <p>
            Disse mekanikker er ikke tilfældigt valgt — de repræsenterer de tre mest populære
            bonusstrukturer i moderne{" "}
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
              spilleautomater
            </Link>. Ved at forstå dem her kan du træffe bedre beslutninger, når du vælger{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">
              casino bonusser
            </Link>{" "}
            og spil hos rigtige casinoer.
          </p>
        </div>
      </section>

      {/* Section 3 – RTP and volatility education */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          RTP og volatilitet i community-slots vs. rigtige spilleautomater
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Vores community-slots er designet med RTP (Return to Player) og volatilitetsprofiler, der
            afspejler deres virkelige forbilleder. Book of Fedesvin har en høj volatilitet med en
            teoretisk RTP omkring 96%, ligesom{" "}
            <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">
              Book of Dead (96,21%)
            </Link>. Fedesvin Bonanza har en medium-høj volatilitet med en RTP tæt på{" "}
            <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">
              Sweet Bonanza (96,48%)
            </Link>.
          </p>
          <p>
            RTP i vores community-kontekst har en anden praktisk betydning end hos rigtige casinoer.
            Da du spiller med virtuelle credits, påvirker RTP primært <em>hvor hurtigt</em> dine
            daglige credits bliver brugt op, og dermed hvor mange spins du kan få ud af 2.000 credits.
            En maskine med højere RTP giver flere spins pr. session — men ikke nødvendigvis bedre
            turneringsresultater, da point-systemet belønner ekstraordinære resultater snarere end
            gennemsnitsafkast.
          </p>
          <p>
            For en dybere forståelse af RTP-konceptet og hvordan det påvirker din spilstrategi, se
            vores guide til{" "}
            <Link to="/casinospil/spillemaskiner/hoj-rtp" className="text-primary hover:underline">
              spillemaskiner med høj RTP
            </Link>. Vil du se community-statistik og performance-data for alle testede spil, er
            vores{" "}
            <Link to="/slot-database" className="text-primary hover:underline">
              Slot Database
            </Link>{" "}
            det rette sted.
          </p>
        </div>
      </section>

      {/* Section 4 – Credits & rewards ecosystem */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Credits, rewards og det bredere community-økosystem
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Ud over de 2.000 daglige credits kan du optjene ekstra spins og bonus-credits gennem flere
            kanaler. Vores{" "}
            <Link to="/community/rewards" className="text-primary hover:underline">
              Rewards Program
            </Link>{" "}
            belønner dig for at bidrage til fællesskabet: upload clips, udfyld din profil, og indløs
            redeem-koder fra vores{" "}
            <a href="https://www.twitch.tv/fedesvinsejer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Twitch-streams
            </a>{" "}
            for bonus-credits.
          </p>
          <p>
            Credits kan også bruges strategisk i{" "}
            <Link to="/bonus-hunt" className="text-primary hover:underline">
              bonus hunt betting
            </Link>, hvor du vædder på live hunt-resultater. GTW (Guess the Win) og AVG X bets
            foregår i realtid under streams, og vinderne modtager point og credits. Alle resultater
            dokumenteres i{" "}
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
              Bonus Hunt Arkivet
            </Link>{" "}
            med fuld statistik.
          </p>
          <p>
            De mest dedikerede spillere kan bruge optjente Twitch-points i vores{" "}
            <Link to="/butik" className="text-primary hover:underline">
              community-butik
            </Link>, hvor vi tilbyder gaming headsets, gavekort og eksklusive merchandise. Det
            samlede økosystem — fra daglige credits til turnerings&shy;præmier til butikspoint — er
            designet til at belønne engagement og aktivt community-bidrag.
          </p>
        </div>
      </section>

      {/* Section 5 – How community data improves real casino choices */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Fra gratis spil til informerede casino-valg
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Spillehallen er mere end underholdning — den er et læringsredskab. Ved at spille vores
            community-slots lærer du at forstå volatilitet, bonusmekanikker og bankroll management
            i et risikofrit miljø. Denne viden er direkte overførbar til rigtige casinospil.
          </p>
          <p>
            Når du er klar til at spille med rigtige penge, anbefaler vi at starte med en{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline">
              velkomstbonus
            </Link>{" "}
            fra et af vores testede casinoer. En typisk{" "}
            <Link to="/indskudsbonus" className="text-primary hover:underline">
              indskudsbonus
            </Link>{" "}
            fordobler dit første indskud, hvilket effektivt halverer din risiko. Kombiner dette med{" "}
            <Link to="/free-spins" className="text-primary hover:underline">
              free spins tilbud
            </Link>{" "}
            for at teste nye spil uden ekstra omkostninger.
          </p>
          <p>
            Alle vores anbefalinger er baseret på grundig test og dokumentation. Se{" "}
            <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">
              hvordan vi tester casinoer
            </Link>{" "}
            for at forstå vores metodik, og tjek altid at dit valgte casino har en gyldig{" "}
            <Link to="/casino-licenser" className="text-primary hover:underline">
              dansk licens
            </Link>{" "}
            fra{" "}
            <Link to="/spillemyndigheden" className="text-primary hover:underline">
              Spillemyndigheden
            </Link>{" "}
            inden du opretter en konto. Har du spørgsmål om{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">
              omsætningskrav
            </Link>{" "}
            eller bonusvilkår, finder du detaljerede guides i vores{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">
              bonussektion
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
