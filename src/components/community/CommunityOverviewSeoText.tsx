import { Link } from "react-router-dom";

/**
 * Deep SEO text for /community (overview page).
 * ~4,500 words explaining the community ecosystem with strategic internal links.
 */
export function CommunityOverviewSeoText() {
  return (
    <div className="space-y-8">
      {/* Section 1 – What is the community */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="hvad-er-community">
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
          <p>
            Idéen bag communityet opstod fra Jonas' erfaring som casino-streamer. I stedet for kun at se
            andre spille, ville han give seerne mulighed for selv at deltage aktivt – men uden den
            økonomiske risiko, der følger med rigtige casinospil. Resultatet er et gamification-baseret
            økosystem, hvor du optjener credits, spiller gratis slots, kæmper om præmier i turneringer
            og bidrager til et fællesskab af ligesindede casino-entusiaster.
          </p>
          <p>
            Communityet adskiller sig fundamentalt fra traditionelle online casinoer på flere måder: Der
            er ingen mulighed for at indbetale rigtige penge, alle daglige credits er gratis (2.000 pr.
            dag), og konkurrencerne handler om dygtighed og strategisk spiladfærd snarere end om, hvem
            der kan indsætte mest. Det gør platformen til et ideelt alternativ for spillere, der ønsker
            underholdning uden risiko – eller som ønsker at teste strategier inden de bruger dem på{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline">
              rigtige casinoer
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 2 – The ecosystem */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="spil-oekosystem">
          Et sammenhængende spil-økosystem
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Communityet består af flere indbyrdes forbundne platforme, der tilsammen skaber en komplet
            spiloplevelse:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Spillehal:</strong> Fire eksklusive community-maskiner
              — Book of Fedesvin (inspireret af{" "}
              <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">Book of Dead</Link>),
              Rise of Fedesvin (inspireret af{" "}
              <Link to="/casinospil/spillemaskiner/legacy-of-dead" className="text-primary hover:underline">Legacy of Dead</Link>),
              Gates of Fedesvin (inspireret af{" "}
              <Link to="/casinospil/spillemaskiner/gates-of-olympus" className="text-primary hover:underline">Gates of Olympus</Link>)
              og Fedesvin Bonanza (inspireret af{" "}
              <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">Sweet Bonanza</Link>)
              — med 2.000 daglige credits.
            </li>
            <li>
              <strong className="text-foreground">Turneringer:</strong> Månedlige konkurrencer i tre
              kategorier med kontante præmier (500/300/200 kr). Alle resultater arkiveres med
              leaderboard-snapshots i{" "}
              <Link to="/community/turneringer/arkiv" className="text-primary hover:underline">turneringsarkivet</Link>.
            </li>
            <li>
              <strong className="text-foreground">Bonus Hunt:</strong> Live-streamede bonus hunts med
              dokumenterede resultater fra{" "}
              <Link to="/casino-anmeldelser" className="text-primary hover:underline">
                danske casinoer
              </Link>. Deltag med GTW- og AVG X-bets i realtid via{" "}
              <Link to="/bonus-hunt" className="text-primary hover:underline">bonus hunt-siden</Link>.
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
            <li>
              <strong className="text-foreground">Hall of Fame:</strong> Permanente leaderboards, all-time
              rekorder og community-legender samles i{" "}
              <Link to="/community/hall-of-fame" className="text-primary hover:underline">
                Hall of Fame
              </Link>{" "}
              som et historisk arkiv over de bedste præstationer.
            </li>
          </ul>
          <p>
            Alle disse elementer er forbundet: credits optjent i spillehallen kan bruges i turneringer,
            gevinster fra turneringer vises i Hall of Fame, bonus hunt-resultater opdaterer Slot Database,
            og Highlights-clips kan give ekstra Rewards. Denne integration betyder, at jo mere du
            deltager, jo mere får du ud af platformen.
          </p>
        </div>
      </section>

      {/* Section 3 – Spillehal deep dive */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="spillehal-guide">
          Spillehallen: Gratis slots med ægte mekanikker
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Vores gratis spilleautomater er ikke forenklede demo-versioner – de er fuldgyldige
            spillemaskiner med de samme mekanikker som de rigtige versioner. Book of Fedesvin
            har expanding symbols og free spins-mekanik identisk med{" "}
            <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">
              Book of Dead
            </Link>. Fedesvin Bonanza har tumble-mekanik med multiplier-bomber, præcis som{" "}
            <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">
              Sweet Bonanza
            </Link>. Gates of Fedesvin har multiplier-orbs og cluster-pays
            som{" "}
            <Link to="/casinospil/spillemaskiner/gates-of-olympus" className="text-primary hover:underline">
              Gates of Olympus
            </Link>.
          </p>
          <p>
            Denne trofasthed til originale mekanikker tjener to formål: For det første giver det en
            autentisk spiloplevelse, der er underholdende i sig selv. For det andet fungerer det som
            et læringsværktøj – du kan forstå, hvordan{" "}
            <Link to="/ordbog/cascading-wins" className="text-primary hover:underline">cascading wins</Link>,{" "}
            <Link to="/ordbog/multiplikator" className="text-primary hover:underline">multiplikatorer</Link>,{" "}
            <Link to="/ordbog/expanding-wild" className="text-primary hover:underline">expanding wilds</Link> og{" "}
            <Link to="/ordbog/bonus-runde" className="text-primary hover:underline">bonus-runder</Link> fungerer,
            uden at risikere rigtige penge.
          </p>
          <p>
            Hver spiller modtager 2.000 gratis credits dagligt. Credits kan ikke købes for rigtige penge,
            og de kan ikke konverteres til rigtige penge. Dette design er bevidst: Vi ønsker at skabe
            en platform baseret på underholdning og fællesskab, ikke på gambling. Det betyder også, at
            vores turneringer reelt belønner den bedste strategi og de dygtigste spillere, ikke dem med
            den dybeste lomme.
          </p>
          <p>
            For spillere der ønsker at prøve rigtige spilleautomater, anbefaler vi at starte med en{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary hover:underline">
              bonus uden indbetaling
            </Link>{" "}
            eller{" "}
            <Link to="/free-spins" className="text-primary hover:underline">
              free spins
            </Link>{" "}
            hos et af de casinoer, vi har{" "}
            <Link to="/casino-anmeldelser" className="text-primary hover:underline">
              anmeldt og testet
            </Link>. Læs altid{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">
              omsætningskravene
            </Link>{" "}
            inden du accepterer en bonus.
          </p>
        </div>
      </section>

      {/* Section 4 – Tournament system */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="turneringssystem">
          Turneringssystemet: Månedlige konkurrencer med kontante præmier
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Vores turneringssystem kører i månedlige cyklusser med tre kategorier, der tester
            forskellige spilaspekter: Biggest Win (den største enkeltgevinst), Biggest X (den
            højeste multiplikator) og Highest Win Amount (den højeste samlede gevinst). Hver
            kategori har sin egen leaderboard, og præmierne fordeles til top 3 i hver kategori:
            500 kr (1. plads), 300 kr (2. plads) og 200 kr (3. plads).
          </p>
          <p>
            Turneringsresultater nulstilles den 1. i hver måned, og vinderdata fra den foregående
            måned arkiveres automatisk i{" "}
            <Link to="/community/turneringer/arkiv" className="text-primary hover:underline">
              turneringsarkivet
            </Link>. Alle vindere med deres scores, display-navne og avatars gemmes permanent –
            både for at anerkende præstationer og for at opretholde fuldstændig gennemsigtighed.
          </p>
          <p>
            Den strategiske dybde i turneringerne overrasker mange nye spillere. At opnå den højeste
            multiplikator kræver ikke bare held, men også en forståelse af hvilke spilleautomater
            der har det højeste potentiale i bonus-runder. Spillere med viden om{" "}
            <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link>,{" "}
            <Link to="/ordbog/hit-frequency" className="text-primary hover:underline">hit-frekvens</Link> og{" "}
            <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP</Link>{" "}
            har en reel fordel, fordi de kan vælge de rigtige maskiner til den rigtige turnering.
          </p>
        </div>
      </section>

      {/* Section 5 – How community data improves casino choices */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="community-data">
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
            forskellige forhold. For eksempel viser vores data, at{" "}
            <Link to="/casinospil/spillemaskiner/gates-of-olympus" className="text-primary hover:underline">
              Gates of Olympus
            </Link>{" "}
            har en gennemsnitlig bonus-udbetaling der er markant højere end medianen – hvilket indikerer
            at gevinsterne er drevet af sjældne, store hits snarere end konsistente resultater.
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
          <p>
            Denne datadrevne tilgang er unik i den danske casino-branche. Hvor andre sider baserer
            deres anbefalinger på producenternes egne specifikationer eller subjektive vurderinger,
            kan vi underbygge vores anmeldelser med hundredvis af dokumenterede datapunkter. Det giver
            dig som læser et langt stærkere grundlag for at træffe informerede beslutninger om, hvilke
            casinoer og spil der passer til din spillestil og dit budget.
          </p>
        </div>
      </section>

      {/* Section 6 – Bonus Hunt participation */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="bonus-hunt-deltagelse">
          Bonus Hunt-deltagelse: Sådan fungerer community bets
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Under live bonus hunts på Twitch kan community-medlemmer deltage aktivt via to
            betting-formater: <strong className="text-foreground">Guess The Win (GTW)</strong> og{" "}
            <strong className="text-foreground">Average X Betting (AVG X)</strong>. Begge formater
            bruger udelukkende community-credits – aldrig rigtige penge.
          </p>
          <p>
            <strong className="text-foreground">GTW</strong> er den mest populære betform. Her gætter
            du på den præcise slutbalance af hele bonus hunten. Jo tættere dit gæt er på det endelige
            resultat, jo højere placerer du dig. GTW kræver en kombination af statistisk forståelse
            (hvad er det sandsynlige gennemsnitlige X for denne samling af slots?) og intuition (er
            der blevet åbnet mange dead bonusser, eller er hunten på vej mod et højt gennemsnit?).
          </p>
          <p>
            <strong className="text-foreground">AVG X Betting</strong> er mere strategisk. Her vælger
            du en gruppe (A, B, C eller D), der repræsenterer et interval for det gennemsnitlige X.
            For eksempel kan grupperne være A: 0-60x, B: 60-90x, C: 90-120x og D: 120x+. Din
            indsats placeres på den gruppe, du tror det gennemsnitlige X ender i. Hvis din gruppe
            vinder, deles puljen blandt vinderne proportionalt med deres indsats.
          </p>
          <p>
            Alle bonus hunt-resultater dokumenteres i{" "}
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
              Bonus Hunt Arkivet
            </Link>{" "}
            med fuld transparens. Se vores{" "}
            <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">
              testmetode
            </Link>{" "}
            for mere om, hvordan vi sikrer ærlighed og gennemsigtighed i alle vores aktiviteter.
          </p>
        </div>
      </section>

      {/* Section 7 – Trust & responsible gaming */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="tillid-og-ansvarligt-spil">
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
            for at tabe rigtige penge. De daglige 2.000 credits fungerer som en naturlig
            spillegrænse – når de er brugt, kan du ikke spille mere før næste dag. Dette design
            afspejler principperne bag{" "}
            <Link to="/ansvarligt-spil/spillegraenser" className="text-primary hover:underline">
              spillegrænser
            </Link>{" "}
            på rigtige casinoer, men uden den økonomiske konsekvens.
          </p>
          <p>
            For dem, der ønsker at spille med rigtige penge, anbefaler vi
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
            i perspektiv inden tilmelding. Hvis du oplever problemer med spil, er{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary hover:underline">
              StopSpillet
            </Link>{" "}
            (70 22 28 25) tilgængelig for gratis, anonym rådgivning, og{" "}
            <Link to="/ansvarligt-spil/rofus" className="text-primary hover:underline">
              ROFUS
            </Link>{" "}
            giver mulighed for selvudelukkelse fra alle danske casinoer.
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

      {/* Section 8 – Getting started */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground" id="kom-i-gang">
          Sådan kommer du i gang
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            At komme i gang med Casinoaftaler Community er gratis og tager under et minut. Opret en
            konto, verificér din alder, og du er klar til at spille. Du modtager øjeblikkeligt 2.000
            credits, som du kan bruge i spillehallen. Dine resultater registreres automatisk, og du
            deltager automatisk i den aktuelle måneds turneringer.
          </p>
          <p>
            For at maksimere din oplevelse anbefaler vi at udfylde din profil (som giver ekstra bonus
            spins via{" "}
            <Link to="/community/rewards" className="text-primary hover:underline">
              Rewards-programmet
            </Link>), tilslutte din Twitch-konto for at deltage i live bonus hunt bets, og uploade
            dine bedste gameplay-clips til{" "}
            <Link to="/highlights" className="text-primary hover:underline">
              Highlights
            </Link>{" "}
            for yderligere belønninger.
          </p>
          <p>
            Har du spørgsmål om communityet eller vores platform generelt? Besøg vores{" "}
            <Link to="/kontakt" className="text-primary hover:underline">kontaktside</Link>,
            læs vores{" "}
            <Link to="/om" className="text-primary hover:underline">Om os</Link>-side, eller følg
            os live på Twitch, hvor Jonas og Kevin streamer regelmæssigt.
          </p>
        </div>
      </section>
    </div>
  );
}
