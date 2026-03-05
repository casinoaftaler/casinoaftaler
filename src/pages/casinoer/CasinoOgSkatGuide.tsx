import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedGuides } from "@/components/RelatedGuides";

import heroImage from "@/assets/heroes/casino-og-skat-hero.jpg";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";
import { Scale, Calculator, Star, Globe, Landmark, Shield, AlertTriangle, BookOpen, FileText, Coins, TrendingUp, HelpCircle } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Skal jeg betale skat af gevinster fra online casino i Danmark?", answer: (<>Det afhænger af casinoets licens. Gevinster fra casinoer med gyldig dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> er 100 % skattefri – uanset beløbet. Gevinster fra EU-licenserede casinoer er typisk også skattefri. Gevinster fra casinoer uden EU-licens er som udgangspunkt skattepligtig personlig indkomst og skal selvangives.</>) },
  { question: "Hvorfor er casinogevinster skattefri i Danmark?", answer: "Fordi casinooperatørerne med dansk licens betaler en afgift på 28 % af deres bruttospilleindtægt (GGR) direkte til den danske stat. Denne afgift erstatter individuel beskatning af spillergevinster. Den samlede statsindtægt fra casinoafgifter i Danmark er ca. 1-1,5 mia. kr. årligt." },
  { question: "Skal jeg indberette mine casinogevinster til SKAT?", answer: "Nej – gevinster fra danske licenserede casinoer skal hverken indberettes eller selvangives. SKAT ved allerede, at afgiften er betalt af operatøren. For gevinster fra ulicenserede casinoer uden for EU skal du dog selvangive beløbet som personlig indkomst." },
  { question: "Hvad med gevinster fra udenlandske casinoer?", answer: "Det afgørende er, hvor casinoet er licenseret. EU-licenserede casinoer (f.eks. Malta Gaming Authority): Gevinster er typisk skattefri. Casinoer licenseret uden for EU (f.eks. Curaçao, Costa Rica): Gevinster er skattepligtige som personlig indkomst med op til 52 % beskatning." },
  { question: "Er gevinster fra fysiske casinoer i udlandet skattefri?", answer: "Det afhænger af casinoets beliggenhed. Gevinster fra casinoer i EU-lande er skattefri for danske statsborgere. Gevinster fra casinoer uden for EU (f.eks. Las Vegas) er skattepligtige og skal selvangives." },
  { question: "Er der grænse for skattefri gevinster?", answer: "Nej, der er ingen øvre grænse. Uanset om du vinder 100 kr. eller 100 millioner kr. på et dansk licenseret casino, er gevinsten 100 % skattefri. Den eneste betingelse er, at casinoet har gyldig dansk licens." },
  { question: "Hvad med cryptocurrency-gevinster fra online casinoer?", answer: (<>Kryptovaluta-gambling tilføjer et ekstra lag af kompleksitet. Selve casino-gevinsten beskattes efter de normale regler (skattefri fra licenserede casinoer). Men kursgevinster på din kryptovaluta kan være skattepligtige uafhængigt af casino-gevinsten. Læs mere i vores <Link to="/casinoer/crypto-casino" className={linkClass}>crypto casino guide</Link>.</>) },
  { question: "Kan tab fra casinospil fratrækkes i skat?", answer: "Nej, tab fra spil på danske licenserede casinoer kan ikke fratrækkes i din skattepligtige indkomst. Da gevinsterne er skattefri, er tabene heller ikke fradragsberettigede. For skattepligtige gevinster fra ulicenserede casinoer kan tab potentielt modregnes i gevinster inden for samme indkomstår, men dette kræver dokumentation." },
];

const CasinoOgSkatGuide = () => {
  const articleSchema = buildArticleSchema({ headline: "Casino og Skat i Danmark 2026 – Komplet Skatteguide", description: "Alt om skat og casinogevinster i Danmark 2026.", url: `${SITE_URL}/casinoer/casino-og-skat`, datePublished: "2026-02-01", dateModified: "2026-02-15" });
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO title="Casino og Skat 2026 – Er Casinogevinster Skattefri i Danmark?" description="Komplet guide til skat og casinogevinster i Danmark 2026. Er dine gevinster skattefri? Hvad med udenlandske casinoer og krypto? Alt om skatteforhold ved online gambling." jsonLd={[articleSchema, faqSchema]} />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Scale className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino og Skat i Danmark 2026
            </h1>
            <p className="text-lg text-white/80">
              Den komplette guide til skatteforhold ved casinospil. Er dine gevinster skattefri? Hvad med udenlandske casinoer og krypto? Vi gennemgår alle regler.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="1. februar 2026" readTime="22 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Casino og skat i Danmark" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over casino og skat i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Det korte svar: Ja, gevinster fra danske licenserede casinoer er 100 % skattefri – uanset beløbet.</strong> Men situationen er mere nuanceret, når det gælder udenlandske casinoer, kryptovaluta og fysiske casinoer i udlandet. Skatteforhold ved gambling er et af de mest stillede spørgsmål blandt danske casinospillere, og det er forståeligt – konsekvenserne af fejlagtig selvangivelse kan være alvorlige.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det danske system er unikt i sin enkelhed: Operatørerne betaler afgift, spillerne beholder alt. Men denne enkelhed gælder kun for <Link to="/casino-licenser" className={linkClass}>casinoer med dansk licens</Link>. Spiller du på andre platforme – uanset om de er EU-licenserede, licenserede uden for EU, eller helt ulicenserede – ændrer skattebilledet sig markant. Og med den voksende popularitet af kryptovaluta-casinoer tilføjes yderligere et lag af kompleksitet, som mange spillere ikke er opmærksomme på.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">I denne dybdegående guide gennemgår vi alle skattemæssige aspekter af casinospil i Danmark: Det danske afgiftssystem, skatteforhold for forskellige casinotyper, kryptovaluta-specifike overvejelser, fysiske casinoer i udlandet, praktisk selvangivelse for skattepligtige gevinster, og konkrete regneksempler der illustrerer den økonomiske forskel mellem skattefrit og skattepligtigt spil.</p>
          <Card className="bg-primary/5 border-primary/20 my-6"><CardContent className="pt-6"><p className="text-sm text-muted-foreground"><strong>Juridisk disclaimer:</strong> Denne guide er udarbejdet med omhyggelighed og baseret på gældende dansk skattelovgivning per februar 2026. Den erstatter dog ikke professionel skatterådgivning. Skatteforhold kan ændre sig, og individuelle omstændigheder kan påvirke din skattesituation. Ved tvivl anbefaler vi at konsultere en skatterevisor eller SKAT direkte.</p></CardContent></Card>
        </section>

        <InlineCasinoCards title="Skattefri casinoer med dansk licens" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Landmark className="h-7 w-7 text-primary" /> Det danske afgiftssystem for online casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det danske system for beskatning af online casinospil er bygget på et simpelt og elegant princip: <strong>Operatøren betaler – spilleren beholder.</strong> Dette system blev introduceret med Spilleloven i 2012 og har vist sig at være en effektiv og administrativt enkel model, der sikrer statsindtægter uden at belaste individuelle spillere med komplicerede selvangivelseskrav.</p>
          <p className="text-muted-foreground mb-6">Systemet fungerer således: Alle casinooperatører med dansk licens betaler en afgift på 28 % af deres bruttospilleindtægt (GGR – Gross Gaming Revenue). GGR defineres som den samlede sum af spillerindsatser minus udbetalt gevinster. Denne afgift opkræves månedligt af Spillemyndigheden og indbetales til statskassen. Til gengæld for denne operatørafgift er alle gevinster, som spillere vinder på licenserede danske casinoer, fuldstændig skattefri – uanset beløb, frekvens eller type af spil.</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card"><CardContent className="pt-6"><Coins className="h-8 w-8 text-primary mb-3" /><h3 className="font-bold mb-2">28 % operatørafgift</h3><p className="text-sm text-muted-foreground">Casinooperatører med dansk licens betaler 28 % af deres bruttospilleindtægt (GGR) til staten. GGR beregnes som: Samlede indsatser - Samlede udbetalinger = GGR. Afgiften opkræves månedligt og kontrolleres via regelmæssige auditeringer af Spillemyndigheden. Denne afgiftsrate er moderat sammenlignet med andre europæiske lande – Sverige opkræver 18 %, mens Frankrig opkræver op til 55 %.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6"><Shield className="h-8 w-8 text-primary mb-3" /><h3 className="font-bold mb-2">0 % spillerbeskatning</h3><p className="text-sm text-muted-foreground">Som spiller på et dansk licenseret casino betaler du 0 % skat af dine gevinster – uanset beløb, gevinsttype eller -frekvens. Du behøver ikke indberette eller selvangive noget til SKAT. Gevinsten er din fra det øjeblik, den lander på din casinokonto, og du kan hæve den til din bankkonto uden skattemæssige konsekvenser.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6"><TrendingUp className="h-8 w-8 text-primary mb-3" /><h3 className="font-bold mb-2">Ca. 1,5 mia. kr. årligt</h3><p className="text-sm text-muted-foreground">Den samlede statsindtægt fra casinoafgifter er ca. 1-1,5 milliarder kr. årligt (2025-tal). Systemet er administrativt effektivt med lave komplianceomkostninger for både staten og operatørerne. Modellen har vist sig økonomisk bæredygtig og har bidraget til at reducere det uregulerede marked ved at gøre licenserede casinoer attraktive for spillere.</p></CardContent></Card>
          </div>

          <h3 className="text-xl font-bold mb-3">Hvorfor fungerer dette system?</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det danske afgiftssystem er designet til at løse et fundamentalt problem i gambling-beskatning: Hvis spillere individuelt skal beskattes af gevinster, kræver det omfattende selvangivelse, dokumentation og kontrol – hvilket er administrativt tungt og svært at håndhæve. Ved at flytte skattebyrden til operatøren opnås flere fordele: Administrativ simplicitet (én operatør vs. tusindvis af spillere), effektiv inddrivelse (afgiften fratrækkes automatisk), og fuld transparens (Spillemyndigheden har direkte adgang til operatørernes økonomiske data).</p>
          <p className="text-muted-foreground leading-relaxed">Derudover gør skattefriheden for spillere det danske licenserede marked mere attraktivt sammenlignet med ulicenserede alternativer, hvilket reducerer det grå marked og sikrer, at flere spillere vælger regulerede platforme med fuld forbrugerbeskyttelse. Det er en win-win: Staten får sine indtægter, spillerne får skattefri gevinster og fuld beskyttelse, og operatørerne får adgang til et velreguleret marked med klare regler.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Globe className="h-7 w-7 text-primary" /> Skatteforhold for udenlandske casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Spiller du på casinoer uden dansk licens, ændrer skattereglerne sig markant. Det afgørende kriterium er, hvor casinoet er licenseret – ikke hvor serverne er placeret eller hvilken valuta der bruges. Her gennemgår vi de forskellige scenarior i detaljer med konkrete eksempler.</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 font-semibold">Casino-type</th><th className="text-left py-3 px-4 font-semibold">Licens</th><th className="text-left py-3 px-4 font-semibold">Skat på gevinster</th><th className="text-left py-3 px-4 font-semibold">Selvangive?</th></tr></thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-3 px-4">Dansk licenseret casino</td><td className="py-3 px-4">Spillemyndigheden</td><td className="py-3 px-4"><Badge className="bg-green-500/20 text-green-500">0 % skattefri</Badge></td><td className="py-3 px-4">Nej</td></tr>
                <tr className="border-b border-border/50"><td className="py-3 px-4">EU-licenseret casino</td><td className="py-3 px-4">Malta (MGA), Gibraltar etc.</td><td className="py-3 px-4"><Badge className="bg-green-500/20 text-green-500">Typisk skattefri</Badge></td><td className="py-3 px-4">Nej (normalt)</td></tr>
                <tr className="border-b border-border/50"><td className="py-3 px-4">Casino uden EU-licens</td><td className="py-3 px-4">Curaçao, Costa Rica etc.</td><td className="py-3 px-4"><Badge className="bg-red-500/20 text-red-500">Op til 52 %</Badge></td><td className="py-3 px-4">Ja</td></tr>
                <tr className="border-b border-border/50"><td className="py-3 px-4">Ulicenseret casino</td><td className="py-3 px-4">Ingen</td><td className="py-3 px-4"><Badge className="bg-red-500/20 text-red-500">Op til 52 %</Badge></td><td className="py-3 px-4">Ja</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold mb-3">EU-licenserede casinoer (Malta, Gibraltar, etc.)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">Gevinster fra casinoer licenseret i EU/EØS-lande er som udgangspunkt skattefri for danske spillere. Dette skyldes EU's principper om fri bevægelighed af tjenesteydelser og ikke-diskrimination. Hvis Danmark beskatter gevinster fra EU-licenserede casinoer, men ikke fra danske, ville det udgøre forskelsbehandling i strid med EU-retten. De mest relevante EU-licenser er Malta Gaming Authority (MGA) og Gibraltar Gambling Commission. Bemærk dog, at EU-casinoer ikke tilbyder de samme specifikke danske beskyttelsesmekanismer som MitID, ROFUS og dansk kundeservice.</p>

          <h3 className="text-xl font-bold mb-3">Casinoer uden EU-licens (Curaçao, Costa Rica, Kahnawake, etc.)</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">Her bliver situationen alvorlig. Gevinster fra casinoer licenseret uden for EU er som udgangspunkt skattepligtig personlig indkomst i Danmark. Beskatningen sker efter de normale regler for personlig indkomst med en marginalskattesats på op til 52 %. Gevinsten skal selvangives under "anden personlig indkomst" i din årsopgørelse. Manglende selvangivelse kan medføre skattetillæg, bøder og i grove tilfælde strafforfølgelse for skattesvig.</p>
          <p className="text-muted-foreground leading-relaxed">Det sikreste valg er altid et casino med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link>, hvor skattefriheden er 100 % garanteret ved lov. Selv hvis du finder et attraktivt tilbud på et Curaçao-licenseret casino, kan skattekonsekvenserne æde en enorm del af dine gevinster – ud over den manglende forbrugerbeskyttelse.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Calculator className="h-7 w-7 text-primary" /> Skatteberegning: Konkrete eksempler</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">For at illustrere den økonomiske konsekvens af at spille på forskellige casinotyper har vi udarbejdet en række detaljerede regneksempler. Disse eksempler viser tydeligt, hvorfor det altid betaler sig at vælge et dansk licenseret casino – skattemæssigt kan forskellen være enorm.</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-green-500/20 bg-green-500/5"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5 text-green-500" /> Eksempel 1: Dansk licenseret casino</CardTitle></CardHeader><CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Situation:</strong> Du vinder 150.000 kr. på en jackpot slot.</p>
                <ul className="space-y-1 ml-4">
                  <li>• Bruttogevinst: 150.000 kr.</li>
                  <li>• Skat: 0 kr. (skattefri)</li>
                  <li>• Selvangivelse: Ikke nødvendig</li>
                  <li>• <strong>Netto i hånden: 150.000 kr.</strong></li>
                </ul>
                <p className="mt-3 text-green-500 font-medium">✅ Du beholder det fulde beløb</p>
              </div>
            </CardContent></Card>

            <Card className="border-red-500/20 bg-red-500/5"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" /> Eksempel 2: Curaçao-licenseret casino</CardTitle></CardHeader><CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Situation:</strong> Samme gevinst på 150.000 kr., spiller med årsindkomst 500.000 kr.</p>
                <ul className="space-y-1 ml-4">
                  <li>• Bruttogevinst: 150.000 kr.</li>
                  <li>• Beskatning som personlig indkomst: ca. 42 %</li>
                  <li>• Skat at betale: ca. 63.000 kr.</li>
                  <li>• Selvangivelse: Påkrævet</li>
                  <li>• <strong>Netto i hånden: ca. 87.000 kr.</strong></li>
                </ul>
                <p className="mt-3 text-red-500 font-medium">❌ Du mister 63.000 kr. til skat</p>
              </div>
            </CardContent></Card>
          </div>

          <Card className="border-border bg-card mb-6"><CardHeader><CardTitle className="text-lg">Eksempel 3: Stor gevinst – forskel på 1 million kr.</CardTitle></CardHeader><CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Lad os se på en større gevinst for at illustrere, hvordan forskellen skalerer:</p>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div className="bg-green-500/5 rounded-lg p-4">
                  <p className="font-semibold mb-2 text-green-500">Dansk licens</p>
                  <ul className="space-y-1">
                    <li>• Gevinst: 1.000.000 kr.</li>
                    <li>• Skat: 0 kr.</li>
                    <li>• <strong>Netto: 1.000.000 kr.</strong></li>
                  </ul>
                </div>
                <div className="bg-red-500/5 rounded-lg p-4">
                  <p className="font-semibold mb-2 text-red-500">Uden EU-licens</p>
                  <ul className="space-y-1">
                    <li>• Gevinst: 1.000.000 kr.</li>
                    <li>• Skat (topskat): ca. 520.000 kr.</li>
                    <li>• <strong>Netto: ca. 480.000 kr.</strong></li>
                  </ul>
                </div>
              </div>
              <p className="mt-3 font-medium">Forskellen er over en halv million kroner – alene pga. valg af casino!</p>
            </div>
          </CardContent></Card>

          <Card className="border-border bg-card mb-6"><CardHeader><CardTitle className="text-lg">Eksempel 4: Månedlige mindre gevinster</CardTitle></CardHeader><CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Ikke alle gevinster er store jackpots. Lad os se på en typisk aktiv spiller:</p>
              <ul className="space-y-1 ml-4 mt-3">
                <li>• Gennemsnitlig månedlig gevinst (efter tab): 5.000 kr.</li>
                <li>• Årlig nettogevinst: 60.000 kr.</li>
                <li>• <strong>Dansk licens:</strong> 60.000 kr. skattefri – du beholder alt</li>
                <li>• <strong>Uden EU-licens:</strong> 60.000 kr. beskattes som personlig indkomst ≈ 22.000-25.000 kr. i skat</li>
                <li>• <strong>Årlig forskel:</strong> 22.000-25.000 kr.</li>
              </ul>
              <p className="mt-3">Over 5 år kan denne forskel beløbe sig til over 100.000 kr. i tabte gevinster til skat.</p>
            </div>
          </CardContent></Card>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Coins className="h-7 w-7 text-primary" /> Kryptovaluta og casino-skat</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Kryptovaluta-gambling tilføjer et helt ekstra lag af skattemæssig kompleksitet, som mange spillere undervurderer. Med den voksende popularitet af <Link to="/casinoer/crypto-casino" className={linkClass}>crypto casinoer</Link> er det afgørende at forstå de skattemæssige implikationer af at gamble med Bitcoin, Ethereum og andre kryptovalutaer.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det grundlæggende princip er, at der er <strong>to separate skattemæssige lag</strong> ved krypto-gambling: 1) Selve casino-gevinsten beskattes efter de normale regler (skattefri fra licenserede casinoer, skattepligtig fra ulicenserede), og 2) kursgevinster på den kryptovaluta, du bruger til gambling, kan være separat skattepligtige under reglerne for kryptovaluta-beskatning.</p>

          <Card className="border-border bg-card mb-6"><CardContent className="pt-6">
            <h3 className="font-bold mb-3">Scenarie: Bitcoin-gambling med kursgevinst</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Du købte 0.1 BTC for 30.000 kr. i januar. I marts er kursen steget, og din 0.1 BTC er nu 50.000 kr. værd. Du indsætter den på et crypto casino og vinder yderligere 0.05 BTC.</p>
              <ul className="space-y-1 ml-4 mt-3">
                <li>• <strong>Kursgevinst på Bitcoin:</strong> 20.000 kr. (50.000 - 30.000 kr.) – potentielt skattepligtig under krypto-regler</li>
                <li>• <strong>Casino-gevinst:</strong> 0.05 BTC – beskattes efter casinoets licens</li>
                <li>• <strong>Komplication:</strong> Konvertering til/fra krypto udløser potentielt skattemæssige hændelser</li>
              </ul>
              <p className="mt-3 font-medium">Resultatet kan være, at du skal betale skat af kursgevinsten selvom casino-gevinsten er skattefri!</p>
            </div>
          </CardContent></Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">I Danmark beskattes kryptovaluta efter den såkaldte "spekulationsregel": Hvis du har købt kryptovaluta med henblik på at opnå en fortjeneste ved senere salg eller brug, er kursgevinsten skattepligtig som personlig indkomst. Da indsættelse på et casino teknisk set kan betragtes som en "disponering" af din kryptovaluta, kan det udløse beskatning af eventuelle kursgevinster på det tidspunkt, du indsætter.</p>
          <p className="text-muted-foreground leading-relaxed">Vores klare anbefaling er at undgå kryptovaluta-gambling, medmindre du har grundig forståelse af de skattemæssige implikationer, og helst har konsulteret en skatterevisor med erfaring inden for kryptovaluta-beskatning. For langt de fleste danske spillere er det enkleste og mest fordelagtige at spille med danske kroner på <Link to="/casino-licenser" className={linkClass}>licenserede danske casinoer</Link>.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Globe className="h-7 w-7 text-primary" /> Fysiske casinoer i udlandet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Mange danske spillere besøger fysiske casinoer under rejser i udlandet – fra Monte Carlo til Las Vegas. Skatteforholdene for gevinster fra fysiske casinoer følger det samme grundprincip som online casinoer: Det afgørende er beliggenheden (og dermed jurisdiktionen).</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-green-500/20"><CardContent className="pt-6"><h3 className="font-bold mb-3 text-green-500">EU-lande: Skattefri</h3><p className="text-sm text-muted-foreground mb-3">Gevinster fra fysiske casinoer i EU-lande er skattefri for danske statsborgere. Dette gælder Casino Copenhagen, Casino di Venezia, Casino de Monte-Carlo (Monaco er ikke EU, men har særaftale), Casino Barcelona, Casino Helsinki og andre EU-baserede casinoer. Du behøver ikke indberette disse gevinster til SKAT.</p></CardContent></Card>
            <Card className="border-red-500/20"><CardContent className="pt-6"><h3 className="font-bold mb-3 text-red-500">Uden for EU: Skattepligtig</h3><p className="text-sm text-muted-foreground mb-3">Gevinster fra fysiske casinoer uden for EU er skattepligtige. De mest relevante eksempler for danske turister: Las Vegas, Atlantic City, Macau, Singapore og caribiske casinoer. Gevinsten skal selvangives som personlig indkomst. Bemærk: USA tilbageholder automatisk 30 % kildeskat på gevinster over $1.200 for udenlandske statsborgere – denne kan potentielt modregnes via dobbeltbeskatningsaftalen.</p></CardContent></Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">Et praktisk tip for rejsende: Gem altid dokumentation for dine gevinster fra fysiske casinoer i udlandet. De fleste casinoer udsteder en kvittering eller W2-G formular (i USA) for større gevinster. Denne dokumentation er vigtig for korrekt selvangivelse og for at kunne dokumentere over for SKAT, at gevinsterne stammer fra EU-lande (og dermed er skattefri).</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><FileText className="h-7 w-7 text-primary" /> Praktisk guide: Selvangivelse af casinogevinster</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Hvis du har vundet penge på et casino uden EU-licens, er du forpligtet til at selvangive gevinsten. Her er en trin-for-trin guide til, hvordan du gør det korrekt via SKATs systemer.</p>
          <div className="space-y-3 mb-6">
            {[
              { step: "1", title: "Beregn din nettogevinst", desc: "Din skattepligtige gevinst beregnes som den samlede gevinst minus de samlede indsatser inden for skatteåret. Gem dokumentation for alle indsatser og gevinster – bankudtog, skærmbilleder og transaktionshistorik fra casinoet." },
              { step: "2", title: "Log ind på skat.dk med MitID", desc: "Gå til skat.dk og log ind med dit MitID. Naviger til din årsopgørelse og find feltet for 'Anden personlig indkomst'." },
              { step: "3", title: "Indberetning af gevinsten", desc: "Angiv din nettogevinst under 'Anden personlig indkomst' (rubrik 20). Hvis du har gevinster fra flere udenlandske casinoer, sammenlæg dem til ét beløb. Angiv kildelandet/landene i bemærkningsfeltet." },
              { step: "4", title: "Betaling af skat", desc: "Skatten beregnes automatisk baseret på din samlede indkomst og din personlige trækprocent. Du modtager en restskatopgørelse, hvis skatten overstiger din forskudsopgørelse. Betalingsfristen er typisk 1. juli i året efter indkomståret." },
              { step: "5", title: "Gem dokumentation i 5 år", desc: "SKAT kan kræve dokumentation for dine selvangivne beløb i op til 5 år. Gem alle relevante kvitteringer, kontoudtog, transaktionshistorik og korrespondance med casinoet." },
            ].map((step, i) => (
              <Card key={i} className="border-border bg-card"><CardContent className="flex items-start gap-4 pt-4"><div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">{step.step}</div><div><h3 className="font-semibold mb-1">{step.title}</h3><p className="text-sm text-muted-foreground">{step.desc}</p></div></CardContent></Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><AlertTriangle className="h-7 w-7 text-destructive" /> Konsekvenser ved manglende selvangivelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det er vigtigt at tage selvangivelse af skattepligtige casinogevinster alvorligt. SKAT har adgang til oplysninger om overførsler til og fra udenlandske spilleplatforme via bankrapportering, og de anvender i stigende grad data-analytiske værktøjer til at identificere uindberettede gambling-indtægter.</p>
          <Card className="bg-destructive/5 border-destructive/20 mb-6"><CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" /> <strong>Skattetillæg:</strong> Ved for sen selvangivelse pålægges et dagligt skattetillæg. Ved væsentlige udeladelser kan tillægget udgøre op til 1 % af den manglende skat pr. måned.</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" /> <strong>Bøde for skatteunddragelse:</strong> Ved forsætlig udeladelse af indkomst risikerer du en bøde på typisk 1x det unddragne skattebeløb. I grove tilfælde kan bøden være højere.</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" /> <strong>Strafforfølgelse:</strong> Ved grove og gentagne tilfælde af skatteunddragelse kan sagen oversendes til politiet. Skatteunddragelse over 500.000 kr. kan medføre fængselsstraf på op til 8 år.</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" /> <strong>5 års forældelsesfrist:</strong> SKAT kan genoptage tidligere skatteansættelser i op til 5 år. For grov skatteunddragelse kan fristen forlænges til 10 år.</li>
            </ul>
          </CardContent></Card>
          <p className="text-muted-foreground leading-relaxed">Det enkleste og sikreste er at undgå hele problemstillingen ved at spille på et <Link to="/casino-licenser" className={linkClass}>dansk licenseret casino</Link>, hvor alle gevinster er 100 % skattefri. Dermed behøver du aldrig bekymre dig om selvangivelse, dokumentation eller skattemæssige konsekvenser.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion: Vælg skattefrihed – vælg dansk licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Skatteforholdene ved casinospil i Danmark er enkle, så længe du vælger et casino med dansk licens: <strong>0 % skat, ingen selvangivelse, ingen grænser, ingen bekymringer.</strong> Det er et af verdens mest spillervenlige skattesystemer, og det er designet til din fordel. Det danske afgiftssystem sikrer, at staten får sine indtægter via operatøren, mens du som spiller kan nyde dine gevinster uden skattemæssige konsekvenser.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Spiller du derimod på udenlandske casinoer uden EU-licens, risikerer du at betale op til 52 % i skat af dine gevinster – en forskel, der kan beløbe sig til hundredtusindvis af kroner for større gevinster. Dertil kommer risikoen for skattetillæg og bøder ved manglende selvangivelse, samt den generelle mangel på forbrugerbeskyttelse, der følger med ulicenserede platforme.</p>
          <p className="text-muted-foreground leading-relaxed">Besøg vores <Link to="/top-10-casino-online" className={linkClass}>top 10 online casino</Link> for de bedste skattefri casinomuligheder i Danmark, eller læs vores <Link to="/casino-licenser" className={linkClass}>guide til licenserede casinoer</Link> for at forstå, hvorfor dansk licens bør være dit vigtigste kriterium.</p>
        </section>

        <RelatedGuides currentPath="/casinoer/casino-og-skat" />

        <FAQSection title="Ofte stillede spørgsmål om casino og skat" faqs={faqs} />

        <AuthorBio />
      </div>
    </>
  );
};

export default CasinoOgSkatGuide;