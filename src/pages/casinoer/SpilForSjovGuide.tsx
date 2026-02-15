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
import { CommunityPromoSection } from "@/components/CommunityPromoSection";
import heroImage from "@/assets/heroes/spil-for-sjov-hero.jpg";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";
import { Sparkles, Star, AlertTriangle, Target, Heart, Smile } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Kan man virkelig spille casino gratis og vinde rigtige penge?", answer: (<>Ja, det er muligt via <Link to="/bonus-uden-indbetaling" className={linkClass}>casino bonus uden indbetaling</Link> og <Link to="/free-spins" className={linkClass}>free spins</Link>. Disse tilbud giver dig mulighed for at spille med casinoets penge og beholde eventuelle gevinster (efter opfyldelse af omsætningskrav).</>) },
  { question: "Hvad er demo-tilstand, og hvordan fungerer det?", answer: "Demo-tilstand (også kaldet 'play for fun' eller 'free play') lader dig spille spilleautomater og bordspil med virtuelle penge – ingen registrering eller indbetaling nødvendig. Spillene fungerer identisk med rigtige penge-versioner med samme RTP og funktionalitet." },
  { question: "Kræver gratis casinospil registrering?", answer: "Det afhænger af typen. Demo-tilstand kræver typisk ingen registrering. Men gratis bonusser, free spins uden indbetaling og andre kampagner kræver oprettelse af en konto med identitetsverifikation via MitID." },
  { question: "Hvad er omsætningskrav på gratis bonusser?", answer: (<><Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> angiver, hvor mange gange du skal spille bonusbeløbet igennem, før du kan hæve gevinster. For gratis bonusser uden indbetaling er kravene typisk 20–40x bonusbeløbet.</>) },
  { question: "Hvilke spil kan man spille gratis?", answer: (<>Næsten alle <Link to="/casinospil" className={linkClass}>casinospil</Link> er tilgængelige i demo-tilstand. Den eneste undtagelse er <Link to="/live-casino" className={linkClass}>live casino</Link>, som kræver rigtige penge.</>) },
  { question: "Er gratis casinospil helt risikofri?", answer: "Demo-tilstand er 100 % risikofri – du bruger virtuelle penge og kan ikke tabe noget. Gratis bonusser med registrering indebærer ingen finansiel risiko, men vær opmærksom på at udvikle spillevaner." },
  { question: "Er spil i demo-tilstand ens med rigtige penge-versionen?", answer: "Ja, licenserede casinoer er forpligtet til at sikre, at demo-versioner bruger identisk RTP og tilfældighedsgenerator som rigtige penge-versionen. Dette er reguleret af Spillemyndigheden." },
];

const SpilForSjovGuide = () => {
  const articleSchema = buildArticleSchema({ headline: "Spil Casino for Sjov 2026 – Gratis Casinospil i Danmark", description: "Guide til gratis casinospil i Danmark 2026.", url: `${SITE_URL}/casinoer/spil-casino-for-sjov`, datePublished: "2026-02-01", dateModified: "2026-02-15" });
  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

  return (
    <>
      <SEO title="Spil Casino for Sjov 2026 – Gratis Casino Spil uden Risiko" description="Guide til gratis casinospil i Danmark 2026. Spil casino for sjov med demo-tilstand, gratis bonusser og free spins uden indbetaling. Lær spillene at kende risikofrit." jsonLd={[articleSchema, faqSchema]} />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Smile className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Spil Casino for Sjov – Gratis Casinospil 2026
            </h1>
            <p className="text-lg text-white/80">
              Den komplette guide til at spille casino gratis. Demo-tilstand, bonus uden indbetaling, free spins og alt om risikofrit casinospil i Danmark.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="1. februar 2026" readTime="16 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Spil casino for sjov – gratis casinospil" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over gratis casinospil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Ikke al casinospil handler om penge. Mange danske spillere nyder casinospil som ren underholdning – ligesom man ser en film eller spiller et videospil. Heldigvis er der masser af muligheder for at spille casino helt gratis, hvad enten du vil lære et nyt spil at kende, teste en strategi eller blot have det sjovt uden finansiel risiko.</p>
          <p className="text-muted-foreground leading-relaxed">I denne guide gennemgår vi alle muligheder for at spille casino for sjov: Demo-tilstand på spilleautomater, <Link to="/bonus-uden-indbetaling" className={linkClass}>gratis bonusser uden indbetaling</Link>, <Link to="/free-spins" className={linkClass}>free spins</Link> og sociale casinospil. Vi forklarer, hvordan du finder de bedste gratis muligheder.</p>
        </section>

        <InlineCasinoCards title="Casinoer med gratis demo-spil og bonusser" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Sparkles className="h-7 w-7 text-primary" /> 3 måder at spille casino gratis på</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="border-border bg-card"><CardContent className="pt-6"><h3 className="font-bold mb-3 text-lg">1. Demo-tilstand</h3><p className="text-sm text-muted-foreground mb-3">Den enkleste og mest risikofrie metode. Næsten alle spilleautomater og bordspil kan spilles i demo-tilstand direkte i din browser – ingen registrering, ingen indbetaling, ingen personlige oplysninger.</p><Badge className="bg-green-500/20 text-green-500">100 % risikofri</Badge></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6"><h3 className="font-bold mb-3 text-lg">2. Bonus uden indbetaling</h3><p className="text-sm text-muted-foreground mb-3"><Link to="/bonus-uden-indbetaling" className={linkClass}>Bonusser uden indbetaling</Link> giver dig rigtige penge at spille for – typisk 50–200 kr. – uden at du skal indsætte noget selv. Du kan vinde rigtige penge, men der gælder omsætningskrav.</p><Badge className="bg-yellow-500/20 text-yellow-500">Kan vinde rigtige penge</Badge></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6"><h3 className="font-bold mb-3 text-lg">3. Free spins uden indbetaling</h3><p className="text-sm text-muted-foreground mb-3"><Link to="/free-spins" className={linkClass}>Gratis spins</Link> giver dig et antal gratis runder på udvalgte spilleautomater. Du kan vinde rigtige penge fra dine gratis spins, men gevinster er typisk underlagt omsætningskrav.</p><Badge className="bg-yellow-500/20 text-yellow-500">Kan vinde rigtige penge</Badge></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Target className="h-7 w-7 text-primary" /> Fordele ved at spille casino for sjov</h2>
          <div className="space-y-3 mb-6">
            {[
              { title: "Lær spillene at kende risikofrit", desc: "Demo-tilstand er perfekt til at forstå et spils mekanik, bonusfunktioner og betalingsstruktur." },
              { title: "Test strategier uden konsekvenser", desc: "For strategispil som blackjack og poker kan du øve grundlæggende strategi og avancerede teknikker." },
              { title: "Find dine favoritspil", desc: "Med tusindvis af tilgængelige spilleautomater er demo-tilstand den bedste måde at udforske udvalget." },
              { title: "Ren underholdning uden stress", desc: "Uden finansiel risiko kan du nyde casinospillet som ren underholdning." },
              { title: "Ansvarligt spil starter her", desc: "Gratis spil er den perfekte start for nye spillere." },
            ].map((benefit, i) => (
              <Card key={i} className="border-border bg-card"><CardContent className="flex items-start gap-4 pt-4"><Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><div><h3 className="font-semibold mb-1">{benefit.title}</h3><p className="text-sm text-muted-foreground">{benefit.desc}</p></div></CardContent></Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><AlertTriangle className="h-7 w-7 text-yellow-500" /> Ting du skal være opmærksom på</h2>
          <Card className="bg-yellow-500/5 border-yellow-500/20 mb-6"><CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> <strong>Demo-spil kan skabe urealistiske forventninger:</strong> Virtuelle penge fjerner den emotionelle komponent ved rigtige penge.</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> <strong>Gratis bonusser har altid vilkår:</strong> Læs altid de fulde vilkår for bonusser uden indbetaling.</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> <strong>Overgangen fra gratis til rigtige penge:</strong> Vær bevidst om skiftet. Brug <Link to="/responsible-gaming" className={linkClass}>selvbegrænsningsværktøjer</Link> fra dag ét.</li>
            </ul>
          </CardContent></Card>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">At spille casino for sjov er en fantastisk måde at nyde casinounderholdning uden finansiel risiko. Demo-tilstand er perfekt til at lære spil at kende og teste strategier, mens gratis bonusser og free spins giver dig mulighed for at vinde rigtige penge uden at investere dine egne. Uanset hvad du vælger, er det vigtigt at holde det sjovt og <Link to="/responsible-gaming" className={linkClass}>spille ansvarligt</Link>.</p>
          <p className="text-muted-foreground leading-relaxed">Når og hvis du er klar til at spille med rigtige penge, anbefaler vi altid at starte med en lille indbetaling på et <Link to="/licenserede-casinoer" className={linkClass}>licenseret dansk casino</Link> og udnytte en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> med lave <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.</p>
        </section>

        <CommunityPromoSection />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinoer/spil-casino-for-sjov" />

        <FAQSection title="Ofte stillede spørgsmål om gratis casinospil" faqs={faqs} />
      </div>
    </>
  );
};

export default SpilForSjovGuide;
