import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityPromoSection } from "@/components/CommunityPromoSection";
import heroImage from "@/assets/heroes/mobil-casinoer-hero.jpg";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";
import { Smartphone, Zap, CheckCircle2, Star, Gamepad2, CreditCard, Download, Globe, Battery, Monitor, AlertTriangle } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Skal jeg downloade en app for at spille mobil casino?", answer: (<>Nej, de fleste moderne danske casinoer tilbyder fuldt funktionelle mobilversioner via browseren (HTML5-baseret). Du behøver ikke downloade noget – bare åbn casinoets hjemmeside i Safari, Chrome eller Firefox på din telefon.</>) },
  { question: "Er mobil casino lige så sikkert som desktop?", answer: (<>Ja, sikkerheden er identisk. <Link to="/licenserede-casinoer" className={linkClass}>Licenserede danske casinoer</Link> bruger den samme 256-bit SSL-kryptering og MitID-verifikation på mobil som på desktop.</>) },
  { question: "Kan jeg få casino bonus på mobilen?", answer: (<>Absolut. Alle <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> er tilgængelige på mobil – velkomstbonusser, <Link to="/free-spins" className={linkClass}>free spins</Link>, reload-bonusser og mere. Bonusvilkårene er identiske uanset enhed.</>) },
  { question: "Hvilke betalingsmetoder fungerer på mobil casino?", answer: (<>Alle populære <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> fungerer på mobil, herunder <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/apple-pay" className={linkClass}>Apple Pay</Link> og <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link>.</>) },
  { question: "Hvilke spil kan man spille på mobil casino?", answer: (<>Over 95 % af moderne casinospil er optimeret til mobil. Alle store spiludviklere som <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> og <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> udvikler mobile-first.</>) },
  { question: "Hvor meget data bruger mobil casino?", answer: "Spilleautomater bruger typisk 5-20 MB pr. time, bordspil ca. 10-30 MB pr. time, og live casino-spil kan bruge 300-500 MB pr. time pga. videostreaming. Vi anbefaler Wi-Fi til live casino." },
  { question: "Er der forskel på mobil casino på iPhone og Android?", answer: "Funktionelt er der minimal forskel. Den vigtigste forskel er betalingsmetoder: Apple Pay er kun tilgængeligt på iOS, mens Google Pay fungerer på Android." },
];

const MobilCasinoerGuide = () => {
  const articleSchema = buildArticleSchema({ headline: "Mobil Casinoer 2026 – Spil Casino på Din Smartphone", description: "Komplet guide til mobil casino i Danmark 2026.", url: `${SITE_URL}/casinoer/mobil-casinoer`, datePublished: "2026-02-01", dateModified: "2026-02-15" });
  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

  return (
    <>
      <SEO title="Mobil Casinoer 2026 – Bedste Casino Apps & Mobilsider i Danmark" description="Find de bedste mobil casinoer i Danmark 2026. Komplet guide til casino på mobilen – apps vs. browser, betalingsmetoder, spil og tips til den optimale mobiloplevelse." jsonLd={[articleSchema, faqSchema]} />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Smartphone className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Mobil Casinoer i Danmark 2026
            </h1>
            <p className="text-lg text-white/80">
              Den komplette guide til casino på mobilen: De bedste mobilsider, apps, betalingsmetoder og tips til den perfekte mobiloplevelse.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="1. februar 2026" readTime="18 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Mobil casinoer – casino på smartphone" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over mobil casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Over 75 % af al online casinospil i Danmark foregår nu på mobile enheder – og tallet stiger fortsat. Smartphones er blevet den foretrukne platform for danske casinospillere, og casinoerne har reageret med avancerede mobiloplevelser, der i mange tilfælde overgår desktop-versionen.</p>
          <p className="text-muted-foreground leading-relaxed">I denne guide analyserer vi de bedste mobil casinoer i Danmark: Hvad gør et godt mobil casino, hvilke <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> fungerer bedst på mobil, app vs. browser, og hvordan du optimerer din mobiloplevelse.</p>
        </section>

        <InlineCasinoCards title="Bedste mobil casinoer i Danmark 2026" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Smartphone className="h-7 w-7 text-primary" /> Hvad kendetegner et godt mobil casino?</h2>
          <p className="text-muted-foreground mb-6">Ikke alle mobiloplevelser er skabt lige.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              { icon: <Zap className="h-5 w-5 text-primary" />, title: "Hurtig indlæsning", desc: "Spil skal indlæses inden for 3 sekunder. De bedste mobil casinoer bruger progressiv indlæsning og CDN-distribution for at minimere ventetid." },
              { icon: <Monitor className="h-5 w-5 text-primary" />, title: "Responsivt design", desc: "Interface skal tilpasse sig automatisk til alle skærmstørrelser – fra 5,4\" iPhone SE til 6,9\" Samsung Galaxy Ultra." },
              { icon: <Gamepad2 className="h-5 w-5 text-primary" />, title: "Fuldt spiludvalg", desc: "Minimum 95 % af desktop-spiludvalget skal være tilgængeligt på mobil. Live casino, spilleautomater og bordspil skal alle fungere fejlfrit." },
              { icon: <CreditCard className="h-5 w-5 text-primary" />, title: "Mobile betalinger", desc: "Understøttelse af MobilePay, Apple Pay, Google Pay og Trustly for sømløs, hurtig betalingsoplevelse direkte fra mobilen." },
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card"><CardContent className="flex items-start gap-4 pt-6">{item.icon}<div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-sm text-muted-foreground">{item.desc}</p></div></CardContent></Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Download className="h-7 w-7 text-primary" /> App vs. browser: Hvad er bedst?</h2>
          <p className="text-muted-foreground mb-6">Et af de mest stillede spørgsmål om mobil casino.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-green-500/30"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Browser (anbefalet)</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Ingen download eller opdatering nødvendig</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Optager ingen plads på enheden</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Altid den nyeste version</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Fungerer på alle enheder</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Fuldt spiludvalg altid tilgængeligt</li>
            </ul></CardContent></Card>
            <Card className="border-blue-500/30"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Download className="h-5 w-5 text-primary" /> App</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" /> Push-notifikationer om bonusser og tilbud</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" /> Hurtigere login via Face ID/Touch ID</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" /> Potentielt bedre performance</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> Kræver download og regelmæssige opdateringer</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> Begrænset tilgængelighed i app stores</li>
            </ul></CardContent></Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">Vores anbefaling: <strong>Brug browseren</strong>. Moderne HTML5-teknologi gør browserversionen lige så hurtig og funktionel som en native app.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Battery className="h-7 w-7 text-primary" /> Tips til den bedste mobiloplevelse</h2>
          <div className="space-y-3 mb-6">
            {[
              "Brug altid en stabil internetforbindelse – Wi-Fi til live casino, mobildata er fint til slots",
              "Aktivér 'do not disturb' for at undgå forstyrrende notifikationer under spil",
              "Hold din telefon opdateret for bedste browser-performance og sikkerhed",
              "Tøm browser-cache regelmæssigt for optimal hastighed",
              "Brug landscape-tilstand til bordspil for bedre overblik over spillefladen",
              "Sæt tidsalarmer for at holde styr på din spilletid",
              "Undgå offentlige Wi-Fi-netværk til gambling – brug VPN eller mobildata",
            ].map((tip, i) => (
              <Card key={i} className="border-border bg-card"><CardContent className="flex items-start gap-3 pt-4"><div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">{i+1}</div><p className="text-sm text-muted-foreground">{tip}</p></CardContent></Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Mobil casino er fremtiden – og nutiden – for online gambling i Danmark. De bedste danske casinoer tilbyder mobiloplevelser, der er fuldt på højde med desktop. Kombineret med mobile betalingsmetoder som <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> og <Link to="/betalingsmetoder/apple-pay" className={linkClass}>Apple Pay</Link> er spiloplevelsen mere bekvem end nogensinde.</p>
          <p className="text-muted-foreground leading-relaxed">Husk altid at spille <Link to="/responsible-gaming" className={linkClass}>ansvarligt</Link>, uanset om du sidder ved computeren eller er på farten med din telefon. Besøg vores <Link to="/casino-anmeldelser" className={linkClass}>casino anmeldelser</Link> for at finde det perfekte mobil casino.</p>
        </section>

        <CommunityPromoSection />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinoer/mobil-casinoer" />

        <FAQSection title="Ofte stillede spørgsmål om mobil casino" faqs={faqs} />
      </div>
    </>
  );
};

export default MobilCasinoerGuide;
