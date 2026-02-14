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
      introTitle="Bankoverførsler på Danske Casinoer – Klassisk og Pålidelig"
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
            <strong>Indbetaling:</strong> Log ind i din netbank, opret en ny overførsel med casinoets bankoplysninger og dit spillernummer som reference. Betalingen behandles inden for 1-3 hverdage.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Anmod om udbetaling hos casinoet med din bankkonto som modtager. Behandlingstiden er 2-5 hverdage inkl. casinoets interne behandling.
          </p>
        </>
      }
      pros={[
        "Ekstrem høj sikkerhed med bankens egne systemer",
        "Fuld sporbarhed og bankgaranti",
        "Ingen tredjepartsleverandører involveret",
        "Kvalificerer altid til alle bonustyper",
        "Sjældent gebyrer fra danske banker",
      ]}
      cons={[
        "Langsom – 1-3 dage for indbetaling, 2-5 dage for udbetaling",
        "Kræver manuelt input af casinoets bankoplysninger",
        "Spillernummer skal inkluderes for korrekt identifikation",
        "Ingen øjeblikkelig spilstart som ved digitale alternativer",
      ]}
      minDeposit="Typisk 100 kr. minimum. Ingen øvre grænse fra bankens side, men casinoer kan have maksimumsgrænser."
      bonusInfo="Bankoverførsler kvalificerer altid til alle bonustyper. De er den sikreste vej til bonusaktivering."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie. Alle transaktioner spores af banken for compliance."
      faqs={[
        { question: "Hvor lang tid tager en bankoverførsel?", answer: "Indbetalinger: 1-3 hverdage. Udbetalinger: 2-5 hverdage inkl. casinoets behandlingstid." },
        { question: "Er bankoverførsler sikre?", answer: "Ja, de er en af de mest sikre betalingsmetoder med MitID-godkendelse og fuld bankgaranti." },
        { question: "Er der gebyrer?", answer: "Danske banker opkræver sjældent gebyrer for indenlandske overførsler. Internationale overførsler kan have gebyrer." },
        { question: "Kvalificerer bankoverførsler til bonus?", answer: (
          <>Ja, altid. Bankoverførsler er aldrig udelukket fra{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">bonustilbud</Link>.</>
        )},
      ]}
      currentPath="/betalingsmetoder/bankoverforsler"
    />
  );
};

export default BankTransferGuide;
