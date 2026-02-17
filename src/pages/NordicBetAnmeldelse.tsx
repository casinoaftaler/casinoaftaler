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
import { ShieldCheck, Star, Clock, CreditCard, Gift, Trophy, Sparkles, Gamepad2, Zap, Check, X, Globe, TrendingUp } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const nordicbetFaqs: { question: string; answer: ReactNode }[] = [
  { question: "Er NordicBet lovligt i Danmark?", answer: (<>Ja, NordicBet har dansk licens fra Spillemyndigheden og er tilsluttet <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. NordicBet drives af Betsson Group, et af Nordens største spilleselskaber, og overholder alle danske regler for <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.</>) },
  { question: "Har NordicBet sportsvæddemål?", answer: "Ja, NordicBet er primært kendt som en sportsbook og tilbyder et af de mest omfattende sportsvæddemål-udvalg på det danske marked. Platformen dækker alt fra fodbold og håndbold til e-sport og niche-sportsgrene. Casino-sektionen er et stærkt supplement til sportsvæddemål." },
  { question: "Hvilken velkomstbonus tilbyder NordicBet Casino?", answer: (<>NordicBet tilbyder typisk separate velkomstbonusser for sport og casino. Casino-bonussen matcher din første indbetaling op til 2.000 kr. med et <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på 10x. Sportsbonussen har separate vilkår. Tjek altid aktuelle betingelser på NordicBets hjemmeside.</>) },
  { question: "Hvordan er NordicBets casino sammenlignet med deres sportsbook?", answer: (<>NordicBets casino-sektion er et solidt supplement til deres anerkendte sportsbook. Med over 1.000 <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link> og et professionelt <Link to="/live-casino" className={linkClass}>live casino</Link> fra Evolution Gaming er casino-delen konkurrencedygtig. Dog er sportsbook fortsat NordicBets primære styrke.</>) },
  { question: "Understøtter NordicBet MobilePay?", answer: (<>Ja, NordicBet understøtter <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> samt Dankort, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller og <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>. Indbetalinger er øjeblikkelige, og udbetalinger behandles typisk inden for 24–48 timer.</>) },
  { question: "Er NordicBet det samme som Betsson?", answer: "NordicBet og Betsson er begge en del af Betsson Group, men de er separate brands med forskellige målgrupper. NordicBet fokuserer specifikt på det nordiske marked med lokalt tilpasset indhold og kampagner, mens Betsson har et bredere internationalt fokus." },
];

const NordicBetAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const articleSchema = buildArticleSchema({ headline: "NordicBet Casino Anmeldelse 2026 – Sport & Casino i Ét", description: "Dybdegående anmeldelse af NordicBet. Nordisk sportsbook med stærkt casino, dansk licens og Betsson Groups opbakning.", url: "https://casinoaftaler.dk/casino-anmeldelser/nordicbet", datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas" });
  const faqJsonLd = buildFaqSchema(nordicbetFaqs);
  const reviewJsonLd = { "@context": "https://schema.org", "@type": "Review", itemReviewed: { "@type": "Organization", name: "NordicBet", url: "https://www.nordicbet.dk/" }, author: { "@type": "Organization", name: "Casinoaftaler" }, reviewRating: { "@type": "Rating", ratingValue: "4.1", bestRating: "5" }, reviewBody: "NordicBet er en solid nordisk platform med stærkt sportsvæddemål og et konkurrencedygtigt casino under Betsson Group." };

  return (
    <>
      <SEO title="NordicBet Casino Anmeldelse 2026 – Sport & Casino | Casinoaftaler" description="Komplet anmeldelse af NordicBet. Nordisk sportsbook med 1.000+ casinospil, dansk licens og Betsson Groups erfaring. Læs vores ærlige vurdering." jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]} />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Globe className="mr-1.5 h-3.5 w-3.5" />4.1 / 5 – Nordisk Specialist</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">NordicBet Casino Anmeldelse 2026</h1>
          <p className="mb-6 text-lg text-white/80">Uafhængig anmeldelse af NordicBet – den nordiske specialist med stærkt sportsvæddemål, solidt casino og dansk licens under Betsson Group.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="18 Min." />
        <CasinoReviewHero slug="nordicbet" casinoName="NordicBet" />
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – NordicBet</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Casino Bonus</p><p className="text-lg font-bold text-foreground">Op til 2.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Omsætningskrav</p><p className="text-lg font-bold text-foreground">10x (d+b)</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Licens</p><p className="text-lg font-bold text-foreground">Spillemyndigheden</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Ejer</p><p className="text-lg font-bold text-foreground">Betsson Group</p></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Min. indbetaling</p><p className="text-lg font-bold text-foreground">100 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Udbetaling</p><p className="text-lg font-bold text-foreground">24–48 timer</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Antal casinospil</p><p className="text-lg font-bold text-foreground">1.000+</p></div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Play'n GO", "Evolution Gaming", "Pragmatic Play", "Red Tiger", "Microgaming", "Yggdrasil", "Hacksaw Gaming"]} />
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af NordicBet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">NordicBet er et navn, der har været synonymt med nordisk online betting i over to årtier. Grundlagt med fokus på at betjene det skandinaviske marked har NordicBet opbygget en loyal brugerbase gennem lokalt tilpasset indhold, konkurrencedygtige odds og et casino, der har vokset markant i omfang og kvalitet. Platformen drives af Betsson Group – et af Nordens største børsnoterede spilleselskaber – og opererer med dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det, der adskiller NordicBet fra rene casinoer som <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> eller <Link to="/casino-anmeldelser/videoslots" className={linkClass}>Videoslots</Link>, er den tætte integration mellem sportsvæddemål og casino. For danske spillere, der nyder begge dele, tilbyder NordicBet en samlet platform, hvor du kan veksle mellem at placere et væddemål på Superligaen og spille <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> eller <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> – alt under én konto.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Casino-sektionen har over 1.000 spiltitler fra topudbydere som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>. <Link to="/live-casino" className={linkClass}>Live casino</Link> fra <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> tilbyder professionelle dealere og et bredt udvalg af bordspil.</p>
          <p className="text-muted-foreground leading-relaxed">Vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link> vurderer NordicBet som en stærk all-rounder, der leverer bedst for spillere, der ønsker sport og casino samlet. Casinodelen alene er solid men ikke banebrydende – for en ren casinofokuseret oplevelse er specialister som LeoVegas eller Videoslots stærkere.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved NordicBet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Stærkt sportsvæddemål + casino i én platform", "Dansk licens og Betsson Groups opbakning", "Over 1.000 casinospil fra topudbydere", "Konkurrencedygtige sportsbetting-odds", "Hurtige udbetalinger (24–48 timer)", "Mange betalingsmetoder inkl. MobilePay", "Nordisk fokus med lokalt tilpasset indhold", "Professionelt live casino"].map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{p}</span></li>))}</ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Casino-sektionen er sekundær til sport", "Færre casinokampagner end rene casino-platforme", "Design kan virke sportsfokuseret for casino-spillere", "Velkomstbonus til casino er gennemsnitlig"].map((c) => (<li key={c} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{c}</span></li>))}</ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonus og kampagner</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">NordicBet tilbyder separate <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> for sport og casino. Casino-bonussen matcher din første indbetaling 100 % op til 2.000 kr. med et <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på 10x. Sportsbonussen opererer med andre vilkår og kan kombineres med odds-boosts på udvalgte events.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Løbende kampagner inkluderer ugentlige <Link to="/free-spins" className={linkClass}>free spins</Link>, reload-bonusser, live casino-turneringer og sportsspecifikke tilbud som risikofrie væddemål og enhanced odds. NordicBets kampagnestruktur er bredt funderet og belønner aktive spillere på tværs af produkter.</p>
          <p className="text-muted-foreground leading-relaxed">Sammenlignet med <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> – en anden sport-og-casino-kombination – er NordicBets casinobonus på niveau, men bet365 har generelt flere sportsspecifikke kampagner. For ren casinobonus overgår specialister som <Link to="/casino-anmeldelser/888-casino" className={linkClass}>888 Casino</Link> begge platforme.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg og live casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">NordicBets casino byder på over 1.000 titler med en god blanding af <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link>, bordspil og live dealer-spil. Populære slots som Gates of Olympus, Book of Dead, Sweet Bonanza og Reactoonz er alle tilgængelige. Bordspil dækker <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>, <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> og <Link to="/casinospil/poker" className={linkClass}>poker</Link>-varianter.</p>
          <p className="text-muted-foreground leading-relaxed"><Link to="/live-casino" className={linkClass}>Live casino</Link> fra <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> er en af NordicBets stærkeste casinosektion med professionelle dealere, multiple kameravinkler og game shows som Crazy Time og Monopoly Live.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">NordicBet understøtter et bredt udvalg af <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, Dankort, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> og Neteller er alle tilgængelige. Udbetalinger behandles typisk inden for 24–48 timer.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sammenligning med andre sportsbooks</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">NordicBet konkurrerer direkte med <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link>, <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link> og <Link to="/casino-anmeldelser/betano" className={linkClass}>Betano</Link> som sport-og-casino-platforme. NordicBets nordiske fokus giver en mere lokalt tilpasset oplevelse, mens bet365 tilbyder bredere international dækning. Unibet (Kindred Group) har et stærkere casino, men NordicBets sportsbetting-odds er ofte mere konkurrencedygtige i nordiske sportsgrene.</p>
        </section>

        <InlineCasinoCards count={3} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">NordicBet er det oplagte valg for danske spillere, der ønsker sportsvæddemål og casino samlet under ét tag med nordisk fokus. Casino-sektionen er solid med 1.000+ spil og et stærkt live casino, og sportsbook-delen er blandt de bedste i Norden. For ren casinounderholdning er specialister mere velegnede, men som all-rounder med nordisk identitet er NordicBet svær at slå.</p>
        </section>

        <Separator className="my-10" />
        <FAQSection faqs={nordicbetFaqs} />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/casino-anmeldelser/nordicbet" />
        <Separator className="my-10" />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default NordicBetAnmeldelse;
