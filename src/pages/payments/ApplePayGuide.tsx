import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";

const ApplePayGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Apple Pay Casino – Komplet Guide til Apple Pay på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om Apple Pay på danske casinoer. Lær hvordan du indbetaler med Face ID, sikkerhed via tokenisering, bonusregler, gebyrer og de bedste Apple Pay casinoer i Danmark."
      name="Apple Pay"
      heroSubtitle="Indbetal på casinoer med Face ID eller Touch ID – hurtigt, sikkert og uden at dele dine kortoplysninger. Apple Pay er en af de mest moderne betalingsløsninger på danske online casinoer."
      introTitle="Apple Pay på Danske Casinoer – Hurtig og Sikker Betaling"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Apple Pay har i løbet af få år etableret sig som en af de mest populære mobile betalingsløsninger i verden – og det gælder også hos danske online casinoer. Med Apple Pay kan du indbetale penge på din spillekonto med et enkelt tryk og biometrisk godkendelse via Face ID eller Touch ID. Det betyder, at du aldrig behøver at indtaste kortnumre, udløbsdatoer eller sikkerhedskoder manuelt, når du spiller online.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de største fordele ved Apple Pay er den avancerede sikkerhedsteknologi. Når du tilføjer et betalingskort til Apple Wallet, oprettes en unik enhedskonto-nummer (Device Account Number), der fungerer som en token i stedet for dit rigtige kortnummer. Casinoet modtager altså aldrig dine faktiske kortoplysninger – hvilket reducerer risikoen for svindel markant. Kombineret med{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            gør dette Apple Pay til en attraktiv mulighed for danske casinospillere, der prioriterer både hastighed og datasikkerhed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Apple Pay fungerer på iPhones, iPads, Apple Watch og Macs med Touch ID eller Touch Bar. I Danmark understøttes tjenesten af alle større banker, herunder Danske Bank, Nordea, Jyske Bank og Nykredit. Det gør det nemt at komme i gang, da de fleste danske spillere allerede har Apple Pay konfigureret på deres enheder. Indbetalinger med Apple Pay behandles som standard kortbetalinger, hvilket betyder, at du næsten altid kvalificerer dig til{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og andre kampagner.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide gennemgår vi alt, hvad du skal vide om Apple Pay på danske casinoer – fra sikkerhed og hastighed til bonusregler, minimumsindskud og sammenligning med andre betalingsmetoder som{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>,{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>.
          </p>
        </>
      }
      whatIsTitle="Hvad er Apple Pay – og Hvordan Fungerer det?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Apple Pay blev lanceret af Apple Inc. i oktober 2014 i USA og blev hurtigt udbredt til over 70 lande, herunder Danmark. Tjenesten fungerer via Apples digitale tegnebog, Wallet, og understøtter betalinger i fysiske butikker (via NFC), i apps og på nettet. I 2026 har Apple Pay over 500 millioner brugere på verdensplan og håndterer milliarder af transaktioner årligt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den tekniske baggrund er elegant: Når du tilføjer et Visa- eller Mastercard til Wallet, genererer Apple en unik Device Account Number, som gemmes i en sikker chip (Secure Element) på din enhed. Denne token bruges i stedet for dit rigtige kortnummer ved hver transaktion. Apple opbevarer hverken kortnumre på servere eller deler dem med forhandlere – en tilgang der placerer Apple Pay blandt de sikreste betalingsmetoder i branchen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere fungerer Apple Pay som et mellemled mellem dit betalingskort og casinoet. Du vælger Apple Pay i kassesektionen, godkender betalingen med Face ID, Touch ID eller din Apple Watch, og beløbet trækkes fra det tilknyttede kort. Processen tager typisk under 10 sekunder fra start til slut – markant hurtigere end at indtaste kortoplysninger manuelt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Apple tager en lille procentdel fra kortudstederen (banken) for hver transaktion – ikke fra dig som forbruger. Det betyder, at Apple Pay-betalinger på casinoer typisk er helt gebyrfrie for spilleren. Dog kan visse casinoer have deres egne gebyrer, så det er altid en god idé at tjekke betingelserne, før du indbetaler. Mange af de{" "}
            <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">bedste danske casinoer</Link>{" "}
            tilbyder allerede Apple Pay som en af deres primære indbetalingsmetoder.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sikkerheden ved Apple Pay er i en klasse for sig. Tjenesten benytter en flerlagssikkerhedsmodel, der kombinerer hardware-baseret kryptering med biometrisk godkendelse. Når du gennemfører en transaktion, sender din enhed en dynamisk sikkerhedskode sammen med din Device Account Number – aldrig dit rigtige kortnummer. Denne kombination gør det praktisk talt umuligt for hackere at opsnappe og misbruge dine betalingsoplysninger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Face ID og Touch ID sikrer, at kun du kan godkende betalinger. Selv hvis din enhed bliver stjålet, kan ingen gennemføre transaktioner uden din biometriske godkendelse. Desuden kan du via Find My iPhone fjernslette alle kort fra din Wallet, hvilket giver et ekstra sikkerhedsnet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Apple overholder PCI DSS-standarderne (Payment Card Industry Data Security Standard) og har næsten 100 % oppetid på sin betalingsinfrastruktur. For danske spillere, der værdsætter{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>, giver Apple Pay også bedre udgiftskontrol, da alle transaktioner logges i Wallet med dato, beløb og modtager.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling med Apple Pay:</strong> Log ind på dit casino, gå til kassesektionen og vælg Apple Pay som betalingsmetode. Indtast det ønskede beløb, og du bliver bedt om at bekræfte med Face ID eller Touch ID. Beløbet overføres øjeblikkeligt til din spillekonto, og du kan begynde at spille med det samme. Hele processen tager typisk under 15 sekunder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling med Apple Pay:</strong> Ikke alle casinoer understøtter udbetalinger via Apple Pay, men hos dem der gør, fungerer processen omvendt. Du vælger Apple Pay i udbetalingssektionen, indtaster beløbet og godkender med biometrisk verifikation. Pengene returneres typisk til det kort, du indbetalte med, inden for 1–24 timer afhængigt af casinoet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtigt at vide:</strong> Apple Pay-indbetalinger registreres som kortbetalinger, hvilket betyder, at de næsten altid kvalificerer til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-tilbud. Modsat visse e-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>, som nogle casinoer udelukker fra bonusaktivering.
          </p>
        </>
      }
      pros={[
        "Øjeblikkelig indbetaling med Face ID eller Touch ID",
        "Kortoplysninger deles aldrig med casinoet via tokenisering",
        "Høj sikkerhed med hardware-kryptering og biometrisk verifikation",
        "Ingen gebyrer for spilleren ved de fleste casinoer",
        "Kvalificerer næsten altid til velkomstbonusser og free spins",
        "Understøttet af alle større danske banker",
      ]}
      cons={[
        "Kræver en Apple-enhed (iPhone, iPad, Mac eller Apple Watch)",
        "Ikke tilgængeligt på alle danske casinoer endnu",
        "Udbetalinger via Apple Pay er begrænsede hos mange udbydere",
        "Android-brugere kan ikke benytte Apple Pay",
      ]}
      minDeposit="Minimumsindskud varierer typisk fra 45 kr. til 100 kr. afhængigt af det enkelte casino. Maksimumgrænsen er ofte 25.000–50.000 kr. pr. transaktion."
      bonusInfo="Apple Pay-indbetalinger behandles som kortbetalinger, så du kvalificerer dig næsten altid til velkomstbonusser, indskudsbonusser og free spins. Bonussen frigives typisk øjeblikkeligt efter indbetaling."
      taxInfo="Gevinster fra casinoer med dansk licens udstedt af Spillemyndigheden er 100% skattefrie. Casinoet betaler allerede statsafgift, så dine præmier tilhører dig."
      comparison={[
        { method: "Apple Pay", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Begrænset" },
        { method: "MobilePay", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Varierer" },
        { method: "Trustly", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Ja" },
        { method: "Visa/Mastercard", speed: "Øjeblikkelig", fees: "Mulige", withdrawalSupport: "1-3 dage" },
        { method: "PayPal", speed: "Øjeblikkelig", fees: "Mulige", withdrawalSupport: "0-24 timer" },
      ]}
      faqs={[
        {
          question: "Kan jeg bruge Apple Pay på alle danske casinoer?",
          answer: "Nej, ikke alle danske casinoer understøtter Apple Pay endnu, men antallet vokser støt. Tjek altid casinoets betalingsmuligheder, før du opretter en konto.",
        },
        {
          question: "Er Apple Pay sikkert til casinobetaling?",
          answer: "Ja, Apple Pay er en af de sikreste betalingsmetoder. Dine kortoplysninger deles aldrig med casinoet, og hver transaktion kræver biometrisk godkendelse via Face ID eller Touch ID.",
        },
        {
          question: "Kan jeg få velkomstbonus med Apple Pay?",
          answer: (
            <>
              Ja, Apple Pay-indbetalinger behandles som kortbetalinger og kvalificerer næsten altid til{" "}
              <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
              og{" "}
              <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>.
            </>
          ),
        },
        {
          question: "Er der gebyrer ved Apple Pay på casinoer?",
          answer: "Apple opkræver ikke gebyrer fra forbrugeren. Enkelte casinoer kan dog have egne gebyrer, så tjek altid vilkårene.",
        },
        {
          question: "Kan jeg hæve gevinster med Apple Pay?",
          answer: "Nogle casinoer understøtter udbetalinger via Apple Pay, men det er ikke universelt. Pengene returneres typisk til det kort, du indbetalte med.",
        },
        {
          question: "Skal jeg betale skat af gevinster med Apple Pay?",
          answer: (
            <>
              Nej, gevinster fra casinoer med dansk licens er skattefrie. Læs mere om{" "}
              <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
              og danske regler.
            </>
          ),
        },
      ]}
      currentPath="/betalingsmetoder/apple-pay"
    />
  );
};

export default ApplePayGuide;
