import { Link } from "react-router-dom";

/**
 * Deep SEO text for /community/turneringer – placed after "Afsluttede turneringer".
 * ~1800 words of unique, contextual content with strategic internal links to money pages.
 */
export function TurneringerSeoText() {
  return (
    <div className="space-y-8 mt-10">
      {/* Section 1 – What are community tournaments */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Hvad er community-turneringer hos Casinoaftaler?
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Community-turneringer er månedlige konkurrencer, hvor registrerede brugere spiller vores eksklusive{" "}
            <Link to="/community/slots" className="text-primary hover:underline">
              gratis spillemaskiner
            </Link>{" "}
            og konkurrerer om kontante præmier — helt uden at risikere egne penge. Konceptet er inspireret af den
            turneringsmodel, som mange{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline">
              nye online casinoer
            </Link>{" "}
            tilbyder, men med én fundamental forskel: hos os er deltagelsen 100 % gratis og risikofri.
          </p>
          <p>
            Turneringerne kører i tre uafhængige kategorier — <strong className="text-foreground">Flest Point</strong>,{" "}
            <strong className="text-foreground">Højeste Multiplikator (X)</strong> og{" "}
            <strong className="text-foreground">Største Enkeltgevinst</strong> — fordelt på tværs af vores tre
            community-slots: Book of Fedesvin, Rise of Fedesvin og Fedesvin Bonanza. Hver kategori premierer en
            specifik spilstil, så både volumen-spillere og high-risk-jægere har en reel chance for at vinde.
          </p>
          <p>
            Præmiestrukturen er transparent: <strong className="text-foreground">500 kr</strong> til vinderen,{" "}
            <strong className="text-foreground">300 kr</strong> til 2. pladsen og{" "}
            <strong className="text-foreground">200 kr</strong> til 3. pladsen — i hver kategori. Alle vindere
            arkiveres automatisk i vores{" "}
            <Link to="/community/turneringer/arkiv" className="text-primary hover:underline">
              turneringsarkiv
            </Link>{" "}
            med fulde leaderboard-snapshots og historiske data.
          </p>
        </div>
      </section>

      {/* Section 2 – How it differs from real casino tournaments */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Forskellen på community-turneringer og casino-turneringer
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Hos licenserede{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline">
              danske online casinoer
            </Link>{" "}
            kræver turneringer typisk et indskud, og gevinsterne er underlagt{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">
              omsætningskrav
            </Link>{" "}
            — ofte mellem 10x og 40x. Det betyder, at selv hvis du vinder en turnering, kan du ikke hæve pengene
            med det samme. Vores community-turneringer har ingen omsætningskrav overhovedet — præmierne udbetales
            kontant.
          </p>
          <p>
            En anden vigtig forskel er gennemsigtighed. Hvor casinoers turneringsregler ofte er skjult i vilkår
            og betingelser, er vores system fuldstændig åbent: leaderboardet opdateres i realtid, credit-fordelingen
            er synlig, og alle historiske resultater er tilgængelige i arkivet. Det er samme transparens-filosofi,
            vi anvender i vores{" "}
            <Link to="/bonus-hunt" className="text-primary hover:underline">
              live bonus hunts
            </Link>{" "}
            og{" "}
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
              bonus hunt arkiv
            </Link>, hvor alle resultater dokumenteres med fulde datapunkter.
          </p>
          <p>
            Vores turneringer fungerer desuden som en praktisk læringsplatform. Spillemekanikken i Book of
            Fedesvin ligner{" "}
            <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">
              Book of Dead
            </Link>{" "}
            med expanding symbols, mens Fedesvin Bonanza er inspireret af{" "}
            <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">
              Sweet Bonanza
            </Link>{" "}
            med tumble-gevinster og multiplier-bomber. Du kan altså øve dig på mekanikken uden at bruge rigtige
            penge, inden du eventuelt prøver de originale spil hos et{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline">
              anmeldt online casino
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 3 – Mathematical model: EV of participation */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Expected Value (EV) af turneringsdeltagelse
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Lad os analysere den matematiske værdi af at deltage i vores turneringer. Med tre kategorier à tre
            præmier (500 + 300 + 200 kr) er den månedlige præmiepulje{" "}
            <strong className="text-foreground">3.000 kr</strong>. Fordelingen er:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 pr-4 text-foreground font-semibold">Kategori</th>
                  <th className="text-right py-2 px-3 text-foreground font-semibold">1. plads</th>
                  <th className="text-right py-2 px-3 text-foreground font-semibold">2. plads</th>
                  <th className="text-right py-2 px-3 text-foreground font-semibold">3. plads</th>
                  <th className="text-right py-2 pl-3 text-foreground font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/30">
                  <td className="py-2 pr-4">Flest Point</td>
                  <td className="text-right py-2 px-3">500 kr</td>
                  <td className="text-right py-2 px-3">300 kr</td>
                  <td className="text-right py-2 px-3">200 kr</td>
                  <td className="text-right py-2 pl-3 font-medium text-foreground">1.000 kr</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2 pr-4">Højeste X</td>
                  <td className="text-right py-2 px-3">500 kr</td>
                  <td className="text-right py-2 px-3">300 kr</td>
                  <td className="text-right py-2 px-3">200 kr</td>
                  <td className="text-right py-2 pl-3 font-medium text-foreground">1.000 kr</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Største Gevinst</td>
                  <td className="text-right py-2 px-3">500 kr</td>
                  <td className="text-right py-2 px-3">300 kr</td>
                  <td className="text-right py-2 px-3">200 kr</td>
                  <td className="text-right py-2 pl-3 font-medium text-foreground">1.000 kr</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-border/50">
                  <td className="py-2 pr-4 font-bold text-foreground">Total</td>
                  <td colSpan={3} />
                  <td className="text-right py-2 pl-3 font-bold text-primary">3.000 kr</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p>
            Med eksempelvis 50 aktive deltagere i en given måned er den gennemsnitlige EV pr. deltager:{" "}
            <strong className="text-foreground">3.000 / 50 = 60 kr/måned</strong>. Da deltagelsen er gratis,
            er EV altid positiv — uanset antal deltagere. Til sammenligning kræver en typisk{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline">
              velkomstbonus
            </Link>{" "}
            et indskud på minimum 100-200 kr med omsætningskrav, hvilket sænker den reelle EV markant.
          </p>
          <p>
            Det er værd at bemærke, at "Højeste X"-kategorien har en iboende høj varians — en enkelt heldig
            bonusrunde kan afgøre hele måneden. "Flest Point"-kategorien belønner derimod konsistens og daglig
            aktivitet, hvilket giver en mere forudsigelig fordeling. Denne struktur minder om forskellen
            mellem{" "}
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
              lav- og højvolatile spilleautomater
            </Link>{" "}
            på rigtige casinoer.
          </p>
        </div>
      </section>

      {/* Section 4 – Credit management & optimal play */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Credit-styring og optimal spillestrategi
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Du modtager <strong className="text-foreground">2.000 virtuelle credits dagligt</strong>, der deles
            på tværs af alle tre spillemaskiner. Credits nulstilles ved midnat dansk tid — ubrugte credits
            overføres ikke. Den optimale strategi afhænger af, hvilken kategori du sigter efter:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-foreground">Flest Point (volumen):</strong> Spil med lave indsatser
              (1-2 credits pr. spin) for at maksimere antallet af spins. Flere spins = flere point-muligheder
              og flere chancer for at trigge bonusrunder, som giver bonuspoint.
            </li>
            <li>
              <strong className="text-foreground">Højeste X (varians):</strong> Koncentrér credits på Book of
              Fedesvin med medium-høje indsatser. Expanding symbols i bonusrunden kan give massive multiplikatorer
              — men det kræver tålmodighed og vilje til at acceptere mange tomme spins.
            </li>
            <li>
              <strong className="text-foreground">Største Gevinst (balance):</strong> Rise of Fedesvin med
              multi-expanding symbols giver de bedste odds for store enkeltgevinster. Indsæt moderate bets
              (3-5 credits) for at balancere mellem spin-antal og gevinstpotentiale.
            </li>
          </ul>
          <p>
            Uanset strategi anbefaler vi at logge ind dagligt og bruge alle credits. Data fra vores{" "}
            <Link to="/slot-database" className="text-primary hover:underline">
              Slot Database
            </Link>{" "}
            viser, at spillere med daglig aktivitet over hele måneden har markant bedre resultater end
            sporadiske spillere — simpelthen fordi flere spins giver flere datapunkter og dermed bedre
            chancer for outlier-resultater.
          </p>
        </div>
      </section>

      {/* Section 5 – Responsible gaming connection */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Turneringer som ansvarligt spil-redskab
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Et af de mest oversete aspekter ved community-turneringer er deres rolle som et{" "}
            <Link to="/ansvarligt-spil" className="text-primary hover:underline">
              ansvarligt spil
            </Link>-redskab. Ved at tilbyde en risikofrí platform med ægte konkurrence og præmier
            kan spillere opleve spændingen ved casinospil uden den økonomiske risiko, som følger med
            rigtige{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">
              casino bonusser
            </Link>.
          </p>
          <p>
            Alle vores turneringer er underlagt de samme standarder, som{" "}
            <Link to="/spillemyndigheden" className="text-primary hover:underline">
              Spillemyndigheden
            </Link>{" "}
            stiller til licenserede casinoer — selvom vi teknisk set ikke udbyder gambling. Vi tilbyder
            daglige credit-begrænsninger (2.000 pr. dag), cooldown-perioder mellem spins, og fuld
            transparens i leaderboard-data. Du kan læse mere om vores tilgang i{" "}
            <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">
              hvordan vi tester casinoer
            </Link>.
          </p>
          <p>
            For spillere, der ønsker at opleve ægte casinospil med rigtige penge, anbefaler vi altid at starte
            med en{" "}
            <Link to="/free-spins" className="text-primary hover:underline">
              free spins bonus
            </Link>{" "}
            eller en{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline">
              velkomstbonus med lav risiko
            </Link>{" "}
            fra et af vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline">
              anmeldte casinoer
            </Link>{" "}
            — alle med gyldig{" "}
            <Link to="/casino-licenser" className="text-primary hover:underline">
              dansk licens
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 6 – Community data ecosystem */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Turneringsdata i det bredere community-økosystem
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Turneringsresultaterne indgår i et bredere data-økosystem, der binder hele Casinoaftaler-communityet
            sammen. Vindere og top-spillere fremhæves i vores{" "}
            <Link to="/community/hall-of-fame" className="text-primary hover:underline">
              Hall of Fame
            </Link>, hvor all-time leaderboards dokumenterer de mest konsekvente spillere.
          </p>
          <p>
            Derudover bidrager turneringsdata til vores{" "}
            <Link to="/slot-database" className="text-primary hover:underline">
              Slot Database
            </Link>, som samler performance-statistik på tværs af 163+ spilleautomater — inklusiv
            community-maskinerne. Data fra hundredvis af daglige spins giver et statistisk grundlag,
            som langt overgår det, man kan opnå ved individuel test. Det er denne datamængde, der gør
            vores{" "}
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
              bonus hunt dokumentation
            </Link>{" "}
            og{" "}
            <Link to="/highlights" className="text-primary hover:underline">
              community highlights
            </Link>{" "}
            troværdige.
          </p>
          <p>
            Optjen ekstra spins og credits gennem vores{" "}
            <Link to="/community/rewards" className="text-primary hover:underline">
              Rewards Program
            </Link>{" "}
            — upload clips, udfyld din profil og bidrag til fællesskabet for at få bonus-credits til turneringerne.
            Se de bedste øjeblikke fra turneringerne i{" "}
            <Link to="/highlights" className="text-primary hover:underline">
              Highlights
            </Link>{" "}
            eller shop eksklusive varer i{" "}
            <Link to="/butik" className="text-primary hover:underline">
              community-butikken
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
