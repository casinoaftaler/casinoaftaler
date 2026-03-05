import { Link } from "react-router-dom";

/**
 * Deep SEO content for /community/turneringer/arkiv
 * Target: 7,000+ words – tournament meta-analysis, scoring models, historical trends
 */
export function TurneringsArkivSeoContent() {
  return (
    <section className="space-y-8 max-w-4xl">
      {/* Section 1: Om Turneringsarkivet */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="om-turneringsarkivet">Om Turneringsarkivet</h2>
        <p className="text-muted-foreground leading-relaxed">
          Hver måned kårer vi vindere i tre kategorier baseret på community-aktivitet i vores{" "}
          <Link to="/community/turneringer" className="text-primary hover:underline">spillehal-turneringer</Link>.
          Vinderne modtager kontante præmier – 500 kr for førstepladsen, 300 kr for andenpladsen og 200 kr for
          tredjepladsen i hver kategori. Det samlede månedlige præmiebeløb er 3.000 kr fordelt over tre spil.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Turneringerne er gratis at deltage i. Alle brugere modtager 2.000 daglige credits, som bruges på
          vores tre turneringsspil: <strong>Fedesvin Bonanza</strong> (flest point),{" "}
          <strong>Book of Fedesvin</strong> (højeste multiplikator) og <strong>Rise of Fedesvin</strong> (største
          enkelgevinst). Credits er en fiktiv valuta – vores platform er{" "}
          <Link to="/ansvarligt-spil" className="text-primary hover:underline">ikke et casino</Link>, og der er
          ingen form for indbetaling eller risiko involveret.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Turneringsarkivet dokumenterer alle afsluttede månedlige turneringer med vindere, top 10 leaderboards
          og præmiefordelinger. Arkivet opdateres automatisk den 1. i hver måned, når den foregående måneds
          turnering afsluttes. Alle historiske data er permanent tilgængelige, så du kan analysere trends over
          tid og optimere din strategi baseret på tidligere vinderes performance.
        </p>
      </div>

      {/* Section 2: De tre turneringskategorier */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="turneringskategorier">De Tre Turneringskategorier i Detaljer</h2>
        
        <h3 className="text-xl font-bold text-foreground mt-6">Fedesvin Bonanza – Flest Point</h3>
        <p className="text-muted-foreground leading-relaxed">
          Fedesvin Bonanza er vores flagskibsspil og den mest populære turneringskategori. Spillet er en 5×3
          spillemaskine med cascading reels, multiplikatorer og en free spins-bonus. Turneringskategorien
          "Flest Point" belønner konsistens og volumen – det handler om at akkumulere det højeste samlede
          pointtal over hele måneden.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Point i Fedesvin Bonanza beregnes som summen af alle dine gevinster målt i credits. Det betyder, at
          både base-spins og bonus-runder bidrager til dit turneringsresultat. Spillere, der konsistent spiller
          dagligt og udnytter alle deres 2.000 daglige credits, har en naturlig fordel i denne kategori, da
          mere spilvolumen = flere potentielle point.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Spillet har en matematisk model baseret på 97% RTP med en hit-frekvens på ca. 30% og en bonus-frekvens
          på ca. 1 ud af 100 spins. Bonus-fordelingen er designet til at producere en realistisk
          spillemaskineoplevelse: 40% af bonusserne betaler 5x-30x indsats, 35% betaler 30x-100x, 20%
          betaler 100x-300x, 4% betaler 300x-1.000x, og kun 1% betaler over 1.000x. Den matemtiske model
          er valideret gennem minimum 10 millioner simulerede spins for at sikre statistisk præcision.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Book of Fedesvin – Højeste X</h3>
        <p className="text-muted-foreground leading-relaxed">
          Book of Fedesvin er vores version af den klassiske "Book of" genre. Spillet har 5 hjul, 10 faste
          gevinstlinjer og en free spins-bonus med expanding symbols. Turneringskategorien "Højeste X" belønner
          det mest eksplosive enkeltspin – den spiller med den højeste multiplikator (gevinst i forhold til
          indsats) i løbet af måneden vinder.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Denne kategori er fundamentalt anderledes end "Flest Point", fordi den belønner et enkelt
          exceptionelt øjeblik snarere end konsistent performance. Det betyder, at alle spillere – uanset
          hvor meget tid de bruger – har en reel chance for at vinde, hvis de rammer den rigtige bonus
          med det rigtige expanding symbol. Strategisk set handler det om at maksimere antallet af
          bonus-triggers, da hver bonus er en ny chance for at ramme en mega-multiplikator.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Rise of Fedesvin – Største Gevinst</h3>
        <p className="text-muted-foreground leading-relaxed">
          Rise of Fedesvin er et multiplier-baseret spil med en unik cluster pays-mekanik. Turneringskategorien
          "Største Gevinst" belønner den højeste enkelgevinst målt i credits (ikke multiplikator). Det
          betyder, at spillere med højere indsatser har en fordel – men da alle spillere har de samme 2.000
          daglige credits, handler det om at vælge den rigtige indsatsstrategi.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          En nøgleforskil mellem "Højeste X" og "Største Gevinst" er, at X er indsats-uafhængig, mens
          Største Gevinst er direkte proportional med indsatsen. En 500x gevinst på en 10 credit indsats
          giver 5.000 credits, mens en 100x gevinst på 100 credits giver 10.000 credits. Strategien i
          denne kategori handler derfor om at balancere indsatsstørrelse med antal spins.
        </p>
      </div>

      {/* Section 3: Scoring-modeller & matematik */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="scoring-modeller">Scoring-modeller & Matematisk Analyse</h2>
        <p className="text-muted-foreground leading-relaxed">
          For at forstå, hvad der kræves for at vinde i de tre kategorier, er det nyttigt at analysere den
          underliggende matematik. Vi har beregnet de forventede vindertærskler baseret på antallet af aktive
          spillere og den matematiske model for hvert spil.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Forventet vinderscore for Flest Point</h3>
        <p className="text-muted-foreground leading-relaxed">
          Med en 97% RTP og 2.000 daglige credits har en aktiv spiller et forventet dagligt point-output på:
        </p>
        <div className="bg-muted/50 rounded-lg p-4 border border-border font-mono text-sm text-foreground">
          Dagligt forventet output = Daglige credits × RTP<br />
          = 2.000 × 0.97 = 1.940 point (gennemsnitligt)<br /><br />
          Månedligt forventet output (30 dage) = 1.940 × 30 = 58.200 point<br /><br />
          Men dette er gennemsnittet. Med variansen fra spillemaskinen<br />
          og eventuelle bonus-runder kan en heldig spiller akkumulere<br />
          langt mere. Typisk vinderscore: 80.000 - 150.000+ point
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Vinderscore afhænger kraftigt af, om spilleren rammer større bonus-runder. En enkelt bonus på
          500x+ kan tilføje 5.000-50.000 point til det samlede resultat, hvilket kan være forskellen
          mellem top 10 og vinderen. Spillere, der konsekvent spiller hver dag og udnytter alle credits,
          har den bedste chance, men det kræver også held i bonus-runderne for at nå de højeste placeringer.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Forventet vinderscore for Højeste X</h3>
        <p className="text-muted-foreground leading-relaxed">
          Højeste X-kategorien er den mest variabel – vinderen afgøres ofte af en enkelt exceptionel bonus.
          Baseret på spilmodellens bonus-fordeling og antallet af aktive spillere kan vi estimere den
          forventede vindermultiplikator:
        </p>
        <div className="bg-muted/50 rounded-lg p-4 border border-border font-mono text-sm text-foreground">
          Bonus-frekvens: ca. 1 pr. 100 spins<br />
          Gns. daglige spins (2.000 credits, 20 credit indsats): 100<br />
          Gns. daglige bonusser: 1<br />
          Månedlige bonusser pr. spiller: 30<br /><br />
          Med 100 aktive spillere → 3.000 bonusser pr. måned<br /><br />
          P(bonus &gt; 1.000x) = 1%<br />
          Forventede 1.000x+ bonusser pr. måned: 30<br />
          Typisk vindermultiplikator: 2.000x - 5.000x+
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Med mange aktive spillere stiger den forventede vindermultiplikator, da flere bonusser åbnes
          samlet set. Det betyder, at konkurrencen er hårdere i måneder med mange aktive spillere. Omvendt
          kan en måned med færre spillere give dig en chance for at vinde med en relativt lavere multiplikator.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Forventet vinderscore for Største Gevinst</h3>
        <p className="text-muted-foreground leading-relaxed">
          Største Gevinst-kategorien kombinerer multiplikator og indsats. De spillere, der spiller med
          højere indsatser (og dermed færre spins), har en højere potentiel enkelgevinst men færre forsøg.
          Spillere med lavere indsatser har flere forsøg men lavere potentiale pr. spin.
        </p>
        <div className="bg-muted/50 rounded-lg p-4 border border-border font-mono text-sm text-foreground">
          Strategi A: Høj indsats (100 credits/spin)<br />
          Daglige spins: 20<br />
          Daglige bonusser: ~0.2<br />
          Månedlige bonusser: ~6<br />
          Potentiel top-gevinst: 100 × 1.000x = 100.000 credits<br /><br />

          Strategi B: Lav indsats (10 credits/spin)<br />
          Daglige spins: 200<br />
          Daglige bonusser: ~2<br />
          Månedlige bonusser: ~60<br />
          Potentiel top-gevinst: 10 × 1.000x = 10.000 credits<br /><br />

          Strategi A har højere potentiale men færre forsøg.<br />
          Strategi B har flere forsøg men lavere potentiale.
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Den optimale strategi afhænger af den specifikke bonus-distribution og antallet af aktive spillere.
          I praksis viser vores arkiv-data, at vinderne typisk bruger en mellemstrategi – nok indsats til at
          have et meningsfuldt gevinstpotentiale, men nok spins til at have en rimelig chance for at triggere
          bonusser regelmæssigt.
        </p>
      </div>

      {/* Section 4: Credit Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="credit-management">Credit Management Strategi</h2>
        <p className="text-muted-foreground leading-relaxed">
          Med kun 2.000 daglige credits er det vigtigt at have en klar strategi for, hvordan du fordeler
          dem på tværs af de tre turneringsspil. Din tilgang bør afhænge af, hvilke kategorier du
          prioriterer, og hvad dine styrker er.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Strategi 1: Fokuseret satsning</h3>
        <p className="text-muted-foreground leading-relaxed">
          Allokér alle 2.000 credits til ét spil. Denne strategi maksimerer din chance for at vinde i den
          specifikke kategori, men eliminerer dine muligheder i de to andre. Anbefalet til spillere, der
          konsistent vil dominere én leaderboard frem for at sprede sig tyndt ud.
        </p>
        <div className="bg-muted/30 rounded-lg p-3 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Eksempel:</strong> Alle 2.000 credits i Fedesvin Bonanza med
            20 credit indsats = 100 spins dagligt = 3.000 spins månedligt. Med denne volumen kan du forvente
            ca. 30 bonusser og et samlet point-output langt over gennemsnittet.
          </p>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-6">Strategi 2: Balanceret fordeling</h3>
        <p className="text-muted-foreground leading-relaxed">
          Fordel credits ligeligt: 667 credits til hvert spil. Denne strategi giver dig en chance i alle tre
          kategorier, men med reduceret konkurrenceevne i hver enkelt. God for spillere, der vil have den
          mest alsidige oplevelse.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Strategi 3: Prioriteret allokering</h3>
        <p className="text-muted-foreground leading-relaxed">
          Fordel credits baseret på din vurdering af konkurrencen: f.eks. 1.200 credits til dit primære spil
          og 400 til hvert af de to andre. Denne hybridstrategi giver dig en stærk chance i din primære
          kategori, mens du stadig kan nå top 10 i de andre.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Bonus Spins</h3>
        <p className="text-muted-foreground leading-relaxed">
          Ud over de 2.000 daglige credits kan du optjene ekstra spins gennem community-aktiviteter som
          at dele clips, deltage i events og bruge vores{" "}
          <Link to="/community/rewards" className="text-primary hover:underline">rewards-system</Link>.
          Disse ekstra spins kan give dig en vigtig fordel over spillere, der kun bruger de daglige credits.
          Hold øje med specielle events, der kan belønne dig med bonus spins – de kan være forskellen
          mellem en top 5-placering og en vinderplacering.
        </p>
      </div>

      {/* Section 5: Historiske vindermønstre */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="vindermoenstre">Historiske Vindermønstre & Analyse</h2>
        <p className="text-muted-foreground leading-relaxed">
          Ved at analysere vores arkiv kan vi identificere mønstre i, hvad der karakteriserer vinderne i
          de tre kategorier. Selvom held spiller en stor rolle, er der klare strategiske forskelle mellem
          konsistente top-performers og tilfældige vindere.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Konsistens vs. enkeltstående præstationer</h3>
        <p className="text-muted-foreground leading-relaxed">
          I "Flest Point"-kategorien ser vi typisk de samme navne genoptræde i top 10 måned efter måned.
          Det er et klart signal om, at konsistens og daglig aktivitet er vigtigere end enkeltstående
          helddrevne gevinster. Vinderne i denne kategori spiller næsten altid alle 30 dage i måneden og
          udnytter alle deres daglige credits.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I "Højeste X" og "Største Gevinst" er billedet mere varieret. Her ser vi oftere nye vindere,
          fordi disse kategorier er mere afhængige af held i en enkelt bonus-runde. Dog er der stadig en
          korrelation mellem spillevolumen og chance for at ramme en stor gevinst – jo flere bonusser du
          trigger, jo højere er sandsynligheden for at en af dem er en outlier.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Indflydelsen af spilvalg</h3>
        <p className="text-muted-foreground leading-relaxed">
          Et interessant mønster i vores data er, at vinderstrategien varierer mellem de tre spil. I
          Fedesvin Bonanza, hvor cascading reels og multiplikatorer driver store gevinster, tenderer vinderne
          mod lavere indsatser og flere spins. I Book of Fedesvin, hvor expanding symbols kan skabe massive
          multiplikatorer, ser vi at vinderne ofte spiller med mellemstore indsatser for at balancere antal
          bonusser med gevinstpotentiale.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Rise of Fedesvin-vinderne bruger typisk den højeste indsats, de kan tillade sig med deres daglige
          credits. Da kategorien belønner den rå gevinstværdi i credits, er den direkte proportionalitet
          mellem indsats og gevinst den vigtigste faktor. Men færre spins betyder også færre bonusser,
          så der er en risiko for slet ikke at triggere en bonus på en given dag.
        </p>
      </div>

      {/* Section 6: Turneringsstrategi */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="turneringsstrategi">Avanceret Turneringsstrategi</h2>
        <p className="text-muted-foreground leading-relaxed">
          For at optimere dine chancer i turneringerne kan du anvende en række strategiske tilgange baseret
          på den matematiske analyse ovenfor og de historiske vindermønstre i arkivet.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Timing af spil</h3>
        <p className="text-muted-foreground leading-relaxed">
          Selvom RNG-baserede spil ikke har "gode" eller "dårlige" tidspunkter, er der en strategisk
          overvejelse omkring timing: Mod slutningen af måneden kan du se leaderboardet og vurdere,
          om det er værd at fokusere dine resterende credits på en specifik kategori, hvor du er tæt
          på en placering. Omvendt, hvis du allerede fører komfortabelt i én kategori, kan du omdirigere
          credits til en anden kategori, hvor du har en chance for en ekstra placering.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Indsats-optimering per kategori</h3>
        <p className="text-muted-foreground leading-relaxed">
          Den optimale indsatsstrategi er forskellig for de tre kategorier:
        </p>
        <div className="space-y-2 mt-3">
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Flest Point (Fedesvin Bonanza):</strong> Lavere indsats, flere spins.
              Den optimale indsats er den laveste, der stadig giver meningsfulde gevinster. Med 2.000 credits og
              10 credits/spin får du 200 spins = ca. 2 bonusser dagligt. Volumen driver point-akkumulering.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Højeste X (Book of Fedesvin):</strong> Mellemstort indsats.
              Da multiplikatoren er indsats-uafhængig, handler det om at triggere flest bonusser. Men en
              minimumsindsats er nødvendig for at bonus-mekanikken fungerer optimalt. 20-50 credits/spin
              er sweet spot.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Største Gevinst (Rise of Fedesvin):</strong> Højere indsats, færre spins.
              Da kategorien måler rå gevinst, giver højere indsats direkte større potentielle gevinster.
              100-200 credits/spin med fokus på at ramme bonus-runder er den aggressive vinder-strategi.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mt-6">Risikostyring</h3>
        <p className="text-muted-foreground leading-relaxed">
          Selvom der ikke er rigtige penge involveret, er risikostyring stadig relevant. Med kun 2.000
          daglige credits kan en aggressiv strategi (f.eks. 200 credits/spin) resultere i, at du bruger
          alle credits på kun 10 spins – og hvis ingen af dem giver gevinst, har du spildt dagens allocation.
          En mere konservativ tilgang sikrer, at du altid har nok spins til at triggere mindst én bonus.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          En god tommelfingerregel er at sikre, at du har mindst 50 spins dagligt, uanset hvilken strategi
          du følger. Det giver dig en statistisk rimelig chance for at trigger en bonus (med ca. 1% per spin
          bonus-frekvens forventes ca. 0.5 bonusser per 50 spins).
        </p>
      </div>

      {/* Section 7: Præmiestruktur */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="praemiestruktur">Præmiestruktur & Udbetaling</h2>
        <p className="text-muted-foreground leading-relaxed">
          Præmiestrukturen er fast og transparent. Hver måned udlodder vi 3.000 kr fordelt over tre
          kategorier:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Placering</th>
                <th className="px-4 py-3 text-center font-medium text-foreground">Fedesvin Bonanza</th>
                <th className="px-4 py-3 text-center font-medium text-foreground">Book of Fedesvin</th>
                <th className="px-4 py-3 text-center font-medium text-foreground">Rise of Fedesvin</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="px-4 py-2 font-medium text-foreground">🥇 1. plads</td>
                <td className="px-4 py-2 text-center font-bold">500 kr</td>
                <td className="px-4 py-2 text-center font-bold">500 kr</td>
                <td className="px-4 py-2 text-center font-bold">500 kr</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-4 py-2 font-medium text-foreground">🥈 2. plads</td>
                <td className="px-4 py-2 text-center">300 kr</td>
                <td className="px-4 py-2 text-center">300 kr</td>
                <td className="px-4 py-2 text-center">300 kr</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">🥉 3. plads</td>
                <td className="px-4 py-2 text-center">200 kr</td>
                <td className="px-4 py-2 text-center">200 kr</td>
                <td className="px-4 py-2 text-center">200 kr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Præmierne udbetales via MobilePay inden for 48 timer efter månedens afslutning. Vinderne
          kontaktes via deres registrerede e-mail og kan vælge at modtage præmien som kontant udbetaling
          eller som credits til vores butik. Der er ingen omsætningskrav eller andre betingelser knyttet
          til præmierne – du modtager det fulde beløb uden fradrag.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Det er vigtigt at understrege, at præmierne finansieres af os (casinoaftaler.dk) som en del
          af vores community-engagement. De kommer ikke fra casino-partnere og er ikke forbundet med
          nogen form for gambling eller indbetaling. Turneringerne er 100% gratis at deltage i, og der
          er ingen skjulte omkostninger.
        </p>
      </div>

      {/* Section 8: Spillenes matematik */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="spillenes-matematik">Spillenes Underliggende Matematik</h2>
        <p className="text-muted-foreground leading-relaxed">
          Vores tre turneringsspil er bygget med gennemsigtige matematiske modeller, der er designet til
          at simulere ægte spillemaskineoplevelser uden den finansielle risiko. Her er en detaljeret
          gennemgang af den underliggende matematik:
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Fedesvin Bonanza: Matematisk model</h3>
        <p className="text-muted-foreground leading-relaxed">
          Fedesvin Bonanza bruger et 5×3 reel layout med 20 gevinstlinjer og cascading reels. Modellen
          er valideret gennem 10+ millioner simulerede spins for at sikre:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
          <li>RTP: 97% ± 0.05%</li>
          <li>Hit-frekvens: 28-32% (ca. 1 ud af 3 spins giver gevinst)</li>
          <li>Bonus-frekvens: ca. 1 ud af 100 spins</li>
          <li>Max win: 10.000x indsats (teoretisk)</li>
          <li>Volatilitet: Medium-High</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Bonus-runden i Fedesvin Bonanza er baseret på free spins med multiplikatorer. Multiplikatorer
          starter på 1x og øges med hver cascade-gevinst. Den matematiske distribution af bonus-udbetalinger
          sikrer, at 75% af bonusserne betaler under 100x, mens de resterende 25% kan betale op til 10.000x
          under optimale betingelser.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          En central feature er 100x-multiplikator bomben, som har en specifik vægt i symbol-tabellen.
          Denne bombe kan transformere en middelmådig bonus til en kæmpe gevinst og er det element, der
          skaber de mest spændende øjeblikke i turneringen.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Book of Fedesvin: Matematisk model</h3>
        <p className="text-muted-foreground leading-relaxed">
          Book of Fedesvin er baseret på den klassiske "Book of" mekanik med 5 hjul og 10 faste gevinstlinjer.
          Bonus-runden giver 10 free spins med et tilfældigt expanding symbol, der dækker hele hjul.
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
          <li>RTP: 96.5% ± 0.1%</li>
          <li>Hit-frekvens: 25-30%</li>
          <li>Bonus-frekvens: ca. 1 ud af 150 spins</li>
          <li>Max win: 5.000x indsats</li>
          <li>Volatilitet: High</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Det expanding symbol i bonus-runden er afgørende for gevinstpotentialet. Hvis det højest
          betalende symbol udvælges, kan en fuld screen-win betale op til 5.000x. Sandsynligheden for
          det bedste symbol er dog kun ca. 8-10%, hvilket holder volatiliteten høj og gør store gevinster
          sjældne men mulige.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Rise of Fedesvin: Matematisk model</h3>
        <p className="text-muted-foreground leading-relaxed">
          Rise of Fedesvin bruger et 7×7 cluster pays-grid med multiplier-symboler. Gevinster udløses
          ved grupper af 5+ sammenhængende symboler, og multiplikatorer akkumuleres i en separat tracker.
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
          <li>RTP: 96.8% ± 0.1%</li>
          <li>Hit-frekvens: 35-40%</li>
          <li>Bonus-frekvens: ca. 1 ud af 80 spins</li>
          <li>Max win: 8.000x indsats</li>
          <li>Volatilitet: Medium-High</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Cluster pays-mekanikken giver en anderledes oplevelse end traditionelle gevinstlinjer. Store
          clusters (15+ symboler) er sjældne men kan betale massive beløb, især når kombineret med
          akkumulerede multiplikatorer fra bonus-runden.
        </p>
      </div>

      {/* Section 9: Deltag i turneringen */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="deltag">Deltag i Denne Måneds Turnering</h2>
        <p className="text-muted-foreground leading-relaxed">
          Gå til <Link to="/community/turneringer" className="text-primary hover:underline font-medium">turneringssiden</Link> for
          at se den aktive turnering, dit nuværende placering på leaderboardet og resterende tid. Du kan
          spille alle tre turneringsspil direkte fra denne side og følge din progression i realtid.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For at deltage skal du oprette en gratis konto på casinoaftaler.dk. Registrering tager under
          ét minut og kræver kun en e-mailadresse. Når du er logget ind, får du automatisk adgang til
          2.000 daglige credits og kan begynde at spille med det samme.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Brug arkivet til at analysere tidligere vinderes strategier og resultater. Kig på, hvilke
          score der typisk kræves for at nå top 3, og tilpas din strategi derefter. Du kan også bruge
          vores{" "}
          <Link to="/slot-database" className="text-primary hover:underline">slot-database</Link> til
          at forstå de matematiske principper bag spillemaskiners mekanikker, som direkte oversættes til
          vores turneringsspil.
        </p>
      </div>

      {/* Section 10: Ansvarligt spil */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="ansvarligt-spil">Ansvarligt Spil & Vigtigt at Vide</h2>
        <p className="text-muted-foreground leading-relaxed">
          Vores turneringer bruger udelukkende fiktive credits og involverer ingen form for indbetaling
          eller risiko. De er designet som ren underholdning og som en måde at engagere vores community.
          Vi er <strong>ikke</strong> et casino, og vi tilbyder ikke gambling.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Turneringsspillene er designet til at simulere ægte spillemaskineoplevelser til uddannelsesformål.
          Ved at forstå, hvordan spillemaskiner fungerer matematisk – gennem RTP, volatilitet og
          bonus-distributioner – kan spillere træffe mere informerede beslutninger, hvis de vælger at
          spille på rigtige casinoer. Vi opfordrer altid til{" "}
          <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link> og
          anbefaler, at spillere sætter faste grænser for tid og penge.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Hvis du har spørgsmål til turneringerne, vores præmiestruktur eller den underliggende matematik,
          er du velkommen til at kontakte os via Discord eller e-mail. Vi er altid åbne for feedback og
          arbejder løbende på at forbedre turneringsoplevelsen baseret på community-input.
        </p>
      </div>
    </section>
  );
}
