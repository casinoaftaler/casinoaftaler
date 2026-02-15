import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import zimplerHero from "@/assets/heroes/zimpler-hero.jpg";

const ZimplerGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Zimpler Casino – Komplet Guide til Zimpler på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om Zimpler på danske casinoer. Svensk fintech med open banking, MitID-sikkerhed, ingen gebyrer og øjeblikkelige konto-til-konto-overførsler."
      name="Zimpler"
      heroImage={zimplerHero}
      heroImageAlt="Zimpler betalingsmetode på danske casinoer"
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
        { question: "Hvad er forskellen mellem Zimpler og Trustly, og hvornår bør jeg vælge Zimpler?", answer: (
          <>Både Zimpler og{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}bruger open banking-teknologi med direkte bankforbindelse via MitID. Den primære forskel er, at Zimpler er mere mobilfokuseret med en dedikeret app, der giver komplet overblik over dine casinotransaktioner. Zimpler tilbyder også fakturabetaling i visse lande, hvilket Trustly ikke gør. Trustly er dog bredere understøttet på danske casinoer og har den unikke Pay N Play-funktionalitet. Vælg Zimpler, hvis du foretrækker en dedikeret app til transaktionsstyring; vælg Trustly, hvis bredest mulig casinounderstøttelse er vigtigst.</>
        )},
        { question: "Hvilke danske banker understøtter Zimpler, og kræves der registrering?", answer: "Zimpler understøtter alle større danske banker, herunder Danske Bank, Nordea, Jyske Bank, Sydbank og Nykredit. Forbindelsen sker via bankens sikre netbank-infrastruktur med MitID-godkendelse. Du behøver ikke oprette en separat Zimpler-konto for grundlæggende brug – du kan indbetale direkte via din bank. Ønsker du dog overblik over transaktionshistorik og ekstra funktioner, kan du oprette en gratis Zimpler-konto via deres app eller hjemmeside. Registreringen tager under 2 minutter og kræver kun e-mail og bankverifikation." },
        { question: "Hvor hurtigt behandler casinoer udbetalinger via Zimpler?", answer: (
          <>Zimpler-udbetalinger behandles typisk inden for 0–24 timer, afhængigt af casinoets interne behandlingstid. Pengene indsættes direkte på din bankkonto via Zimplers open banking-forbindelse. Det er hurtigere end traditionelle{" "}<Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>{" "}(2–5 dage) og{" "}<Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">kortbetalinger</Link>{" "}(1–3 dage), men marginalt langsommere end Trustly, der ofte behandler udbetalinger inden for minutter. Da Zimpler ikke involverer mellemled, modtager du det fulde beløb uden gebyrer.</>
        )},
        { question: "Kvalificerer Zimpler-indbetalinger til velkomstbonusser og free spins?", answer: (
          <>Ja, Zimpler behandles som en bankoverførsel af alle danske casinoer, hvilket betyder, at du altid kvalificerer til{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}og{" "}<Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. I modsætning til e-wallets som{" "}<Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}og{" "}<Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>, der af og til udelukkes fra bonustilbud, er Zimpler aldrig underlagt bonusbegrænsninger. Det gør Zimpler til et sikkert valg for førstegangsspillere, der ønsker at maksimere deres bonus ved første indbetaling.</>
        )},
        { question: "Er Zimpler sikkert, og hvem regulerer tjenesten?", answer: "Zimpler er en svensk fintech-virksomhed reguleret af den svenske Finansinspektion (Finansinspektionen) under EU's betalingstjenestedirektiv (PSD2). Tjenesten opbevarer aldrig dine bankoplysninger – al autentifikation sker direkte via din banks sikre netbanksystem med MitID. Zimpler bruger bankgrads kryptering og har aldrig oplevet et sikkerhedsbrud. Virksomheden blev grundlagt i 2012 og har vokset til at blive en af Nordens førende betalingsløsninger for online gambling, med tilladelser i flere europæiske jurisdiktioner." },
        { question: "Hvad koster det at bruge Zimpler på danske casinoer?", answer: "Zimpler opkræver ingen gebyrer fra spilleren for hverken ind- eller udbetalinger på danske licenserede casinoer. Der er ingen månedlige abonnementsgebyrer eller kontovedligeholdelsesomkostninger. De eneste potentielle omkostninger er, hvis dit casino opererer i en anden valuta end DKK, hvor din bank muligvis opkræver valutaomregningsgebyr. For danske casinoer med dansk licens er det dog aldrig tilfældet, da alle transaktioner foregår i danske kroner. Zimpler er dermed en af de mest gebyrfrie betalingsløsninger på markedet." },
      ]}
      currentPath="/betalingsmetoder/zimpler"
    />
  );
};

export default ZimplerGuide;
