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
        { question: "Hvorfor kan jeg ikke hæve gevinster med Paysafecard, og hvad er alternativerne?", answer: (
          <>Paysafecard er designet som en ren indbetalingsmetode baseret på forudbetalte vouchers – der er ingen bankkonto tilknyttet, som pengene kan returneres til. Når du vil hæve gevinster, skal du bruge en alternativ metode. De hurtigste alternativer er{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}(minutter) og{" "}<Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>. Du kan også bruge{" "}<Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}(2–5 hverdage). Casinoet kræver typisk, at du angiver en udbetalingsmetode inden din første gevinstudbetaling.</>
        )},
        { question: "Hvor kan jeg købe Paysafecard i Danmark, og hvad koster det?", answer: "Paysafecard-vouchers kan købes fysisk i 7-Eleven, Netto, Rema 1000, tankstationer (Shell, Circle K, OK) og andre udsalgssteder med Paysafecard-skiltet. Digitale vouchers kan købes via paysafecard.com eller forhandlersider. Vouchers fås i faste beløb fra 50 kr. til 1.000 kr. Der er ingen gebyrer ved køb af vouchers – du betaler præcis det pålydende beløb. Du kan kombinere op til 10 vouchers pr. transaktion på casinoet, hvilket giver en maksimal indbetaling på op til 10.000 kr. ad gangen." },
        { question: "Er Paysafecard virkelig anonymt, og hvad betyder det for casinospil?", answer: "Grundlæggende brug af Paysafecard kræver ingen registrering – du køber en voucher med kontanter og indtaster den 16-cifrede PIN-kode på casinoet. Dog kræver danske licenserede casinoer MitID-verifikation ved registrering, så selve casinokontoen er aldrig anonym. Fordelen er, at dine bankoplysninger og kortdata aldrig deles med casinoet. For beløb over 100 EUR (ca. 750 kr.) kan Paysafecard kræve kontooprettelse (my paysafecard). Anonymiteten gælder altså primært for selve betalingstransaktionen, ikke casinokontoen." },
        { question: "Udelukker danske casinoer Paysafecard fra bonustilbud?", answer: (
          <>Visse casinoer udelukker Paysafecard fra{" "}<Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>, men det varierer betydeligt. Udelukkelsen skyldes typisk, at Paysafecard kategoriseres som en 'prepaid-metode' i bonusvilkårene. Tjek altid de specifikke vilkår, inden du indbetaler. Hvis Paysafecard er udelukket, kan du foretage din første indbetaling via{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}eller{" "}<Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>{" "}for at sikre bonusmodtagelse og efterfølgende skifte til Paysafecard.</>
        )},
        { question: "Hvad sker der, hvis jeg ikke bruger hele min Paysafecard-saldo på casinoet?", answer: "Hvis du ikke bruger hele saldoen på din Paysafecard-voucher, gemmes restbeløbet på den 16-cifrede PIN-kode. Du kan bruge restbeløbet til fremtidige indbetalinger på samme eller et andet casino – eller til andre online-køb. Saldoen udløber ikke inden for de første 12 måneder. Herefter kan der pålægges et månedligt inaktivitetsgebyr på 3 EUR, der trækkes fra restbeløbet. Du kan altid tjekke din saldo på paysafecard.com. Det anbefales at opbevare PIN-koden sikkert, da Paysafecard ikke kan erstatte mistede koder." },
        { question: "Kan jeg bruge Paysafecard til ansvarligt spil og budgetkontrol?", answer: (
          <>Paysafecard er faktisk en af de bedste betalingsmetoder til{" "}<Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>. Da du køber vouchers med et fast beløb på forhånd, sætter du automatisk en naturlig grænse for, hvor meget du kan indbetale. Du kan ikke overskride dit budget, da der ikke er nogen direkte forbindelse til din bankkonto. Denne 'forudbetalt'-model gør det nemmere at holde styr på dit forbrug sammenlignet med kortbetalinger eller bankoverførsler, der giver adgang til hele din saldo.</>
        )},
      ]}
      currentPath="/betalingsmetoder/paysafecard"
    />
  );
};

export default PaysafecardGuide;
