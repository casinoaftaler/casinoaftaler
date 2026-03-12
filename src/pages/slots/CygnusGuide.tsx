import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SlotProviderLink } from "@/components/SlotProviderLink";
import { SlotDataLink } from "@/components/SlotDataLink";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calculator, Flame, Shield } from "lucide-react";

const lk = "text-primary underline hover:text-primary/80";
const PAGE_PATH = "/casinospil/spillemaskiner/cygnus";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Cygnus' RTP?", answer: <>Cygnus har en <Link to="/ordbog/rtp" className={lk}>RTP</Link> på 96,10 % med medium-høj <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. <Link to="/spiludviklere/elk-studios" className={lk}>ELK Studios</Link>' Gravity-mekanik giver en unik spilleoplevelse.</> },
  { question: "Hvordan fungerer Gravity-mekanikken?", answer: <>I stedet for at symboler falder ned ovenfra (som i traditionelle cascading wins), falder symbolerne i Cygnus opad – en omvendt <Link to="/ordbog/cascading-wins" className={lk}>cascading wins</Link>-mekanik. Dette skaber et unikt visuelt flow og påvirker, hvordan gevinstmønstre dannes.</> },
  { question: "Hvad er max win?", answer: <>Max win er 5.000× indsatsen. Med stigende multipliers under cascades og expanding grid-mekanikken kan store gevinster bygges over flere consecutive wins.</> },
  { question: "Hvem er ELK Studios?", answer: <><Link to="/spiludviklere/elk-studios" className={lk}>ELK Studios</Link> er et svensk spiludviklerstudie grundlagt i 2013, kendt for innovative mekanikker som Gravity, Avalanche og deres Betting Strategies-system. Cygnus er en af deres mest populære titler.</> },
];

const CygnusGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({ headline: "Cygnus – ELK Studios Gravity-Mekanik Guide", description: "Komplet analyse af Cygnus fra ELK Studios: Gravity-mekanik, expanding grid, RTP 96,10 % og medium-høj volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", authorName: "Jonas", authorUrl: `${SITE_URL}/forfatter/jonas` });

  return (
    <>
      <SEO title="Cygnus – Gravity-Mekanik & Expanding Grid" description="Analyse af Cygnus fra ELK Studios: Gravity-mekanik, expanding grid, RTP 96,10 % og strategisk guide." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 50% 25%), hsl(280 40% 20%) 40%, hsl(300 50% 25%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Cygnus – ELK Studios Gravity-Mekanik Guide</h1>
          <p className="text-lg text-white/80">ELK Studios' innovative Gravity-slot: omvendt cascading wins, expanding grid og en matematisk gennemgang.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-12" readTime="14 min" />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Gravity-Mekanik: Omvendt Cascading</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Cygnus fra <Link to="/spiludviklere/elk-studios" className={lk}>ELK Studios</Link> introducerer Gravity – en omvendt <Link to="/ordbog/cascading-wins" className={lk}>cascading wins</Link>-mekanik, hvor symboler stiger opad i stedet for at falde ned. Griddet starter som 6×2 og kan udvides til 6×8 med op til 262.144 gevinstmuligheder under cascades.</p>
          <p className="text-muted-foreground leading-relaxed">Hver cascade aktiverer en stigende multiplier, og i kombination med det expanderende grid kan dette skabe store gevinstpotentialer. Free spins udløses via scatter-symboler og beholder det aktuelle grid-niveau.</p>
        </section>
        <InlineCasinoCards />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ordbog/rtp" className={lk}>RTP</Link> på 96,10 % og medium-høj <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. Max win er 5.000×. En bankroll på 200-250 spins anbefales. Spillets balance mellem innovation og fair matematisk profil gør det til et solidt valg for både underholdnings- og bonusspillere med <Link to="/velkomstbonus" className={lk}>velkomstbonus</Link>.</p>
        </section>
        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed">Spil altid ansvarligt og sæt <Link to="/ansvarligt-spil/spillegraenser" className={lk}>spillegrænser</Link>. Kontakt <Link to="/ansvarligt-spil/rofus" className={lk}>ROFUS</Link> ved behov.</p>
        </section>
        <SlotProviderLink slot="cygnus" />
        <SlotDataLink slotName="Cygnus" />
        <FAQSection title="FAQ om Cygnus" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <AuthorBio author="jonas" showCommunity={false} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default CygnusGuide;
