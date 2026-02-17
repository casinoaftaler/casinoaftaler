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
import { buildArticleSchema, buildFaqSchema } from "@/lib/seo";
import { QuickFactsProviders } from "@/components/QuickFactsProviders";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import type { ReactNode } from "react";
import { Star, Zap, Check, X, ShieldCheck, Trophy } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const pokerstarsFaqs: { question: string; answer: ReactNode }[] = [
  { question: "Er PokerStars lovligt i Danmark?", answer: (<>Ja, PokerStars opererer med dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og er tilsluttet <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. PokerStars har haft dansk licens i mange år og er en af de mest etablerede online poker-platforme på det danske marked.</>) },
  { question: "Tilbyder PokerStars mere end poker?", answer: (<>Ja, PokerStars har udviklet sig fra en ren poker-platform til en fuld casinooplevelse. PokerStars Casino tilbyder <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link>, <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> og et <Link to="/live-casino" className={linkClass}>live casino</Link>. Sportsvæddemål er også tilgængeligt via PokerStars Sports.</>) },
  { question: "Hvad er PokerStars VIP-program?", answer: "PokerStars' Stars Rewards-program belønner spillere med personaliserede belønninger baseret på spilleaktivitet. Programmet inkluderer Chests (kister) med tilfældige præmier, som forbedres i takt med aktivitetsniveauet. Systemet erstattede det gamle Supernova VIP-program." },
  { question: "Kan man spille turneringer på PokerStars Danmark?", answer: (<>Ja, PokerStars tilbyder et omfattende turneringsudvalg med daglige, ugentlige og månedlige turneringer i forskelligt formater. Danske spillere kan deltage i både lokale og internationale turneringer. <Link to="/casinospil/poker" className={linkClass}>Poker</Link>-turneringerne inkluderer alt fra mikrostakes freerolls til high-stakes events.</>) },
  { question: "Hvilke betalingsmetoder understøtter PokerStars?", answer: (<>PokerStars i Danmark understøtter <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>. MitID bruges til verifikation.</>) },
  { question: "Er PokerStars-softwaren god?", answer: "PokerStars har branchens bedste poker-software. Desktop-klienten er feature-rig med tilpasselige borde, statistikværktøjer, noteringssystem og multi-table support. Mobilappen er ligeledes fremragende med hurtig navigation og responsivt design. Casino-integrationen er sømløs med direkte adgang fra poker-lobbyen." },
];

const PokerStarsAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const articleSchema = buildArticleSchema({ headline: "PokerStars Anmeldelse 2026 – Verdens Største Poker-Platform", description: "Dybdegående anmeldelse af PokerStars Casino. Dansk licens, poker, casino og sportsvæddemål fra verdens førende poker-brand.", url: "https://casinoaftaler.dk/casino-anmeldelser/pokerstars", datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas" });
  const faqJsonLd = buildFaqSchema(pokerstarsFaqs);
  const reviewJsonLd = { "@context": "https://schema.org", "@type": "Review", itemReviewed: { "@type": "Organization", name: "PokerStars", url: "https://www.pokerstars.dk/" }, author: { "@type": "Organization", name: "Casinoaftaler" }, reviewRating: { "@type": "Rating", ratingValue: "4.3", bestRating: "5" } };

  return (
    <>
      <SEO title="PokerStars Anmeldelse 2026 – Poker & Casino | Casinoaftaler" description="Komplet anmeldelse af PokerStars i Danmark. Verdens største poker-platform med casino og sportsvæddemål. Dansk licens og turneringer." jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]} />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Trophy className="mr-1.5 h-3.5 w-3.5" />4.3 / 5 – Poker-Kongen</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">PokerStars Anmeldelse 2026</h1>
          <p className="mb-6 text-lg text-white/80">Uafhængig anmeldelse af PokerStars – verdens største poker-platform, nu med fuldt casino og sportsvæddemål i Danmark.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="19 Min." />
        <CasinoReviewHero slug="pokerstars" casinoName="PokerStars" />
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – PokerStars</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Velkomstbonus</p><p className="text-lg font-bold text-foreground">Op til $600 bonus</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Licens</p><p className="text-lg font-bold text-foreground">Spillemyndigheden</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Grundlagt</p><p className="text-lg font-bold text-foreground">2001</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Ejer</p><p className="text-lg font-bold text-foreground">Flutter Entertainment</p></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Kerneprodukt</p><p className="text-lg font-bold text-foreground">Online Poker</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Casino spil</p><p className="text-lg font-bold text-foreground">1.500+</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Turneringer</p><p className="text-lg font-bold text-foreground">100+ dagligt</p></div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Pragmatic Play", "Evolution Gaming", "Red Tiger", "Big Time Gaming", "Microgaming"]} />
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af PokerStars</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">PokerStars er et ikonisk navn i online gambling. Grundlagt i 2001 har platformen defineret online poker og er stadig den ubestridte markedsleder med det største spillernetværk og det mest omfattende turneringsudvalg. I Danmark opererer PokerStars med fuld licens fra Spillemyndigheden og tilbyder poker, casino og sportsvæddemål under samme konto.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Poker-produktet er uovertruffent. PokerStars' software er branchens benchmark med funktioner som multi-tabling, detaljeret statistik, tilpasselige layouts og et avanceret turneringssystem. Fra mikrostakes til nosebleed-niveauer dækker platformen hele spektret. Danske spillere har adgang til et bredt udvalg af cash games og turneringer, inklusiv qualifiers til live PSPC- og EPT-events.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Casino-afdelingen er vokset markant i de seneste år. Med over 1.500 spil fra udbydere som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link> er PokerStars Casino blevet et seriøst alternativ til dedikerede casinoplatforme. <Link to="/live-casino" className={linkClass}>Live casinoet</Link> er drevet af Evolution og tilbyder alle populære bordspil.</p>
          <p className="text-muted-foreground leading-relaxed">Ejeren Flutter Entertainment (som også ejer <Link to="/casino-anmeldelser/betano" className={linkClass}>Betano</Link> via Entain-aftale) er verdens største online gambling-selskab, hvilket garanterer stabilitet og langvarig drift. Vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link> rangerer PokerStars højt primært grundet poker-produktet, men casino-oplevelsen er også over gennemsnittet.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Verdens bedste online poker-software", "Enormt turneringsudvalg", "Stærkt voksende casino-sektion", "Ejet af Flutter – maksimal sikkerhed", "Fremragende mobilapp", "Stars Rewards-program", "Dansk licens og ROFUS-tilslutning"].map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{p}</span></li>))}</ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Poker-fokus kan forvirre pure casino-spillere", "Casino-bonus er mindre generøs end specialister", "Desktop-klient kræves til poker", "Stars Rewards er nerfed vs. gammelt VIP-program", "Sportsvæddemål halter bag Bet365/Unibet", "Rake er relativt høj"].map((c) => (<li key={c} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{c}</span></li>))}</ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Poker – Kernen i PokerStars</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Poker er og forbliver PokerStars' DNA. Platformen tilbyder No Limit Hold'em, Pot Limit Omaha, Stud, Draw og blandede spil i alle stakes-niveauer. Sit & Go-turneringer, Multi-Table Tournaments (MTTs) og Spin & Go (jackpot-format) sikrer, at der altid er action uanset tidspunkt.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">For danske <Link to="/casinospil/poker" className={linkClass}>poker</Link>-spillere er PokerStars det klare førstevalg. Spillernetværket er det største i verden, og turneringsgarantierne er de højeste. Den berømte WCOOP (World Championship of Online Poker) og SCOOP (Spring Championship) er årlige highlights med millioner i præmiepuljer.</p>
          <p className="text-muted-foreground leading-relaxed">Softwaren understøtter HUD-integration (Heads-Up Display) med tredjepartsværktøjer som PokerTracker og Hold'em Manager, hvilket er vigtigt for seriøse grinders. Tidsbanksystemet, hand-replay og avancerede søgemuligheder gør det nemt at finde præcis den action, man leder efter.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino og sportsvæddemål</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">PokerStars Casino er integreret direkte i poker-klienten og tilbyder en sømløs overgang. Spiludvalget inkluderer populære <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link>, bordspil og et omfattende <Link to="/live-casino" className={linkClass}>live casino</Link> fra <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Casino-bonusser er separate fra poker-bonusser.</p>
          <p className="text-muted-foreground leading-relaxed">Sportsvæddemål via PokerStars Sports er det nyeste tilskud. Produktet er funktionelt, men kan ikke matche dedikerede sportsbogsoperatører som <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> eller <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link> på dybde og live-betting-oplevelse. Det er et fint supplement for poker-spillere, men ikke en destination i sig selv.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder</h2>
          <p className="text-muted-foreground leading-relaxed">PokerStars i Danmark understøtter <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>. E-wallets giver de hurtigste udbetalinger. MitID bruges til registrering og verifikation.</p>
        </section>

        <InlineCasinoCards count={3} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="text-muted-foreground leading-relaxed">PokerStars er et must-have for enhver seriøs poker-spiller i Danmark. Softwaren, turneringsudvalget og spillernetværket er uovertrufne. Casino-afdelingen er vokset til et seriøst produkt, der kan stå alene, og sports-tilbuddet er et fint supplement. Med Flutter Entertainment som ejer er stabiliteten garanteret. For dedikerede casino-spillere kan en supplerende konto hos <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> eller <Link to="/casino-anmeldelser/mr-green" className={linkClass}>Mr Green</Link> dog give en mere fokuseret oplevelse.</p>
        </section>

        <Separator className="my-10" />
        <AuthorBio author="jonas" />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/casino-anmeldelser/pokerstars" />
        <FAQSection faqs={pokerstarsFaqs} />
      </div>
    </>
  );
};

export default PokerStarsAnmeldelse;
