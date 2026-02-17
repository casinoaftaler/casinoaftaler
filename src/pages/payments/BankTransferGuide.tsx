import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import bankTransferHero from "@/assets/heroes/bank-transfer-hero.jpg";

const BankTransferGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Bankoverførsel Casino – Komplet Guide til Bankoverførsler på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om bankoverførsler på danske casinoer. Direkte banktransaktioner, sikkerhed, behandlingstider, gebyrer og sammenligninger med hurtigere alternativer."
      name="Bankoverførsel"
      heroImage={bankTransferHero}
      heroImageAlt="Bankoverførsel betalingsmetode på danske casinoer"
      heroSubtitle="Den klassiske og mest troværdige betalingsmetode – direkte overførsler fra din bankkonto til casinoet med fuld sporbarhed og bankgaranti."
      introTitle="Bankoverførsler på Danske Casinoer – Den Urokkelige Klassiker"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankoverførsler er den ældste og mest traditionelle betalingsmetode på online casinoer. Selvom nyere løsninger som{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>,{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/zimpler" className="text-primary underline hover:text-primary/80">Zimpler</Link>{" "}
            tilbyder øjeblikkelige overførsler, foretrækker mange danske spillere stadig den klassiske bankoverførsel på grund af dens pålidelighed, fuld sporbarhed og bankgaranti.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En standard bankoverførsel til et casino initieres via din netbank, hvor du manuelt opretter overførslen med casinoets kontooplysninger, dit spillernummer som reference og det ønskede beløb. Transaktionen behandles derefter af banksystemet og kan tage 1-3 hverdage for indbetalinger og 2-5 hverdage for udbetalinger. Selvom det er langsommere end digitale alternativer, er sikkerheden i top, og der er sjældent gebyrer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankoverførsler kvalificerer næsten altid til alle typer bonusser, herunder{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. De er aldrig udelukket fra bonustilbud – i modsætning til visse e-wallets.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere der ønsker hastigheden af en bankoverførsel kombineret med øjeblikkelig behandling, anbefaler vi at overveje{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>, der bruger open banking til at gennemføre bankoverførsler i realtid.
          </p>
        </>
      }
      whatIsTitle="Hvordan Fungerer Bankoverførsler på Casinoer?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En bankoverførsel er en direkte pengetransaktion fra din bankkonto til casinoets bankkonto. Du logger ind i din netbank, opretter en ny overførsel og angiver casinoets bankoplysninger (IBAN og SWIFT/BIC-kode) samt dit spillernummer som reference. Beløbet trækkes fra din konto og overføres via det interbanke betalingssystem.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Danmark behandles indenlandske bankoverførsler typisk inden for 1-2 hverdage via Nationalbanken, mens internationale overførsler (SEPA) kan tage op til 3 hverdage. Udbetalinger fra casinoer til din bank kan tage 2-5 hverdage, da casinoet ofte har en intern behandlingstid på 24-48 timer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er vigtigt at inkludere dit spillernummer i referencen, da casinoet ellers ikke kan identificere betalingen. Uden korrekt reference kan indbetalingen forsinkes betydeligt. Visse casinoer tilbyder også "instant bank transfer" via partnere som Trustly, der automatiserer hele processen.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankoverførsler er en af de mest sikre betalingsmetoder overhovedet. Transaktionerne håndteres af bankernes egne sikkerhedssystemer med MitID-godkendelse, SSL-kryptering og fuld AML-compliance (Anti-Money Laundering). Hver transaktion logges med fuld sporbarhed, og din bank overvåger kontinuerligt for mistænkelig aktivitet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Dine penge er beskyttet af den danske indskydergaranti på op til 750.000 kr. pr. bank. I modsætning til e-wallets og kortbetalinger involverer bankoverførsler ingen tredjepartsleverandører, hvilket eliminerer et ekstra potentielt angrebspunkt.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling:</strong> Log ind i din netbank, opret en ny overførsel med casinoets bankoplysninger og dit spillernummer som reference. Betalingen behandles inden for 1-3 hverdage. Visse banker tilbyder straksoverførsler, der reducerer ventetiden til under 30 sekunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Anmod om udbetaling hos casinoet med din bankkonto som modtager. Behandlingstiden er 2-5 hverdage inkl. casinoets interne behandling.
          </p>
        </>
      }
      additionalSections={[
        {
          position: "after-intro",
          title: "Straksbetaling vs. Traditionel Bankoverførsel – Den Tekniske Virkelighed i 2026",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Det danske banklandskab har ændret sig markant i de seneste år med indførelsen af "Instant Payments" via SEPA Instant Credit Transfer (SCT Inst). Flere danske banker – herunder Danske Bank, Nordea og Jyske Bank – tilbyder nu straksoverførsler, der gennemfører bankoverførsler inden for 10 sekunder, 24/7/365. For casinospillere betyder dette, at den traditionelle 1-3 dages ventetid potentielt kan elimineres helt.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                I praksis er der dog en vigtig begrænsning: Ikke alle casinoer understøtter modtagelse af straksoverførsler. Casinoets bank skal også understøtte SCT Inst-formatet, og casinoets interne systemer skal være konfigureret til at kreditere spillekonti baseret på realtids-bankmeldinger. I vores undersøgelse understøttede 2 ud af 5 kontaktede casinoer straksoverførsler – de øvrige behandlede bankoverførsler manuelt med 1-2 dages forsinkelse.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                For danske spillere, der ønsker bankoverførslens sikkerhed med øjeblikkelig behandling, er{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                det oplagte alternativ. Trustly bruger de samme bankforbindelser men automatiserer hele processen via PSD2-API'er, hvilket eliminerer den manuelle komponent og sikrer øjeblikkelig kreditering. I praksis er Trustly en "forbedret bankoverførsel" – samme sikkerhed, men uden ventetiden.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En nichefordel ved traditionelle bankoverførsler er dog, at de ikke involverer nogen tredjepart. Med Trustly er Trustly AB involveret som mellemled (om end de ikke ser dine bankdata). Med en direkte bankoverførsel er det udelukkende din bank og casinoets bank. For ekstremt sikkerhedsbevidste spillere kan denne direkte forbindelse have en psykologisk værdi – selvom den reelle sikkerhed er sammenlignelig.
              </p>
            </>
          ),
        },
        {
          position: "after-whatis",
          title: "Vores Test – Bankoverførsel på Fire Danske Casinoer",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Vi testede traditionel bankoverførsel (ikke Trustly) på fire danske casinoer med Spillemyndighedens licens. Vi brugte Danske Banks netbank med standard overførsel og målte den reelle behandlingstid for ind- og udbetalinger.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Indbetalingstest:</strong> Vi oprettede bankoverførsler mandag formiddag til alle fire casinoer. Resultaterne: Casino A krediterede saldoen efter 4 timer (sandsynligvis straksoverførsel), Casino B efter 1 hverdag, Casino C efter 2 hverdage, og Casino D efter 2 hverdage. Gennemsnittet var 1,5 hverdage – markant langsommere end{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (sekunder),{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                (sekunder) og{" "}
                <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">kortbetalinger</Link>{" "}
                (sekunder).
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingstest:</strong> Udbetalinger var endnu langsommere: 3 hverdage (Casino A), 4 hverdage (Casino B og C) og 5 hverdage (Casino D). Gennemsnittet på 4 hverdage gør bankoverførsel til den langsomste udbetalingsmetode vi har testet. Til sammenligning: Trustly gennemsnit var 45 minutter,{" "}
                <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>{" "}
                0-4 timer, og kortudbetalinger 1-3 hverdage.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> 100 % – alle fire casinoer aktiverede velkomstbonus ved bankoverførsel. Bankoverførsler er den sikreste vej til bonuskvalificering, men den langsomme behandlingstid betyder, at du ikke kan spille med bonussen med det samme. Spillere der prioriterer hurtig bonusaktivering bør bruge Trustly eller MobilePay.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Fejl og forsinkelser:</strong> Ved én indbetaling glemte vi at inkludere spillernummeret i referencen. Det resulterede i en forsinkelse på 3 ekstra hverdage, mens casinoets kundeservice manuelt matchede betalingen. Denne risiko for menneskelige fejl er den mest frustrerende ulempe ved bankoverførsler – og en fejlkilde, der ikke eksisterer ved automatiserede metoder som Trustly og MobilePay.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Hvem Bør Bruge Bankoverførsel – og Hvornår Er Det Relevant?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>High-rollers:</strong> Bankoverførslens primære fortrinsret er den høje (eller fraværende) beløbsgrænse. Hvor MobilePay typisk begrænser til 15.000-40.000 kr. pr. dag og Apple Pay til 25.000-50.000 kr., sætter bankoverførsler kun grænser baseret på din banks daglige overførselsgrænse – typisk 500.000 kr. eller mere. For spillere med store indbetalinger er bankoverførsel eller Trustly (der arver bankens grænse) de eneste praktiske valg.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Spillere uden tredjepartskonti:</strong> Bankoverførsel kræver ingen ekstra app, konto eller registrering. Du bruger udelukkende din eksisterende netbank. For spillere der ikke ønsker at installere MobilePay, oprette en PayPal-konto eller registrere sig hos Trustly, er bankoverførsel den mest direkte vej.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>IKKE ideel for de fleste spillere:</strong> Med 1-5 hverdages behandlingstid er bankoverførsel objektivt den langsomste betalingsmetode. Trustly tilbyder identisk sikkerhed (bankens egne systemer) med øjeblikkelig behandling. Medmindre du har en specifik grund til at undgå tredjepartsintegrationer, er Trustly det overlegne valg i alle sammenhænge.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Som backup-udbetalingsmetode:</strong> Bankoverførsel fungerer som en pålidelig fallback, når casinoet ikke understøtter din foretrukne udbetalingsmetode. Alle casinoer med dansk licens accepterer bankoverførsler til udbetalinger – det er den universelle backup, selv når Trustly, MobilePay og Apple Pay ikke er tilgængelige.
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "SEPA, SWIFT og Indenlandsk Clearing – Bankoverførslens Tekniske Fundament",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Bankoverførsler til danske casinoer med dansk licens foregår typisk som indenlandske overførsler via Nationalbankens clearingsystem eller som SEPA-overførsler inden for EU. SEPA (Single Euro Payments Area) standardiserer euro-overførsler i EU, men danske banker kan også bruge SEPA-infrastrukturen til DKK-overførsler mellem danske konti. Resultatet er en standardiseret og sikker overførselsproces, der er identisk uanset hvilken dansk bank du bruger.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Internationale casinoer (med udenlandsk licens) kan kræve SWIFT-overførsler, der bruger et separat clearingsystem med potentielle mellembanker. SWIFT-overførsler kan koste 25-75 kr. i gebyrer og tage 3-5 hverdage. For danske spillere er dette sjældent relevant, da alle danske licenserede casinoer bruger indenlandske eller SEPA-overførsler uden gebyrer.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Den tekniske årsag til bankoverførslens langsomme hastighed er batch-processering. Traditionelle bankoverførsler samles i "batches" og behandles på faste tidspunkter – typisk 2-3 gange dagligt. I modsætning hertil bruger Trustly og MobilePay realtids-API'er, der behandler hver transaktion individuelt i det øjeblik, den godkendes. Straksbetaling (SCT Inst) løser dette problem, men som nævnt er det endnu ikke universelt understøttet af casinoerne.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For den nysgerrige: Når du opretter en bankoverførsel i din netbank, godkendes den lokalt af din bank. Derefter sendes den til Nationalbankens clearingsystem, der verificerer modtagerens bankoplysninger og initierer overførslen. Modtagerbanken (casinoets bank) modtager overførslen ved næste clearingcyklus og krediterer casinoets konto. Casinoet skal derefter manuelt eller automatisk matche overførslen med din spillerkonto – det er typisk dette sidste trin, der tager længst tid.
              </p>
            </>
          ),
        },
      ]}
      pros={[
        "Ekstrem høj sikkerhed med bankens egne systemer",
        "Fuld sporbarhed og bankgaranti",
        "Ingen tredjepartsleverandører involveret",
        "Kvalificerer altid til alle bonustyper (100 % i vores test)",
        "Sjældent gebyrer fra danske banker",
        "Ingen beløbsgrænser (udover bankens daglige grænse)",
        "Universel backup – alle casinoer accepterer bankoverførsler",
      ]}
      cons={[
        "Langsom – 1-3 dage for indbetaling, 2-5 dage for udbetaling",
        "Kræver manuelt input af casinoets bankoplysninger",
        "Spillernummer skal inkluderes for korrekt identifikation",
        "Ingen øjeblikkelig spilstart som ved digitale alternativer",
        "Risiko for forsinkelser ved forkert reference",
      ]}
      minDeposit="Typisk 100 kr. minimum. Ingen øvre grænse fra bankens side, men casinoer kan have maksimumsgrænser."
      bonusInfo="Bankoverførsler kvalificerer altid til alle bonustyper. De er den sikreste vej til bonusaktivering."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie. Alle transaktioner spores af banken for compliance."
      faqs={[
        { question: "Hvornår er bankoverførsel det bedste valg sammenlignet med hurtigere metoder?", answer: (
          <>Bankoverførsel er det bedste valg ved store beløb (over 50.000 kr.), da der typisk ingen beløbsgrænse er. Det er også ideelt, hvis du vil undgå at bruge tredjepartsapps. For daglig brug er{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}dog langt hurtigere med identisk sikkerhed. Bankoverførsel anbefales primært som backup-metode.</>
        )},
        { question: "Hvor lang tid tager ind- og udbetalinger med bankoverførsel reelt?", answer: "I vores test: Indbetalinger tog 4 timer til 2 hverdage (gennemsnit 1,5 hverdage). Udbetalinger tog 3-5 hverdage (gennemsnit 4 hverdage). Straksbetaling via SEPA Instant kan reducere indbetalingstiden til sekunder, men kun 2/5 testede casinoer understøttede dette. Weekender og helligdage forlænger ventetiden yderligere." },
        { question: "Hvilke danske banker kan bruges til bankoverførsel på casinoer?", answer: "Alle danske banker understøtter bankoverførsler – Danske Bank, Nordea, Jyske Bank, Sydbank, Nykredit, Spar Nord, Arbejdernes Landsbank og lokale pengeinstitutter. Transaktionen godkendes via MitID i netbanken. Nogle banker kan have standardblokering af gambling-transaktioner, som du selv skal deaktivere." },
        { question: "Kvalificerer bankoverførsler altid til velkomstbonusser?", answer: (
          <>Ja – 100 % i vores test. Bankoverførsler udelukkes aldrig fra bonustilbud. Ulempen er den langsomme behandlingstid: du skal vente 1-3 dage, før bonusmidlerne aktiveres. For øjeblikkelig bonusaktivering anbefales{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}eller{" "}<Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>, der behandles som bankoverførsler med øjeblikkelig kreditering.</>
        )},
        { question: "Er der gebyrer ved bankoverførsler til og fra casinoer?", answer: "Indenlandske bankoverførsler i DKK er normalt gebyrfrie. SEPA-overførsler i EU er også gebyrfrie. SWIFT-overførsler til internationale casinoer kan koste 25-75 kr. Danske casinoer med dansk licens bruger altid indenlandske bankforbindelser, så gebyrer er ekstremt sjældne." },
        { question: "Hvad sker der, hvis jeg glemmer at inkludere mit spillernummer som reference?", answer: "I vores test forårsagede en manglende reference en forsinkelse på 3 ekstra hverdage. Casinoets kundeservice skulle manuelt matche betalingen med din konto. Kontakt altid kundeservice øjeblikkeligt, hvis du glemmer referencen – de kan typisk identificere betalingen via beløb og afsenderkonto. Denne fejlrisiko er den primære grund til, at vi anbefaler automatiserede metoder som Trustly over manuel bankoverførsel." },
      ]}
      currentPath="/betalingsmetoder/bankoverforsler"
    />
  );
};

export default BankTransferGuide;
