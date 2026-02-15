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

const bwinFaqs: { question: string; answer: ReactNode }[] = [
  { question: "Er bwin lovligt i Danmark?", answer: (<>Ja, bwin opererer med dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og er tilsluttet <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. bwin er ejet af Entain plc, et af verdens største gambling-selskaber, og overholder alle danske krav til <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.</>) },
  { question: "Hvem ejer bwin?", answer: (<>bwin ejes af Entain plc (tidligere GVC Holdings), som også ejer Ladbrokes, Coral og PartyPoker. Entain er noteret på London Stock Exchange og er et af verdens største online gambling-selskaber. Selskabet har også partnerskaber med <Link to="/casino-anmeldelser/betano" className={linkClass}>Betano</Link>-brandet i visse markeder.</>) },
  { question: "Hvad er bwin bedst til?", answer: (<>bwin er primært kendt som en sportsvæddemålsoperatør med et af Europas bredeste sportsbogsudvalg. Casino-afdelingen er dog vokset markant og tilbyder nu over 1.000 spil. <Link to="/live-casino" className={linkClass}>Live casinoet</Link> er særligt stærkt med mange eksklusive borde fra Evolution Gaming.</>) },
  { question: "Hvilken velkomstbonus har bwin?", answer: (<>bwin tilbyder separate <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> for sport og casino. Casino-bonussen inkluderer typisk en matchbonus plus <Link to="/free-spins" className={linkClass}>free spins</Link>. <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravene</Link> følger dansk standard. Tjek aktuelle betingelser på bwins danske hjemmeside.</>) },
  { question: "Hvordan er bwins mobilapp?", answer: "bwins mobilapp er velfungerende og dækker både sport, casino og live casino. Appen har et rent design med hurtig navigation mellem sektioner. Sportstilbud med live-streaming er en stærk feature. Casino-integrationen er sømløs med direkte adgang til populære spil fra forsiden." },
  { question: "Kan man spille poker på bwin?", answer: (<>Ja, bwin tilbyder online <Link to="/casinospil/poker" className={linkClass}>poker</Link> via PartyPoker-netværket, som er Entains poker-platform. Spillernetværket er det næststørste efter PokerStars og tilbyder et bredt udvalg af cash games og turneringer.</>) },
];

const BwinAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const articleSchema = buildArticleSchema({ headline: "bwin Anmeldelse 2026 – Sport & Casino i Verdensklasse", description: "Dybdegående anmeldelse af bwin Danmark. Sportsvæddemål, casino og poker fra en af Europas største gambling-operatører.", url: "https://casinoaftaler.dk/casino-anmeldelser/bwin", datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Kevin", authorUrl: "https://casinoaftaler.dk/forfatter/kevin" });
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: bwinFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question } })) };
  const reviewJsonLd = { "@context": "https://schema.org", "@type": "Review", itemReviewed: { "@type": "Organization", name: "bwin", url: "https://www.bwin.dk/" }, author: { "@type": "Organization", name: "Casinoaftaler" }, reviewRating: { "@type": "Rating", ratingValue: "4.1", bestRating: "5" } };

  return (
    <>
      <SEO title="bwin Anmeldelse 2026 – Sport & Casino | Casinoaftaler" description="Komplet anmeldelse af bwin i Danmark. Europæisk sportsgigant med voksende casino. Dansk licens, live betting og 1.000+ casinospil." jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]} />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" />4.1 / 5 – Europæisk Gigant</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">bwin Anmeldelse 2026</h1>
          <p className="mb-6 text-lg text-white/80">Uafhængig anmeldelse af bwin – Europas ikoniske sportsbog med et stærkt voksende casinotilbud.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="15-02-2026" readTime="17 Min." />
        <CasinoReviewHero slug="bwin" casinoName="bwin" />
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – bwin</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Casino Bonus</p><p className="text-lg font-bold text-foreground">Op til 1.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Licens</p><p className="text-lg font-bold text-foreground">Spillemyndigheden</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Grundlagt</p><p className="text-lg font-bold text-foreground">1997</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Ejer</p><p className="text-lg font-bold text-foreground">Entain plc</p></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Casino spil</p><p className="text-lg font-bold text-foreground">1.000+</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Sportsvæddemål</p><p className="text-lg font-bold text-foreground">30+ sportsgrene</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Live streaming</p><p className="text-lg font-bold text-foreground">Ja</p></div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Evolution Gaming", "Pragmatic Play", "Red Tiger", "Microgaming"]} />
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af bwin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">bwin er et legendarisk brand i europæisk gambling. Grundlagt i Østrig i 1997 voksede bwin til en af kontinentets mest genkendelige sportsbogsoperatører med sponsorater i fodbold, motorsport og tennis. Platformen har gennemgået flere ejerskifter og er nu en del af Entain-koncernen, som er et af verdens absolut største gambling-selskaber.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">I Danmark opererer bwin med fuld licens fra Spillemyndigheden. Kernen i produktet er stadig sportsvæddemål, men casinosektionen er vokset betydeligt i de seneste år. Med over 1.000 casinospil fra udbydere som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> er bwin blevet en seriøs all-round-platform.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Sportsvæddemål er bwins stærkeste kort. Platformen dækker over 30 sportsgrene med dybe markeder og konkurrencedygtige odds. Live betting er velfungerende med live-streaming af udvalgte kampe. For danske sportsentusiaster er bwin et stærkt alternativ til <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> og <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>.</p>
          <p className="text-muted-foreground leading-relaxed"><Link to="/live-casino" className={linkClass}>Live casinoet</Link> er drevet af Evolution Gaming med eksklusive bwin-borde for <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> og <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link>. Kvaliteten er høj, og streamingen er stabil. Vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link> vurderer bwin som en stærk all-round-platform med sport som spidskompetence.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Fremragende sportsvæddemål", "Live-streaming af sport", "Stærkt live casino med eksklusive borde", "Entain-backing – maksimal sikkerhed", "Poker via PartyPoker-netværk", "Velfungerende mobilapp", "Dansk licens og ROFUS"].map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{p}</span></li>))}</ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Casino-udvalget er mindre end specialister", "Brand er mindre kendt i DK end i Centraleuropa", "Bonusser er moderate", "Navigation kan være forvirrende med tre produkter", "Spiludvalg opdateres langsommere end konkurrenter", "Udbetalingstider kan variere"].map((c) => (<li key={c} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{c}</span></li>))}</ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sportsvæddemål</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">bwins sportsbog dækker fodbold, tennis, basketball, ishockey, håndbold, MMA, esport og meget mere. Dybden af markeder er imponerende med alt fra match-vinder til specifikke spillermarkeder og corners. Odds er konkurrencedygtige, og marginen er sammenlignelig med de bedste i branchen.</p>
          <p className="text-muted-foreground leading-relaxed">Live betting er en kernestyrke. bwin tilbyder omfattende in-play markeder med hurtige odds-opdateringer og cash-out-funktion. Live-streaming af udvalgte fodboldkampe, tennis og basketball giver en helstøbt oplevelse direkte på platformen.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder</h2>
          <p className="text-muted-foreground leading-relaxed">bwin understøtter <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller, <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>. PayPal-understøttelse er en klar fordel, da ikke alle danske casinoer tilbyder dette. E-wallet-udbetalinger er typisk inden for 24 timer.</p>
        </section>

        <InlineCasinoCards count={3} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="text-muted-foreground leading-relaxed">bwin er den ideelle platform for danske spillere, der primært søger sportsvæddemål med et solidt casino-supplement. Entains backing sikrer stabilitet og fortsat udvikling, og platformen leverer konsekvent kvalitet på tværs af sport, casino og poker. For dedikerede casino-spillere kan en supplerende konto hos en specialist som <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> være værd at overveje, men som all-round-platform er bwin svær at slå.</p>
        </section>

        <Separator className="my-10" />
        <FAQSection faqs={bwinFaqs} />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/casino-anmeldelser/bwin" />
        <Separator className="my-10" />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default BwinAnmeldelse;
