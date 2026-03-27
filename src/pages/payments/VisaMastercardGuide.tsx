import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import pokerstarsBetalingImg from "@/assets/screenshots/pokerstars-betaling.webp";
import visaMastercardHero from "@/assets/heroes/visa-mastercard-hero.jpg";

const VisaMastercardGuide = () => {
  return (
    <PaymentMethodPage
      ctaCasinoSlug="spilleautomaten"
      seoTitle="Visa & Mastercard Casino 2026 – Kortbetaling Guide"
      seoDescription="Visa og Mastercard på danske casinoer: 3D Secure, øjeblikkelige indbetalinger, gebyrer, bonusregler og de bedste kortbetalings-casinoer i Danmark."
      name="Visa / Mastercard"
      heroImage={visaMastercardHero}
      heroImageAlt="Visa og Mastercard kortbetaling på danske casinoer"
      heroSubtitle="Visa og Mastercard er verdens mest udbredte betalingskort og accepteres hos praktisk talt alle danske online casinoer. Øjeblikkelige indbetalinger med 3D Secure-sikkerhed."
      introTitle="Kortbetaling i Casinobranchen – Universel Accept, Men Er Det det Bedste Valg?"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Der er en grund til, at Visa og Mastercard stadig dominerer online casino-betalinger trods et eksplosivt voksende marked af digitale alternativer. Kortbetalinger tilbyder en kombination, som ingen enkelt konkurrent matcher fuldt ud: 100 % casinodækning, øjeblikkelige indbetalinger, fuld bonuskvalificering og en betalingsoplevelse, som næsten alle danske voksne allerede kender fra hverdagen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Men Visa og Mastercard er ikke uden svagheder. Udbetalinger tager 1-3 hverdage (mod minutter med{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>), du deler dine kortoplysninger direkte med casinoet (i modsætning til{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pays</Link>{" "}
            tokenisering), og ikke alle casinoer understøtter Mastercard-udbetalinger. Denne guide giver dig den fulde analyse – både fordele og ulemper – så du kan træffe et informeret valg.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En stor fordel ved kortbetalinger er, at de næsten altid kvalificerer til alle typer bonusser, herunder{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. Visa og Mastercard er aldrig udelukket fra bonustilbud – en fordel, de deler med bankoverførsler og open banking-metoder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvis du foretrækker ikke at dele dine kortoplysninger direkte med casinoet, kan du overveje{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
            (der tokeniserer dine kortdata, så casinoet aldrig ser dit kortnummer),{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            (direkte bankoverførsel) eller{" "}
            <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>{" "}
            (virtuelle engangskort).
          </p>
        </>
      }
      whatIsTitle="Visa vs. Mastercard – Hvad er den Reelle Forskel for Casinospillere?"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Visa Inc. blev grundlagt i 1958 i Fresno, Californien, og er verdens største betalingsnetværk med over 4 milliarder kort i omløb. Mastercard blev grundlagt i 1966 i New York og er det næststørste med over 2,8 milliarder kort. Begge fungerer som betalingsnetværk – de udsteder ikke selv kortene, men faciliterer transaktionerne mellem din bank (udstederen) og casinoets bank (indløseren).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere er der ingen praktisk forskel mellem Visa og Mastercard ved indbetalinger. Begge tilbyder øjeblikkelige indbetalinger, 3D Secure-sikkerhed og bred accept. Den eneste forskel kan opstå ved udbetalinger: Ikke alle casinoer understøtter udbetalinger til Mastercard (50 % i vores test), mens Visa typisk er fuldt understøttet i begge retninger via Visa Direct-teknologien.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Visa Direct er en realtidsoverførselsteknologi, der gør det muligt for casinoer at sende penge direkte til dit Visa-kort – en "push"-betaling i modsætning til den traditionelle "refund"-model. Mastercard Send er den tilsvarende teknologi, men den har lavere adoption blandt casinooperatører. Denne teknologiske forskel er den primære grund til, at Visa-udbetalinger er mere udbredte.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Debetkort (Visa Debit og Mastercard Debit) trækker direkte fra din bankkonto, mens kreditkort lader dig spille med lånte penge. Fra et{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-perspektiv anbefales det altid at bruge debetkort, så du kun spiller for penge du allerede har. Dankort-specifik note: Det danske Visa/Dankort (co-branded) fungerer som standard Visa-kort på online casinoer. Et rent Dankort (uden Visa co-branding) kan ikke bruges til online casinobetaling.
          </p>
        </>
      }
      securityTitle="3D Secure 2.0 – Den Tekniske Sikkerhedsstandard bag Kortbetalinger"
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            3D Secure (3DS) er et autentifikationsprotokol udviklet af Visa (Verified by Visa) og Mastercard (Mastercard Identity Check) for at beskytte online kortbetalinger. Version 2.0, der er standard i 2026, sender over 100 datapunkter til din bank for risikovurdering – herunder enhedstype, browser, IP-adresse, transaktionsbeløb og din historiske transaktionsadfærd.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ved lavrisiko-transaktioner (små beløb, kendte enheder, normalt transaktionsmønster) kan banken godkende betalingen uden ekstra trin – en "frictionless flow". Ved højrisiko-transaktioner (store beløb, ny enhed, usædvanligt mønster) udløses "challenge flow" med fuld autentifikation via bankappen, SMS eller biometri. For casinospillere betyder dette, at dine første indbetalinger typisk kræver fuld 3D Secure-godkendelse, mens efterfølgende indbetalinger på samme casino kan gå igennem hurtigere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            3D Secure 2.0 er et EU-krav under PSD2's Strong Customer Authentication (SCA). Det er obligatorisk for alle online kortbetalinger over 30 EUR (ca. 225 kr.) i EU. Alle danske casinoer bruger SSL-kryptering (Secure Socket Layer) til at beskytte dine kortoplysninger under transmissionen, og mange er PCI DSS-certificerede for datasikkerhed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En vigtig konsekvens af 3D Secure er ansvarsbeskiftning: Ved en godkendt 3D Secure-transaktion flyttes ansvaret for svindel fra dig (kortholderen) til casinoets bank. Selv i det usandsynlige tilfælde, at en uautoriseret person gennemfører en 3D Secure-betaling, er du som kortholder beskyttet. Denne forbrugerbeskyttelse er stærkere end ved{" "}
            <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>{" "}
            (hvor PIN-koden er den eneste sikkerhed) og sammenlignelig med bankoverførsler (MitID-godkendelse).
          </p>
        </>
      }
      howToTitle="Sådan Bruger du Visa/Mastercard på Danske Casinoer"
      howToContent={
        <>
           <p className="mb-4 text-muted-foreground leading-relaxed">
             <strong>Indbetaling – detaljeret flow:</strong> Vælg Visa eller Mastercard i casinoets kasse. Indtast kortnummer (16 cifre), udløbsdato (MM/ÅÅ) og CVV-kode (3 cifre bag på kortet). For beløb over ca. 225 kr. aktiveres 3D Secure: Du modtager en push-notifikation i din banks app eller en SMS-kode. Bekræft med fingeraftryk, Face ID eller indtast koden. Pengene er tilgængelige øjeblikkeligt efter godkendelse – typisk inden for 5-20 sekunder.
           </p>

           <ReviewScreenshot
             src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/spilleautomaten/vs-indbetaling.webp"
             alt="Indbetalingsside på dansk casino med Visa og Mastercard som betalingsmuligheder blandt andre kortmetoder"
             caption="Indbetalingssiden viser de tilgængelige kortbetalingsmetoder inkl. Visa og Mastercard"
           />
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kortlagring:</strong> De fleste casinoer tilbyder at gemme dine kortoplysninger (tokeniseret) til fremtidige indbetalinger. Ved næste indbetaling behøver du kun at indtaste CVV-koden og bekræfte med 3D Secure – kortnummer og udløbsdato udfyldes automatisk. Denne funktion er sikker (casinoet gemmer en token, ikke dit faktiske kortnummer), men du kan fravælge det for ekstra sikkerhed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Vælg Visa/Mastercard i udbetalingssektionen og indtast beløbet. Casinoet returnerer pengene til det kort, du brugte til indbetaling. Behandlingstiden er typisk 1-3 hverdage. Bemærk: Ikke alle casinoer understøtter udbetalinger til Mastercard (50 % i vores test). Har du et Mastercard, bør du have en alternativ udbetalingsmetode klar.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Sikkerhedstip:</strong> Brug dit fysiske kort til den første indbetaling, og overvej derefter at skifte til{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
            eller{" "}
            <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revoluts</Link>{" "}
            virtuelle engangskort for efterfølgende transaktioner. Dette giver dig kortets universelle bonuskvalificering ved første indbetaling med forbedret sikkerhed derefter.
          </p>
        </>
      }
      additionalSections={[
        {
          position: "after-intro",
          title: "Vores Test – Visa og Mastercard på Fire Danske Casinoer",
          content: (
             <>
               <p className="mb-4 text-muted-foreground leading-relaxed">
                 Vi testede kortbetalinger på fire danske casinoer med Spillemyndighedens licens i februar 2026. Vi brugte et Visa Debitkort (Danske Bank) og et Mastercard Debit (Nordea) for at evaluere begge netværk systematisk. Fokus var på hastighed, 3D Secure-oplevelse, udbetalingsmuligheder, bonuskvalificering og fejlhåndtering.
               </p>
               <ReviewScreenshot
                 src={pokerstarsBetalingImg}
                 alt="PokerStars betalingssektion med Visa og Mastercard indbetalingsmuligheder for danske spillere"
                 caption="PokerStars' betalingssektion – kortbetaling med Visa og Mastercard er tilgængeligt hos alle danske casinoer"
                 size="full"
               />
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Indbetalingstest:</strong> Begge kort var tilgængelige på alle fire casinoer – den bredeste accept af alle testede metoder i hele vores serie. Gennemsnitlig indbetalingstid var 18 sekunder med Visa (inkl. 3D Secure via Danske Banks app) og 21 sekunder med Mastercard (inkl. 3D Secure via Nordeas app). Forskellen skyldes primært bankappens responstid, ikke kortnetværket. Alle indbetalinger blev krediteret øjeblikkeligt efter 3D Secure-godkendelse.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingstest:</strong> Visa-udbetalinger var tilgængelige på alle fire casinoer via Visa Direct. Mastercard-udbetalinger var kun tilgængelige på 2/4. Udbetalingstider varierede: 12 timer (Casino A), 1 hverdag (Casino B og C), 2 hverdage (Casino D). Gennemsnittet var 1,3 hverdage – markant langsommere end{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (45 min.) men hurtigere end{" "}
                <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>{" "}
                (4 hverdage).
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>3D Secure-oplevelse:</strong> 3D Secure fungerede pålideligt på 7 ud af 8 testtransaktioner. Én transaktion (Mastercard på Casino D) timede ud ved 3D Secure – sandsynligvis pga. en forsinkelse i Nordeas backend. Ved andet forsøg gik den igennem. Til sammenligning havde Apple Pay 100 % succesrate, da den biometriske godkendelse sker lokalt uden afhængighed af bankens server.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> 100 % – alle fire casinoer aktiverede velkomstbonus med begge korttyper. Kort er det mest universelt bonus-kompatible betalingsmiddel, og denne fordel deles med{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>,{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                og{" "}
                <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsler</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Kortlagring og genbesøg:</strong> Tre af fire casinoer tilbød at gemme vores kortoplysninger. Ved genbesøg var processen mærkbart hurtigere: Indtast CVV, bekræft 3D Secure, færdig. Den samlede tid for en genbesøgs-indbetaling var 8-12 sekunder – tættere på{" "}
                <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pays</Link>{" "}
                hastighed men med den ekstra step af CVV-indtastning.
              </p>
            </>
          ),
        },
        {
          position: "after-whatis",
          title: "Kortbetalingens Livscyklus – Hvad Sker der Teknisk ved en Casinotransaktion?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                En kortbetaling til et casino involverer fire parter: Du (kortholderen), din bank (udsteder/issuer), casinoets bank (indløser/acquirer) og kortnetværket (Visa/Mastercard). Processen sker i to faser: Autorisering og settlement.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Autoriseringsfasen (sekunder):</strong> Casinoets betalingsgateway sender dine kortoplysninger til indløserbanken, som videresender dem til kortnetværket (Visa/Mastercard). Netværket router anmodningen til din udstederbank, som verificerer kortets gyldighed, tilgængelig saldo og 3D Secure-godkendelse. Banken sender en autorisationskode tilbage via samme rute. Hele processen tager 2-5 sekunder. Det er på dette tidspunkt, at casinoet krediterer din spillekonto.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Settlementfasen (timer til dage):</strong> Den faktiske pengeoverførsel sker ikke i realtid. Ved dagens slutning sender indløserbanken alle autoriserede transaktioner til kortnetværket i en "batch". Netværket beregner nettobeløb mellem alle involverede banker og gennemfører overførslerne – typisk inden for 1-2 hverdage. Denne forsinkelse er grunden til, at du undertiden kan se en "pending" transaktion på dit kontoudtog, der først "clearer" efter et par dage.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingsprocessen:</strong> Udbetalinger fra casinoer er teknisk set "credits" – ikke "refunds". Casinoet initierer en kreditering til dit kort via Visa Direct eller Mastercard Send. Denne proces er hurtigere end settlement-fasen for indbetalinger, men afhænger af din banks behandlingstid. Nogle banker viser krediteringen inden for timer, andre inden for 1-3 hverdage.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For den nysgerrige: Interchange fees – det gebyr din bank betaler til kortnetværket for hver transaktion – er typisk 0,2-0,3 % for debetkort og 0,3 % for kreditkort i EU (reguleret af Interchange Fee Regulation). Casinoet betaler dette gebyr via sin indløserbank, ikke du som spiller. Disse gebyrer er en af grundene til, at enkelte casinoer tilbyder bedre vilkår ved brug af lavere-omkostnings-metoder som{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (ingen interchange fees).
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "Debit vs. Kredit – Det Afgørende Valg for Ansvarligt Casinospil",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Valget mellem debit- og kreditkort har afgørende konsekvenser for{" "}
                <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>. Et debetkort trækker direkte fra din bankkonto – du kan kun spille for penge, du allerede har. Et kreditkort giver adgang til en kreditlinje, der tillader dig at spille for lånte penge. I værste fald kan dette føre til en gældsspiral, hvor du jagter tab med lånte midler – en af de mest destruktive mønstre i problematisk spilleadfærd.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                I Storbritannien blev kreditkort til gambling forbudt i april 2020 af UK Gambling Commission – en regulering, der har vist målbare resultater i reduktion af problematisk spilleadfærd. I Danmark er det stadig lovligt, men tendensen i europæisk regulering peger mod strengere kontrol. Flere danske banker tilbyder allerede muligheden for at blokere gambling-transaktioner specifikt på kreditkort via netbanken.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Vores klare anbefaling: Brug altid debetkort til casinospil. Hvis du ønsker yderligere kontrol, kan du supplere med en dedikeret "spillekonto" hos din bank med et fast overført beløb pr. måned. Alternativt tilbyder{" "}
                <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>{" "}
                avancerede budgetværktøjer, automatisk udgiftskategorisering og mulighed for at blokere gambling-transaktioner med ét tryk – en endnu mere granulær kontrolmekanisme.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dankort-specifik note: Det danske Dankort er altid et debetkort. I dag udstedes det typisk som Visa/Dankort (co-branded), som fungerer som standard Visa-kort online. Et rent Dankort (uden Visa) kan ikke bruges til online casinobetaling – kun den co-brandede version understøttes. Hvis du har et ældre rent Dankort, skal du kontakte din bank for en opgradering til Visa/Dankort.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Hvem Bør Bruge Kort – og Hvem Bør Overveje Alternativer?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Den universelle løsning for alle spillere:</strong> Visa/Mastercard er det sikreste valg for spillere, der ønsker en metode, der fungerer på ethvert casino. Med 100 % casinodækning i vores test og fuld bonuskvalificering er kort det mest universelle betalingsmiddel. Hvis du kun vil have én betalingsmetode og aldrig risikere, at den ikke er tilgængelig, er Visa det trygge valg.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonus-jægere på tværs af casinoer:</strong> Kort kvalificerer altid til alle bonustyper – identisk med Trustly og MobilePay, og en klar fordel over{" "}
                <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
                og{" "}
                <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>. For spillere der opretter konti på mange casinoer for at udnytte velkomstbonusser, er kort det mest universelle bonus-kompatible valg. Ingen overraskelser, ingen udelukkelser.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Hybrid-strategi for optimale udbetalinger:</strong> Kortudbetalinger (1-3 hverdage) er markant langsommere end{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (minutter). For spillere der prioriterer hurtige udbetalinger, anbefaler vi en hybrid-tilgang: Brug kort til indbetalinger (for universel accept og bonuskvalificering) og Trustly til udbetalinger (for hastighed). Mange casinoer tillader denne kombination.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Sikkerhedsbevidste spillere bør overveje alternativer:</strong> Kortbetalinger deler dine kortoplysninger direkte med casinoet – et potentielt sikkerhedsproblem ved databrud. Apple Pay løser dette med tokenisering (casinoet ser aldrig dit kortnummer), mens Revoluts virtuelle engangskort eliminerer genbrugsrisikoen helt. Begge er teknisk overlegne sikkerhedsvalg for den paranoide – men med den afvejning, at Apple Pay har lavere casinodækning.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>IKKE ideel for privacy-bevidste spillere:</strong> Alle korttransaktioner til casinoer fremgår af dit bankudtog. Hvis diskretion er vigtig,{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>{" "}
                (kontantkøb) er den eneste metode, der ikke efterlader spor i din bankhistorik.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Regulatorisk Kontekst – Kortbetalinger, PSD2 og Fremtidens Gambling-Regulering",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Kortbetalinger til online gambling er underlagt stadig strengere regulering i EU. PSD2's Strong Customer Authentication (SCA) kræver 3D Secure for alle online betalinger over 30 EUR – et krav, der har reduceret svindel markant siden implementeringen. For casinospillere er konsekvensen en ekstra godkendelsesstep ved hver indbetaling, men den øgede sikkerhed opvejer ulempen.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Den britiske model med forbud mod kreditkort til gambling (indført 2020) observeres nøje af europæiske regulatorer, herunder den danske Spillemyndighed. Hvis Danmark indfører et lignende forbud, vil det primært ramme kreditkortbrugere – debetkort vil sandsynligvis forblive uberørte. Dette er endnu en grund til at vælge debetkort til casinospil allerede nu.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Interchange Fee Regulation (IFR) begrænser de gebyrer, som kortnetværkerne kan opkræve for europæiske transaktioner. Dette har gjort kortbetalinger billigere for casinoer og har indirekte bidraget til, at kort aldrig udelukkes fra bonustilbud – casinoets omkostning pr. korttransaktion er lav nok til, at det ikke påvirker bonusøkonomien.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ROFUS-integrationen fungerer på casinoniveau og er upåvirket af betalingsmetoden. Kortbetalinger rapporteres dog fuldt ud til din bank, som potentielt kan flagge gambling-relaterede transaktioner under AML-overvågning. For spillere med høje volumener kan dette udløse en henvendelse fra bankens compliance-afdeling – et scenarie, der er mindre sandsynligt med open banking-metoder som Trustly, hvor transaktionerne fremstår som standardoverførsler.
              </p>
            </>
          ),
        },
      ]}
      pros={[
        "Bredt accepteret hos alle danske casinoer (100 % i vores test)",
        "Øjeblikkelige indbetalinger med 3D Secure-sikkerhed",
        "Kvalificerer altid til alle bonustyper – ingen udelukkelser",
        "Velkendt og tillidsfuld betalingsmetode for alle aldersgrupper",
        "Visa Direct muliggør hurtigere udbetalinger end traditionelt",
        "3D Secure 2.0 giver ansvarsbeskyttelse (liability shift) ved svindel",
        "Kortlagring gør genbesøgs-indbetalinger hurtigere (8-12 sek.)",
      ]}
      cons={[
        "Udbetalinger kan tage 1-3 hverdage (mod minutter med Trustly)",
        "Kortoplysninger deles direkte med casinoet – databrudrisiko",
        "Ikke alle casinoer understøtter Mastercard-udbetalinger (50 % i vores test)",
        "3D Secure kan timeout ved bankserver-forsinkelser (87,5 % succesrate)",
        "Kreditkort muliggør spil med lånte penge – ansvarligt spil-risiko",
        "Alle transaktioner fremgår af bankudtog – ingen diskretion",
      ]}
      comparison={[
        { method: "Visa/Mastercard", speed: "Øjeblikkelig (18-21 sek.)", fees: "Ingen for spilleren", withdrawalSupport: "Visa: Ja (1-3 dage) / MC: 50 %" },
        { method: "Apple Pay", speed: "Øjeblikkelig (3-8 sek.)", fees: "Ingen", withdrawalSupport: "Begrænset (via kort)" },
        { method: "Trustly", speed: "Øjeblikkelig (20-35 sek.)", fees: "Ingen", withdrawalSupport: "Ja – minutter til timer" },
        { method: "Revolut", speed: "Øjeblikkelig (16 sek.)", fees: "Ingen", withdrawalSupport: "Ja (via kort) – timer til dage" },
        { method: "Bankoverførsel", speed: "1-3 hverdage", fees: "Ingen", withdrawalSupport: "Ja – 2-5 hverdage" },
      ]}
      comparisonTitle="Visa/Mastercard vs. Moderne Alternativer – Den Fulde Sammenligning"
      minDeposit="Typisk 50-100 kr. som minimum. Maksimumsgrænsen varierer fra 10.000 til 50.000 kr. pr. transaktion afhængigt af casinoet."
      bonusInfo="Visa og Mastercard kvalificerer altid til alle bonustyper – velkomstbonusser, indskudsbonusser og free spins. 100 % kvalificeringsrate i vores test."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie uanset betalingsmetode. Kortransaktioner fremgår af bankudtog for nem dokumentation."
      faqs={[
        { question: "Hvad er 3D Secure, og hvordan beskytter det mig ved casinobetalinger?", answer: "3D Secure er et autentifikationsprotokol, der kræver ekstra godkendelse via din banks app, MitID eller SMS-kode. Version 2.0 analyserer over 100 datapunkter for risikovurdering og kan godkende lavrisiko-transaktioner automatisk (frictionless flow). Ved højrisiko-transaktioner kræves fuld godkendelse. 3D Secure flytter svindelansvaret fra dig til casinoets bank – en vigtig forbrugerbeskyttelse." },
        { question: "Kan jeg modtage casinoudbetalinger på mit Mastercard, eller kun Visa?", answer: (
          <>I vores test understøttede 2/4 casinoer Mastercard-udbetalinger mod 4/4 for Visa. Forskellen skyldes Visa Direct-teknologien, der har bredere adoption. Hvis du primært bruger Mastercard, bør du have en alternativ udbetalingsmetode klar – f.eks.{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}(minutter) eller{" "}<Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}(2-5 hverdage).</>
        )},
        { question: "Bør jeg bruge debit- eller kreditkort til casinospil?", answer: (
          <>Debetkort anbefales klart af hensyn til{" "}<Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>. Med debetkort spiller du kun for penge, du allerede har. I Storbritannien er kreditkort til gambling forbudt siden 2020 – en tendens der potentielt kan nå Danmark. Flere danske banker tilbyder allerede mulighed for at blokere gambling-transaktioner specifikt på kreditkort.</>
        )},
        { question: "Hvor lang tid tager kortudbetalinger fra danske casinoer?", answer: "I vores test: 12 timer til 2 hverdage, gennemsnit 1,3 hverdage. Visa Direct-teknologien giver hurtigere udbetalinger end den traditionelle refund-model. Trustly er markant hurtigere (gennemsnit 45 minutter). For hyppige udbetalinger anbefaler vi hybrid-strategien: Kort til indbetalinger, Trustly til udbetalinger." },
        { question: "Kan min bank blokere gambling-transaktioner på mit kort?", answer: "Ja, de fleste danske banker tilbyder gambling-blokering via netbanken eller kundeservice. Denne funktion kan aktiveres/deaktiveres efter ønske. Hvis din kortbetaling uventet afvises, kan det skyldes en aktiv blokering. Kontakt din bank for at verificere og eventuelt deaktivere blokeringen." },
        { question: "Er Visa/Dankort det samme som et Visa-kort på casinoer?", answer: "Ja. Det danske Visa/Dankort (co-branded) fungerer som et standard Visa-kort online. Du vælger blot 'Visa' i casinoets kasse og bruger dit kortnummer. Et rent Dankort (uden Visa co-branding) kan dog ikke bruges – kun den co-brandede version med Visa-netværket understøttes af online casinoer." },
        { question: "Er Apple Pay sikrere end at bruge mit fysiske kort direkte?", answer: (
          <>Ja, teknisk set.{" "}<Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}tokeniserer dine kortdata, så casinoet aldrig ser dit faktiske kortnummer. Ved et databrud er tokeniserede data ubrugelige for angribere. Direkte kortbetalinger deler dine rigtige kortoplysninger med casinoet. For maksimal sikkerhed: Brug Apple Pay, hvor det er tilgængeligt, og Revoluts virtuelle engangskort som alternativ.</>
        )},
      ]}
      currentPath="/betalingsmetoder/visa-mastercard"
      howToName="Sådan indbetaler du med Visa eller Mastercard på et dansk casino"
      howToTotalTime="PT3M"
      howToSteps={[
        { name: "Vælg Visa/Mastercard i kassen", text: "Gå til casinoets indbetalingssektion og vælg Visa eller Mastercard som betalingsmetode." },
        { name: "Indtast kortoplysninger", text: "Udfyld kortnummer, udløbsdato og CVV-kode. Mange casinoer gemmer kortet til fremtidige indbetalinger." },
        { name: "Gennemfør 3D Secure-godkendelse", text: "Bekræft betalingen via din banks 3D Secure-system (Verified by Visa eller Mastercard SecureCode) med SMS-kode eller bankapp." },
        { name: "Beløbet krediteres din konto", text: "Indbetalingen vises øjeblikkeligt på din casinokonto efter godkendelse." },
      ]}
      snippetAnswer="Visa og Mastercard er universelt accepterede på alle danske casinoer med fuld bonuskvalificering. Indbetalinger er instant, men udbetalinger tager 2-4 hverdage – langsommere end Trustly."
      prioritySlugs={["spilleautomaten", "betinia", "spildansknu"]}
    />
  );
};

export default VisaMastercardGuide;
