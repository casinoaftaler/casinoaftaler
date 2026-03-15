import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
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
const PAGE_PATH = "/casinospil/spillemaskiner/big-bad-wolf";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Big Bad Wolf's RTP?", answer: <><Link to="/ordbog/rtp" className={lk}>RTP</Link> er 97,34 % – en af de højeste i online slots-verdenen. <Link to="/ordbog/house-edge" className={lk}>House edge</Link> er kun 2,66 %, hvilket gør Big Bad Wolf til et matematisk fordelagtigt valg.</> },
  { question: "Hvordan fungerer Swooping Reels?", answer: <>Swooping Reels er <Link to="/spiludviklere/quickspin" className={lk}>Quickspin</Link>s version af <Link to="/ordbog/cascading-wins" className={lk}>cascading wins</Link>. Vindende symboler forsvinder og erstattes af nye, og efter 2+ consecutive wins transformeres grisesymboler til wilds – en progressiv mekanik.</> },
  { question: "Er Big Bad Wolf god til bonusspil?", answer: <>Ja! Med 97,34 % RTP og medium volatilitet er Big Bad Wolf ideel til <Link to="/omsaetningskrav" className={lk}>omsætningskrav</Link>. Den høje RTP minimerer det matematiske tab under gennemspilning. Se vores <Link to="/casino-bonus" className={lk}>bonusguide</Link>.</> },
  { question: "Hvad er max win?", answer: <>Max win er ca. 1.217× indsatsen. Moderat sammenlignet med high-volatility slots, men den hyppige gevinstrate og høje RTP kompenserer.</> },
];

const BigBadWolfGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Big Bad Wolf – Quickspins Høj-RTP Klassiker",
    description: "Guide til Big Bad Wolf fra Quickspin: Swooping Reels, 97,34 % RTP og progressiv wild-mekanik.",
    url: `${SITE_URL}${PAGE_PATH}`,
    datePublished: "2026-03-12",
    dateModified: "2026-03-12",
    authorName: "Casinoaftaler Redaktionen",
    authorUrl: `${SITE_URL}`,
  });

  return (
    <>
      <SEO title="Big Bad Wolf – 97,34 % RTP & Swooping Reels" description="Analyse af Big Bad Wolf fra Quickspin: Swooping Reels, 97,34 % RTP og progressiv wild-transformation." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(120 30% 20%), hsl(90 40% 25%) 40%, hsl(60 30% 20%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Big Bad Wolf – Quickspins Høj-RTP Klassiker</h1>
          <p className="text-lg text-white/80">Quickspins mest populære slot med 97,34 % RTP, Swooping Reels og progressiv wild-transformation.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" date="2026-03-12" readTime="14 min" />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Swooping Reels & Progressive Wilds</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Big Bad Wolf fra <Link to="/spiludviklere/quickspin" className={lk}>Quickspin</Link> innoverer med Swooping Reels: <Link to="/ordbog/cascading-wins" className={lk}>cascading wins</Link> hvor symboler "swooper" ned. Efter 2+ consecutive wins transformeres grisesymboler progressivt til wilds – en unik mekanik, der belønner længere gevinstkæder.</p>
        </section>
        <InlineCasinoCards />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed">Med en <Link to="/ordbog/rtp" className={lk}>RTP</Link> på 97,34 % er Big Bad Wolf et af de mest spillervenlige valg i <Link to="/slot-database" className={lk}>vores database</Link>. Medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link> og jævn gevinstfordeling gør den perfekt til <Link to="/velkomstbonus" className={lk}>velkomstbonusser</Link> med <Link to="/omsaetningskrav" className={lk}>omsætningskrav</Link>. Bankroll: 100-150 spins er tilstrækkeligt.</p>
        </section>
        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ansvarligt-spil" className={lk}>Spil ansvarligt</Link> og benyt <Link to="/ansvarligt-spil/spillegraenser" className={lk}>spillegrænser</Link>.</p>
        </section>
        <SlotProviderLink slotSlug="big-bad-wolf" />
        <SlotDataLink slotSlug="big-bad-wolf" slotName="Big Bad Wolf" />
        <LatestNewsByCategory pagePath={PAGE_PATH} />
        <FAQSection title="FAQ om Big Bad Wolf" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default BigBadWolfGuide;
