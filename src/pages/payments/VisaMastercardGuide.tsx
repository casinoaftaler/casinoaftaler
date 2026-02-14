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
      introTitle="Visa og Mastercard på Danske Casinoer – Den Klassiske Kortbetaling"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Visa og Mastercard er de mest anvendte betalingsmetoder på online casinoer i Danmark og resten af verden. Næsten alle danske casinospillere har mindst ét af disse kort, og de er bredt accepteret hos alle licenserede casinoer under Spillemyndigheden. Med 3D Secure-teknologi (Verified by Visa og Mastercard SecureCode) er kortbetalinger blandt de sikreste metoder til online transaktioner.
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
      whatIsTitle="Visa vs. Mastercard – Hvad er Forskellen?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Visa Inc. blev grundlagt i 1958 og er verdens største betalingsnetværk med over 4 milliarder kort i omløb. Mastercard blev grundlagt i 1966 og er det næststørste med over 2,8 milliarder kort. Begge fungerer som betalingsnetværk – de udsteder ikke selv kortene, men faciliterer transaktionerne mellem din bank (udstederen) og casinoets bank (indløseren).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere er der ingen praktisk forskel mellem Visa og Mastercard. Begge tilbyder øjeblikkelige indbetalinger, 3D Secure-sikkerhed og bred accept. Den eneste forskel kan opstå ved udbetalinger: Ikke alle casinoer understøtter udbetalinger til Mastercard, mens Visa typisk er fuldt understøttet i begge retninger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Debetkort (Visa Debit og Mastercard Debit) trækker direkte fra din bankkonto, mens kreditkort lader dig spille med lånte penge. Fra et{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-perspektiv anbefales det altid at bruge debetkort, så du kun spiller for penge du allerede har.
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
      pros={[
        "Bredt accepteret hos alle danske casinoer",
        "Øjeblikkelige indbetalinger med 3D Secure",
        "Kvalificerer altid til alle bonustyper",
        "Velkendt og tillidsfuld betalingsmetode",
        "Både kredit- og debetkort understøttes",
      ]}
      cons={[
        "Udbetalinger kan tage 1-3 hverdage",
        "Kortoplysninger deles direkte med casinoet",
        "Ikke alle casinoer understøtter Mastercard-udbetalinger",
        "Mulige gebyrer ved visse casinoer",
      ]}
      minDeposit="Typisk 50-100 kr. som minimum. Maksimumsgrænsen varierer fra 10.000 til 50.000 kr. pr. transaktion."
      bonusInfo="Visa og Mastercard kvalificerer altid til alle bonustyper – velkomstbonusser, indskudsbonusser og free spins."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie uanset betalingsmetode."
      faqs={[
        { question: "Er det sikkert at bruge Visa/Mastercard?", answer: "Ja, med 3D Secure og SSL-kryptering er kortbetalinger meget sikre. For ekstra sikkerhed kan du bruge Apple Pay." },
        { question: "Hvad er forskellen på Visa og Mastercard?", answer: "Ingen praktisk forskel for casinospillere. Begge tilbyder samme funktionalitet og sikkerhed." },
        { question: "Kvalificerer kortbetalinger til bonus?", answer: (
          <>Ja, altid.{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">Velkomstbonusser</Link>{" "}er altid tilgængelige med kort.</>
        )},
        { question: "Hvor hurtigt er udbetalinger med kort?", answer: "Typisk 1-3 hverdage for Visa. Mastercard-udbetalinger er ikke altid tilgængelige." },
        { question: "Bør jeg bruge debit- eller kreditkort?", answer: "Debetkort anbefales for ansvarligt spil, da du kun spiller for penge du allerede har." },
      ]}
      currentPath="/betalingsmetoder/visa-mastercard"
    />
  );
};

export default VisaMastercardGuide;
