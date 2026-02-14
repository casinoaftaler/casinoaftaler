import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import mobilePayHero from "@/assets/heroes/mobilepay-hero.jpg";

const MobilePayGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="MobilePay Casino – Komplet Guide til MobilePay på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om MobilePay på danske casinoer. Indbetal med et swipe, MitID-sikkerhed, bonusregler, gebyrer og de bedste MobilePay casinoer i Danmark 2026."
      name="MobilePay"
      heroImage={mobilePayHero}
      heroImageAlt="MobilePay betalingsmetode på danske casinoer"
      heroSubtitle="Danmarks foretrukne betalingsapp gør det nemt at indbetale på casinoer med blot et par tryk og MitID-bekræftelse. Ingen kortnumre, ingen netbank – bare hurtig og sikker betaling."
      introTitle="MobilePay på Danske Casinoer – Danmarks Foretrukne Betalingsapp"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MobilePay er uden tvivl den mest elskede betalingsapp i Danmark. Med over 4,5 millioner danske brugere er MobilePay blevet synonym med hurtige, sikre og ubesværede betalinger – og det gælder også på online casinoer. I stedet for at fumle med kortnumre og logge ind i netbanken, kan du indbetale på din spillekonto med blot et par tryk og en MitID-bekræftelse direkte fra din smartphone.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MobilePay blev lanceret af Danske Bank i maj 2013, og visionen var simpel: at gøre betalinger lige så nemme som at sende en SMS. Den vision er blevet til virkelighed. I dag bruges MobilePay ikke bare mellem privatpersoner, men også til e-handel, abonnementsbetalinger og – i stigende grad – til indbetalinger på danske casinoer med licens fra Spillemyndigheden. Når du vælger MobilePay hos et casino, behandles din betaling som en bankoverførsel, hvilket betyder, at du typisk kvalificerer dig til alle typer{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 2022 fusionerede MobilePay med den norske tjeneste Vipps og danner nu Vipps MobilePay – en samlet nordisk betalingsløsning med ambitioner om at ekspandere yderligere. For danske casinospillere ændrer dette dog ikke den daglige brug: Du swiper, bekræfter med MitID, og pengene er på din spillekonto inden for sekunder. Det er hurtigere end{" "}
            <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">kortbetalinger</Link>{" "}
            og mere fleksibelt end{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide dykker vi ned i alt, hvad du behøver at vide om MobilePay på danske casinoer: sikkerhed, hastighed, bonusregler, gebyrer, sammenligninger med andre metoder og de bedste MobilePay casinoer i Danmark anno 2026.
          </p>
        </>
      }
      whatIsTitle="Hvad er MobilePay – og Hvordan Fungerer det på Casinoer?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MobilePay er en digital betalingsapp, der lader dig overføre penge, betale regninger og handle online udelukkende via dit mobilnummer og MitID. Appen er tilgængelig på både iOS og Android, og den knyttes til din bankkonto eller betalingskort. Når du bruger MobilePay på et casino, fungerer det som en direkte bankoverførsel: Pengene trækkes fra din tilknyttede konto og overføres til casinoets konto via en sikker, krypteret forbindelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Processen er enkel: Du vælger MobilePay i casinoets kasse, indtaster dit mobilnummer og det ønskede beløb. Derefter modtager du en betalingsanmodning i MobilePay-appen, som du godkender med et swipe og – ved større beløb – MitID-verifikation. Pengene lander på din spillekonto inden for sekunder. Det er markant hurtigere end traditionelle{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>, der kan tage op til 3 hverdage.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MobilePay har daglige betalingsgrænser, der kan variere afhængigt af din bank. Typisk kan du overføre op til 15.000 kr. pr. transaktion og op til 37.500–40.000 kr. pr. dag. Disse grænser kan dog justeres hos din bank. For de fleste casinospillere er grænserne mere end tilstrækkelige, og de fungerer samtidig som en naturlig mekanisme for{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Et vigtigt point for bonusjægere: Da MobilePay-indbetalinger behandles som bankoverførsler (og ikke som e-wallet-betalinger), er de sjældent udelukket fra bonustilbud. Det står i kontrast til metoder som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>, hvor visse casinoer eksplicit udelukker e-wallet-indbetalinger fra{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>-relaterede bonusser.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MobilePay anvender flere lag af sikkerhed for at beskytte dine transaktioner. Alle betalinger krypteres med avanceret SSL/TLS-teknologi, og appen kan kun bruges på én enhed ad gangen – hvis du logger ind på en ny telefon, deaktiveres den gamle automatisk. Desuden kræves MitID-verifikation for betalinger over en vis grænse, hvilket tilføjer et ekstra sikkerhedslag.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En unik sikkerhedsfunktion ved MobilePay er, at modtagerens fulde navn altid vises, før du godkender en betaling. Det reducerer risikoen for phishing-svindel markant, da du altid kan verificere, at du betaler til det rigtige casino. MobilePay har desuden en blokeringsfunktion, der lader dig afvise uønskede betalingsanmodninger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            MobilePay reguleres af det danske Finanstilsyn og overholder alle europæiske PSD2-krav til stærk kundegodkendelse (SCA). Dine penge er beskyttet af den danske indskydergaranti, og alle transaktioner logges med fuld sporbarhed. For spillere der ønsker maksimal kontrol over deres forbrugsmønstre, tilbyder MobilePay også mulighed for at sætte personlige beløbsgrænser.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling med MobilePay:</strong> Gå til casinoets kasssektion og vælg MobilePay som betalingsmetode. Indtast dit mobilnummer og det ønskede beløb. Du modtager straks en betalingsanmodning i MobilePay-appen på din telefon. Swipe for at godkende, og bekræft eventuelt med MitID. Pengene lander på din spillekonto øjeblikkeligt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling med MobilePay:</strong> Ikke alle casinoer understøtter udbetalinger via MobilePay endnu, men antallet vokser. Hos dem der tilbyder det, vælger du blot MobilePay i udbetalingssektionen, indtaster beløbet og bekræfter. Alternativt kan du bruge{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            eller{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}
            til udbetalinger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tip:</strong> MobilePay-indbetalinger kvalificerer næsten altid til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>{" "}
            og{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link>. Det gør MobilePay til et fremragende valg for bonusorienterede spillere.
          </p>
        </>
      }
      pros={[
        "Øjeblikkelige indbetalinger med blot et par tryk",
        "Ingen gebyrer ved de fleste danske casinoer",
        "Høj sikkerhed med MitID og avanceret kryptering",
        "Fungerer på både Android og iOS",
        "Kvalificerer næsten altid til velkomstbonusser og kampagner",
        "Over 4,5 millioner danske brugere – bredt accepteret",
      ]}
      cons={[
        "Ikke alle casinoer understøtter MobilePay til udbetalinger",
        "Daglige beløbsgrænser kan begrænse større indbetalinger",
        "Begrænset international anvendelse uden for Norden",
        "Kræver dansk bankkonto og MitID",
      ]}
      minDeposit="Typisk 100 kr. som minimum. Maksimumsgrænsen varierer fra 15.000 kr. pr. transaktion til 37.500–40.000 kr. pr. dag afhængigt af din bank."
      bonusInfo="MobilePay behandles som bankoverførsel og kvalificerer næsten altid til alle bonustyper. Modsat e-wallets som Skrill er MobilePay sjældent udelukket fra bonustilbud."
      taxInfo="Gevinster fra danske licenserede casinoer er 100% skattefrie. Spiller du på udenlandske sider uden dansk licens, kan gevinster beskattes med op til 42%."
      comparison={[
        { method: "MobilePay", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Varierer" },
        { method: "Trustly", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Ja" },
        { method: "Apple Pay", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Begrænset" },
        { method: "Visa/Mastercard", speed: "Øjeblikkelig", fees: "Mulige", withdrawalSupport: "1-3 dage" },
        { method: "Bankoverførsel", speed: "1-3 dage", fees: "Ofte ingen", withdrawalSupport: "2-5 dage" },
      ]}
      faqs={[
        { question: "Kan jeg bruge MobilePay på alle danske casinoer?", answer: "Nej, men antallet af casinoer der accepterer MobilePay vokser støt. Tjek altid casinoets betalingsmuligheder, før du opretter en konto." },
        { question: "Er MobilePay sikkert til casinobetaling?", answer: "Ja, MobilePay bruger avanceret kryptering, MitID-verifikation og kan kun bruges på én enhed ad gangen." },
        { question: "Er der gebyrer ved MobilePay?", answer: "Nej, de fleste danske casinoer opkræver ingen gebyrer ved MobilePay-indbetalinger." },
        { question: "Kan jeg hæve gevinster med MobilePay?", answer: "Ikke alle casinoer understøtter det, men muligheden vokser. Alternativt kan du bruge Trustly eller bankoverførsel." },
        { question: "Kvalificerer MobilePay til velkomstbonus?", answer: (
          <>Ja, MobilePay behandles som bankoverførsel og kvalificerer næsten altid til{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>.</>
        )},
        { question: "Hvad er beløbsgrænsen for MobilePay?", answer: "Typisk op til 15.000 kr. pr. transaktion og 37.500–40.000 kr. pr. dag, men grænserne kan variere afhængigt af din bank." },
      ]}
      currentPath="/betalingsmetoder/mobilepay"
    />
  );
};

export default MobilePayGuide;
