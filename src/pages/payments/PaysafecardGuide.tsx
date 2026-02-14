import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import paysafecardHero from "@/assets/heroes/paysafecard-hero.jpg";

const PaysafecardGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Paysafecard Casino – Komplet Guide til Paysafecard på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om Paysafecard på danske casinoer. Forudbetalt og anonym indbetaling, sikkerhed, begrænsninger og de bedste Paysafecard casinoer i Danmark."
      name="Paysafecard"
      heroImage={paysafecardHero}
      heroImageAlt="Paysafecard forudbetalt betalingsmetode på danske casinoer"
      heroSubtitle="Paysafecard er en forudbetalt betalingsløsning, der lader dig indbetale på casinoer med en simpel 16-cifret PIN-kode – helt uden at dele bank- eller kortoplysninger."
      introTitle="Paysafecard på Danske Casinoer – Forudbetalt og Anonym Betaling"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Paysafecard er en af de sikreste og mest private betalingsmetoder på danske online casinoer. Med Paysafecard køber du et forudbetalt kort (fysisk i butikker eller digitalt online) med en 16-cifret PIN-kode, som du derefter bruger til at indbetale på casinoer. Det unikke ved Paysafecard er, at du aldrig behøver at dele bank- eller kortoplysninger med casinoet – du betaler kun med din PIN-kode.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Paysafecard er en del af Paysafe Group (samme selskab der ejer{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og Neteller) og er tilgængelig i over 50 lande. I Danmark kan du købe Paysafecard-kuponer i 7-Eleven, Netto, tankstationer og andre udsalgssteder, eller bestille dem digitalt via Paysafecards hjemmeside. Kuponerne fås typisk i værdier fra 100 kr. til 1.000 kr.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den store fordel er den totale privatlivsbeskyttelse: Paysafecard kræver ingen registrering, ingen bankoplysninger og ingen personlige data. Det gør den ideel til spillere, der prioriterer anonymitet og fuld kontrol over deres spillebudget – en effektiv strategi for{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtigt:</strong> Paysafecard kan kun bruges til indbetalinger – ikke til udbetalinger. Når du vil hæve gevinster, skal du bruge en alternativ metode som{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            eller{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>.
          </p>
        </>
      }
      whatIsTitle="Hvad er Paysafecard – og Hvordan Fungerer det?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Paysafecard blev grundlagt i 2000 i Wien, Østrig, og har siden udviklet sig til en af verdens førende forudbetalte betalingsløsninger. Konceptet er simpelt: Du køber en kupon med en bestemt værdi og modtager en 16-cifret PIN-kode. Denne kode bruges som betalingsmiddel online, og værdien trækkes fra kuponen ved hver transaktion.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Du kan også oprette en gratis myPaysafe-konto, der lader dig samle flere kuponer i én digital tegnebog, spore dine transaktioner og sætte personlige forbrugsgrænser. Med en verificeret konto kan du endøgse bruge Paysafecard til større beløb og nyde godt af yderligere funktioner.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For casinobrug fungerer det sådan: Du vælger Paysafecard i casinoets kasse, indtaster din 16-cifrede PIN og beløbet. Pengene overføres øjeblikkeligt til din spillekonto. Restbeløbet på kuponen kan bruges til fremtidige indbetalinger. Kombinationen af enkelhed, sikkerhed og budgetkontrol gør Paysafecard til et populært valg – især for spillere der vil sætte et fast budget.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Paysafecard er ekstremt sikkert, fordi du aldrig deler bank- eller kortoplysninger. Den 16-cifrede PIN-kode er det eneste, der kræves, og den kan ikke spores tilbage til din bankkonto. Selv hvis PIN-koden kompromitteres, er tabet begrænset til kuponens restværdi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Med en myPaysafe-konto kan du tilføje yderligere sikkerhed med adgangskode og totrinsbekræftelse. Paysafecard er reguleret af det britiske FCA og overholder europæiske sikkerhedsstandarder.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling:</strong> Køb en Paysafecard-kupon (fysisk eller digitalt), vælg Paysafecard i casinoets kasse, indtast din 16-cifrede PIN og beløbet. Pengene er tilgængelige øjeblikkeligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Paysafecard understøtter ikke udbetalinger. Du skal vælge en alternativ metode som{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            eller{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}
            til at hæve gevinster.
          </p>
        </>
      }
      pros={[
        "Total anonymitet – ingen bank- eller kortoplysninger deles",
        "Forudbetalt model giver perfekt budgetkontrol",
        "Øjeblikkelige indbetalinger med PIN-kode",
        "Tilgængelig i fysiske butikker og online",
        "Ingen registrering nødvendig for grundlæggende brug",
      ]}
      cons={[
        "Kan IKKE bruges til udbetalinger",
        "Kuponværdi er begrænset (typisk maks. 1.000 kr.)",
        "Mulige gebyrer ved inaktive kuponer efter 12 måneder",
        "Visse casinoer udelukker Paysafecard fra bonustilbud",
      ]}
      minDeposit="Kuponerne fås typisk fra 100 kr. til 1.000 kr. Minimumsindskud på casinoer er normalt 100 kr."
      bonusInfo="Visse casinoer udelukker Paysafecard fra velkomstbonusser. Tjek altid bonusvilkårene, før du indbetaler."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie uanset betalingsmetode."
      faqs={[
        { question: "Kan jeg hæve gevinster med Paysafecard?", answer: "Nej, Paysafecard er kun til indbetalinger. Brug Trustly eller bankoverførsel til udbetalinger." },
        { question: "Hvor køber jeg Paysafecard?", answer: "I 7-Eleven, Netto, tankstationer og andre udsalgssteder i Danmark, eller digitalt via Paysafecards hjemmeside." },
        { question: "Er Paysafecard anonymt?", answer: "Ja, grundlæggende brug kræver ingen registrering eller personlige oplysninger." },
        { question: "Kvalificerer Paysafecard til bonus?", answer: (
          <>Ikke altid – visse casinoer udelukker det. Tjek{" "}<Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskravene</Link>.</>
        )},
      ]}
      currentPath="/betalingsmetoder/paysafecard"
    />
  );
};

export default PaysafecardGuide;
