import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import paypalHero from "@/assets/heroes/paypal-hero.jpg";

const PayPalGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="PayPal Casino – Komplet Guide til PayPal på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om PayPal på danske casinoer. Hurtige transaktioner, køberbeskyttelse, bonusregler og de bedste PayPal casinoer i Danmark 2026."
      name="PayPal"
      heroImage={paypalHero}
      heroImageAlt="PayPal betalingsmetode på danske casinoer"
      heroSubtitle="Verdens mest kendte e-wallet kombinerer hastighed, køberbeskyttelse og global rækkevidde. PayPal gør det muligt at indbetale og udbetale på danske casinoer uden at dele kortoplysninger."
      introTitle="PayPal på Danske Casinoer – Verdens Førende E-Wallet"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PayPal er en af verdens mest anerkendte og betroede digitale betalingsløsninger med over 430 millioner aktive brugere på verdensplan. Grundlagt i 1998 under navnet Confinity og senere fusioneret med Elon Musks X.com, har PayPal i over to årtier været synonym med sikre online betalinger. For danske casinospillere tilbyder PayPal en kombination af hastighed, sikkerhed og fleksibilitet, der gør den til et attraktivt alternativ til traditionelle kortbetalinger og bankoverførsler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du bruger PayPal på et dansk casino, fungerer tjenesten som et mellemled mellem din bankkonto eller dit betalingskort og casinoet. Dine finansielle oplysninger deles aldrig direkte med casinoet – i stedet håndterer PayPal hele transaktionen. Det reducerer risikoen for svindel markant og giver dig en ekstra sikkerhedsbarriere, som du ikke får ved direkte{" "}
            <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">kortbetalinger</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PayPal understøtter både ind- og udbetalinger hos mange danske casinoer, og transaktionerne er typisk øjeblikkelige ved indbetaling og under 24 timer ved udbetaling. Det gør PayPal til en af de hurtigste betalingsmetoder i branchen – sammenlignelig med{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er dog vigtigt at bemærke, at visse casinoer udelukker PayPal-indbetalinger fra{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og andre kampagner. Tjek altid bonusvilkårene og{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskravene</Link>, før du indbetaler med PayPal.
          </p>
        </>
      }
      whatIsTitle="Hvad er PayPal – og Hvordan Fungerer det?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PayPal blev grundlagt i december 1998 og voksede hurtigt til at blive den dominerende online betalingsplatform. Efter eBays opkøb i 2002 blev PayPal standarden for e-handelsbetalinger, og i 2015 blev virksomheden udskilt som selvstændig børsnoteret virksomhed. I dag har PayPal hovedsæde i San Jose, Californien, og opererer i over 200 lande med understøttelse af 25 valutaer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PayPal fungerer som en digital tegnebog: Du opretter en konto, knytter et betalingskort eller en bankkonto til den, og kan derefter betale online blot ved at logge ind med din e-mail og adgangskode. PayPals egne sikkerhedssystemer håndterer resten – herunder kryptering, svindelovervågning og køberbeskyttelse. For casinobetalinger betyder det, at du kan indbetale og udbetale uden at casinoet nogensinde ser dine bankoplysninger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            PayPal har strenge interne retningslinjer for, hvilke casinoer de samarbejder med. Kun casinoer med gyldige spillelicenser fra anerkendte myndigheder (som den danske Spillemyndighed) kan tilbyde PayPal som betalingsmetode. Det fungerer som en ekstra kvalitetssikring: Hvis et casino accepterer PayPal, er det et godt tegn på, at det opererer inden for lovens rammer og tilbyder{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PayPals sikkerhedssystem er industriledende og anvender 256-bit SSL-kryptering til at beskytte alle transaktioner. Derudover tilbyder PayPal totrinsbekræftelse (2FA), hvor du godkender login med en SMS-kode eller authenticator-app ud over din adgangskode. Dine betalingsoplysninger opbevares på PayPals sikre servere og deles aldrig direkte med forhandlere eller casinoer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PayPals køberbeskyttelse er en unik fordel: Hvis en transaktion er uautoriseret, kan du åbne en tvist og potentielt få pengene tilbage. Denne beskyttelse gælder dog primært for varer og tjenester – casinotransaktioner er typisk undtaget, men den generelle sikkerhedsinfrastruktur beskytter stadig dine data.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            PayPal overvåger alle transaktioner med avancerede AI-baserede svindeldetektionssystemer og kan midlertidigt låse konti ved mistænkelig aktivitet. For danske spillere, der bruger PayPal på casinoer, betyder det et ekstra sikkerhedsnet, der supplerer casinoets egen sikkerhed.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling med PayPal:</strong> Vælg PayPal i casinoets betalingssektion og indtast beløbet. Du bliver omdirigeret til PayPals loginside, hvor du logger ind og godkender betalingen. Pengene overføres øjeblikkeligt til din spillekonto. Hele processen tager typisk under 30 sekunder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling med PayPal:</strong> Vælg PayPal i udbetalingssektionen, indtast beløbet og bekræft. PayPal behandler typisk udbetalinger øjeblikkeligt eller inden for få timer. Derfra kan du overføre pengene til din bankkonto, hvilket tager yderligere 1-2 hverdage.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtigt for bonusjægere:</strong> Visse casinoer udelukker e-wallets som PayPal fra{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>. Hvis bonus er vigtig for dig, kan{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
            eller{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            være bedre valg, da de sjældent er udelukket.
          </p>
        </>
      }
      pros={[
        "Hurtige og sikre transaktioner med verdensklasse-kryptering",
        "Kortoplysninger deles aldrig med casinoet",
        "Stærk køberbeskyttelse og svindelovervågning",
        "Understøtter både ind- og udbetalinger hos mange casinoer",
        "Totrinsbekræftelse for ekstra sikkerhed",
        "Fungerer som kvalitetsstempel for licenserede casinoer",
      ]}
      cons={[
        "Ikke alle danske casinoer accepterer PayPal",
        "Visse bonustilbud udelukker e-wallet-indbetalinger",
        "Mulige transaktionsgebyrer ved valutaomregning (1-2%)",
        "Kræver oprettelse af separat PayPal-konto",
      ]}
      minDeposit="Typisk 100 kr. som minimum. Maksimumsgrænsen varierer betydeligt – visse casinoer tillader op til 110.000 kr. ved indbetalinger."
      bonusInfo="Visse casinoer udelukker PayPal fra velkomstbonusser, men mange accepterer det fuldt ud. Tjek altid bonusvilkårene, før du indbetaler."
      taxInfo="Gevinster fra casinoer med dansk licens er skattefrie. På udenlandske sider kan gevinster beskattes med op til 42%."
      comparison={[
        { method: "PayPal", speed: "Øjeblikkelig", fees: "Mulige (1-2%)", withdrawalSupport: "0-24 timer" },
        { method: "Skrill", speed: "Øjeblikkelig", fees: "Mulige", withdrawalSupport: "0-24 timer" },
        { method: "Trustly", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Øjeblikkelig" },
        { method: "MobilePay", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Varierer" },
        { method: "Visa/Mastercard", speed: "Øjeblikkelig", fees: "Mulige", withdrawalSupport: "1-3 dage" },
      ]}
      faqs={[
        { question: "Hvorfor udelukker nogle casinoer PayPal fra velkomstbonusser?", answer: (
          <>Visse casinoer udelukker e-wallets som PayPal (og{" "}<Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>) fra bonustilbud, fordi e-wallets historisk er blevet brugt til bonusmisbrug. Bonusjægere oprettede flere konti med forskellige e-wallet-adresser for at udnytte velkomstbonusser gentagne gange. Det er ikke alle casinoer, der gør dette – mange accepterer PayPal fuldt ud til{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>. Tjek altid bonusvilkårene inden indbetaling. Alternativt kan du bruge{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}eller{" "}<Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>, der aldrig udelukkes fra bonustilbud.</>
        )},
        { question: "Hvad er PayPals køberbeskyttelse, og gælder den for casinotransaktioner?", answer: "PayPals køberbeskyttelse gælder primært for varer og tjenester købt online, men casinotransaktioner klassificeres som 'gambling' og er typisk udelukket fra standardbeskyttelsen. Du kan dog altid kontakte PayPals support ved uautoriserede transaktioner eller svindel. PayPals AI-baserede svindelovervågning beskytter dig mod uautoriserede betalinger, og totrinsbekræftelsen forhindrer uvedkommende adgang til din konto. Derudover behøver du aldrig at dele dine bankoplysninger direkte med casinoet, hvilket giver en ekstra sikkerhedsbarriere." },
        { question: "Hvor hurtigt modtager jeg PayPal-udbetalinger fra danske casinoer?", answer: "PayPal-udbetalinger er blandt de hurtigste e-wallet-udbetalinger. Når casinoet godkender udbetalingen, overføres pengene typisk øjeblikkeligt til din PayPal-saldo – ofte inden for 0–4 timer. Herfra kan du vælge at beholde pengene i PayPal eller overføre dem til din bankkonto, hvilket tager yderligere 1–2 hverdage. Sammenlignet med kortbetalinger (1–3 dage) og bankoverførsler (2–5 dage) er PayPal markant hurtigere. Den samlede tid fra anmodning til bankoverførsel er typisk 2–3 hverdage." },
        { question: "Koster det noget at bruge PayPal på danske casinoer?", answer: "PayPal opkræver normalt ikke gebyrer for indbetalinger i DKK til danske casinoer. Dog kan der forekomme valutaomregningsgebyrer på 1–2 %, hvis casinoet opererer i EUR eller en anden valuta. Udbetalinger til din PayPal-konto er gebyrfrie fra casinoets side, men overførsel fra PayPal til din danske bankkonto er også gratis. Det eneste gebyrscenarie er valutaomregning, som du kan undgå ved at vælge casinoer, der opererer i danske kroner." },
        { question: "Hvordan opretter jeg en PayPal-konto til casinobrug i Danmark?", answer: "Oprettelse af en PayPal-konto tager under 5 minutter: gå til paypal.com, vælg 'Opret konto', angiv din e-mail og adgangskode, og tilknyt dit danske betalingskort eller bankkonto. For casinobrug anbefales det at verificere din identitet fuldt ud, da dette øger beløbsgrænserne og sikrer hurtigere udbetalinger. Verificering kræver bekræftelse af din adresse og tilknytning af mindst ét betalingskort. Når kontoen er verificeret, kan du bruge PayPal på alle danske casinoer, der understøtter metoden, med øjeblikkelige indbetalinger." },
        { question: "Kan jeg sætte indbetalingsgrænser på min PayPal-konto til ansvarligt spil?", answer: (
          <>PayPal tilbyder ikke dedikerede gambling-grænser som f.eks.{" "}<Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>, der kan blokere gambling-transaktioner helt. Du kan dog sætte generelle forbrugsgrænser og aktivere notifikationer for alle transaktioner. For mere kontrol anbefales det at bruge casinoets egne indbetalingsgrænser eller registrere dig hos{" "}<a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">ROFUS</a>{" "}for selvudelukkelse. Læs mere om{" "}<Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.</>
        )},
      ]}
      currentPath="/betalingsmetoder/paypal"
    />
  );
};

export default PayPalGuide;
