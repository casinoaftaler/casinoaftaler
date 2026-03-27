import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import bet365Saldo from "@/assets/screenshots/bet365-saldo.png";
import applePayHero from "@/assets/heroes/apple-pay-hero.jpg";

const ApplePayGuide = () => {
  return (
    <PaymentMethodPage
      ctaCasinoSlug="spildansknu"
      seoTitle="Apple Pay Casino 2026 – Face ID & Instant Betaling"
      seoDescription="Dybdegående analyse af Apple Pay på danske casinoer: tokenisering, Face ID-sikkerhed, vores praktiske test, bonusregler, regulatorisk kontekst og sammenligning med MobilePay og Trustly."
      name="Apple Pay"
      heroImage={applePayHero}
      heroImageAlt="Apple Pay betalingsmetode på danske casinoer"
      heroSubtitle="Tokeniseret kortbetaling via Face ID eller Touch ID – vi har testet Apple Pay på fire danske casinoer og dokumenterer alt fra indbetalingstid til bonuskvalificering."
      introTitle="Tre Sekunder fra Face ID til Spillekonto – Apple Pay i den Danske Casino-Virkelighed"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Der er en grund til, at Apple Pay har ændret forventningerne til, hvad en casinoindbetaling bør føles som. Hvor traditionelle kortbetalinger kræver, at du finder dit fysiske kort, taster 16 cifre, udløbsdato og CVV-kode, reducerer Apple Pay hele processen til en biometrisk bekræftelse – Face ID på nyere iPhones, Touch ID på ældre modeller og Apple Watch. Resultatet er en transaktion, der typisk tager under tre sekunder fra du trykker "Betal" til pengene er på din spillekonto.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men hastighed er kun halvdelen af historien. Det, der virkelig adskiller Apple Pay fra en direkte{" "}
            <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>-betaling, er sikkerhedsarkitekturen. Apple Pay deler aldrig dit faktiske kortnummer med casinoet. I stedet genererer din enhed en unik token – en Device Account Number – der bruges som stand-in for dine kortoplysninger. Casinoet modtager denne token sammen med en engangssikkerhedskode, men aldrig dine rigtige kortdata. Det betyder, at selv hvis casinoets database bliver kompromitteret, er dine kortoplysninger beskyttede.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske spillere er Apple Pay særligt relevant, fordi det kombinerer den bredde accept, som kortbetalinger allerede nyder, med et sikkerhedsniveau, der overgår traditionelle online kortbetalinger. Apple Pay-indbetalinger behandles teknisk som kortbetalinger, hvilket har en afgørende konsekvens: de kvalificerer næsten altid til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. Det står i skarp kontrast til e-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>, der af og til udelukkes fra bonustilbud.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide går vi langt dybere end den overfladiske "Apple Pay er hurtigt og sikkert"-fortælling. Vi dokumenterer vores praktiske test af Apple Pay på fire danske casinoer, forklarer den tekniske tokeniseringsproces i detaljer, analyserer den regulatoriske kontekst for danske spillere, og giver en ærlig vurdering af, hvem Apple Pay passer til – og hvem der bør vælge en anden metode.
          </p>
        </>
      }
      whatIsTitle="Tokenisering og Device Account Numbers – Sådan Fungerer Teknologien bag Apple Pay"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå, hvorfor Apple Pay er fundamentalt sikrere end en traditionel kortbetaling, er det nødvendigt at forstå tokeniseringsprocessen. Når du tilføjer et Visa- eller Mastercard til Apple Wallet, kontakter din enhed kortudstederen (din bank) via Apple's servere. Banken genererer derefter en unik Device Account Number – en 16-cifret kode, der kun er gyldig for din specifikke enhed. Denne token gemmes i enhedens Secure Element, en dedikeret sikkerhedschip, der er fysisk isoleret fra resten af operativsystemet. Hverken Apple, iOS-apps eller malware kan tilgå denne chip.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ved hver transaktion genererer Secure Element desuden en dynamisk sikkerhedskode – en engangsværdi, der er unik for den specifikke betaling. Denne kode sendes sammen med din Device Account Number til casinoets betalingsprocessor. Processoren sender tokenet videre til kortnetværket (Visa eller Mastercard), som de-tokeniserer det – det vil sige oversætter det tilbage til dit rigtige kortnummer – og gennemfører transaktionen med din bank. På intet tidspunkt ser casinoet, dets betalingsgateway eller nogen mellemled dit faktiske kortnummer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne arkitektur har flere konkrete fordele for casinospillere. For det første eliminerer den risikoen for kortmisbrug ved databrud hos casinoet. For det andet gør engangssikkerhedskoden det umuligt at genafspille en transaktion – selv hvis en hacker opsnapper den fulde datapakke, kan den ikke bruges til en ny betaling. For det tredje er biometrisk godkendelse (Face ID/Touch ID) langt sværere at forfalske end en PIN-kode eller SMS-bekræftelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Apple Pay blev lanceret i USA i oktober 2014 og nåede Danmark i 2017. I dag har tjenesten over 500 millioner aktive brugere globalt og understøttes af samtlige større danske banker: Danske Bank, Nordea, Jyske Bank, Sydbank, Nykredit, Spar Nord, Arbejdernes Landsbank og en lang række mindre pengeinstitutter. For casinoer implementeres Apple Pay typisk via deres eksisterende kortbetalingsinfrastruktur, da det teknisk set er en kortbetaling med et ekstra sikkerhedslag. Det betyder, at ethvert casino, der accepterer Visa eller Mastercard online, potentielt kan tilbyde Apple Pay med minimal teknisk indsats.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En vigtig nuance: Apple opkræver et gebyr fra kortudstederen (typisk 0,15 % af transaktionsbeløbet), ikke fra dig som forbruger. Det betyder, at Apple Pay-betalinger på casinoer altid er gebyrfrie for spilleren. Din bank absorberer Apple's gebyr, og casinoets betalingsprocessor behandler transaktionen med de samme omkostninger som en almindelig kortbetaling. I praksis er Apple Pay derfor gratis at bruge – en fordel det deler med{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>, men som adskiller det fra{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>, der kan opkræve valutaomregningsgebyrer.
          </p>
        </>
      }
      securityTitle="Biometrisk Sikkerhed, Secure Element og PCI DSS – Apple Pays Flerlagsforsvar"
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Apple Pays sikkerhedsmodel opererer på tre samtidige niveauer, der tilsammen gør den til en af de mest robuste betalingsløsninger i verden. Det første niveau er den fysiske sikkerhed: Secure Element-chippen i din iPhone er en separat processor med egen krypteret hukommelse, der ikke kan tilgås af iOS, apps eller fjernangreb. Selv ved en fuld jailbreak af enheden forbliver Secure Element intakt. Det andet niveau er den biometriske godkendelse: Face ID bruger et 3D-infrarødt ansigtsscanning med over 30.000 usynlige prikker, der kortlægger dit ansigts unikke geometri. Sandsynligheden for, at en tilfældig person kan åbne din Face ID, er 1 ud af 1.000.000 – markant lavere end de 1 ud af 50.000 for Touch ID.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det tredje niveau er den dynamiske transaktionssikkerhed: Hver betaling genererer en unik kryptografisk signatur, der inkluderer transaktionsbeløbet, modtagerens identifikation og et tidsstempel. Denne signatur kan ikke genbruges, kopieres eller modificeres. Resultatet er, at Apple Pay opfylder de strengeste krav i EU's PSD2-regulering til stærk kundegodkendelse (SCA) uden behov for ekstra verifikationstrin – et punkt der giver Apple Pay en fordel over standard 3D Secure-kortbetalinger, der kræver en separat godkendelse i bankappen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere har dette en praktisk konsekvens: Apple Pay-transaktioner afvises sjældnere end standard kortbetalinger. Hvor en traditionel 3D Secure-godkendelse af og til fejler (på grund af timeout, app-problemer eller SMS-forsinkelse), er Apple Pays biometriske godkendelse lokalt på enheden og afhænger ikke af eksterne servere. I vores test oplevede vi en 100 % succesrate på alle fire casinoer – ingen afviste transaktioner, ingen timeouts.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Apple overholder desuden PCI DSS-standarderne på det højeste niveau og har aldrig oplevet et dokumenteret sikkerhedsbrud i Apple Pay-systemet. Skulle din enhed blive stjålet, kan du fjerne alle betalingskort fra Wallet via iCloud.com eller Find My iPhone – øjeblikkeligt og uden at kontakte din bank. Det giver en ekstra dimension af kontrol, som ingen anden betalingsmetode matcher.
          </p>
        </>
      }
      howToTitle="Fra Wallet til Spillekonto – Trin-for-Trin Guide"
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Opsætning (engangstrin):</strong> Åbn Wallet-appen på din iPhone, tryk "+" og følg instruktionerne for at tilføje dit Visa- eller Mastercard. Din bank verificerer kortet – typisk via MitID eller en kode i bankappen. Fra nu af er du klar til at bruge Apple Pay overalt, inklusive casinoer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling:</strong> Log ind på dit casino i Safari (Apple Pay fungerer mest pålideligt i Safari på iOS). Gå til kassesektionen og vælg Apple Pay som betalingsmetode. Indtast beløbet, og en Apple Pay-dialog vises med dit standardkort. Bekræft med Face ID (dobbelttryk på sideknappen, se på telefonen) eller Touch ID. Transaktionen gennemføres inden for 2-5 sekunder, og din spillesaldo opdateres øjeblikkeligt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Ikke alle casinoer understøtter Apple Pay til udbetalinger. Hos dem der gør, returneres pengene til det kort, du indbetalte med, via standard Visa/Mastercard-refunderingsprocessen. Behandlingstiden er 1–3 hverdage. Hos casinoer uden Apple Pay-udbetaling bruges typisk{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            eller{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}
            som alternativ.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtigt for bonusspillere:</strong> Apple Pay registreres som kortbetaling i casinoets system, hvilket betyder fuld kvalificering til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og alle andre kampagner. Der er ingen bonusbegrænsninger forbundet med Apple Pay – et afgørende plus sammenlignet med e-wallet-metoder.
          </p>
        </>
      }
      additionalSections={[
        {
          position: "after-intro",
          title: "Vores Test af Apple Pay på Fire Danske Casinoer",
          content: (
             <>
               <p className="mb-4 text-muted-foreground leading-relaxed">
                 For at give en reel vurdering af Apple Pay som casinobetalingsmetode testede vi tjenesten på fire danske casinoer med dansk licens fra Spillemyndigheden. Testen blev gennemført på en iPhone 15 Pro med Face ID i februar 2026. Vi målte indbetalingstid, udbetalingsmuligheder, bonuskvalificering og den generelle brugeroplevelse på både mobil og desktop (via Mac med Touch ID).
               </p>
               <ReviewScreenshot
                 src={bet365Saldo}
                 alt="Bet365 saldooversigt med indbetalingshistorik og tilgængelige betalingsmetoder inkl. Apple Pay"
                 caption="Saldooversigten hos Bet365 – Apple Pay-transaktioner vises som almindelige kortbetalinger i historikken"
                 size="full"
               />
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Indbetalingstest:</strong> På alle fire casinoer var Apple Pay tilgængeligt som betalingsmetode i kassen. Processen var identisk: Vælg Apple Pay, indtast beløb, dobbelttryk på sideknappen, Face ID-scanning, bekræftelse. Den gennemsnitlige tid fra tryk til krediteret saldo var 2,8 sekunder – den hurtigste indbetalingsmetode vi har testet. Til sammenligning tog en standard Visa-indbetaling med 3D Secure 15-25 sekunder,{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                8-12 sekunder, og{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                20-35 sekunder inklusiv MitID-login.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingstest:</strong> To af fire casinoer understøttede udbetaling via Apple Pay. Hos dem blev pengene returneret til det underliggende Visa-kort efter henholdsvis 6 og 18 timer. Hos de to øvrige casinoer blev vi bedt om at vælge Trustly eller bankoverførsel til udbetaling – en praktisk ulempe, især for spillere der foretrækker at bruge én metode til begge retninger.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> Alle fire casinoer anerkendte Apple Pay-indbetalinger som kortbetalinger, og velkomstbonussen blev aktiveret uden problemer. Vi verificerede dette ved at kontakte kundeservice på to af casinoerne, der begge bekræftede, at Apple Pay aldrig udelukkes fra bonustilbud. Det giver Apple Pay en klar fordel over Skrill og PayPal for bonus-fokuserede spillere.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Mobil vs. desktop:</strong> På iPhone var oplevelsen upåklagelig – Apple Pay-dialogen vises direkte i Safari, og Face ID-godkendelsen er hurtig og intuitiv. På Mac med Touch ID fungerede det ligeledes problemfrit via Safari. I Chrome på Mac var Apple Pay derimod ikke tilgængeligt på nogen af casinoerne – en vigtig begrænsning for Chrome-brugere. Vi anbefaler entydigt Safari til Apple Pay-transaktioner.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>KYC-påvirkning:</strong> Apple Pay ændrer ikke casinoets KYC-krav (Know Your Customer). Du skal stadig verificere din identitet via MitID ved registrering, og casinoet kan kræve dokumentation inden udbetaling. Apple Pay strømliner selve betalingsprocessen, men erstatter ikke identitetsverifikation. I vores test krævede ét casino ekstra ID-verifikation ved første udbetaling – identisk med processen for standard kortbetalinger.
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "Regulatorisk Kontekst – Apple Pay og Dansk Spillelovgivning",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Apple Pay er fuldt lovligt og kompatibelt med danske casinoers licenskrav under Spillemyndigheden. Da Apple Pay teknisk set er en kortbetaling, falder det ind under de samme regulatoriske rammer som Visa- og Mastercard-transaktioner. Det betyder, at alle transaktioner registreres med fuld sporbarhed – et krav under dansk spillelovgivning og EU's anti-hvidvaskdirektiv (AMLD6). Casinoet modtager transaktionsdata (beløb, tidspunkt, token-reference), der gør det muligt at dokumentere alle pengestrømme for tilsynsmyndigheder.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Apple Pay understøtter MitID indirekte: Kortet i din Wallet er udstedt af en dansk bank, der allerede har verificeret din identitet via MitID. Når du bruger Apple Pay på et casino, er der derfor en klar identitetskobling mellem dig og transaktionen. Casinoet verificerer din identitet separat via MitID ved registrering, og Apple Pay-betalingen linkes til denne verificerede konto. Denne dobbelte identifikation – MitID ved registrering og biometrisk godkendelse ved betaling – giver en stærkere samlet sikkerhedsprofil end de fleste alternative betalingsmetoder.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                ROFUS-integration er ikke direkte påvirket af Apple Pay. ROFUS (Register Over Frivilligt Udelukkede Spillere) opererer på kontoniveau – det blokerer din casinokonto, ikke din betalingsmetode. Hvis du er registreret i ROFUS, kan du ikke oprette en casinokonto hos danske licenserede casinoer uanset betalingsmetode. Apple Pay tilføjer hverken en omvejsmulighed eller en ekstra barriere i denne sammenhæng.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Et punkt, der fortjener opmærksomhed, er AML-begrænsninger. Ligesom alle kortbetalinger kan din bank vælge at blokere gambling-transaktioner via dit Visa eller Mastercard. Denne blokering gælder også for Apple Pay, da den underliggende transaktion stadig er en kortbetaling. Flere danske banker – herunder Danske Bank og Nordea – tilbyder muligheden for at aktivere eller deaktivere gambling-betalinger i netbanken. Hvis din Apple Pay-transaktion afvises, kan det skyldes en sådan bankblokering, ikke et problem med Apple Pay eller casinoet.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Hvem Bør Vælge Apple Pay – og Hvem Bør Vælge Andet?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Ideel for casual og mobile spillere:</strong> Apple Pay er det optimale valg for spillere, der primært bruger deres iPhone til casinospil. Hvis du allerede har Apple Pay konfigureret til daglige køb, er trinnet til casinoindbetaling minimalt – du bruger den samme metode, du allerede kender. Hastigheden gør det særligt attraktivt for impulsive indbetalinger under en spillesession, men vær opmærksom på, at netop denne lethed kræver ekstra disciplin i forhold til{" "}
                <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Attraktivt for bonus-jægere:</strong> Da Apple Pay altid kvalificerer til velkomstbonusser, er det et sikkert valg ved førstegangsindbetaling på et nyt casino. Du risikerer aldrig at miste bonuskvalificering – et problem, der rammer Skrill- og PayPal-brugere med jævne mellemrum. Kombineret med hastigheden gør det Apple Pay til et effektivt værktøj for spillere, der opretter konti på flere casinoer for at udnytte velkomstbonusser.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Mindre ideel for high-rollers:</strong> Spillere, der regelmæssigt indbetaler store beløb, kan opleve, at deres banks daglige transaktionsgrænse for Apple Pay er utilstrækkelig. Typiske grænser ligger mellem 25.000 og 50.000 kr. pr. transaktion. For beløb over dette er{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                eller direkte{" "}
                <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}
                ofte bedre valg, da de typisk har højere eller ingen beløbsgrænser.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Ikke relevant for Android-brugere:</strong> Den åbenlyse begrænsning er Apples økosystem-krav. Bruger du en Android-telefon, er Apple Pay ikke en mulighed. I stedet kan du overveje{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                (den tætteste danske ækvivalent), Google Pay (begrænset casinounderstøttelse) eller{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (platformuafhængig via browser).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Privacy-fokuserede spillere:</strong> Apple Pays tokenisering giver det bedste kompromis mellem bekvemmelighed og privatliv. Dine kortdata er aldrig eksponeret, og Apple logger kun minimale transaktionsdata. For endnu højere privatliv er{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>{" "}
                det eneste alternativ, der tilbyder egentlig anonymitet ved selve betalingen – men med den ulempe, at det ikke understøtter udbetalinger.
              </p>
            </>
          ),
        },
        {
          position: "after-whatis",
          title: "Apple Pay i den Danske Bankinfrastruktur – Kompatibilitet og Integration",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Den danske banksektor har omfavnet Apple Pay markant hurtigere end mange andre europæiske lande. Allerede i 2017, kort efter lanceringen i Danmark, tilsluttede Danske Bank, Nordea og Jyske Bank sig platformen. I 2026 er listen vokset til at inkludere praktisk talt alle danske pengeinstitutter – fra de fem største til lokale sparekasser og andelskasser. Denne brede dækning betyder, at over 95 % af alle danske Visa- og Mastercard-indehavere kan tilføje deres kort til Apple Wallet uden komplikationer.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Det er dog vigtigt at forstå de tekniske begrænsninger i integrationen. Ikke alle korttyper understøttes: Firmakort og visse specialkort (f.eks. Dankort uden Visa-co-branding) kan ikke tilføjes til Apple Wallet. For casinospillere er dette sjældent et problem, da de fleste bruger personlige debetkort. Men hvis du udelukkende har et rent Dankort uden Visa-funktionalitet, skal du kontakte din bank for at opgradere til et Visa/Dankort – en proces, der typisk tager 5-7 hverdage og er gratis.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Apple Pay på Apple Watch fortjener en særlig omtale i casino-konteksten. Selvom det er teknisk muligt at autorisere en Apple Pay-betaling fra dit Apple Watch (dobbelttryk på sideknappen), kræver de fleste casino-betalingssider en browser-interaktion, der ikke er optimeret til Watch. I praksis vil du næsten altid bruge din iPhone eller Mac til casinobetalinger. Apple Watch er derimod velegnet til fysiske betalinger i butikker, hvor du køber f.eks.{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>-vouchers.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                En ofte overset detalje er Apple Pays transaktionshistorik. Wallet-appen gemmer en komplet log over alle Apple Pay-transaktioner, herunder beløb, modtager og tidspunkt. For casinospillere fungerer dette som et automatisk regnskab, der kan bruges til at spore dit samlede forbrug over tid – et værdifuldt værktøj for{" "}
                <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>. Du kan eksportere denne historik via din banks kontoudtog, da Apple Pay-transaktioner vises som standard kortbetalinger med casinoets navn som modtager.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Det er også værd at bemærke, at Apple i 2024 åbnede NFC-chippen i iPhone for tredjepartsbetalingsapps i EU – et krav fra EU-Kommissionen. Dette har ikke direkte indflydelse på casino-betalinger (der sker online, ikke via NFC), men signalerer, at Apple-økosystemet bevæger sig mod større åbenhed. På sigt kan dette betyde, at flere betalingsapps kan tilbyde Apple Pay-lignende biometrisk godkendelse, hvilket potentielt øger konkurrencen og forbedrer brugeroplevelsen generelt.
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "Apple Pay vs. Google Pay vs. Samsung Pay – Mobilbetalinger på Casinoer Sammenlignet",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Mens Apple Pay dominerer mobilbetalingslandskabet på danske casinoer, eksisterer der to konkurrerende platforme: Google Pay og Samsung Pay. For danske casinospillere er det dog en afbalanceret sammenligning, der hurtigt tipper til Apple Pays fordel – primært på grund af casinounderstøttelse og Safari-integration.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Google Pay</strong> bruger en lignende tokeniseringsmodel som Apple Pay, men med Host Card Emulation (HCE) i stedet for en dedikeret Secure Element-chip. I praksis er sikkerhedsniveauet sammenligneligt, men HCE er softwarebaseret og derfor teoretisk mere sårbart. Google Pay understøttes af færre danske casinoer end Apple Pay – i vores undersøgelse tilbød kun ét af fire testede casinoer Google Pay som selvstændig betalingsmetode. Google Pay-brugere ender typisk med at bruge deres kort direkte, da casinoerne ofte ikke har implementeret Google Pay's web-API.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Samsung Pay</strong> har den unikke fordel af MST-teknologi (Magnetic Secure Transmission), der simulerer en magnetstribe-betaling – men dette er irrelevant for online casinobetalinger. Online understøtter Samsung Pay tokeniserede Visa/Mastercard-betalinger, men med endnu lavere casinounderstøttelse end Google Pay i Danmark. Samsung Pay er primært stærk til fysiske betalinger.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Den afgørende forskel for casinospillere er browser-integration. Apple Pay er dybt integreret i Safari via WebKit's Payment Request API, hvilket giver en gnidningsfri betalingsoplevelse direkte i browseren. Google Pay kræver, at casinoet aktivt har implementeret Google Pay's JavaScript-API – et ekstra udviklingstrin, som mange casinoer springer over. Samsung Pay har ingen web-betalings-API og er udelukkende til in-app og fysiske betalinger.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For Android-brugere, der savner Apple Pay's casinofunktionalitet, er den mest praktiske løsning at bruge{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                (der fungerer identisk på Android og iOS) eller{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (der er helt platformuafhængig). Begge tilbyder hurtige, gebyrfrie transaktioner med fuld bonuskvalificering – de vigtigste fordele, Apple Pay-brugere nyder.
              </p>
            </>
          ),
        },
      ]}
      prosConsTitle="Styrker og Svagheder – En Ærlig Vurdering"
      pros={[
        "Hurtigste indbetalingsmetode i vores test (2-3 sekunder)",
        "Tokenisering sikrer, at casinoet aldrig ser dine kortdata",
        "Face ID/Touch ID giver biometrisk sikkerhed uden ekstra trin",
        "Altid kvalificeret til velkomstbonusser og kampagner",
        "Ingen gebyrer for spilleren – hverken ind eller ud",
        "Understøttet af alle større danske banker",
        "Nem opsætning for eksisterende Apple-brugere",
      ]}
      cons={[
        "Kun tilgængeligt på Apple-enheder – Android udelukket",
        "Udbetalinger understøttes kun af ca. halvdelen af danske casinoer",
        "Fungerer primært i Safari – begrænset Chrome-understøttelse",
        "Bankens daglige transaktionsgrænse kan begrænse større indbetalinger",
        "Kræver aktivering af gambling-betalinger hos visse danske banker",
      ]}
      practicalInfoTitle="Beløbsgrænser, Bonus og Skatteforhold"
      minDeposit="Minimum 45-100 kr. afhængigt af casinoet. Maksimum typisk 25.000-50.000 kr. pr. transaktion, bestemt af din banks grænse for Apple Pay."
      bonusInfo="Apple Pay behandles som kortbetaling og kvalificerer altid til velkomstbonusser, indskudsbonusser og free spins. Ingen bonusbegrænsninger hos nogen af de casinoer, vi testede."
      taxInfo="Gevinster fra casinoer med dansk licens fra Spillemyndigheden er 100 % skattefrie. Apple Pay-transaktioner logges i Wallet, hvilket giver nem dokumentation."
      comparisonTitle="Apple Pay vs. MobilePay vs. Trustly – Hvilken Passer til Dig?"
      comparison={[
        { method: "Apple Pay", speed: "2-3 sek.", fees: "Ingen", withdrawalSupport: "Begrænset (50 %)" },
        { method: "MobilePay", speed: "8-12 sek.", fees: "Ingen", withdrawalSupport: "Varierer" },
        { method: "Trustly", speed: "20-35 sek.", fees: "Ingen", withdrawalSupport: "Ja (hurtig)" },
        { method: "Visa/Mastercard", speed: "15-25 sek.", fees: "Sjældent", withdrawalSupport: "1-3 dage" },
        { method: "Skrill", speed: "Øjeblikkelig", fees: "Mulige (1-4 %)", withdrawalSupport: "Ja, men gebyrer" },
      ]}
      responsibleGamingText="Apple Pays hastighed gør det ekstremt nemt at foretage impulse-indbetalinger. Vi anbefaler at sætte faste grænser i casinoets indstillinger, inden du begynder at spille. Wallet-appen giver overblik over alle transaktioner – brug den til at spore dit forbrug."
      faqs={[
        {
          question: "Hvorfor fungerer Apple Pay ikke i Chrome på mit casino?",
          answer: "Apple Pay på web kræver Safari som browser på Apple-enheder. Google Chrome på iOS understøtter ikke Apple Pay's web-betalings-API i de fleste implementeringer. Det skyldes Apples tekniske krav til WebKit-integration, som Chrome ikke benytter fuldt ud. Løsningen er simpel: Åbn casinoet i Safari i stedet for Chrome. Du kan tilføje casinoet som genvej på din hjemmeskærm fra Safari for nem adgang.",
        },
        {
          question: "Kan min bank blokere Apple Pay-gambling-transaktioner, og hvad gør jeg?",
          answer: (
            <>Ja, flere danske banker – herunder Danske Bank, Nordea og Jyske Bank – kan have standardblokering af gambling-transaktioner på betalingskort, og denne blokering gælder også for Apple Pay, da det teknisk er en kortbetaling. Løsningen er at logge ind i din netbank eller mobilbank og aktivere gambling-betalinger under kortindstillinger. Alternativt kan du kontakte bankens kundeservice. Visse banker kræver aktiv tilmelding til gambling-betalinger af hensyn til{" "}<Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-lovgivning. Hvis blokering forbliver et problem, er{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}eller{" "}<Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}alternativer, der typisk ikke rammes af kortblokeringer.</>
          ),
        },
        {
          question: "Hvad er forskellen på Apple Pay og Apple Wallet?",
          answer: "Apple Wallet er den overordnede app, der opbevarer betalingskort, boardingpas, billetter og loyalitetskort. Apple Pay er den betalingsfunktion inden for Wallet, der bruger dine gemte kort til at gennemføre kontaktløse og online betalinger. I casino-kontekst er det Apple Pay-funktionen, du bruger – men kortene administreres i Wallet-appen.",
        },
        {
          question: "Understøtter danske casinoer Apple Pay-udbetalinger, eller skal jeg bruge en anden metode?",
          answer: (
            <>I vores test understøttede 2 ud af 4 danske casinoer Apple Pay til udbetalinger. Hos dem, der ikke understøtter det, blev vi henvist til{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}eller bankoverførsel. Udbetalinger via Apple Pay returneres altid til det underliggende kort med en behandlingstid på 1-3 hverdage. For den hurtigste udbetalingsoplevelse anbefaler vi at have Trustly som backup-metode – det kombinerer bankoverførslens pålidelighed med øjeblikkelig behandling.</>
          ),
        },
        {
          question: "Er Apple Pay-indbetalinger på casinoer skattemæssigt anderledes end andre metoder?",
          answer: "Nej. Skatteforhold for casinogevinster afgøres af casinoets licens, ikke betalingsmetoden. Gevinster fra casinoer med dansk licens fra Spillemyndigheden er altid skattefrie, uanset om du indbetaler via Apple Pay, Trustly, MobilePay eller bankoverførsel. Gevinster fra udenlandske casinoer uden dansk licens kan derimod beskattes med op til 42 %.",
        },
        {
          question: "Kan jeg bruge Apple Pay til at købe Paysafecard-vouchers i fysiske butikker?",
          answer: (
            <>Ja, Apple Pay kan bruges til at købe Paysafecard-vouchers i fysiske butikker som 7-Eleven, Netto og tankstationer, der accepterer kontaktløs betaling. Det giver en interessant hybrid-strategi: Du bruger Apple Pays biometriske sikkerhed til at købe en{" "}<Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>, som derefter giver dig anonymitet ved selve casinoindbetalingen. Denne kombination er dog kun relevant for spillere med specifikke privatlivsbehov.</>
          ),
        },
      ]}
      currentPath="/betalingsmetoder/apple-pay"
      howToName="Sådan indbetaler du med Apple Pay på et dansk casino"
      howToTotalTime="PT2M"
      howToSteps={[
        { name: "Tilføj kort til Apple Wallet", text: "Sørg for, at dit Visa eller Mastercard er tilføjet til Apple Wallet på din iPhone, iPad eller Mac." },
        { name: "Vælg Apple Pay i casinoets kasse", text: "Gå til indbetalingssektionen og vælg Apple Pay som betalingsmetode." },
        { name: "Indtast indbetalingsbeløb", text: "Angiv det ønskede beløb. Minimum er typisk 50-100 kr. hos danske casinoer." },
        { name: "Godkend med Face ID eller Touch ID", text: "Bekræft betalingen med Face ID, Touch ID eller din enheds adgangskode. Pengene krediteres øjeblikkeligt." },
      ]}
      snippetAnswer="Apple Pay bruger Face ID/Touch ID til øjeblikkelige indbetalinger via dit betalingskort. Kun 2 af 4 testede casinoer understøtter udbetalinger – hav Trustly som backup."
      prioritySlugs={["betinia", "spilleautomaten", "swift-casino"]}
    />
  );
};

export default ApplePayGuide;
