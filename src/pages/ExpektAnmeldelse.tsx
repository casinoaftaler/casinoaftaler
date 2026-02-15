import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { buildArticleSchema } from "@/lib/seo";
import { QuickFactsProviders } from "@/components/QuickFactsProviders";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import type { ReactNode } from "react";
import { ShieldCheck, Star, Clock, CreditCard, Trophy, Sparkles, Gamepad2, Zap, Check, X, Globe, Award } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Er Expekt lovligt i Danmark?", answer: (<>Ja, Expekt opererer under dansk licens fra Spillemyndigheden. Platformen er tilsluttet <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> og overholder alle krav til <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>. Expekt ejes af Betsson Group, en af Nordens mest regulerede spiludbydere.</>) },
  { question: "Hvad tilbyder Expekt udover casino?", answer: "Expekt er primært kendt som en sportsbettingplatform, men har i de seneste år udvidet markant til online casino. Platformen tilbyder nu et fuldt casino med spilleautomater, bordspil, live casino og virtuelle sportsbegivenheder. Det kombinerede sportsbook- og casino-tilbud gør Expekt unikt for spillere, der ønsker begge oplevelser under ét tag." },
  { question: "Hvordan er Expekts velkomstbonus?", answer: (<>Expekt tilbyder en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> målrettet både sportsbetting og casino. Casino-bonussen inkluderer typisk matchbonus og <Link to="/free-spins" className={linkClass}>free spins</Link> med det danske standard <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på 10x.</>) },
  { question: "Hvem ejer Expekt?", answer: "Expekt ejes af Betsson Group AB, en børsnoteret svensk spiludbyder med rødder tilbage til 1963. Betsson er en af Europas mest etablerede spillevirksomheder med licenser i over 20 jurisdiktioner og driver flere kendte brands ud over Expekt, herunder Betsson, Betsafe og Mr Vegas." },
  { question: "Hvilke betalingsmetoder understøtter Expekt?", answer: (<>Expekt understøtter alle populære danske <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> inklusiv <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> og <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>. Udbetalinger via Trustly behandles typisk inden for 24 timer.</>) },
  { question: "Har Expekt live casino?", answer: (<>Ja, Expekt tilbyder <Link to="/live-casino" className={linkClass}>live casino</Link> drevet af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Du kan spille <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>, <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> og game shows med professionelle dealers i realtid.</>) },
];

const ExpektAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const articleSchema = buildArticleSchema({ headline: "Expekt Anmeldelse 2026 – Sports & Casino i Danmark", description: "Komplet anmeldelse af Expekt. Betsson Group-casino og sportsbook med dansk licens, kombineret sports- og casino-tilbud.", url: "https://casinoaftaler.dk/casino-anmeldelser/expekt", datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas" });
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: typeof f.answer === "string" ? f.answer : f.question } })) };
  const reviewJsonLd = { "@context": "https://schema.org", "@type": "Review", itemReviewed: { "@type": "Organization", name: "Expekt", url: "https://www.expekt.dk/" }, author: { "@type": "Organization", name: "Casinoaftaler" }, reviewRating: { "@type": "Rating", ratingValue: "3.8", bestRating: "5" }, reviewBody: "Expekt tilbyder en unik kombination af sportsbetting og casino under Betsson Group med dansk licens." };

  return (
    <>
      <SEO title="Expekt Anmeldelse 2026 – Sportsbetting & Casino | Casinoaftaler" description="Komplet anmeldelse af Expekt – kombineret sportsbook og casino. Betsson Group-ejet, dansk licens og komplet spiludbud. Læs vores dybdegående test." jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]} />
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Globe className="mr-1.5 h-3.5 w-3.5" />3.8 / 5 – Sports & Casino</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Expekt Casino Anmeldelse 2026</h1>
          <p className="mb-6 text-lg text-white/80">Komplet anmeldelse af Expekt – en kombination af sportsbetting og casino fra Betsson Group med dansk licens og komplet spiludbud.</p>
        </div></div>
      </section>
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="17 Min." />
        <CasinoReviewHero slug="expekt" casinoName="Expekt" />
        <section className="mb-12"><Card className="border-border bg-card border-l-4 border-l-primary"><CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Expekt</CardTitle></CardHeader><CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Velkomstbonus</p><p className="text-lg font-bold text-foreground">Op til 1.000 kr. + 50 FS</p></div>
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Omsætningskrav</p><p className="text-lg font-bold text-foreground">10x (d+b)</p></div>
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Licens</p><p className="text-lg font-bold text-foreground">Spillemyndigheden</p></div>
            <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Type</p><p className="text-lg font-bold text-foreground">Sports + Casino</p></div>
          </div>
          <QuickFactsProviders providers={["NetEnt", "Pragmatic Play", "Play'n GO", "Evolution Gaming", "Red Tiger", "Microgaming"]} />
        </CardContent></Card></section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Expekt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Expekt har en lang historie inden for sportsbetting, der strækker sig tilbage til slutningen af 1990'erne. Platformen blev grundlagt i Sverige og har siden udviklet sig til en fuldt integreret sports- og casino-platform under Betsson Groups paraply. Med en dansk licens fra Spillemyndigheden tilbyder Expekt en komplet spiloplevelse, der forener sportsvæddemål med et bredt casino-katalog. Det er en hybrid-tilgang, der appellerer til spillere, der ønsker begge verdener samlet.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Casino-sektionen hos Expekt har gennemgået en markant udvikling i de seneste år. Hvor den tidligere var et supplement til sportsbook'en, er den nu en fuldvoksen casino-oplevelse med hundredvis af <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link> fra topudbydere som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>. <Link to="/live-casino" className={linkClass}>Live casinoet</Link> er drevet af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det, der gør Expekt attraktivt, er synergierne mellem sports og casino. Du kan nemt skifte mellem at placere sportsvæddemål og spille casino uden at logge ind på separate platforme. For den alsidige spiller, der nyder både fodboldvæddemål og en runde <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>, er det en elegant løsning.</p>
          <p className="text-muted-foreground leading-relaxed">Vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link> evaluerer Expekt som casino isoleret set, og her scorer platformen solidt men ikke spektakulært. Casino-udvalget er bredt nok til de fleste spillere, men dedikerede casino-spillere kan finde mere omfattende kataloger hos rene casino-platforme. Styrken ligger i den samlede pakke – sport plus casino under ét troværdigt tag.</p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Expekt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Kombineret sportsbook og casino under ét login", "Betsson Group-ejerskab med 60+ års erfaring", "Dansk licens fra Spillemyndigheden", "Godt live casino med Evolution Gaming", "Hurtige udbetalinger via Trustly", "Konkurrencedygtige odds på sportsvæddemål", "Solid mobiloplevelse"].map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{p}</span></li>))}</ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Casino-udvalget er mindre end rene casino-platforme", "Velkomstbonus er moderat", "Interface kan føles overvældende med sports og casino", "Mangler VIP-program specifikt for casino-spillere", "Kundeservice er ikke 24/7"].map((c) => (<li key={c} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{c}</span></li>))}</ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sportsbetting hos Expekt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Expekts kerne er sportsbetting, og det er her platformen virkelig skinner. Med dækning af over 30 sportsgrene – fra fodbold og tennis til e-sport og virtuelle sportsbegivenheder – tilbyder Expekt et af de bredeste sportsbook-kataloger tilgængelige for danske spillere. Live-betting er en særlig styrke med realtids-statistikker og hurtig markedsopdatering.</p>
          <p className="text-muted-foreground leading-relaxed">For spillere, der primært er casino-fokuserede, fungerer sportssektionen som en ekstra dimension af underholdning. Det er nemt at skifte mellem de to verdener, og din saldo er delt, så du ikke behøver at overføre midler mellem konti. Denne fleksibilitet gør Expekt til et attraktivt valg for den alsidige spiller.</p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder og sikkerhed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Expekt understøtter alle standard danske <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> inklusiv <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> og <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>. Platformens sikkerhed garanteres af Betsson Groups infrastruktur med SSL-kryptering og ROFUS-tilslutning.</p>
          <Card className="border-border bg-card border-l-4 border-l-primary"><CardContent className="pt-6 space-y-3"><p className="text-muted-foreground">Spil ansvarligt. Kontakt <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a> ved behov.</p><p className="text-xs text-muted-foreground">18+ | Spil ansvarligt | Annoncering</p></CardContent></Card>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Expekt sammenlignet med konkurrenterne</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Expekt konkurrerer primært med andre kombinerede sports- og casino-platforme. Sammenlignet med <Link to="/casino-anmeldelser/mr-vegas" className={linkClass}>Mr Vegas Casino</Link> (også Betsson Group) har Expekt den stærkere sportssektion, mens Mr Vegas har det mere omfattende casino-katalog. I forhold til dedikerede sportsbooks tilbyder Expekt den ekstra casino-dimension, der gør det til en mere komplet platform.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>Hvem passer Expekt til?</strong> Den alsidige spiller, der nyder både sportsvæddemål og casino-spil og ønsker det hele samlet under én konto hos en velrenommeret operatør.</p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores endelige vurdering</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">Expekt er en solid hybrid-platform for den alsidige spiller. Betsson-ejerskabet sikrer pålidelighed. Læs om <Link to="/forfatter/jonas" className={linkClass}>forfatteren</Link>.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[{ label: "Sikkerhed", score: "9/10" }, { label: "Sports", score: "9/10" }, { label: "Casino", score: "7/10" }, { label: "Samlet", score: "3.8/5" }].map((i) => (<div key={i.label} className="rounded-lg border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground uppercase mb-1">{i.label}</p><p className="text-2xl font-bold text-primary">{i.score}</p></div>))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" size="lg" className="flex-1"><Link to="/top-10-casino-online"><Trophy className="mr-2 h-5 w-5" />Se Top 10 Casinoer</Link></Button>
            <Button asChild variant="outline" size="lg" className="flex-1"><Link to="/casino-anmeldelser"><Star className="mr-2 h-5 w-5" />Alle Casino Anmeldelser</Link></Button>
          </div>
        </section>
        <InlineCasinoCards title="Andre anbefalede casinoer" count={6} excludeSlugs={["expekt"]} />
        <AuthorBio /><Separator className="my-10" />
        <FAQSection faqs={faqs} />
        <RelatedGuides currentPath="/casino-anmeldelser/expekt" />
      </div>
    </>
  );
};

export default ExpektAnmeldelse;