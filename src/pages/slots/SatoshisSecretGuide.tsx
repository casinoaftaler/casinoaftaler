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
const PAGE_PATH = "/casinospil/spillemaskiner/satoshis-secret";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Satoshi's Secret's RTP?", answer: <><Link to="/ordbog/rtp" className={lk}>RTP</Link> er 96,00 % med medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. <Link to="/spiludviklere/endorphina" className={lk}>Endorphina</Link> tilbyder et unikt krypto-tema med solide matematiske fundamenter.</> },
  { question: "Hvad handler temaet om?", answer: <>Satoshi's Secret er bygget omkring kryptovaluta og blockchain-temaet, inspireret af Bitcoin-grundlæggeren Satoshi Nakamoto. Spillets symboler inkluderer kryptovaluta-ikoner, hacker-elementer og digitale kodestumper.</> },
  { question: "Hvad er max win?", answer: <>Max win er 1.000× indsatsen. Et mere moderat gevinstpotentiale, men med en jævn gevinstfordeling der passer til medium volatilitet.</> },
  { question: "Hvem er Endorphina?", answer: <><Link to="/spiludviklere/endorphina" className={lk}>Endorphina</Link> er en tjekkisk spiludvikler grundlagt i 2012, kendt for tematisk dybe slots og solide matematiske modeller.</> },
];

const SatoshisSecretGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({ headline: "Satoshi's Secret – Endorphinas Krypto-Slot", description: "Guide til Satoshi's Secret fra Endorphina: krypto-tema, RTP 96,00 % og medium volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", authorName: "Jonas", authorUrl: `${SITE_URL}/forfatter/jonas` });

  return (
    <>
      <SEO title="Satoshi's Secret – Krypto-Tema & Bonus Features" description="Analyse af Satoshi's Secret fra Endorphina: blockchain-tema, RTP 96,00 % og medium volatilitet." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(180 40% 15%), hsl(200 50% 20%) 40%, hsl(220 40% 15%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Satoshi's Secret – Endorphinas Krypto-Slot</h1>
          <p className="text-lg text-white/80">Endorphinas blockchain-inspirerede slot med kryptovaluta-tema og solide matematiske fundamenter.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-12" readTime="11 min" />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Krypto-Tema & Gameplay</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Satoshi's Secret fra <Link to="/spiludviklere/endorphina" className={lk}>Endorphina</Link> er en tematisk unik slot inspireret af Bitcoin og blockchain-teknologi. Spillets 5×3 grid med 10 gevinstlinjer tilbyder et enkelt men effektivt gameplay, suppleret af en bonus-runde der simulerer kryptovaluta-handel.</p>
        </section>
        <InlineCasinoCards />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ordbog/rtp" className={lk}>RTP</Link> 96,00 % med medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. Max win 1.000×. Bankroll: 100-150 spins. En nichevalg for krypto-entusiaster der ønsker tematisk relevante <Link to="/casinospil/spillemaskiner" className={lk}>spillemaskiner</Link>.</p>
        </section>
        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ansvarligt-spil" className={lk}>Spil ansvarligt</Link>. Kontakt <Link to="/ansvarligt-spil/stopspillet" className={lk}>StopSpillet</Link> ved behov.</p>
        </section>
        <SlotProviderLink slotSlug="satoshis-secret" />
        <SlotDataLink slotSlug="satoshis-secret" slotName="Satoshi's Secret" />
        <LatestNewsByCategory pagePath={PAGE_PATH} />
        <FAQSection title="FAQ om Satoshi's Secret" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <AuthorBio author="jonas" showCommunity={false} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default SatoshisSecretGuide;
