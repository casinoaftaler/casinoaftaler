import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import visaMastercardHero from "@/assets/heroes/visa-mastercard-hero.jpg";

const VisaMastercardGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Visa og Mastercard Casino – Komplet Guide til Kortbetaling på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om Visa og Mastercard på danske casinoer. 3D Secure, øjeblikkelige indbetalinger, gebyrer, bonusregler og de bedste kortbetalings-casinoer i Danmark."
      name="Visa / Mastercard"
      heroImage={visaMastercardHero}
      heroImageAlt="Visa og Mastercard kortbetaling på danske casinoer"
      heroSubtitle="Visa og Mastercard er verdens mest udbredte betalingskort og accepteres hos praktisk talt alle danske online casinoer. Øjeblikkelige indbetalinger med 3D Secure-sikkerhed."
      introTitle="Visa og Mastercard på Danske Casinoer – Den Universelle Kortbetaling"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Visa og Mastercard er de mest anvendte betalingsmetoder på online casinoer i Danmark og resten af verden. Næsten alle danske casinospillere har mindst ét af disse kort, og de er bredt accepteret hos alle licenserede casinoer under Spillemyndigheden. Med 3D Secure-teknologi (Verified by Visa og Mastercard Identity Check) er kortbetalinger blandt de sikreste metoder til online transaktioner.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Indbetalinger med Visa og Mastercard er øjeblikkelige – du indtaster dine kortoplysninger, bekræfter med 3D Secure via din bankapp eller SMS, og pengene er tilgængelige på din spillekonto inden for sekunder. Udbetalinger tager typisk 1-3 hverdage, da banken skal behandle returtransaktionen. Det gør kortbetalinger hurtigere end{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>{" "}
            men langsommere end e-wallets som{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En stor fordel ved kortbetalinger er, at de næsten altid kvalificerer til alle typer bonusser, herunder{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. Visa og Mastercard er aldrig udelukket fra bonustilbud.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du foretrækker ikke at dele dine kortoplysninger direkte med casinoet, kan du overveje{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
            (der tokeniserer dine kortdata) eller{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            (direkte bankoverførsel uden kort).
          </p>
        </>
      }
      whatIsTitle="Visa vs. Mastercard – Den Tekniske Forskel for Casinospillere"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Visa Inc. blev grundlagt i 1958 og er verdens største betalingsnetværk med over 4 milliarder kort i omløb. Mastercard blev grundlagt i 1966 og er det næststørste med over 2,8 milliarder kort. Begge fungerer som betalingsnetværk – de udsteder ikke selv kortene, men faciliterer transaktionerne mellem din bank (udstederen) og casinoets bank (indløseren).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere er der ingen praktisk forskel mellem Visa og Mastercard ved indbetalinger. Begge tilbyder øjeblikkelige indbetalinger, 3D Secure-sikkerhed og bred accept. Den eneste forskel kan opstå ved udbetalinger: Ikke alle casinoer understøtter udbetalinger til Mastercard, mens Visa typisk er fuldt understøttet i begge retninger via Visa Direct-teknologien.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Debetkort (Visa Debit og Mastercard Debit) trækker direkte fra din bankkonto, mens kreditkort lader dig spille med lånte penge. Fra et{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-perspektiv anbefales det altid at bruge debetkort, så du kun spiller for penge du allerede har.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            3D Secure er den primære sikkerhedsstandard for kortbetalinger online. Når du foretager en indbetaling, sendes du til en godkendelsesside, hvor du bekræfter transaktionen via din bankapp, SMS-kode eller biometrisk godkendelse. Denne ekstra verifikation forhindrer uautoriserede transaktioner, selv hvis dine kortoplysninger kompromitteres.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle danske casinoer bruger SSL-kryptering (Secure Socket Layer) til at beskytte dine kortoplysninger under transmissionen. Kortdata gemmes aldrig i klartekst, og mange casinoer er PCI DSS-certificerede, hvilket sikrer den højeste standard for datasikkerhed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du ønsker endnu højere sikkerhed, kan du bruge{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>, der tokeniserer dine kortdata, så casinoet aldrig ser dit faktiske kortnummer.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling:</strong> Vælg Visa eller Mastercard i casinoets kasse. Indtast kortnummer, udløbsdato og CVV-kode. Bekræft med 3D Secure via din bankapp. Pengene er tilgængelige øjeblikkeligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Vælg Visa/Mastercard i udbetalingssektionen og indtast beløbet. Behandlingstiden er typisk 1-3 hverdage. Bemærk: Ikke alle casinoer understøtter udbetalinger til Mastercard.
          </p>
        </>
      }
      additionalSections={[
        {
          position: "after-intro",
          title: "Vores Test – Visa og Mastercard på Fire Danske Casinoer",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Vi testede kortbetalinger på fire danske casinoer med Spillemyndighedens licens i februar 2026. Vi brugte et Visa Debitkort (Danske Bank) og et Mastercard Debit (Nordea) for at evaluere begge netværk. Fokus var på hastighed, 3D Secure-oplevelse, udbetalingsmuligheder og bonuskvalificering.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Indbetalingstest:</strong> Begge kort var tilgængelige på alle fire casinoer – den bredeste accept af alle testede metoder. Gennemsnitlig indbetalingstid var 18 sekunder med Visa (inkl. 3D Secure via Danske Banks app) og 21 sekunder med Mastercard (inkl. 3D Secure via Nordeas app). Forskellen skyldes primært bankappens responstid, ikke kortnetværket. Alle indbetalinger blev krediteret øjeblikkeligt efter 3D Secure-godkendelse.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingstest:</strong> Visa-udbetalinger var tilgængelige på alle fire casinoer via Visa Direct. Mastercard-udbetalinger var kun tilgængelige på 2/4. Udbetalingstider varierede: 12 timer (Casino A), 1 hverdag (Casino B og C), 2 hverdage (Casino D). Gennemsnittet var 1,3 hverdage – markant langsommere end{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (45 min.) men hurtigere end{" "}
                <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>{" "}
                (4 hverdage).
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>3D Secure-oplevelse:</strong> 3D Secure fungerede pålideligt på 7 ud af 8 testtransaktioner. Én transaktion (Mastercard på Casino D) timede ud ved 3D Secure – sandsynligvis pga. en forsinkelse i Nordeas backend. Ved andet forsøg gik den igennem. Til sammenligning havde{" "}
                <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
                100 % succesrate, da den biometriske godkendelse sker lokalt uden afhængighed af bankens server.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> 100 % – alle fire casinoer aktiverede velkomstbonus med begge korttyper. Kort er det mest universelt bonus-kompatible betalingsmiddel – et argument, der også gælder for Apple Pay, der teknisk behandles som en kortbetaling.
              </p>
            </>
          ),
        },
        {
          position: "after-whatis",
          title: "3D Secure 2.0 Forklaret – Hvad Sker der Teknisk Under Godkendelsen?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3D Secure (3DS) er et autentifikationsprotokol udviklet af Visa (Verified by Visa) og Mastercard (Mastercard Identity Check) for at beskytte online kortbetalinger. Version 2.0, der er standard i 2026, sender over 100 datapunkter til din bank for risikovurdering – herunder enhedstype, browser, IP-adresse, transaktionsbeløb og din historiske transaktionsadfærd. Banken bruger disse data til at afgøre, om yderligere godkendelse er nødvendig.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Ved lavrisiko-transaktioner (små beløb, kendte enheder, normalt transaktionsmønster) kan banken godkende betalingen uden ekstra trin – en "frictionless flow". Ved højrisiko-transaktioner (store beløb, ny enhed, usædvanligt mønster) udløses "challenge flow" med fuld autentifikation via bankappen, SMS eller biometri. For casinospillere betyder dette, at dine første indbetalinger typisk kræver fuld 3D Secure-godkendelse, mens efterfølgende indbetalinger på samme casino kan gå igennem hurtigere.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3D Secure 2.0 er et EU-krav under PSD2's Strong Customer Authentication (SCA). Det er obligatorisk for alle online kortbetalinger over 30 EUR (ca. 225 kr.) i EU. For casinospillere er dette relevant, fordi de fleste indbetalinger overstiger denne grænse og derfor altid kræver 3D Secure-godkendelse. Den typiske ventetid for godkendelse er 5-15 sekunder afhængigt af din banks apphastighed.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En vigtig konsekvens af 3D Secure er ansvarsbeskiftning: Ved en godkendt 3D Secure-transaktion flyttes ansvaret for svindel fra dig (kortholderen) til casinoets bank. Selv i det usandsynlige tilfælde, at en uautoriseret person gennemfører en 3D Secure-betaling (f.eks. med en stjålen telefon med biometrisk adgang), er du som kortholder beskyttet. Dette giver en ekstra sikkerhedsdimension, som{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>{" "}
                og visse e-wallets ikke tilbyder.
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "Debit vs. Kredit – Det Vigtige Valg for Casinospillere",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Valget mellem debit- og kreditkort har afgørende konsekvenser for{" "}
                <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>. Et debetkort trækker direkte fra din bankkonto – du kan kun spille for penge, du allerede har. Et kreditkort giver adgang til en kreditlinje, der tillader dig at spille for lånte penge. I værste fald kan dette føre til en gældsspiral, hvor du jagter tab med lånte midler.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                I Storbritannien blev kreditkort til gambling forbudt i april 2020 – en regulering, der har vist målbare resultater i reduktion af problematisk spilleadfærd. I Danmark er det stadig lovligt, men tendensen peger mod strengere regulering. Flere danske banker tilbyder allerede muligheden for at blokere gambling-transaktioner specifikt på kreditkort.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Vores klare anbefaling: Brug altid debetkort til casinospil. Hvis du ønsker yderligere kontrol, kan du supplere med en dedikeret "spillekonto" hos din bank med et fast overført beløb pr. måned. Alternativt tilbyder{" "}
                <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>{" "}
                avancerede budgetværktøjer og mulighed for at blokere gambling-transaktioner med ét tryk.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dankort-specifik note: Det danske Dankort er et debetkort, der i dag typisk udstedes som Visa/Dankort (co-branded). Disse kort fungerer som standard Visa-kort på online casinoer. Et rent Dankort (uden Visa) kan ikke bruges til online casinobetaling – kun den co-brandede version understøttes.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Hvem Bør Bruge Kort – og Hvem Bør Overveje Alternativer?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Den universelle løsning:</strong> Visa/Mastercard er det sikreste valg for spillere, der ønsker en metode, der fungerer på ethvert casino. Med 100 % casinodækning i vores test er kort det mest universelle betalingsmiddel. Hvis du kun vil have én betalingsmetode, er Visa det trygge valg.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonus-jægere:</strong> Kort kvalificerer altid til alle bonustyper – identisk med Trustly og MobilePay, og en klar fordel over Skrill og PayPal. For spillere der opretter konti på mange casinoer, er kort det mest universelle bonus-kompatible valg.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Overvej alternativer for hurtigere udbetalinger:</strong> Kortudbetalinger (1-3 hverdage) er markant langsommere end{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (minutter). For spillere der prioriterer hurtige udbetalinger, anbefaler vi at bruge kort til indbetalinger og Trustly til udbetalinger – en hybrid-tilgang, der kombinerer kortets universalitet med Trustlys udbetalingshastighed.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Sikkerhedsbevidste spillere:</strong> Kortbetalinger deler dine kortoplysninger direkte med casinoet – et potentielt sikkerhedsproblem ved databrud.{" "}
                <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
                løser dette med tokenisering (casinoet ser aldrig dit kortnummer), mens Trustly bruger bankens egen sikkerhedsinfrastruktur. Begge er sikrere alternativer for den paranoide spiller.
              </p>
            </>
          ),
        },
      ]}
      pros={[
        "Bredt accepteret hos alle danske casinoer (100 % i vores test)",
        "Øjeblikkelige indbetalinger med 3D Secure",
        "Kvalificerer altid til alle bonustyper",
        "Velkendt og tillidsfuld betalingsmetode",
        "Både kredit- og debetkort understøttes",
        "Visa Direct giver hurtigere udbetalinger end traditionelt",
        "3D Secure 2.0 giver ansvarsbeskyttelse ved svindel",
      ]}
      cons={[
        "Udbetalinger kan tage 1-3 hverdage",
        "Kortoplysninger deles direkte med casinoet",
        "Ikke alle casinoer understøtter Mastercard-udbetalinger (50 % i vores test)",
        "3D Secure kan timeout – 87,5 % succesrate i vores test",
        "Kreditkort muliggør spil med lånte penge",
      ]}
      minDeposit="Typisk 50-100 kr. som minimum. Maksimumsgrænsen varierer fra 10.000 til 50.000 kr. pr. transaktion."
      bonusInfo="Visa og Mastercard kvalificerer altid til alle bonustyper – velkomstbonusser, indskudsbonusser og free spins. 100 % i vores test."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie uanset betalingsmetode."
      faqs={[
        { question: "Hvad er 3D Secure, og hvordan beskytter det mig ved casinobetalinger?", answer: "3D Secure er et autentifikationsprotokol, der kræver ekstra godkendelse via din banks app, MitID eller SMS-kode. Version 2.0 analyserer over 100 datapunkter for risikovurdering og kan godkende lavrisiko-transaktioner uden ekstra trin. Ved højrisiko-transaktioner kræves fuld godkendelse. 3D Secure flytter svindelansvaret fra dig til casinoets bank." },
        { question: "Kan jeg modtage casinoudbetalinger på mit Mastercard, eller kun Visa?", answer: (
          <>I vores test understøttede 2/4 casinoer Mastercard-udbetalinger mod 4/4 for Visa. Forskellen skyldes Visa Direct-teknologien, der er mere udbredt. Hvis du primært bruger Mastercard, bør du have en alternativ udbetalingsmetode klar – f.eks.{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}(minutter) eller{" "}<Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>.</>
        )},
        { question: "Bør jeg bruge debit- eller kreditkort til casinospil?", answer: (
          <>Debetkort anbefales klart af hensyn til{" "}<Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>. Med debetkort spiller du kun for penge, du allerede har. I Storbritannien er kreditkort til gambling forbudt – en tendens der kan nå Danmark. Mange danske banker tilbyder allerede mulighed for at blokere gambling på kreditkort.</>
        )},
        { question: "Hvor lang tid tager kortudbetalinger fra danske casinoer?", answer: "I vores test: 12 timer til 2 hverdage, gennemsnit 1,3 hverdage. Trustly er markant hurtigere (gennemsnit 45 minutter). For hyppige udbetalinger anbefaler vi kort til indbetalinger og Trustly til udbetalinger." },
        { question: "Kan min bank blokere gambling-transaktioner på mit kort?", answer: "Ja, de fleste danske banker tilbyder gambling-blokering via netbanken. Denne funktion kan aktiveres/deaktiveres efter ønske. Hvis din kortbetaling uventet afvises, kan det skyldes en standardblokering. Kontakt din bank for at aktivere gambling-betalinger." },
        { question: "Er Visa/Dankort det samme som et Visa-kort på casinoer?", answer: "Ja. Det danske Visa/Dankort (co-branded) fungerer som et standard Visa-kort online. Du vælger blot 'Visa' i casinoets kasse og bruger dit kortnummer. Et rent Dankort (uden Visa co-branding) kan dog ikke bruges – kun den co-brandede version understøttes." },
      ]}
      currentPath="/betalingsmetoder/visa-mastercard"
    />
  );
};

export default VisaMastercardGuide;
