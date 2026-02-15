import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityPromoSection } from "@/components/CommunityPromoSection";
import heroImage from "@/assets/heroes/casino-og-skat-hero.jpg";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";
import { Scale, Calculator, Star, Globe, Landmark } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Skal jeg betale skat af gevinster fra online casino i Danmark?", answer: (<>Det afhænger af casinoets licens. Gevinster fra casinoer med gyldig dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> er 100 % skattefri – uanset beløbet. Gevinster fra EU-licenserede casinoer er typisk også skattefri. Gevinster fra casinoer uden EU-licens er som udgangspunkt skattepligtig personlig indkomst og skal selvangives.</>) },
  { question: "Hvorfor er casinogevinster skattefri i Danmark?", answer: "Fordi casinooperatørerne med dansk licens betaler en afgift på 28 % af deres bruttospilleindtægt (GGR) direkte til den danske stat. Denne afgift erstatter individuel beskatning af spillergevinster. Den samlede statsindtægt fra casinoafgifter i Danmark er ca. 1-1,5 mia. kr. årligt." },
  { question: "Skal jeg indberette mine casinogevinster til SKAT?", answer: "Nej – gevinster fra danske licenserede casinoer skal hverken indberettes eller selvangives. SKAT ved allerede, at afgiften er betalt af operatøren. For gevinster fra ulicenserede casinoer uden for EU skal du dog selvangive beløbet som personlig indkomst." },
  { question: "Hvad med gevinster fra udenlandske casinoer?", answer: "Det afgørende er, hvor casinoet er licenseret. EU-licenserede casinoer (f.eks. Malta Gaming Authority): Gevinster er typisk skattefri. Casinoer licenseret uden for EU (f.eks. Curaçao, Costa Rica): Gevinster er skattepligtige som personlig indkomst med op til 52 % beskatning." },
  { question: "Er gevinster fra fysiske casinoer i udlandet skattefri?", answer: "Det afhænger af casinoets beliggenhed. Gevinster fra casinoer i EU-lande er skattefri for danske statsborgere. Gevinster fra casinoer uden for EU (f.eks. Las Vegas) er skattepligtige og skal selvangives." },
  { question: "Er der grænse for skattefri gevinster?", answer: "Nej, der er ingen øvre grænse. Uanset om du vinder 100 kr. eller 100 millioner kr. på et dansk licenseret casino, er gevinsten 100 % skattefri. Den eneste betingelse er, at casinoet har gyldig dansk licens." },
  { question: "Hvad med cryptocurrency-gevinster fra online casinoer?", answer: (<>Kryptovaluta-gambling tilføjer et ekstra lag af kompleksitet. Selve casino-gevinsten beskattes efter de normale regler (skattefri fra licenserede casinoer). Men kursgevinster på din kryptovaluta kan være skattepligtige uafhængigt af casino-gevinsten. Læs mere i vores <Link to="/casinoer/crypto-casino" className={linkClass}>crypto casino guide</Link>.</>) },
  { question: "Kan tab fra casinospil fratrækkes i skat?", answer: "Nej, tab fra spil på danske licenserede casinoer kan ikke fratrækkes i din skattepligtige indkomst. Da gevinsterne er skattefri, er tabene heller ikke fradragsberettigede." },
];

const CasinoOgSkatGuide = () => {
  const articleSchema = buildArticleSchema({ headline: "Casino og Skat i Danmark 2026 – Komplet Skatteguide", description: "Alt om skat og casinogevinster i Danmark 2026.", url: `${SITE_URL}/casinoer/casino-og-skat`, datePublished: "2026-02-01", dateModified: "2026-02-15" });
  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

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
        <AuthorMetaBar author="jonas" date="1. februar 2026" readTime="15 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Casino og skat i Danmark" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over casino og skat</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong>Det korte svar: Ja, gevinster fra danske licenserede casinoer er 100 % skattefri – uanset beløbet.</strong> Men situationen er mere nuanceret, når det gælder udenlandske casinoer, kryptovaluta og fysiske casinoer i udlandet. I denne guide gennemgår vi alle skattemæssige aspekter af casinospil.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det danske system er unikt i sin enkelhed: Operatørerne betaler afgift, spillerne beholder alt. Men denne enkelhed gælder kun for <Link to="/licenserede-casinoer" className={linkClass}>casinoer med dansk licens</Link>. Spiller du på andre platforme, kan situationen hurtigt blive kompliceret.</p>
          <Card className="bg-primary/5 border-primary/20 my-6"><CardContent className="pt-6"><p className="text-sm text-muted-foreground"><strong>Juridisk disclaimer:</strong> Denne guide er udarbejdet med omhyggelighed og baseret på gældende dansk skattelovgivning per februar 2026. Den erstatter dog ikke professionel skatterådgivning.</p></CardContent></Card>
        </section>

        <InlineCasinoCards title="Skattefri casinoer med dansk licens" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Landmark className="h-7 w-7 text-primary" /> Det danske afgiftssystem for online casino</h2>
          <p className="text-muted-foreground mb-6">Det danske system for beskatning af online casinospil er bygget på et simpelt princip: <strong>Operatøren betaler – spilleren beholder.</strong></p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card"><CardContent className="pt-6"><h3 className="font-bold mb-2">28 % afgift</h3><p className="text-sm text-muted-foreground">Casinooperatører med dansk licens betaler 28 % af deres bruttospilleindtægt (GGR) til staten. Denne afgift erstatter individuel beskatning af spillergevinster.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6"><h3 className="font-bold mb-2">0 % spillerbeskatning</h3><p className="text-sm text-muted-foreground">Som spiller på et dansk licenseret casino betaler du 0 % skat af dine gevinster – uanset beløb. Du behøver ikke indberette eller selvangive noget.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6"><h3 className="font-bold mb-2">Ca. 1,5 mia. kr. årligt</h3><p className="text-sm text-muted-foreground">Den samlede statsindtægt fra casinoafgifter er ca. 1-1,5 milliarder kr. årligt. Systemet er administrativt effektivt.</p></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Globe className="h-7 w-7 text-primary" /> Skatteforhold for udenlandske casinoer</h2>
          <p className="text-muted-foreground mb-6">Spiller du på casinoer uden dansk licens, ændrer skattereglerne sig markant.</p>
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
          <p className="text-muted-foreground leading-relaxed">Det sikreste valg er altid et casino med <Link to="/licenserede-casinoer" className={linkClass}>dansk licens</Link>, hvor skattefriheden er 100 % garanteret ved lov.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Calculator className="h-7 w-7 text-primary" /> Skatteberegning ved skattepligtige gevinster</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Hvis du spiller på et casino uden EU-licens og vinder, beskattes gevinsten som personlig indkomst.</p>
          <Card className="border-border bg-card mb-6"><CardContent className="pt-6">
            <h3 className="font-bold mb-3">Eksempel: Gevinst på 50.000 kr. fra ulicenseret casino</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Antag en spiller med en årsindkomst på 400.000 kr.:</p>
              <ul className="space-y-1 ml-4">
                <li>• Gevinsten beskattes som personlig indkomst: 50.000 kr.</li>
                <li>• Marginalskattesats (inkl. kommuneskat): ca. 37-42 %</li>
                <li>• <strong>Skat at betale: ca. 18.500–21.000 kr.</strong></li>
                <li>• Netto gevinst efter skat: ca. 29.000–31.500 kr.</li>
              </ul>
              <p className="mt-3 font-medium">Sammenligning: Samme gevinst på et dansk licenseret casino = 50.000 kr. skattefrit i hånden.</p>
            </div>
          </CardContent></Card>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion: Vælg skattefrihed – vælg dansk licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Skatteforholdene ved casinospil i Danmark er enkle, så længe du vælger et casino med dansk licens: <strong>0 % skat, ingen selvangivelse, ingen grænser.</strong> Det er et af verdens mest spillervenlige skattesystemer.</p>
          <p className="text-muted-foreground leading-relaxed">Spiller du på udenlandske casinoer uden EU-licens, risikerer du at betale op til 52 % i skat af dine gevinster. Besøg vores <Link to="/top-10-casino-online" className={linkClass}>top 10 online casino</Link> for de bedste skattefri casinomuligheder i Danmark.</p>
        </section>

        <CommunityPromoSection />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinoer/casino-og-skat" />

        <FAQSection title="Ofte stillede spørgsmål om casino og skat" faqs={faqs} />
      </div>
    </>
  );
};

export default CasinoOgSkatGuide;
