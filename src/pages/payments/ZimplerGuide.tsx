import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";

const ZimplerGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Zimpler Casino – Komplet Guide til Zimpler på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om Zimpler på danske casinoer. Svensk fintech med open banking, MitID-sikkerhed, ingen gebyrer og øjeblikkelige konto-til-konto-overførsler."
      name="Zimpler"
      heroSubtitle="Svensk fintech-løsning der overfører penge direkte mellem din bank og casinoet på få sekunder via open banking og MitID. Ingen kortnumre, ingen ekstra konti."
      introTitle="Zimpler på Danske Casinoer – Moderne Open Banking-Betaling"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Zimpler er en svensk fintech-virksomhed, der har specialiseret sig i hurtige og sikre konto-til-konto-betalinger via open banking. Grundlagt i 2012 i Göteborg under navnet PugglePay, har Zimpler udviklet sig til en af de mest populære betalingsmetoder i den nordiske casinobranche. Med Zimpler behøver du hverken kortnumre, e-wallet-konti eller komplicerede bankoverførsler – bare en hurtig MitID-godkendelse, og pengene er overført.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Zimpler fungerer meget lig{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            – begge bruger open banking til direkte bankoverførsler. Forskellen ligger i Zimplers fokus på mobiloptimering og brugeroplevelse: Appen er designet til at gøre hele processen så gnidningsfri som muligt, med minimale trin fra valg af betalingsmetode til godkendelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Da Zimpler-indbetalinger betragtes som bankoverførsler, kvalificerer de næsten altid til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og andre kampagner – en klar fordel sammenlignet med e-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>, der ofte er udelukket fra bonustilbud.
          </p>
        </>
      }
      whatIsTitle="Hvad er Zimpler – og Hvordan Adskiller det sig?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Zimpler blev grundlagt i 2012 af Johan Friis og Kristofer Edlund under navnet PugglePay. Virksomheden skiftede navn og fokuserede på direkte konto-til-konto-transaktioner via open banking under PSD2-reguleringen. I dag ejes Zimpler af moderselskabet Zimpler AB med kontorer i Stockholm, Málaga og São Paulo, og virksomheden ekspanderer mod Danmark, Tyskland og Latinamerika.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Zimplers tekniske infrastruktur bygger på direkte API-integrationer med bankerne. Når du vælger Zimpler i casinoets kasse, forbindes du til din bank via MitID. Du ser dine tilknyttede konti, vælger den ønskede, bekræfter beløbet i bankappen – og transaktionen er gennemført inden for sekunder. Ingen mellemled, ingen forsinkelser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Zimpler adskiller sig fra{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            primært ved sin mobilfokuserede tilgang og sin ekspansion mod nye markeder. Funktionaliteten er sammenlignelig, men Zimpler tilbyder en mere strømlinet mobiloplevelse, der appellerer til yngre spillere.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Zimpler opererer under svensk finanstilsyn (Finansinspektionen) og overholder hele PSD2-pakken med stærk kundegodkendelse (SCA). Alle betalinger godkendes via MitID eller BankID, og kundemidler holdes på separate klientkonti.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ingen kortdata eller følsomme bankoplysninger lagres hos Zimpler eller tredjepart. Transaktioner krypteres med avanceret SSL-teknologi, og virksomheden gennemgår regelmæssige IT- og compliance-audits for at sikre den højeste sikkerhedsstandard.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling:</strong> Vælg Zimpler i kassen, indtast beløbet og log ind med MitID. Vælg din bankkonto, bekræft i bankappen, og saldoen opdateres inden for sekunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Følg samme proces i omvendt rækkefølge. Pengene sendes direkte til din bankkonto – typisk inden for få minutter til et par timer.
          </p>
        </>
      }
      pros={[
        "Øjeblikkelig konto-til-konto-overførsel via open banking",
        "MitID-login giver stærk tofaktorsikkerhed",
        "Ingen gebyrer fra Zimpler på danske casinoer",
        "Kvalificerer til alle bonustyper som bankoverførsel",
        "Mobiloptimeret brugeroplevelse",
      ]}
      cons={[
        "Endnu ikke tilgængeligt på alle danske casinoer",
        "Daglige bankgrænser kan begrænse større beløb",
        "Ingen kreditmulighed som ved traditionelle kort",
        "Mindre udbredt end Trustly i Danmark",
      ]}
      minDeposit="Typisk 100 kr. som minimum. Maks. indbetaling kan være op til 110.000 kr."
      bonusInfo="Zimpler-indbetalinger giver adgang til alle velkomstbonusser, da det betragtes som bankoverførsel. Ingen bonusbegrænsninger."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie. På udenlandske sider skal gevinster indberettes."
      faqs={[
        { question: "Hvad er forskellen på Zimpler og Trustly?", answer: "Begge bruger open banking, men Zimpler har en mere mobilfokuseret tilgang. Funktionaliteten er sammenlignelig." },
        { question: "Er Zimpler sikkert?", answer: "Ja, Zimpler er reguleret af svenske Finansinspektionen og bruger MitID/BankID til godkendelse." },
        { question: "Kvalificerer Zimpler til velkomstbonus?", answer: (
          <>Ja, Zimpler behandles som bankoverførsel og kvalificerer til alle{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">bonusser</Link>.</>
        )},
        { question: "Er der gebyrer?", answer: "Nej, Zimpler opkræver ingen gebyrer på danske licenserede casinoer." },
      ]}
      currentPath="/betalingsmetoder/zimpler"
    />
  );
};

export default ZimplerGuide;
