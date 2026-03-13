import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { SlotProviderLink } from "@/components/SlotProviderLink";
import { SlotDataLink } from "@/components/SlotDataLink";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, BarChart3, Zap, Calculator, Flame, Shield, Target, Trophy } from "lucide-react";

const lk = "text-primary underline hover:text-primary/80";
const PAGE_PATH = "/casinospil/spillemaskiner/vikings-go-berzerk";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Vikings Go Berzerk's RTP?", answer: <>Vikings Go Berzerk har en <Link to="/ordbog/rtp" className={lk}>RTP</Link> på 96,10 %, hvilket er solidt i midterfeltet. <Link to="/ordbog/house-edge" className={lk}>House edge</Link> er 3,90 %, og med medium-høj volatilitet giver det en balanceret gevinstprofil.</> },
  { question: "Hvordan fungerer Berzerk-modusen?", answer: <>Hver viking har en rage-meter, der fyldes op over tid. Når en meter er fuld, går vikingen "berzerk" i den næste bonusrunde og er garanteret at besejre sin søslange, hvilket giver ekstra free spins og wilds. Dette skaber en progressiv mekanik, der belønner langvarige sessioner.</> },
  { question: "Hvad er max win på Vikings Go Berzerk?", answer: <>Max win er 4.000× indsatsen. Selvom dette er lavere end ultra-volatile slots som <Link to="/casinospil/spillemaskiner/tombstone-rip" className={lk}>Tombstone RIP</Link>, kompenserer den højere hit frequency for et mere konsistent gevinstmønster. Typiske store gevinster ligger i 200-800× intervallet.</> },
  { question: "Er Vikings Go Berzerk god til bonusspil?", answer: <>Med medium-høj volatilitet er Vikings Go Berzerk et rimeligt valg til <Link to="/omsaetningskrav" className={lk}>omsætningskrav</Link>. Den progressive rage-meter fungerer godt over længere sessioner, og free spins-funktionen har en fornuftig trigger-rate. For optimal bonusspil, se vores <Link to="/casino-bonus" className={lk}>bonusguide</Link>.</> },
  { question: "Hvem har lavet Vikings Go Berzerk?", answer: <><Link to="/spiludviklere/yggdrasil" className={lk}>Yggdrasil Gaming</Link> udviklede Vikings Go Berzerk som del af den populære Vikings-serie, der også inkluderer Vikings Go Wild og Vikings Go to Hell. Yggdrasil er kendt for visuelt imponerende slots med innovative mekanikker.</> },
];

const VikingsGoBerzerkGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({ headline: "Vikings Go Berzerk – Rage-Meter & Free Spins Analyse", description: "Komplet analyse af Vikings Go Berzerk fra Yggdrasil: rage-meter progression, free spins med berzerk-wilds, RTP 96,10 % og medium-høj volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", authorName: "Jonas", authorUrl: `${SITE_URL}/forfatter/jonas` });

  return (
    <>
      <SEO title="Vikings Go Berzerk – Rage-Meter & Free Spins" description="Dybdegående analyse af Vikings Go Berzerk: rage-meter, berzerk-mode, free spins og RTP 96,10 % for danske spillere." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(200 50% 20%), hsl(220 60% 25%) 40%, hsl(240 50% 20%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Vikings Go Berzerk – Rage-Meter & Free Spins Analyse</h1>
          <p className="text-lg text-white/80">Yggdrasil Gamings progressive viking-eventyr: rage-meter mekanik, berzerk-mode wilds og en matematisk gennemgang af free spins-potentialet.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-12" readTime="16 min" />

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Rage-Meter: Progressiv Spillemekanik</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Vikings Go Berzerk fra <Link to="/spiludviklere/yggdrasil" className={lk}>Yggdrasil Gaming</Link> introducerer en progressiv rage-meter for fire vikinger. Hver gang en viking deltager i en gevinst, fyldes deres individuelle meter. Når meteren er fuld, aktiveres "berzerk-mode" i den næste free spins-runde.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">I berzerk-mode garanteres vikingen at besejre sin søslange, hvilket giver ekstra free spins og transformerer vikingen til et expanding wild-symbol. Denne mekanik belønner tålmodige spillere og skaber en unik dynamik, hvor sessionens historie påvirker fremtidige bonusrunder.</p>
        </section>

        <InlineCasinoCards />

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Med en <Link to="/ordbog/rtp" className={lk}>RTP</Link> på 96,10 % og medium-høj <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link> placerer Vikings Go Berzerk sig i en sweet spot for spillere, der ønsker pænt gevinstpotentiale uden ekstrem varians. Max win på 4.000× er opnåelig i praksis og kræver typisk 3-4 berzerk-vikinger under en enkelt free spins-runde.</p>
          <p className="text-muted-foreground leading-relaxed">I vores <Link to="/bonus-hunt/arkiv" className={lk}>bonus hunts</Link> har Vikings Go Berzerk vist sig som en pålidelig performer med konsistente, om end sjældent spektakulære, resultater. En bankroll på 200-300 spins er tilstrækkelig for denne volatilitetsprofil.</p>
        </section>

        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed">Husk altid at spille inden for dine grænser. Benyt <Link to="/ansvarligt-spil/spillegraenser" className={lk}>spillegrænser</Link> og kontakt <Link to="/ansvarligt-spil/stopspillet" className={lk}>StopSpillet</Link> hvis du har brug for hjælp.</p>
        </section>

        <SlotProviderLink slotSlug="vikings-go-berzerk" />
        <SlotDataLink slotSlug="vikings-go-berzerk" slotName="Vikings Go Berzerk" />
        <LatestNewsByCategory pagePath={PAGE_PATH} />
        <FAQSection title="Ofte stillede spørgsmål om Vikings Go Berzerk" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <AuthorBio author="jonas" showCommunity={false} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default VikingsGoBerzerkGuide;
