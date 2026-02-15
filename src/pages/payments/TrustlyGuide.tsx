import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import trustlyHero from "@/assets/heroes/trustly-hero.jpg";

const TrustlyGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Trustly Casino – Komplet Guide til Trustly på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om Trustly på danske casinoer. Direkte bankoverførsler, MitID-sikkerhed, ingen gebyrer, hurtige udbetalinger og de bedste Trustly casinoer i Danmark."
      name="Trustly"
      heroImage={trustlyHero}
      heroImageAlt="Trustly open banking betalingsmetode på danske casinoer"
      heroSubtitle="Trustly er den direkte bro mellem din bankkonto og casinoet – øjeblikkelige overførsler via open banking og MitID uden kortoplysninger eller separate konti."
      introTitle="Trustly på Danske Casinoer – Direkte Bankbetaling i Realtid"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly har revolutioneret casinobetalinger ved at tilbyde øjeblikkelige konto-til-konto-overførsler direkte fra din bank. Ingen kortnumre, ingen e-wallet-konti, ingen ekstra trin – bare en hurtig MitID-godkendelse, og pengene er på din spillekonto. Grundlagt i Sverige i 2008, har Trustly vokset til at blive en af de mest populære betalingsløsninger i den nordiske casinobranche.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly bruger open banking-teknologi (under PSD2-rammen) til at forbinde din bankkonto direkte med casinoet. Det betyder, at du logger ind med MitID, vælger din bank, godkender overførslen – og transaktionen er fuldført inden for sekunder. Den store fordel er, at Trustly aldrig gemmer dine bankoplysninger, og casinoet aldrig ser dine kontodata.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere er Trustly et af de bedste valg, fordi det kombinerer hastighed med sikkerhed – og fordi Trustly-indbetalinger næsten altid kvalificerer til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>{" "}
            og andre kampagner. Modsat e-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>{" "}
            er Trustly sjældent udelukket fra bonustilbud, da det betragtes som en bankoverførsel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Trustly ejes i dag af Nordic Capital og håndterer milliarder af transaktioner årligt. Virksomheden har kontorer i Stockholm, Helsinki, London og flere andre byer, og er reguleret af svenske og europæiske finansielle myndigheder. I denne guide gennemgår vi alt om Trustly – fra sikkerhed og hastighed til bonusregler og sammenligning med andre metoder.
          </p>
        </>
      }
      whatIsTitle="Hvad er Trustly – og Hvordan Fungerer Open Banking?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly blev grundlagt i 2008 i Stockholm af Carl Wilson, Joel Ekengren och Lukas Grönberg med en mission om at gøre online betalinger hurtigere og sikrere. I stedet for at kræve kortoplysninger eller separate e-wallet-konti, bruger Trustly APIs direkte til bankernes systemer via den europæiske PSD2-regulering (Payment Services Directive 2). Denne "open banking"-tilgang betyder, at Trustly aldrig selv holder dine penge – de faciliterer blot overførslen mellem din bank og casinoet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Danmark forbinder Trustly til alle større banker via MitID-godkendelse. Når du vælger Trustly i casinoets kasse, præsenteres du for en liste over danske banker. Du vælger din bank, logger ind med MitID, vælger den konto du vil betale fra, og bekræfter beløbet. Hele processen tager typisk under 30 sekunder, og pengene er tilgængelige øjeblikkeligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Trustly understøtter også "Pay N Play" – en innovativ løsning, hvor du kan starte med at spille på et casino uden traditionel registrering. Du identificerer dig blot via Trustly og MitID, og casinoet opretter automatisk en konto baseret på dine bankoplysninger. Denne funktion er især populær hos{" "}
            <Link to="/nye-casinoer" className="text-primary underline hover:text-primary/80">nye casinoer</Link>{" "}
            i Danmark og Norden.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly bruger bankens egne sikkerhedsstandarder som fundament. Alle transaktioner godkendes via MitID (i Danmark) eller BankID (i andre nordiske lande), hvilket giver stærk tofaktorgodkendelse. Trustly gemmer aldrig dine loginoplysninger til banken og opbevarer ingen følsomme data efter transaktionen er gennemført.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly er reguleret af det svenske Finansinspektionen og overholder hele PSD2-pakken med stærk kundegodkendelse (SCA). Virksomheden gennemgår regelmæssige sikkerhedsaudits og er PCI DSS-certificeret. Kundemidler holdes på separate klientkonti, der er beskyttet af den svenske indskydergaranti.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er Trustly et af de sikreste valg, da transaktionerne aldrig involverer tredjeparts lagring af følsomme data. Du bruger den samme MitID-login, som du bruger til netbank, Borger.dk og andre offentlige tjenester – en proces der allerede er velkendt og tillidsfuld for de fleste danskere.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling:</strong> Vælg Trustly i kassen, vælg din bank fra listen, log ind med MitID og godkend overførslen. Pengene lander på din spillekonto inden for sekunder – hurtigere end alle andre bankbaserede metoder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Vælg Trustly i udbetalingssektionen, angiv beløbet og godkend med MitID. Pengene sendes direkte til din bankkonto, ofte inden for minutter – men det kan tage op til 24 timer afhængigt af casinoet og din bank.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bonusfordel:</strong> Trustly-indbetalinger behandles som bankoverførsler og kvalificerer til alle typer bonusser, herunder{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link>.
          </p>
        </>
      }
      pros={[
        "Øjeblikkelige ind- og udbetalinger via open banking",
        "Ingen gebyrer fra Trustly",
        "Ingen separate konti eller e-wallets nødvendige",
        "Høj sikkerhed med MitID/BankID og PSD2-compliance",
        "Kvalificerer altid til velkomstbonusser",
        "Pay N Play mulighed hos udvalgte casinoer",
      ]}
      cons={[
        "Ikke alle casinoer tilbyder Trustly",
        "Kræver MitID og dansk bankkonto",
        "Kreditkort kan ikke bruges via Trustly",
        "Udbetalingstider varierer mellem casinoer",
      ]}
      minDeposit="Typisk 100 kr. som minimum. Visse casinoer kan have lavere eller højere grænser."
      bonusInfo="Trustly-indbetalinger kvalificerer næsten altid til velkomstbonusser, da det betragtes som en bankoverførsel. Ingen bonusbegrænsninger som ved visse e-wallets."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie. Spil altid på casinoer med dansk licens for at undgå skattemæssige komplikationer."
      faqs={[
        { question: "Hvordan fungerer Trustlys Pay N Play-teknologi på casinoer?", answer: "Pay N Play er Trustlys mest innovative funktion, der kombinerer registrering, indbetaling og identitetsverifikation i ét enkelt trin. I stedet for at oprette en traditionel casinokonto logger du ind via din netbank med MitID, og Trustly verificerer automatisk din identitet. Du kan begynde at spille øjeblikkeligt efter indbetalingen. Ved udbetaling returneres pengene direkte til din bankkonto – ofte inden for minutter. Denne teknologi eliminerer lange registreringsformularer og manuel dokumentverifikation, hvilket gør det til den hurtigste måde at komme i gang med at spille på et nyt casino." },
        { question: "Hvilke danske banker understøtter Trustly, og er der begrænsninger?", answer: "Trustly understøtter alle større danske banker, herunder Danske Bank, Nordea, Jyske Bank, Sydbank, Nykredit, Spar Nord og Arbejdernes Landsbank. Forbindelsen sker via bankens egen sikre netbank-infrastruktur med MitID-godkendelse. Der er ingen ekstra registrering nødvendig hos Trustly – du bruger blot dit eksisterende netbank-login. Bemærk, at enkelte mindre pengeinstitutter muligvis ikke er understøttet endnu. Trustly har ingen faste beløbsgrænser, men din banks daglige overførselsgrænse gælder stadig." },
        { question: "Hvor hurtigt behandler casinoer udbetalinger via Trustly sammenlignet med andre metoder?", answer: (
          <>Trustly er konsekvent den hurtigste udbetalingsmetode på danske casinoer. Mange casinoer behandler Trustly-udbetalinger inden for minutter, mens det kan tage op til 24 timer i perioder med høj belastning. Til sammenligning tager{" "}<Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>{" "}1–3 hverdage og{" "}<Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>{" "}2–5 hverdage. Pengene indsættes direkte på din bankkonto uden mellemled. Denne hastighed skyldes Trustlys direkte bankforbindelse, der omgår traditionelle betalingsnetværk og clearingprocesser.</>
        )},
        { question: "Er Trustly sikkert, og hvem regulerer tjenesten?", answer: "Trustly er en svensk fintech-virksomhed grundlagt i 2008, reguleret af den svenske Finansinspektion (Finansinspektionen) under EU's betalingstjenestedirektiv (PSD2). Trustly opbevarer aldrig dine bankoplysninger – al autentifikation sker direkte via din banks sikre netbanksystem med MitID. Tjenesten har aldrig haft et sikkerhedsbrud og behandler millioner af transaktioner årligt på tværs af Europa. Din bank garanterer alle transaktioner, hvilket giver et ekstra sikkerhedsnet." },
        { question: "Kvalificerer Trustly-indbetalinger til velkomstbonusser og free spins?", answer: (
          <>Ja, Trustly behandles som en direkte bankoverførsel, hvilket betyder, at du altid kvalificerer til{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}og{" "}<Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. I modsætning til e-wallets som{" "}<Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}og{" "}<Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>, der af og til udelukkes fra bonustilbud, er Trustly aldrig underlagt bonusbegrænsninger. Det gør Trustly til det optimale valg for førstegangsspillere, der vil maksimere deres bonusværdi.</>
        )},
        { question: "Hvad er forskellen mellem Trustly og Zimpler til casinobetaling?", answer: (
          <>Både Trustly og{" "}<Link to="/betalingsmetoder/zimpler" className="text-primary underline hover:text-primary/80">Zimpler</Link>{" "}bruger open banking-teknologi, men der er vigtige forskelle. Trustly er bredere understøttet på danske casinoer og tilbyder Pay N Play-funktionaliteten. Zimpler har en mere mobilfokuseret tilgang med en dedikeret app og tilbyder også fakturabetaling i visse lande. Begge er gebyrfrie og bruger MitID til godkendelse. Trustly har den hurtigste udbetalingsbehandling, mens Zimpler ofte er marginalt hurtigere ved indbetalinger. For danske spillere er Trustly generelt det sikreste valg grundet den bredere understøttelse.</>
        )},
      ]}
      currentPath="/betalingsmetoder/trustly"
    />
  );
};

export default TrustlyGuide;
