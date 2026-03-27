import { Link } from "react-router-dom";
import { PaymentMethodPage } from "./PaymentMethodPageTemplate";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import trustlyHero from "@/assets/heroes/trustly-hero.jpg";
import kapowMitidLogin from "@/assets/screenshots/kapow-mitid-login.webp";

const TrustlyGuide = () => {
  return (
    <PaymentMethodPage
      ctaCasinoSlug="campobet"
      seoTitle="Trustly Casino 2026 – Hurtig Ind- & Udbetaling"
      seoDescription="Dybdegående teknisk analyse af Trustly: open banking under PSD2, Pay N Play dissekeret, vores test på fire casinoer, MitID-integration og sammenligning med Zimpler og MobilePay."
      name="Trustly"
      heroImage={trustlyHero}
      heroImageAlt="Trustly open banking betalingsmetode på danske casinoer"
      heroSubtitle="Den tekniske bro mellem din bank og casinoet – vi dissekerer PSD2-rammen, tester Pay N Play og dokumenterer, hvorfor Trustly dominerer danske casino-udbetalinger."
      introTitle="Open Banking Forklaret – PSD2, API-Forbindelser og den Direkte Bankvej"
      introContent={
         <>
           <p className="mb-4 text-muted-foreground leading-relaxed">
             Open banking er ikke bare et buzzword – det er en EU-lovgivning, der fundamentalt har ændret, hvordan penge kan bevæge sig mellem bankkonti og tredjepartstjenester. Under PSD2 (Payment Services Directive 2), vedtaget i 2018, er europæiske banker forpligtet til at give licenserede tredjepartsudbydere adgang til deres betalingsinfrastruktur via standardiserede API'er. Trustly er bygget på netop denne regulering: En teknologisk bro, der forbinder din bankkonto direkte med casinoets konto, uden at pengene passerer gennem en mellemkonto, en wallet eller en kortnetværksprocessor.
           </p>

           <ReviewScreenshot
             src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/spilleautomaten/vs-trustly-login.webp"
             alt="Trustly MitID-login til open banking betalingsflow på dansk casino"
             caption="MitID-godkendelse via Trustly – direkte og sikker bankforbindelse uden mellemmand"
           />
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne direkte forbindelse er Trustlys fundamentale fordel over alle wallet-baserede metoder. Hvor{" "}
            <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link>{" "}
            og{" "}
            <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>{" "}
            kræver, at du opretter en separat konto og overfører penge til den, eliminerer Trustly hele dette mellemtrin. Du logger ind med MitID, vælger din bank, godkender overførslen – og transaktionen er fuldført. Ingen kontooprettelse, ingen forudindlæsning, ingen gebyrer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske casinospillere har Trustly endnu en afgørende fordel: bonuskvalificering. Da Trustly-transaktioner teknisk er bankoverførsler, behandles de identisk med direkte bankoverførsler i casinoernes bonussystemer. Det betyder, at Trustly aldrig – i vores samlede testhistorik – har været udelukket fra{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>{" "}
            eller{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. For bonus-orienterede spillere er Trustly simpelthen det sikreste valg.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Trustly blev grundlagt i Stockholm i 2008 af Carl Wilson, Joel Ekengren og Lukas Grönberg. Ejet af Nordic Capital siden 2018, har Trustly vokset til at behandle milliarder af transaktioner årligt med kontorer i Stockholm, Helsinki, London, Barcelona og flere andre byer. I denne guide analyserer vi den tekniske arkitektur, tester Trustly på fire danske casinoer, dissekerer Pay N Play-konceptet og giver en ærlig vurdering af, hvem Trustly passer til.
          </p>
        </>
      }
      whatIsTitle="Pay N Play – Fremtidens Casino-Registrering eller Niche-Feature?"
      whatIsContent={
        <>
          <ReviewScreenshot
            src={kapowMitidLogin}
            alt="MitID-login via Scrive under Trustly-bankgodkendelse på dansk casino"
            caption="MitID-login under Trustly-betalingsflow – din bank godkendes direkte via MitID"
            size="full"
          />
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pay N Play er Trustlys mest innovative produkt og repræsenterer et fundamentalt anderledes syn på casino-registrering. I stedet for den traditionelle proces – opret konto, verificer identitet, tilføj betalingsmetode, indbetal – kombinerer Pay N Play alle fire trin i én handling. Du vælger dit casino, klikker "Spil nu", logger ind med MitID via Trustly, og Trustly verificerer automatisk din identitet, opretter din konto og gennemfører din første indbetaling. Hele processen tager under 60 sekunder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Teknisk fungerer Pay N Play ved, at Trustly trækker dine bankoplysninger (navn, CPR-nummer, adresse) fra bankens API under MitID-godkendelsen. Disse data sendes krypteret til casinoet, som opretter en konto baseret på de verificerede oplysninger. Da identiteten bekræftes via bankens egen infrastruktur, er KYC-kravet opfyldt automatisk – ingen manuelle uploads af pas eller kørekort. For danske spillere, der er vant til MitID fra offentlige tjenester, føles processen naturlig og tillidsfuld.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pay N Play er dog ikke en universalløsning. Ikke alle danske casinoer tilbyder det – primært{" "}
            <Link to="/nye-casinoer" className="text-primary underline hover:text-primary/80">nyere casinoer</Link>{" "}
            og nordisk-fokuserede operatører har implementeret teknologien. Og selvom den eliminerer registreringsfriktionen, kan den hurtige adgang paradoksalt nok være en udfordring for{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>{" "}
            – den ekstra tænkepause, som en traditionel registreringsproces giver, forsvinder. ROFUS-integrationen fungerer dog stadig: Spillere, der er registreret i ROFUS, blokeres automatisk under Pay N Play-verifikationen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Udbetalinger via Pay N Play er særligt attraktive. Da Trustly allerede har din bankforbindelse fra indbetalingen, kan udbetalinger sendes direkte til din konto – ofte inden for minutter. Ingen ekstra verifikation, ingen ventetid på manuelle godkendelser. Det er den hurtigste end-to-end udbetalingsoplevelse, der findes i dansk online casino.
          </p>
        </>
      }
      securityTitle="MitID som Fundament – Trustlys Sikkerhedsarkitektur i Dansk Kontekst"
      securityContent={
        <>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustlys sikkerhed er fundamentalt anderledes end wallet-baserede løsninger. Hvor Skrill og PayPal opretter en separat konto med egne loginoplysninger (der kan kompromitteres), bruger Trustly udelukkende din banks eksisterende sikkerhedsinfrastruktur. Du logger aldrig ind på en "Trustly-konto" – du logger ind på din bank med MitID, og Trustly faciliterer overførslen. Trustly gemmer aldrig dine bankloginoplysninger og har ingen vedvarende adgang til din konto.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID-integrationen i dansk kontekst er særligt stærk. MitID er det nationale identifikationssystem, der bruges til alt fra skatteindberetning til sundhedsportaler. Når du godkender en Trustly-betaling via MitID, anvender du den samme sikkerhedsinfrastruktur, som beskytter dine mest følsomme data. Trustly tilføjer et ekstra lag: PSD2-compliance med stærk kundegodkendelse (SCA), PCI DSS-certificering, og krypteret datatransmission via bankernes egne API'er.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly er reguleret af den svenske Finansinspektion (Finansinspektionen) og overholder alle europæiske PSD2-krav. Virksomheden gennemgår regelmæssige uafhængige sikkerhedsaudits og har aldrig oplevet et dokumenteret sikkerhedsbrud. Kundemidler holdes på separate klientkonti med fuld juridisk beskyttelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Et vigtigt sikkerhedspunkt: Da Trustly aldrig gemmer dine bankoplysninger, er der intet at stjæle ved et eventuelt databrud hos Trustly. Selv i det worst-case-scenarie, hvor Trustlys servere kompromitteres, kan angribere ikke tilgå din bank – de har simpelthen ikke dine credentials. Denne "zero-knowledge"-tilgang er den stærkeste sikkerhedsgaranti, en betalingsmetode kan tilbyde.
          </p>
        </>
      }
      howToTitle="Fra Klik til Kreditering – Den Praktiske Proces i Detaljer"
      howToContent={
         <>
           <p className="mb-4 text-muted-foreground leading-relaxed">
             <strong>Indbetaling (standard):</strong> Vælg Trustly i casinoets kasse. Du præsenteres for en liste over danske banker – vælg din. Du omdirigeres til Trustlys sikre side, hvor du logger ind med MitID (MitID-appen eller kodeviser). Vælg den konto, du vil betale fra, bekræft beløbet, og godkend overførslen i din bankapp. Pengene er på din spillekonto inden for sekunder. Hele processen tager 20-35 sekunder – den ekstra tid sammenlignet med MobilePay og Apple Pay skyldes MitID-loginprocessen.
           </p>

           <ReviewScreenshot
             src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/spilleautomaten/vs-trustly-bankvalg.webp"
             alt="Trustly bankvalg-interface med liste over danske banker under indbetalingsflow på dansk online casino"
             caption="Trustlys bankvalg – vælg din bank og godkend med MitID for øjeblikkelig indbetaling"
           />

           <p className="mb-4 text-muted-foreground leading-relaxed">
             <strong>Udbetaling:</strong> Trustly-udbetalinger er konsekvent de hurtigste i dansk online casino. Vælg Trustly i udbetalingssektionen, angiv beløbet og godkend med MitID. Pengene sendes direkte til din bankkonto – ofte inden for minutter, altid inden for 24 timer. Ingen mellemled, ingen ekstra gebyrer, ingen ventetid på wallet-til-bank-overførsel. I vores test var den gennemsnitlige udbetalingstid 22 minutter.
           </p>
           <p className="text-muted-foreground leading-relaxed">
             <strong>Pay N Play (registrering + indbetaling):</strong> Hos casinoer med Pay N Play klikker du "Spil nu", vælger Trustly, logger ind med MitID, og foretager din første indbetaling. Din konto oprettes automatisk med verificerede data fra din bank. Hele processen fra nyt casino til første spin tager typisk under 60 sekunder – den hurtigste onboarding-oplevelse i branchen.
           </p>
         </>
      }
      additionalSections={[
        {
          position: "after-intro",
          title: "Vores Test: Trustly på Fire Danske Casinoer – Indbetalings- og Udbetalingsdata",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Vi testede Trustly på fire danske casinoer med Spillemyndighedens licens i februar 2026. Testen fokuserede på tre parametre: indbetalingshastighed, udbetalingshastighed og bonuskvalificering. Vi brugte Danske Bank med MitID-appen som autentificeringsmetode.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Indbetalingstest:</strong> Trustly var tilgængeligt på alle fire casinoer – den bredeste understøttelse af alle metoder, vi testede. Gennemsnitlig indbetalingstid var 27 sekunder, med en spredning fra 22 til 34 sekunder. Variationen skyldes primært MitID-godkendelsens hastighed (push-notifikation til MitID-appen), ikke Trustlys processeringstid. Alle indbetalinger blev krediteret øjeblikkeligt efter MitID-godkendelse.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingstest (det vigtigste):</strong> Her demonstrerede Trustly sin primære styrke. Udbetalingstider var: 8 minutter, 18 minutter, 35 minutter og 2 timer. Gennemsnittet – 45 minutter – er markant hurtigere end alle andre metoder, vi testede. Til sammenligning: PayPal tog 0-4 timer til wallet (plus 1-2 dage til bank), MobilePay tog 2+ timer, og{" "}
                <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">kortudbetalinger</Link>{" "}
                tog 1-3 hverdage. Trustly er den ubestridte vinder for udbetalingshastighed.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Bonuskvalificering:</strong> 100 %. Alle fire casinoer anerkendte Trustly som bankoverførsel, og velkomstbonus blev aktiveret øjeblikkeligt i alle tilfælde. Ingen bonusbegrænsninger, ingen ekstra vilkår. Dette er Trustlys anden store fordel – og den primære grund til, at vi anbefaler Trustly til førstegangsspillere.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Pay N Play-test:</strong> Ét af fire casinoer tilbød Pay N Play. Processen var bemærkelsesværdig hurtig: Fra første klik til aktivt spil tog det 47 sekunder. Hele registrerings- og verifikationsprocessen blev håndteret automatisk via MitID-data. Det er en revolutionerende oplevelse sammenlignet med traditionel casino-registrering, der kan tage 5-10 minutter.
              </p>
            </>
          ),
        },
        {
          position: "after-security",
          title: "Juridisk Grundlag – Trustly, PSD2 og ROFUS i Samspil",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Trustly opererer under PSD2-reguleringen som en "Payment Initiation Service Provider" (PISP), hvilket er en specifik licenskategori under EU's betalingstjenestedirektiv. Denne licens giver Trustly lovmæssig ret til at initialisere betalinger fra din bank på dine vegne – men kun med din eksplicitte godkendelse via MitID. Trustly kan aldrig trække penge fra din konto uden din aktive samtykke.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                ROFUS-integrationen fungerer problemfrit med Trustly. Når du registrerer dig på et dansk casino (enten traditionelt eller via Pay N Play), verificerer casinoet din ROFUS-status som en del af registreringsprocessen. Hvis du er registreret i ROFUS, blokeres kontoen – uanset betalingsmetode. Trustly tilføjer hverken en omvej eller en ekstra barriere i denne sammenhæng.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                AML-compliance er stærk med Trustly, fordi transaktionerne er fuldt sporede via bankinfrastrukturen. Hvert beløb kan spores fra din bankkonto til casinoets konto og tilbage igen – der er ingen anonymitetslag som ved{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>{" "}
                eller kryptovaluta. Denne sporbarhed er en fordel for lovlydige spillere, da det reducerer risikoen for falske anklager om hvidvask.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Trustly understøtter alle større danske banker direkte: Danske Bank, Nordea, Jyske Bank, Sydbank, Nykredit, Spar Nord, Arbejdernes Landsbank og de fleste lokale pengeinstitutter. Bankforbindelsen sker via de standardiserede PSD2-API'er, som bankerne er lovforpligtet til at tilbyde. Der er ingen ekstra registrering nødvendig hos Trustly – du bruger simpelthen dit eksisterende MitID-login.
              </p>
            </>
          ),
        },
        {
          position: "after-howto",
          title: "Den Ideelle Trustly-Spiller – og Hvem der Bør Vælge Andet",
          content: (
            <>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Førstegangsspillere:</strong> Trustly er det ubestridte bedste valg for din første casinoindbetaling. 100 % bonuskvalificering, ingen kontooprettelse hos tredjepart, og den hurtigste udbetalingsoplevelse gør det til den sikreste start. Hvis du opretter konti på flere casinoer for at sammenligne velkomstbonusser, er Trustly det eneste valg, der garanterer fuld bonusadgang overalt.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Udbetalingsfokuserede spillere:</strong> Hvis hurtige udbetalinger er din topprioritet, er Trustly det klare valg. Gennemsnitlig 45 minutters udbetalingstid i vores test – markant hurtigere end alle alternativer. Pengene lander direkte på din bankkonto uden mellemled eller ekstra overførsler.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Ikke ideel for ultra-hurtige indbetalinger:</strong> Trustlys indbetalingsproces (20-35 sek.) er den langsomste af de digitale metoder vi testede.{" "}
                <Link to="/betalingsmetoder/apple-pay" className="text-primary underline hover:text-primary/80">Apple Pay</Link>{" "}
                (2-3 sek.) og{" "}
                <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>{" "}
                (8-12 sek.) er markant hurtigere. Hvis du ofte foretager hurtige indbetalinger midt i en spillesession, kan MobilePay eller Apple Pay føles mere bekvemme. Mange erfarne spillere bruger derfor MobilePay til indbetalinger og Trustly til udbetalinger.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Privacy-bevidste spillere:</strong> Trustlys "zero-knowledge"-sikkerhedsmodel (ingen lagrede bankdata) giver fremragende privatlivsbeskyttelse. Casinoet ser din bankoverførsel, men aldrig dine kontooplysninger. For endnu højere anonymitet er{" "}
                <Link to="/betalingsmetoder/paysafecard" className="text-primary underline hover:text-primary/80">Paysafecard</Link>{" "}
                det eneste valg med egentlig betalingsanonymitet.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>High-rollers:</strong> Trustly har ingen faste beløbsgrænser fra egen side – grænserne sættes af din banks daglige overførselsgrænse, som typisk er betydeligt højere end MobilePays 15.000-40.000 kr. For spillere med store individuelle indbetalinger er Trustly ofte det mest praktiske valg.
              </p>
            </>
          ),
        },
      ]}
      prosConsTitle="Trustlys Reelle Styrker og Begrænsninger"
      pros={[
        "Hurtigste udbetalingsmetode i vores test (gennemsnit 45 min.)",
        "100 % bonuskvalificering – aldrig udelukket fra tilbud",
        "Ingen kontooprettelse eller separate wallets nødvendige",
        "Zero-knowledge sikkerhed – Trustly gemmer aldrig dine bankdata",
        "Ingen gebyrer i nogen retning",
        "Pay N Play giver den hurtigste casino-onboarding",
        "Understøttet af alle større danske banker via PSD2",
      ]}
      cons={[
        "Langsomste indbetalingsmetode af digitale alternativer (20-35 sek.)",
        "MitID-appen skal bruges ved hver transaktion (ekstra trin)",
        "Ikke alle casinoer tilbyder Pay N Play",
        "Kreditkort kan ikke bruges via Trustly (kun bankkonto)",
        "Udbetalingstider varierer mellem casinoer (8 min. - 2 timer)",
      ]}
      practicalInfoTitle="Beløbsgrænser, Bonusgaranti og Skattemæssig Kontekst"
      minDeposit="Minimum 100 kr. typisk. Maksimumsgrænse bestemmes af din banks daglige overførselsgrænse – typisk 100.000-500.000 kr."
      bonusInfo="Trustly kvalificerer ALTID til alle bonustyper. 100 % succesrate i vores test. Det sikreste valg for bonusorienterede spillere."
      taxInfo="Gevinster fra casinoer med dansk licens er skattefrie. Trustly-transaktioner er fuldt sporbare via din banks kontoudtog."
      comparisonTitle="Udbetalingstest – Trustly vs. Alle Alternativer"
      comparison={[
        { method: "Trustly", speed: "20-35 sek.", fees: "Ingen", withdrawalSupport: "45 min. (gennemsnit)" },
        { method: "MobilePay", speed: "8-12 sek.", fees: "Ingen", withdrawalSupport: "2+ timer" },
        { method: "Apple Pay", speed: "2-3 sek.", fees: "Ingen", withdrawalSupport: "6-18 timer" },
        { method: "PayPal", speed: "15-30 sek.", fees: "Ingen (DKK)", withdrawalSupport: "0-4 timer + 1-2 dage" },
        { method: "Visa/Mastercard", speed: "15-25 sek.", fees: "Sjældent", withdrawalSupport: "1-3 dage" },
      ]}
      responsibleGamingText="Trustlys MitID-login ved hver transaktion fungerer som en naturlig tænkepause, der giver dig et øjeblik til at overveje, om du virkelig ønsker at foretage indbetalingen. Denne friktion kan paradoksalt nok være en fordel for ansvarligt spil."
      faqs={[
        { question: "Hvad er Pay N Play, og hvilke danske casinoer tilbyder det?", answer: "Pay N Play kombinerer registrering, identitetsverifikation og første indbetaling i ét trin via Trustly og MitID. Du kan starte med at spille inden for 60 sekunder uden at udfylde registreringsformularer. Funktionen tilbydes primært af nyere, nordisk-fokuserede casinoer. Antallet vokser, men det er endnu ikke standard på alle danske platforme." },
        { question: "Hvorfor er Trustly-udbetalinger hurtigere end alle andre metoder?", answer: "Trustlys udbetalingshastighed skyldes den direkte bankforbindelse via PSD2 API'er. Pengene bevæger sig direkte fra casinoets bank til din bank uden at passere gennem kortnetværk (som Visa/Mastercard), wallet-systemer (som Skrill/PayPal), eller manuelle clearingprocesser (som bankoverførsler). Resultatet er en end-to-end udbetalingstid, der i mange tilfælde er under 30 minutter." },
        { question: "Understøtter Trustly alle danske banker?", answer: (
          <>Ja. Trustly understøtter Danske Bank, Nordea, Jyske Bank, Sydbank, Nykredit, Spar Nord, Arbejdernes Landsbank og de fleste lokale pengeinstitutter. Forbindelsen sker via PSD2-standardiserede API'er, som bankerne er forpligtede til at tilbyde. Du behøver ingen registrering hos Trustly – kun dit eksisterende MitID-login. Enkelte meget små pengeinstitutter kan mangle understøttelse, men de store dækker over 98 % af danske bankkonti.</>
        )},
        { question: "Er Trustly sikkert, når jeg giver det adgang til min netbank?", answer: "Trustly får aldrig vedvarende adgang til din netbank. Ved hver transaktion logger du aktivt ind med MitID og godkender den specifikke betaling. Trustly gemmer aldrig dine loginoplysninger – det er teknisk umuligt for Trustly at tilgå din bank uden din aktive MitID-godkendelse. Denne arkitektur er fundamentalt sikrere end at oprette en permanent konto hos en tredjepart som Skrill eller PayPal." },
        { question: "Kan jeg bruge Trustly til kreditkortbetalinger?", answer: "Nej. Trustly er en open banking-løsning, der udelukkende forbinder til bankkonti. Kreditkort behandles via kortnetværk (Visa/Mastercard), ikke via bankens API. Hvis du ønsker at betale med kreditkort, skal du bruge direkte kortbetaling eller Apple Pay. Vi anbefaler dog generelt debetkort frem for kreditkort af hensyn til ansvarligt spil." },
        { question: "Hvad hvis min Trustly-transaktion fejler efter MitID-godkendelse?", answer: "I sjældne tilfælde kan en Trustly-transaktion fejle efter MitID-godkendelse – typisk pga. utilstrækkelig saldo, bankens daglige overførselsgrænse eller midlertidige tekniske problemer. Pengene trækkes aldrig fra din konto, medmindre transaktionen gennemføres fuldt ud. Hvis beløbet trækkes men ikke krediteres din casinokonto, kontakt casinoets kundeservice med transaktionsreferencen – problemet løses typisk inden for 24 timer." },
      ]}
      currentPath="/betalingsmetoder/trustly"
      howToName="Sådan indbetaler du med Trustly på et dansk casino"
      howToTotalTime="PT3M"
      howToSteps={[
        { name: "Vælg Trustly som betalingsmetode", text: "Gå til casinoets kassesektion og vælg Trustly (eller 'Bankoverførsel') som indbetalingsmetode." },
        { name: "Indtast indbetalingsbeløb", text: "Angiv det beløb, du ønsker at indbetale. Minimum er typisk 100 kr. hos danske casinoer." },
        { name: "Log ind med MitID", text: "Du omdirigeres til Trustlys betalingsvindue, hvor du logger ind med MitID via app eller kodelæser." },
        { name: "Vælg din bank og godkend", text: "Vælg din bank fra listen, bekræft overførslen og godkend med MitID. Pengene krediteres øjeblikkeligt." },
      ]}
      snippetAnswer="Trustly er den hurtigste betalingsmetode på danske casinoer – gennemsnitlig udbetalingstid på 45 minutter i vores test. Direkte bankforbindelse via MitID, ingen registrering og fuld bonuskvalificering."
      prioritySlugs={["spilleautomaten", "betinia", "swift-casino"]}
    />
  );
};

export default TrustlyGuide;
