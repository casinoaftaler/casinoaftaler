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
const PAGE_PATH = "/casinospil/spillemaskiner/hot-spin-deluxe";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er Hot Spin Deluxe's RTP?", answer: <><Link to="/ordbog/rtp" className={lk}>RTP</Link> er 96,06 % med medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. <Link to="/spiludviklere/isoftbet" className={lk}>iSoftBet</Link> tilbyder en stabil gevinstprofil med jævne udbetalinger.</> },
  { question: "Hvordan fungerer bonus-hjulet?", answer: <>Hot Spin Deluxe har et unikt bonus-hjul med 7 forskellige bonusfeatures. Når 3+ scatters lander, spinner bonus-hjulet og tildeler en tilfældig feature – fra expanding wilds til multiplikatorer og extra free spins.</> },
  { question: "Hvad er max win?", answer: <>Max win er 5.000× indsatsen. Den opnås via en kombination af de bedste bonusfeatures fra hjulet, særligt Expanding Wild Reels med multipliers.</> },
  { question: "Hvem er iSoftBet?", answer: <><Link to="/spiludviklere/isoftbet" className={lk}>iSoftBet</Link> er en international spiludvikler med hovedkontor i London og Luxembourg, kendt for innovative bonusmekanikker og et bredt udvalg af tematiske slots.</> },
];

const HotSpinDeluxeGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({ headline: "Hot Spin Deluxe – iSoftBets Bonus-Hjul Slot", description: "Guide til Hot Spin Deluxe fra iSoftBet: 7 bonusfeatures, bonus-hjul mekanik, RTP 96,06 % og medium volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", const articleSchema = buildArticleSchema({ headline: "Hot Spin Deluxe – iSoftBets Bonus-Hjul Slot", description: "Guide til Hot Spin Deluxe fra iSoftBet: 7 bonusfeatures, bonus-hjul mekanik, RTP 96,06 % og medium volatilitet.", url: `${SITE_URL}${PAGE_PATH}`, datePublished: "2026-03-12", dateModified: "2026-03-12", authorName: "Casinoaftaler Redaktionen", authorUrl: `${SITE_URL}` }); });

  return (
    <>
      <SEO title="Hot Spin Deluxe – Bonus-Hjul & 7 Features" description="Analyse af Hot Spin Deluxe fra iSoftBet: bonus-hjul med 7 features, RTP 96,06 % og medium volatilitet." jsonLd={[faqJsonLd, articleSchema]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(0 70% 25%), hsl(30 60% 20%) 40%, hsl(50 50% 25%))" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Marts 2026</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Hot Spin Deluxe – iSoftBets Bonus-Hjul Slot</h1>
          <p className="text-lg text-white/80">iSoftBets populære slot med et unikt bonus-hjul der tildeler én af 7 forskellige bonusfeatures ved hvert trigger.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-03-12" readTime="13 min" />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-primary" />Bonus-Hjul med 7 Features</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Hot Spin Deluxe fra <Link to="/spiludviklere/isoftbet" className={lk}>iSoftBet</Link> skiller sig ud med sit bonus-hjul, der indeholder 7 forskellige bonusfeatures. Når 3 eller flere scatters lander, spinner hjulet og tildeler alt fra Expanding Wild Reels og Colossal Symbols til ekstra free spins med multipliers. Denne varierede tilgang giver hvert bonusrunde et unikt præg.</p>
        </section>
        <InlineCasinoCards />
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />RTP & Volatilitet</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ordbog/rtp" className={lk}>RTP</Link> på 96,06 % med medium <Link to="/ordbog/volatilitet" className={lk}>volatilitet</Link>. Max win 5.000×. Bankroll: 150-200 spins. Et godt valg til <Link to="/velkomstbonus" className={lk}>velkomstbonusser</Link> med moderate <Link to="/omsaetningskrav" className={lk}>omsætningskrav</Link>.</p>
        </section>
        <section className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Ansvarligt Spil</h2>
          <p className="text-muted-foreground leading-relaxed"><Link to="/ansvarligt-spil" className={lk}>Spil ansvarligt</Link>. Benyt <Link to="/ansvarligt-spil/spillegraenser" className={lk}>spillegrænser</Link> og kontakt <Link to="/ansvarligt-spil/rofus" className={lk}>ROFUS</Link> ved behov.</p>
        </section>
        <SlotProviderLink slotSlug="hot-spin-deluxe" />
        <SlotDataLink slotSlug="hot-spin-deluxe" slotName="Hot Spin Deluxe" />
        <LatestNewsByCategory pagePath={PAGE_PATH} />
        <FAQSection title="FAQ om Hot Spin Deluxe" faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
        <AuthorBio author="jonas" showCommunity={false} />
        <RelatedGuides currentPath={PAGE_PATH} />
      </div>
    </>
  );
};

export default HotSpinDeluxeGuide;
