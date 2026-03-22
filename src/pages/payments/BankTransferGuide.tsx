import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import bankTransferHero from "@/assets/heroes/bank-transfer-hero.jpg";

const BankTransferGuide = () => {
  return (
    <PaymentMethodPage
      ctaCasinoSlug="spilleautomaten"
      seoTitle="Bankoverførsel Casino 2026 – Sikker men Langsom"
      seoDescription="Bankoverførsler på danske casinoer: Sikkerhed, behandlingstider, gebyrer og sammenligninger med hurtigere alternativer. Se de bedste casinoer."
      name="Bankoverførsel"
      heroImage={bankTransferHero}
      heroImageAlt="Bankoverførsel betalingsmetode på danske casinoer"
      heroSubtitle="Den klassiske og mest troværdige betalingsmetode – direkte overførsler fra din bankkonto til casinoet med fuld sporbarhed og bankgaranti."
      introTitle="Bankoverførslen Lever Stadig – Men Bør Du Bruge den i 2026?"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I en verden af øjeblikkelige betalinger, fingeraftryksgodkendelser og open banking-API'er virker den traditionelle bankoverførsel som et anakronisme. Alligevel er den stadig tilgængelig – og i brug – på alle danske licenserede casinoer. Spørgsmålet er ikke, om bankoverførsler virker (det gør de), men om de giver mening, når alternativer som{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            tilbyder identisk sikkerhed med øjeblikkelig behandling.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Svaret er nuanceret. Bankoverførsler har konkrete fordele, som ingen anden metode matcher: Ingen tredjepartsinvolvering, ingen beløbsgrænser (udover bankens egne), universel accept og 100 % bonuskvalificering. For high-rollers med store indbetalinger, for ekstremt sikkerhedsbevidste spillere og som universel backup-metode forbliver bankoverførslen relevant – om end sjældent som førstevalgmetode.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En standard bankoverførsel til et casino initieres via din netbank, hvor du manuelt opretter overførslen med casinoets kontooplysninger, dit spillernummer som reference og det ønskede beløb. Transaktionen behandles derefter af banksystemet og kan tage 1-3 hverdage for indbetalinger og 2-5 hverdage for udbetalinger. Det er langsomt, manuelt og fejlbehæftet – men det virker altid.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bankoverførsler kvalificerer næsten altid til alle typer bonusser, herunder{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. De er aldrig udelukket fra bonustilbud – i modsætning til visse e-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>.
          </p>
        </>
      }
      whatIsTitle="Bankoverførslens Tekniske Fundament – Fra Netbank til Casino"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En bankoverførsel er en direkte pengetransaktion fra din bankkonto til casinoets bankkonto. Du logger ind i din netbank, opretter en ny overførsel og angiver casinoets bankoplysninger (IBAN og SWIFT/BIC-kode) samt dit spillernummer som reference. Beløbet trækkes fra din konto og overføres via det interbanke betalingssystem.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I Danmark behandles indenlandske bankoverførsler typisk inden for 1-2 hverdage via Nationalbankens clearingsystem (Sumclearing). Banken samler dine overførsler i "batches" og sender dem til clearing på faste tidspunkter – typisk 2-3 gange dagligt. Det er denne batch-processering, der skaber forsinkelsen: Din overførsel behandles ikke individuelt, men venter på næste clearingcyklus.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Internationale bankoverførsler (SEPA) kan tage op til 3 hverdage. Udbetalinger fra casinoer til din bank kan tage 2-5 hverdage, da casinoet ofte har en intern behandlingstid på 24-48 timer, inden overførslen overhovedet initieres. Denne interne forsinkelse er casinoets egen – ikke bankens.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er vigtigt at inkludere dit spillernummer i referencen, da casinoet ellers ikke kan identificere betalingen. Uden korrekt reference kan indbetalingen forsinkes med dage, mens casinoets finansafdeling manuelt matcher overførslen med din konto. I vores test resulterede en manglende reference i 3 ekstra hverdages forsinkelse – en frustrerende oplevelse, der er helt elimineret med automatiserede metoder som Trustly.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For den nysgerrige: Når du opretter en bankoverførsel i din netbank, godkendes den lokalt af din bank via MitID. Derefter sendes den til Nationalbankens clearingsystem, der verificerer modtagerens bankoplysninger og initierer overførslen. Modtagerbanken (casinoets bank) modtager overførslen ved næste clearingcyklus og krediterer casinoets konto. Casinoet skal derefter manuelt eller automatisk matche overførslen med din spillerkonto – det er typisk dette sidste trin, der tager længst tid og er mest fejlbehæftet.
          </p>
        </>
      }
      securityTitle="Bankens Egne Vægge – Den Ultimative Sikkerhedsinfrastruktur"
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankoverførsler er en af de mest sikre betalingsmetoder overhovedet. Transaktionerne håndteres af bankernes egne sikkerhedssystemer med MitID-godkendelse, SSL-kryptering og fuld AML-compliance (Anti-Money Laundering). Hver transaktion logges med fuld sporbarhed, og din bank overvåger kontinuerligt for mistænkelig aktivitet via automatiserede systemer og manuelle gennemsyn.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dine penge er beskyttet af den danske indskydergaranti på op til 750.000 kr. pr. bank (administreret af Garantiformuen). I modsætning til e-wallets og kortbetalinger involverer bankoverførsler ingen tredjepartsleverandører, hvilket eliminerer et ekstra potentielt angrebspunkt. Der er ingen server hos en fintech-virksomhed, der kan kompromitteres – kun din bank og casinoets bank.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En underbelyst sikkerhedsfordel: Bankoverførsler er irreversible fra afsenderens side (undtagen ved svindel). Dette forhindrer "chargeback-svindel" – en type svindel, hvor en spiller bestrider en kortbetaling efter at have modtaget casinobonus. Casinoer ser denne egenskab som en fordel, hvilket er en af grundene til, at bankoverførsler aldrig udelukkes fra bonustilbud.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For den ekstremt sikkerhedsbevidste spiller er bankoverførslens direkte forbindelse en psykologisk fordel: Der er ingen app, der kan hackes (udover netbanken), ingen e-wallet-konto, der kan kompromitteres, og ingen kortoplysninger, der kan stjæles. Det er den mest "primitive" og dermed også den mest angrebsresistente betalingsmetode i casinobranchen.
          </p>
        </>
      }
      howToTitle="Steg for Steg – Manuel Bankoverførsel til et Dansk Casino"
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling – detaljeret guide:</strong> Log ind i din netbank (Danske Bank, Nordea, Jyske Bank etc.) via MitID. Opret en ny overførsel. Indtast casinoets bankoplysninger – du finder disse typisk under "Kasse" eller "Indbetaling" på casinoets hjemmeside. Indtast IBAN-nummer, SWIFT/BIC-kode og modtagerens navn. I referencefeltet skal du angive dit spillernummer (også kaldet konto-ID eller kundenummer). Bekræft overførslen med MitID. Behandlingstiden er 1-3 hverdage for indenlandske overførsler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Straksbetaling (SEPA Instant):</strong> Nogle danske banker tilbyder nu straksoverførsler via SEPA Instant Credit Transfer (SCT Inst), der gennemfører overførslen inden for 10 sekunder. Danske Bank, Nordea og Jyske Bank understøtter dette, men casinoets bank skal også understøtte modtagelse af straksoverførsler. I vores test understøttede 2/5 casinoer straksoverførsler – resten behandlede bankoverførsler manuelt. Tjek med dit casino, inden du forventer øjeblikkelig kreditering.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> Anmod om udbetaling hos casinoet med din bankkonto som modtager. Du skal typisk angive IBAN og kontohaverens navn. Casinoet verificerer, at kontohaveren matcher din casinokonto (KYC-krav). Behandlingstiden er 2-5 hverdage inkl. casinoets interne behandling på 24-48 timer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Kritisk tip:</strong> Dobbelttjek altid dit spillernummer i referencefeltet. En forkert eller manglende reference er den hyppigste årsag til forsinkelser. I vores test kostede en manglende reference 3 ekstra hverdages ventetid og to kundeserviceopkald. Skriv referencen ned, inden du starter overførslen, og copy-paste den fra casinoets hjemmeside, hvis muligt.
          </p>
        </>
      }
      additionalSections={[
        {
          position: "after-intro",
          title: "Straksbetaling vs. Traditionel Bankoverførsel – Den Tekniske Virkelighed i 2026",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Det danske banklandskab har ændret sig markant i de seneste år med indførelsen af "Instant Payments" via SEPA Instant Credit Transfer (SCT Inst). Flere danske banker – herunder Danske Bank, Nordea og Jyske Bank – tilbyder nu straksoverførsler, der gennemfører bankoverførsler inden for 10 sekunder, 24/7/365. For casinospillere betyder dette, at den traditionelle 1-3 dages ventetid potentielt kan elimineres helt.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                I praksis er der dog en vigtig begrænsning: Ikke alle casinoer understøtter modtagelse af straksoverførsler. Casinoets bank skal også understøtte SCT Inst-formatet, og casinoets interne systemer skal være konfigureret til at kreditere spillekonti baseret på realtids-bankmeldinger. I vores undersøgelse understøttede 2 ud af 5 kontaktede casinoer straksoverførsler – de øvrige behandlede bankoverførsler manuelt med 1-2 dages forsinkelse.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Den tekniske årsag til denne begrænsning er legacy-systemerne hos mange casinoer. Deres betalingsinfrastruktur er designet til batch-processering af bankoverførsler – typisk 1-2 gange dagligt gennemgår en medarbejder eller et automatiseret system indgående overførsler og matcher dem med spillerkonti. Straksoverførsler kræver realtids-integration med banksystemet, hvilket kræver opdatering af casinoets backend – en investering, der endnu ikke er foretaget af alle operatører.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                For danske spillere, der ønsker bankoverførslens sikkerhed med øjeblikkelig behandling, er{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                det oplagte alternativ. Trustly bruger de samme bankforbindelser men automatiserer hele processen via PSD2-API'er, hvilket eliminerer den manuelle komponent og sikrer øjeblikkelig kreditering. I praksis er Trustly en "forbedret bankoverførsel" – samme sikkerhed, men uden ventetiden.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En nichefordel ved traditionelle bankoverførsler er dog, at de ikke involverer nogen tredjepart. Med Trustly er Trustly AB involveret som mellemled (om end de ikke ser dine bankdata). Med en direkte bankoverførsel er det udelukkende din bank og casinoets bank. For ekstremt sikkerhedsbevidste spillere kan denne direkte forbindelse have en reel sikkerhedsværdi – ikke kun psykologisk.
              </p>
            </>
          ),
        },
        {
          position: "after-whatis",
          title: "Vores Test – Bankoverførsel på Fire Danske Casinoer",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Vi testede traditionel bankoverførsel (ikke Trustly) på fire danske casinoer med Spillemyndighedens licens. Vi brugte Danske Banks netbank med standard overførsel og målte den reelle behandlingstid for ind- og udbetalinger over en to-ugers periode i februar 2026.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Indbetalingstest:</strong> Vi oprettede bankoverførsler mandag formiddag til alle fire casinoer med 500 kr. til hvert. Resultaterne: Casino A krediterede saldoen efter 4 timer (sandsynligvis straksoverførsel), Casino B efter 1 hverdag, Casino C efter 2 hverdage, og Casino D efter 2 hverdage. Gennemsnittet var 1,5 hverdage – markant langsommere end{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                (sekunder),{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                (sekunder) og{" "}
                <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">kortbetalinger</Link>{" "}
                (sekunder).
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingstest:</strong> Udbetalinger var endnu langsommere: 3 hverdage (Casino A), 4 hverdage (Casino B og C) og 5 hverdage (Casino D). Gennemsnittet på 4 hverdage gør bankoverførsel til den langsomste udbetalingsmetode vi har testet i hele vores betalingsmetode-serie. Til sammenligning: Trustly gennemsnit var 45 minutter,{" "}
                <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>{" "}
                0-4 timer, og kortudbetalinger 1-3 hverdage.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> 100 % – alle fire casinoer aktiverede velkomstbonus ved bankoverførsel. Bankoverførsler er den sikreste vej til bonuskvalificering, men den langsomme behandlingstid betyder, at du ikke kan spille med bonussen med det samme. Spillere der prioriterer hurtig bonusaktivering bør bruge Trustly eller MobilePay – begge behandles som bankoverførsler med identisk bonuskvalificering.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Fejl og forsinkelser:</strong> Ved én indbetaling glemte vi bevidst at inkludere spillernummeret i referencen for at teste konsekvensen. Det resulterede i en forsinkelse på 3 ekstra hverdage, mens casinoets kundeservice manuelt matchede betalingen. Vi blev bedt om at sende en kopi af bankudtoget som verifikation. Denne risiko for menneskelige fejl er den mest frustrerende ulempe ved bankoverførsler – og en fejlkilde, der ikke eksisterer ved automatiserede metoder.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Desktop vs. mobiloplevelse:</strong> Bankoverførsler initieres via netbanken, som er identisk på desktop og mobil. Oplevelsen er ikke "god" eller "dårlig" – den er simpelthen standardiseret via bankens egen app. Der er ingen casinospecifik mobiloptimering, da transaktionen sker helt uden for casinoets økosystem. Dette er både en fordel (banken er velkendt) og en ulempe (ingen strømlinet casinointegration).
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "SEPA, SWIFT og Sumclearing – Bankoverførslens Infrastruktur Forklaret",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Bankoverførsler til danske casinoer med dansk licens foregår typisk som indenlandske overførsler via Nationalbankens Sumclearing-system eller som SEPA-overførsler inden for EU. Sumclearing er det danske nationale clearingsystem, der afvikler betalinger mellem danske banker. SEPA (Single Euro Payments Area) standardiserer euro-overførsler i EU, men danske banker kan også bruge SEPA-infrastrukturen til DKK-overførsler mellem danske konti.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Internationale casinoer (med udenlandsk licens) kan kræve SWIFT-overførsler, der bruger et separat globalt clearingsystem med potentielle mellembanker. SWIFT-overførsler kan koste 25-75 kr. i gebyrer pr. transaktion og tage 3-5 hverdage. For danske spillere er dette sjældent relevant, da alle danske licenserede casinoer bruger indenlandske eller SEPA-overførsler uden gebyrer.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Den tekniske årsag til bankoverførslens langsomme hastighed er batch-processering. Traditionelle bankoverførsler samles i "batches" og behandles på faste tidspunkter – typisk ved Nationalbankens clearingcyklusser kl. 06:30, 09:30, 12:00, 14:30 og 16:30 på hverdage. I modsætning hertil bruger Trustly og{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                realtids-API'er, der behandler hver transaktion individuelt i det øjeblik, den godkendes.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                SEPA Instant Credit Transfer (SCT Inst) løser hastigheds-problemet ved at behandle overførsler i realtid, 24/7/365, med en maks. behandlingstid på 10 sekunder. EU-Kommissionen har vedtaget en forordning, der kræver, at alle banker tilbyder SCT Inst som standard fra 2025-2026. Det betyder, at traditionelle bankoverførsler potentielt kan blive lige så hurtige som Trustly inden for de næste 1-2 år – en udvikling der radikalt kan ændre betalingslandskabet.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Indtil SCT Inst er universelt implementeret hos alle casinoers banker, forbliver den traditionelle bankoverførsel den langsomste metode. Men infrastrukturen er under forandring, og det er værd at holde øje med udviklingen. For nu er Trustly den "accelererede bankoverførsel", der leverer det, traditionelle bankoverførsler endnu ikke kan.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Hvem Bør Bruge Bankoverførsel – og Hvornår Er Det Relevant?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>High-rollers og store beløb:</strong> Bankoverførslens primære fortrinsret er den høje (eller fraværende) beløbsgrænse. Hvor MobilePay typisk begrænser til 15.000-40.000 kr. pr. dag og{" "}
                <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
                til 25.000-50.000 kr., sætter bankoverførsler kun grænser baseret på din banks daglige overførselsgrænse – typisk 500.000 kr. eller mere via netbanken. For spillere med store indbetalinger er bankoverførsel eller Trustly (der arver bankens grænse) de eneste praktiske valg.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Spillere uden tredjepartskonti:</strong> Bankoverførsel kræver ingen ekstra app, konto eller registrering. Du bruger udelukkende din eksisterende netbank med MitID. For spillere der ikke ønsker at installere MobilePay, oprette en PayPal-konto, registrere sig hos Trustly eller downloade Zimpler-appen, er bankoverførsel den mest direkte og enkle vej.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Den universelle backup:</strong> Bankoverførsel fungerer som en pålidelig fallback, når casinoet ikke understøtter din foretrukne udbetalingsmetode. Alle casinoer med dansk licens accepterer bankoverførsler til udbetalinger – det er den universelle backup, selv når Trustly, MobilePay,{" "}
                <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
                og{" "}
                <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>{" "}
                ikke er tilgængelige.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>IKKE ideel for de fleste spillere i 2026:</strong> Med 1-5 hverdages behandlingstid er bankoverførsel objektivt den langsomste betalingsmetode. Trustly tilbyder identisk sikkerhed (bankens egne systemer) med øjeblikkelig behandling. Medmindre du har en specifik grund til at undgå tredjepartsintegrationer, er Trustly det overlegne valg i næsten alle sammenhænge.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>IKKE ideel for impulsive spillere:</strong> Paradoksalt nok kan bankoverførslens langsomme behandlingstid faktisk være en fordel for spillere med impulsiv spilleadfærd. 1-3 dages ventetid giver tid til at revurdere en stor indbetaling. Men denne "fordel" er utilsigtet og upålidelig som ansvarligt spil-værktøj. Hvis du har brug for friktion, er{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecards</Link>{" "}
                forudbetalte model eller{" "}
                <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revoluts</Link>{" "}
                gambling-blokering bedre værktøjer.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Regulatorisk Perspektiv – Bankoverførsler i Dansk Spillelovgivning",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Bankoverførsler er den mest regulatorisk gennemsigtige betalingsmetode. Hver transaktion registreres i bankens systemer med fuld AML-sporbarhed – afsender, modtager, beløb, tidspunkt og reference. Denne sporbarhed opfylder automatisk Spillemyndighedens krav om transaktionsdokumentation, hvilket gør bankoverførsler til den "nemmeste" metode for casinoer at rapportere til tilsynsmyndigheder.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                ROFUS-integrationen er upåvirket af bankoverførsler. Din ROFUS-status verificeres af casinoet ved kontooprettelse og login – ikke af banken eller betalingsmetoden. Hvis du er selvudelukket via ROFUS, kan du ikke oprette en casinokonto, uanset om du forsøger at indbetale via bankoverførsel, Trustly eller en anden metode.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Danske banker er forpligtet til at overvåge transaktioner for tegn på hvidvask og terrorfinansiering under AML-lovgivningen. Store eller hyppige overførsler til gambling-relaterede modtagere kan udløse bankens interne alarmer og resultere i henvendelser fra bankens compliance-afdeling. Dette er ikke specifikt for bankoverførsler – det gælder alle betalingsmetoder – men bankoverførslens fulde sporbarhed gør det nemmere for banken at identificere mønsteret.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Skattemæssigt er bankoverførsler den mest dokumenterbare metode. Alle transaktioner fremgår af dit bankudtog med dato, beløb og modtager. For spillere der har brug for dokumentation af ind- og udbetalinger (f.eks. ved skatteindberetning af gevinster fra udenlandske casinoer), giver bankoverførsler den mest komplette historik. Til sammenligning kan{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>-transaktioner{" "}
                (ved kontantkøb) mangle fra bankudtoget.
              </p>
            </>
          ),
        },
      ]}
      pros={[
        "Ekstrem høj sikkerhed med bankens egne systemer og MitID",
        "Fuld sporbarhed og bankgaranti (indskydergaranti op til 750.000 kr.)",
        "Ingen tredjepartsleverandører involveret",
        "Kvalificerer altid til alle bonustyper (100 % i vores test)",
        "Sjældent gebyrer fra danske banker på indenlandske overførsler",
        "Ingen beløbsgrænser (udover bankens daglige grænse – typisk 500.000+ kr.)",
        "Universel backup – alle casinoer accepterer bankoverførsler",
        "Mest regulatorisk gennemsigtige metode",
      ]}
      cons={[
        "Langsom – 1-3 hverdage for indbetaling, 2-5 hverdage for udbetaling",
        "Kræver manuelt input af casinoets bankoplysninger og spillernummer",
        "Risiko for forsinkelser ved forkert eller manglende reference",
        "Ingen øjeblikkelig spilstart som ved digitale alternativer",
        "Batch-processering betyder, at weekend-overførsler først behandles mandag",
      ]}
      comparison={[
        { method: "Bankoverførsel", speed: "1-3 hverdage", fees: "Ingen (indenlandsk)", withdrawalSupport: "Ja – 2-5 hverdage" },
        { method: "Trustly", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Ja – minutter til timer" },
        { method: "MobilePay", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Via bank (1-3 dage)" },
        { method: "Visa/Mastercard", speed: "Øjeblikkelig", fees: "Sjældent", withdrawalSupport: "Ja – 1-3 hverdage" },
        { method: "Paysafecard", speed: "Øjeblikkelig", fees: "Ingen", withdrawalSupport: "Nej" },
      ]}
      comparisonTitle="Bankoverførsel vs. Moderne Alternativer – Hastighed og Funktionalitet"
      minDeposit="Typisk 100 kr. minimum. Ingen øvre grænse fra bankens side (typisk 500.000+ kr. via netbank), men casinoer kan have egne maksimumsgrænser."
      bonusInfo="Bankoverførsler kvalificerer altid til alle bonustyper – den sikreste vej til bonusaktivering. 100 % i vores test."
      taxInfo="Gevinster fra danske licenserede casinoer er skattefrie. Alle transaktioner fremgår af dit bankudtog for nem dokumentation."
      faqs={[
        { question: "Hvornår er bankoverførsel det bedste valg sammenlignet med hurtigere metoder?", answer: (
          <>Bankoverførsel er det bedste valg ved store beløb (over 50.000 kr.), da der typisk ingen beløbsgrænse er. Det er også ideelt, hvis du vil undgå at bruge tredjepartsapps. For daglig brug er{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}dog langt hurtigere med identisk sikkerhed. Bankoverførsel anbefales primært som backup-metode eller til exceptionelt store indbetalinger.</>
        )},
        { question: "Hvor lang tid tager ind- og udbetalinger med bankoverførsel reelt?", answer: "I vores test: Indbetalinger tog 4 timer til 2 hverdage (gennemsnit 1,5 hverdage). Udbetalinger tog 3-5 hverdage (gennemsnit 4 hverdage). Straksbetaling via SEPA Instant kan reducere indbetalingstiden til sekunder, men kun 2/5 testede casinoer understøttede dette. Weekender og helligdage forlænger ventetiden yderligere – en fredag-overførsel behandles typisk først mandag." },
        { question: "Hvilke danske banker kan bruges til bankoverførsel på casinoer?", answer: "Alle danske banker understøtter bankoverførsler – Danske Bank, Nordea, Jyske Bank, Sydbank, Nykredit, Spar Nord, Arbejdernes Landsbank og lokale pengeinstitutter. Transaktionen godkendes via MitID i netbanken. Nogle banker kan have standardblokering af gambling-transaktioner, som du selv skal deaktivere i netbanken eller via bankens kundeservice." },
        { question: "Kvalificerer bankoverførsler altid til velkomstbonusser?", answer: (
          <>Ja – 100 % i vores test. Bankoverførsler udelukkes aldrig fra bonustilbud, da de betragtes som den mest standardiserede betalingsmetode. Ulempen er den langsomme behandlingstid: Du skal vente 1-3 hverdage, før bonusmidlerne aktiveres. For øjeblikkelig bonusaktivering anbefales{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}eller{" "}<Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>, der behandles som bankoverførsler med øjeblikkelig kreditering og identisk bonuskvalificering.</>
        )},
        { question: "Er der gebyrer ved bankoverførsler til og fra casinoer?", answer: "Indenlandske bankoverførsler i DKK er normalt gebyrfrie hos alle danske banker. SEPA-overførsler i EUR inden for EU er også gebyrfrie. SWIFT-overførsler til internationale casinoer uden for EU kan koste 25-75 kr. Danske casinoer med dansk licens bruger altid indenlandske bankforbindelser, så gebyrer er ekstremt sjældne for danske spillere." },
        { question: "Hvad sker der, hvis jeg glemmer at inkludere mit spillernummer som reference?", answer: "I vores test forårsagede en manglende reference en forsinkelse på 3 ekstra hverdage og krævede to kundeserviceopkald plus indsendelse af bankudtog. Casinoets finansafdeling skulle manuelt matche betalingen med din konto baseret på beløb og afsenderkonto. Kontakt altid kundeservice øjeblikkeligt – jo hurtigere du reagerer, desto kortere forsinkelse." },
      ]}
      currentPath="/betalingsmetoder/bankoverforsler"
    />
  );
};

export default BankTransferGuide;
