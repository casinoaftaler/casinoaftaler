import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, CheckCircle, Clock, AlertTriangle, Gamepad2, Users, ShieldCheck, ArrowRight, Percent, Coins, Ban, CreditCard } from "lucide-react";

const Indskudsbonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackground = siteSettings?.hero_background;

  const faqItems = [
    {
      question: "Hvad er en indskudsbonus?",
      answer: "En indskudsbonus er en kampagnebonus fra online casinoer, som matcher din indbetaling med en procentdel – typisk 100%. Det betyder, at du får ekstra spillemidler oven i dit indskud, så du har flere penge at spille for."
    },
    {
      question: "Tilbyder danske casinoer indskudsbonus?",
      answer: "Ja, mange licenserede danske casinoer tilbyder indskudsbonusser. De bruges både til at tiltrække nye spillere og til at belønne eksisterende kunder med ekstra midler ved indbetaling."
    },
    {
      question: "Kan jeg vinde rigtige penge med en indskudsbonus?",
      answer: "Ja, du kan vinde rigtige penge. Dog skal du opfylde omsætningskravene, før du kan hæve eventuelle gevinster fra bonussen."
    },
    {
      question: "Hvem er indskudsbonus bedst egnet til?",
      answer: "Indskudsbonusser er velegnede til både nye spillere, der vil maksimere deres første indbetaling, og erfarne spillere, der ønsker ekstra midler. De giver mulighed for at udforske flere spil uden at risikere lige så mange egne penge."
    },
    {
      question: "Hvordan aktiverer jeg en indskudsbonus?",
      answer: "Opret en konto hos et casino der tilbyder bonussen, foretag en indbetaling, og bonussen tilføjes automatisk til din konto – eller aktiveres via en bonuskode, hvis det kræves."
    },
    {
      question: "Hvad er omsætningskravene for en indskudsbonus?",
      answer: "Omsætningskravene angiver, hvor mange gange bonusbeløbet skal gennemspilles, før gevinster kan hæves. F.eks. kræver en bonus på 1.000 kr. med 10x omsætning, at du spiller for 10.000 kr. i alt."
    },
    {
      question: "Er der indsatsgrænser på indskudsbonusser?",
      answer: "Ja, der er typisk en maksimal indsats per spilrunde, når du bruger bonuspenge – ofte omkring 50 kr. per spin. Disse grænser skal overholdes for at bonussen forbliver aktiv."
    },
    {
      question: "Kan jeg hæve gevinster fra en indskudsbonus?",
      answer: "Ja, men først efter at omsætningskravene er opfyldt. Når kravene er gennemført inden for tidsfristen, kan du frit hæve dine gevinster."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Indskudsbonus – Få Mest Ud af Din Indbetaling | Guide 2025</title>
        <meta name="description" content="Komplet guide til indskudsbonusser hos danske casinoer. Lær hvordan matchbonusser fungerer, omsætningskrav, betingelser og strategier for at maksimere din bonus." />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={heroBackground ? {
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : undefined}
      >
        <div className={`absolute inset-0 ${heroBackground ? 'bg-black/60' : 'bg-gradient-to-br from-primary/20 via-primary/10 to-background'}`} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${heroBackground ? 'text-white' : 'text-foreground'}`}>
              Indskudsbonus
            </h1>
            <p className={`text-lg md:text-xl ${heroBackground ? 'text-white/90' : 'text-muted-foreground'}`}>
              Alt du behøver at vide om indskudsbonusser hos danske online casinoer – matchbonusser, betingelser og strategier.
            </p>
          </div>
        </div>
      </section>

      {/* Meta info bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="container py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>✍️ Redaktionen</span>
            <span>•</span>
            <span>📅 Opdateret 2025</span>
            <span>•</span>
            <span>⏱️ 12 min. læsetid</span>
          </div>
        </div>
      </div>

      <div className="container py-10 max-w-4xl">
        {/* Introduktion */}
        <section className="mb-10">
          <p className="text-lg leading-relaxed text-muted-foreground">
            En indskudsbonus er en af de mest populære og attraktive bonustyper hos danske online casinoer. Denne form for bonus matcher din indbetaling med en procentdel – typisk 100% – så du får dobbelt så mange penge at spille for. Indskudsbonusser er ikke kun forbeholdt nye spillere, men tilbydes også til loyale kunder, så alle kan booste spilleglæden under jagten på gevinster.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mt-4">
            En indskudsbonus kaldes også for en matchbonus, da den netop matcher en procentdel af din indbetaling. Procentsatsen og betingelserne varierer fra casino til casino, og det er vigtigt at forstå reglerne, før du aktiverer en bonus.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Sådan fungerer en indskudsbonus */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Sådan fungerer en indskudsbonus
          </h2>
          <p className="text-muted-foreground mb-6">
            En indskudsbonus fungerer ved at casinoet matcher din indbetaling med en bestemt procentsats. Hvis du f.eks. indbetaler 500 kr. og får en 100% matchbonus, modtager du yderligere 500 kr. i bonuspenge – i alt 1.000 kr. at spille for. Nogle bonusser inkluderer også gratis spins oven i hatten.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Percent className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">100% Matchbonus</h3>
                    <p className="text-sm text-muted-foreground">Den mest udbredte form – casinoet fordobler din indbetaling op til et bestemt maksimumbeløb.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Coins className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Eksempel på beregning</h3>
                    <p className="text-sm text-muted-foreground">Indbetaler du 700 kr. med 100% match, får du 700 kr. ekstra – samlet 1.400 kr. til rådighed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Trin-for-trin guide */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-primary" />
            Sådan aktiverer du en indskudsbonus
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Vælg casino og bonus", desc: "Sammenlign bonusser og læs anmeldelser for at finde det bedste tilbud. Husk at kigge på betingelserne – ikke kun bonusbeløbet." },
              { step: "2", title: "Opret en spillekonto", desc: "Registrer dig hos det valgte casino med dine personlige oplysninger og kontaktinformationer." },
              { step: "3", title: "Bekræft din identitet", desc: "Verificer din identitet via MitID. Det sikrer, at din konto er beskyttet, og at udbetalinger sker til den rette person." },
              { step: "4", title: "Vælg kampagne og aktiver", desc: "Gå til kampagnesektionen og vælg din bonus. Hvis en bonuskode kræves, skal den indtastes ved indbetaling." },
              { step: "5", title: "Indbetal og spil", desc: "Foretag din indbetaling, og bonussen tilføjes automatisk. Vælg herefter spil, der tæller med i omsætningskravet." }
            ].map((item) => (
              <Card key={item.step}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Betingelser */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Vigtige betingelser for indskudsbonusser
          </h2>
          <p className="text-muted-foreground mb-6">
            Alle bonusser kommer med vilkår og betingelser. Hvis du overser vigtige krav, risikerer du at miste både bonussen og eventuelle gevinster. Her er de vigtigste punkter at holde øje med:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: CheckCircle, title: "Omsætningskrav", desc: "Angiver hvor mange gange bonusbeløbet skal gennemspilles, før gevinster kan hæves. Typisk 5x–10x (d+b) i Danmark." },
              { icon: Ban, title: "Indsatsgrænser", desc: "En øvre grænse for din indsats per spilrunde med bonuspenge – oftest omkring 50 kr. per spin på spilleautomater." },
              { icon: Clock, title: "Tidsbegrænsning", desc: "De fleste bonusser skal gennemspilles inden for 60 dage. Overholdes fristen ikke, bortfalder bonussen automatisk." },
              { icon: CreditCard, title: "Profitgrænse", desc: "Et loft over hvor meget du kan udbetale fra bonusgevinster. Tjek altid denne grænse, inden du accepterer en bonus." },
              { icon: Gamepad2, title: "Spilbidrag", desc: "Forskellige spiltyper bidrager forskelligt. Slots tæller typisk 100%, mens bordspil som blackjack kun bidrager ca. 10%." },
              { icon: ShieldCheck, title: "Udbetalingsbegrænsninger", desc: "Der kan være krav til specifikke betalingsmetoder ved udbetaling, samt et maksimalt beløb per hævning." }
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Hvilke spil */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            Hvilke spil kan du bruge en indskudsbonus på?
          </h2>
          <p className="text-muted-foreground mb-4">
            Hvert casino bestemmer selv, hvilke spil der er tilgængelige med bonuspenge. Typisk er bonusser rettet mod spilleautomater, men nogle casinoer inkluderer også bordspil og endda live casino. Tjek altid regler og vilkår for at vide præcis, hvilke titler der tæller med i omsætningskravet.
          </p>
          <Card>
            <CardContent className="p-5">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> <strong>Spilleautomater</strong> – Bidrager typisk 100% til omsætningskravet</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> <strong>Bordspil</strong> – Roulette og blackjack bidrager oftest kun 10%</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> <strong>Live Casino</strong> – Kan i sjældne tilfælde være inkluderet</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> <strong>Nye spiltitler</strong> – Casinoer promoverer ofte nye spil gennem bonusser</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Sammenligning med andre bonusser */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Indskudsbonus vs. andre bonustyper
          </h2>
          <p className="text-muted-foreground mb-6">
            Indskudsbonusser har nogle klare fordele sammenlignet med andre kampagnetyper. Mens velkomstbonusser kun er til nye spillere, kan indskudsbonusser bruges af alle – både nye og eksisterende kunder.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-5 text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Indskudsbonus</h3>
                <p className="text-xs text-muted-foreground">Matcher din indbetaling – tilgængelig for alle spillere med høj matchprocent.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <Coins className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Bonus uden indbetaling</h3>
                <p className="text-xs text-muted-foreground">Ingen risiko, men ofte med strengere omsætningskrav og lavere bonusbeløb.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Cashback bonus</h3>
                <p className="text-xs text-muted-foreground">Får en procentdel af tab tilbage – ideel for storspillere, men giver ikke det samme boost.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Hvem er bonussen til */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Hvem er indskudsbonus egnet til?
          </h2>
          <p className="text-muted-foreground mb-4">
            Indskudsbonusser er fleksible og kan passe til mange typer spillere. Afhængigt af hvordan casinoet placerer bonussen, kan den være del af en velkomstpakke til nye spillere eller en løbende kampagne til eksisterende kunder. Det gør den til en af de mest alsidige bonustyper i den danske spilindustri.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-1">🆕 Nye spillere</h3>
                <p className="text-sm text-muted-foreground">Få mest muligt ud af din første indbetaling og udforsk casinoets spiludvalg med ekstra midler.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-1">⭐ Erfarne spillere</h3>
                <p className="text-sm text-muted-foreground">Loyale kunder kan drage fordel af løbende indskudsbonusser og VIP-kampagner.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Ansvarligt spil */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Ansvarligt spil
          </h2>
          <Card>
            <CardContent className="p-5">
              <p className="text-muted-foreground">
                For at din spiloplevelse forbliver underholdende og sikker, er det vigtigt at sætte grænser for både tid og penge. Hvis du føler, at spillet ikke længere er sjovt, bør du tage en pause. Mange casinoer tilbyder værktøjer som Rofus til selvudelukkelse og indbetalingsgrænser. Besøg StopSpillet.dk for rådgivning om spilafhængighed. Husk – spil skal altid betragtes som underholdning og aldrig som en indtægtskilde.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Konklusion */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Konklusion</h2>
          <p className="text-muted-foreground mb-4">
            Indskudsbonusser er en fremragende måde at få ekstra værdi for din indbetaling på et online casino. Med en matchbonus kan du udforske et bredt spiludvalg uden at risikere lige så mange egne penge. Det er dog afgørende at forstå vilkår og betingelser – herunder omsætningskrav, tidsbegrænsninger og spilrestriktioner – for at få det fulde udbytte af din bonus.
          </p>
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">Nøglepunkter</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Indskudsbonusser giver alle spillere ekstra midler til spil</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Betingelserne inkluderer omsætningskrav og tidsbegrænsninger</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Bonusser er ideelle for både nye og erfarne spillere</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Spil altid ansvarligt og brug casinoernes selvudelukkelses-værktøjer</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Ofte stillede spørgsmål</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
};

export default Indskudsbonus;
