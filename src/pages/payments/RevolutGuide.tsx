import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import revolutHero from "@/assets/heroes/revolut-hero.jpg";

const RevolutGuide = () => {
  return (
    <PaymentMethodPage
      seoTitle="Revolut Casino – Komplet Guide til Revolut på Danske Casinoer 2026 | Casinoaftaler"
      seoDescription="Alt om Revolut på danske casinoer. Digital bank med øjeblikkelige overførsler, valutaveksling, budgetværktøjer og de bedste Revolut casinoer i Danmark."
      name="Revolut"
      heroImage={revolutHero}
      heroImageAlt="Revolut digital bank betalingsmetode på danske casinoer"
      heroSubtitle="Revolut er en moderne digital bank med øjeblikkelige overførsler, gratis valutaveksling og avancerede budgetværktøjer – perfekt til danske casinospillere der ønsker fuld kontrol."
      introTitle="Revolut på Danske Casinoer – Den Moderne Digitale Bank"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Revolut er en af Europas hurtigst voksende digitale banker med over 40 millioner kunder på verdensplan. Grundlagt i London i 2015 af Nikolay Storonsky og Vlad Yatsenko, startede Revolut som en app til gratis valutaveksling og har siden udviklet sig til en fuldgyldig digital bank med IBAN-konti, betalingskort, kryptovaluta-handel, aktier, forsikringer og mere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere fungerer Revolut som en kombination af en bankkonto og en e-wallet. Du kan indbetale på casinoer med dit Revolut-kort (Visa eller Mastercard) ligesom med et traditionelt bankkort, men med fordelen af Revoluts avancerede budgetværktøjer, øjeblikkelige notifikationer og mulighed for at "låse" kortet med ét tryk, hvis du vil tage en pause fra spillet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Revolut-kortbetalinger behandles som standard{" "}
            <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>-betalinger, hvilket betyder, at de kvalificerer til alle typer{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og kampagner. Kombineret med gratis valutaveksling (på weekdage) er Revolut ideelt for spillere, der også spiller på internationale casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide gennemgår vi alt om Revolut på danske casinoer – fra sikkerhed og hastighed til de unikke budgetfunktioner, der gør Revolut til et fremragende værktøj til{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
          </p>
        </>
      }
      whatIsTitle="Hvad er Revolut – og Hvorfor er det Populært?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Revolut blev grundlagt i juli 2015 og lancerede sin app i 2016. Virksomheden var en af de første "neobanker" – digitale banker uden fysiske filialer, der tilbyder alle banktjenester via en mobilapp. I 2024 modtog Revolut en fuld banklicens i EU via Litauen, og i 2025 udvidede de til yderligere markeder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Revolut-appen giver dig et virtuelt og fysisk betalingskort (Visa eller Mastercard), en IBAN-bankkonto i DKK og EUR, øjeblikkelige pengeoverførsler mellem Revolut-brugere, og avancerede budgetværktøjer med automatisk kategorisering af alle transaktioner. Du kan se præcis, hvor meget du bruger på casinoer, sætte udgiftsgrænser og modtage øjeblikkelige push-notifikationer for hver transaktion.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For casinobrug er Revolut-kortet det primære betalingsmiddel. Du bruger det præcis som et almindeligt Visa eller Mastercard – med den tilføjede fordel af Revoluts sikkerhedsfunktioner som virtuelle engangskort, geografisk kortlåsning og mulighed for at deaktivere online betalinger helt, når du ikke bruger dem.
          </p>
        </>
      }
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Revolut tilbyder flere unikke sikkerhedsfunktioner: Virtuelle engangskort genererer et nyt kortnummer for hver transaktion, så selv ved et databrud kan nummeret ikke genbruges. Du kan låse og låse kortet op med ét tryk i appen, deaktivere specifikke kortfunktioner (som online betalinger, kontaktløs betaling, magnetstribe) og sætte geografiske begrænsninger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle transaktioner krypteres med 256-bit SSL, og Revolut bruger 3D Secure til online betalinger. Push-notifikationer sendes øjeblikkeligt for hver transaktion, så du straks kan reagere på uautoriserede betalinger. Revolut har også en intern svindelovervågningsenhed, der automatisk blokerer mistænkelige transaktioner.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
            er Revoluts budgetværktøjer særligt værdifulde: Du kan se dine casinoudgifter i realtid, sætte månedlige grænser og endda blokere gambling-transaktioner helt i app-indstillingerne.
          </p>
        </>
      }
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling:</strong> Brug dit Revolut-kort (Visa/Mastercard) som du ville med ethvert andet kort. Vælg Visa eller Mastercard i casinoets kasse, indtast Revolut-kortets oplysninger og bekræft med 3D Secure. Indbetalingen er øjeblikkelig.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Vælg kort i udbetalingssektionen. Pengene returneres til dit Revolut-kort typisk inden for 1-3 hverdage, men vises ofte i appen inden for timer takket være Revoluts hurtige behandling.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Pro-tip:</strong> Brug Revoluts virtuelle engangskort til ekstra sikkerhed. Kortnummeret udløber efter én transaktion, så det er umuligt at misbruge.
          </p>
        </>
      }
      pros={[
        "Øjeblikkelige indbetalinger med Revolut Visa/Mastercard",
        "Avancerede budgetværktøjer og udgiftssporing",
        "Virtuelle engangskort for maksimal sikkerhed",
        "Gratis valutaveksling (perfekt til internationale casinoer)",
        "Kvalificerer til alle bonustyper",
        "Mulighed for at blokere gambling-transaktioner i appen",
      ]}
      cons={[
        "Udbetalinger kan tage 1-3 hverdage",
        "Kræver oprettelse af Revolut-konto",
        "Ikke alle casinoer kender Revolut som selvstændig metode",
        "Premium-funktioner kræver betalt abonnement",
      ]}
      minDeposit="Typisk 50-100 kr. som minimum. Maksimumsgrænsen afhænger af din Revolut-kontotype og casinoets grænser."
      bonusInfo="Revolut-kortbetalinger behandles som standard Visa/Mastercard og kvalificerer til alle bonustyper uden begrænsninger."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie. Revolut giver fuld transaktionshistorik for nem dokumentation."
      faqs={[
        { question: "Accepterer danske casinoer Revolut?", answer: "Ja, da Revolut udsteder Visa/Mastercard-kort, accepteres det overalt hvor disse kort er velkomne." },
        { question: "Er Revolut sikkert til casino?", answer: "Ja, med virtuelle engangskort, 3D Secure og øjeblikkelige notifikationer er Revolut ekstremt sikkert." },
        { question: "Kan jeg blokere casinotransaktioner?", answer: "Ja, Revolut har en funktion der lader dig blokere gambling-transaktioner helt i app-indstillingerne." },
        { question: "Kvalificerer Revolut til bonus?", answer: (
          <>Ja, altid. Revolut behandles som{" "}<Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>.</>
        )},
        { question: "Hvad koster Revolut?", answer: "Standard-kontoen er gratis. Premium og Metal har månedlige gebyrer men tilbyder ekstra funktioner." },
      ]}
      currentPath="/betalingsmetoder/revolut"
    />
  );
};

export default RevolutGuide;
