import { Link } from "react-router-dom";

/**
 * Deep SEO content for /community/rewards
 * ~3,000 words – reward system explanation, strategy, EV analysis
 */
export function RewardsSeoContent() {
  return (
    <div className="space-y-8 mt-8">
      {/* Section 1 – How the system works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="beloenningssystem-forklaret">
          Belønningssystemet forklaret i detaljer
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Casinoaftalers belønningssystem er designet til at anerkende og belønne aktive community-medlemmer.
          I modsætning til traditionelle{" "}
          <Link to="/casino-bonus" className="text-primary hover:underline">casino bonusser</Link>,
          hvor du skal indbetale rigtige penge for at modtage en bonus, optjener du her belønninger
          udelukkende gennem deltagelse og bidrag. Systemet fungerer på tværs af tre primære kanaler:
          clip-uploads, profiludfyldelse og slot requests – hver med sin egen belønningsstruktur.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Belønningerne uddeles i to former: <strong className="text-foreground">bonus spins</strong> (engangsbonusser
          der kan bruges i vores{" "}
          <Link to="/community/slots" className="text-primary hover:underline">gratis spillehal</Link>) og{" "}
          <strong className="text-foreground">credits</strong> (permanente tilføjelser til din daglige pulje).
          Bonus spins forbruges ved brug og skal aktiveres manuelt fra din profilside. Permanente spins
          stacker med dine daglige 2.000 credits og er tilgængelige hver dag fremover. Denne skelnen
          er vigtig at forstå for at maksimere værdien af dine belønninger.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Hele systemet er designet med fairness som grundprincip. Der er faste lofter for hver
          belønningstype, ingen mulighed for at "grinde" ubegrænset, og alle spillere har lige adgang
          til de samme belønninger. Det sikrer, at communityet forbliver et sjovt og retfærdigt
          konkurrencemiljø – præcis som{" "}
          <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline">
            bonusser uden omsætningskrav
          </Link>{" "}
          giver mere fair vilkår end traditionelle bonusser.
        </p>
      </section>

      {/* Section 2 – Clip rewards deep dive */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="clip-beloenninger">
          Clip Rewards: Del dine bedste øjeblikke
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Community Highlights Rewards er den mest generøse belønningskanal i systemet. Hver gang du
          uploader et videoklip til{" "}
          <Link to="/highlights" className="text-primary hover:underline">Community Highlights</Link>,
          og det bliver godkendt af vores moderationsteam, modtager du 50 bonus spins. Op til 5 klips
          kan belønnes, hvilket giver et maksimalt potentiale på 250 bonus spins.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Godkendelsesprocessen er designet til at sikre kvalitet. Vi godkender clips der viser
          interessante gameplay-momenter – store gevinster, sjove bonusrunder, usædvanlige situationer
          eller impressive turneringsresultater. Clips behøver ikke at være professionelt producerede,
          men de skal vise reelt gameplay fra vores platform. Duplikerede clips, lavkvalitets-optagelser
          eller irrelevant indhold afvises. Denne kvalitetskontrol sikrer, at Highlights-sektionen
          forbliver en værdifuld ressource for hele communityet.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Strategisk set er clip-uploading den mest effektive vej til at optjene bonus spins. Med 250
          potentielle ekstra spins kan du markant øge dine chancer i{" "}
          <Link to="/community/turneringer" className="text-primary hover:underline">turneringer</Link>,
          da flere spins giver flere forsøg på at ramme de høje multiplikatorer der kræves for
          topplaceringer. Det svarer konceptuelt til at bruge{" "}
          <Link to="/free-spins" className="text-primary hover:underline">free spins</Link>{" "}
          strategisk på rigtige casinoer – jo flere forsøg, jo højere chance for et godt resultat.
        </p>
      </section>

      {/* Section 3 – Profile rewards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="profil-beloenninger">
          Profilbelønninger: Permanente daglige spins
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Profilbelønninger adskiller sig fundamentalt fra clip-belønninger: de er permanente. For
          hver af de fire profilsektioner (Profil, Stats, Favoritter og Spillestil), du udfylder,
          modtager du +5 permanente bonus spins til din daglige pulje. Det betyder, at en fuld
          profil giver +20 ekstra spins – hver eneste dag, permanent.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For at sætte dette i perspektiv: med 2.000 daglige credits og 20 ekstra daglige spins
          fra profilen, stiger din daglige kapacitet med 1%. Det lyder måske beskedent, men over
          en hel turnerings-måned akkumulerer det til 600+ ekstra spins – nok til at gøre en reel
          forskel i konkurrencen. Det matematiske princip er det samme som{" "}
          <Link to="/ordbog/expected-value" className="text-primary hover:underline">expected value</Link>{" "}
          i casinospil: små fordele akkumulerer over tid.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Profilsektionerne tjener også et sekundært formål: de hjælper os med at forstå vores
          community bedre. Når spillere deler deres foretrukne casinoer, yndlingsslots og spillestil,
          kan vi tilpasse vores indhold og anbefalinger mere præcist. Din profildata bruges aldrig
          til markedsføring eller deles med tredjeparter – den forbliver internt i vores system.
        </p>
      </section>

      {/* Section 4 – Slot Request system */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="slot-request-system">
          Slot Request: Påvirk livestreamen direkte
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Slot Request-systemet giver dig mulighed for at påvirke, hvilke spilleautomater vi spiller
          på vores live Twitch-streams. Du kan vælge fra vores{" "}
          <Link to="/slot-database" className="text-primary hover:underline">slot database</Link>{" "}
          eller skrive navnet på en maskine manuelt. Hvis vi spiller din valgte slot på stream, og vi
          rammer bonus, modtager du +20 credits som belønning.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Systemet er begrænset til én aktiv request ad gangen for at sikre fair fordeling. Når din
          request er blevet afsluttet (enten med bonus-hit eller uden), kan du sende en ny. Alle
          requests vises med status (ventende, aktiv, afsluttet) i din profil, og du kan følge med
          i realtid under livestreamen.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Slot requests er en populær feature, fordi den skaber en direkte forbindelse mellem
          community-medlemmer og livestreamen. Mange spillere bruger det strategisk: de requester
          maskiner med høj bonus-frekvens (som{" "}
          <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">
            Sweet Bonanza
          </Link>{" "}
          eller{" "}
          <Link to="/casinospil/spillemaskiner/gates-of-olympus" className="text-primary hover:underline">
            Gates of Olympus
          </Link>) for at maksimere chancen for at modtage belønningen. Se vores{" "}
          <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
            spillemaskineguides
          </Link>{" "}
          for at identificere maskiner med høj bonus-frekvens.
        </p>
      </section>

      {/* Section 5 – Strategy guide */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="beloennings-strategi">
          Strategi: Sådan maksimerer du dine belønninger
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          For at få mest muligt ud af belønningssystemet anbefaler vi følgende tilgang, prioriteret
          efter effektivitet:
        </p>
        <div className="space-y-3">
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <h3 className="font-bold text-foreground mb-1">1. Udfyld hele din profil (dag 1)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Start med at udfylde alle fire profilsektioner. Dette tager 5-10 minutter og giver dig
              +20 permanente daglige spins. Fordi belønningen er permanent, er den akkumulerede værdi
              over tid langt højere end nogen enkeltstående bonus. Over 30 dage giver det 600 ekstra
              spins – mere end de 250 engangsspins fra clip-uploads.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <h3 className="font-bold text-foreground mb-1">2. Upload 5 kvalitetsclips (uge 1-2)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Spil i spillehallen og optag dine bedste momenter. Fokusér på store gevinster, sjove
              bonusrunder eller usædvanlige situationer. Upload dem til{" "}
              <Link to="/highlights" className="text-primary hover:underline">Highlights</Link>{" "}
              for at optjene op til 250 bonus spins. Brug disse spins strategisk lige inden en
              turnerings-nulstilling for at maksimere din chance for en toppladscering.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <h3 className="font-bold text-foreground mb-1">3. Brug slot requests under live streams</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Send en request til hver stream med en maskine, der har høj bonus-frekvens. Over tid
              akkumulerer +20 credits pr. bonus-hit til en væsentlig ekstra pulje. Kombinér dette med
              deltagelse i GTW- og AVG X-bets under{" "}
              <Link to="/bonus-hunt" className="text-primary hover:underline">bonus hunts</Link>{" "}
              for at maksimere din samlede credit-indkomst.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 – Comparison with real casino bonuses */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground" id="sammenligning-med-bonusser">
          Community Rewards vs. traditionelle casino bonusser
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Det er værd at sammenligne vores belønningssystem med traditionelle{" "}
          <Link to="/casino-bonus" className="text-primary hover:underline">casino bonusser</Link>.
          Den vigtigste forskel er risiko: community rewards kræver aldrig indbetaling af rigtige
          penge. Der er ingen{" "}
          <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link>,
          ingen maksimal gevinst-begrænsning og ingen tidsfrist. Du kan bruge dine belønninger
          præcis, som du vil.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Naturligvis kan community rewards ikke konverteres til rigtige penge – de eksisterer
          udelukkende inden for vores gratisplatform. Men for spillere, der primært søger underholdning
          og konkurrence, tilbyder de en risikofri måde at forlænge og forbedre spiloplevelsen.
          Og turneringspræmier (op til 500 kr/måned pr. kategori) er ægte kontante belønninger,
          der udbetales til vinderne.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Vil du udforske bonusser med rigtige penge? Se vores guide til{" "}
          <Link to="/velkomstbonus" className="text-primary hover:underline">velkomstbonusser</Link>,{" "}
          <Link to="/free-spins-i-dag" className="text-primary hover:underline">free spins tilbud</Link>{" "}
          eller{" "}
          <Link to="/bonus-uden-indbetaling" className="text-primary hover:underline">
            bonusser uden indbetaling
          </Link>. Husk altid at læse vores{" "}
          <Link to="/ansvarligt-spil" className="text-primary hover:underline">guide til ansvarligt spil</Link>{" "}
          og sætte{" "}
          <Link to="/ansvarligt-spil/spillegraenser" className="text-primary hover:underline">
            spillegrænser
          </Link>{" "}
          inden du spiller med rigtige penge.
        </p>
      </section>
    </div>
  );
}
