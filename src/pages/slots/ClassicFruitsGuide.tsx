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
import { Sparkles, Calculator, Flame, Shield } from "lucide-react";

const lk = "text-primary underline hover:text-primary/80";
const PAGE_PATH = "/casinospil/spillemaskiner/classic-fruits";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Classic Fruits' RTP?", answer: <><Link to="/ordbog/rtp" className={lk}>RTP</Link> er 96,52 % – over gennemsnittet. <Link to="/spiludviklere/stakelogic" className={lk}>Stakelogic</Link>s Super Stake-feature øger både indsats og gevinstpotentiale.</> },
  { question: "Hvordan fungerer Super Stake?", answer: <>Super Stake er Stakelogics signaturfeature: ved at fordoble indsatsen aktiveres ekstra bonusmuligheder og højere multipliers. Det giver spilleren mulighed for at vælge en mere aggressiv profil.</> },
  { question: "Hvad er max win?", answer: <>Max win er 500× indsatsen (standard) og op til 1.000× med Super Stake aktiveret. Et klassisk frugtmaskin-format med moderne forbedringer.</> },
  { question: "Hvem er Stakelogic?", answer: <><Link to="/spiludviklere/stakelogic" className={lk}>Stakelogic</Link> er et hollandsk spiludviklerstudie, tidligere Novomatic Digital Gaming, kendt for Super Stake-teknologien og klassiske spil med moderne twist.</> },
];

const ClassicFruitsGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({ headline: "Classic Fruits – Stakelogics Super Stake Slot", description: "Guide til Classic Fruits fra Stakelogic: Super Stake-feature, RTP 96,52 % og klassisk frugtmaskin-gameplay.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", const articleSchema = buildArticleSchema({ headline: "Classic Fruits – Stakelogics Super Stake Slot", description: "Guide til Classic Fruits fra Stakelogic: Super Stake-feature, RTP 96,52 % og klassisk frugtmaskin-gameplay.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", authorName: "Casinoaftaler Redaktionen", authorUrl: `${SITE_URL}` }); });

  return (
    <>
      <SEO title="Classic Fruits – Super Stake & Klassisk Gameplay" description="Analyse af Classic Fruits fra Stakelogic: Super Stake-feature, RTP 96,52 % og klassisk frugtmaskin." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(120 50% 20%), hsl(80 60% 25%) 40%, hsl(50 50% 20%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Classic Fruits – Stakelogics Super Stake Slot</h1>
          <p className="text-lg text-white/80">Stakelogics klassiske frugtmaskin med den innovative Super Stake-feature for øget gevinstpotentiale.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-12" readTime="11 min" />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Super Stake: Fordoblet Potentiale</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Classic Fruits fra <Link to="/spiludviklere/stakelogic" className={lk}>Stakelogic</Link> kombinerer klassisk frugtmaskin-nostalgi med den moderne Super Stake-feature. Ved at aktivere Super Stake fordobles indsatsen, men til gengæld låses ekstra bonusmuligheder op – en innovativ tilgang til klassisk gameplay.</p>
        </section>
        <InlineCasinoCards />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ordbog/rtp" className={lk}>RTP</Link> 96,52 % – over gennemsnittet. Lav-medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. Max win 1.000× (Super Stake). Bankroll: 80-120 spins. Perfekt til <Link to="/velkomstbonus" className={lk}>velkomstbonusser</Link>.</p>
        </section>
        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ansvarligt-spil" className={lk}>Spil ansvarligt</Link>. Benyt <Link to="/ansvarligt-spil/spillegraenser" className={lk}>spillegrænser</Link>.</p>
        </section>
        <SlotProviderLink slotSlug="classic-fruits" />
        <SlotDataLink slotSlug="classic-fruits" slotName="Classic Fruits" />
        <LatestNewsByCategory pagePath={PAGE_PATH} />
        <FAQSection title="FAQ om Classic Fruits" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <AuthorBio author="jonas" showCommunity={false} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default ClassicFruitsGuide;
