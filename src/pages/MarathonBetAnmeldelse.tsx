import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { buildArticleSchema } from "@/lib/seo";
import { QuickFactsProviders } from "@/components/QuickFactsProviders";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import type { ReactNode } from "react";
import { Star, Zap, Check, X, ShieldCheck } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const marathonbetFaqs: { question: string; answer: ReactNode }[] = [
  { question: "Er MarathonBet lovligt i Danmark?", answer: (<>Ja, MarathonBet opererer med dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og er tilsluttet <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Platformen overholder alle danske krav til <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> og bruger MitID til registrering.</>) },
  { question: "Hvad er MarathonBet bedst til?", answer: (<>MarathonBet er primært kendt for sine ekstremt konkurrencedygtige odds på sportsvæddemål. Platformens lave marginer gør den til et foretrukket valg for value-bettors og professionelle spillere. Casino-afdelingen er et supplement med et solidt udvalg af <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og bordspil.</>) },
  { question: "Hvorfor har MarathonBet bedre odds?", answer: "MarathonBet er kendt for at operere med lavere marginer end de fleste konkurrenter. Deres forretningsmodel fokuserer på høj volumen frem for høje marginer, hvilket betyder, at spillerne får bedre value på deres væddemål. Det er en strategi, der tiltrækker erfarne bettors, som ved, at selv små odds-forskelle akkumuleres over tid." },
  { question: "Tilbyder MarathonBet casino?", answer: (<>Ja, MarathonBet har en casino-sektion med spillemaskiner, bordspil som <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> og <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>, samt <Link to="/live-casino" className={linkClass}>live casino</Link>. Udvalget er mindre end hos specialiserede casinoplatforme, men dækker de mest populære titler og kategorier.</>) },
  { question: "Hvilke betalingsmetoder understøtter MarathonBet?", answer: (<>MarathonBet understøtter <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>. Udbetalinger til e-wallets behandles typisk inden for 24 timer.</>) },
  { question: "Er MarathonBet godt for begyndere?", answer: (<>MarathonBet er bedst for erfarne bettors, der forstår odds og value-betting. Interfacet er funktionelt, men ikke så intuitivt som hos <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> eller <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>. For nybegyndere, der ønsker en mere guidet oplevelse, kan andre platforme være bedre startpunkter.</>) },
];

const MarathonBetAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const articleSchema = buildArticleSchema({ headline: "MarathonBet Anmeldelse 2026 – Bedste Odds i Danmark?", description: "Dybdegående anmeldelse af MarathonBet. Dansk licens, ekstremt konkurrencedygtige odds og casino-supplement.", url: "https://casinoaftaler.dk/casino-anmeldelser/marathonbet", datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas" });
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: marathonbetFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question } })) };
  const reviewJsonLd = { "@context": "https://schema.org", "@type": "Review", itemReviewed: { "@type": "Organization", name: "MarathonBet", url: "https://www.marathonbet.dk/" }, author: { "@type": "Organization", name: "Casinoaftaler" }, reviewRating: { "@type": "Rating", ratingValue: "3.8", bestRating: "5" } };

  return (
    <>
      <SEO title="MarathonBet Anmeldelse 2026 – Bedste Odds | Casinoaftaler" description="Komplet anmeldelse af MarathonBet i Danmark. Kendt for branchens bedste odds og lave marginer. Dansk licens og solid sportsbog." jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]} />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" />3.8 / 5 – Value-Specialist</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">MarathonBet Anmeldelse 2026</h1>
          <p className="mb-6 text-lg text-white/80">Uafhængig anmeldelse af MarathonBet – sportsbogen med branchens laveste marginer og et solidt casino-supplement.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="16 Min." />
        <CasinoReviewHero slug="marathonbet" casinoName="MarathonBet" />
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – MarathonBet</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Styrke</p><p className="text-lg font-bold text-foreground">Bedste odds</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Licens</p><p className="text-lg font-bold text-foreground">Spillemyndigheden</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Grundlagt</p><p className="text-lg font-bold text-foreground">1997</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Marginer</p><p className="text-lg font-bold text-foreground">Branchens laveste</p></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Sportsgrene</p><p className="text-lg font-bold text-foreground">25+</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Casino spil</p><p className="text-lg font-bold text-foreground">600+</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Live betting</p><p className="text-lg font-bold text-foreground">Ja</p></div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Microgaming", "Pragmatic Play", "Evolution Gaming"]} />
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af MarathonBet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">MarathonBet er en sportsbogsoperatør, der har bygget sit ry på et simpelt princip: bedre odds. Mens de fleste bookmakers opererer med marginer på 5-8% på populære fodboldkampe, ligger MarathonBet konsekvent lavere – ofte helt nede på 2-3%. For seriøse bettors, der placerer hundredevis af væddemål årligt, akkumulerer denne forskel sig til en betydelig værdi.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Platformen blev grundlagt i 1997 og har hovedsæde i London. I Danmark opererer MarathonBet med licens fra Spillemyndigheden. Brandet er mindre kendt end <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> eller <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>, men har en dedikeret følgerskare blandt value-bettors og arbitrage-spillere.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Sportsbogen dækker 25+ sportsgrene med fodbold som flagskib. Markeder er tilgængelige for alle store ligaer og mange niche-turneringer. Live betting er funktionelt med hurtigt opdaterede odds, men mangler den visuelle polish og live-streaming, som <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> tilbyder.</p>
          <p className="text-muted-foreground leading-relaxed">Casino-afdelingen er sekundær med omkring 600+ spil fra <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> og <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>. <Link to="/live-casino" className={linkClass}>Live casinoet</Link> er drevet af Evolution Gaming. For dedikerede casino-spillere er MarathonBet ikke det optimale valg, men som supplement til sportsvæddemål fungerer det fint. Vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link> vurderer platformen primært på sports-produktet.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Branchens laveste marginer", "Ekstremt konkurrencedygtige odds", "Bred sportsdækning", "Tillader professionelle bettors", "Hurtige e-wallet-udbetalinger", "Dansk licens og ROFUS", "Intet maksimumbet på mange markeder"].map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{p}</span></li>))}</ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Umoderne brugerinterface", "Begrænset casino-udvalg", "Ingen live-streaming", "Minimale bonusser og kampagner", "Kundeservice kan være langsom", "Ikke ideel for nybegyndere"].map((c) => (<li key={c} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{c}</span></li>))}</ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Odds og marginer – Hvorfor det betyder noget</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">For at forstå MarathonBets styrke skal man forstå, hvad marginer betyder i praksis. Hvis en bookmaker har 5% margin på en kamp, og MarathonBet har 2%, betyder det, at du konsekvent får bedre odds. Over 1.000 væddemål med 100 kr. indsats kan forskellen i forventet tab være tusindvis af kroner.</p>
          <p className="text-muted-foreground leading-relaxed">MarathonBet er desuden kendt for at være tolerant over for vindende spillere. Hvor mange bookmakers begrænser eller lukker konti for profitable bettors, har MarathonBet historisk set været mere åben. Det gør platformen til et foretrukket valg for sharp bettors og syndikater.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder</h2>
          <p className="text-muted-foreground leading-relaxed">MarathonBet understøtter <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>. E-wallet-udbetalinger behandles typisk inden for 24 timer. MitID bruges til registrering og verifikation.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">MarathonBet vs. andre danske bookmakers</h2>
          <p className="text-muted-foreground leading-relaxed">MarathonBet vinder klart på odds og marginer, men taber på brugeroplevelse, casino-udvalg og bonusser. <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> tilbyder en overlegen live-betting-oplevelse med streaming, <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link> har det bredeste all-round-produkt, og <Link to="/casino-anmeldelser/bwin" className={linkClass}>bwin</Link> balancerer sport og casino bedre. MarathonBet er for den seriøse bettor, der prioriterer value over pynt.</p>
        </section>

        <InlineCasinoCards count={3} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="text-muted-foreground leading-relaxed">MarathonBet er den foretrukne platform for danske bettors, der prioriterer odds-kvalitet frem for alt andet. Platformens lave marginer giver konsekvent bedre value end konkurrenterne, og tolerancen over for vindende spillere er sjælden. Casino-afdelingen er et fint supplement, men ikke hovedattraktionen. For nybegyndere anbefaler vi at starte med en mere brugervenlig platform og tilføje MarathonBet, når man har forstået, hvad value-betting indebærer.</p>
        </section>

        <Separator className="my-10" />
        <FAQSection faqs={marathonbetFaqs} />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/casino-anmeldelser/marathonbet" />
        <Separator className="my-10" />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default MarathonBetAnmeldelse;
