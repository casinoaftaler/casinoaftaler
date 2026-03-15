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
const PAGE_PATH = "/casinospil/spillemaskiner/chilli-pop";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Chilli Pop's RTP?", answer: <><Link to="/ordbog/rtp" className={lk}>RTP</Link> er 96,00 % med medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. <Link to="/spiludviklere/betsoft" className={lk}>Betsoft</Link> er kendt for visuelt imponerende 3D-slots.</> },
  { question: "Hvordan fungerer expanding grid?", answer: <>Chilli Pop starter med et 5×3 grid, der kan udvides til op til 5×8 via <Link to="/ordbog/cascading-wins" className={lk}>cascading wins</Link>. Hver cascade tilføjer en ekstra række, hvilket øger antallet af gevinstmuligheder markant.</> },
  { question: "Hvad er max win?", answer: <>Max win er 2.840× indsatsen. Moderat, men det expanderende grid og de stigende multipliers skaber en engagerende dynamik med jævne mellemstore gevinster.</> },
  { question: "Hvem er Betsoft?", answer: <><Link to="/spiludviklere/betsoft" className={lk}>Betsoft</Link> er en pionér inden for 3D-slots, grundlagt i 2006. De er kendt for cinematiske spilleoplevelser med detaljerede animationer og innovative bonusfeatures.</> },
];

const ChilliPopGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({ headline: "Chilli Pop – Betsofts 3D Cascading Slot", description: "Guide til Chilli Pop fra Betsoft: expanding grid, cascading wins, RTP 96,00 % og medium volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", const articleSchema = buildArticleSchema({ headline: "Chilli Pop – Betsofts 3D Cascading Slot", description: "Guide til Chilli Pop fra Betsoft: expanding grid, cascading wins, RTP 96,00 % og medium volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", authorName: "Casinoaftaler Redaktionen", authorUrl: `${SITE_URL}` }); });

  return (
    <>
      <SEO title="Chilli Pop – Expanding Grid & Cascading Wins" description="Analyse af Chilli Pop fra Betsoft: expanding grid, cascading wins, RTP 96,00 % og strategisk guide." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(10 70% 25%), hsl(40 60% 20%) 40%, hsl(60 50% 25%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Chilli Pop – Betsofts 3D Cascading Slot</h1>
          <p className="text-lg text-white/80">Betsofts farverige 3D-slot med expanding grid, cascading wins og mexicansk fiesta-tema.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" date="2026-03-12" readTime="12 min" />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Expanding Grid & Cascading Wins</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Chilli Pop fra <Link to="/spiludviklere/betsoft" className={lk}>Betsoft</Link> kombinerer <Link to="/ordbog/cascading-wins" className={lk}>cascading wins</Link> med et grid der kan ekspandere fra 5×3 til 5×8. Hver cascade tilføjer en ekstra række, og nye symboler falder ned for at skabe yderligere gevinstmuligheder. Betsofts karakteristiske 3D-grafik giver spillemaskinen et visuelt imponerende udtryk.</p>
        </section>
        <InlineCasinoCards />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ordbog/rtp" className={lk}>RTP</Link> på 96,00 % og medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. Max win 2.840×. Bankroll: 150-200 spins. Velegnet til <Link to="/casino-bonus" className={lk}>casino bonusser</Link> med <Link to="/omsaetningskrav" className={lk}>omsætningskrav</Link>.</p>
        </section>
        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ansvarligt-spil" className={lk}>Spil ansvarligt</Link> og benyt <Link to="/ansvarligt-spil/rofus" className={lk}>ROFUS</Link> ved behov.</p>
        </section>
        <SlotProviderLink slotSlug="chilli-pop" />
        <SlotDataLink slotSlug="chilli-pop" slotName="Chilli Pop" />
        <LatestNewsByCategory pagePath={PAGE_PATH} />
        <FAQSection title="FAQ om Chilli Pop" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <AuthorBio author="jonas" showCommunity={false} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default ChilliPopGuide;
