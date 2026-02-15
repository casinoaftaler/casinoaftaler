import { Link } from "react-router-dom";import { AuthorMetaBar } from "@/components/AuthorMetaBar";import { AuthorBio } from "@/components/AuthorBio";import { FAQSection } from "@/components/FAQSection";import { SEO } from "@/components/SEO";import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";import { Badge } from "@/components/ui/badge";import { Separator } from "@/components/ui/separator";import { Button } from "@/components/ui/button";import { RelatedGuides } from "@/components/RelatedGuides";import { InlineCasinoCards } from "@/components/InlineCasinoCards";import { useSiteSettings } from "@/hooks/useSiteSettings";import { buildArticleSchema } from "@/lib/seo";import { QuickFactsProviders } from "@/components/QuickFactsProviders";import { CasinoReviewHero } from "@/components/CasinoReviewHero";import type { ReactNode } from "react";import { Star, CreditCard, Trophy, Sparkles, Gamepad2, Zap, Check, X, Shield, Globe } from "lucide-react";
const linkClass = "text-primary underline hover:text-primary/80";
const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Er Unibet lovligt i Danmark?", answer: (<>Ja, Unibet har dansk licens fra Spillemyndigheden og er tilsluttet <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Unibet ejes af Kindred Group, en af verdens største børsnoterede spiludbydere med hovedkontor i Malta. Alle krav til <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> overholdes, og Unibet har været aktiv i Danmark siden licensordningens start i 2012.</>) },
  { question: "Hvad er Unibets velkomstbonus?", answer: (<>Unibet tilbyder en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på op til 2.000 kr. i matchbonus plus <Link to="/free-spins" className={linkClass}>free spins</Link> til nye spillere. Derudover tilbydes et risikofrit væddemål til nye sportsspillere. <Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> er 10x (d+b).</>) },
  { question: "Hvem ejer Unibet?", answer: "Unibet ejes af Kindred Group PLC, en børsnoteret spiludbyder på Nasdaq Stockholm med hovedkontor i Malta. Kindred Group blev grundlagt i 1997 og driver ud over Unibet flere andre brands inkl. 32Red og Maria Casino. Koncernen har over 1.500 medarbejdere og er en af de mest etablerede og troværdige aktører i online gambling-industrien." },
  { question: "Hvilke spiludbydere samarbejder Unibet med?", answer: (<>Unibet samarbejder med alle de store spiludbydere: <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link> og mange flere. Derudover tilbyder Unibet eksklusive spil udviklet specifikt til deres platform.</>) },
  { question: "Har Unibet en mobilapp?", answer: "Ja, Unibet tilbyder dedikerede mobilapps til både iOS og Android. Appen dækker hele produktpaletten – casino, sportsbetting, live casino og poker. Den er veldesignet med hurtig navigation og understøtter biometrisk login. Unibet var en af de første operatører i Danmark med en dedikeret app og har løbende optimeret mobiloplevelsen." },
  { question: "Har Unibet poker og sportsbetting?", answer: "Ja, Unibet tilbyder en komplet produktpalette med casino, sportsbetting, live casino, poker og bingo – alt under én konto. Unibets pokerrum er særligt populært i Danmark med regelmæssige turneringer og en aktiv spillerbase. Sportsbettingsektionen dækker 40+ sportsgrene med live-betting og Bet Builder." },
  { question: "Hvor hurtigt udbetaler Unibet?", answer: (<>Unibet er kendt for sine hurtige udbetalinger. Via <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> behandles udbetalinger typisk inden for 24 timer. E-wallets som <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> behandles inden for 24 timer, mens <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> tager 1-3 hverdage.</>) },
];
const UnibetAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const articleSchema = buildArticleSchema({ headline: "Unibet Anmeldelse 2026 – Casino, Sports & Poker i Danmark", description: "Komplet anmeldelse af Unibet. Kindred Group-ejet allround-platform med dansk licens, casino, sports, poker og live casino.", url: "https://casinoaftaler.dk/casino-anmeldelser/unibet", datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas" });
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: typeof f.answer === "string" ? f.answer : f.question } })) };
  const reviewJsonLd = { "@context": "https://schema.org", "@type": "Review", itemReviewed: { "@type": "Organization", name: "Unibet", url: "https://www.unibet.dk/" }, author: { "@type": "Organization", name: "Casinoaftaler" }, reviewRating: { "@type": "Rating", ratingValue: "4.4", bestRating: "5" }, reviewBody: "Unibet er en af de mest komplette spilleplatforme i Danmark med casino, sports, poker og live casino under Kindred Groups paraply." };
  return (
    <>
      <SEO title="Unibet Anmeldelse 2026 – Casino, Sports, Poker & Bonus | Casinoaftaler" description="Komplet anmeldelse af Unibet – Danmarks mest komplette spilleplatform. Casino, sportsbetting, poker, live casino, dansk licens og hurtige udbetalinger." jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Globe className="mr-1.5 h-3.5 w-3.5" />4.4 / 5 – Komplet spilleplatform</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Unibet Anmeldelse 2026</h1>
          <p className="mb-6 text-lg text-white/80">Komplet anmeldelse af Unibet – Danmarks mest alsidige spilleplatform med casino, sportsbetting, poker og live casino. Kindred Group-ejerskab og dansk licens.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="20 Min." />
        <CasinoReviewHero slug="unibet" casinoName="Unibet" />
        <section className="mb-12"><Card className="border-border bg-card border-l-4 border-l-primary"><CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Unibet</CardTitle></CardHeader><CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Velkomstbonus</p><p className="text-lg font-bold text-foreground">Op til 2.000 kr. + FS</p></div>
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Omsætningskrav</p><p className="text-lg font-bold text-foreground">10x (d+b)</p></div>
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Produkter</p><p className="text-lg font-bold text-foreground">Casino + Sports + Poker</p></div>
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Antal spil</p><p className="text-lg font-bold text-foreground">2.000+</p></div>
          </div>
          <QuickFactsProviders providers={["NetEnt", "Pragmatic Play", "Play'n GO", "Evolution Gaming", "Red Tiger", "Yggdrasil", "Microgaming", "Nolimit City"]} />
        </CardContent></Card></section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Unibet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Unibet er en af de mest genkendelige og betroede spillebrands i Danmark og hele Norden. Platformen blev lanceret i 1997 og har siden da opbygget en position som en af de mest komplette spilleplatforme i verden. Under Kindred Groups paraply tilbyder Unibet en alt-i-en-løsning med casino, sportsbetting, live casino, poker og bingo – alt sammen tilgængeligt under én konto med ét login. For danske spillere, der ønsker maksimal fleksibilitet, er Unibet svær at slå.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Casino-sektionen hos Unibet byder på over 2.000 spiltitler fra alle de store udbydere. Du finder <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link> fra <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> og mange flere, suppleret med eksklusive Unibet-titler. <Link to="/live-casino" className={linkClass}>Live casinoet</Link> er af høj kvalitet med <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>-borde, og Unibets pokerrum er blandt de mest aktive i Norden.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Sportsbettingsektionen er en af Unibets absolutte styrker. Med dækning af over 40 sportsgrene, avanceret live-betting med Bet Builder og konkurrencedygtige odds er Unibet en af de mest respekterede sportsbooks i Europa. For danske spillere, der følger Superligaen, tennis eller e-sport, er Unibets dækning typisk blandt de dybeste på markedet.</p>
          <p className="text-muted-foreground leading-relaxed">Vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link> evaluerer Unibet som en helhed, og den samlede pakke er imponerende. Kindred Groups børsnotering på Nasdaq Stockholm sikrer finansiel gennemsigtighed, og deres engagement i <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> er brancheførende. Det er en platform, der gør alt godt – og det meste af det rigtig godt.</p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Unibet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Komplet alt-i-en platform: casino, sport, poker, live", "Børsnoteret Kindred Group – fuld gennemsigtighed", "2.000+ casinospil fra topudbydere", "Dedikerede mobilapps til iOS og Android", "Et af Nordens mest aktive pokerrum", "Hurtige udbetalinger via Trustly", "40+ sportsgrene med live-betting", "Dansk licens fra Spillemyndigheden", "Stærkt engagement i ansvarligt spil"].map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{p}</span></li>))}</ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Velkomstbonus er gennemsnitlig for casino", "Platform kan føles kompleks for nye brugere", "Casino-fokus kan drukne i sports-orienteret design", "VIP-program er ikke så gennemsigtigt som konkurrenters"].map((c) => (<li key={c} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{c}</span></li>))}</ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonus og kampagner</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Unibet tilbyder en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på op til 2.000 kr. plus <Link to="/free-spins" className={linkClass}>free spins</Link>. <Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> er 10x. Sportsspillere får risikofrit væddemål. Løbende kampagner inkluderer daglige free spins, reload-bonusser og pokerturneringer med store præmiepuljer.</p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gamepad2 className="h-5 w-5 text-primary" />Casino</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">2.000+ slots, bordspil og jackpots fra alle topudbydere.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" />Sport</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">40+ sportsgrene, live-betting, Bet Builder.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Live Casino</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground"><Link to="/live-casino" className={linkClass}>Evolution Gaming</Link>-borde med <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> og game shows.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Star className="h-5 w-5 text-primary" />Poker</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Et af Nordens mest aktive pokerrum med turneringer og cash games.</p></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder og sikkerhed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Unibet understøtter alle populære danske <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>: <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> og <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link>. Platformen er fuldstændig sikker med Kindred Groups børsnoterede gennemsigtighed og dansk spillelicens.</p>
          <Card className="border-border bg-card border-l-4 border-l-primary"><CardContent className="pt-6 space-y-3"><p className="text-muted-foreground">Spil ansvarligt. Kontakt <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a> ved behov.</p><p className="text-xs text-muted-foreground">18+ | Spil ansvarligt | Annoncering</p></CardContent></Card>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Unibet sammenlignet med konkurrenterne</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Unibets styrke er den samlede pakke. Sammenlignet med <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> har Unibet den bredere produktpalette (inkl. poker og sport), mens LeoVegas vinder på ren mobilcasino-oplevelse. I forhold til <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil Casino</Link> tilbyder Unibet et mere avanceret casino med flere spil og bedre odds på sport, men Danske Spil har den unikke statslige tillid.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>Hvem passer Unibet til?</strong> Spillere, der ønsker alt samlet ét sted – casino, sport, poker og live casino – med en operatør, der har 25+ års erfaring og fuld nordisk forankring. Unibet er allround-valget for den alsidige danske spiller.</p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores endelige vurdering</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">Unibet er en af de mest komplette og troværdige platforme i Danmark. Læs om <Link to="/forfatter/jonas" className={linkClass}>forfatteren</Link>.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[{ label: "Alsidighed", score: "10/10" }, { label: "Troværdighed", score: "10/10" }, { label: "Casino", score: "8/10" }, { label: "Samlet", score: "4.4/5" }].map((i) => (<div key={i.label} className="rounded-lg border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground uppercase mb-1">{i.label}</p><p className="text-2xl font-bold text-primary">{i.score}</p></div>))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" size="lg" className="flex-1"><Link to="/top-10-casino-online"><Trophy className="mr-2 h-5 w-5" />Se Top 10 Casinoer</Link></Button>
            <Button asChild variant="outline" size="lg" className="flex-1"><Link to="/casino-anmeldelser"><Star className="mr-2 h-5 w-5" />Alle Casino Anmeldelser</Link></Button>
          </div>
        </section>
        <InlineCasinoCards title="Andre anbefalede casinoer" count={6} excludeSlugs={["unibet"]} />
        <AuthorBio /><Separator className="my-10" />
        <FAQSection faqs={faqs} />
        <RelatedGuides currentPath="/casino-anmeldelser/unibet" />
      </div>
    </>
  );
};
export default UnibetAnmeldelse;