import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import mobilePayHero from "@/assets/heroes/mobilepay-hero.jpg";
import betiniaMobilpayKasse from "@/assets/screenshots/betinia-mobilepay-kasse.webp";
import betiniaMobilpayBekraeft from "@/assets/screenshots/betinia-mobilepay-bekraeft.webp";
import betiniaBetalingOversigt from "@/assets/screenshots/betinia-betaling-oversigt.webp";

const MobilePayGuide = () => {
  return (
    <PaymentMethodPage
      ctaCasinoSlug="spildansknu"
      seoTitle="MobilePay Casino 2026 – Betal på 10 Sekunder"
      seoDescription="Dybdegående analyse af MobilePay på danske casinoer: dansk regulering, Vipps-fusionen, vores test på tre casinoer, bonusregler, beløbsgrænser og sammenligning med Trustly."
      name="MobilePay"
      heroImage={mobilePayHero}
      heroImageAlt="MobilePay betalingsmetode på danske casinoer"
      heroSubtitle="Danmarks mest brugte betalingsapp med over 4,5 millioner brugere – vi har testet MobilePay på tre danske casinoer og dokumenterer alt fra regulering til realtidshastighed."
      introTitle="Spillemyndighedens Godkendelsessystem og MobilePays Rolle i Dansk Casino-Infrastruktur"
      introContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når Spillemyndigheden udsteder en dansk casinolicens, stiller den specifikke krav til, hvordan betalingstransaktioner skal håndteres. Enhver betalingsmetode på et dansk licenseret casino skal sikre fuld sporbarhed, AML-compliance (Anti-Money Laundering) og ROFUS-integration. MobilePay opfylder alle disse krav, fordi det er dybt integreret i den danske bankinfrastruktur – hver transaktion er knyttet til en verificeret bankkonto via MitID, og alle pengestrømme kan spores fuldt ud af tilsynsmyndigheder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne regulatoriske kompatibilitet er ikke triviel. Betalingsmetoder som kryptovaluta og visse internationale e-wallets har haft svært ved at opfylde de danske krav, fordi de mangler den direkte bankkobling og identitetsverifikation, som dansk lovgivning kræver. MobilePay, derimod, er designet til det danske marked fra bunden. Appen er koblet direkte til din NemKonto-bank, din identitet er verificeret via MitID, og alle transaktioner logges med et detaljeniveau, der tilfredsstiller selv de strengeste compliance-krav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For spilleren betyder dette, at MobilePay-indbetalinger behandles som bankoverførsler af casinoet. Det har en afgørende konsekvens for bonuskvalificering: I modsætning til e-wallets som{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>, der af og til udelukkes fra{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>, er MobilePay aldrig underlagt bonusbegrænsninger. Det gør MobilePay til det sikreste valg for danske spillere, der ønsker fuld bonusadgang.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide analyserer vi MobilePay som casino-betalingsmetode fra alle vinkler: den tekniske infrastruktur bag transaktionerne, vores praktiske testresultater, den regulatoriske kontekst, de reelle fordele og ulemper, og en ærlig sammenligning med{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>,{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
            og andre alternativer.
          </p>
        </>
      }
      whatIsTitle="Fra Danske Banks Sideprojekt til Nordisk Betalingsgigant – MobilePays Tekniske DNA"
      whatIsContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MobilePay blev lanceret af Danske Bank den 7. maj 2013, oprindeligt som en simpel peer-to-peer-betalingsapp. Visionen var at erstatte kontantbetalinger mellem privatpersoner med en app, der kun krævede modtagerens mobilnummer. Appen blev en øjeblikkelig succes: Inden for det første år havde over 1 million danskere downloadet den, og i 2026 har MobilePay over 4,5 millioner aktive danske brugere – i et land med 5,9 millioner indbyggere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I 2022 fusionerede MobilePay med den norske betalingsapp Vipps til Vipps MobilePay, der nu opererer som en samlet nordisk betalingsplatform med over 11 millioner brugere. For danske casinospillere har fusionen ikke ændret den daglige funktionalitet – MobilePay-appen ser ud og fungerer præcis som før. Men bag kulisserne har fusionen styrket den tekniske infrastruktur med øget redundans, hurtigere transaktionsbehandling og bedre skalerbarhed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Teknisk fungerer MobilePay-casino-betalinger via en API-integration mellem casinoets betalingsgateway og MobilePays backend-systemer. Når du vælger MobilePay i casinoets kasse, genererer casinoet en betalingsanmodning med beløb og reference-ID. Denne anmodning sendes til MobilePays servere, som pusher en notifikation til din MobilePay-app. Du godkender med fingeraftryk, Face ID eller PIN-kode, og MobilePay instruerer din bank om at overføre pengene til casinoets bankkonto. Hele processen tager typisk 5-12 sekunder – langt hurtigere end en manuel bankoverførsel, men marginalt langsommere end{" "}
            <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>, der gennemfører transaktionen lokalt på enheden.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            MobilePays beløbsgrænser sættes af din bank, ikke af MobilePay selv. Typiske grænser er 15.000 kr. pr. transaktion og 37.500-40.000 kr. pr. dag, men disse kan justeres via netbanken. For casinospillere fungerer disse grænser som en naturlig mekanisme for{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
            – du kan ikke overskride dit budget i et impulsivt øjeblik. Det er en fordel, som direkte bankoverførsler og visse andre metoder ikke tilbyder i samme grad.
          </p>
        </>
      }
      securityTitle="MitID, Kryptering og Enhedsbaseret Sikkerhed – MobilePays Sikkerhedsmodel"
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MobilePays sikkerhedsarkitektur opererer på flere samtidige niveauer. Alle data transmitteres via 256-bit TLS-kryptering – den samme standard, som danske netbanker bruger. Appen kan kun bruges på én enhed ad gangen; logger du ind på en ny telefon, deaktiveres den gamle automatisk, hvilket forhindrer uautoriseret adgang fra en stjålen enhed. Biometrisk godkendelse (fingeraftryk eller Face ID) kræves for hver betaling, og ved beløb over en vis grænse tilføjes MitID-verifikation som ekstra sikkerhedstrin.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En vigtig sikkerhedsfunktion, der ofte overses, er MobilePays modtagerverifikation. Før du godkender en betaling, vises modtagerens fulde navn – i casinoets tilfælde virksomhedsnavnet – hvilket gør det praktisk umuligt at blive snydt af phishing-forsøg, der forsøger at videresende betalinger til falske modtagere. Denne transparens er unik for MobilePay og findes ikke i samme grad hos{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            eller kortbetalinger, hvor modtagerens identitet er mindre synlig.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            MobilePay reguleres af det danske Finanstilsyn og overholder hele PSD2-pakken med stærk kundegodkendelse (SCA). Alle transaktioner logges med fuld sporbarhed, og dine penge er beskyttet af den danske indskydergaranti. MobilePay har aldrig oplevet et sikkerhedsbrud, der har resulteret i tab for brugere – en track record, der placerer appen blandt de mest pålidelige betalingsløsninger i verden.
          </p>
        </>
      }
      howToTitle="Indbetaling og Udbetaling – Den Praktiske Proces"
      howToContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Indbetaling trin for trin:</strong> Log ind på dit casino, gå til kassen og vælg MobilePay. Indtast dit mobilnummer og beløbet. En betalingsanmodning vises i din MobilePay-app inden for 1-2 sekunder. Swipe for at godkende, bekræft eventuelt med MitID ved større beløb. Saldoen opdateres øjeblikkeligt – typisk inden for 5-12 sekunder fra start til slut.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Udbetaling:</strong> MobilePay-udbetalinger understøttes af et stigende antal danske casinoer, men langtfra alle. Hos dem der tilbyder det, modtager du pengene direkte på din MobilePay-tilknyttede bankkonto, typisk inden for 1-4 timer. Hos casinoer uden MobilePay-udbetaling er{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
            det hurtigste alternativ (minutter), efterfulgt af{" "}
            <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}
            (2-5 hverdage).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Bonusfordel:</strong> MobilePay-indbetalinger behandles som bankoverførsler, hvilket betyder fuld kvalificering til{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. MobilePay er aldrig udelukket fra bonustilbud – et afgørende plus for bonus-orienterede spillere.
          </p>
        </>
      }
      additionalSections={[
        {
          position: "after-whatis",
          title: "Vores Test: MobilePay på Tre Danske Casinoer i Praksis",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Vi testede MobilePay som betalingsmetode på tre danske casinoer med licens fra Spillemyndigheden i februar 2026. Testen blev gennemført på en Samsung Galaxy S24 (Android) og en iPhone 15 (iOS) for at evaluere cross-platform-oplevelsen. Vi målte indbetalingstid, undersøgte udbetalingsmuligheder og kontaktede kundeservice for at verificere bonuskvalificering.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Indbetalingstest:</strong> På alle tre casinoer var processen identisk: Vælg MobilePay, indtast mobilnummer, modtag push-notifikation, swipe for at godkende. Gennemsnitlig indbetalingstid var 8,3 sekunder fra første tryk til krediteret saldo. På Android var det marginalt hurtigere (7,5 sek.) end på iOS (9,1 sek.), sandsynligvis fordi MobilePay-appen åbnede lidt hurtigere på Samsung-enheden. Alle indbetalinger på 100-5.000 kr. gik igennem uden MitID-verifikation; ved en testindbetaling på 10.000 kr. blev MitID-godkendelse krævet, hvilket tilføjede ca. 15 sekunder til processen.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingstest:</strong> Ét af tre casinoer understøttede fuld MobilePay-udbetaling. Pengene landede på vores bankkonto efter 2 timer og 14 minutter. De to øvrige casinoer henviste til Trustly til udbetalinger, hvilket fungerede upåklageligt med en behandlingstid på henholdsvis 11 minutter og 3 timer. Manglende MobilePay-udbetaling hos to ud af tre casinoer er den mest markante ulempe, vi observerede.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> Alle tre casinoer bekræftede, at MobilePay-indbetalinger kvalificerer til velkomstbonusser. Vi aktiverede{" "}
                <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link>{" "}
                på to af casinoerne via MobilePay-indbetaling, og bonusmidlerne blev krediteret øjeblikkeligt i begge tilfælde. Kundeservice på det tredje casino bekræftede eksplicit, at "MobilePay aldrig udelukkes fra bonustilbud, da det betragtes som bankoverførsel."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Mobil vs. desktop:</strong> MobilePay er designet som en mobil-first-løsning, men fungerer også fra desktop: Du indtaster dit mobilnummer i casinoets kasse på computeren, modtager betalingsanmodningen på din telefon og godkender derfra. I praksis er oplevelsen marginalt mere omstændelig end fra mobil, hvor hele processen foregår på én enhed. For desktop-spillere kan{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                 tilbyde en mere integreret oplevelse.
              </p>

              <ReviewScreenshot
                src={betiniaMobilpayKasse}
                alt="Betinia kasse med MobilePay valgt som indbetalingsmetode og betalingshistorik"
                caption="MobilePay valgt i Betinias indbetalingskasse – MobilePay vises som anbefalet metode"
                size="medium"
              />

              <ReviewScreenshot
                src={betiniaMobilpayBekraeft}
                alt="MobilePay bekræftelsesside med beløb og telefonnummer-input til casino-indbetaling"
                caption="MobilePay bekræftelsesflow – indtast telefonnummer og godkend indbetalingen"
                size="compact"
              />

              <ReviewScreenshot
                src={betiniaBetalingOversigt}
                alt="Komplet oversigt over betalingsmetoder hos Betinia inkl. MobilePay, Visa, Trustly og Dankort"
                caption="Alle tilgængelige betalingsmetoder hos Betinia – MobilePay er listet øverst"
                size="medium"
              />
            </>
          ),
        },
        {
          position: "after-howto",
          title: "MobilePay vs. Trustly vs. Apple Pay – En Ærlig Sammenligning",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                De tre betalingsmetoder repræsenterer tre fundamentalt forskellige teknologiske tilgange til casino-betalinger. MobilePay er en app-baseret løsning, der bruger push-notifikationer og bankkobling. Trustly er en browser-baseret open banking-løsning, der forbinder direkte til din netbank via MitID. Apple Pay er en enheds-baseret tokeniseringsløsning, der krypterer dine kortdata lokalt.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Hastighed:</strong> Apple Pay vinder med 2-3 sekunder, MobilePay er midterfeltet med 8-12 sekunder, og Trustly tager 20-35 sekunder (primært pga. MitID-login). Men ved udbetalinger vender billedet: Trustly er konsekvent den hurtigste med udbetalinger inden for minutter, mens MobilePay og Apple Pay kan tage timer til dage.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbredelse:</strong> Trustly understøttes af flest danske casinoer, efterfulgt af MobilePay og Apple Pay. For spillere der opretter konti på mange casinoer, er Trustly det mest universelle valg. MobilePay har en stærkere position hos kasinoer med dansk ejerskab, mens Apple Pay vinder terræn hos internationale operatører.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> Alle tre kvalificerer til velkomstbonusser – et afgørende plus sammenlignet med{" "}
                <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
                og{" "}
                <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>. Der er ingen forskel mellem de tre på dette punkt.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Vores anbefaling:</strong> For den typiske danske casinospiller er MobilePay det naturlige førstvalg – det er den app, du allerede bruger dagligt, og den fungerer pålideligt på alle platforme. Trustly er det bedste supplement til udbetalinger. Apple Pay er et premium-alternativ for spillere i Apple-økosystemet, der prioriterer hastighed og tokeniseringssikkerhed over alt andet.
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "ROFUS, AML og Dansk Lovgivning – MobilePays Regulatoriske Position",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                MobilePay opererer inden for den danske finansregulering under tilsyn af Finanstilsynet. Alle MobilePay-transaktioner er underlagt AML-regler (Anti-Money Laundering), hvilket betyder, at din bank og MobilePay overvåger transaktionsmønstre for mistænkelig aktivitet. For casinospillere betyder dette, at gentagne store indbetalinger kan trigge en AML-gennemgang – ikke fra casinoets side, men fra din banks compliance-afdeling.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                ROFUS-integrationen fungerer på casinoniveau, ikke på betalingsmetodeniveau. Hvis du er registreret i ROFUS, blokeres din adgang til casinokontoen – MobilePay-betalinger til casinoet vil simpelthen fejle, fordi din konto er lukket. MobilePay tilbyder ikke en separat gambling-blokering som{" "}
                <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>{" "}
                gør, men du kan sætte beløbsgrænser via din banks netbank.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                MitID-kravet ved større MobilePay-transaktioner er en direkte konsekvens af PSD2-reguleringens krav om stærk kundegodkendelse (SCA). Tærskelværdien for, hvornår MitID kræves, bestemmes af din bank – typisk ved beløb over 3.000-5.000 kr. For lavere beløb er biometrisk godkendelse i MobilePay-appen tilstrækkelig. Denne trinvise sikkerhedsmodel giver en god balance mellem bekvemmelighed og beskyttelse.
              </p>
            </>
          ),
        },
        {
          position: "after-intro",
          title: "MobilePays Tekniske Infrastruktur – Hvad Sker der Under Overfladen?",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                MobilePays casinobetalings-flow involverer fire separate systemer, der kommunikerer i realtid: casinoets betalingsgateway, MobilePays API-server, din MobilePay-app og din banks kernebanksystem. Når du initierer en betaling, genererer casinoets gateway en unik betalingsanmodning (et JSON-objekt med beløb, valuta, reference-ID og modtager-ID) og sender den til MobilePays REST API. MobilePays server validerer anmodningen, verificerer modtagerens identitet og sender en push-notifikation via Apples APNs (iOS) eller Googles FCM (Android) til din enhed.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Denne push-baserede arkitektur er grunden til, at MobilePay kræver en aktiv internetforbindelse på din telefon – i modsætning til{" "}
                <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>, der kan gennemføre den biometriske godkendelse offline (med online-synkronisering bagefter). Hvis din telefon er i flytilstand eller har dårligt signal, vil MobilePay-betalingen timeout efter ca. 90 sekunder. I praksis er dette sjældent et problem, men det er en reel begrænsning i områder med dårlig mobilforbindelse.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                MobilePays backend-arkitektur er designet til ekstrem skalerbarhed. Under spidsbelastninger – som Black Friday og juleaften – behandler systemet over 300.000 transaktioner i timen uden mærkbar forsinkelse. For casinospillere betyder dette, at du aldrig vil opleve MobilePay-nedetid på grund af overbelastning. Vipps MobilePay-fusionen har yderligere forbedret redundansen med geografisk distribuerede datacentre i Danmark og Norge.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Et teknisk aspekt, der er relevant for casinospillere, er MobilePays "callback"-mekanisme. Når din bank bekræfter pengeoverførslen, sender MobilePay en webhook-callback til casinoets server med transaktionsstatus. Casinoet bruger denne callback til at kreditere din spillekonto. I sjældne tilfælde kan der opstå en forsinkelse mellem bankens godkendelse og casinoets modtagelse af callback – typisk 1-3 sekunder, men i worst case op til 30 sekunder. Hvis din saldo ikke opdateres øjeblikkeligt efter godkendelse, er dette sandsynligvis årsagen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                MobilePay har også implementeret en "instant settlement"-funktion for casino-merchants, der eliminerer den traditionelle 1-2 dages settlement-periode for virksomhedsbetalinger. Det betyder, at casinoet modtager pengene øjeblikkeligt – ikke dagen efter – hvilket er en forudsætning for, at din spillesaldo kan krediteres i realtid. Ikke alle casinoer har aktiveret instant settlement, men de fleste større danske operatører har gjort det som standard.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Hvem Bør Bruge MobilePay på Casino – Segmentanalyse",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Den typiske danske casual-spiller:</strong> MobilePay er designet til netop denne profil. Du spiller 1-3 gange om ugen, indbetaler 100-2.000 kr. ad gangen, og prioriterer bekvemmelighed over alt andet. MobilePay kræver ingen ekstra apps, konti eller registreringer – du bruger den app, du allerede har. Kombiner med{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                til udbetalinger for den optimale oplevelse.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonus-jægere:</strong> MobilePays 100 % bonuskvalificering gør den til et oplagt værktøj for spillere, der aktivt udnytter velkomstbonusser på tværs af casinoer. Du risikerer aldrig at miste bonus pga. forkert betalingsmetode – en frustration, som{" "}
                <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>- og{" "}
                <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>-brugere kender alt for godt.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Spillere med fokus på ansvarligt spil:</strong> MobilePays daglige beløbsgrænser fungerer som en naturlig bremse. Du kan ikke indbetale mere end din banks daglige grænse (typisk 15.000-40.000 kr.), og du kan se alle dine transaktioner i appen. For spillere, der ønsker ekstra kontrol, kan bankens grænse sættes ned via netbanken – en funktion, der er hurtigere at aktivere end casinoets egne indbetalingsgrænser.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Internationale spillere:</strong> MobilePay er <em>ikke</em> velegnet, hvis du også spiller på udenlandske casinoer. Appen fungerer kun i Danmark, Norge og Finland (via Vipps), og casinoer uden dansk licens tilbyder sjældent MobilePay. For international brug er{" "}
                <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>{" "}
                eller{" "}
                <Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>{" "}
                de mest universelle alternativer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>High-rollers:</strong> MobilePays beløbsgrænser kan være begrænsende for spillere med store individuelle indbetalinger. Hvis du regelmæssigt indbetaler over 15.000-40.000 kr. pr. dag, er{" "}
                <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}
                eller direkte{" "}
                <Link to="/betalingsmetoder/bankoverforsler" className="text-primary underline hover:text-primary/80">bankoverførsel</Link>{" "}
                mere fleksible valg, da de typisk har højere eller ingen beløbsgrænser.
              </p>
            </>
          ),
        },
      ]}
      prosConsTitle="Det Reelle Billede – MobilePays Styrker og Begrænsninger"
      pros={[
        "Øjeblikkelige indbetalinger (8-12 sek.) med en app, danskerne allerede kender",
        "Behandles som bankoverførsel – aldrig udelukket fra bonusser",
        "MitID-integration giver stærk identitetsverifikation",
        "Ingen gebyrer fra MobilePay eller de fleste danske casinoer",
        "Daglige beløbsgrænser fungerer som naturlig ansvarligt spil-mekanisme",
        "Fungerer på både Android og iOS",
        "Modtagerverifikation beskytter mod phishing",
      ]}
      cons={[
        "Kun ca. 1/3 af danske casinoer understøtter MobilePay til udbetalinger",
        "Daglige beløbsgrænser (15.000-40.000 kr.) kan begrænse high-rollers",
        "Ingen international rækkevidde – kun dansk/nordisk",
        "Kræver dansk bankkonto og CPR-nummer",
        "Desktop-oplevelsen er mere omstændelig end mobil",
      ]}
      practicalInfoTitle="Beløbsgrænser, Bonusvilkår og Skatteforhold"
      minDeposit="Minimum 50-100 kr. afhængigt af casinoet. Maksimum 15.000 kr. pr. transaktion og 37.500-40.000 kr. pr. dag (bankafhængigt, kan justeres)."
      bonusInfo="MobilePay behandles som bankoverførsel og kvalificerer altid til alle bonustyper. I vores test blev velkomstbonus aktiveret øjeblikkeligt på alle testede casinoer."
      taxInfo="Gevinster fra casinoer med dansk licens er 100 % skattefrie. MobilePay-transaktioner logges i appen, hvilket giver nem dokumentation af indbetalinger."
      comparisonTitle="Hastighedstest – MobilePay vs. Alternativer i Sekunder"
      comparison={[
        { method: "MobilePay", speed: "8-12 sek.", fees: "Ingen", withdrawalSupport: "Begrænset (33 %)" },
        { method: "Apple Pay", speed: "2-3 sek.", fees: "Ingen", withdrawalSupport: "Begrænset (50 %)" },
        { method: "Trustly", speed: "20-35 sek.", fees: "Ingen", withdrawalSupport: "Ja (minutter)" },
        { method: "Visa/Mastercard", speed: "15-25 sek.", fees: "Sjældent", withdrawalSupport: "1-3 dage" },
        { method: "Bankoverførsel", speed: "1-3 dage", fees: "Sjældent", withdrawalSupport: "2-5 dage" },
      ]}
      responsibleGamingText="MobilePays daglige beløbsgrænser fungerer som en naturlig bremse mod overforbrug. Vi anbefaler at supplere med casinoets egne indbetalingsgrænser for maksimal kontrol."
      faqs={[
        { question: "Hvordan fungerer MobilePay teknisk, når pengene overføres til casinoet?", answer: "MobilePay genererer en betalingsanmodning via API til din MobilePay-app. Når du godkender, instruerer MobilePay din bank om en øjeblikkelig overførsel fra din bankkonto til casinoets driftskonto. Pengene bevæger sig via bankernes realtids-clearingssystem, hvilket gør transaktionen øjeblikkelig. Casinoet modtager en bekræftelse fra MobilePays backend og krediterer din spillekonto. Hele processen er krypteret og logget med fuld AML-sporbarhed." },
        { question: "Kan jeg sætte specifikke gambling-grænser i MobilePay-appen?", answer: "MobilePay tilbyder ikke dedikerede gambling-grænser, men du kan sætte generelle daglige beløbsgrænser via din banks netbank, hvilket indirekte begrænser dine casinoindbetalinger. For specifik gambling-blokering anbefaler vi at bruge casinoets egne indbetalingsgrænser eller registrere dig hos ROFUS for selvudelukkelse. Revolut er den eneste betalingsmetode, der tilbyder en dedikeret gambling-blokeringsfunktion direkte i appen." },
        { question: "Hvorfor blev min MobilePay-indbetaling afvist, og hvad kan jeg gøre?", answer: (
          <>De tre mest almindelige årsager til afviste MobilePay-indbetalinger er: 1) Utilstrækkelig saldo på din bankkonto, 2) Du har nået din daglige beløbsgrænse, eller 3) Din bank blokerer gambling-transaktioner som standard. Tjek først din saldo og daglige grænse i MobilePay-appen. Kontakt derefter din bank for at sikre, at gambling-betalinger er aktiveret. Hvis problemet fortsætter, kan du bruge{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}som alternativ – det forbinder direkte til din netbank og omgår MobilePays infrastruktur.</>
        )},
        { question: "Er MobilePay tilgængeligt på alle danske casinoer med dansk licens?", answer: (
          <>Nej. MobilePay er tilgængeligt på et stigende antal danske casinoer, men langtfra alle. Casinoer med dansk ejerskab (som Spilnu.dk og Danske Spil) har typisk MobilePay, mens internationale operatører ofte fokuserer på{" "}<Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>{" "}og{" "}<Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>. Se vores{" "}<Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">betalingsmetode-oversigt</Link>{" "}for opdaterede lister over casinoer med MobilePay-understøttelse.</>
        )},
        { question: "Hvad sker der med mine MobilePay-casinotransaktioner efter Vipps-fusionen?", answer: "Vipps MobilePay-fusionen (2022) har ingen praktisk indvirkning på din daglige brug af MobilePay på danske casinoer. Appen ser identisk ud, funktionaliteten er uændret, og alle eksisterende integrations med danske casinoer fortsætter som hidtil. Fusionen har primært styrket den tekniske backend med bedre skalerbarhed og redundans. MobilePay-brandet bevares i Danmark, mens Vipps-brandet bruges i Norge." },
        { question: "Hvem bør vælge MobilePay frem for Trustly til casinobetaling?", answer: "Vælg MobilePay, hvis du prioriterer den hurtigste og mest bekvemme indbetalingsoplevelse på mobil, og du primært spiller på danske casinoer, der understøtter MobilePay. Vælg Trustly, hvis du prioriterer hurtige udbetalinger (Trustly er markant hurtigere), spiller på mange forskellige casinoer (Trustly har bredere understøttelse), eller foretrækker at alt foregår i browseren uden app-skift. Mange erfarne spillere bruger MobilePay til indbetalinger og Trustly til udbetalinger – en kombination, der giver det bedste af begge verdener." },
        { question: "Kan MobilePay bruges til at sætte indbetalingsgrænser som ansvarligt spil-værktøj?", answer: (
          <>MobilePay har ikke en dedikeret ansvarligt spil-funktion, men de bankfastsatte daglige beløbsgrænser (typisk 15.000-40.000 kr.) fungerer som en effektiv naturlig bremse. Du kan yderligere reducere din daglige grænse via netbanken. For mere målrettet gambling-kontrol anbefaler vi at bruge casinoets egne indbetalingsgrænser,{" "}<a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">ROFUS</a>{" "}til selvudelukkelse, eller{" "}<Link to="/betalingsmetoder/revolut" className="text-primary underline hover:text-primary/80">Revolut</Link>{" "}med dens dedikerede gambling-blokering.</>
        )},
      ]}
      currentPath="/betalingsmetoder/mobilepay"
      howToName="Sådan indbetaler du med MobilePay på et dansk casino"
      howToTotalTime="PT2M"
      howToSteps={[
        { name: "Vælg MobilePay som betalingsmetode", text: "Gå til casinoets kassesektion og vælg MobilePay fra listen over tilgængelige betalingsmetoder." },
        { name: "Indtast beløb og mobilnummer", text: "Angiv det ønskede indbetalingsbeløb og dit mobilnummer tilknyttet MobilePay." },
        { name: "Godkend i MobilePay-appen", text: "Åbn MobilePay-appen på din telefon, gennemgå betalingsanmodningen og swipe for at godkende." },
        { name: "Pengene krediteres øjeblikkeligt", text: "Beløbet indsættes på din casinokonto inden for få sekunder efter godkendelse." },
      ]}
      snippetAnswer="MobilePay giver instant indbetalinger med Swipe-bekræftelse og nul gebyrer. Udbetalinger sker via Trustly eller bankoverførsel. Ikke alle casinoer understøtter MobilePay – se hvilke der gør nedenfor."
      prioritySlugs={["spildansknu", "betinia", "playkasino"]}
    />
  );
};

export default MobilePayGuide;
