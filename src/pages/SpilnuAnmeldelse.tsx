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
import { Star, Zap, Check, X, Gamepad2, ShieldCheck, Trophy } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const spilnuFaqs: { question: string; answer: ReactNode }[] = [
  { question: "Er Spilnu lovligt i Danmark?", answer: (<>Ja, Spilnu.dk er en del af Danske Spil-koncernen og opererer med dansk licens fra Spillemyndigheden. Platformen er tilsluttet <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> og overholder alle krav til <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.</>) },
  { question: "Hvad er forskellen på Spilnu og Danske Spil?", answer: (<>Spilnu.dk er en del af Danske Spil-familien, men fokuserer specifikt på online casinospil og bingo. Hvor <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil Casino</Link> og <Link to="/casino-anmeldelser/royal-casino" className={linkClass}>Royal Casino</Link> også tilbyder sportsvæddemål og lotteri, er Spilnu en ren casino- og bingo-platform.</>) },
  { question: "Tilbyder Spilnu bingo?", answer: "Ja, Spilnu er en af de mest populære bingo-platforme i Danmark. Bingo-sektionen inkluderer flere varianter med daglige turneringer, jackpots og community-features. Det er en central del af Spilnus identitet og tiltrækker en bred spillerbase." },
  { question: "Hvilken velkomstbonus har Spilnu?", answer: (<>Spilnu tilbyder en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> til nye spillere. Som en del af Danske Spil følger bonusvilkårene strengt dansk lovgivning med et <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på 10x. Tjek aktuelle betingelser på Spilnus hjemmeside.</>) },
  { question: "Hvilke betalingsmetoder understøtter Spilnu?", answer: (<>Spilnu understøtter Dankort, <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>. Registrering og verifikation sker via MitID.</>) },
  { question: "Er Spilnu godt for nybegyndere?", answer: "Ja, Spilnu er en af de mest nybegyndervenlige platforme på det danske marked. Designet er enkelt og tilgængeligt, og bingo-sektionen tilbyder en lav indgangsbarriere. Danske Spils stærke brand giver ekstra tryghed for nye spillere." },
];

const SpilnuAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const articleSchema = buildArticleSchema({ headline: "Spilnu Anmeldelse 2026 – Bingo & Casino under Danske Spil", description: "Dybdegående anmeldelse af Spilnu.dk. Dansk licens, populær bingo-sektion og casinospil under Danske Spil-koncernen.", url: "https://casinoaftaler.dk/casino-anmeldelser/spilnu", datePublished: "2026-02-15", dateModified: "2026-02-15", authorName: "Kevin", authorUrl: "https://casinoaftaler.dk/forfatter/kevin" });
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: spilnuFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question } })) };
  const reviewJsonLd = { "@context": "https://schema.org", "@type": "Review", itemReviewed: { "@type": "Organization", name: "Spilnu.dk", url: "https://www.spilnu.dk/" }, author: { "@type": "Organization", name: "Casinoaftaler" }, reviewRating: { "@type": "Rating", ratingValue: "4.0", bestRating: "5" } };

  return (
    <>
      <SEO title="Spilnu Anmeldelse 2026 – Bingo & Casino | Casinoaftaler" description="Komplet anmeldelse af Spilnu.dk. Del af Danske Spil, populær bingo, 700+ casinospil. Læs vores ærlige vurdering af denne traditionsrige danske platform." jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]} />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" />4.0 / 5 – Dansk Tradition</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Spilnu Anmeldelse 2026</h1>
          <p className="mb-6 text-lg text-white/80">Uafhængig anmeldelse af Spilnu.dk – den populære danske platform for bingo og casinospil under Danske Spil-koncernen.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="15-02-2026" readTime="17 Min." />
        <CasinoReviewHero slug="spilnu" casinoName="Spilnu" />
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Spilnu</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Velkomstbonus</p><p className="text-lg font-bold text-foreground">Op til 1.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Omsætningskrav</p><p className="text-lg font-bold text-foreground">10x (d+b)</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Licens</p><p className="text-lg font-bold text-foreground">Spillemyndigheden</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Ejer</p><p className="text-lg font-bold text-foreground">Danske Spil A/S</p></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Min. indbetaling</p><p className="text-lg font-bold text-foreground">50 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Udbetaling</p><p className="text-lg font-bold text-foreground">1–3 hverdage</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground uppercase mb-1">Antal spil</p><p className="text-lg font-bold text-foreground">700+ (casino + bingo)</p></div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Play'n GO", "Pragmatic Play", "Red Tiger", "Big Time Gaming"]} />
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Spilnu</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Spilnu.dk er en af de mest traditionsrige online spilleplatforme i Danmark. Som en del af Danske Spil-koncernen nyder Spilnu godt af den samme tillid og regulatoriske sikkerhed, som kendetegner <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil Casino</Link> og <Link to="/casino-anmeldelser/royal-casino" className={linkClass}>Royal Casino</Link>. Platformen har dog sin egen unikke profil med et stærkt fokus på bingo som supplement til casinospil.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Bingo er Spilnus hjertebarn. Platformen tilbyder flere bingo-varianter med daglige turneringer, progressive jackpots og et aktivt community med chatfunktioner. For danske bingo-entusiaster er Spilnu den foretrukne destination – konkurrencen er begrænset med kun <Link to="/casino-anmeldelser/maria-casino" className={linkClass}>Maria Casino</Link> som et seriøst alternativ.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Casino-sektionen byder på over 700 spil fra udbydere som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> og <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>. Udvalget er mindre end hos internationale giganter, men dækker alle populære titler og kategorier.</p>
          <p className="text-muted-foreground leading-relaxed">Designet er bevidst enkelt og tilgængeligt – Spilnu henvender sig til en bred demografi, herunder spillere, der måske ikke er digitalt indfødte. Navigation, registrering via MitID og betalingsprocesser er strømlinede og ukomplicerede. Vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetode</Link> vurderer denne tilgængelighed positivt.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Populær bingo-platform i Danmark", "Del af Danske Spil – maksimal troværdighed", "Nem MitID-registrering", "Nybegyndervenlig platform", "Dansk kundeservice", "Lave minimumsindsatser", "Ansvarligt spil i fokus"].map((p) => (<li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{p}</span></li>))}</ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2">{["Mindre casinoudvalg end specialister", "Ingen sportsvæddemål", "Konservative bonusser", "Begrænset live casino", "Designet kan virke forældet"].map((c) => (<li key={c} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{c}</span></li>))}</ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonus og bingo-kampagner</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Spilnu tilbyder en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> til nye spillere med match op til 1.000 kr. <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravet</Link> er 10x. Bingo-spillere får ofte separate velkomsttilbud med gratis bingoplader eller bonuspenge til bingo-sektionen.</p>
          <p className="text-muted-foreground leading-relaxed">Løbende kampagner fokuserer primært på bingo med daglige turneringer, jackpot-events og community-kampagner. Casino-kampagner inkluderer ugentlige <Link to="/free-spins" className={linkClass}>free spins</Link> og reload-tilbud. Frekvensen er lavere end hos aggressive konkurrenter, men vilkårene er altid fair og gennemsigtige.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder</h2>
          <p className="text-muted-foreground leading-relaxed">Spilnu understøtter Dankort, <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>. Min. indbetaling er 50 kr. Udbetalinger behandles inden for 1–3 hverdage. MitID-verifikation gør processen hurtig og sikker.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sammenligning med andre Danske Spil-platforme</h2>
          <p className="text-muted-foreground leading-relaxed">Spilnu er bingo-specialisten i Danske Spil-familien. <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil Casino</Link> er all-rounderen med lotteri og sport, mens <Link to="/casino-anmeldelser/royal-casino" className={linkClass}>Royal Casino</Link> fokuserer på premium casinooplevelse. For ren bingo og casual gaming er Spilnu det bedste valg i familien. For et bredere casinoudvalg er internationale platforme som <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> mere velegnede.</p>
        </section>

        <InlineCasinoCards count={3} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="text-muted-foreground leading-relaxed">Spilnu er det perfekte valg for danske spillere, der søger bingo og casual gaming på en tryg platform. Med Danske Spils opbakning, MitID-integration og et tilgængeligt design er Spilnu den go-to platform for bingo i Danmark. Casino-sektionen er et fint supplement, men for dedikerede casino-spillere anbefaler vi at supplere med en specialist-platform.</p>
        </section>

        <Separator className="my-10" />
        <FAQSection faqs={spilnuFaqs} />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/casino-anmeldelser/spilnu" />
        <Separator className="my-10" />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default SpilnuAnmeldelse;
