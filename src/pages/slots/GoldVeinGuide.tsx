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
const PAGE_PATH = "/casinospil/spillemaskiner/gold-vein";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Gold Vein's RTP?", answer: <><Link to="/ordbog/rtp" className={lk}>RTP</Link> er 95,96 % med medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. <Link to="/spiludviklere/booming-games" className={lk}>Booming Games</Link> tilbyder solide matematiske fundamenter i deres slots.</> },
  { question: "Hvordan fungerer free spins?", answer: <>Free spins aktiveres via 3+ scatter-symboler. Under free spins kan sticky wilds lande og forblive på plads gennem hele bonusrunden, hvilket gradvist bygger gevinstpotentialet op.</> },
  { question: "Hvad er max win?", answer: <>Max win er 2.500× indsatsen. Sticky wilds under free spins er nøglen til de største gevinster, særligt når flere hjul er dækket.</> },
  { question: "Hvem er Booming Games?", answer: <><Link to="/spiludviklere/booming-games" className={lk}>Booming Games</Link> er en international spiludvikler med kontorer i Isle of Man og Asien, kendt for et diverst udvalg af slots med varierede temaer og solide matematiske profiler.</> },
];

const GoldVeinGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({ headline: "Gold Vein – Booming Games Sticky Wilds Slot", description: "Guide til Gold Vein fra Booming Games: sticky wilds, free spins, RTP 95,96 % og medium volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", const articleSchema = buildArticleSchema({ headline: "Gold Vein – Booming Games Sticky Wilds Slot", description: "Guide til Gold Vein fra Booming Games: sticky wilds, free spins, RTP 95,96 % og medium volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", authorName: "Casinoaftaler Redaktionen", authorUrl: `${SITE_URL}` }); });

  return (
    <>
      <SEO title="Gold Vein – Sticky Wilds & Free Spins" description="Analyse af Gold Vein fra Booming Games: sticky wilds, free spins, RTP 95,96 % og medium volatilitet." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(40 70% 20%), hsl(30 60% 25%) 40%, hsl(20 50% 20%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Gold Vein – Booming Games Sticky Wilds Slot</h1>
          <p className="text-lg text-white/80">Booming Games' guldsøgning-tema med sticky wilds i free spins og et solidt medium volatilitet-gameplay.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-12" readTime="11 min" />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Sticky Wilds i Free Spins</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Gold Vein fra <Link to="/spiludviklere/booming-games" className={lk}>Booming Games</Link> kombinerer et klassisk guldsøgning-tema med sticky wilds under free spins. Hver wild der lander under bonusrunden forbliver fastlåst, og over multiple spins kan dette bygge massive gevinstpotentialer op på tværs af alle hjul.</p>
        </section>
        <InlineCasinoCards />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ordbog/rtp" className={lk}>RTP</Link> 95,96 %. Medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. Max win 2.500×. Bankroll: 150-200 spins. Et tilgængeligt valg for spillere der ønsker et tematisk stærkt spil med moderate risici.</p>
        </section>
        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ansvarligt-spil" className={lk}>Spil ansvarligt</Link>. Brug <Link to="/ansvarligt-spil/rofus" className={lk}>ROFUS</Link> eller <Link to="/ansvarligt-spil/stopspillet" className={lk}>StopSpillet</Link> ved behov.</p>
        </section>
        <SlotProviderLink slotSlug="gold-vein" />
        <SlotDataLink slotSlug="gold-vein" slotName="Gold Vein" />
        <LatestNewsByCategory pagePath={PAGE_PATH} />
        <FAQSection title="FAQ om Gold Vein" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <AuthorBio author="jonas" showCommunity={false} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default GoldVeinGuide;
